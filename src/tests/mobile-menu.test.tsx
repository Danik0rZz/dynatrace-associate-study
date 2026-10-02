import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

const menuButton = () => screen.getByRole('button', { name: /Menú/ })
const panel = () => screen.getByRole('dialog', { name: 'Menú' })
const openMenu = () => {
  fireEvent.click(menuButton())
  return panel()
}

describe('menú móvil', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    delete (window as Partial<Window>).matchMedia
  })

  it('en escritorio no hay botón «Menú» y la barra lateral se ve como siempre', () => {
    setViewport(false)
    render(<App />)
    expect(screen.queryByRole('button', { name: /Menú/ })).toBeNull()
    expect(document.querySelector('.app-shell > .sidebar')).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeTruthy()
  })

  it('en móvil la cabecera tiene título y «Menú»; la navegación no está a la vista hasta abrirlo', () => {
    setViewport(true)
    render(<App />)
    expect(document.querySelector('.mobile-header-title')!.textContent).toBe('Study Lab')
    const button = menuButton()
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(button.getAttribute('aria-controls')).toBe('mobile-menu')
    expect(screen.queryByRole('navigation', { name: 'Navegación principal' })).toBeNull()
  })

  it('abrir: aria-expanded true, foco dentro del panel, fondo inerte y sin scroll', () => {
    setViewport(true)
    render(<App />)
    const dialog = openMenu()
    expect(menuButton().getAttribute('aria-expanded')).toBe('true')
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(dialog.id).toBe('mobile-menu')
    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(within(dialog).getByRole('navigation', { name: 'Navegación principal' })).toBeTruthy()
    expect(document.getElementById('main-content')!.hasAttribute('inert')).toBe(true)
    expect(document.documentElement.style.overflow).toBe('hidden')
  })

  it('Esc cierra, aria-expanded vuelve a false y el foco vuelve a «Menú»', () => {
    setViewport(true)
    render(<App />)
    menuButton().focus()
    openMenu()
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()
    expect(menuButton().getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(menuButton())
    expect(document.getElementById('main-content')!.hasAttribute('inert')).toBe(false)
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('un toque en el fondo cierra; un toque dentro del panel no', () => {
    setViewport(true)
    render(<App />)
    const dialog = openMenu()
    fireEvent.click(dialog)
    expect(screen.getByRole('dialog', { name: 'Menú' })).toBeTruthy()
    fireEvent.click(document.querySelector('.mobile-menu-layer')!)
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()
  })

  it('Tab no sale del panel', () => {
    setViewport(true)
    render(<App />)
    const dialog = openMenu()
    const close = within(dialog).getByRole('button', { name: 'Cerrar el menú' })
    expect(document.activeElement).toBe(close)
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true })
    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(document.activeElement).not.toBe(close)
  })

  it('al navegar desde el panel se cierra, la ruta cambia y el foco va al <main>', () => {
    setViewport(true)
    render(<App />)
    fireEvent.click(within(openMenu()).getByRole('button', { name: /Glosario/ }))
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()
    expect(window.location.hash).toBe('#/glosario')
    expect(document.activeElement?.id).toBe('main-content')
    expect(document.querySelector('.mobile-header-title')!.textContent).toBe('Glosario')
    // También la ruta actual de la barra lateral.
    fireEvent.click(within(openMenu()).getByRole('button', { name: /Ruta actual/ }))
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()
    expect(window.location.hash).toMatch(/^#\/[a-z-]+$/)
    expect(document.activeElement?.id).toBe('main-content')
  })

  it('con un simulacro en curso: elegir otra vista en el panel pide confirmación; «Seguir» mantiene y «Salir» navega y cierra', async () => {
    setViewport(true)
    render(<App />)
    fireEvent.click(within(openMenu()).getByRole('button', { name: /Simulacro/ }))
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()

    fireEvent.click(within(openMenu()).getByRole('button', { name: /Glosario/ }))
    const confirm = screen.getByRole('alertdialog', { name: '¿Salir del simulacro?' })
    // El diálogo queda operativo encima del panel (el panel queda inerte con el resto de la app).
    expect(document.activeElement?.textContent).toBe('Seguir en el simulacro')
    expect(document.querySelector('.app-shell')!.hasAttribute('inert')).toBe(true)
    await act(async () => { fireEvent.click(within(confirm).getByRole('button', { name: 'Seguir en el simulacro' })) })
    expect(screen.getByText('MODO SIMULACRO')).toBeTruthy()
    expect(window.location.hash).toBe('#/simulacro')
    // Al cancelar, el panel sigue abierto y el foco vuelve a la entrada que se había pulsado.
    expect(panel().contains(document.activeElement)).toBe(true)

    fireEvent.click(within(panel()).getByRole('button', { name: /Glosario/ }))
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Salir del simulacro' })) })
    expect(window.location.hash).toBe('#/glosario')
    expect(screen.queryByText('MODO SIMULACRO')).toBeNull()
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()
    expect(document.activeElement?.id).toBe('main-content')
  })

  it('Exportar desde el panel lo cierra', () => {
    setViewport(true)
    URL.createObjectURL = () => 'blob:x'
    URL.revokeObjectURL = () => undefined
    // jsdom no descarga ficheros: el clic del enlace de descarga no hace nada.
    const download = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    render(<App />)
    fireEvent.click(within(openMenu()).getByRole('button', { name: 'Exportar progreso' }))
    expect(download).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog', { name: 'Menú' })).toBeNull()
    download.mockRestore()
  })
})
