import { useEffect, useRef, useState } from 'react'
import { hasPrecisionSheet, sectionIndexEntry } from '../data/guide-index'
import { modulesWithQuestions } from '../data/questions'
import { PRECISION_SECTION } from '../lib/guide-links'
import type { View } from './types'

/**
 * Navegación con URL mediante hash (`#/…`), sin dependencias: la recarga, «Atrás»/«Adelante» y los enlaces
 * directos funcionan también en GitHub Pages. Los hashes que no empiezan por `#/` no son rutas y se ignoran.
 *
 * | Ruta                         | Vista                              |
 * |------------------------------|------------------------------------|
 * | `#/`                         | inicio                             |
 * | `#/<bloque>`                 | bloque                             |
 * | `#/<bloque>/guia/<apartado>` | bloque, desplazado al apartado     |
 * | `#/quiz`                     | sesión de preguntas (quiz, banco, apartado, repaso) |
 * | `#/simulacro`                | simulacro                          |
 * | `#/repaso`                   | repaso adaptativo                  |
 * | `#/errores`                  | historial de errores               |
 * | `#/practicas[/<bloque>]`     | prácticas (todas o de un bloque)   |
 * | `#/glosario`                 | glosario                           |
 * | `#/mapa`                     | mapa de estudio                    |
 * | `#/buscar`                   | búsqueda en la guía y el glosario  |
 * | `#/estadisticas`             | historial de simulacros            |
 */
export type Route = { view: View; moduleId?: string; sectionId?: string }

export const HOME: Route = { view: 'home' }

const STATIC: Partial<Record<View, string>> = { quiz: 'quiz', mock: 'simulacro', review: 'repaso', errors: 'errores', practice: 'practicas', glossary: 'glosario', map: 'mapa', search: 'buscar', stats: 'estadisticas' }
const BY_SEGMENT = Object.fromEntries(Object.entries(STATIC).map(([view, segment]) => [segment, view as View]))

const isModule = (id: string | undefined): id is string => Boolean(id) && modulesWithQuestions.some((module) => module.id === id)
const isSection = (moduleId: string, sectionId: string) =>
  // Se valida con el índice ligero: la guía completa se carga por bloque y no está disponible al resolver la ruta.
  sectionId === PRECISION_SECTION ? hasPrecisionSheet(moduleId) : Boolean(sectionIndexEntry(moduleId, sectionId))

export const isRouteHash = (hash: string): boolean => hash === '' || hash === '#' || hash.startsWith('#/')

/** Interpreta un hash. Devuelve `null` si es una ruta desconocida (bloque, apartado o pantalla inexistentes). */
export const parseRoute = (hash: string): Route | null => {
  if (!isRouteHash(hash)) return null
  const segments = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map((segment) => {
    try {
      return decodeURIComponent(segment)
    } catch {
      return segment
    }
  })
  if (!segments.length) return HOME
  const [first, second, third, ...rest] = segments
  if (rest.length) return null
  const view = BY_SEGMENT[first]
  if (view === 'practice') {
    if (third !== undefined) return null
    if (second === undefined) return { view }
    return isModule(second) ? { view, moduleId: second } : null
  }
  if (view) return second === undefined ? { view } : null
  if (!isModule(first)) return null
  if (second === undefined) return { view: 'module', moduleId: first }
  if (second === 'guia' && third !== undefined && isSection(first, third)) return { view: 'module', moduleId: first, sectionId: third }
  return null
}

export const formatRoute = (route: Route): string => {
  if (route.view === 'module' && route.moduleId) return `#/${route.moduleId}${route.sectionId ? `/guia/${encodeURIComponent(route.sectionId)}` : ''}`
  if (route.view === 'practice' && route.moduleId) return `#/practicas/${route.moduleId}`
  const segment = STATIC[route.view]
  return segment ? `#/${segment}` : '#/'
}

export const sectionHref = (moduleId: string, sectionId: string): string => formatRoute({ view: 'module', moduleId, sectionId })

/** `true` si la ruta deja salir; `false` la cancela y se restaura la URL anterior. */
export type RouteGuard = (next: Route) => boolean

type RouterOptions = {
  /** Decide si se puede cambiar de ruta (también con «Atrás»/«Adelante»). */
  guard: RouteGuard
  /** Recibe cada ruta aceptada, en el mismo evento que la provoca. */
  onChange: (next: Route) => void
  /** Corrige una ruta a la que se llega por el historial (p. ej., una sesión que ya no existe). */
  normalize: (next: Route) => Route
  /** Igual que `normalize`, para la URL con la que se abre la app. */
  normalizeInitial: (next: Route) => Route
}

/** Ruta actual y navegación. */
export function useHashRouter(options: RouterOptions) {
  const [route, setRoute] = useState<Route>(() => options.normalizeInitial(parseRoute(window.location.hash) ?? HOME))
  const current = useRef(formatRoute(route))
  const handlers = useRef(options)
  useEffect(() => { handlers.current = options })

  const accept = (next: Route) => {
    current.current = formatRoute(next)
    setRoute(next)
    handlers.current.onChange(next)
  }

  // Si la URL inicial no es la de la ruta mostrada (desconocida o corregida), se sustituye sin crear entrada.
  useEffect(() => {
    if (isRouteHash(window.location.hash) && window.location.hash !== current.current) window.history.replaceState(window.history.state, '', current.current)
  }, [])

  useEffect(() => {
    const onHistory = () => {
      const hash = window.location.hash
      if (!isRouteHash(hash)) return
      // Una ruta desconocida lleva a inicio y su URL se sustituye por la de inicio.
      const parsed = parseRoute(hash)
      const next = handlers.current.normalize(parsed ?? HOME)
      const corrected = !parsed || formatRoute(next) !== formatRoute(parsed)
      const restore = (method: 'pushState' | 'replaceState') => window.history[method](window.history.state, '', current.current)
      if (formatRoute(next) === current.current) {
        if (corrected) restore('replaceState')
        return
      }
      if (!handlers.current.guard(next)) {
        // Cancelado: se vuelve a poner la URL de la vista que sigue en pantalla.
        restore(corrected ? 'replaceState' : 'pushState')
        return
      }
      if (corrected) window.history.replaceState(window.history.state, '', formatRoute(next))
      accept(next)
    }
    window.addEventListener('hashchange', onHistory)
    window.addEventListener('popstate', onHistory)
    return () => {
      window.removeEventListener('hashchange', onHistory)
      window.removeEventListener('popstate', onHistory)
    }
  }, [])

  /** Navega a `next`. Devuelve `false` si la guarda lo impide. */
  const go = (next: Route, options: { replace?: boolean } = {}): boolean => {
    const hash = formatRoute(next)
    if (!handlers.current.guard(next)) return false
    if (options.replace) window.history.replaceState(window.history.state, '', hash)
    else if (hash !== window.location.hash) window.history.pushState(window.history.state, '', hash)
    accept(next)
    return true
  }

  return { route, go }
}
