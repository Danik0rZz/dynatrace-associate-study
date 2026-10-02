import type { Attempt, Question } from '../data/types'

const STORAGE_KEY = 'dynatrace-associate-progress-v3'
export type ProgressState = {
  version: 3
  attempts: Record<string, Attempt[]>
  completedModules: string[]
  activeQuestionId?: string
}

export const emptyProgress = (): ProgressState => ({ version: 3, attempts: {}, completedModules: [] })
export const loadProgress = (): ProgressState => {
  if (typeof window === 'undefined') return emptyProgress()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const parsed = JSON.parse(raw) as ProgressState
    if (parsed.version !== 3 || typeof parsed.attempts !== 'object') return emptyProgress()
    return { version: 3, attempts: parsed.attempts ?? {}, completedModules: parsed.completedModules ?? [], activeQuestionId: parsed.activeQuestionId }
  } catch {
    return emptyProgress()
  }
}
export const saveProgress = (progress: ProgressState): void => {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}
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
  return { ...progress, attempts: { ...progress.attempts, [question.id]: [...(progress.attempts[question.id] ?? []), attempt] } }
}
export const latestAttempt = (progress: ProgressState, questionId: string): Attempt | undefined => {
  const attempts = progress.attempts[questionId]
  return attempts?.[attempts.length - 1]
}
export const dueQuestionIds = (progress: ProgressState, questions: Question[]): string[] =>
  questions.filter((question) => {
    const latest = latestAttempt(progress, question.id)
    return !latest || !latest.correct || latest.confidence <= 3
  }).sort((left, right) => {
    const leftLatest = latestAttempt(progress, left.id)
    const rightLatest = latestAttempt(progress, right.id)
    if (!leftLatest && rightLatest) return -1
    if (leftLatest && !rightLatest) return 1
    return (leftLatest?.timestamp ?? '').localeCompare(rightLatest?.timestamp ?? '')
  }).map((question) => question.id)
export const adaptiveReviewQuestionIds = (progress: ProgressState, questions: Question[], limit = 24): string[] => {
  const due = dueQuestionIds(progress, questions)
  const unseen = questions.filter((question) => !progress.attempts[question.id]).map((question) => question.id)
  return [...new Set([...due, ...unseen])].slice(0, limit)
}
export const moduleScore = (progress: ProgressState, questionIds: string[]): number => {
  const latest = questionIds.map((id) => latestAttempt(progress, id)).filter((attempt): attempt is Attempt => Boolean(attempt))
  return latest.length ? Math.round(latest.reduce((sum, attempt) => sum + attempt.score, 0) / latest.length * 100) : 0
}
export const moduleCompletion = (progress: ProgressState, questionIds: string[]): number =>
  questionIds.length ? Math.round(questionIds.filter((id) => Boolean(latestAttempt(progress, id))).length / questionIds.length * 100) : 0
export { STORAGE_KEY }
