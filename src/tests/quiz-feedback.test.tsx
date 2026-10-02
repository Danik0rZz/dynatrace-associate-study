import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { allQuestions } from '../data/questions'
import type { Question } from '../data/types'
import { plainText } from '../lib/search-index'

const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const prompt = () => document.querySelector<HTMLHeadingElement>('.question-prompt')!
const currentQuestion = (): Question => allQuestions.find((question) => plainText(question.promptEs) === prompt().textContent)!
const optionLabels = () => [...screen.getByRole('group', { name: 'Opciones de respuesta' }).querySelectorAll<HTMLLabelElement>('label.answer-option')]
const optionId = (label: HTMLLabelElement, question: Question) => question.options.find((option) => plainText(option.text) === label.querySelector('.option-copy')!.textContent)!.id

/** Marca la respuesta correcta (o una incorrecta) de la pregunta visible y pulsa «Comprobar respuesta». */
const answer = (correct: boolean) => {
  const question = currentQuestion()
  const labels = optionLabels()
  const isRight = (label: HTMLLabelElement) => question.correctOptionIds.includes(optionId(label, question))
  const right = labels.filter(isRight)
  const wrong = labels.filter((label) => !isRight(label))
  const picks = correct ? right : [wrong[0], ...right.slice(1)]
  for (const label of picks) fireEvent.click(label.querySelector('input')!)
  fireEvent.click(screen.getByRole('button', { name: /Comprobar respuesta/ }))
  return { question, letters: labels.flatMap((label, position) => (isRight(label) ? [String.fromCharCode(65 + position)] : [])) }
}
const feedbackName = (element: Element) => document.getElementById(element.getAttribute('aria-labelledby')!)!.textContent!

describe('feedback accesible del quiz', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    fireEvent.click(screen.getByRole('button', { name: /Quiz rápido/ }))
  })
  afterEach(() => cleanup())

  it('al comprobar, el foco va al bloque de feedback y su nombre empieza por «Correcto»', () => {
    answer(true)
    const focused = document.activeElement!
    expect(focused.classList.contains('feedback-box')).toBe(true)
    expect(focused.getAttribute('tabindex')).toBe('-1')
    expect(feedbackName(focused).startsWith('Correcto')).toBe(true)
  })

  it('una respuesta incorrecta: «Incorrecto: la respuesta era …» con las letras visibles', () => {
    const { letters } = answer(false)
    const name = feedbackName(document.activeElement!)
    expect(name.startsWith('Incorrecto')).toBe(true)
    expect(name).toContain(letters[letters.length - 1])
    expect(name).toMatch(letters.length > 1 ? /las respuestas eran/ : /la respuesta era/)
  })

  it('Enter con el foco en el feedback pasa a la siguiente pregunta y el foco va al enunciado', () => {
    const { question } = answer(true)
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' })
    expect(currentQuestion().id).not.toBe(question.id)
    expect(document.activeElement).toBe(prompt())
    expect(document.querySelector('.feedback-box')).toBeNull()
  })

  it('el botón «Siguiente pregunta» también funciona y deja el foco en el enunciado', () => {
    const { question } = answer(false)
    fireEvent.click(screen.getByRole('button', { name: /Siguiente pregunta/ }))
    expect(currentQuestion().id).not.toBe(question.id)
    expect(document.activeElement).toBe(prompt())
  })

  it('desde el feedback, el botón «Siguiente» es alcanzable con Tab (está después en el orden del documento)', () => {
    answer(true)
    const feedback = document.activeElement!
    const next = screen.getByRole('button', { name: /Siguiente pregunta/ })
    expect(feedback.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(next.hasAttribute('disabled')).toBe(false)
  })

  it('no hay regiones vivas en el quiz (ni aria-live ni roles que lo impliquen)', () => {
    answer(false)
    expect(document.querySelectorAll('.quiz-page [aria-live], .quiz-page [role="status"], .quiz-page [role="alert"], .quiz-page [role="log"]')).toHaveLength(0)
  })
})

describe('simulacro: foco al entregar', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => cleanup())

  it('al entregar, el foco está en el título del resultado (y el router no se lo quita)', async () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    fireEvent.click(screen.getByRole('button', { name: /Entregar…/ }))
    fireEvent.click(screen.getByRole('button', { name: /Confirmar entrega/ }))
    expect(screen.getByText('SIMULACRO COMPLETADO')).toBeTruthy()
    await new Promise((resolve) => setTimeout(resolve, 0))
    const title = screen.getByRole('heading', { level: 1 })
    expect(document.activeElement).toBe(title)
    expect(title.getAttribute('tabindex')).toBe('-1')
    expect(window.location.hash).toBe('#/simulacro')
  })
})
