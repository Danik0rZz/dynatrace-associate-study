import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { MOCK_DURATION_SECONDS } from '../app/types'
import { modules } from '../data/modules'
import { questionIndex, questionIndexByModule, questionMetaById } from '../data/question-catalog'
import { blocksFor, importQuestionBlock, requestedQuestionBlocks, resetQuestionCache } from '../data/question-loader'
import { allQuestions, questionsById } from '../data/questions'
import { applyBackup, collectBackup, parseBackup, summarizeBackup } from '../lib/backup'
import { MOCK_SESSION_KEY, parseSavedMock, type SavedMock } from '../lib/mock-session'
import { dueQuestionIds, emptyProgress, PROGRESS_KEY, recordAttempt } from '../lib/progress'
import { adaptiveReviewIds, fullBankIds, mockExamIds, quickQuizIds } from '../lib/selection'

const readProjectFile = async (path: string): Promise<string> => {
  const fsModule: string = 'node:fs'
  const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
  return readFileSync(path, 'utf8')
}
/** Ficheros de una carpeta y sus subcarpetas. */
const listTree = async (dir: string): Promise<string[]> => {
  const fsModule: string = 'node:fs'
  const { readdirSync, statSync } = (await import(/* @vite-ignore */ fsModule)) as { readdirSync: (path: string) => string[]; statSync: (path: string) => { isDirectory: () => boolean } }
  const walk = (path: string): string[] => statSync(path).isDirectory() ? readdirSync(path).flatMap((name) => walk(`${path}/${name}`)) : [path]
  return walk(dir)
}

const START = new Date('2026-10-02T10:00:00Z').getTime()
const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const optionsGroup = () => screen.queryByRole('group', { name: 'Opciones de respuesta' })
const savedMockRaw = () => window.localStorage.getItem(MOCK_SESSION_KEY)

/** Descarga de bloques controlada: no termina hasta `release()`; con `fail` activo, falla. */
const gatedImporter = () => {
  let release: () => void = () => undefined
  let gate = new Promise<void>((resolve) => { release = resolve })
  const control = {
    fail: false,
    calls: [] as string[],
    release: () => release(),
    /** Vuelve a cerrar la puerta (para un segundo intento). */
    rearm: () => { gate = new Promise<void>((resolve) => { release = resolve }) },
    importer: (moduleId: string) => {
      control.calls.push(moduleId)
      return gate.then(() => control.fail ? Promise.reject(new Error('red')) : importQuestionBlock(moduleId))
    },
  }
  return control
}

/** Un simulacro guardado a mano con 60 preguntas reales. */
const savedMock = (overrides: Partial<SavedMock> = {}): SavedMock => {
  const questions = allQuestions.slice(0, 60)
  return {
    version: 1,
    title: 'Simulacro · 60 preguntas',
    questionIds: questions.map((question) => question.id),
    optionOrderByQuestionId: Object.fromEntries(questions.map((question) => [question.id, question.options.map((option) => option.id)])),
    answers: { [questions[0].id]: questions[0].correctOptionIds.slice(0, 1) },
    confidenceByQuestion: {},
    flagged: [],
    index: 3,
    deadline: START + 30 * 60 * 1000,
    ...overrides,
  }
}

describe('el texto de las preguntas no se importa de forma síncrona', () => {
  it('la app no importa el banco completo (data/questions ni blocks/*/questions)', async () => {
    const appFiles = [
      ...await listTree('src/views'), ...await listTree('src/components'), ...await listTree('src/app'), 'src/App.tsx', 'src/main.tsx',
      ...(await listTree('src/lib')).filter((file) => !file.endsWith('/inventory.ts')),
      ...(await listTree('src/data')).filter((file) => !file.includes('/blocks/') && !file.endsWith('/guide.ts') && !file.endsWith('/questions.ts')),
    ].filter((file) => /\.tsx?$/.test(file))
    for (const file of appFiles) {
      const source = await readProjectFile(file)
      expect(source, file).not.toMatch(/from ['"][./]*(?:data\/)?questions['"]|from ['"][./]*(?:data\/)?blocks\/(?:[^'"]+\/)?questions['"]|from ['"][./]*lib\/inventory['"]/)
    }
  })

  it('el catálogo coincide con el banco completo (ids, bloques y opciones)', () => {
    expect(questionIndex.map((entry) => entry.id)).toEqual(allQuestions.map((question) => question.id))
    for (const question of allQuestions) {
      expect(questionMetaById[question.id].optionIds).toEqual(question.options.map((option) => option.id))
      expect(questionMetaById[question.id].correctCount).toBe(question.correctOptionIds.length)
    }
  })
})

describe('selección, contadores, repaso, estadísticas y copia sin cargar texto', () => {
  beforeEach(() => {
    resetQuestionCache()
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => cleanup())

  it('la selección de todas las sesiones funciona con el catálogo', () => {
    let progress = emptyProgress()
    for (const question of allQuestions.slice(0, 30)) progress = recordAttempt(progress, question, [], 2)
    expect(quickQuizIds(questionIndexByModule.dql, progress)).toHaveLength(8)
    expect(new Set(fullBankIds(questionIndexByModule.dql))).toEqual(new Set(questionIndexByModule.dql.map((entry) => entry.id)))
    expect(mockExamIds(questionIndex, progress)).toHaveLength(60)
    expect(adaptiveReviewIds(questionIndex, progress)).toHaveLength(24)
    expect(dueQuestionIds(progress, questionIndex)).toEqual(dueQuestionIds(progress, allQuestions))
    expect(requestedQuestionBlocks()).toEqual([])
  })

  it('inicio, bloque, repaso, errores sin fallos, estadísticas y copia de seguridad no piden ningún bloque', async () => {
    let progress = emptyProgress()
    for (const question of allQuestions.slice(0, 5)) progress = recordAttempt(progress, question, question.correctOptionIds, 1)
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    render(<App />)
    expect(screen.getByText(`5/${allQuestions.length} revisadas`)).toBeTruthy()
    fireEvent.click(nav().getByRole('button', { name: /Repaso/ }))
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBeTruthy()
    expect(screen.getByTestId('review-count').textContent).toBe('5')
    fireEvent.click(nav().getByRole('button', { name: /Estadísticas/ }))
    fireEvent.click(nav().getByRole('button', { name: /Errores/ }))
    expect(screen.getByText('Aún no tienes errores registrados.')).toBeTruthy()
    cleanup()
    window.history.replaceState(null, '', '#/dql')
    render(<App />)
    expect(screen.getByText(`${questionIndexByModule.dql.length} preguntas`)).toBeTruthy()
    const backup = parseBackup(JSON.stringify(collectBackup(window.localStorage)))
    expect(summarizeBackup(backup).answered).toBe(5)
    applyBackup(window.localStorage, backup)
    await act(async () => { await Promise.resolve() })
    expect(requestedQuestionBlocks()).toEqual([])
  })

  it('un simulacro guardado se valida con el catálogo al abrir la app: sin descargar nada', () => {
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(savedMock()))
    render(<App />)
    expect(screen.getByRole('region', { name: 'Simulacro sin terminar' })).toBeTruthy()
    cleanup()
    // Una opción que ya no existe en el banco lo invalida (también solo con el catálogo).
    const broken = savedMock()
    broken.optionOrderByQuestionId[broken.questionIds[0]] = ['x', 'y', 'z', 'w']
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(broken))
    render(<App />)
    expect(screen.queryByRole('region', { name: 'Simulacro sin terminar' })).toBeNull()
    expect(savedMockRaw()).toBeNull()
    expect(parseSavedMock(JSON.stringify(savedMock()), questionMetaById)).toEqual(parseSavedMock(JSON.stringify(savedMock()), questionsById))
    expect(requestedQuestionBlocks()).toEqual([])
  })
})

describe('sesiones con carga de su bloque', () => {
  let gate: ReturnType<typeof gatedImporter>
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(START)
    gate = gatedImporter()
    resetQuestionCache(gate.importer)
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    resetQuestionCache()
  })

  it('el quiz rápido anuncia la carga, descarga solo su bloque y después muestra la pregunta', async () => {
    window.history.replaceState(null, '', '#/dql')
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Quiz rápido/ }))
    expect(screen.getByRole('status').textContent).toBe('Cargando las preguntas…')
    expect(optionsGroup()).toBeNull()
    expect(window.location.hash).toBe('#/quiz')
    await act(async () => { gate.release() })
    expect(await screen.findByRole('group', { name: 'Opciones de respuesta' })).toBeTruthy()
    expect(screen.queryByText('Cargando las preguntas…')).toBeNull()
    expect(gate.calls).toEqual(['dql'])
  })

  it('simulacro: descarga todos sus bloques antes de fijar el deadline', async () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    expect(screen.getByRole('status').textContent).toContain('El tiempo empezará a contar cuando estén todas.')
    expect(document.querySelector('.timer-readout')).toBeNull()
    expect(savedMockRaw()).toBeNull()
    // La descarga tarda 45 s: el tiempo del simulacro no corre mientras tanto.
    vi.setSystemTime(START + 45_000)
    await act(async () => { gate.release() })
    expect(await screen.findByRole('group', { name: 'Opciones de respuesta' })).toBeTruthy()
    const saved = JSON.parse(savedMockRaw() ?? 'null') as SavedMock
    expect(saved.deadline).toBe(START + 45_000 + MOCK_DURATION_SECONDS * 1000)
    expect([...gate.calls].sort()).toEqual(blocksFor(saved.questionIds).sort())
    expect(document.querySelector('.timer-readout')?.textContent).toContain(`${MOCK_DURATION_SECONDS / 60}:00`)
  })

  it('simulacro con fallo de red: «Reintentar», sin temporizador ni deadline guardado; al reintentar, arranca', async () => {
    gate.fail = true
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    await act(async () => { gate.release() })
    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('No se han podido cargar las preguntas')
    expect(alert.textContent).toContain('el tiempo no corre')
    expect(document.querySelector('.timer-readout')).toBeNull()
    expect(savedMockRaw()).toBeNull()
    vi.setSystemTime(START + 120_000)
    gate.fail = false
    gate.rearm()
    fireEvent.click(within(alert).getByRole('button', { name: 'Reintentar' }))
    expect(screen.getByRole('status').textContent).toContain('Cargando las preguntas del simulacro…')
    await act(async () => { gate.release() })
    expect(await screen.findByRole('group', { name: 'Opciones de respuesta' })).toBeTruthy()
    expect((JSON.parse(savedMockRaw() ?? 'null') as SavedMock).deadline).toBe(START + 120_000 + MOCK_DURATION_SECONDS * 1000)
  })

  it('reanudar un simulacro descarga sus bloques y vuelve a la pregunta guardada con su deadline', async () => {
    const mock = savedMock()
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mock))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Reanudar' }))
    expect(screen.getByRole('status').textContent).toBe('Cargando las preguntas del simulacro…')
    expect(optionsGroup()).toBeNull()
    vi.setSystemTime(START + 60_000)
    await act(async () => { gate.release() })
    expect(await screen.findByRole('group', { name: 'Opciones de respuesta' })).toBeTruthy()
    expect(document.querySelector('.quiz-counter strong')?.textContent).toBe('04')
    // Manda el deadline guardado: quedan 29 min, no 30.
    expect(document.querySelector('.timer-readout')?.textContent).toContain('29:00')
    expect([...gate.calls].sort()).toEqual(blocksFor(mock.questionIds).sort())
  })

  it('si el deadline guardado vence durante la descarga, se entrega al terminar con las respuestas guardadas', async () => {
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(savedMock({ deadline: START + 10_000 })))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Reanudar' }))
    vi.setSystemTime(START + 20_000)
    await act(async () => { gate.release() })
    expect(await screen.findByText('SIMULACRO COMPLETADO')).toBeTruthy()
    expect(savedMockRaw()).toBeNull()
    const attempts = (JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? '{}') as { attempts: Record<string, unknown> }).attempts
    expect(Object.keys(attempts)).toHaveLength(60)
  })

  it('el historial de errores descarga los bloques de los fallos que muestra', async () => {
    const failed = questionIndexByModule.security[0]
    const question = questionsById[failed.id]
    const wrong = question.options.find((option) => !question.correctOptionIds.includes(option.id))!.id
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(recordAttempt(emptyProgress(), question, [wrong], 4)))
    window.history.replaceState(null, '', '#/errores')
    render(<App />)
    expect(screen.getByText('1 pendientes')).toBeTruthy()
    expect(screen.getByRole('status').textContent).toBe('Cargando las preguntas falladas…')
    await act(async () => { gate.release() })
    expect(await screen.findByText(/Respuesta correcta:/)).toBeTruthy()
    expect(document.querySelectorAll('.error-card')).toHaveLength(1)
    expect(gate.calls).toEqual(['security'])
  })

  it('el historial de errores avisa si falla la descarga y se puede reintentar', async () => {
    const question = questionsById[questionIndexByModule.notebooks[0].id]
    const wrong = question.options.find((option) => !question.correctOptionIds.includes(option.id))!.id
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(recordAttempt(emptyProgress(), question, [wrong], 4)))
    gate.fail = true
    window.history.replaceState(null, '', '#/errores')
    render(<App />)
    await act(async () => { gate.release() })
    const alert = await screen.findByRole('alert')
    gate.fail = false
    gate.rearm()
    fireEvent.click(within(alert).getByRole('button', { name: 'Reintentar' }))
    await act(async () => { gate.release() })
    expect(await screen.findByText(/Respuesta correcta:/)).toBeTruthy()
  })

  it('los 12 bloques tienen su chunk de preguntas', () => {
    for (const module of modules) expect(blocksFor(questionIndexByModule[module.id].map((entry) => entry.id))).toEqual(questionIndexByModule[module.id].length ? [module.id] : [])
  })
})
