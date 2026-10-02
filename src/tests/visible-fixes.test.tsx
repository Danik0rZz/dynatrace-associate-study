import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { modules } from '../data/modules'
import { glossary } from '../data/glossary'
import { modulesWithQuestions } from '../data/questions'
import { emptyProgress, PROGRESS_KEY, type ProgressState } from '../lib/progress'
import { continueModule, LAST_MODULE_KEY } from '../lib/route'
import { matchesSearch, normalizeForSearch } from '../lib/search'

/** Vitest sustituye los .css importados por una cadena vacía: se lee el fichero directamente. */
const readStyles = async (): Promise<string> => {
  const fsModule: string = 'node:fs'
  const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
  // Vitest se ejecuta desde la raíz del proyecto.
  return readFileSync('src/styles.css', 'utf8')
}

const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))

/** Progreso con todas las preguntas de un bloque intentadas una vez. */
const completed = (moduleId: string): ProgressState => {
  const progress = emptyProgress()
  for (const id of modulesWithQuestions.find((module) => module.id === moduleId)!.questionIds) {
    progress.attempts[id] = [{ questionId: id, selectedOptionIds: ['A'], score: 1, correct: true, confidence: 4, timestamp: '2026-10-01T10:00:00Z' }]
  }
  return progress
}

describe('«Continuar ruta»', () => {
  beforeEach(() => { window.localStorage.clear(); window.scrollTo = () => undefined })
  afterEach(() => cleanup())

  it('sigue el orden de modules.ts', () => {
    expect(modulesWithQuestions.map((module) => module.id)).toEqual(modules.map((module) => module.id))
  })

  it('sin progreso abre el primer bloque', () => {
    expect(continueModule(modulesWithQuestions, emptyProgress(), null).id).toBe(modules[0].id)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Continuar ruta/ }))
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(modules[0].title)
  })

  it('con el primer bloque completado abre el siguiente', () => {
    const progress = completed(modules[0].id)
    expect(continueModule(modulesWithQuestions, progress, null).id).toBe(modules[1].id)
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Continuar ruta/ }))
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(modules[1].title)
  })

  it('con un último bloque visitado abre ese, y lo recuerda al visitar otro', () => {
    expect(continueModule(modulesWithQuestions, emptyProgress(), 'dql').id).toBe('dql')
    expect(continueModule(modulesWithQuestions, emptyProgress(), 'ya-no-existe').id).toBe(modules[0].id)
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    expect(JSON.parse(window.localStorage.getItem(LAST_MODULE_KEY) ?? 'null')).toBe('notebooks')
    fireEvent.click(nav().getByRole('button', { name: /Inicio/ }))
    fireEvent.click(screen.getByRole('button', { name: /Continuar ruta/ }))
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Notebooks & Dashboards')
  })

  it('el inicio muestra todos los bloques y ya no muestra «∞ fuentes»', () => {
    render(<App />)
    expect(document.querySelectorAll('.module-overview-card')).toHaveLength(modules.length)
    expect(screen.queryByText('∞')).toBeNull()
  })
})

describe('cuadrícula de preguntas', () => {
  beforeEach(() => { window.localStorage.clear(); window.scrollTo = () => undefined })
  afterEach(() => cleanup())

  it('el quiz normal no la tiene; el simulacro sí', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    fireEvent.click(screen.getByRole('button', { name: /Quiz rápido/ }))
    expect(screen.getByText('SESIÓN DE ESTUDIO')).toBeTruthy()
    expect(document.querySelector('.question-nav')).toBeNull()
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(document.querySelectorAll('.question-nav button')).toHaveLength(60)
  })
})

describe('búsqueda del glosario', () => {
  beforeEach(() => { window.localStorage.clear(); window.scrollTo = () => undefined })
  afterEach(() => cleanup())

  it('no distingue acentos ni mayúsculas, en la consulta ni en el texto', () => {
    expect(normalizeForSearch('Configuración')).toBe('configuracion')
    expect(matchesSearch('Revisa la configuración del bucket', 'configuracion')).toBe(true)
    expect(matchesSearch('Revisa la configuracion del bucket', 'CONFIGURACIÓN')).toBe(true)
    expect(matchesSearch('Revisa la configuración', 'configurar')).toBe(false)
    expect(matchesSearch('cualquier texto', '  ')).toBe(true)
  })

  const openGlossary = () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Glosario/ }))
  }
  const cards = () => [...document.querySelectorAll('.glossary-card')]

  it('encuentra términos con acento al buscar sin él, y al revés', () => {
    openGlossary()
    const search = screen.getByRole('searchbox', { name: 'Buscar término en el glosario' })
    fireEvent.change(search, { target: { value: 'monitorizacion' } })
    const withoutAccent = cards().length
    expect(withoutAccent).toBeGreaterThan(0)
    expect(cards().some((card) => card.textContent?.includes('monitorización'))).toBe(true)
    fireEvent.change(search, { target: { value: 'MONITORIZACIÓN' } })
    expect(cards()).toHaveLength(withoutAccent)
  })

  it('el filtro por bloque restringe los resultados y tiene un label asociado', () => {
    openGlossary()
    const filter = screen.getByLabelText('Bloque') as HTMLSelectElement
    expect(filter.tagName).toBe('SELECT')
    expect(filter.labels?.[0]?.getAttribute('for')).toBe(filter.id)
    const all = cards().length
    expect(all).toBe(glossary.length)
    fireEvent.change(filter, { target: { value: 'dql' } })
    const dqlTerms = glossary.filter((entry) => entry.moduleId === 'dql')
    expect(cards()).toHaveLength(dqlTerms.length)
    expect(cards().length).toBeLessThan(all)
    expect(screen.getByRole('status').textContent).toContain(String(dqlTerms.length))
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzz-sin-resultados' } })
    expect(cards()).toHaveLength(0)
    expect(screen.getByText(/No hay términos que coincidan/).textContent).toContain('DQL')
  })

  it('el filtro usa colores de :root con contraste ≥ 4,5:1', async () => {
    const css = await readStyles()
    const root = Object.fromEntries([...css.match(/:root\s*\{([^}]*)\}/)![1].matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map((match) => [match[1], match[2]]))
    const rule = (selector: string) => css.match(new RegExp(`${selector.replace(/[.*]/g, '\\$&')}\\s*\\{([^}]*)\\}`))![1]
    const colorVar = (body: string, property: string) => body.match(new RegExp(`(?:^|;)\\s*${property}:\\s*var\\(--([a-z-]+)\\)`))?.[1]
    const luminance = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const contrast = (a: string, b: string) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05) }
    const field = rule('.filter-field')
    const background = root[colorVar(field, 'background')!]
    for (const [selector, property] of [['.filter-field', 'color'], ['.filter-field select', 'color'], ['.glossary-count', 'color']]) {
      const name = colorVar(rule(selector), property)
      expect(name, selector).toBeDefined()
      expect(contrast(root[name!], background), selector).toBeGreaterThanOrEqual(4.5)
    }
  })
})
