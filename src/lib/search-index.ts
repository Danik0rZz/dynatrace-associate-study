import type { GlossaryEntry } from '../data/glossary'
import type { Module, PrecisionFactSheet, StudyChapter, StudySection } from '../data/types'
import { PRECISION_SECTION } from './guide-links'
import { normalizeForSearch } from './search'

/**
 * Búsqueda global en memoria sobre la guía (apartados y ficha de precisión) y el glosario. No incluye las preguntas.
 */

export const MIN_QUERY_LENGTH = 2
export const MAX_RESULTS = 50
const SNIPPET_LENGTH = 160

export type SearchDoc = {
  kind: 'guide' | 'precision' | 'glossary'
  moduleId: string
  moduleTitle: string
  /** Apartado de la guía (o `precision-facts`); ausente en el glosario. */
  sectionId?: string
  title: string
  /** Texto plano, sin el marcado de InlineText. */
  text: string
}

export type SearchResult = SearchDoc & {
  snippet: { before: string; match: string; after: string }
}

/** Quita el marcado de InlineText: ``x`` → `x` y `x` → x. */
export const plainText = (text: string): string =>
  text.replace(/``(.+?)``|`([^`]+)`/g, (_, kept: string | undefined, code: string | undefined) => kept !== undefined ? `\`${kept}\`` : code ?? '')

const sectionText = (section: StudySection): string => [
  section.lead,
  ...section.paragraphs,
  ...(section.bullets ?? []),
  ...(section.comparison ? [section.comparison.headers.join(' · '), ...section.comparison.rows.map((row) => row.join(' · '))] : []),
  section.codeNote ?? '',
  section.warning ?? '',
].filter(Boolean).map(plainText).join(' ')

export const buildSearchIndex = (
  modules: readonly Module[], guide: Record<string, StudyChapter>, precision: Record<string, PrecisionFactSheet>, glossary: readonly GlossaryEntry[],
): SearchDoc[] => modules.flatMap((module) => {
  const base = { moduleId: module.id, moduleTitle: module.title }
  const sections: SearchDoc[] = (guide[module.id]?.sections ?? []).map((section) => ({ ...base, kind: 'guide', sectionId: section.id, title: plainText(section.title), text: sectionText(section) }))
  const facts: SearchDoc[] = (precision[module.id]?.rows ?? []).map((row) => ({ ...base, kind: 'precision', sectionId: PRECISION_SECTION, title: `Hechos de precisión: ${plainText(row.topic)}`, text: plainText(`${row.fact} ${row.examNote}`) }))
  const terms: SearchDoc[] = glossary.filter((entry) => entry.moduleId === module.id).map((entry) => ({ ...base, kind: 'glossary', title: `Glosario: ${entry.term}`, text: `${entry.term}. ${plainText(entry.definition)}` }))
  return [...sections, ...facts, ...terms]
})

/** Texto normalizado y, para cada carácter normalizado, su posición en el original. */
const normalizeWithMap = (text: string): { normalized: string; map: number[] } => {
  let normalized = ''
  const map: number[] = []
  let index = 0
  for (const char of text) {
    const piece = normalizeForSearch(char)
    normalized += piece
    for (let count = 0; count < piece.length; count += 1) map.push(index)
    index += char.length
  }
  map.push(text.length)
  return { normalized, map }
}

/** Busca `needle` (ya normalizada) en `text` y devuelve la posición de la coincidencia en el texto original. */
const locate = (text: string, needle: string): { start: number; end: number } | null => {
  const { normalized, map } = normalizeWithMap(text)
  const at = normalized.indexOf(needle)
  if (at < 0) return null
  return { start: map[at], end: map[at + needle.length] }
}

/** Fragmento de unos 160 caracteres alrededor de la coincidencia, cortado en espacios. */
const snippetAround = (text: string, start: number, end: number): SearchResult['snippet'] => {
  const room = Math.max(0, SNIPPET_LENGTH - (end - start))
  let from = Math.max(0, start - Math.floor(room / 3))
  let to = Math.min(text.length, end + room - (start - from))
  if (to - from < SNIPPET_LENGTH) from = Math.max(0, to - SNIPPET_LENGTH)
  if (from > 0) { const space = text.indexOf(' ', from); if (space >= 0 && space < start) from = space + 1 }
  if (to < text.length) { const space = text.lastIndexOf(' ', to); if (space > end) to = space }
  return { before: `${from > 0 ? '… ' : ''}${text.slice(from, start)}`, match: text.slice(start, end), after: `${text.slice(end, to)}${to < text.length ? ' …' : ''}` }
}

/**
 * Resultados para `query` (mínimo 2 caracteres): primero los que coinciden en el título, después en el texto;
 * dentro de cada grupo, en el orden de los bloques. Devuelve todos; la vista muestra los `MAX_RESULTS` primeros.
 */
export const searchDocs = (docs: readonly SearchDoc[], query: string): SearchResult[] => {
  const needle = normalizeForSearch(query.trim())
  if (needle.length < MIN_QUERY_LENGTH) return []
  const inTitle: SearchResult[] = []
  const inText: SearchResult[] = []
  for (const doc of docs) {
    const titleHit = locate(doc.title, needle)
    const textHit = locate(doc.text, needle)
    if (!titleHit && !textHit) continue
    // El fragmento sale del texto si la coincidencia está ahí; si solo está en el título, del principio del texto.
    const snippet = textHit ? snippetAround(doc.text, textHit.start, textHit.end) : { ...snippetAround(doc.text, 0, 0), match: '' }
    ;(titleHit ? inTitle : inText).push({ ...doc, snippet })
  }
  return [...inTitle, ...inText]
}
