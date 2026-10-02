import type { Module } from '../data/types'
import { sourceKindLabel } from '../app/labels'

export function OfficialSources({ sources }: { sources: Module['sources'] }) {
  return <section className="sources-panel"><div className="panel-heading"><div><p className="eyebrow">PARA VERIFICAR</p><h2>Documentación oficial</h2></div><span className="source-link-mark">↗</span></div><p className="sources-intro">Abre la fuente antes o después de responder. La explicación de cada pregunta vuelve a enlazar aquí.</p><div className="source-list">{sources.map((source) => <a className="source-card" href={source.url} target="_blank" rel="noreferrer" key={source.url}><span className="source-kind">{sourceKindLabel(source.kind)}</span><strong>{source.title}</strong><span className="source-url">{source.url.replace(/^https:\/\//, '')}</span><span className="source-arrow">↗</span></a>)}</div><small className="verification-note">Última revisión del banco: 29 sep 2026 · Comprueba cambios de producto en la fuente viva.</small></section>
}
