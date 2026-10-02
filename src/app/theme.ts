import { useEffect } from 'react'
import { useStoredState } from './storage'

/** Preferencia de tema. Se guarda como JSON (`"dark"`), igual que el resto de `useStoredState`, y viaja en la copia. */
export const THEME_KEY = 'dynatrace-associate-theme-v1'
export type ThemePreference = 'system' | 'light' | 'dark'
export const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
]

export const isThemePreference = (value: unknown): value is ThemePreference => value === 'system' || value === 'light' || value === 'dark'

/**
 * Lo que la app (y el script sin parpadeo de index.html) hacen con el valor guardado:
 * `data-theme="light" | "dark"` o, para «Sistema» y valores no válidos, sin atributo.
 */
export const themeAttribute = (raw: string | null): 'light' | 'dark' | null => {
  try {
    const value: unknown = JSON.parse(raw ?? 'null')
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

/**
 * Aplica el tema al cambiar la preferencia. Durante el cambio se desactivan las transiciones
 * (clase temporal en <html>) para que todo cambie a la vez.
 */
export function useTheme() {
  const [stored, setStored] = useStoredState<ThemePreference>(THEME_KEY, 'system')
  const preference: ThemePreference = isThemePreference(stored) ? stored : 'system'

  useEffect(() => {
    const root = document.documentElement
    const current = root.getAttribute('data-theme')
    const next = preference === 'system' ? null : preference
    if (current === next) return undefined
    root.classList.add('theme-switching')
    if (next) root.setAttribute('data-theme', next)
    else root.removeAttribute('data-theme')
    // Dos fotogramas: el navegador pinta el tema nuevo sin transiciones y después se reactivan.
    let second = 0
    const first = window.requestAnimationFrame(() => { second = window.requestAnimationFrame(() => root.classList.remove('theme-switching')) })
    return () => {
      window.cancelAnimationFrame(first)
      window.cancelAnimationFrame(second)
      root.classList.remove('theme-switching')
    }
  }, [preference])

  return [preference, setStored] as const
}
