import { describe, expect, it } from 'vitest'
import { adaptiveReviewQuestionIds, recordAttempt, scoreAttempt } from '../lib/progress'
import type { Question } from '../data/types'

const singleQuestion: Question = {
  id: 'test-single',
  moduleId: 'test',
  objectiveId: 'test-objective-1',
  bucket: 'knowledge',
  type: 'single',
  cognitiveLevel: 'remember',
  difficulty: 'basic',
  promptEs: 'Pregunta',
  options: [{ id: 'A', text: 'A' }, { id: 'B', text: 'B' }, { id: 'C', text: 'C' }],
  correctOptionIds: ['B'],
  explanationEs: 'Explicación',
  sourceRefs: [],
  classicOrLatest: 'latest',
  lastVerified: '2026-09-28',
  guide: { section: 'test-section', evidence: 'Frase de prueba que respalda la pregunta.' },
  form: 'A',
}

const multipleQuestion: Question = {
  ...singleQuestion,
  id: 'test-multiple',
  type: 'multiple',
  correctOptionIds: ['A', 'C'],
}

describe('evaluación y progreso', () => {
  it('puntúa opción única de forma exacta', () => {
    expect(scoreAttempt(singleQuestion, ['B'])).toEqual({ score: 1, correct: true })
    expect(scoreAttempt(singleQuestion, ['A', 'B'])).toEqual({ score: 0, correct: false })
  })

  it('puntúa selección múltiple penalizando opciones incorrectas', () => {
    expect(scoreAttempt(multipleQuestion, ['A', 'C', 'C'])).toEqual({ score: 1, correct: true })
    expect(scoreAttempt(multipleQuestion, ['A'])).toEqual({ score: 0.5, correct: false })
    expect(scoreAttempt(multipleQuestion, ['B'])).toEqual({ score: 0, correct: false })
  })

  it('registra intentos sin duplicar la selección', () => {
    const progress = { version: 3 as const, attempts: {}, completedModules: [] }
    const next = recordAttempt(progress, multipleQuestion, ['A', 'A', 'C'], 4)
    expect(next.attempts['test-multiple'][0].selectedOptionIds).toEqual(['A', 'C'])
    expect(next.attempts['test-multiple'][0].confidence).toBe(4)
  })

  it('añade retos avanzados tras dos aciertos consecutivos', () => {
    const advanced = { ...singleQuestion, id: 'test-advanced', difficulty: 'advanced' as const }
    const first = recordAttempt({ version: 3 as const, attempts: {}, completedModules: [] }, singleQuestion, ['B'], 5)
    const second = recordAttempt(first, singleQuestion, ['B'], 5)
    expect(adaptiveReviewQuestionIds(second, [singleQuestion, advanced], 5)).toContain('test-advanced')
  })
})
