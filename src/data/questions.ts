import { blockQuestions } from './blocks/questions'
import { modules } from './modules'
import type { Module, Question, QuestionBucket } from './types'

/**
 * Banco de preguntas COMPLETO, en el orden de los bloques: solo para Node (inventario) y los tests. La app usa el
 * catálogo ligero (question-catalog.ts) y carga el texto por bloque (question-loader.ts); un test lo comprueba.
 */
export const allQuestions: Question[] = modules.flatMap((module) => blockQuestions[module.id] ?? [])

export const questionsById: Record<string, Question> = Object.fromEntries(allQuestions.map((question) => [question.id, question]))
export const questionsByModule: Record<string, Question[]> = Object.fromEntries(
  modules.map((module) => [module.id, allQuestions.filter((question) => question.moduleId === module.id)]),
)
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
  questionIds: questionsByModule[module.id].map((question) => question.id),
}))
export const questionCounts = Object.fromEntries(modules.map((module) => [
  module.id,
  Object.fromEntries((['knowledge', 'precision', 'scenario', 'troubleshooting', 'practical'] as QuestionBucket[])
    .map((bucket) => [bucket, questionsByModule[module.id].filter((question) => question.bucket === bucket).length])),
])) as Record<string, Record<QuestionBucket, number>>
