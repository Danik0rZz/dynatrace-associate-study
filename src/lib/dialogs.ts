/**
 * Diálogos propios (sustituyen a window.confirm/alert). Se pueden pedir desde cualquier sitio, también fuera de React:
 * `confirmDialog` resuelve `true` al confirmar y `false` al cancelar (o con Esc); `alertDialog` resuelve al cerrarlo.
 * `DialogHost` (components/Dialog.tsx) pinta el primero de la cola; los siguientes esperan su turno.
 */

export type DialogOptions = {
  title: string
  message: string
  /** Texto del botón de aceptar. Por defecto «Aceptar». */
  confirmLabel?: string
  /** Texto del botón de cancelar (solo confirmaciones). Por defecto «Cancelar». */
  cancelLabel?: string
}

export type DialogRequest = DialogOptions & {
  id: number
  kind: 'confirm' | 'alert'
  resolve: (accepted: boolean) => void
}

type Listener = () => void

let queue: DialogRequest[] = []
let nextId = 1
const listeners = new Set<Listener>()
const notify = () => { for (const listener of listeners) listener() }

export const subscribeDialogs = (listener: Listener): (() => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

/** Diálogo visible (el primero de la cola) o `null`. */
export const currentDialog = (): DialogRequest | null => queue[0] ?? null
export const isDialogOpen = (): boolean => queue.length > 0

const open = (kind: DialogRequest['kind'], options: DialogOptions) => new Promise<boolean>((resolve) => {
  queue = [...queue, { ...options, kind, id: nextId++, resolve }]
  notify()
})

export const confirmDialog = (options: DialogOptions): Promise<boolean> => open('confirm', options)
export const alertDialog = (options: DialogOptions): Promise<void> => open('alert', options).then(() => undefined)

/** Cierra el diálogo visible con la respuesta dada. */
export const answerDialog = (id: number, accepted: boolean): void => {
  const request = queue.find((item) => item.id === id)
  if (!request) return
  queue = queue.filter((item) => item.id !== id)
  notify()
  request.resolve(accepted)
}

/** Solo para tests: cancela todo lo pendiente. */
export const resetDialogs = (): void => {
  const pending = queue
  queue = []
  notify()
  for (const request of pending) request.resolve(false)
}
