/**
 * Aviso de material no oficial: el ÚNICO sitio con su texto (el README lo repite en Markdown, palabra por palabra).
 * - `full`: versión completa, en la portada.
 * - `short`: versión corta, en el pie de todas las vistas; se despliega para mostrar la completa.
 */

export const DISCLAIMER_FULL = 'Proyecto de estudio independiente y no oficial. No está afiliado, patrocinado ni respaldado por Dynatrace. Dynatrace y los nombres de sus productos son marcas de sus respectivos titulares y se citan solo para identificar el temario de la certificación. Las preguntas son de elaboración propia: no proceden del examen oficial. Contrasta siempre la información en docs.dynatrace.com y Dynatrace University.'
export const DISCLAIMER_SHORT = 'Material de estudio no oficial · Sin relación con Dynatrace · Marcas de sus titulares'

export function Disclaimer({ variant }: { variant: 'full' | 'short' }) {
  if (variant === 'full') {
    return <section className="disclaimer disclaimer-full" aria-label="Aviso"><p>{DISCLAIMER_FULL}</p></section>
  }
  return <details className="disclaimer disclaimer-short">
    <summary>{DISCLAIMER_SHORT}</summary>
    <p>{DISCLAIMER_FULL}</p>
  </details>
}
