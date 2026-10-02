import { formatIsoDate, isIsoDate } from '../lib/dates'

/** Fecha de calendario legible («2 oct 2026») con su `<time datetime>`; sin fecha válida no pinta nada. */
export function IsoTime({ value }: { value: string }) {
  return <time dateTime={value}>{formatIsoDate(value)}</time>
}

/** «Revisado 2 oct 2026»: cuándo se contrastó el apartado con la documentación (columna Revisado del plan). */
export function ReviewedDate({ value }: { value?: string }) {
  if (!isIsoDate(value)) return null
  return <p className="section-reviewed">Revisado <IsoTime value={value} /></p>
}
