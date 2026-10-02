/**
 * Regenera los bloques del tema oscuro de src/styles.css a partir de src/theme/dark-tokens.ts (fuente única).
 * Uso: npm run tema
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { withDarkTheme } from '../src/theme/dark-css'

const file = 'src/styles.css'
const before = readFileSync(file, 'utf8')
const after = withDarkTheme(before)
writeFileSync(file, after)
console.log(after === before ? 'Tema oscuro: sin cambios.' : 'Tema oscuro: bloques regenerados en src/styles.css.')
