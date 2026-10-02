import index from './generated/question-index.json'
import type { QuestionIndexEntry } from '../lib/light-index'
import { modules } from './modules'
import type { Module, QuestionBucket } from './types'

/**
 * Catálogo ligero del banco (generado por `npm run inventario`): lo que la app necesita de forma síncrona
 * (selección de preguntas, contadores, progreso, repaso, copia de seguridad y validación del simulacro guardado).
 * El texto de las preguntas (enunciado, opciones, explicación) se carga por bloque: ver question-loader.ts.
 */
export const questionIndex = index as QuestionIndexEntry[]

export const questionMetaById: Record<string, QuestionIndexEntry> = Object.fromEntries(questionIndex.map((entry) => [entry.id, entry]))
export const questionIndexByModule: Record<string, QuestionIndexEntry[]> = Object.fromEntries(
  modules.map((module) => [module.id, questionIndex.filter((entry) => entry.moduleId === module.id)]),
)
export const totalQuestions = questionIndex.length

export const modulesWithQuestions: Module[] = modules.map((module) => ({
  id: module.id,
  order: module.order,
  title: module.title,
  eyebrow: module.eyebrow,
  summary: module.summary,
  objectives: module.objectives,
  keyTerms: module.keyTerms,
  sources: module.sources,
  focus: module.focus,
  questionIds: questionIndexByModule[module.id].map((entry) => entry.id),
}))

export const bucketCount = (moduleId: string, bucket: QuestionBucket): number =>
  (questionIndexByModule[moduleId] ?? []).filter((entry) => entry.bucket === bucket).length
