/**
 * npm run inventario
 *
 * 1. Sincroniza docs/plan-apartados.csv con la guía: añade los apartados nuevos como «pendiente»,
 *    elimina los que ya no existen y actualiza los títulos. Nunca cambia una valoración ya escrita.
 * 2. Regenera docs/inventario-apartados.csv, docs/inventario-preguntas.csv y docs/inventario.md.
 * 3. Regenera los índices ligeros de la app: src/data/generated/guide-index.json y question-index.json.
 * 4. Muestra los problemas abiertos (los mismos que hacen fallar src/tests/inventory.test.ts).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { precisionFacts, studyGuide } from '../src/data/guide'
import { modules } from '../src/data/modules'
import { allQuestions } from '../src/data/questions'
import { buildInventory, parsePlan, renderPlan, renderQuestionsCsv, renderSectionsCsv, renderSummary, syncPlan } from '../src/lib/inventory'
import { buildGuideIndex, buildQuestionIndex, renderIndexJson } from '../src/lib/light-index'

const root = resolve(import.meta.dirname ?? '.', '..')
const file = (name: string) => resolve(root, 'docs', name)

const planPath = file('plan-apartados.csv')
const { rows: planRows, errors } = existsSync(planPath) ? parsePlan(readFileSync(planPath, 'utf8')) : { rows: [], errors: [] }
if (errors.length) {
  console.error('El plan tiene errores de formato; corrígelos antes de continuar:')
  for (const error of errors) console.error(`  - ${error}`)
  process.exit(1)
}

const plan = syncPlan(planRows)
const removed = planRows.length - plan.filter((row) => planRows.some((old) => old.bloque === row.bloque && old.apartado === row.apartado)).length
const added = plan.filter((row) => !planRows.some((old) => old.bloque === row.bloque && old.apartado === row.apartado)).length
const { rows, problems } = buildInventory(plan)

writeFileSync(planPath, renderPlan(plan))
writeFileSync(file('inventario-apartados.csv'), renderSectionsCsv(rows))
writeFileSync(file('inventario-preguntas.csv'), renderQuestionsCsv())
writeFileSync(file('inventario.md'), renderSummary(rows, problems))

// Índices ligeros de la app (guía por bloque e índice de preguntas), generados desde los datos completos.
const generated = (name: string) => resolve(root, 'src', 'data', 'generated', name)
mkdirSync(resolve(root, 'src', 'data', 'generated'), { recursive: true })
writeFileSync(generated('guide-index.json'), renderIndexJson(buildGuideIndex(modules, studyGuide, precisionFacts, plan)))
writeFileSync(generated('question-index.json'), renderIndexJson(buildQuestionIndex(allQuestions)))

const withoutQuestions = rows.filter((row) => row.preguntas === 0).length
console.log(`Apartados: ${rows.length} · con preguntas: ${rows.length - withoutQuestions} · sin preguntas: ${withoutQuestions}`)
console.log(`Plan: ${added} apartados nuevos añadidos como «pendiente», ${removed} filas obsoletas eliminadas.`)
if (problems.length) {
  const kinds = new Map<string, number>()
  for (const problem of problems) { const kind = problem.split(':')[0]; kinds.set(kind, (kinds.get(kind) ?? 0) + 1) }
  console.log(`Problemas abiertos: ${problems.length} (${[...kinds].map(([kind, n]) => `${kind} ${n}`).join(' · ')}). Detalle en docs/inventario.md`)
  process.exitCode = 1
} else console.log('Sin problemas abiertos.')
