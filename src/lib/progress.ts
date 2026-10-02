import type { Attempt, Question } from '../data/types'
import { safeSetItem } from './safe-storage'

export const PROGRESS_KEY = 'dynatrace-associate-progress-v3'
/** Intentos que se conservan por pregunta: los más antiguos se descartan al registrar uno nuevo. */
export const MAX_ATTEMPTS_PER_QUESTION = 20
/** Confianza (1-5) a partir de la cual un acierto cuenta como seguro. */
export const SURE_CONFIDENCE = 3
/** Aciertos seguros consecutivos que sacan una pregunta del repaso. */
export const REVIEW_EXIT_STREAK = 2

export type ProgressState = {
  version: 3
  attempts: Record<string, Attempt[]>
}

export const emptyProgress = (): ProgressState => ({ version: 3, attempts: {} })

/** Interpreta el JSON guardado. Los campos de versiones anteriores (`completedModules`, `activeQuestionId`) se ignoran. */
export const parseProgress = (raw: string | null): ProgressState => {
  if (!raw) return emptyProgress()
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; attempts?: unknown }
    if (!parsed || parsed.version !== 3 || !parsed.attempts || typeof parsed.attempts !== 'object' || Array.isArray(parsed.attempts)) return emptyProgress()
    return { version: 3, attempts: parsed.attempts as Record<string, Attempt[]> }
  } catch {
    return emptyProgress()
  }
}
export const loadProgress = (): ProgressState => {
  try {
    return parseProgress(typeof window !== 'undefined' ? window.localStorage.getItem(PROGRESS_KEY) : null)
  } catch {
    return emptyProgress()
  }
}
export const saveProgress = (progress: ProgressState): boolean => safeSetItem(PROGRESS_KEY, JSON.stringify(progress))
export const scoreAttempt = (question: Question, selectedOptionIds: string[]): { score: number; correct: boolean } => {
  const selected = [...new Set(selectedOptionIds)]
  const correct = question.correctOptionIds
  const exact = selected.length === correct.length && selected.every((id) => correct.includes(id))
  if (exact) return { score: 1, correct: true }
  if (question.type === 'single') return { score: 0, correct: false }
  const good = selected.filter((id) => correct.includes(id)).length
  const bad = selected.filter((id) => !correct.includes(id)).length
  return { score: Math.max(0, (good - bad) / correct.length), correct: false }
}
export const recordAttempt = (
  progress: ProgressState, question: Question, selectedOptionIds: string[], confidence: Attempt['confidence'],
): ProgressState => {
  const selected = [...new Set(selectedOptionIds)]
  const attempt: Attempt = {
    questionId: question.id,
    selectedOptionIds: selected,
    ...scoreAttempt(question, selected),
    confidence,
    timestamp: new Date().toISOString(),
  }
  const history = [...(progress.attempts[question.id] ?? []), attempt].slice(-MAX_ATTEMPTS_PER_QUESTION)
  return { ...progress, attempts: { ...progress.attempts, [question.id]: history } }
}
export const latestAttempt = (progress: ProgressState, questionId: string): Attempt | undefined => {
  const attempts = progress.attempts[questionId]
  return attempts?.[attempts.length - 1]
}

const isSure = (attempt: Attempt): boolean => attempt.correct && attempt.confidence >= SURE_CONFIDENCE

/**
 * Criterio único de repaso. Una pregunta entra en el repaso al fallarla o al responderla con confianza ≤ 2,
 * y sale tras dos aciertos consecutivos con confianza ≥ 3. Lo nunca respondido no está en el repaso.
 */
export const needsReview = (attempts: readonly Attempt[] | undefined): boolean => {
  if (!attempts?.length) return false
  let streak = 0
  for (let index = attempts.length - 1; index >= 0; index -= 1) {
    if (!isSure(attempts[index])) return streak < REVIEW_EXIT_STREAK
    streak += 1
  }
  return false
}

/** Cola de repaso: las preguntas pendientes, de la respondida hace más tiempo a la más reciente. */
export const dueQuestionIds = (progress: ProgressState, questions: readonly Question[]): string[] =>
  questions
    .filter((question) => needsReview(progress.attempts[question.id]))
    .sort((left, right) => (latestAttempt(progress, left.id)?.timestamp ?? '').localeCompare(latestAttempt(progress, right.id)?.timestamp ?? ''))
    .map((question) => question.id)
export const moduleScore = (progress: ProgressState, questionIds: string[]): number => {
  const latest = questionIds.map((id) => latestAttempt(progress, id)).filter((attempt): attempt is Attempt => Boolean(attempt))
  return latest.length ? Math.round(latest.reduce((sum, attempt) => sum + attempt.score, 0) / latest.length * 100) : 0
}
export const moduleCompletion = (progress: ProgressState, questionIds: string[]): number =>
  questionIds.length ? Math.round(questionIds.filter((id) => Boolean(latestAttempt(progress, id))).length / questionIds.length * 100) : 0
