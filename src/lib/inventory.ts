import { precisionFacts, studyGuide } from '../data/guide'
import { modules } from '../data/modules'
import { allQuestions } from '../data/questions'

/**
 * Inventario de cobertura: bloques → apartados de la guía → preguntas.
 *
 * Fuente de verdad automática: el contenido de cada bloque (`src/data/blocks/<bloque>/`): la guía,
 * la ficha de precisión y las preguntas, cada una con su apartado y la frase literal que la respalda.
 * Fuente de verdad manual: `docs/plan-apartados.csv`, con la valoración de cada apartado
 * (si necesita preguntas, cuántas como mínimo y por qué).
 *
 * `npm run inventario` regenera los informes y añade al plan los apartados nuevos como «pendiente».
 * `src/tests/inventory.test.ts` falla si hay apartados sin valorar, con menos preguntas de las
 * necesarias, referencias rotas o informes desactualizados.
 */

export const PRECISION_SECTION = 'precision-facts'
export const CSV_SEPARATOR = ';'
const BOM = '\uFEFF'

export const VALORACIONES = ['pendiente', 'requiere', 'no-requiere', 'cubierto'] as const
export type Valoracion = (typeof VALORACIONES)[number]

export type PlanRow = {
  bloque: string
  apartado: string
  titulo: string
  valoracion: Valoracion
  minimo: number
  cubiertoPor: string
  motivo: string
  revisado: string
}

export type SectionInfo = {
  bloque: string
  orden: number
  apartado: string
  titulo: string
  origen: 'original' | 'nuevo' | 'ficha'
  fuentes: string[]
}

export type Estado = 'OK' | 'SIN VALORAR' | 'FALTAN PREGUNTAS' | 'REFERENCIA ROTA' | 'NO REQUIERE' | 'CUBIERTO'

export type InventoryRow = SectionInfo & {
  preguntas: number
  valoracion: Valoracion
  minimo: number
  cubiertoPor: string
  motivo: string
  revisado: string
  estado: Estado
}

/* ——— CSV (separador «;» y BOM para que Excel en español lo abra en columnas) ——— */

const escapeCell = (value: string | number): string => {
  const text = String(value)
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export const toCsv = (header: string[], rows: (string | number)[][]): string =>
  BOM + [header, ...rows].map((row) => row.map(escapeCell).join(CSV_SEPARATOR)).join('\n') + '\n'

export const parseCsv = (text: string): string[][] => {
  const source = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') { cell += '"'; index += 1 }
      else if (char === '"') quoted = false
      else cell += char
    } else if (char === '"') quoted = true
    else if (char === CSV_SEPARATOR) { row.push(cell); cell = '' }
    else if (char === '\n') { row.push(cell); rows.push(row); row = []; cell = '' }
    else cell += char
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row) }
  return rows.filter((cells) => cells.some((value) => value.trim() !== ''))
}

/* ——— Plan (valoración manual por apartado) ——— */

export const PLAN_HEADER = ['Bloque', 'Apartado', 'Titulo', 'Valoracion', 'Minimo', 'CubiertoPor', 'Motivo', 'Revisado']

export const parsePlan = (text: string): { rows: PlanRow[]; errors: string[] } => {
  const [header, ...lines] = parseCsv(text)
  const errors: string[] = []
  if (!header || header.join('|') !== PLAN_HEADER.join('|')) errors.push(`Cabecera del plan incorrecta: se esperaba ${PLAN_HEADER.join(CSV_SEPARATOR)}`)
  const rows = lines.map((cells, index) => {
    const [bloque = '', apartado = '', titulo = '', valoracion = '', minimo = '', cubiertoPor = '', motivo = '', revisado = ''] = cells.map((cell) => cell.trim())
    const line = index + 2
    if (!VALORACIONES.includes(valoracion as Valoracion)) errors.push(`Plan, línea ${line} (${bloque}/${apartado}): valoración «${valoracion}» no válida (${VALORACIONES.join(', ')})`)
    const minimoNumber = minimo === '' ? 0 : Number(minimo)
    if (!Number.isInteger(minimoNumber) || minimoNumber < 0) errors.push(`Plan, línea ${line} (${bloque}/${apartado}): mínimo «${minimo}» no es un entero ≥ 0`)
    if (revisado && !/^\d{4}-\d{2}-\d{2}$/.test(revisado)) errors.push(`Plan, línea ${line} (${bloque}/${apartado}): fecha de revisión «${revisado}» no tiene formato AAAA-MM-DD`)
    return { bloque, apartado, titulo, valoracion: valoracion as Valoracion, minimo: Number.isInteger(minimoNumber) ? minimoNumber : 0, cubiertoPor, motivo, revisado }
  })
  return { rows, errors }
}

const planKey = (bloque: string, apartado: string) => `${bloque}::${apartado}`

/* ——— Lectura de la guía y de la cobertura ——— */

export const listSections = (): SectionInfo[] => modules
  .slice()
  .sort((a, b) => a.order - b.order)
  .flatMap((module) => {
    const chapter = studyGuide[module.id]
    const sections: SectionInfo[] = (chapter?.sections ?? []).map((section) => ({
      bloque: module.id,
      orden: module.order,
      apartado: section.id,
      titulo: section.title.replace(/^\d+\.\s*/, ''),
      origen: section.id.startsWith('sup-') ? 'nuevo' : 'original',
      fuentes: (section.sourceRefs ?? []).map((source) => source.url),
    }))
    const sheet = precisionFacts[module.id]
    if (sheet) sections.push({ bloque: module.id, orden: module.order, apartado: PRECISION_SECTION, titulo: 'Hechos de precisión', origen: 'ficha', fuentes: [...new Set(sheet.rows.map((row) => row.source.url))] })
    return sections
  })

export const questionCounts = (): Map<string, number> => {
  const counts = new Map<string, number>()
  for (const question of allQuestions) {
    const entry = question.guide
    if (!entry) continue
    const key = planKey(question.moduleId, entry.section)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}

/* ——— Inventario ——— */

export const buildInventory = (plan: PlanRow[]): { rows: InventoryRow[]; problems: string[] } => {
  const sections = listSections()
  const counts = questionCounts()
  const planByKey = new Map(plan.map((row) => [planKey(row.bloque, row.apartado), row]))
  const sectionKeys = new Set(sections.map((section) => planKey(section.bloque, section.apartado)))
  const problems: string[] = []

  const rows = sections.map((section): InventoryRow => {
    const key = planKey(section.bloque, section.apartado)
    const decision = planByKey.get(key)
    const preguntas = counts.get(key) ?? 0
    const base = { ...section, preguntas, valoracion: decision?.valoracion ?? 'pendiente' as Valoracion, minimo: decision?.minimo ?? 0, cubiertoPor: decision?.cubiertoPor ?? '', motivo: decision?.motivo ?? '', revisado: decision?.revisado ?? '' }
    const where = `${section.bloque}/${section.apartado} «${section.titulo}»`
    if (!decision || decision.valoracion === 'pendiente') {
      problems.push(`SIN VALORAR: ${where} (${preguntas} preguntas). Decide en docs/plan-apartados.csv si requiere preguntas.`)
      return { ...base, estado: 'SIN VALORAR' }
    }
    if (!decision.motivo) problems.push(`SIN MOTIVO: ${where} tiene valoración «${decision.valoracion}» pero no explica por qué.`)
    if (decision.valoracion === 'requiere') {
      if (decision.minimo < 1) problems.push(`MÍNIMO INVÁLIDO: ${where} requiere preguntas pero su mínimo es ${decision.minimo}.`)
      if (preguntas < Math.max(1, decision.minimo)) {
        problems.push(`FALTAN PREGUNTAS: ${where} tiene ${preguntas} y necesita al menos ${Math.max(1, decision.minimo)}.`)
        return { ...base, estado: 'FALTAN PREGUNTAS' }
      }
      return { ...base, estado: 'OK' }
    }
    if (decision.valoracion === 'cubierto') {
      const target = decision.cubiertoPor
      const targetKey = planKey(section.bloque, target)
      if (!target || !sectionKeys.has(targetKey)) {
        problems.push(`REFERENCIA ROTA: ${where} dice estar cubierto por «${target}», que no existe en el bloque.`)
        return { ...base, estado: 'REFERENCIA ROTA' }
      }
      if ((counts.get(targetKey) ?? 0) < 1) {
        problems.push(`REFERENCIA ROTA: ${where} dice estar cubierto por «${target}», que no tiene preguntas.`)
        return { ...base, estado: 'REFERENCIA ROTA' }
      }
      return { ...base, estado: 'CUBIERTO' }
    }
    return { ...base, estado: 'NO REQUIERE' }
  })

  for (const row of plan) {
    if (!sectionKeys.has(planKey(row.bloque, row.apartado))) problems.push(`OBSOLETO: el plan valora ${row.bloque}/${row.apartado}, que ya no existe en la guía. Elimina la fila con npm run inventario.`)
  }
  for (const question of allQuestions) {
    const entry = question.guide
    if (!entry) problems.push(`PREGUNTA SIN APARTADO: ${question.id} (${question.moduleId}) no tiene cobertura.`)
    else if (!sectionKeys.has(planKey(question.moduleId, entry.section))) problems.push(`PREGUNTA HUÉRFANA: ${question.id} apunta a ${question.moduleId}/${entry.section}, que no existe.`)
  }
  return { rows, problems }
}

/** Plan normalizado: un apartado por fila, en el orden de la guía; los apartados nuevos entran como «pendiente». */
export const syncPlan = (plan: PlanRow[]): PlanRow[] => {
  const planByKey = new Map(plan.map((row) => [planKey(row.bloque, row.apartado), row]))
  return listSections().map((section) => {
    const existing = planByKey.get(planKey(section.bloque, section.apartado))
    return existing
      ? { ...existing, titulo: section.titulo }
      : { bloque: section.bloque, apartado: section.apartado, titulo: section.titulo, valoracion: 'pendiente', minimo: 0, cubiertoPor: '', motivo: '', revisado: '' }
  })
}

export const renderPlan = (plan: PlanRow[]): string =>
  toCsv(PLAN_HEADER, plan.map((row) => [row.bloque, row.apartado, row.titulo, row.valoracion, row.minimo, row.cubiertoPor, row.motivo, row.revisado]))

export const renderSectionsCsv = (rows: InventoryRow[]): string => toCsv(
  ['Orden', 'Bloque', 'Apartado', 'Titulo', 'Origen', 'Preguntas', 'Valoracion', 'Minimo', 'CubiertoPor', 'Estado', 'Motivo', 'Revisado', 'FuentesOficiales'],
  rows.map((row) => [String(row.orden).padStart(2, '0'), row.bloque, row.apartado, row.titulo, row.origen, row.preguntas, row.valoracion, row.minimo, row.cubiertoPor, row.estado, row.motivo, row.revisado, row.fuentes.join(' | ')]),
)

export const renderQuestionsCsv = (): string => {
  const titles = new Map(listSections().map((section) => [planKey(section.bloque, section.apartado), section.titulo]))
  const order = new Map(modules.map((module) => [module.id, module.order]))
  const rows = allQuestions
    .map((question) => ({ question, entry: question.guide }))
    .sort((a, b) => (order.get(a.question.moduleId) ?? 0) - (order.get(b.question.moduleId) ?? 0) || (a.entry?.section ?? '').localeCompare(b.entry?.section ?? '') || a.question.id.localeCompare(b.question.id))
    .map(({ question, entry }) => [question.id, question.moduleId, entry?.section ?? '', entry ? titles.get(planKey(question.moduleId, entry.section)) ?? '' : '', question.type, question.bucket, question.difficulty, entry?.evidence ?? '', question.sourceRefs.map((source) => source.url).join(' | ')])
  return toCsv(['Pregunta', 'Bloque', 'Apartado', 'TituloApartado', 'Tipo', 'Categoria', 'Dificultad', 'FraseDeLaGuia', 'DocOficial'], rows)
}

export const renderSummary = (rows: InventoryRow[], problems: string[]): string => {
  const byModule = modules.slice().sort((a, b) => a.order - b.order).map((module) => {
    const own = rows.filter((row) => row.bloque === module.id)
    const count = (estado: Estado) => own.filter((row) => row.estado === estado).length
    return `| ${String(module.order).padStart(2, '0')} ${module.title} | ${own.length} | ${own.filter((row) => row.preguntas > 0).length} | ${own.filter((row) => row.preguntas === 0).length} | ${own.reduce((sum, row) => sum + row.preguntas, 0)} | ${count('OK')} | ${count('CUBIERTO')} | ${count('NO REQUIERE')} | ${count('SIN VALORAR')} | ${count('FALTAN PREGUNTAS') + count('REFERENCIA ROTA')} |`
  })
  const total = (predicate: (row: InventoryRow) => boolean) => rows.filter(predicate).length
  return [
    '# Inventario de cobertura',
    '',
    'Generado con `npm run inventario`. No se edita a mano: la valoración de cada apartado está en `docs/plan-apartados.csv`.',
    '',
    `- Apartados (incluida la ficha de precisión de cada bloque): **${rows.length}**`,
    `- Con preguntas: **${total((row) => row.preguntas > 0)}** · sin preguntas: **${total((row) => row.preguntas === 0)}**`,
    `- Preguntas: **${allQuestions.length}**`,
    `- Problemas abiertos: **${problems.length}**`,
    '',
    '| Bloque | Apartados | Con preguntas | Sin preguntas | Preguntas | OK | Cubierto | No requiere | Sin valorar | Faltan |',
    '|---|---|---|---|---|---|---|---|---|---|',
    ...byModule,
    '',
    problems.length ? '## Problemas abiertos' : '## Sin problemas abiertos',
    '',
    ...problems.slice(0, 400).map((problem) => `- ${problem}`),
    problems.length > 400 ? `- … y ${problems.length - 400} más` : '',
    '',
  ].join('\n')
}
