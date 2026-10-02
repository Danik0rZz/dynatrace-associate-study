import type { Module, PrecisionFactSheet, Question, StudyChapter } from '../data/types'

/**
 * Índices ligeros, GENERADOS por `npm run inventario` a partir de los datos completos (nunca a mano):
 * - guía: apartados (id y título numerado) por bloque y si el bloque tiene ficha de precisión. Lo usa la app de forma
 *   síncrona (router, títulos de apartado) mientras la guía completa se carga por bloque.
 * - preguntas: metadatos de cada pregunta. La app los usa de forma síncrona (selección, contadores, repaso, validación
 *   del simulacro guardado) mientras el texto de las preguntas se carga por bloque (question-loader.ts).
 * Un test falla si los ficheros generados no coinciden con los datos.
 */

export type GuideIndex = Record<string, { precision: boolean; sections: { id: string; title: string }[] }>

export type QuestionIndexEntry = {
  id: string
  moduleId: string
  section: string
  difficulty: Question['difficulty']
  type: Question['type']
  bucket: Question['bucket']
  /** Número de opciones correctas (las múltiples piden «Selecciona N»). */
  correctCount: number
  /** Ids de las opciones, en el orden del banco: validan el simulacro guardado sin cargar el texto. */
  optionIds: string[]
  hasStimulus: boolean
  lastVerified: string
}

export const buildGuideIndex = (modules: readonly Pick<Module, 'id'>[], guide: Record<string, StudyChapter>, precision: Record<string, PrecisionFactSheet>): GuideIndex =>
  Object.fromEntries(modules.map((module) => [module.id, {
    precision: Boolean(precision[module.id]),
    sections: (guide[module.id]?.sections ?? []).map((section) => ({ id: section.id, title: section.title })),
  }]))

export const buildQuestionIndex = (questions: readonly Question[]): QuestionIndexEntry[] => questions.map((question) => ({
  id: question.id,
  moduleId: question.moduleId,
  section: question.guide?.section ?? '',
  difficulty: question.difficulty,
  type: question.type,
  bucket: question.bucket,
  correctCount: question.correctOptionIds.length,
  optionIds: question.options.map((option) => option.id),
  hasStimulus: Boolean(question.stimulus),
  lastVerified: question.lastVerified,
}))

/** JSON con una entrada por línea: diffs legibles en git y tamaño contenido. */
export const renderIndexJson = (value: GuideIndex | QuestionIndexEntry[]): string => {
  if (Array.isArray(value)) return `[\n${value.map((entry) => `  ${JSON.stringify(entry)}`).join(',\n')}\n]\n`
  return `{\n${Object.entries(value).map(([key, entry]) => `  ${JSON.stringify(key)}: ${JSON.stringify(entry)}`).join(',\n')}\n}\n`
}
