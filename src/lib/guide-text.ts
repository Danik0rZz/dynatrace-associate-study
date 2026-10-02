import type { PrecisionFactSheet, StudySection } from '../data/types'

/** Normaliza texto para comparar evidencias: minúsculas, sin marcas de código, comillas unificadas, espacios simples. */
export const normalizeText = (text: string): string => text
  .toLowerCase()
  .replace(/[`*_]/g, '')
  .replace(/[“”«»]/g, '"')
  .replace(/[‘’]/g, "'")
  .replace(/\s+/g, ' ')
  .trim()

export const sectionText = (section: StudySection): string => [
  section.title, section.lead, ...section.paragraphs, ...(section.bullets ?? []),
  ...(section.comparison ? [section.comparison.headers.join(' · '), ...section.comparison.rows.map((row) => row.join(' · '))] : []),
  section.code ?? '', section.codeNote ?? '', section.warning ?? '',
].join('\n')

export const precisionText = (sheet: PrecisionFactSheet | undefined): string => sheet
  ? [sheet.title, sheet.intro, ...sheet.rows.map((row) => `${row.topic} · ${row.fact} · ${row.examNote}`)].join('\n')
  : ''
