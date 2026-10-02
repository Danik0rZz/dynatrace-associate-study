import { describe, expect, it } from 'vitest'
import { allQuestions, questionsByModule } from '../data/questions'
import { dueQuestionIds, emptyProgress, type ProgressState } from '../lib/progress'
import { adaptiveReviewIds, byFreshness, fullBankIds, mockExamIds, optionOrders, quickQuizIds, REVIEW_SESSION_SIZE, shuffle } from '../lib/selection'

const answered = (ids: string[], correct = true): ProgressState => {
  const progress = emptyProgress()
  for (const id of ids) progress.attempts[id] = [{ questionId: id, selectedOptionIds: ['A'], score: correct ? 1 : 0, correct, confidence: 5, timestamp: new Date().toISOString() }]
  return progress
}

describe('selección aleatoria de preguntas', () => {
  it('baraja sin perder ni duplicar elementos', () => {
    const items = Array.from({ length: 100 }, (_, index) => index)
    const result = shuffle(items)
    expect([...result].sort((a, b) => a - b)).toEqual(items)
  })

  it('genera quizzes rápidos distintos en sesiones consecutivas', () => {
    const pool = questionsByModule.dql
    const runs = Array.from({ length: 20 }, () => quickQuizIds(pool, emptyProgress()).join(','))
    expect(new Set(runs).size).toBeGreaterThan(15)
    expect(runs.every((run) => run.split(',').length === 8 && new Set(run.split(',')).size === 8)).toBe(true)
  })

  it('rota el pool: lo ya respondido no vuelve mientras queden preguntas sin ver', () => {
    const pool = questionsByModule.security
    const first = quickQuizIds(pool, emptyProgress())
    const second = quickQuizIds(pool, answered(first))
    expect(second.some((id) => first.includes(id))).toBe(false)
  })

  it('evita repetir lo servido recientemente aunque no se haya respondido', () => {
    const pool = questionsByModule.automation
    const first = quickQuizIds(pool, emptyProgress())
    const second = quickQuizIds(pool, emptyProgress(), first)
    expect(second.some((id) => first.includes(id))).toBe(false)
  })

  it('recorre todo el pool antes de repetir preguntas', () => {
    const pool = questionsByModule.ingestion
    let progress = emptyProgress()
    const seen = new Set<string>()
    for (let round = 0; round < Math.floor(pool.length / 8); round += 1) {
      const ids = quickQuizIds(pool, progress)
      ids.forEach((id) => expect(seen.has(id), id).toBe(false))
      ids.forEach((id) => seen.add(id))
      progress = answered([...seen])
    }
  })

  it('reparte el simulacro de 60 preguntas entre todos los módulos', () => {
    const ids = mockExamIds(allQuestions, emptyProgress())
    expect(ids).toHaveLength(60)
    expect(new Set(ids).size).toBe(60)
    const modulesInMock = new Set(ids.map((id) => allQuestions.find((question) => question.id === id)!.moduleId))
    expect(modulesInMock.size).toBe(12)
    expect(mockExamIds(allQuestions, emptyProgress()).join()).not.toBe(ids.join())
  })

  it('el repaso adaptativo toma solo la cola de repaso y baraja su orden', () => {
    const failed = questionsByModule.platform.slice(0, 5).map((question) => question.id)
    const ids = adaptiveReviewIds(allQuestions, answered(failed, false))
    expect([...ids].sort()).toEqual([...failed].sort())
    expect(adaptiveReviewIds(allQuestions, emptyProgress())).toEqual([])
    const many = answered(questionsByModule.dql.slice(0, 20).map((question) => question.id), false)
    const runs = new Set(Array.from({ length: 10 }, () => adaptiveReviewIds(allQuestions, many).join()))
    expect(runs.size).toBeGreaterThan(1)
  })

  it('el contador de repaso coincide con la longitud de la cola', () => {
    const failed = questionsByModule.security.slice(0, 30).map((question) => question.id)
    const sure = questionsByModule.dql.slice(0, 10).map((question) => question.id)
    const progress = answered(sure)
    Object.assign(progress.attempts, answered(failed, false).attempts)
    const counter = dueQuestionIds(progress, allQuestions).length
    expect(counter).toBe(30)
    expect(adaptiveReviewIds(allQuestions, progress, Infinity)).toHaveLength(counter)
    expect(adaptiveReviewIds(allQuestions, progress)).toHaveLength(Math.min(REVIEW_SESSION_SIZE, counter))
  })

  it('el banco completo incluye todas las preguntas en orden variable', () => {
    const pool = questionsByModule.notebooks
    const ids = fullBankIds(pool)
    expect(new Set(ids)).toEqual(new Set(pool.map((question) => question.id)))
    expect(fullBankIds(pool).join()).not.toBe(ids.join())
  })

  it('baraja las opciones y la clave cae en todas las posiciones', () => {
    const sample = allQuestions.filter((question) => question.type === 'single').slice(0, 400)
    const positions = new Set<number>()
    for (const question of sample) positions.add(optionOrders([question])[question.id].indexOf(question.correctOptionIds[0]))
    expect(positions).toEqual(new Set([0, 1, 2, 3]))
  })

  it('byFreshness pone primero lo no respondido', () => {
    const pool = questionsByModule.other
    const done = pool.slice(0, 40).map((question) => question.id)
    const ordered = byFreshness(pool, answered(done))
    expect(ordered.slice(0, pool.length - 40).every((question) => !done.includes(question.id))).toBe(true)
  })
})
