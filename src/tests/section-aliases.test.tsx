import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { parseRoute } from '../app/router'
import { guideIndex } from '../data/guide-index'
import { CUSTOM_QUIZ_KEY, parseFilterParams, sanitizeFilters } from '../lib/custom-quiz'

// El mapa real está vacío hasta que se fusione algún apartado: aquí se inyecta uno de prueba.
// «aggregation» es un apartado de DQL con preguntas (lo comprueba el primer test).
const testAliases = vi.hoisted(() => ({ dql: { 'seccion-antigua': 'aggregation' } as Record<string, string> }))
vi.mock('../data/section-aliases', () => ({
  sectionAliases: testAliases,
  canonicalSection: (moduleId: string, sectionId: string) => (testAliases as Record<string, Record<string, string>>)[moduleId]?.[sectionId] ?? sectionId,
}))

type Aliases = Record<string, Record<string, string>>

/** Reglas del mapa de alias: superviviente existente, id antiguo inexistente y sin cadenas. */
const aliasProblems = (aliases: Aliases): string[] => {
  const problems: string[] = []
  for (const [moduleId, map] of Object.entries(aliases)) {
    const block = guideIndex[moduleId]
    if (!block) { problems.push(`${moduleId}: el bloque no existe`); continue }
    const exists = (id: string) => (id === 'precision-facts' ? block.precision : block.sections.some((section) => section.id === id))
    for (const [from, to] of Object.entries(map)) {
      if (!exists(to)) problems.push(`${moduleId}/${from}: el superviviente «${to}» no existe`)
      if (exists(from)) problems.push(`${moduleId}/${from}: el id antiguo sigue existiendo como apartado`)
      if (to in map) problems.push(`${moduleId}/${from}: cadena (${from} → ${to} → ${map[to]})`)
    }
  }
  return problems
}

describe('mapa de alias real (permanente)', () => {
  it('cada alias apunta a un apartado de su bloque, ningún id antiguo existe y no hay cadenas', async () => {
    const real = await vi.importActual<typeof import('../data/section-aliases')>('../data/section-aliases')
    expect(aliasProblems(real.sectionAliases)).toEqual([])
    // Y alias real sin alias: el id de siempre.
    expect(real.canonicalSection('dql', 'aggregation')).toBe('aggregation')
  })

  it('las reglas detectan un superviviente inexistente, un id antiguo que existe y una cadena', () => {
    expect(aliasProblems({ dql: { 'viejo-1': 'no-existe', aggregation: 'pipeline', 'viejo-2': 'viejo-3', 'viejo-3': 'pipeline' } })).toEqual([
      'dql/viejo-1: el superviviente «no-existe» no existe',
      'dql/aggregation: el id antiguo sigue existiendo como apartado',
      'dql/viejo-2: el superviviente «viejo-3» no existe',
      'dql/viejo-2: cadena (viejo-2 → viejo-3 → pipeline)',
    ])
    expect(aliasProblems({ 'no-bloque': {} })).toEqual(['no-bloque: el bloque no existe'])
  })

  it('el mapa de prueba cumple las reglas', () => {
    expect(aliasProblems(testAliases)).toEqual([])
    expect(guideIndex.dql.sections.some((section) => section.id === 'aggregation')).toBe(true)
  })
})

describe('id antiguo de un apartado fusionado (mapa de prueba)', () => {
  const scrolled: string[] = []
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    scrolled.length = 0
    Element.prototype.scrollIntoView = function (this: Element) { scrolled.push(this.id) }
  })
  afterEach(() => cleanup())

  it('parseRoute lleva la ruta antigua al superviviente', () => {
    expect(parseRoute('#/dql/guia/seccion-antigua')).toEqual({ view: 'module', moduleId: 'dql', sectionId: 'aggregation' })
    // Un alias es de su bloque: en otro bloque no vale.
    expect(parseRoute('#/security/guia/seccion-antigua')).toBeNull()
    expect(parseRoute('#/dql/guia/aggregation')).toEqual({ view: 'module', moduleId: 'dql', sectionId: 'aggregation' })
  })

  it('al abrir la app con la URL antigua: URL canónica sin entrada nueva y desplazada al superviviente', async () => {
    window.history.replaceState(null, '', '#/dql/guia/seccion-antigua')
    const length = window.history.length
    render(<App />)
    expect(window.location.hash).toBe('#/dql/guia/aggregation')
    expect(window.history.length).toBe(length)
    await waitFor(() => expect(scrolled).toContain('aggregation'))
  })

  it('con hashchange (enlace o URL escrita): se navega al superviviente y la URL antigua se sustituye', async () => {
    window.history.replaceState(null, '', '#/')
    render(<App />)
    const length = window.history.length
    act(() => { window.location.hash = '#/dql/guia/seccion-antigua' })
    await waitFor(() => expect(window.location.hash).toBe('#/dql/guia/aggregation'))
    // Una sola entrada nueva: la de la navegación del usuario, ya con la URL canónica.
    expect(window.history.length).toBe(length + 1)
    expect(await screen.findAllByText('Practicar este apartado')).toBeTruthy()
    await waitFor(() => expect(scrolled).toContain('aggregation'))
  })

  it('con popstate («Atrás»/«Adelante» a una entrada antigua): URL canónica por replaceState, sin entrada nueva', async () => {
    window.history.replaceState(null, '', '#/')
    render(<App />)
    act(() => { window.history.pushState(null, '', '#/dql/guia/seccion-antigua') })
    const length = window.history.length
    act(() => { window.dispatchEvent(new PopStateEvent('popstate')) })
    expect(window.location.hash).toBe('#/dql/guia/aggregation')
    expect(window.history.length).toBe(length)
    expect(within(screen.getByRole('navigation', { name: 'Ruta de navegación' })).getByText(/DQL/)).toBeTruthy()
  })

  it('#/quiz/medida?bloques=dql&apartado=<antiguo> rellena el superviviente', () => {
    expect(parseFilterParams('bloques=dql&apartado=seccion-antigua')).toEqual({ modules: ['dql'], section: 'aggregation' })
    expect(parseRoute('#/quiz/medida?bloques=dql&apartado=seccion-antigua')).toEqual({ view: 'custom', filters: { modules: ['dql'], section: 'aggregation' } })
    // Con varios bloques no hay apartado, como siempre.
    expect(parseFilterParams('bloques=dql,security&apartado=seccion-antigua')).toEqual({ modules: ['dql', 'security'] })
  })

  it('un filtro guardado con el id antiguo se lleva al superviviente (también al abrir la configuración)', () => {
    expect(sanitizeFilters({ modules: ['dql'], section: 'seccion-antigua' }).section).toBe('aggregation')
    expect(sanitizeFilters({ modules: ['security'], section: 'seccion-antigua' }).section).toBeNull()
    window.localStorage.setItem(CUSTOM_QUIZ_KEY, JSON.stringify({ modules: ['dql'], section: 'seccion-antigua', difficulties: ['basic', 'intermediate', 'advanced'], status: 'all', count: 10 }))
    window.history.replaceState(null, '', '#/quiz/medida')
    render(<App />)
    expect((screen.getByLabelText('Apartado de la guía') as HTMLSelectElement).value).toBe('aggregation')
  })
})
