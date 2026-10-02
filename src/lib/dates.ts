/**
 * Fechas del banco y del plan («AAAA-MM-DD», sin hora). Se leen como fecha de calendario: `new Date('2026-10-02')`
 * es medianoche UTC y en América se mostraría como 1 oct. Aquí se construye en UTC y se formatea en UTC, así que el
 * día no depende de la zona horaria del navegador.
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

const formatter = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

/** `true` si es una fecha de calendario válida en formato AAAA-MM-DD. */
export const isIsoDate = (value: unknown): value is string => {
  if (typeof value !== 'string') return false
  const match = ISO_DATE.exec(value)
  if (!match) return false
  const [, year, month, day] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

/** «2026-10-02» → «2 oct 2026». Una fecha inválida se devuelve tal cual. */
export const formatIsoDate = (value: string): string => {
  if (!isIsoDate(value)) return value
  const [year, month, day] = value.split('-').map(Number)
  return formatter.format(Date.UTC(year, month - 1, day)).replace(/\./g, '')
}
