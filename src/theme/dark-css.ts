import { darkTokens } from './dark-tokens'

export const DARK_START = '/* tema-oscuro:inicio — generado con `npm run tema` desde src/theme/dark-tokens.ts; no editar a mano */'
export const DARK_END = '/* tema-oscuro:fin */'

const declarations = (tokens: Record<string, string>, indent: string) =>
  [`${indent}color-scheme: dark;`, ...Object.entries(tokens).map(([name, value]) => `${indent}${name}: ${value};`)].join('\n')

/**
 * Los dos bloques del tema oscuro, con los mismos tokens y valores:
 * - preferencia del sistema, salvo que el usuario haya elegido «Claro» (`data-theme="light"`);
 * - elección explícita «Oscuro» (`data-theme="dark"`).
 */
export const darkThemeCss = (tokens: Record<string, string> = darkTokens): string => [
  DARK_START,
  '@media (prefers-color-scheme: dark) {',
  '  :root:not([data-theme="light"]) {',
  declarations(tokens, '    '),
  '  }',
  '}',
  ':root[data-theme="dark"] {',
  declarations(tokens, '  '),
  '}',
  DARK_END,
].join('\n')

/** Sustituye (o añade tras el primer bloque :root) los bloques oscuros en el texto de styles.css. */
export const withDarkTheme = (css: string, tokens: Record<string, string> = darkTokens): string => {
  const block = darkThemeCss(tokens)
  const start = css.indexOf(DARK_START)
  if (start >= 0) {
    const end = css.indexOf(DARK_END, start) + DARK_END.length
    return css.slice(0, start) + block + css.slice(end)
  }
  const rootEnd = css.indexOf('}', css.indexOf(':root')) + 1
  return `${css.slice(0, rootEnd)}\n\n${block}${css.slice(rootEnd)}`
}
