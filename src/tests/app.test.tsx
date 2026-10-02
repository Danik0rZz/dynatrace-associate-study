import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

/** Prueba de humo de la interfaz: las pantallas principales se pintan y responden sin errores. */
describe('interfaz', () => {
  beforeEach(() => { window.localStorage.clear(); window.scrollTo = () => undefined })
  afterEach(() => cleanup())

  const nav = () => within(screen.getByRole('navigation', { name: 'Navegación principal' }))

  it('pinta la portada con el número real de preguntas', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(screen.getAllByText(/1175|1\.175/).length).toBeGreaterThan(0)
  })

  it('abre un bloque con su guía y sus botones de práctica por apartado', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    expect(screen.getByRole('heading', { level: 1, name: 'Notebooks & Dashboards' })).toBeTruthy()
    expect(screen.getAllByText('Practicar este apartado').length).toBeGreaterThan(5)
  })

  it('responde una pregunta y abre la guía en el panel lateral', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    fireEvent.click(screen.getAllByText('Practicar este apartado')[0])
    const hint = screen.getByText(/Selecciona (exactamente \d|la respuesta)/).textContent ?? ''
    const needed = Number(hint.match(/\d/)?.[0] ?? 1)
    const options = screen.getAllByRole(needed > 1 ? 'checkbox' : 'radio')
    for (let index = 0; index < needed; index++) fireEvent.click(options[index])
    fireEvent.click(screen.getByRole('button', { name: /Comprobar respuesta/ }))
    fireEvent.click(screen.getByRole('button', { name: /VER EN LA GUÍA/ }))
    expect(screen.getByRole('dialog')).toBeTruthy()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('el simulacro tiene 60 preguntas y se puede finalizar', () => {
    render(<App />)
    fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
    expect(screen.getByText('/ 60')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: '60' }))
    fireEvent.click(screen.getByRole('button', { name: /Finalizar simulacro/ }))
    expect(screen.getByText('SIMULACRO COMPLETADO')).toBeTruthy()
    expect(screen.getByText('Dónde has acertado y dónde no')).toBeTruthy()
  })

  it('el simulacro se entrega solo al acabar el tiempo y registra cada pregunta una vez', () => {
    vi.useFakeTimers()
    try {
      render(<App />)
      fireEvent.click(nav().getByRole('button', { name: /Simulacro/ }))
      act(() => { vi.advanceTimersByTime(60 * 60 * 1000 + 2000) })
      expect(screen.getByText('SIMULACRO COMPLETADO')).toBeTruthy()
      const stored = JSON.parse(window.localStorage.getItem('dynatrace-associate-progress-v3') ?? '{}') as { attempts: Record<string, unknown[]> }
      const lists = Object.values(stored.attempts)
      expect(lists.length).toBe(60)
      expect(lists.every((list) => list.length === 1)).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })

  it('las demás pantallas se pintan', () => {
    render(<App />)
    for (const label of ['Repaso adaptativo', 'Prácticas', 'Errores', 'Glosario']) {
      fireEvent.click(nav().getByRole('button', { name: new RegExp(label) }))
      expect(screen.getByRole('main')).toBeTruthy()
    }
  })
})
