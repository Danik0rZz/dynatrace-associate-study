import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'

/** Simula un navegador cuyo ancho cumple (o no) `(max-width: 780px)`. */
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

describe('barra lateral colapsada guardada', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('dynatrace-associate-sidebar-collapsed', 'true')
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    // jsdom no trae matchMedia: se quita para no afectar a otros tests.
    delete (window as Partial<Window>).matchMedia
  })

  it('en escritorio se respeta', () => {
    setViewport(false)
    render(<App />)
    expect(document.querySelector('.app-shell')!.classList.contains('sidebar-collapsed')).toBe(true)
    expect(screen.getByRole('button', { name: 'Expandir menú lateral' })).toBeTruthy()
  })

  it('en móvil (≤ 780 px) se ignora: la navegación se ve completa', () => {
    setViewport(true)
    render(<App />)
    expect(document.querySelector('.app-shell')!.classList.contains('sidebar-collapsed')).toBe(false)
    expect(screen.getByRole('navigation', { name: 'Navegación principal' }).textContent).toContain('Glosario')
  })
})
