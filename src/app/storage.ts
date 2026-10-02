import { useEffect, useState } from 'react'
import { safeSetItem } from '../lib/safe-storage'

/** Lee un JSON de localStorage sin romper si el almacenamiento no está disponible o el valor está dañado. */
export const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

/** Si no se puede guardar, el estado sigue en memoria y se muestra el aviso de almacenamiento. */
export const writeStored = (key: string, value: unknown): void => {
  safeSetItem(key, JSON.stringify(value))
}

/** Estado de React que se guarda en localStorage. */
export function useStoredState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStored(key, fallback))
  useEffect(() => writeStored(key, value), [key, value])
  return [value, setValue] as const
}
