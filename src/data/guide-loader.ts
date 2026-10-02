/// <reference types="vite/client" />
import { useEffect, useSyncExternalStore } from 'react'
import { numberChapter } from './guide-numbering'
import { modules } from './modules'
import type { PrecisionFactSheet, StudyChapter } from './types'

/**
 * Carga diferida de la guía: la guía y la ficha de precisión de cada bloque van en su propio chunk
 * (ver manualChunks en vite.config.ts) y se descargan al abrirlo. Lo síncrono (router, títulos) usa el índice ligero.
 */

type GuideModule = { guide: StudyChapter }
type PrecisionModule = { precision: PrecisionFactSheet }

const guideLoaders = import.meta.glob<GuideModule>('./blocks/*/guide.ts')
const precisionLoaders = import.meta.glob<PrecisionModule>('./blocks/*/precision.ts')

export type BlockGuide =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; chapter: StudyChapter; precision?: PrecisionFactSheet }

const LOADING: BlockGuide = { status: 'loading' }
const cache = new Map<string, BlockGuide>()
const pending = new Map<string, Promise<void>>()
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

/** Descarga (una sola vez) la guía y la ficha de un bloque. Un fallo se puede reintentar. */
export const loadBlockGuide = (moduleId: string): Promise<void> => {
  const current = cache.get(moduleId)
  if (current?.status === 'ready') return Promise.resolve()
  const running = pending.get(moduleId)
  if (running) return running
  const guideLoader = guideLoaders[`./blocks/${moduleId}/guide.ts`]
  const precisionLoader = precisionLoaders[`./blocks/${moduleId}/precision.ts`]
  if (!guideLoader) {
    cache.set(moduleId, { status: 'error' })
    notify()
    return Promise.resolve()
  }
  if (current?.status === 'error') {
    cache.set(moduleId, LOADING)
    notify()
  }
  const promise = Promise.all([guideLoader(), precisionLoader ? precisionLoader() : Promise.resolve(undefined)])
    .then(([guideModule, precisionModule]) => {
      cache.set(moduleId, { status: 'ready', chapter: numberChapter(guideModule.guide), precision: precisionModule?.precision })
    })
    .catch(() => { cache.set(moduleId, { status: 'error' }) })
    .finally(() => {
      pending.delete(moduleId)
      notify()
    })
  pending.set(moduleId, promise)
  return promise
}

/** Guía de un bloque: la pide al montarse y se actualiza al llegar. */
export function useBlockGuide(moduleId: string): BlockGuide {
  const state = useSyncExternalStore(subscribe, () => cache.get(moduleId) ?? LOADING, () => LOADING)
  useEffect(() => { void loadBlockGuide(moduleId) }, [moduleId])
  return state
}

export type AllGuides = { status: 'loading' | 'error' | 'ready'; guide: Record<string, StudyChapter>; precision: Record<string, PrecisionFactSheet> }

const collect = (): AllGuides => {
  const guide: Record<string, StudyChapter> = {}
  const precision: Record<string, PrecisionFactSheet> = {}
  let ready = 0
  let failed = false
  for (const module of modules) {
    const state = cache.get(module.id)
    if (state?.status === 'ready') {
      ready += 1
      guide[module.id] = state.chapter
      if (state.precision) precision[module.id] = state.precision
    } else if (state?.status === 'error') failed = true
  }
  return { status: ready === modules.length ? 'ready' : failed ? 'error' : 'loading', guide, precision }
}
let collected: { version: number; value: AllGuides } | null = null

/** Guía de los 12 bloques (para la búsqueda): pide los que falten y devuelve lo cargado. */
export function useAllBlockGuides(): AllGuides {
  const value = useSyncExternalStore(subscribe, () => {
    if (!collected || collected.version !== version) collected = { version, value: collect() }
    return collected.value
  }, () => collect())
  useEffect(() => { for (const module of modules) void loadBlockGuide(module.id) }, [])
  return value
}

/** Solo para tests: olvida lo cargado. */
export const resetGuideCache = (): void => {
  cache.clear()
  pending.clear()
  collected = null
  notify()
}
