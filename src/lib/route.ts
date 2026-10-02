import type { Module } from '../data/types'
import { moduleCompletion, type ProgressState } from './progress'

export const LAST_MODULE_KEY = 'dynatrace-associate-last-module-v1'

/** Un bloque está completado cuando todas sus preguntas tienen al menos un intento (`moduleCompletion` = 100). */
export const isModuleCompleted = (progress: ProgressState, module: Module): boolean =>
  module.questionIds.length > 0 && moduleCompletion(progress, module.questionIds) === 100

/**
 * Bloque al que lleva «Continuar ruta»: el último visitado, si sigue existiendo; si no, el primer bloque no completado
 * en el orden de `modules.ts`; si están todos completados, el último.
 */
export const continueModule = (modules: readonly Module[], progress: ProgressState, lastVisitedId: string | null): Module => {
  const lastVisited = lastVisitedId ? modules.find((module) => module.id === lastVisitedId) : undefined
  return lastVisited ?? modules.find((module) => !isModuleCompleted(progress, module)) ?? modules[modules.length - 1]
}
