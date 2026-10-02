import { sectionIndexEntry } from '../data/guide-index'
import { allQuestions } from '../data/questions'
import type { PrecisionFact, PrecisionFactSheet, Question, StudyChapter, StudySection } from '../data/types'
import { normalizeText } from './guide-text'

/**
 * Enlace pregunta ↔ guía de estudio, construido a partir de la cobertura verificada
 * (cada pregunta apunta a un apartado de su bloque y a la frase literal que la respalda).
 */

export const PRECISION_SECTION = 'precision-facts'

export type GuideRef = {
  moduleId: string
  sectionId: string
  /** Título del apartado sin la numeración ("3. Foo" → "Foo"). */
  title: string
  /** Frase literal de la guía que contiene la respuesta. */
  evidence: string
}

const stripNumber = (title: string) => title.replace(/^\d+\.\s*/, '')

/** Apartado dentro de la guía ya cargada de un bloque. */
export const sectionFor = (chapter: StudyChapter | undefined, sectionId: string): StudySection | undefined =>
  chapter?.sections.find((section) => section.id === sectionId)

/** Título sin número, desde el índice ligero (síncrono: no hace falta tener la guía cargada). */
export const sectionTitle = (moduleId: string, sectionId: string): string =>
  sectionId === PRECISION_SECTION ? 'Hechos de precisión' : stripNumber(sectionIndexEntry(moduleId, sectionId)?.title ?? sectionId)

export const guideRefFor = (question: Question): GuideRef | undefined => {
  const entry = question.guide
  if (!entry) return undefined
  return { moduleId: question.moduleId, sectionId: entry.section, title: sectionTitle(question.moduleId, entry.section), evidence: entry.evidence }
}

const sectionKey = (moduleId: string, sectionId: string) => `${moduleId}::${sectionId}`

const questionIdsBySection: Record<string, string[]> = {}
for (const question of allQuestions) {
  const ref = question.guide
  if (!ref) continue
  const key = sectionKey(question.moduleId, ref.section)
  ;(questionIdsBySection[key] ??= []).push(question.id)
}

/** Preguntas del banco que se responden con un apartado concreto de la guía. */
export const questionIdsForSection = (moduleId: string, sectionId: string): string[] =>
  questionIdsBySection[sectionKey(moduleId, sectionId)] ?? []

/** Filas de la ficha de precisión que contienen la evidencia (o toda la ficha si no se localiza). */
export const precisionRowsFor = (sheet: PrecisionFactSheet | undefined, evidence: string): PrecisionFact[] => {
  const rows = sheet?.rows ?? []
  const needle = normalizeText(evidence)
  const matching = rows.filter((row) => normalizeText(`${row.topic} · ${row.fact} · ${row.examNote}`).includes(needle))
  return matching.length ? matching : rows
}

export type SectionMiss = { moduleId: string; sectionId: string; title: string; questionIds: string[] }

/** Agrupa preguntas falladas por apartado de la guía, de más a menos fallos. */
export const groupBySection = (questions: Question[]): SectionMiss[] => {
  const groups = new Map<string, SectionMiss>()
  for (const question of questions) {
    const ref = guideRefFor(question)
    if (!ref) continue
    const key = sectionKey(ref.moduleId, ref.sectionId)
    const group = groups.get(key) ?? { moduleId: ref.moduleId, sectionId: ref.sectionId, title: ref.title, questionIds: [] }
    group.questionIds.push(question.id)
    groups.set(key, group)
  }
  return [...groups.values()].sort((left, right) => right.questionIds.length - left.questionIds.length || left.title.localeCompare(right.title))
}
