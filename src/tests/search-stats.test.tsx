import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { formatRoute, parseRoute } from '../app/router'
import { glossary } from '../data/glossary'
import { precisionFacts, studyGuide } from '../data/guide'
import { allQuestions, modulesWithQuestions } from '../data/questions'
import { applyBackup, collectBackup, parseBackup } from '../lib/backup'
import { appendMockHistory, loadMockHistory, MAX_MOCK_HISTORY, MOCK_HISTORY_KEY, type MockHistoryEntry, parseMockHistory } from '../lib/mock-history'
import { MOCK_SESSION_KEY, type SavedMock } from '../lib/mock-session'
import { normalizeForSearch } from '../lib/search'
import { buildSearchIndex, plainText, searchDocs } from '../lib/search-index'

const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const index = buildSearchIndex(modulesWithQuestions, studyGuide, precisionFacts, glossary)
const openAt = (hash: string) => {
  window.history.replaceState(null, '', hash)
  return render(<App />)
}
/** Escribe en la búsqueda y espera a que la guía (cargada por bloque) esté lista. */
const typeSearch = async (value: string) => {
  fireEvent.change(screen.getByLabelText('Texto a buscar'), { target: { value } })
  await waitFor(() => expect(document.querySelector('.search-count')!.textContent).not.toBe('Cargando la guía…'))
}
const resultLinks = () => [...document.querySelectorAll<HTMLAnchorElement>('.search-result a')]

const entry = (overrides: Partial<MockHistoryEntry> = {}): MockHistoryEntry => ({
  date: '2026-10-01T10:00:00.000Z', score: 70, durationSeconds: 1800, correct: 40, total: 60,
  byModule: { dql: { correct: 2, total: 6 }, platform: { correct: 5, total: 5 }, security: { correct: 3, total: 6 } },
  ...overrides,
})

class MemoryStorage {
  private map = new Map<string, string>()
  get length() { return this.map.size }
  key(position: number) { return [...this.map.keys()][position] ?? null }
  getItem(key: string) { return this.map.get(key) ?? null }
  setItem(key: string, value: string) { this.map.set(key, value) }
  removeItem(key: string) { this.map.delete(key) }
}

describe('contraste de los colores nuevos', () => {
  it('el resaltado y el gráfico usan colores de :root con contraste suficiente', async () => {
    const fsModule: string = 'node:fs'
    const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
    const css = readFileSync('src/styles.css', 'utf8')
    const root = Object.fromEntries([...css.match(/:root\s*\{([^}]*)\}/)![1].matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})/gi)].map((match) => [match[1], match[2]]))
    const varOf = (selector: string, property: string) => {
      const body = css.match(new RegExp(`${selector.replace(/[.*]/g, '\\$&')}\\s*\\{([^}]*)\\}`))![1]
      return root[body.match(new RegExp(`(?:^|;|\\s)${property}:\\s*var\\(--([a-z-]+)\\)`))![1]]
    }
    const luminance = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const contrast = (a: string, b: string) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05) }
    expect(contrast(varOf('.search-result mark', 'color'), varOf('.search-result mark', 'background'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(varOf('.search-result p', 'color'), root.paper)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(varOf('.score-chart-label', 'fill'), root.paper)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(varOf('.score-chart-line', 'stroke'), root.paper)).toBeGreaterThanOrEqual(3)
  })
})

describe('rutas nuevas', () => {
  it.each([['#/buscar', 'search'], ['#/estadisticas', 'stats']] as const)('%s ↔ %s', (hash, view) => {
    expect(parseRoute(hash)).toEqual({ view })
    expect(formatRoute({ view })).toBe(hash)
    expect(parseRoute(`${hash}/extra`)).toBeNull()
  })
})

describe('búsqueda global', () => {
  beforeEach(() => { window.localStorage.clear(); window.scrollTo = () => undefined; Element.prototype.scrollIntoView = () => undefined })
  afterEach(() => cleanup())

  it('el índice cubre la guía, la ficha de precisión y el glosario de los 12 bloques', () => {
    expect(new Set(index.map((doc) => doc.kind))).toEqual(new Set(['guide', 'precision', 'glossary']))
    expect(new Set(index.map((doc) => doc.moduleId)).size).toBe(12)
    expect(index.filter((doc) => doc.kind === 'guide')).toHaveLength(Object.values(studyGuide).reduce((sum, chapter) => sum + chapter.sections.length, 0))
  })

  it('quita el marcado de InlineText del texto y los fragmentos', () => {
    expect(plainText('Usa `fetch logs` y ``timestamp``.')).toBe('Usa fetch logs y `timestamp`.')
    const withCode = index.find((doc) => doc.kind === 'guide' && /`[^`]+`/.test(doc.text) === false && studyGuide[doc.moduleId].sections.find((section) => section.id === doc.sectionId)!.paragraphs.some((paragraph) => /(^|[^`])`[^`]+`([^`]|$)/.test(paragraph)))!
    const code = studyGuide[withCode.moduleId].sections.find((section) => section.id === withCode.sectionId)!.paragraphs.join(' ').match(/(?:^|[^`])`([^`]+)`(?:[^`]|$)/)![1]
    const hit = searchDocs(index, code).find((result) => result.sectionId === withCode.sectionId)!
    expect(hit.snippet.match.toLowerCase()).toBe(code.toLowerCase())
    expect(`${hit.snippet.before}${hit.snippet.match}${hit.snippet.after}`).not.toContain(`\`${code}\``)
  })

  it('no distingue acentos: «retencion» encuentra «retención» y la resalta tal cual', () => {
    const results = searchDocs(index, 'retencion')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((result) => result.snippet.match === 'retención')).toBe(true)
    expect(searchDocs(index, 'RETENCIÓN').length).toBe(results.length)
  })

  it('el fragmento tiene unos 160 caracteres alrededor de la coincidencia', () => {
    for (const result of searchDocs(index, 'bucket').slice(0, 20)) {
      const text = `${result.snippet.before}${result.snippet.match}${result.snippet.after}`
      expect(text.length).toBeLessThanOrEqual(170)
      expect(normalizeForSearch(result.snippet.match)).toBe('bucket')
    }
  })

  it('en la vista: un resultado de la guía enlaza a #/<bloque>/guia/<id> y lo abre', async () => {
    const section = studyGuide.dql.sections[3]
    openAt('#/buscar')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Buscar en la guía')
    await typeSearch(plainText(section.title))
    const link = resultLinks().find((anchor) => anchor.getAttribute('href') === `#/dql/guia/${section.id}`)!
    expect(link).toBeTruthy()
    expect(link.textContent).toContain(plainText(section.title))
    fireEvent.click(link)
    expect(window.location.hash).toBe(`#/dql/guia/${section.id}`)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(modulesWithQuestions.find((module) => module.id === 'dql')!.title)
  })

  it('en la vista: un término del glosario enlaza al bloque, con resaltado en <mark>', async () => {
    const term = glossary.find((item) => item.term === 'Smartscape') ?? glossary[0]
    openAt('#/buscar')
    await typeSearch(term.term)
    const link = resultLinks().find((anchor) => anchor.textContent?.includes(`Glosario: ${term.term}`))!
    expect(link.getAttribute('href')).toBe(`#/${term.moduleId}`)
    expect(link.closest('li')!.querySelector('mark')!.textContent!.toLowerCase()).toBe(term.term.toLowerCase())
    expect(screen.getByRole('status').textContent).toMatch(/\d+ resultados?/)
  })

  it('no busca en las preguntas', async () => {
    const corpus = index.map((doc) => normalizeForSearch(`${doc.title} ${doc.text}`)).join('\n')
    let phrase = ''
    for (const question of allQuestions) {
      const words = question.promptEs.split(/\s+/)
      for (let start = 0; start + 4 <= words.length && !phrase; start += 1) {
        const candidate = words.slice(start, start + 4).join(' ')
        if (!corpus.includes(normalizeForSearch(candidate))) phrase = candidate
      }
      if (phrase) break
    }
    expect(phrase).not.toBe('')
    expect(searchDocs(index, phrase)).toEqual([])
    openAt('#/buscar')
    await typeSearch(phrase)
    expect(resultLinks()).toHaveLength(0)
    expect(screen.getByRole('status').textContent).toBe('No hay resultados.')
  })

  it('con menos de 2 caracteres no busca', async () => {
    expect(searchDocs(index, 'd')).toEqual([])
    expect(searchDocs(index, ' d ')).toEqual([])
    openAt('#/buscar')
    await typeSearch('d')
    expect(resultLinks()).toHaveLength(0)
    expect(screen.getByRole('status').textContent).toBe('Escribe al menos 2 caracteres.')
  })

  it('limita los resultados mostrados y lo dice en el recuento', async () => {
    const total = searchDocs(index, 'de').length
    expect(total).toBeGreaterThan(50)
    openAt('#/buscar')
    await typeSearch('de')
    expect(resultLinks()).toHaveLength(50)
    expect(screen.getByRole('status').textContent).toBe(`${total} resultados; se muestran los 50 primeros.`)
  })

  it('la barra lateral lleva a la búsqueda y a las estadísticas', () => {
    openAt('#/')
    fireEvent.click(nav().getByRole('button', { name: /Buscar/ }))
    expect(window.location.hash).toBe('#/buscar')
    fireEvent.click(nav().getByRole('button', { name: /Estadísticas/ }))
    expect(window.location.hash).toBe('#/estadisticas')
  })
})

describe('historial de simulacros', () => {
  const START = new Date('2026-10-02T10:00:00Z')
  beforeEach(() => { window.localStorage.clear(); window.scrollTo = () => undefined })
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('al entregar un simulacro guarda nota, duración y aciertos por bloque', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'setTimeout', 'clearTimeout', 'Date'] })
    vi.setSystemTime(START)
    openAt('#/')
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    act(() => { vi.advanceTimersByTime(10 * 60 * 1000) })
    fireEvent.click(screen.getByRole('button', { name: /Entregar…/ }))
    fireEvent.click(screen.getByRole('button', { name: /Confirmar entrega/ }))
    const history = loadMockHistory()
    expect(history).toHaveLength(1)
    const [saved] = history
    expect(saved.date).toBe(new Date(START.getTime() + 10 * 60 * 1000).toISOString())
    expect(saved.durationSeconds).toBe(600)
    expect(saved.score).toBe(0)
    expect(saved.correct).toBe(0)
    expect(saved.total).toBe(60)
    expect(Object.values(saved.byModule).reduce((sum, counts) => sum + counts.total, 0)).toBe(60)
    expect(Object.keys(saved.byModule)).toHaveLength(12)
  })

  it('un simulacro reanudado calcula la duración desde su deadline', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'setTimeout', 'clearTimeout', 'Date'] })
    vi.setSystemTime(START)
    const questions = allQuestions.slice(0, 60)
    const first = questions[0]
    const mock: SavedMock = {
      version: 1, title: 'Simulacro · 60 preguntas', questionIds: questions.map((question) => question.id),
      optionOrderByQuestionId: Object.fromEntries(questions.map((question) => [question.id, question.options.map((option) => option.id)])),
      answers: { [first.id]: first.correctOptionIds }, confidenceByQuestion: {}, flagged: [], index: 0,
      deadline: START.getTime() + 30 * 60 * 1000,
    }
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(mock))
    openAt('#/')
    fireEvent.click(screen.getByRole('button', { name: 'Reanudar' }))
    fireEvent.click(screen.getByRole('button', { name: /Entregar…/ }))
    fireEvent.click(screen.getByRole('button', { name: /Confirmar entrega/ }))
    const [saved] = loadMockHistory()
    expect(saved.durationSeconds).toBe(30 * 60)
    expect(saved.correct).toBe(1)
    expect(saved.byModule[first.moduleId].correct).toBe(1)
  })

  it(`conserva como máximo ${MAX_MOCK_HISTORY} simulacros, los más recientes`, () => {
    for (let day = 1; day <= MAX_MOCK_HISTORY + 3; day += 1) appendMockHistory(entry({ date: new Date(Date.UTC(2026, 8, day)).toISOString(), score: day }))
    const history = loadMockHistory()
    expect(history).toHaveLength(MAX_MOCK_HISTORY)
    expect(history[0].score).toBe(4)
    expect(history.at(-1)!.score).toBe(MAX_MOCK_HISTORY + 3)
  })

  it('un JSON dañado o entradas inválidas se ignoran sin error', () => {
    expect(parseMockHistory('{roto')).toEqual([])
    expect(parseMockHistory('{"no":"lista"}')).toEqual([])
    const mixed = [entry(), { ...entry(), score: 140 }, { ...entry(), date: 'ayer' }, { ...entry(), byModule: { dql: { correct: 9, total: 3 } } }, null, 'x', entry({ score: 55 })]
    expect(parseMockHistory(JSON.stringify(mixed)).map((item) => item.score)).toEqual([70, 55])
    window.localStorage.setItem(MOCK_HISTORY_KEY, '{roto')
    openAt('#/estadisticas')
    expect(screen.getByText(/Todavía no has entregado ningún simulacro/)).toBeTruthy()
    expect(() => appendMockHistory(entry())).not.toThrow()
    expect(loadMockHistory()).toHaveLength(1)
  })

  it('vista vacía', () => {
    openAt('#/estadisticas')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Tus simulacros')
    expect(screen.getByText(/Todavía no has entregado ningún simulacro/)).toBeTruthy()
    expect(screen.queryByRole('table')).toBeNull()
  })

  it('vista con datos: tabla accesible y gráfico con texto alternativo', () => {
    window.localStorage.setItem(MOCK_HISTORY_KEY, JSON.stringify([entry({ score: 62 }), entry({ date: '2026-10-02T09:00:00.000Z', score: 81, durationSeconds: 2725 })]))
    openAt('#/estadisticas')
    const table = screen.getByRole('table', { name: /Simulacros entregados/ })
    expect(within(table).getAllByRole('columnheader').every((cell) => cell.getAttribute('scope') === 'col')).toBe(true)
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(2)
    expect(within(rows[0]).getByRole('rowheader').getAttribute('scope')).toBe('row')
    expect(rows[0].textContent).toContain('81%')
    expect(rows[0].textContent).toContain('45 min 25 s')
    expect(rows[1].textContent).toMatch(/DQL[^·]* 2\/6 · Security 3\/6/)
    const chart = screen.getByRole('img', { name: /Evolución de la nota/ })
    expect(chart.querySelectorAll('circle')).toHaveLength(2)
    expect(chart.querySelector('desc')!.textContent).toBe('Notas en orden cronológico: 62%, 81%.')
  })

  it('el historial entra en la copia de seguridad y se restaura', () => {
    const source = new MemoryStorage()
    source.setItem(MOCK_HISTORY_KEY, JSON.stringify([entry(), entry({ score: 90 })]))
    source.setItem('dynatrace-associate-progress-v3', JSON.stringify({ version: 3, attempts: {} }))
    const backup = parseBackup(JSON.stringify(collectBackup(source)))
    expect(Object.keys(backup.entries)).toContain(MOCK_HISTORY_KEY)
    const target = new MemoryStorage()
    applyBackup(target, backup)
    expect(parseMockHistory(target.getItem(MOCK_HISTORY_KEY)).map((item) => item.score)).toEqual([70, 90])
  })
})
