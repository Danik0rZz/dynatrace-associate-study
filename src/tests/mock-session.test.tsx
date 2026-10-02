import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { allQuestions, questionsById } from '../data/questions'
import { MOCK_SESSION_KEY, parseSavedMock, type SavedMock, secondsUntil } from '../lib/mock-session'
import { PROGRESS_KEY } from '../lib/progress'

const START = new Date('2026-10-02T10:00:00Z')
const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const timer = () => document.querySelector('.timer-readout')?.textContent
const stored = (): SavedMock | null => parseSavedMock(window.localStorage.getItem(MOCK_SESSION_KEY), questionsById)
const attemptsStored = () => Object.keys((JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? '{"attempts":{}}') as { attempts: Record<string, unknown> }).attempts).length

/** Un simulacro guardado a mano: 60 preguntas reales, con respuestas, marcadas e índice. */
const savedMock = (overrides: Partial<SavedMock> = {}): SavedMock => {
  const questions = allQuestions.slice(0, 60)
  const first = questions[0]
  const second = questions[1]
  return {
    version: 1,
    title: 'Simulacro · 60 preguntas',
    questionIds: questions.map((question) => question.id),
    optionOrderByQuestionId: Object.fromEntries(questions.map((question) => [question.id, question.options.map((option) => option.id)])),
    answers: { [first.id]: first.correctOptionIds.slice(0, 1), [second.id]: [second.options[0].id] },
    confidenceByQuestion: { [first.id]: 5 },
    flagged: [second.id, questions[7].id],
    index: 7,
    deadline: START.getTime() + 30 * 60 * 1000,
    ...overrides,
  }
}

const answerCurrent = () => {
  const hint = screen.getByText(/Selecciona (exactamente \d|la respuesta)/).textContent ?? ''
  const needed = Number(hint.match(/\d/)?.[0] ?? 1)
  const options = within(screen.getByRole('group', { name: 'Opciones de respuesta' })).getAllByRole(needed > 1 ? 'checkbox' : 'radio')
  for (let index = 0; index < needed; index++) fireEvent.click(options[index])
}

describe('simulacro robusto', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'setTimeout', 'clearTimeout', 'Date'] })
    vi.setSystemTime(START)
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('el tiempo restante sale del deadline, redondeando hacia arriba', () => {
    const deadline = START.getTime() + 90_000
    expect(secondsUntil(deadline, START.getTime())).toBe(90)
    expect(secondsUntil(deadline, START.getTime() + 500)).toBe(90)
    expect(secondsUntil(deadline, START.getTime() + 1000)).toBe(89)
    expect(secondsUntil(deadline, deadline + 5000)).toBe(0)
  })

  it('guarda el deadline, no un contador, y el reloj lo sigue', () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    expect(timer()).toContain('60:00')
    expect(stored()?.deadline).toBe(START.getTime() + 60 * 60 * 1000)
    act(() => { vi.advanceTimersByTime(61_000) })
    expect(timer()).toContain('58:59')
    expect(stored()?.deadline).toBe(START.getTime() + 60 * 60 * 1000)
  })

  it('reanudar recupera las respuestas, las marcadas y el índice', () => {
    const mock = savedMock()
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mock))
    render(<App />)
    const panel = screen.getByRole('region', { name: 'Simulacro sin terminar' })
    expect(panel.textContent).toContain('2/60 respondidas')
    fireEvent.click(within(panel).getByRole('button', { name: 'Reanudar' }))
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(screen.getByText('08')).toBeTruthy()
    expect(timer()).toContain('30:00')
    expect(screen.getByRole('button', { name: /Marcar/ }).textContent).toContain('⚑')
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    expect(screen.getByText('01')).toBeTruthy()
    expect(document.querySelectorAll('.options-list input:checked')).toHaveLength(mock.answers[mock.questionIds[0]].length)
    expect(screen.getByText('5/5')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Entregar…/ }))
    expect(screen.getByTestId('review-answered').textContent).toBe('2')
    expect(screen.getByTestId('review-flagged').textContent).toBe('2')
  })

  it('Simulacro con una sesión guardada ofrece reanudar o descartar y empezar otro', () => {
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(savedMock()))
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    const panel = screen.getByRole('region', { name: 'Simulacro sin terminar' })
    fireEvent.click(within(panel).getByRole('button', { name: 'Descartar y empezar uno nuevo' }))
    expect(screen.getByText('01')).toBeTruthy()
    expect(timer()).toContain('60:00')
    expect(stored()?.index).toBe(0)
    expect(Object.keys(stored()?.answers ?? {})).toHaveLength(0)
  })

  it('un deadline vencido al reanudar entrega el simulacro con las respuestas guardadas', () => {
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(savedMock({ deadline: START.getTime() - 1000 })))
    render(<App />)
    expect(screen.getByRole('region', { name: 'Simulacro sin terminar' }).textContent).toContain('el tiempo se ha agotado')
    fireEvent.click(screen.getByRole('button', { name: 'Reanudar' }))
    expect(screen.getByText('SIMULACRO COMPLETADO')).toBeTruthy()
    expect(screen.getByText(/1 de 60 respuestas exactas/)).toBeTruthy()
    expect(attemptsStored()).toBe(60)
    expect(window.localStorage.getItem(MOCK_SESSION_KEY)).toBeNull()
  })

  it('salir de un simulacro en curso pide confirmación; cancelar lo mantiene y aceptar lo deja guardado', async () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    answerCurrent()
    fireEvent.click(screen.getByRole('button', { name: /Guardar y continuar/ }))
    fireEvent.click(nav().getByRole('button', { name: /Glosario/ }))
    const dialog = screen.getByRole('alertdialog', { name: '¿Salir del simulacro?' })
    await act(async () => { fireEvent.click(within(dialog).getByRole('button', { name: 'Seguir en el simulacro' })) })
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(screen.getByText('02')).toBeTruthy()
    expect(window.location.hash).toBe('#/simulacro')

    fireEvent.click(nav().getByRole('button', { name: /Glosario/ }))
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Salir del simulacro' })) })
    expect(window.location.hash).toBe('#/glosario')
    expect(screen.queryByText('MODO SIMULACRO')).toBeNull()
    expect(stored()?.index).toBe(1)
    expect(screen.getByRole('region', { name: 'Simulacro sin terminar' }).textContent).toContain('1/60 respondidas')
  })

  it('con un simulacro en curso, beforeunload pide confirmación', () => {
    render(<App />)
    const idle = new Event('beforeunload', { cancelable: true })
    window.dispatchEvent(idle)
    expect(idle.defaultPrevented).toBe(false)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    const busy = new Event('beforeunload', { cancelable: true })
    window.dispatchEvent(busy)
    expect(busy.defaultPrevented).toBe(true)
  })

  it('la revisión previa muestra los recuentos y permite saltar a una pregunta antes de entregar', () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    answerCurrent()
    fireEvent.click(screen.getByRole('button', { name: /Marcar/ }))
    fireEvent.click(screen.getByRole('button', { name: /Guardar y continuar/ }))
    answerCurrent()
    fireEvent.click(screen.getByRole('button', { name: /Guardar y continuar/ }))
    fireEvent.click(screen.getByRole('button', { name: /Marcar/ }))
    fireEvent.click(screen.getByRole('button', { name: /Entregar…/ }))
    expect(screen.getByText('Revisa tu simulacro')).toBeTruthy()
    expect(screen.getByTestId('review-answered').textContent).toBe('2')
    expect(screen.getByTestId('review-unanswered').textContent).toBe('58')
    expect(screen.getByTestId('review-flagged').textContent).toBe('2')
    fireEvent.click(screen.getByRole('button', { name: 'Pregunta 3: sin responder, marcada' }))
    expect(screen.getByText('03')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Entregar…/ }))
    fireEvent.click(screen.getByRole('button', { name: /Confirmar entrega/ }))
    expect(screen.getByText('SIMULACRO COMPLETADO')).toBeTruthy()
    expect(window.localStorage.getItem(MOCK_SESSION_KEY)).toBeNull()
  })

  it('un simulacro guardado dañado o incompatible se descarta sin romper la app', () => {
    const bad = [
      '{roto',
      JSON.stringify({ ...savedMock(), version: 2 }),
      JSON.stringify(savedMock({ questionIds: ['NO-EXISTE', ...savedMock().questionIds.slice(1)] })),
      JSON.stringify(savedMock({ index: 99 })),
      JSON.stringify(savedMock({ deadline: Number.NaN })),
      JSON.stringify(savedMock({ answers: { [allQuestions[0].id]: ['Z'] } })),
    ]
    for (const raw of bad) {
      window.localStorage.setItem(MOCK_SESSION_KEY, raw)
      render(<App />)
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
      expect(screen.queryByRole('region', { name: 'Simulacro sin terminar' })).toBeNull()
      expect(window.localStorage.getItem(MOCK_SESSION_KEY), raw).toBeNull()
      cleanup()
    }
  })
})
