/**
 * Regenera los bloques del tema oscuro de src/styles.css a partir de src/theme/dark-tokens.ts (fuente única).
 * Uso: npm run tema
 *
 * Respeta el fin de línea del fichero (en Windows, git puede dejarlo en CRLF): compara con el contenido
 * normalizado a LF y solo escribe si hay un cambio real.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { withDarkTheme } from '../src/theme/dark-css'

const file = 'src/styles.css'
const raw = readFileSync(file, 'utf8')
const crlf = raw.includes('\r\n')
const before = raw.replace(/\r\n/g, '\n')
const after = withDarkTheme(before)
if (after === before) {
  console.log('Tema oscuro: sin cambios.')
} else {
  writeFileSync(file, crlf ? after.replace(/\n/g, '\r\n') : after)
  console.log('Tema oscuro: bloques regenerados en src/styles.css.')
}
