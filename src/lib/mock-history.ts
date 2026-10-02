import type { Question } from '../data/types'
import { scoreAttempt } from './progress'
import { safeSetItem } from './safe-storage'

/** Historial de simulacros entregados, para las estadísticas. */

export const MOCK_HISTORY_KEY = 'dynatrace-associate-mock-history-v1'
export const MAX_MOCK_HISTORY = 20

export type MockHistoryEntry = {
  /** Fecha de entrega (ISO). */
  date: string
  /** Nota en % (0-100), con crédito parcial en las de respuesta múltiple, como en el resultado del simulacro. */
  score: number
  /** Segundos entre el inicio y la entrega. */
  durationSeconds: number
  correct: number
  total: number
  byModule: Record<string, { correct: number; total: number }>
}

const isCount = (value: unknown): value is number => Number.isInteger(value) && (value as number) >= 0

const isEntry = (value: unknown): value is MockHistoryEntry => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const entry = value as Record<string, unknown>
  if (typeof entry.date !== 'string' || Number.isNaN(Date.parse(entry.date))) return false
  if (typeof entry.score !== 'number' || !Number.isFinite(entry.score) || entry.score < 0 || entry.score > 100) return false
  if (!isCount(entry.durationSeconds) || !isCount(entry.correct) || !isCount(entry.total) || entry.correct > entry.total) return false
  if (!entry.byModule || typeof entry.byModule !== 'object' || Array.isArray(entry.byModule)) return false
  return Object.values(entry.byModule).every((counts) => {
    if (!counts || typeof counts !== 'object') return false
    const { correct, total } = counts as Record<string, unknown>
    return isCount(correct) && isCount(total) && correct <= total
  })
}

/** Lee el historial. Un JSON dañado da una lista vacía; las entradas inválidas se ignoran. */
export const parseMockHistory = (raw: string | null): MockHistoryEntry[] => {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isEntry) : []
  } catch {
    return []
  }
}

export const loadMockHistory = (): MockHistoryEntry[] => {
  try {
    return parseMockHistory(typeof window !== 'undefined' ? window.localStorage.getItem(MOCK_HISTORY_KEY) : null)
  } catch {
    return []
  }
}

/** Añade una entrada y conserva las `MAX_MOCK_HISTORY` más recientes. */
export const appendMockHistory = (entry: MockHistoryEntry): MockHistoryEntry[] => {
  const next = [...loadMockHistory(), entry].slice(-MAX_MOCK_HISTORY)
  safeSetItem(MOCK_HISTORY_KEY, JSON.stringify(next))
  return next
}

export const buildMockHistoryEntry = (
  questions: readonly Question[], answers: Record<string, string[]>, startedAt: number, submittedAt: number, maxSeconds: number,
): MockHistoryEntry => {
  const results = questions.map((question) => ({ question, ...scoreAttempt(question, answers[question.id] ?? []) }))
  const byModule: MockHistoryEntry['byModule'] = {}
  for (const { question, correct } of results) {
    const counts = byModule[question.moduleId] ?? { correct: 0, total: 0 }
    byModule[question.moduleId] = { correct: counts.correct + (correct ? 1 : 0), total: counts.total + 1 }
  }
  return {
    date: new Date(submittedAt).toISOString(),
    score: results.length ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length * 100) : 0,
    durationSeconds: Math.min(maxSeconds, Math.max(0, Math.round((submittedAt - startedAt) / 1000))),
    correct: results.filter((result) => result.correct).length,
    total: results.length,
    byModule,
  }
}
