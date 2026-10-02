import type { Module, PrecisionFactSheet, Question, StudyChapter } from '../data/types'
import { isIsoDate } from './dates'

/**
 * Índices ligeros, GENERADOS por `npm run inventario` a partir de los datos completos (nunca a mano):
 * - guía: apartados (id, título numerado y fecha «Revisado» del plan) por bloque y si el bloque tiene ficha de precisión
 *   (con su fecha). Lo usa la app de forma síncrona (router, títulos de apartado, fechas) mientras la guía completa se
 *   carga por bloque. Las fechas salen de docs/plan-apartados.csv (columna Revisado): nunca se copian a mano.
 * - preguntas: metadatos de cada pregunta. La app los usa de forma síncrona (selección, contadores, repaso, validación
 *   del simulacro guardado) mientras el texto de las preguntas se carga por bloque (question-loader.ts).
 * Un test falla si los ficheros generados no coinciden con los datos.
 */

export type GuideIndex = Record<string, { precision: boolean; precisionReviewed?: string; sections: { id: string; title: string; reviewed?: string }[] }>

/** Lo que el índice necesita del plan (docs/plan-apartados.csv). */
export type PlanDates = readonly { bloque: string; apartado: string; revisado: string }[]

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

export const buildGuideIndex = (modules: readonly Pick<Module, 'id'>[], guide: Record<string, StudyChapter>, precision: Record<string, PrecisionFactSheet>, plan: PlanDates = []): GuideIndex => {
  // Solo fechas válidas (AAAA-MM-DD): un apartado sin fecha en el plan no la lleva en el índice.
  const reviewed = new Map(plan.filter((row) => isIsoDate(row.revisado)).map((row) => [`${row.bloque}::${row.apartado}`, row.revisado]))
  const dateOf = (moduleId: string, sectionId: string) => reviewed.get(`${moduleId}::${sectionId}`)
  return Object.fromEntries(modules.map((module) => [module.id, {
    precision: Boolean(precision[module.id]),
    ...(precision[module.id] && dateOf(module.id, 'precision-facts') ? { precisionReviewed: dateOf(module.id, 'precision-facts') } : {}),
    sections: (guide[module.id]?.sections ?? []).map((section) => ({ id: section.id, title: section.title, ...(dateOf(module.id, section.id) ? { reviewed: dateOf(module.id, section.id) } : {}) })),
  }]))
}

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
