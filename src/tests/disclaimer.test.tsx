import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { DISCLAIMER_FULL, DISCLAIMER_SHORT } from '../components/Disclaimer'

const setViewport = (mobile: boolean) => {
  window.matchMedia = ((query: string) => ({
    matches: mobile && query === '(max-width: 780px)',
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))
const footers = () => screen.getAllByRole('contentinfo')

describe('aviso de material no oficial', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    delete (window as Partial<Window>).matchMedia
  })

  it('el texto corto es el acordado (separador « · », sin punto final)', () => {
    expect(DISCLAIMER_SHORT).toBe('Material de estudio no oficial · Sin relación con Dynatrace · Marcas de sus titulares')
    expect(DISCLAIMER_FULL.startsWith('Proyecto de estudio independiente y no oficial.')).toBe(true)
  })

  it('la portada muestra el aviso completo', () => {
    render(<App />)
    const notice = screen.getByRole('region', { name: 'Aviso' })
    expect(notice.textContent).toBe(DISCLAIMER_FULL)
  })

  it('el README repite el aviso completo palabra por palabra en su sección «Aviso»', async () => {
    const fsModule: string = 'node:fs'
    const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as { readFileSync: (path: string, encoding: 'utf8') => string }
    const readme = readFileSync('README.md', 'utf8').replace(/\r\n/g, '\n')
    const section = readme.split('## Aviso\n')[1].split('\n## ')[0]
    expect(section.split('\n').map((line) => line.trim()).filter(Boolean)[0]).toBe(DISCLAIMER_FULL)
  })

  it('hay exactamente un pie (contentinfo) con el texto corto en Inicio, bloque, quiz y simulacro', () => {
    render(<App />)
    const check = () => {
      expect(footers()).toHaveLength(1)
      expect(within(footers()[0]).getByText(DISCLAIMER_SHORT)).toBeTruthy()
    }
    check()
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    check()
    fireEvent.click(screen.getByRole('button', { name: /Quiz rápido/ }))
    expect(screen.getByText('SESIÓN DE ESTUDIO')).toBeTruthy()
    check()
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    check()
  })

  it('el pie despliega el aviso completo', () => {
    render(<App />)
    const footer = footers()[0]
    expect(footer.querySelector('summary')!.textContent).toBe(DISCLAIMER_SHORT)
    expect(footer.querySelector('details p')!.textContent).toBe(DISCLAIMER_FULL)
  })

  it('las migas no empiezan por «Dynatrace»', () => {
    render(<App />)
    const crumbs = screen.getByRole('navigation', { name: 'Ruta de navegación' })
    expect(crumbs.textContent!.startsWith('Dynatrace')).toBe(false)
    expect(crumbs.textContent!.startsWith('Study Lab')).toBe(true)
  })

  it('el logotipo es «SL» en la barra lateral', () => {
    setViewport(false)
    render(<App />)
    expect(document.querySelector('.sidebar .brand-mark')!.textContent).toBe('SL')
  })

  it('el logotipo es «SL» en la cabecera móvil y en el menú', () => {
    setViewport(true)
    render(<App />)
    expect(document.querySelector('.mobile-header .brand-mark')!.textContent).toBe('SL')
    fireEvent.click(screen.getByRole('button', { name: /Menú/ }))
    expect(within(screen.getByRole('dialog', { name: 'Menú' })).getByText('SL')).toBeTruthy()
  })

  it('con el menú móvil abierto, el pie queda inerte como el resto del fondo', () => {
    setViewport(true)
    render(<App />)
    expect(footers()[0].hasAttribute('inert')).toBe(false)
    fireEvent.click(screen.getByRole('button', { name: /Menú/ }))
    expect(document.querySelector('.site-footer')!.hasAttribute('inert')).toBe(true)
  })
})
