import { useEffect, useState } from 'react'

/** Lee un JSON de localStorage sin romper si el almacenamiento no está disponible o el valor está dañado. */
export const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export const writeStored = (key: string, value: unknown): void => {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento no disponible: el estado sigue en memoria */
  }
}

/** Estado de React que se guarda en localStorage. */
export function useStoredState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStored(key, fallback))
  useEffect(() => writeStored(key, value), [key, value])
  return [value, setValue] as const
}
