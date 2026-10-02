import { describe, expect, it } from 'vitest'
import { dueQuestionIds, emptyProgress, loadProgress, MAX_ATTEMPTS_PER_QUESTION, needsReview, parseProgress, PROGRESS_KEY, type ProgressState, recordAttempt, scoreAttempt } from '../lib/progress'
import type { Attempt, Question } from '../data/types'

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
    const next = recordAttempt(emptyProgress(), multipleQuestion, ['A', 'A', 'C'], 4)
    expect(next.attempts['test-multiple'][0].selectedOptionIds).toEqual(['A', 'C'])
    expect(next.attempts['test-multiple'][0].confidence).toBe(4)
  })

  it(`conserva como máximo ${MAX_ATTEMPTS_PER_QUESTION} intentos por pregunta, los más recientes`, () => {
    let progress = emptyProgress()
    for (let round = 0; round < MAX_ATTEMPTS_PER_QUESTION + 5; round += 1) progress = recordAttempt(progress, singleQuestion, ['A'], 3)
    progress = recordAttempt(progress, singleQuestion, ['B'], 5)
    const history = progress.attempts['test-single']
    expect(history).toHaveLength(MAX_ATTEMPTS_PER_QUESTION)
    expect(history.at(-1)).toMatchObject({ correct: true, confidence: 5 })
  })
})

describe('criterio de repaso', () => {
  const answer = (progress: ProgressState, correct: boolean, confidence: Attempt['confidence']) =>
    recordAttempt(progress, singleQuestion, [correct ? 'B' : 'A'], confidence)
  const due = (progress: ProgressState) => needsReview(progress.attempts['test-single'])

  it('lo nunca respondido no está en el repaso', () => {
    expect(due(emptyProgress())).toBe(false)
  })

  it('entra con un fallo o con confianza ≤ 2; un acierto con confianza 3 no entra', () => {
    expect(due(answer(emptyProgress(), false, 5))).toBe(true)
    expect(due(answer(emptyProgress(), true, 1))).toBe(true)
    expect(due(answer(emptyProgress(), true, 2))).toBe(true)
    expect(due(answer(emptyProgress(), true, 3))).toBe(false)
    expect(due(answer(emptyProgress(), true, 5))).toBe(false)
  })

  it('sale tras una racha de 2 aciertos consecutivos con confianza ≥ 3', () => {
    const failed = answer(emptyProgress(), false, 4)
    const once = answer(failed, true, 3)
    expect(due(once)).toBe(true)
    expect(due(answer(once, true, 3))).toBe(false)
  })

  it('un acierto dudoso o un fallo rompen la racha', () => {
    const once = answer(answer(emptyProgress(), false, 4), true, 4)
    expect(due(answer(once, true, 2))).toBe(true)
    expect(due(answer(answer(once, true, 2), true, 4))).toBe(true)
    const left = answer(once, true, 4)
    expect(due(answer(left, false, 5))).toBe(true)
  })

  const at = (id: string, correct: boolean, confidence: Attempt['confidence'], timestamp: string): Attempt =>
    ({ questionId: id, selectedOptionIds: [correct ? 'B' : 'A'], score: correct ? 1 : 0, correct, confidence, timestamp })
  const questionsFor = (ids: string[]) => ids.map((id) => ({ ...singleQuestion, id }))

  it('ordena por prioridad: falsa seguridad, resto de fallos y aciertos dudosos', () => {
    // La falsa seguridad es la más reciente: si el orden fuera solo por antigüedad, saldría la última.
    const progress: ProgressState = {
      version: 3,
      attempts: {
        'doubtful-hit': [at('doubtful-hit', true, 1, '2026-10-01T10:00:00Z')],
        'plain-miss': [at('plain-miss', false, 2, '2026-10-01T11:00:00Z')],
        'false-sure': [at('false-sure', false, 5, '2026-10-02T10:00:00Z')],
      },
    }
    expect(dueQuestionIds(progress, questionsFor(['doubtful-hit', 'plain-miss', 'false-sure']))).toEqual(['false-sure', 'plain-miss', 'doubtful-hit'])
  })

  it('dentro de un mismo grupo, la respuesta más antigua va primero', () => {
    const progress: ProgressState = {
      version: 3,
      attempts: {
        'newer-miss': [at('newer-miss', false, 3, '2026-10-02T10:00:00Z')],
        'older-miss': [at('older-miss', false, 3, '2026-10-01T10:00:00Z')],
      },
    }
    expect(dueQuestionIds(progress, questionsFor(['newer-miss', 'older-miss']))).toEqual(['older-miss', 'newer-miss'])
  })

  it('el grupo lo decide el último intento no seguro: un fallo con confianza 5 y un acierto con confianza 4 sigue en falsa seguridad', () => {
    const progress: ProgressState = {
      version: 3,
      attempts: {
        'false-sure': [at('false-sure', false, 5, '2026-10-01T09:00:00Z'), at('false-sure', true, 4, '2026-10-02T12:00:00Z')],
        'plain-miss': [at('plain-miss', false, 3, '2026-10-01T10:00:00Z')],
      },
    }
    expect(needsReview(progress.attempts['false-sure'])).toBe(true)
    expect(dueQuestionIds(progress, questionsFor(['plain-miss', 'false-sure']))).toEqual(['false-sure', 'plain-miss'])
  })
})

describe('compatibilidad con el progreso v3 guardado', () => {
  const legacy = JSON.stringify({
    version: 3,
    completedModules: ['platform'],
    activeQuestionId: 'test-single',
    attempts: {
      'test-single': [{ questionId: 'test-single', selectedOptionIds: ['A'], score: 0, correct: false, confidence: 4, timestamp: '2026-09-01T10:00:00Z' }],
      'test-multiple': [{ questionId: 'test-multiple', selectedOptionIds: ['A', 'C'], score: 1, correct: true, confidence: 5, timestamp: '2026-09-02T10:00:00Z' }],
    },
  })

  it('lee un JSON antiguo con completedModules y activeQuestionId sin perder intentos', () => {
    const progress = parseProgress(legacy)
    expect(progress).toEqual({ version: 3, attempts: JSON.parse(legacy).attempts })
    expect(dueQuestionIds(progress, [singleQuestion, multipleQuestion])).toEqual(['test-single'])
    const next = recordAttempt(progress, singleQuestion, ['B'], 4)
    expect(next.attempts['test-single']).toHaveLength(2)
    expect(JSON.parse(JSON.stringify(next))).not.toHaveProperty('completedModules')
  })

  it('lo carga desde localStorage con la clave de siempre', () => {
    window.localStorage.setItem(PROGRESS_KEY, legacy)
    try {
      expect(PROGRESS_KEY).toBe('dynatrace-associate-progress-v3')
      expect(Object.keys(loadProgress().attempts)).toEqual(['test-single', 'test-multiple'])
    } finally {
      window.localStorage.removeItem(PROGRESS_KEY)
    }
  })

  it('descarta datos dañados o de otra versión sin lanzar', () => {
    expect(parseProgress('{roto')).toEqual(emptyProgress())
    expect(parseProgress(JSON.stringify({ version: 2, attempts: {} }))).toEqual(emptyProgress())
    expect(parseProgress(JSON.stringify({ version: 3, attempts: [] }))).toEqual(emptyProgress())
    expect(parseProgress('null')).toEqual(emptyProgress())
  })
})
