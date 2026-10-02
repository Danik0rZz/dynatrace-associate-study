import type { Question, QuestionBucket } from '../data/types'
import { dueQuestionIds, type ProgressState } from './progress'
import { safeSetItem } from './safe-storage'

/**
 * Selección aleatoria de preguntas para quizzes, simulacro y repaso.
 *
 * Garantías:
 * - Aleatoriedad real: Fisher–Yates con crypto.getRandomValues (si existe), nunca semillas correlativas.
 * - Rotación: dentro de cada pool se prioriza lo menos practicado y lo no servido recientemente,
 *   así dos sesiones seguidas no repiten las mismas preguntas mientras queden otras sin ver.
 * - El orden de las opciones se baraja de forma independiente en cada pregunta y sesión.
 *
 * La selección solo usa id, bloque y tipo (`bucket`): funciona con el catálogo ligero, sin cargar el texto.
 */

/** Lo que la selección necesita de cada pregunta (lo tienen tanto `Question` como el catálogo ligero). */
export type Selectable = Pick<Question, 'id' | 'moduleId' | 'bucket'>

export type RandomSource = () => number

const cryptoRandom: RandomSource = () => {
  const cryptoApi = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined
  if (cryptoApi?.getRandomValues) {
    const buffer = new Uint32Array(1)
    cryptoApi.getRandomValues(buffer)
    return buffer[0] / 4294967296
  }
  return Math.random()
}

export const shuffle = <T,>(items: readonly T[], random: RandomSource = cryptoRandom): T[] => {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

/* ——— Historial de preguntas servidas (aunque no se respondan) ——— */

const SERVED_KEY = 'dynatrace-associate-served-v1'
const SERVED_LIMIT = 400

export const loadServed = (): string[] => {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(SERVED_KEY) : null
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export const rememberServed = (ids: string[]): void => {
  // Si no se puede guardar, la selección sigue siendo aleatoria.
  const next = [...ids, ...loadServed().filter((id) => !ids.includes(id))].slice(0, SERVED_LIMIT)
  safeSetItem(SERVED_KEY, JSON.stringify(next))
}

/**
 * Ordena un pool por frescura: primero lo nunca respondido, luego lo menos practicado;
 * dentro de cada nivel, lo no servido recientemente; los empates se resuelven al azar.
 */
export const byFreshness = <T extends Pick<Question, 'id'>>(questions: readonly T[], progress: ProgressState, served: readonly string[] = [], random: RandomSource = cryptoRandom): T[] => {
  const recency = new Map(served.map((id, index) => [id, served.length - index]))
  const randomized = shuffle(questions, random)
  return randomized
    .map((question, order) => ({ question, order, attempts: progress.attempts[question.id]?.length ?? 0, recent: recency.get(question.id) ?? 0 }))
    .sort((left, right) => left.attempts - right.attempts || left.recent - right.recent || left.order - right.order)
    .map((entry) => entry.question)
}

const QUICK_TARGET: Record<QuestionBucket, number> = { practical: 1, troubleshooting: 1, scenario: 3, precision: 2, knowledge: 1 }

/** Quiz rápido de un módulo: 8 preguntas con mezcla de tipos, rotando el pool. */
export const quickQuizIds = (questions: readonly Selectable[], progress: ProgressState, served: readonly string[] = [], size = 8, random: RandomSource = cryptoRandom): string[] => {
  const ordered = byFreshness(questions, progress, served, random)
  // La mezcla de tipos solo se aplica dentro del nivel más fresco del pool, para no reintroducir repetidas.
  const attempts = (question: Selectable) => progress.attempts[question.id]?.length ?? 0
  const freshest = ordered.length ? attempts(ordered[0]) : 0
  const tier = ordered.filter((question) => attempts(question) === freshest)
  const candidates = tier.length >= size ? tier : ordered.slice(0, size)
  const picked: Selectable[] = []
  for (const bucket of Object.keys(QUICK_TARGET) as QuestionBucket[]) {
    picked.push(...candidates.filter((question) => question.bucket === bucket).slice(0, QUICK_TARGET[bucket]))
  }
  const chosen = new Set(picked.map((question) => question.id))
  const fill = ordered.filter((question) => !chosen.has(question.id)).slice(0, Math.max(0, size - picked.length))
  return shuffle([...picked, ...fill].slice(0, size), random).map((question) => question.id)
}

/** Banco completo de un módulo en orden aleatorio. */
export const fullBankIds = (questions: readonly Pick<Question, 'id'>[], random: RandomSource = cryptoRandom): string[] =>
  shuffle(questions, random).map((question) => question.id)

/**
 * Simulacro: reparto proporcional al tamaño de cada módulo (método del mayor resto),
 * rotando dentro de cada módulo y barajando el orden final.
 */
export const mockExamIds = (questions: readonly Selectable[], progress: ProgressState, served: readonly string[] = [], size = 60, random: RandomSource = cryptoRandom): string[] => {
  const byModule = new Map<string, Selectable[]>()
  for (const question of questions) byModule.set(question.moduleId, [...(byModule.get(question.moduleId) ?? []), question])
  const total = questions.length
  const quotas = [...byModule.entries()].map(([moduleId, pool]) => {
    const exact = (pool.length / total) * size
    return { moduleId, pool, quota: Math.floor(exact), remainder: exact - Math.floor(exact), tie: random() }
  })
  let missing = size - quotas.reduce((sum, entry) => sum + entry.quota, 0)
  for (const entry of [...quotas].sort((a, b) => b.remainder - a.remainder || a.tie - b.tie)) {
    if (missing <= 0) break
    entry.quota += 1
    missing -= 1
  }
  const picked = quotas.flatMap((entry) => byFreshness(entry.pool, progress, served, random).slice(0, entry.quota))
  return shuffle(picked, random).map((question) => question.id)
}

/**
 * Repaso adaptativo: las `limit` primeras preguntas de la cola (`dueQuestionIds`), es decir, las de más
 * prioridad, en orden barajado. Con la cola vacía no hay repaso.
 */
export const REVIEW_SESSION_SIZE = 24
export const adaptiveReviewIds = (questions: readonly Pick<Question, 'id'>[], progress: ProgressState, limit = REVIEW_SESSION_SIZE, random: RandomSource = cryptoRandom): string[] =>
  shuffle(dueQuestionIds(progress, questions).slice(0, limit), random)

/** Orden aleatorio e independiente de las opciones de cada pregunta. */
export const optionOrders = (questions: readonly Pick<Question, 'id' | 'options'>[], random: RandomSource = cryptoRandom): Record<string, string[]> =>
  Object.fromEntries(questions.map((question) => [question.id, shuffle(question.options.map((option) => option.id), random)]))
