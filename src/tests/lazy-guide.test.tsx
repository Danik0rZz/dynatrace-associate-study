import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { parseRoute } from '../app/router'
import { precisionFacts, studyGuide } from '../data/guide'
import { guideIndex } from '../data/guide-index'
import { resetGuideCache } from '../data/guide-loader'
import { modules } from '../data/modules'
import { allQuestions } from '../data/questions'
import { parsePlan } from '../lib/inventory'
import { buildGuideIndex, buildQuestionIndex, renderIndexJson } from '../lib/light-index'

const readProjectFile = async (path: string): Promise<string> => {
  const fsModule: string = 'node:fs'
  const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}
const listFiles = async (dir: string): Promise<string[]> => {
  const fsModule: string = 'node:fs'
  const { readdirSync, statSync } = (await import(/* @vite-ignore */ fsModule)) as { readdirSync: (path: string) => string[]; statSync: (path: string) => { isDirectory: () => boolean } }
  return readdirSync(dir).flatMap((name) => {
    const path = `${dir}/${name}`
    return statSync(path).isDirectory() ? [] : [path]
  })
}

const openAt = (hash: string) => {
  window.history.replaceState(null, '', hash)
  return render(<App />)
}

describe('índices ligeros generados', () => {
  it('guide-index.json y question-index.json están al día (npm run inventario)', async () => {
    // Las fechas «Revisado» salen del plan: si cambia una fecha en docs/plan-apartados.csv, el índice queda desfasado.
    const { rows: plan } = parsePlan(await readProjectFile('docs/plan-apartados.csv'))
    expect(await readProjectFile('src/data/generated/guide-index.json')).toBe(renderIndexJson(buildGuideIndex(modules, studyGuide, precisionFacts, plan)))
    expect(await readProjectFile('src/data/generated/question-index.json')).toBe(renderIndexJson(buildQuestionIndex(allQuestions)))
  })

  it('el router valida los apartados con el índice: existe → ruta; no existe → null', () => {
    const section = studyGuide.dql.sections[2].id
    expect(guideIndex.dql.sections.map((item) => item.id)).toEqual(studyGuide.dql.sections.map((item) => item.id))
    expect(parseRoute(`#/dql/guia/${section}`)).toEqual({ view: 'module', moduleId: 'dql', sectionId: section })
    expect(parseRoute('#/dql/guia/precision-facts')).toEqual({ view: 'module', moduleId: 'dql', sectionId: 'precision-facts' })
    expect(parseRoute('#/dql/guia/no-existe')).toBeNull()
  })

  it('el código de la app no importa la guía completa de forma síncrona', async () => {
    const appFiles = [...await listFiles('src/views'), ...await listFiles('src/components'), ...await listFiles('src/app'), 'src/App.tsx', 'src/lib/guide-links.ts', 'src/lib/search-index.ts', 'src/data/questions.ts']
    for (const file of appFiles) {
      const source = await readProjectFile(file)
      expect(source, file).not.toMatch(/from ['"][./]*data\/guide['"]|from ['"]\.\/guide['"]|from ['"][./]*data\/blocks['"]|from ['"]\.\/blocks['"]/)
    }
  })
})

describe('guía cargada por bloque', () => {
  const scrolled: string[] = []
  beforeEach(() => {
    resetGuideCache()
    window.localStorage.clear()
    window.scrollTo = () => undefined
    scrolled.length = 0
    Element.prototype.scrollIntoView = function (this: Element) { scrolled.push(this.id) }
  })
  afterEach(() => cleanup())

  it('al abrir un bloque se anuncia la carga y después aparece la guía', async () => {
    openAt('#/dql')
    expect(screen.getByRole('status').textContent).toBe('Cargando la guía del bloque…')
    expect((await screen.findAllByText('Practicar este apartado')).length).toBeGreaterThan(3)
    expect(screen.queryByText('Cargando la guía del bloque…')).toBeNull()
  })

  it('una ruta profunda a un apartado espera la carga y después desplaza hasta él', async () => {
    const section = studyGuide.dql.sections[4].id
    openAt(`#/dql/guia/${section}`)
    expect(document.getElementById(section)).toBeNull()
    await waitFor(() => expect(scrolled).toContain(section))
    expect(document.getElementById(section)).toBeTruthy()
  })

  it('la búsqueda carga la guía bajo demanda y lo anuncia', async () => {
    openAt('#/buscar')
    fireEvent.change(screen.getByLabelText('Texto a buscar'), { target: { value: 'bucket' } })
    expect(screen.getByRole('status').textContent).toBe('Cargando la guía…')
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/\d+ resultados/))
    expect(document.querySelectorAll('.search-result').length).toBeGreaterThan(0)
  })
})
