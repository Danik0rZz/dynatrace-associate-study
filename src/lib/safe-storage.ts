/**
 * Escritura en localStorage que nunca rompe la app.
 *
 * Si el navegador rechaza una escritura (cuota llena, modo privado, almacenamiento bloqueado), `safeSetItem`
 * devuelve `false` y avisa a los suscriptores; la app sigue funcionando con el estado en memoria.
 */

type Listener = () => void

const listeners = new Set<Listener>()
let failed = false

/** `true` si alguna escritura ha fallado desde que se cargó la app (o desde el último `dismissStorageError`). */
export const storageErrorSnapshot = (): boolean => failed

export const subscribeStorageError = (listener: Listener): (() => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

const notify = () => { for (const listener of listeners) listener() }

export const reportStorageError = (): void => {
  if (failed) return
  failed = true
  notify()
}

export const dismissStorageError = (): void => {
  if (!failed) return
  failed = false
  notify()
}

const defaultStorage = (): Pick<Storage, 'setItem'> | undefined => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : undefined
  } catch {
    return undefined
  }
}

/** Guarda un valor y devuelve si se ha podido. Nunca lanza. */
export const safeSetItem = (key: string, value: string, storage: Pick<Storage, 'setItem'> | undefined = defaultStorage()): boolean => {
  if (!storage) return false
  try {
    storage.setItem(key, value)
    return true
  } catch {
    reportStorageError()
    return false
  }
}
