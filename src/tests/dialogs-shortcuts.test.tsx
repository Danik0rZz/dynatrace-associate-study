import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { importProgress } from '../app/backup-actions'
import { shortcutIndex } from '../app/useQuizShortcuts'
import type { Session } from '../app/types'
import { DialogHost } from '../components/Dialog'
import { allQuestions } from '../data/questions'
import type { Question } from '../data/types'
import { alertDialog, confirmDialog, isDialogOpen } from '../lib/dialogs'
import { QuizView } from '../views/QuizView'

const PROGRESS_KEY = 'dynatrace-associate-progress-v3'
const flush = () => act(async () => { await Promise.resolve() })
const key = (value: string, init: KeyboardEventInit = {}, target: Element = document.activeElement ?? document.body) => fireEvent.keyDown(target, { key: value, ...init })

describe('diálogo propio', () => {
  afterEach(() => cleanup())

  const setup = () => {
    render(<><button type="button">Abrir</button><DialogHost /></>)
    const opener = screen.getByRole('button', { name: 'Abrir' })
    opener.focus()
    return opener
  }

  it('confirmación: foco en Cancelar, roles ARIA y nombre accesible', async () => {
    setup()
    let result: Promise<boolean> = Promise.resolve(false)
    act(() => { result = confirmDialog({ title: '¿Borrar?', message: 'No se puede deshacer.', confirmLabel: 'Borrar' }) })
    const dialog = screen.getByRole('alertdialog', { name: '¿Borrar?' })
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(document.getElementById(dialog.getAttribute('aria-describedby')!)!.textContent).toBe('No se puede deshacer.')
    expect(document.activeElement?.textContent).toBe('Cancelar')
    fireEvent.click(within(dialog).getByRole('button', { name: 'Borrar' }))
    await expect(result).resolves.toBe(true)
    expect(screen.queryByRole('alertdialog')).toBeNull()
  })

  it('Tab y Shift+Tab quedan atrapados dentro del diálogo', () => {
    setup()
    act(() => { void confirmDialog({ title: 'T', message: 'M' }) })
    const cancel = screen.getByRole('button', { name: 'Cancelar' })
    const accept = screen.getByRole('button', { name: 'Aceptar' })
    key('Tab', { shiftKey: true }, cancel)
    expect(document.activeElement).toBe(accept)
    key('Tab', {}, accept)
    expect(document.activeElement).toBe(cancel)
    // Aunque el foco se haya escapado, Tab lo devuelve al diálogo.
    screen.getByRole('button', { name: 'Abrir' }).focus()
    key('Tab')
    expect(document.activeElement).toBe(cancel)
  })

  it('Esc cancela, resuelve false y devuelve el foco a quien lo abrió', async () => {
    const opener = setup()
    let result: Promise<boolean> = Promise.resolve(true)
    act(() => { result = confirmDialog({ title: 'T', message: 'M' }) })
    expect(document.activeElement).not.toBe(opener)
    key('Escape')
    await expect(result).resolves.toBe(false)
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(document.activeElement).toBe(opener)
  })

  it('cancelar con el botón resuelve false; un aviso tiene el foco en Aceptar y resuelve al cerrarlo', async () => {
    setup()
    let confirmed: Promise<boolean> = Promise.resolve(true)
    act(() => { confirmed = confirmDialog({ title: 'T', message: 'M' }) })
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    await expect(confirmed).resolves.toBe(false)
    let closed: Promise<void> = Promise.resolve()
    const done = vi.fn()
    act(() => { closed = alertDialog({ title: 'Aviso', message: 'Algo ha fallado.' }).then(done) })
    expect(screen.getByRole('alertdialog', { name: 'Aviso' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Cancelar' })).toBeNull()
    expect(document.activeElement?.textContent).toBe('Aceptar')
    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }))
    await closed
    expect(done).toHaveBeenCalledTimes(1)
  })

  it('con un diálogo abierto, el resto de la app queda inerte', async () => {
    window.localStorage.clear()
    window.scrollTo = () => undefined
    render(<App />)
    const shell = document.querySelector('.app-shell')!
    expect(shell.hasAttribute('inert')).toBe(false)
    act(() => { void confirmDialog({ title: 'T', message: 'M' }) })
    expect(shell.hasAttribute('inert')).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    await flush()
    expect(shell.hasAttribute('inert')).toBe(false)
  })
})

describe('importar una copia pasa por el diálogo', () => {
  const before = JSON.stringify({ version: 3, attempts: { 'A-001': [] } })
  const restored = JSON.stringify({ version: 3, attempts: {} })
  const file = (entries: Record<string, string>) => ({ text: async () => JSON.stringify({ app: 'dynatrace-associate-study-lab', version: 1, exportedAt: '2026-10-02T10:00:00Z', entries }) })

  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem(PROGRESS_KEY, before)
    render(<DialogHost />)
  })
  afterEach(() => cleanup())

  it('si se cancela, no se aplica', async () => {
    const reload = vi.fn()
    let pending: Promise<void> = Promise.resolve()
    await act(async () => { pending = importProgress(file({ [PROGRESS_KEY]: restored }), reload) })
    const dialog = screen.getByRole('alertdialog', { name: '¿Restaurar esta copia?' })
    expect(dialog.textContent).toContain('0 preguntas respondidas')
    await act(async () => { fireEvent.click(within(dialog).getByRole('button', { name: 'Cancelar' })); await pending })
    expect(window.localStorage.getItem(PROGRESS_KEY)).toBe(before)
    expect(reload).not.toHaveBeenCalled()
  })

  it('si se confirma, se aplica y se recarga', async () => {
    const reload = vi.fn()
    let pending: Promise<void> = Promise.resolve()
    await act(async () => { pending = importProgress(file({ [PROGRESS_KEY]: restored }), reload) })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Restaurar copia' })); await pending })
    expect(window.localStorage.getItem(PROGRESS_KEY)).toBe(restored)
    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('un fichero no válido muestra un aviso, no un alert nativo', async () => {
    const nativeAlert = vi.spyOn(window, 'alert').mockImplementation(() => undefined)
    let pending: Promise<void> = Promise.resolve()
    await act(async () => { pending = importProgress({ text: async () => 'no es json' }, vi.fn()) })
    const dialog = screen.getByRole('alertdialog', { name: 'No se ha podido importar' })
    expect(dialog.textContent).toContain('El fichero no es un JSON válido.')
    await act(async () => { fireEvent.click(within(dialog).getByRole('button', { name: 'Aceptar' })); await pending })
    expect(nativeAlert).not.toHaveBeenCalled()
    expect(window.localStorage.getItem(PROGRESS_KEY)).toBe(before)
  })
})

describe('atajos de teclado en el quiz', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  const single = allQuestions.find((question) => question.type === 'single' && question.options.length >= 4)!
  const multiple = allQuestions.find((question) => question.type === 'multiple' && question.options.length >= 4)!

  /** QuizView con estado real y el orden de opciones invertido, para comprobar que cuenta la posición visible. */
  function Harness({ question, mode = 'quick', onSubmit = () => undefined, onNext = () => undefined }: { question: Question; mode?: Session['mode']; onSubmit?: () => void; onNext?: () => void }) {
    const [selected, setSelected] = useState<string[]>([])
    const [flagged, setFlagged] = useState(false)
    const order = question.options.map((option) => option.id).reverse()
    const session: Session = { mode, title: 'Prueba', questionIds: [question.id, 'otra'], optionOrderByQuestionId: { [question.id]: order } }
    const toggle = (id: string) => setSelected((current) => question.type === 'single' ? [id] : current.includes(id) ? current.filter((item) => item !== id) : current.length < question.correctOptionIds.length ? [...current, id] : current)
    return <><input aria-label="Campo de texto" /><QuizView session={session} question={question} index={0} selected={selected} confidence={3} flagged={flagged} secondsLeft={600} feedbackVisible={false} onToggleAnswer={toggle} onConfidence={() => undefined} onSubmit={onSubmit} onNext={onNext} onToggleFlag={() => setFlagged((value) => !value)} onOpenGuide={() => undefined} onBack={() => undefined} onJump={() => undefined} onReview={() => undefined} /><DialogHost /></>
  }
  const visibleOptions = () => [...document.querySelectorAll<HTMLInputElement>('.options-list input')]

  it('1-9 y A-I corresponden a posiciones 0-8', () => {
    expect([shortcutIndex('1'), shortcutIndex('9'), shortcutIndex('a'), shortcutIndex('C'), shortcutIndex('i')]).toEqual([0, 8, 0, 2, 8])
    expect([shortcutIndex('0'), shortcutIndex('j'), shortcutIndex('m'), shortcutIndex('Enter')]).toEqual([null, null, null, null])
  })

  it('un número elige la opción en esa posición visible (orden barajado)', () => {
    render(<Harness question={single} />)
    key('2', {}, document.body)
    const options = visibleOptions()
    expect(options[1].checked).toBe(true)
    expect(options[1].closest('label')!.textContent).toContain(single.options[single.options.length - 2].text.slice(0, 20))
    key('a', {}, document.body)
    expect(options[0].checked).toBe(true)
    expect(options[1].checked).toBe(false)
  })

  it('en una pregunta múltiple, la tecla activa y desactiva la opción', () => {
    render(<Harness question={multiple} />)
    key('1', {}, document.body)
    key('3', {}, document.body)
    expect(visibleOptions().map((option) => option.checked).slice(0, 3)).toEqual([true, false, true])
    key('1', {}, document.body)
    expect(visibleOptions()[0].checked).toBe(false)
    expect(visibleOptions()[2].checked).toBe(true)
  })

  it('funciona con el foco en una opción (radio), pero no en un campo de texto ni con Ctrl, Alt o Meta', () => {
    render(<Harness question={single} />)
    visibleOptions()[3].focus()
    key('1')
    expect(visibleOptions()[0].checked).toBe(true)
    key('2', {}, screen.getByLabelText('Campo de texto'))
    key('2', { ctrlKey: true }, document.body)
    key('2', { altKey: true }, document.body)
    key('2', { metaKey: true }, document.body)
    expect(visibleOptions()[1].checked).toBe(false)
    expect(visibleOptions()[0].checked).toBe(true)
  })

  it('se desactivan con un diálogo abierto', () => {
    render(<Harness question={single} />)
    act(() => { void confirmDialog({ title: 'T', message: 'M' }) })
    expect(isDialogOpen()).toBe(true)
    key('1', {}, document.body)
    expect(visibleOptions()[0].checked).toBe(false)
  })

  it('Enter comprueba solo si el botón principal está habilitado, y no se ejecuta dos veces sobre un botón', () => {
    const onSubmit = vi.fn()
    render(<Harness question={single} onSubmit={onSubmit} />)
    key('Enter', {}, document.body)
    expect(onSubmit).not.toHaveBeenCalled()
    key('1', {}, document.body)
    key('Enter', {}, document.body)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    key('Enter', {}, screen.getByRole('button', { name: /Comprobar respuesta/ }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('M marca la pregunta en el simulacro', () => {
    const onSubmit = vi.fn()
    render(<Harness question={single} mode="mock" onSubmit={onSubmit} />)
    const flag = screen.getByRole('button', { name: /Marcar/ })
    expect(flag.textContent).toContain('⚐')
    key('m', {}, document.body)
    expect(flag.textContent).toContain('⚑')
    key('M', {}, document.body)
    expect(flag.textContent).toContain('⚐')
    // En el simulacro Enter guarda y continúa aunque no haya respuesta.
    key('Enter', {}, document.body)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('muestra la línea de ayuda con los atajos', () => {
    render(<Harness question={single} />)
    const help = document.querySelector('.quiz-shortcuts')!
    expect(help.textContent).toContain(`1–${Math.min(single.options.length, 9)}`)
    expect(help.textContent).toContain('Enter')
    expect(help.textContent).toContain('M marca la pregunta')
  })

  it('la ayuda y el diálogo usan colores de :root con contraste ≥ 4,5:1', async () => {
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
    expect(contrast(varOf('.quiz-shortcuts', 'color'), root.paper)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(varOf('.quiz-shortcuts kbd', 'color'), varOf('.quiz-shortcuts kbd', 'background'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(varOf('.dialog p', 'color'), varOf('.dialog', 'background'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(varOf('.dialog', 'color'), varOf('.dialog', 'background'))).toBeGreaterThanOrEqual(4.5)
  })
})
