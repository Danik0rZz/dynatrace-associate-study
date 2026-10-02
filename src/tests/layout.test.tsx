import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { exportProgress } from '../app/backup-actions'

// Exportar descarga un fichero (no disponible en jsdom): se sustituye por un espía. Importar es el real.
vi.mock('../app/backup-actions', async (importOriginal) => ({ ...(await importOriginal<typeof import('../app/backup-actions')>()), exportProgress: vi.fn() }))

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
    // En móvil la navegación está dentro del menú.
    fireEvent.click(screen.getByRole('button', { name: /Menú/ }))
    expect(screen.getByRole('navigation', { name: 'Navegación principal' }).textContent).toContain('Glosario')
  })
})

describe('copia de seguridad en Inicio (móvil)', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    vi.mocked(exportProgress).mockClear()
  })
  afterEach(() => {
    cleanup()
    delete (window as Partial<Window>).matchMedia
  })

  it('en móvil se ven Exportar e Importar y funcionan', async () => {
    setViewport(true)
    render(<App />)
    const panel = screen.getByRole('region', { name: 'Guarda o recupera tu progreso' })
    fireEvent.click(within(panel).getByRole('button', { name: 'Exportar progreso' }))
    expect(exportProgress).toHaveBeenCalledTimes(1)
    const input = within(panel).getByLabelText('Importar progreso desde un fichero') as HTMLInputElement
    expect(input.type).toBe('file')
    const backup = JSON.stringify({ app: 'dynatrace-associate-study-lab', version: 1, exportedAt: '2026-10-02T10:00:00Z', entries: { 'dynatrace-associate-progress-v3': '{"version":3,"attempts":{}}' } })
    await act(async () => { fireEvent.change(input, { target: { files: [new File([backup], 'copia.json', { type: 'application/json' })] } }) })
    // Pasa por el diálogo del PR 6 (confirmación de restaurar o aviso si el fichero no se puede leer).
    expect(await screen.findByRole('alertdialog')).toBeTruthy()
  })

  it('en escritorio no se duplica: la copia está en la barra lateral', () => {
    setViewport(false)
    render(<App />)
    expect(screen.queryByRole('region', { name: 'Guarda o recupera tu progreso' })).toBeNull()
    expect(screen.getAllByRole('button', { name: 'Exportar progreso' })).toHaveLength(1)
  })
})

describe('aside del quiz plegable', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
  })
  afterEach(() => {
    cleanup()
    delete (window as Partial<Window>).matchMedia
  })

  const openQuiz = () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    fireEvent.click(screen.getByRole('button', { name: /Quiz rápido/ }))
  }

  it('abierto en escritorio', () => {
    setViewport(false)
    openQuiz()
    const details = document.querySelector<HTMLDetailsElement>('details.quiz-aside-details')!
    expect(details.open).toBe(true)
    expect(details.querySelector('summary')!.textContent).toBe('Documentación de apoyo')
  })

  it('cerrado en móvil, con la confianza siempre a la vista', () => {
    setViewport(true)
    openQuiz()
    const details = document.querySelector<HTMLDetailsElement>('details.quiz-aside-details')!
    expect(details.open).toBe(false)
    const confidence = screen.getByRole('button', { name: 'Confianza 4' })
    expect(details.contains(confidence)).toBe(false)
    fireEvent.click(confidence)
    expect(screen.getByText('4/5')).toBeTruthy()
  })
})
