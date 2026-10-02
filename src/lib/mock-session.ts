import type { Attempt, Question } from '../data/types'
import { safeSetItem } from './safe-storage'

/**
 * Simulacro en curso guardado en localStorage, para reanudarlo tras salir o recargar.
 * Se guarda el `deadline` (instante absoluto en ms), no los segundos restantes: el tiempo sigue corriendo
 * mientras la app está cerrada, igual que en el examen.
 */

export const MOCK_SESSION_KEY = 'dynatrace-associate-mock-session-v1'

type Confidence = Attempt['confidence']

export type SavedMock = {
  version: 1
  title: string
  questionIds: string[]
  optionOrderByQuestionId: Record<string, string[]>
  answers: Record<string, string[]>
  confidenceByQuestion: Record<string, Confidence>
  flagged: string[]
  index: number
  deadline: number
}

/** Segundos que faltan hasta `deadline`, redondeando hacia arriba; nunca negativo. */
export const secondsUntil = (deadline: number, now: number = Date.now()): number => Math.max(0, Math.ceil((deadline - now) / 1000))

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value)
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string')
const sameSet = (left: string[], right: string[]) => left.length === right.length && new Set(left).size === left.length && left.every((id) => right.includes(id))

/**
 * Valida un simulacro guardado contra el banco actual. Devuelve `null` si el JSON está dañado o ya no es
 * compatible (preguntas u opciones que ya no existen, índices fuera de rango…).
 */
export const parseSavedMock = (raw: string | null, questionsById: Record<string, Question>): SavedMock | null => {
  if (!raw) return null
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  if (!isRecord(data) || data.version !== 1 || typeof data.title !== 'string') return null
  const { questionIds, optionOrderByQuestionId, answers, confidenceByQuestion, flagged, index, deadline } = data
  if (!isStringArray(questionIds) || !questionIds.length || new Set(questionIds).size !== questionIds.length) return null
  const questions = questionIds.map((id) => questionsById[id])
  if (questions.some((question) => !question)) return null
  const optionIds = (question: Question) => question.options.map((option) => option.id)
  if (!isRecord(optionOrderByQuestionId) || !isRecord(answers) || !isRecord(confidenceByQuestion)) return null
  for (const question of questions) {
    const order = optionOrderByQuestionId[question.id]
    if (!isStringArray(order) || !sameSet(order, optionIds(question))) return null
  }
  for (const [id, selected] of Object.entries(answers)) {
    const question = questionsById[id]
    if (!questionIds.includes(id) || !isStringArray(selected) || !selected.every((optionId) => optionIds(question).includes(optionId))) return null
  }
  for (const [id, value] of Object.entries(confidenceByQuestion)) {
    if (!questionIds.includes(id) || !Number.isInteger(value) || (value as number) < 1 || (value as number) > 5) return null
  }
  if (!isStringArray(flagged) || !flagged.every((id) => questionIds.includes(id))) return null
  if (!Number.isInteger(index) || (index as number) < 0 || (index as number) >= questionIds.length) return null
  if (typeof deadline !== 'number' || !Number.isFinite(deadline)) return null
  return {
    version: 1,
    title: data.title,
    questionIds,
    optionOrderByQuestionId: optionOrderByQuestionId as Record<string, string[]>,
    answers: answers as Record<string, string[]>,
    confidenceByQuestion: confidenceByQuestion as Record<string, Confidence>,
    flagged,
    index: index as number,
    deadline,
  }
}

export const clearSavedMock = (): void => {
  try {
    if (typeof window !== 'undefined') window.localStorage.removeItem(MOCK_SESSION_KEY)
  } catch {
    /* almacenamiento no disponible: no hay nada que borrar */
  }
}

/** Lee el simulacro guardado; si está dañado o es incompatible, lo borra y devuelve `null`. */
export const loadSavedMock = (questionsById: Record<string, Question>): SavedMock | null => {
  let raw: string | null = null
  try {
    raw = typeof window !== 'undefined' ? window.localStorage.getItem(MOCK_SESSION_KEY) : null
  } catch {
    return null
  }
  const saved = parseSavedMock(raw, questionsById)
  if (raw !== null && !saved) clearSavedMock()
  return saved
}

export const saveMock = (mock: SavedMock): boolean => safeSetItem(MOCK_SESSION_KEY, JSON.stringify(mock))
