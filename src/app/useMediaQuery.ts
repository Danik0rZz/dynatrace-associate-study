import { useSyncExternalStore } from 'react'

/** `true` mientras la media query se cumple. Sin `matchMedia` (p. ej., en jsdom) devuelve `false`. */
export function useMediaQuery(query: string): boolean {
  const media = () => (typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(query) : null)
  return useSyncExternalStore(
    (onChange) => {
      const list = media()
      list?.addEventListener('change', onChange)
      return () => list?.removeEventListener('change', onChange)
    },
    () => media()?.matches ?? false,
    () => false,
  )
}
