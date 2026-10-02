import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { QuizView } from '../views/QuizView'
import { precisionFacts, studyGuide } from '../data/guide'
import { guideIndex, sectionReviewed } from '../data/guide-index'
import { resetGuideCache } from '../data/guide-loader'
import { modules } from '../data/modules'
import { requestedQuestionBlocks, resetQuestionCache } from '../data/question-loader'
import { questionsById } from '../data/questions'
import { formatIsoDate, isIsoDate } from '../lib/dates'
import { PRECISION_SECTION, questionIdsForSection } from '../lib/guide-links'
import { parsePlan } from '../lib/inventory'
import { buildGuideIndex } from '../lib/light-index'
import { emptyProgress, PROGRESS_KEY, recordAttempt, type ProgressState } from '../lib/progress'

const readProjectFile = async (path: string): Promise<string> => {
  const fsModule: string = 'node:fs'
  const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}

const openAt = (hash: string) => {
  window.history.replaceState(null, '', hash)
  return render(<App />)
}
const lessonIndex = () => within(screen.getByRole('navigation', { name: 'Índice de la lección' }))
const wrongOption = (id: string) => questionsById[id].options.find((option) => !questionsById[id].correctOptionIds.includes(option.id))!.id

/** Un apartado de DQL con al menos 4 preguntas, solo de opción única (para que el score sea 0 o 1). */
const dqlSection = guideIndex.dql.sections.find((section) => {
  const ids = questionIdsForSection('dql', section.id)
  return ids.length >= 4 && ids.every((id) => questionsById[id].type === 'single')
})!
const dqlIds = questionIdsForSection('dql', dqlSection.id)

/** 3 respondidas de N: la primera bien, la segunda mal y la tercera mal y después bien (cuenta el último intento). */
const sectionProgress = (): ProgressState => {
  let progress = emptyProgress()
  progress = recordAttempt(progress, questionsById[dqlIds[0]], questionsById[dqlIds[0]].correctOptionIds, 4)
  progress = recordAttempt(progress, questionsById[dqlIds[1]], [wrongOption(dqlIds[1])], 4)
  progress = recordAttempt(progress, questionsById[dqlIds[2]], [wrongOption(dqlIds[2])], 2)
  progress = recordAttempt(progress, questionsById[dqlIds[2]], questionsById[dqlIds[2]].correctOptionIds, 4)
  return progress
}

describe('fechas de calendario', () => {
  it('«AAAA-MM-DD» → «2 oct 2026», en español y sin puntos', () => {
    expect(formatIsoDate('2026-10-02')).toBe('2 oct 2026')
    expect(formatIsoDate('2026-01-31')).toBe('31 ene 2026')
    expect(formatIsoDate('2026-09-28')).toMatch(/^28 sept? 2026$/)
    expect(formatIsoDate('2026-12-01')).toBe('1 dic 2026')
  })

  it('no depende de la zona horaria: new Date("2026-10-02") sería 1 oct en América; formatIsoDate no', () => {
    // La trampa: la cadena ISO se lee como medianoche UTC; en una zona al oeste de UTC es el día anterior.
    const naive = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'America/Mexico_City' }).format(new Date('2026-10-02'))
    expect(naive).toBe('1 oct 2026')
    // formatIsoDate construye y formatea en UTC: el día es siempre el de la cadena, también en los extremos del año.
    expect(formatIsoDate('2026-10-02')).toBe('2 oct 2026')
    expect(formatIsoDate('2026-12-31')).toBe('31 dic 2026')
    expect(formatIsoDate('2026-01-01')).toBe('1 ene 2026')
  })

  it('valida la fecha: lo que no es una fecha real se devuelve tal cual y no se marca como fecha', () => {
    for (const value of ['2026-02-30', '2026-13-01', '02/10/2026', '', 'pendiente']) {
      expect(isIsoDate(value)).toBe(false)
      expect(formatIsoDate(value)).toBe(value)
    }
    expect(isIsoDate('2024-02-29')).toBe(true)
  })
})

describe('«Revisado» de cada apartado (desde docs/plan-apartados.csv)', () => {
  it('el índice generado lleva la fecha del plan de cada apartado y de la ficha de precisión', async () => {
    const { rows } = parsePlan(await readProjectFile('docs/plan-apartados.csv'))
    let checked = 0
    for (const row of rows) {
      if (!isIsoDate(row.revisado)) continue
      if (row.apartado === PRECISION_SECTION) {
        if (guideIndex[row.bloque]?.precision) expect(guideIndex[row.bloque].precisionReviewed, `${row.bloque} ficha`).toBe(row.revisado)
      } else expect(sectionReviewed(row.bloque, row.apartado), `${row.bloque}/${row.apartado}`).toBe(row.revisado)
      checked += 1
    }
    expect(checked).toBeGreaterThan(200)
  })

  it('un apartado sin fecha (o con una fecha inválida) en el plan no la lleva', async () => {
    const { rows } = parsePlan(await readProjectFile('docs/plan-apartados.csv'))
    const section = studyGuide.dql.sections[0].id
    const plan = rows.map((row) => row.bloque === 'dql' && row.apartado === section ? { ...row, revisado: '' } : row.bloque === 'dql' && row.apartado === PRECISION_SECTION ? { ...row, revisado: 'pronto' } : row)
    const index = buildGuideIndex(modules, studyGuide, precisionFacts, plan)
    expect(index.dql.sections[0]).toEqual({ id: section, title: studyGuide.dql.sections[0].title })
    expect(index.dql.precisionReviewed).toBeUndefined()
    expect(index.dql.sections[1].reviewed).toBe(sectionReviewed('dql', studyGuide.dql.sections[1].id))
  })
})

describe('progreso por apartado en el índice de la lección', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    resetGuideCache()
    resetQuestionCache()
  })
  afterEach(() => cleanup())

  it('muestra respondidas/total y % de acierto (score del último intento, como moduleScore), con texto accesible', async () => {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(sectionProgress()))
    openAt('#/dql')
    await screen.findAllByText('Practicar este apartado')
    const link = lessonIndex().getByRole('link', { name: new RegExp(`^${dqlSection.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) })
    // 3 respondidas; últimos intentos: bien, mal, bien → 67 %.
    expect(link.querySelector('.chapter-index-progress [aria-hidden="true"]')?.textContent).toBe(`3/${dqlIds.length} · 67 %`)
    expect(link.textContent).toContain(`: 3 de ${dqlIds.length} preguntas respondidas, 67 % de acierto`)
    // La barra es decorativa.
    expect(link.querySelector('.chapter-index-bar')?.getAttribute('aria-hidden')).toBe('true')
    // Sin intentos: solo «0/N», sin porcentaje.
    const other = guideIndex.dql.sections.find((section) => section.id !== dqlSection.id && questionIdsForSection('dql', section.id).length > 0)!
    const otherLink = lessonIndex().getByRole('link', { name: new RegExp(`^${other.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) })
    expect(otherLink.textContent).toContain(`0/${questionIdsForSection('dql', other.id).length}`)
    expect(otherLink.textContent).not.toContain('%')
  })

  it('«Hechos de precisión» lleva su progreso si tiene preguntas', async () => {
    openAt('#/dql')
    await screen.findAllByText('Practicar este apartado')
    const precision = lessonIndex().getByRole('link', { name: /^Hechos de precisión/ })
    const total = questionIdsForSection('dql', PRECISION_SECTION).length
    expect(total).toBeGreaterThan(0)
    expect(precision.textContent).toContain(`0 de ${total} preguntas respondidas`)
  })

  it('un apartado sin preguntas no muestra cifras ni barra', async () => {
    openAt('#/instructions')
    await screen.findAllByText('Practicar este apartado')
    const empty = guideIndex.instructions.sections.find((section) => questionIdsForSection('instructions', section.id).length === 0)!
    const link = lessonIndex().getAllByRole('link').find((item) => item.getAttribute('href')?.endsWith(`/${empty.id}`))!
    expect(link.querySelector('.chapter-index-progress')).toBeNull()
    expect(link.querySelector('.chapter-index-bar')).toBeNull()
  })

  it('el progreso no descarga ninguna pregunta (solo el catálogo)', async () => {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(sectionProgress()))
    openAt('#/dql')
    await screen.findAllByText('Practicar este apartado')
    expect(lessonIndex().getAllByRole('link').some((link) => link.textContent?.includes('67 %'))).toBe(true)
    expect(requestedQuestionBlocks()).toEqual([])
  })

  it('cada apartado de la guía muestra «Revisado <fecha>» con <time datetime>', async () => {
    openAt('#/dql')
    await screen.findAllByText('Practicar este apartado')
    const section = document.getElementById(dqlSection.id)!
    const time = section.querySelector('.section-reviewed time')!
    expect(time.getAttribute('datetime')).toBe(sectionReviewed('dql', dqlSection.id))
    expect(section.querySelector('.section-reviewed')?.textContent).toBe(`Revisado ${formatIsoDate(sectionReviewed('dql', dqlSection.id)!)}`)
    expect(document.querySelector('#precision-facts .section-reviewed time')?.getAttribute('datetime')).toBe(guideIndex.dql.precisionReviewed)
  })
})

describe('fecha verificada en el feedback de la pregunta', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => cleanup())

  it('el feedback muestra lastVerified de la pregunta, formateado y con <time datetime>', () => {
    // Una pregunta con una fecha distinta de la mayoritaria (1 oct): lo que se ve es la fecha de ESA pregunta.
    const question = Object.values(questionsById).find((item) => item.lastVerified === '2026-09-28' && item.type === 'single')!
    const noop = () => undefined
    render(<QuizView session={{ mode: 'quick', title: 'Prueba', questionIds: [question.id], optionOrderByQuestionId: { [question.id]: question.options.map((option) => option.id) } }} question={question} index={0} selected={question.correctOptionIds} confidence={3} flagged={false} secondsLeft={0} feedbackVisible onToggleAnswer={noop} onConfidence={noop} onSubmit={noop} onNext={noop} onToggleFlag={noop} onOpenGuide={noop} onBack={noop} onJump={noop} />)
    const time = document.querySelector('.feedback-box .feedback-context time')!
    expect(time.getAttribute('datetime')).toBe('2026-09-28')
    expect(time.closest('span')?.textContent).toBe(`Última verificación de esta pregunta: ${formatIsoDate('2026-09-28')}`)
    expect(time.textContent).toMatch(/^28 sept? 2026$/)
  })

  it('en la app, el feedback de una pregunta respondida lleva su fecha', async () => {
    openAt('#/dql')
    fireEvent.click((await screen.findAllByText('Practicar este apartado'))[0])
    const hint = screen.getByText(/Selecciona (exactamente \d|la respuesta)/).textContent ?? ''
    const needed = Number(hint.match(/\d/)?.[0] ?? 1)
    const options = within(screen.getByRole('group', { name: 'Opciones de respuesta' })).getAllByRole(needed > 1 ? 'checkbox' : 'radio')
    for (let index = 0; index < needed; index++) fireEvent.click(options[index])
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /Comprobar respuesta/ })) })
    const time = document.querySelector('.feedback-box .feedback-context time')!
    expect(isIsoDate(time.getAttribute('datetime'))).toBe(true)
    expect(time.textContent).toBe(formatIsoDate(time.getAttribute('datetime')!))
  })
})
