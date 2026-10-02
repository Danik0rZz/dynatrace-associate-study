import type { Background } from './contrast-pairs'

type Rgba = [number, number, number, number]

/** #rgb, #rrggbb o rgba()/rgb() → [r, g, b, a] (0-255, alfa 0-1). */
export const parseColor = (value: string): Rgba => {
  const v = value.trim().toLowerCase()
  if (v.startsWith('#')) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join('') : v.slice(1)
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1]
  }
  const parts = v.replace(/rgba?\(|\)/g, '').split(/[\s,/]+/).filter(Boolean).map(Number)
  return [parts[0], parts[1], parts[2], parts[3] ?? 1]
}

/** Capa translúcida sobre un color opaco. */
const over = ([r, g, b, a]: Rgba, [br, bg, bb]: Rgba): Rgba => [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a), 1]

const luminance = ([r, g, b]: Rgba) => {
  const c = [r, g, b].map((x) => x / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

/** Contraste WCAG entre un color (sobre su fondo) y un fondo, ambos como nombres de token del tema dado. */
export const contrastOf = (theme: Record<string, string>, fg: string, bg: Background): number => {
  const resolve = (token: string) => {
    const value = theme[token]
    if (!value) throw new Error(`Token sin valor: ${token}`)
    return parseColor(value)
  }
  const background = Array.isArray(bg) ? over(resolve(bg[0]), resolve(bg[1])) : resolve(bg)
  const foreground = over(resolve(fg), background)
  const [hi, lo] = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (hi + 0.05) / (lo + 0.05)
}

/** Tokens de un bloque CSS («--x: valor;»). */
export const tokensIn = (block: string): Record<string, string> =>
  Object.fromEntries([...block.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
