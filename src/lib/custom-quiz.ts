import { guideIndex } from '../data/guide-index'
import { modulesWithQuestions, questionIndex } from '../data/question-catalog'
import type { Difficulty } from '../data/types'
import { PRECISION_SECTION, questionIdsForSection, sectionTitle } from './guide-links'
import type { QuestionIndexEntry } from './light-index'
import { needsReview, type ProgressState } from './progress'
import { byFreshness, shuffle, type RandomSource } from './selection'

/**
 * Quiz a medida: filtros sobre el catálogo ligero (sin descargar el texto de las preguntas).
 * - bloques (varios) y, con un único bloque, un apartado de su guía;
 * - dificultad (varias);
 * - estado: todas, falladas o dudosas (el mismo criterio que el repaso: `needsReview`) o nunca vistas (sin intentos);
 * - número de preguntas.
 * Los filtros se guardan en localStorage (y viajan en la copia de seguridad): al leerlos se validan y lo desconocido
 * se descarta sin error.
 */

export const CUSTOM_QUIZ_KEY = 'dynatrace-associate-custom-quiz-v1'

export type CustomStatus = 'all' | 'review' | 'unseen'

export type CustomFilters = {
  modules: string[]
  /** Apartado de la guía (o 'precision-facts'); solo con un único bloque elegido. */
  section: string | null
  difficulties: Difficulty[]
  status: CustomStatus
  count: number
}

export const DIFFICULTIES: Difficulty[] = ['basic', 'intermediate', 'advanced']
export const STATUSES: CustomStatus[] = ['all', 'review', 'unseen']
export const COUNT_OPTIONS = [5, 10, 20, 30, 60]

/** Bloques que tienen preguntas, en el orden de modules.ts. */
export const customModules = modulesWithQuestions.filter((module) => module.questionIds.length > 0)
const moduleIds = new Set(customModules.map((module) => module.id))

export const DEFAULT_FILTERS: CustomFilters = { modules: customModules.map((module) => module.id), section: null, difficulties: [...DIFFICULTIES], status: 'all', count: 10 }

/** Apartados de un bloque con al menos una pregunta, en el orden de la guía (y la ficha de precisión al final). */
export const sectionsWithQuestions = (moduleId: string): { id: string; title: string; count: number }[] => {
  const sections = (guideIndex[moduleId]?.sections ?? []).map((section) => ({ id: section.id, title: sectionTitle(moduleId, section.id), count: questionIdsForSection(moduleId, section.id).length }))
  const precision = { id: PRECISION_SECTION, title: sectionTitle(moduleId, PRECISION_SECTION), count: questionIdsForSection(moduleId, PRECISION_SECTION).length }
  return [...sections, precision].filter((section) => section.count > 0)
}

const isSectionOf = (moduleId: string, sectionId: string) => sectionsWithQuestions(moduleId).some((section) => section.id === sectionId)

const unique = <T,>(items: T[]): T[] => [...new Set(items)]

/** Normaliza unos filtros: descarta bloques, apartados, dificultades, estados o números desconocidos. */
export const sanitizeFilters = (raw: unknown): CustomFilters => {
  const data = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {}
  const strings = (value: unknown): string[] | null => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : null
  const modules = strings(data.modules)
  const difficulties = strings(data.difficulties)
  const filters: CustomFilters = {
    modules: modules ? unique(modules.filter((id) => moduleIds.has(id))) : DEFAULT_FILTERS.modules,
    section: typeof data.section === 'string' ? data.section : null,
    difficulties: difficulties ? unique(difficulties.filter((value): value is Difficulty => (DIFFICULTIES as string[]).includes(value))) : DEFAULT_FILTERS.difficulties,
    status: STATUSES.includes(data.status as CustomStatus) ? data.status as CustomStatus : DEFAULT_FILTERS.status,
    count: COUNT_OPTIONS.includes(data.count as number) ? data.count as number : DEFAULT_FILTERS.count,
  }
  // El apartado solo tiene sentido con un único bloque, y tiene que ser de ese bloque.
  if (filters.section !== null && !(filters.modules.length === 1 && isSectionOf(filters.modules[0], filters.section))) filters.section = null
  return filters
}

/** Aplica los filtros de una ruta sobre los guardados. Si la ruta trae bloques y no apartado, el apartado se quita. */
export const applyRouteFilters = (stored: CustomFilters, fromRoute: Partial<CustomFilters>): CustomFilters =>
  sanitizeFilters({ ...stored, ...('modules' in fromRoute && !('section' in fromRoute) ? { section: null } : {}), ...fromRoute })

const matches = (filters: CustomFilters, progress: ProgressState) => {
  const modules = new Set(filters.modules)
  const difficulties = new Set(filters.difficulties)
  return (entry: QuestionIndexEntry): boolean => {
    if (!modules.has(entry.moduleId) || !difficulties.has(entry.difficulty)) return false
    if (filters.section !== null && entry.section !== filters.section) return false
    const attempts = progress.attempts[entry.id]
    if (filters.status === 'review') return needsReview(attempts)
    if (filters.status === 'unseen') return !attempts?.length
    return true
  }
}

/** Preguntas del catálogo que cumplen los filtros. */
export const customPool = (filters: CustomFilters, progress: ProgressState): QuestionIndexEntry[] =>
  questionIndex.filter(matches(filters, progress))

/** Selección de la sesión: las más frescas del pool (sin repetir), en orden barajado. */
export const customQuizIds = (filters: CustomFilters, progress: ProgressState, served: readonly string[] = [], random?: RandomSource): string[] =>
  shuffle(byFreshness(customPool(filters, progress), progress, served, random).slice(0, filters.count), random).map((entry) => entry.id)


const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`

/** Texto del recuento: cuántas preguntas cumplen los filtros y cuántas se servirán. */
export const countMessage = (available: number, requested: number): string => {
  if (available === 0) return '0 preguntas con estos filtros'
  if (available < requested) return `${plural(available, 'pregunta', 'preguntas')} con estos filtros: se ${available === 1 ? 'servirá la única disponible' : `servirán las ${available} disponibles`} (has pedido ${requested}).`
  return `${plural(available, 'pregunta', 'preguntas')} con estos filtros: se servirán ${requested}.`
}

/* ——— Parámetros de la ruta #/quiz/medida?… ——— */

const DIFFICULTY_PARAM: Record<Difficulty, string> = { basic: 'basica', intermediate: 'intermedia', advanced: 'avanzada' }
const STATUS_PARAM: Record<CustomStatus, string> = { all: 'todas', review: 'falladas', unseen: 'nuevas' }
const fromParam = <T extends string>(map: Record<T, string>, value: string): T | undefined =>
  (Object.keys(map) as T[]).find((key) => map[key] === value)

/**
 * Lee los parámetros de la ruta. Cada parámetro válido se aplica; uno inválido (o con todos sus valores desconocidos)
 * se ignora. Parámetros: bloques=dql,security · apartado=<id> · dificultad=basica,intermedia,avanzada ·
 * estado=todas|falladas|nuevas · n=5|10|20|30|60.
 */
export const parseFilterParams = (query: string): Partial<CustomFilters> => {
  const params = new URLSearchParams(query)
  const result: Partial<CustomFilters> = {}
  const list = (name: string) => (params.get(name) ?? '').split(',').map((value) => value.trim()).filter(Boolean)
  const modules = unique(list('bloques').filter((id) => moduleIds.has(id)))
  if (modules.length) result.modules = modules
  const difficulties = unique(list('dificultad').map((value) => fromParam(DIFFICULTY_PARAM, value)).filter((value): value is Difficulty => Boolean(value)))
  if (difficulties.length) result.difficulties = difficulties
  const status = fromParam(STATUS_PARAM, params.get('estado') ?? '')
  if (status) result.status = status
  const count = Number(params.get('n'))
  if (COUNT_OPTIONS.includes(count)) result.count = count
  const section = params.get('apartado')
  const sectionModules = result.modules
  if (section && sectionModules?.length === 1 && isSectionOf(sectionModules[0], section)) result.section = section
  return result
}

/** Escribe los parámetros de la ruta (en un orden fijo); sin filtros, cadena vacía. */
export const formatFilterParams = (filters: Partial<CustomFilters>): string => {
  const params: string[] = []
  if (filters.modules?.length) params.push(`bloques=${filters.modules.map(encodeURIComponent).join(',')}`)
  if (filters.section) params.push(`apartado=${encodeURIComponent(filters.section)}`)
  if (filters.difficulties?.length) params.push(`dificultad=${filters.difficulties.map((value) => DIFFICULTY_PARAM[value]).join(',')}`)
  if (filters.status) params.push(`estado=${STATUS_PARAM[filters.status]}`)
  if (filters.count) params.push(`n=${filters.count}`)
  return params.join('&')
}
