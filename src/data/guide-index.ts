import index from './generated/guide-index.json'
import type { GuideIndex } from '../lib/light-index'

/**
 * Índice ligero de la guía (generado por `npm run inventario`): apartados de cada bloque con su título numerado y si
 * tiene ficha de precisión. Es síncrono y pequeño; la guía completa se carga por bloque (guide-loader.ts).
 */
export const guideIndex = index as GuideIndex

export const hasPrecisionSheet = (moduleId: string): boolean => Boolean(guideIndex[moduleId]?.precision)

export const sectionIndexEntry = (moduleId: string, sectionId: string) => guideIndex[moduleId]?.sections.find((section) => section.id === sectionId)

/** Fecha «Revisado» del apartado (o de la ficha de precisión) según el plan, si la tiene. */
export const sectionReviewed = (moduleId: string, sectionId: string): string | undefined =>
  sectionId === 'precision-facts' ? guideIndex[moduleId]?.precisionReviewed : sectionIndexEntry(moduleId, sectionId)?.reviewed
