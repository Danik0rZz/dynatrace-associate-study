import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { formatRoute, parseRoute, type Route } from '../app/router'
import { studyGuide } from '../data/guide'
import { allQuestions, modulesWithQuestions } from '../data/questions'
import { MOCK_SESSION_KEY, type SavedMock } from '../lib/mock-session'

const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const heading = () => screen.getByRole('heading', { level: 1 }).textContent
const dql = modulesWithQuestions.find((module) => module.id === 'dql')!
const dqlSection = studyGuide.dql.sections[2].id

const openAt = (hash: string) => {
  window.history.replaceState(null, '', hash)
  return render(<App />)
}

const savedMock = (): SavedMock => {
  const questions = allQuestions.slice(0, 60)
  return {
    version: 1,
    title: 'Simulacro · 60 preguntas',
    questionIds: questions.map((question) => question.id),
    optionOrderByQuestionId: Object.fromEntries(questions.map((question) => [question.id, question.options.map((option) => option.id)])),
    answers: {},
    confidenceByQuestion: {},
    flagged: [],
    index: 3,
    deadline: Date.now() + 30 * 60 * 1000,
  }
}

describe('rutas: parseo y formato', () => {
  const routes: [string, Route][] = [
    ['#/', { view: 'home' }],
    ['#/dql', { view: 'module', moduleId: 'dql' }],
    [`#/dql/guia/${dqlSection}`, { view: 'module', moduleId: 'dql', sectionId: dqlSection }],
    ['#/dql/guia/precision-facts', { view: 'module', moduleId: 'dql', sectionId: 'precision-facts' }],
    ['#/quiz', { view: 'quiz' }],
    ['#/simulacro', { view: 'mock' }],
    ['#/repaso', { view: 'review' }],
    ['#/errores', { view: 'errors' }],
    ['#/practicas', { view: 'practice' }],
    ['#/practicas/dql', { view: 'practice', moduleId: 'dql' }],
    ['#/glosario', { view: 'glossary' }],
    ['#/mapa', { view: 'map' }],
  ]

  it.each(routes)('%s ↔ ruta', (hash, route) => {
    expect(parseRoute(hash)).toEqual(route)
    expect(formatRoute(route)).toBe(hash)
  })

  it('sin hash es inicio; los hashes que no empiezan por #/ no son rutas', () => {
    expect(parseRoute('')).toEqual({ view: 'home' })
    expect(parseRoute('#main-content')).toBeNull()
  })

  it.each(['#/no-existe', '#/dql/guia/no-existe', '#/dql/otra-cosa', '#/practicas/no-existe', '#/glosario/extra', '#/dql/guia/a/b', '#/dql/guia'])('%s es desconocida', (hash) => {
    expect(parseRoute(hash)).toBeNull()
  })
})

describe('navegación con URL', () => {
  const scrolled: string[] = []
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    scrolled.length = 0
    Element.prototype.scrollIntoView = function (this: Element) { scrolled.push(this.id) }
  })
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it.each([
    ['#/', 'Convierte el path en'],
    ['#/dql', dql.title],
    ['#/repaso', 'Repaso adaptativo'],
    ['#/errores', 'Historial de errores'],
    ['#/practicas', 'Prácticas guiadas'],
    ['#/practicas/dql', 'Prácticas guiadas'],
    ['#/glosario', 'Glosario'],
  ])('%s abre su vista', (hash, title) => {
    openAt(hash)
    expect(heading()).toContain(title)
    expect(window.location.hash).toBe(hash)
  })

  it('#/mapa abre el mapa', async () => {
    openAt('#/mapa')
    expect(screen.getByRole('navigation', { name: 'Ruta de navegación' }).textContent).toContain('Mapa de estudio')
    await waitFor(() => expect(document.querySelector('.react-flow, .map-shell, [data-testid="rf__wrapper"]') ?? screen.queryByText(/Cargando el mapa/)).toBeTruthy())
  })

  it('#/quiz al recargar (sin sesión) va a inicio', () => {
    openAt('#/quiz')
    expect(heading()).toContain('Convierte el path en')
    expect(window.location.hash).toBe('#/')
  })

  it('#/simulacro: sin simulacro guardado va a inicio; con uno guardado ofrece reanudarlo', () => {
    openAt('#/simulacro')
    expect(window.location.hash).toBe('#/')
    cleanup()
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(savedMock()))
    openAt('#/simulacro')
    expect(window.location.hash).toBe('#/simulacro')
    const panel = screen.getByRole('region', { name: 'Simulacro sin terminar' })
    fireEvent.click(within(panel).getByRole('button', { name: 'Reanudar' }))
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(screen.getByText('04')).toBeTruthy()
  })

  it.each(['#/no-existe', '#/dql/guia/no-existe', '#/practicas/no-existe'])('%s lleva a inicio sin romper', (hash) => {
    openAt(hash)
    expect(heading()).toContain('Convierte el path en')
    expect(window.location.hash).toBe('#/')
  })

  it('un enlace profundo a un apartado abre el bloque desplazado a ese apartado', () => {
    openAt(`#/dql/guia/${dqlSection}`)
    expect(heading()).toBe(dql.title)
    expect(document.getElementById(dqlSection)).toBeTruthy()
    return waitFor(() => expect(scrolled).toContain(dqlSection))
  })

  it('la navegación cambia la URL, mueve el foco al contenido y «Atrás»/«Adelante» la recorren', async () => {
    openAt('#/')
    fireEvent.click(nav().getByRole('button', { name: /Glosario/ }))
    expect(window.location.hash).toBe('#/glosario')
    expect(document.activeElement?.id).toBe('main-content')
    fireEvent.click(screen.getAllByRole('button', { name: /Ver módulo/ })[0])
    expect(window.location.hash).toMatch(/^#\/[a-z-]+$/)
    act(() => { window.history.back() })
    await waitFor(() => expect(heading()).toBe('Glosario'))
    expect(window.location.hash).toBe('#/glosario')
    act(() => { window.history.back() })
    await waitFor(() => expect(heading()).toContain('Convierte el path en'))
    act(() => { window.history.forward() })
    await waitFor(() => expect(heading()).toBe('Glosario'))
  })

  it('el índice del capítulo navega a la ruta del apartado y desplaza hasta él', () => {
    openAt('#/dql')
    const index = screen.getByRole('navigation', { name: 'Índice de la lección' })
    const section = studyGuide.dql.sections[4]
    const link = within(index).getAllByRole('link')[4]
    expect(link.getAttribute('href')).toBe(`#/dql/guia/${section.id}`)
    fireEvent.click(link)
    expect(window.location.hash).toBe(`#/dql/guia/${section.id}`)
    return waitFor(() => expect(scrolled).toContain(section.id))
  })

  it('el índice incluye los hechos de precisión con su ruta', () => {
    openAt('#/dql')
    const link = within(screen.getByRole('navigation', { name: 'Índice de la lección' })).getByRole('link', { name: /^Hechos de precisión/ })
    fireEvent.click(link)
    expect(window.location.hash).toBe('#/dql/guia/precision-facts')
    return waitFor(() => expect(scrolled).toContain('precision-facts'))
  })

  it('«Saltar al contenido» mueve el foco al contenido sin cambiar la ruta', () => {
    openAt('#/glosario')
    fireEvent.click(screen.getByRole('link', { name: 'Saltar al contenido' }))
    expect(document.activeElement?.id).toBe('main-content')
    expect(window.location.hash).toBe('#/glosario')
    expect(heading()).toBe('Glosario')
  })

  it('«Atrás» durante un simulacro pide confirmación; si se cancela, sigue en el simulacro', async () => {
    openAt('#/')
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    expect(window.location.hash).toBe('#/simulacro')
    act(() => { window.history.back() })
    const dialog = await screen.findByRole('alertdialog', { name: '¿Salir del simulacro?' })
    expect(document.activeElement?.textContent).toBe('Seguir en el simulacro')
    await waitFor(() => expect(window.location.hash).toBe('#/simulacro'))
    // Con el diálogo abierto, otro cambio de URL no abre un segundo diálogo y la URL vuelve a la del simulacro.
    act(() => {
      window.history.pushState(null, '', '#/glosario')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(window.location.hash).toBe('#/simulacro')
    expect(screen.getAllByRole('alertdialog')).toHaveLength(1)
    await act(async () => { fireEvent.click(within(dialog).getByRole('button', { name: 'Seguir en el simulacro' })) })
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(window.location.hash).toBe('#/simulacro')

    act(() => { window.history.back() })
    await act(async () => { fireEvent.click(await screen.findByRole('button', { name: 'Salir del simulacro' })) })
    await waitFor(() => expect(screen.queryByText('MODO SIMULACRO')).toBeNull())
    // Sale a la entrada anterior del historial (aquí, la que ha dejado el pushState de arriba).
    expect(window.location.hash).toBe('#/glosario')
    expect(heading()).toBe('Glosario')
    expect(screen.getByRole('region', { name: 'Simulacro sin terminar' })).toBeTruthy()
    expect(screen.queryByRole('alertdialog')).toBeNull()
  })

  it('recargar con un simulacro guardado sigue ofreciendo «Reanudar»', () => {
    openAt('#/')
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    cleanup()
    render(<App />)
    expect(window.location.hash).toBe('#/simulacro')
    expect(screen.getByRole('button', { name: 'Reanudar' })).toBeTruthy()
  })
})
