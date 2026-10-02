import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { formatRoute, parseRoute } from '../app/router'
import { questionIndex, questionMetaById } from '../data/question-catalog'
import { importQuestionBlock, requestedQuestionBlocks, resetQuestionCache } from '../data/question-loader'
import { allQuestions, questionsById } from '../data/questions'
import { CUSTOM_QUIZ_KEY, customPool, customQuizIds, DEFAULT_FILTERS, sanitizeFilters, sectionsWithQuestions, type CustomFilters } from '../lib/custom-quiz'
import { dueQuestionIds, emptyProgress, needsReview, recordAttempt, type ProgressState } from '../lib/progress'

const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const startButton = () => screen.getByRole('button', { name: /Empezar quiz/ }) as HTMLButtonElement
const group = (name: string) => within(screen.getByRole('group', { name }))
const openAt = (hash: string) => {
  window.history.replaceState(null, '', hash)
  return render(<App />)
}

/** Progreso con fallos, dudas, aciertos seguros y preguntas sin ver, repartido por varios bloques. */
const mixedProgress = (): ProgressState => {
  let progress = emptyProgress()
  allQuestions.slice(0, 400).forEach((question, index) => {
    const wrong = question.options.find((option) => !question.correctOptionIds.includes(option.id))!.id
    if (index % 4 === 0) progress = recordAttempt(progress, question, [wrong], 4)
    else if (index % 4 === 1) progress = recordAttempt(progress, question, question.correctOptionIds, 1)
    else if (index % 4 === 2) {
      progress = recordAttempt(progress, question, question.correctOptionIds, 4)
      progress = recordAttempt(progress, question, question.correctOptionIds, 5)
    }
  })
  return progress
}

const filters = (patch: Partial<CustomFilters>): CustomFilters => ({ ...DEFAULT_FILTERS, ...patch })

describe('quiz a medida: selección', () => {
  const progress = mixedProgress()

  it('todas las preguntas servidas cumplen bloque, apartado, dificultad y estado', () => {
    const dqlSection = sectionsWithQuestions('dql')[1].id
    const cases: CustomFilters[] = [
      filters({ modules: ['dql', 'security'], difficulties: ['advanced', 'intermediate'], count: 60 }),
      filters({ modules: ['dql'], section: dqlSection, count: 60 }),
      filters({ status: 'review', count: 60 }),
      filters({ modules: ['platform', 'notebooks'], status: 'unseen', difficulties: ['basic'], count: 60 }),
      filters({ modules: ['welcome', 'observability', 'automation'], status: 'review', difficulties: ['intermediate'], count: 30 }),
    ]
    for (const filter of cases) {
      const ids = customQuizIds(filter, progress)
      expect(ids.length, JSON.stringify(filter)).toBe(Math.min(filter.count, customPool(filter, progress).length))
      expect(ids.length).toBeGreaterThan(0)
      for (const id of ids) {
        const entry = questionMetaById[id]
        expect(filter.modules).toContain(entry.moduleId)
        expect(filter.difficulties).toContain(entry.difficulty)
        if (filter.section) expect(entry.section).toBe(filter.section)
        if (filter.status === 'review') expect(needsReview(progress.attempts[id])).toBe(true)
        if (filter.status === 'unseen') expect(progress.attempts[id]).toBeUndefined()
      }
    }
  })

  it('no repite preguntas dentro de la sesión, aunque se pidan más de las que hay', () => {
    for (let round = 0; round < 20; round++) {
      const ids = customQuizIds(filters({ modules: ['dql'], difficulties: ['advanced'], count: 60 }), progress)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('rota como el resto de sesiones: prioriza lo no servido recientemente', () => {
    const filter = filters({ modules: ['dql'], count: 10 })
    const first = customQuizIds(filter, emptyProgress())
    const second = customQuizIds(filter, emptyProgress(), first)
    expect(second.filter((id) => first.includes(id))).toEqual([])
  })

  it('«Falladas o dudosas» es exactamente la cola del repaso (needsReview)', () => {
    const pool = customPool(filters({ status: 'review' }), progress).map((entry) => entry.id)
    expect(pool.length).toBeGreaterThan(100)
    expect(pool).toEqual(questionIndex.filter((entry) => needsReview(progress.attempts[entry.id])).map((entry) => entry.id))
    expect(new Set(pool)).toEqual(new Set(dueQuestionIds(progress, allQuestions)))
  })

  it('«Nunca vistas» son las que no tienen intentos', () => {
    const pool = customPool(filters({ status: 'unseen' }), progress)
    expect(pool.length).toBe(allQuestions.length - Object.keys(progress.attempts).length)
  })

  it('los filtros guardados se validan: lo desconocido se descarta sin error', () => {
    const section = sectionsWithQuestions('dql')[0].id
    expect(sanitizeFilters({ modules: ['dql', 'no-existe', 'dql', 3], section, difficulties: ['basic', 'experta'], status: 'raro', count: 7 }))
      .toEqual({ modules: ['dql'], section, difficulties: ['basic'], status: 'all', count: DEFAULT_FILTERS.count })
    // Un apartado de otro bloque, o con varios bloques, se quita.
    expect(sanitizeFilters({ modules: ['security'], section }).section).toBeNull()
    expect(sanitizeFilters({ modules: ['dql', 'security'], section }).section).toBeNull()
    for (const raw of [null, 'texto', 42, [], { modules: 'dql' }]) expect(() => sanitizeFilters(raw)).not.toThrow()
    expect(sanitizeFilters(null)).toEqual(DEFAULT_FILTERS)
  })
})

describe('quiz a medida: ruta', () => {
  it('#/quiz/medida con parámetros; los inválidos se ignoran sin llevar a una ruta desconocida', () => {
    const section = sectionsWithQuestions('dql')[2].id
    expect(parseRoute('#/quiz/medida')).toEqual({ view: 'custom' })
    expect(parseRoute(`#/quiz/medida?bloques=dql&apartado=${section}&dificultad=avanzada,basica&estado=falladas&n=20`))
      .toEqual({ view: 'custom', filters: { modules: ['dql'], section, difficulties: ['advanced', 'basic'], status: 'review', count: 20 } })
    // Valores desconocidos: se quedan los válidos y se ignora el resto.
    expect(parseRoute('#/quiz/medida?bloques=dql,no-existe&dificultad=experta&estado=x&n=7&apartado=nada&otro=1'))
      .toEqual({ view: 'custom', filters: { modules: ['dql'] } })
    expect(parseRoute('#/quiz/medida?bloques=zz')).toEqual({ view: 'custom' })
    // El apartado solo con un bloque y de ese bloque.
    expect(parseRoute(`#/quiz/medida?bloques=dql,security&apartado=${section}`)).toEqual({ view: 'custom', filters: { modules: ['dql', 'security'] } })
    expect(parseRoute('#/quiz/medida/otra')).toBeNull()
    // Las rutas de antes siguen igual.
    expect(parseRoute('#/quiz')).toEqual({ view: 'quiz' })
    expect(parseRoute('#/quiz/otra')).toBeNull()
    expect(parseRoute('#/dql')).toEqual({ view: 'module', moduleId: 'dql' })
    // Ida y vuelta.
    const route = { view: 'custom' as const, filters: { modules: ['dql', 'security'], difficulties: ['intermediate' as const], status: 'unseen' as const, count: 30 } }
    expect(formatRoute(route)).toBe('#/quiz/medida?bloques=dql,security&dificultad=intermedia&estado=nuevas&n=30')
    expect(parseRoute(formatRoute(route))).toEqual(route)
  })
})

describe('quiz a medida: pantalla', () => {
  let gate: { calls: string[]; release: () => void }
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    let release: () => void = () => undefined
    const opened = new Promise<void>((resolve) => { release = resolve })
    gate = { calls: [], release: () => release() }
    resetQuestionCache((moduleId) => {
      gate.calls.push(moduleId)
      return opened.then(() => importQuestionBlock(moduleId))
    })
  })
  afterEach(() => {
    cleanup()
    resetQuestionCache()
  })

  it('se abre desde la barra lateral, con un fieldset por filtro y el recuento', () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Quiz a medida/ }))
    expect(window.location.hash).toBe('#/quiz/medida')
    for (const name of ['Bloques', 'Apartado', 'Dificultad', 'Tu historial', 'Número de preguntas']) expect(screen.getByRole('group', { name })).toBeTruthy()
    expect(screen.getByRole('status').textContent).toBe(`${allQuestions.length} preguntas con estos filtros: se servirán ${DEFAULT_FILTERS.count}.`)
    expect(startButton().disabled).toBe(false)
  })

  it('combinación vacía: «0 preguntas con estos filtros» y el botón desactivado', async () => {
    openAt('#/quiz/medida')
    fireEvent.click(group('Bloques').getByRole('button', { name: 'Ninguno' }))
    expect(screen.getByText('0 preguntas con estos filtros')).toBeTruthy()
    expect(startButton().disabled).toBe(true)
    // El anuncio llega cuando se dejan de tocar los filtros, no en cada pulsación.
    await waitFor(() => expect(screen.getByRole('status').textContent).toBe('0 preguntas con estos filtros'), { timeout: 2000 })
    // Otra combinación vacía: todos los bloques, pero ninguna dificultad.
    fireEvent.click(group('Bloques').getByRole('button', { name: 'Todos' }))
    for (const label of ['Básica', 'Intermedia', 'Avanzada']) fireEvent.click(group('Dificultad').getByLabelText(label))
    expect(startButton().disabled).toBe(true)
  })

  it('con menos disponibles que las pedidas, sirve las disponibles y lo dice', () => {
    const question = questionsById[questionIndex.find((entry) => entry.moduleId === 'dql')!.id]
    const wrong = question.options.find((option) => !question.correctOptionIds.includes(option.id))!.id
    window.localStorage.setItem('dynatrace-associate-progress-v3', JSON.stringify(recordAttempt(emptyProgress(), question, [wrong], 3)))
    openAt('#/quiz/medida?bloques=dql&estado=falladas&n=20')
    expect(screen.getByText('1 pregunta con estos filtros: se servirá la única disponible (has pedido 20).')).toBeTruthy()
    expect(startButton().textContent).toContain('1')
  })

  it('una ruta con parámetros rellena la configuración (y los inválidos se ignoran)', () => {
    openAt('#/quiz/medida?bloques=dql,no-existe&dificultad=avanzada&estado=nuevas&n=30')
    const checkedBlocks = group('Bloques').getAllByRole('checkbox').filter((box) => (box as HTMLInputElement).checked)
    expect(checkedBlocks).toHaveLength(1)
    expect(checkedBlocks[0].closest('label')?.textContent).toContain('DQL')
    expect((group('Dificultad').getByLabelText('Avanzada') as HTMLInputElement).checked).toBe(true)
    expect((group('Dificultad').getByLabelText('Básica') as HTMLInputElement).checked).toBe(false)
    expect((group('Tu historial').getByRole('radio', { name: /Nunca vistas/ }) as HTMLInputElement).checked).toBe(true)
    expect((group('Número de preguntas').getByLabelText('30') as HTMLInputElement).checked).toBe(true)
    // Con un único bloque se puede elegir apartado.
    expect(screen.getByLabelText('Apartado de la guía')).toBeTruthy()
  })

  it('los filtros se recuerdan, y los guardados inválidos se descartan sin error', () => {
    window.localStorage.setItem(CUSTOM_QUIZ_KEY, JSON.stringify({ modules: ['security', 'no-existe'], section: 'nada', difficulties: ['experta', 'basic'], status: 'raro', count: 7 }))
    openAt('#/quiz/medida')
    const checked = group('Bloques').getAllByRole('checkbox').filter((box) => (box as HTMLInputElement).checked)
    expect(checked).toHaveLength(1)
    expect((group('Dificultad').getByLabelText('Básica') as HTMLInputElement).checked).toBe(true)
    expect((group('Dificultad').getByLabelText('Intermedia') as HTMLInputElement).checked).toBe(false)
    expect((group('Tu historial').getByRole('radio', { name: /Todas/ }) as HTMLInputElement).checked).toBe(true)
    fireEvent.click(group('Número de preguntas').getByLabelText('20'))
    fireEvent.click(group('Tu historial').getByRole('radio', { name: /Nunca vistas/ }))
    cleanup()
    openAt('#/quiz/medida')
    expect((group('Número de preguntas').getByLabelText('20') as HTMLInputElement).checked).toBe(true)
    expect((group('Tu historial').getByRole('radio', { name: /Nunca vistas/ }) as HTMLInputElement).checked).toBe(true)
    expect(JSON.parse(window.localStorage.getItem(CUSTOM_QUIZ_KEY) ?? '{}')).toMatchObject({ modules: ['security'], difficulties: ['basic'], status: 'unseen', count: 20 })
  })

  it('configurar no descarga preguntas; al empezar solo se descargan los bloques elegidos', async () => {
    openAt('#/quiz/medida?bloques=dql,security&n=30')
    fireEvent.click(group('Dificultad').getByLabelText('Básica'))
    fireEvent.click(group('Tu historial').getByRole('radio', { name: /Nunca vistas/ }))
    fireEvent.click(group('Número de preguntas').getByLabelText('60'))
    fireEvent.click(group('Número de preguntas').getByLabelText('30'))
    expect(requestedQuestionBlocks()).toEqual([])
    fireEvent.click(startButton())
    expect(screen.getByRole('status').textContent).toBe('Cargando las preguntas…')
    expect([...gate.calls].sort()).toEqual(['dql', 'security'])
    await act(async () => { gate.release() })
    expect(await screen.findByRole('group', { name: 'Opciones de respuesta' })).toBeTruthy()
    expect(screen.getByText('QUIZ A MEDIDA')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Quiz a medida · 2 bloques')
    expect(document.querySelector('.quiz-counter span')?.textContent).toBe('/ 30')
  })

  it('desde un bloque, «Quiz a medida» abre la configuración con ese bloque preseleccionado', () => {
    openAt('#/security')
    fireEvent.click(within(screen.getByRole('main')).getByRole('button', { name: /Quiz a medida/ }))
    expect(window.location.hash).toBe('#/quiz/medida?bloques=security')
    const checked = group('Bloques').getAllByRole('checkbox').filter((box) => (box as HTMLInputElement).checked)
    expect(checked).toHaveLength(1)
    expect(checked[0].closest('label')?.textContent).toContain('Security')
  })
})
