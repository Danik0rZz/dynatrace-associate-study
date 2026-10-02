/// <reference types="vite/client" />
import { useEffect, useSyncExternalStore } from 'react'
import { questionMetaById } from './question-catalog'
import type { Question } from './types'

/**
 * Carga diferida del texto de las preguntas: las de cada bloque van en su propio chunk (`questions-<bloque>`, ver
 * manualChunks en vite.config.ts) y se descargan solo cuando hacen falta (al empezar una sesión o al mostrar el
 * historial de errores). Lo síncrono (selección, contadores, repaso, copia de seguridad) usa el catálogo ligero.
 */

type QuestionsModule = { questions: Question[] }
type Importer = (moduleId: string) => Promise<QuestionsModule>

const loaders = import.meta.glob<QuestionsModule>('./blocks/*/questions.ts')
const defaultImporter: Importer = (moduleId) => {
  const loader = loaders[`./blocks/${moduleId}/questions.ts`]
  return loader ? loader() : Promise.reject(new Error(`Bloque sin preguntas: ${moduleId}`))
}
let importer: Importer = defaultImporter

export type LoadStatus = 'loading' | 'error' | 'ready'

const byId = new Map<string, Question>()
const loaded = new Set<string>()
const failed = new Set<string>()
const pending = new Map<string, Promise<void>>()
/** Bloques pedidos alguna vez (para los tests: la copia de seguridad o el repaso no deben pedir ninguno). */
const requested = new Set<string>()
const listeners = new Set<() => void>()
let version = 0
const notify = () => {
  version += 1
  for (const listener of listeners) listener()
}
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

/** Bloques (sin repetir) de unas preguntas, según el catálogo. */
export const blocksFor = (questionIds: readonly string[]): string[] =>
  [...new Set(questionIds.map((id) => questionMetaById[id]?.moduleId).filter((id): id is string => Boolean(id)))]

/** Pregunta completa, si su bloque ya está cargado. */
export const loadedQuestion = (id: string): Question | undefined => byId.get(id)

export const questionsLoaded = (questionIds: readonly string[]): boolean => blocksFor(questionIds).every((moduleId) => loaded.has(moduleId))

/** Descarga (una sola vez) las preguntas de un bloque. Rechaza si falla; un fallo se puede reintentar. */
export const loadQuestionBlock = (moduleId: string): Promise<void> => {
  if (loaded.has(moduleId)) return Promise.resolve()
  const running = pending.get(moduleId)
  if (running) return running
  requested.add(moduleId)
  if (failed.delete(moduleId)) notify()
  const promise = importer(moduleId)
    .then((module) => {
      for (const question of module.questions) byId.set(question.id, question)
      loaded.add(moduleId)
    }, (error: unknown) => {
      failed.add(moduleId)
      throw error
    })
    .finally(() => {
      pending.delete(moduleId)
      notify()
    })
  pending.set(moduleId, promise)
  return promise
}

/** Descarga los bloques de unas preguntas. Rechaza si falla alguno. */
export const loadQuestions = (questionIds: readonly string[]): Promise<void> =>
  Promise.all(blocksFor(questionIds).map(loadQuestionBlock)).then(() => undefined)

const statusOf = (moduleIds: readonly string[]): LoadStatus =>
  moduleIds.every((id) => loaded.has(id)) ? 'ready' : moduleIds.some((id) => failed.has(id)) ? 'error' : 'loading'

/** Estado de carga de unos bloques: los pide al montarse; `retry` vuelve a pedir los que fallaron. */
export function useQuestionBlocks(moduleIds: readonly string[]): { status: LoadStatus; version: number; retry: () => void } {
  const key = [...moduleIds].sort().join('|')
  const current = useSyncExternalStore(subscribe, () => version, () => version)
  const load = () => { for (const id of moduleIds) loadQuestionBlock(id).catch(() => undefined) }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` resume `moduleIds`
  useEffect(load, [key])
  return { status: statusOf(moduleIds), version: current, retry: load }
}

/** Bloques de preguntas pedidos desde el arranque (solo para tests). */
export const requestedQuestionBlocks = (): string[] => [...requested]

/** Solo para tests: olvida lo cargado y, opcionalmente, sustituye la descarga de un bloque. */
export const resetQuestionCache = (customImporter?: Importer): void => {
  byId.clear()
  loaded.clear()
  failed.clear()
  pending.clear()
  requested.clear()
  importer = customImporter ?? defaultImporter
  notify()
}

/** La descarga real de un bloque (para que un test la envuelva). */
export const importQuestionBlock: Importer = (moduleId) => defaultImporter(moduleId)
