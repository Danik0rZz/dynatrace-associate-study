import { blocks } from './blocks'
import { numberChapter } from './guide-numbering'
import type { PrecisionFactSheet, StudyChapter } from './types'

/**
 * Guía completa de todos los bloques, de forma síncrona. SOLO para Node (inventario, índice ligero) y los tests:
 * la app carga la guía por bloque con src/data/guide-loader.ts.
 */
export const studyGuide: Record<string, StudyChapter> = Object.fromEntries(Object.entries(blocks).map(([moduleId, block]) => [moduleId, numberChapter(block.guide)]))

/** Ficha de hechos de precisión por bloque (solo Node y tests). */
export const precisionFacts: Record<string, PrecisionFactSheet> = Object.fromEntries(Object.entries(blocks).map(([moduleId, block]) => [moduleId, block.precision]))
