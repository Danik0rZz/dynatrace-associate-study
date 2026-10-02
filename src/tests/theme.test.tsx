import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { THEME_KEY, themeAttribute } from '../app/theme'
import { applyBackup, collectBackup, parseBackup } from '../lib/backup'
import { CONTRAST_PAIRS } from '../theme/contrast-pairs'
import { contrastOf, tokensIn } from '../theme/contrast'
import { DARK_END, DARK_START, darkThemeCss } from '../theme/dark-css'
import { darkTokens } from '../theme/dark-tokens'

/** Lee un fichero del proyecto (Vitest se ejecuta desde la raíz). */
const readProjectFile = async (path: string): Promise<string> => {
  const fsModule: string = 'node:fs'
  const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}

const blockAfter = (css: string, opener: string) => {
  const start = css.indexOf(opener)
  return css.slice(start + opener.length, css.indexOf('}', start))
}

/** Pares que ya estaban por debajo del umbral en claro antes del tema oscuro (arreglarlos cambiaría el aspecto en claro). */
const KNOWN_LIGHT_ISSUES = new Set(['estado pendiente'])

describe('tema oscuro: tokens', () => {
  it('los dos bloques oscuros declaran exactamente los mismos tokens y valores, que salen de dark-tokens.ts', async () => {
    const css = await readProjectFile('src/styles.css')
    expect(css.includes(darkThemeCss())).toBe(true)
    const generated = css.slice(css.indexOf(DARK_START), css.indexOf(DARK_END))
    const media = tokensIn(blockAfter(generated, ':root:not([data-theme="light"]) {'))
    const explicit = tokensIn(blockAfter(generated, ':root[data-theme="dark"] {'))
    expect(media).toEqual(explicit)
    expect(media).toEqual(darkTokens)
    expect(generated).toContain('@media (prefers-color-scheme: dark)')
    expect(blockAfter(generated, ':root[data-theme="dark"] {')).toContain('color-scheme: dark;')
    expect(blockAfter(css, ':root {')).toContain('color-scheme: light;')
  })

  it('todo token oscuro existe en claro (no se inventan tokens que el claro no tenga)', async () => {
    const css = await readProjectFile('src/styles.css')
    const light = tokensIn(blockAfter(css, ':root {'))
    for (const name of Object.keys(darkTokens)) expect(light[name], name).toBeDefined()
  })
})

describe('tema oscuro: contraste', () => {
  const themes = async () => {
    const css = await readProjectFile('src/styles.css')
    const light = tokensIn(blockAfter(css, ':root {'))
    const dark = { ...light, ...tokensIn(blockAfter(css, ':root[data-theme="dark"] {')) }
    return { light, dark }
  }

  it.each(['light', 'dark'] as const)('tema %s: texto ≥ 4,5:1 y foco ≥ 3:1 en todos los pares usados', async (name) => {
    const theme = (await themes())[name]
    const failures = CONTRAST_PAIRS
      .filter((pair) => !(name === 'light' && KNOWN_LIGHT_ISSUES.has(pair.what)))
      .map((pair) => ({ ...pair, ratio: contrastOf(theme, pair.fg, pair.bg) }))
      .filter((pair) => pair.ratio < pair.min)
      .map((pair) => `${pair.what}: ${pair.fg} sobre ${JSON.stringify(pair.bg)} = ${pair.ratio.toFixed(2)} < ${pair.min}`)
    expect(failures).toEqual([])
  })

  it('el test detecta un par por debajo del umbral', async () => {
    const { dark } = await themes()
    const broken = { ...dark, '--ink-soft': '#3a4a4e' }
    const pair = CONTRAST_PAIRS.find((item) => item.what === 'texto suave / tarjeta')!
    expect(contrastOf(broken, pair.fg, pair.bg)).toBeLessThan(pair.min)
  })
})

describe('preferencia de tema', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    document.documentElement.removeAttribute('data-theme')
  })

  const picker = () => within(screen.getByRole('group', { name: 'Tema' }))

  it('por defecto «Sistema» (sin data-theme); elegir aplica, guarda en JSON y se recorre con las flechas', () => {
    render(<App />)
    expect((picker().getByRole('radio', { name: 'Sistema' }) as HTMLInputElement).checked).toBe(true)
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
    act(() => { fireEvent.click(picker().getByRole('radio', { name: 'Oscuro' })) })
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(window.localStorage.getItem(THEME_KEY)).toBe('"dark"')
    act(() => { fireEvent.click(picker().getByRole('radio', { name: 'Claro' })) })
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    act(() => { fireEvent.click(picker().getByRole('radio', { name: 'Sistema' })) })
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
    // Radios nativos con el mismo name: el navegador los recorre con las flechas.
    const radios = picker().getAllByRole('radio') as HTMLInputElement[]
    expect(new Set(radios.map((radio) => radio.name))).toEqual(new Set(['theme']))
  })

  it('un valor guardado no válido se trata como «Sistema»', () => {
    window.localStorage.setItem(THEME_KEY, '"azul"')
    render(<App />)
    expect((picker().getByRole('radio', { name: 'Sistema' }) as HTMLInputElement).checked).toBe(true)
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })

  it('la preferencia viaja en la copia de seguridad', () => {
    window.localStorage.setItem(THEME_KEY, '"dark"')
    const backup = parseBackup(JSON.stringify(collectBackup(window.localStorage)))
    expect(backup.entries[THEME_KEY]).toBe('"dark"')
    window.localStorage.clear()
    applyBackup(window.localStorage, backup)
    render(<App />)
    expect((picker().getByRole('radio', { name: 'Oscuro' }) as HTMLInputElement).checked).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})

describe('script sin parpadeo de index.html', () => {
  afterEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('interpreta los mismos valores que la app', async () => {
    const html = await readProjectFile('index.html')
    const script = html.match(/<script>([\s\S]*?)<\/script>/)![1]
    expect(script).toContain(THEME_KEY)
    const run = new Function(script)
    for (const raw of ['"dark"', '"light"', '"system"', 'dark', '"azul"', '{', null]) {
      window.localStorage.clear()
      document.documentElement.removeAttribute('data-theme')
      if (raw !== null) window.localStorage.setItem(THEME_KEY, raw)
      run()
      expect(document.documentElement.getAttribute('data-theme'), String(raw)).toBe(themeAttribute(raw))
    }
  })

  it('tiene dos theme-color, para claro y para oscuro', async () => {
    const html = await readProjectFile('index.html')
    expect(html).toMatch(/<meta name="theme-color" content="#[0-9a-f]{6}" media="\(prefers-color-scheme: light\)" \/>/)
    expect(html).toMatch(/<meta name="theme-color" content="#[0-9a-f]{6}" media="\(prefers-color-scheme: dark\)" \/>/)
  })
})
