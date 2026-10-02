import planCsv from '../../docs/plan-apartados.csv?raw'
import sectionsCsv from '../../docs/inventario-apartados.csv?raw'
import questionsCsv from '../../docs/inventario-preguntas.csv?raw'
import summaryMd from '../../docs/inventario.md?raw'
import { describe, expect, it } from 'vitest'
import { buildInventory, parseCsv, parsePlan, renderPlan, renderQuestionsCsv, renderSectionsCsv, renderSummary, syncPlan, toCsv } from '../lib/inventory'

/**
 * Circuito de cobertura: cada apartado de la guía tiene una valoración documentada y, si requiere
 * preguntas, las tiene. Si añades o cambias apartados o preguntas: `npm run inventario`, completa
 * la valoración en docs/plan-apartados.csv y vuelve a ejecutar los tests.
 */

const plan = parsePlan(planCsv)
const inventory = buildInventory(plan.rows)

const report = (problems: string[]) => problems.length ? `\n${problems.length} problema(s):\n- ${problems.slice(0, 60).join('\n- ')}${problems.length > 60 ? `\n- … y ${problems.length - 60} más (ver docs/inventario.md)` : ''}` : ''

describe('inventario de cobertura (bloque → apartado → preguntas)', () => {
  it('el plan tiene un formato válido', () => {
    expect(plan.errors, report(plan.errors)).toEqual([])
  })

  it('cada apartado está valorado y, si requiere preguntas, las tiene', () => {
    expect(inventory.problems, report(inventory.problems)).toEqual([])
  })

  it('el plan y los informes están al día (si falla: npm run inventario)', () => {
    expect(planCsv, 'docs/plan-apartados.csv desactualizado: ejecuta npm run inventario').toBe(renderPlan(syncPlan(plan.rows)))
    expect(sectionsCsv, 'docs/inventario-apartados.csv desactualizado: ejecuta npm run inventario').toBe(renderSectionsCsv(inventory.rows))
    expect(questionsCsv, 'docs/inventario-preguntas.csv desactualizado: ejecuta npm run inventario').toBe(renderQuestionsCsv())
    expect(summaryMd, 'docs/inventario.md desactualizado: ejecuta npm run inventario').toBe(renderSummary(inventory.rows, inventory.problems))
  })

  it('el CSV conserva separadores, comillas y saltos de línea', () => {
    const rows = [['a;b', 'dice "hola"', 'línea 1\nlínea 2', 'normal']]
    expect(parseCsv(toCsv(['A', 'B', 'C', 'D'], rows))).toEqual([['A', 'B', 'C', 'D'], ...rows])
  })
})
