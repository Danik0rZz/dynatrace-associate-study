import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { writeStored } from '../app/storage'
import { applyBackup, BackupError, type Backup } from '../lib/backup'
import { emptyProgress, PROGRESS_KEY, saveProgress } from '../lib/progress'
import { dismissStorageError, safeSetItem, storageErrorSnapshot } from '../lib/safe-storage'
import { rememberServed } from '../lib/selection'

const quotaError = () => new DOMException('The quota has been exceeded.', 'QuotaExceededError')

/** Simula un navegador con la cuota de localStorage llena: toda escritura lanza una excepción. */
describe('cuota de almacenamiento llena', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    dismissStorageError()
  })
  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
    dismissStorageError()
  })

  const fillQuota = () => vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw quotaError() })

  it('ninguna escritura de la app lanza y todas avisan del fallo', () => {
    fillQuota()
    expect(safeSetItem('dynatrace-associate-x', '1')).toBe(false)
    expect(storageErrorSnapshot()).toBe(true)
    dismissStorageError()
    expect(() => saveProgress(emptyProgress())).not.toThrow()
    expect(() => writeStored('dynatrace-associate-y', [1])).not.toThrow()
    expect(() => rememberServed(['A-001'])).not.toThrow()
    expect(storageErrorSnapshot()).toBe(true)
  })

  it('la app sigue funcionando en memoria y muestra un aviso no bloqueante', () => {
    render(<App />)
    fillQuota()
    fireEvent.click(screen.getAllByRole('button', { name: /Notebooks & Dashboards/ })[0])
    fireEvent.click(screen.getAllByText('Practicar este apartado')[0])
    const hint = screen.getByText(/Selecciona (exactamente \d|la respuesta)/).textContent ?? ''
    const needed = Number(hint.match(/\d/)?.[0] ?? 1)
    const options = within(screen.getByRole('group', { name: 'Opciones de respuesta' })).getAllByRole(needed > 1 ? 'checkbox' : 'radio')
    for (let index = 0; index < needed; index++) fireEvent.click(options[index])
    fireEvent.click(screen.getByRole('button', { name: /Comprobar respuesta/ }))

    const warning = screen.getByText(/No se ha podido guardar en este navegador/).closest('[role="status"]') as HTMLElement
    expect(warning).toBeTruthy()
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(screen.getByText(/1\/\d+ revisadas/)).toBeTruthy()
    fireEvent.click(within(warning).getByRole('button', { name: 'Entendido' }))
    expect(screen.queryByText(/No se ha podido guardar en este navegador/)).toBeNull()
  })

  it('al restaurar una copia que no cabe, mantiene el progreso anterior', () => {
    const before = JSON.stringify({ version: 3, attempts: { 'A-001': [] } })
    window.localStorage.setItem(PROGRESS_KEY, before)
    const backup: Backup = { app: 'dynatrace-associate-study-lab', version: 1, exportedAt: '2026-10-02T10:00:00Z', entries: { [PROGRESS_KEY]: '{"version":3,"attempts":{}}', 'dynatrace-associate-served-v1': '[]' } }
    const original = Storage.prototype.setItem
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (this: Storage, key: string, value: string) {
      if (key === 'dynatrace-associate-served-v1') throw quotaError()
      original.call(this, key, value)
    })
    expect(() => applyBackup(window.localStorage, backup)).toThrow(BackupError)
    expect(window.localStorage.getItem(PROGRESS_KEY)).toBe(before)
  })
})
