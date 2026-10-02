import { blocks } from './blocks'
import type { PrecisionFactSheet, StudyChapter } from './types'

/** Guía de estudio por bloque, con los apartados numerados por su orden («1. …», «2. …»). */
export const studyGuide: Record<string, StudyChapter> = Object.fromEntries(Object.entries(blocks).map(([moduleId, block]) => [
  moduleId,
  { ...block.guide, sections: block.guide.sections.map((section, index) => ({ ...section, title: `${index + 1}. ${section.title}` })) },
]))

/** Ficha de hechos de precisión por bloque. */
export const precisionFacts: Record<string, PrecisionFactSheet> = Object.fromEntries(Object.entries(blocks).map(([moduleId, block]) => [moduleId, block.precision]))
