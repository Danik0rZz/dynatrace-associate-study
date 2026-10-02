import { useMemo, useState, type MouseEvent } from 'react'
import { formatRoute, type Route } from '../app/router'
import { glossary } from '../data/glossary'
import { useAllBlockGuides } from '../data/guide-loader'
import { modulesWithQuestions } from '../data/questions'
import { buildSearchIndex, MAX_RESULTS, MIN_QUERY_LENGTH, searchDocs, type SearchResult } from '../lib/search-index'

const routeFor = (result: SearchResult): Route => ({ view: 'module', moduleId: result.moduleId, sectionId: result.sectionId })

/** Búsqueda global en la guía (apartados y hechos de precisión) y el glosario. No busca en las preguntas. */
export function SearchView({ onOpen }: { onOpen: (route: Route) => void }) {
  const [query, setQuery] = useState('')
  // La guía se carga por bloque: al abrir la búsqueda se piden los 12 y el índice se construye cuando están todos.
  const guides = useAllBlockGuides()
  const ready = guides.status === 'ready'
  const index = useMemo(() => (ready ? buildSearchIndex(modulesWithQuestions, guides.guide, guides.precision, glossary) : []), [ready, guides])
  const results = useMemo(() => searchDocs(index, query), [index, query])
  const visible = results.slice(0, MAX_RESULTS)
  const tooShort = query.trim().length < MIN_QUERY_LENGTH
  const open = (result: SearchResult) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onOpen(routeFor(result))
  }
  const status = tooShort
    ? `Escribe al menos ${MIN_QUERY_LENGTH} caracteres.`
    : guides.status === 'error' ? 'No se ha podido cargar la guía. Comprueba la conexión y vuelve a abrir la búsqueda.'
      : !ready ? 'Cargando la guía…'
        : results.length === 0 ? 'No hay resultados.'
          : results.length > MAX_RESULTS ? `${results.length} resultados; se muestran los ${MAX_RESULTS} primeros.`
            : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}.`
  return <div className="page-stack search-page">
    <section className="section-heading"><div><p className="eyebrow">BÚSQUEDA</p><h1>Buscar en la guía</h1><p>Busca en los apartados de la guía, los hechos de precisión y el glosario de los 12 bloques. No distingue acentos ni mayúsculas.</p></div></section>
    <div className="search-box"><label htmlFor="global-search">Texto a buscar</label><div className="search-field"><span aria-hidden="true">⌕</span><input id="global-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Por ejemplo: bucket, retención, segments" autoComplete="off" /></div></div>
    <p className="search-count" role="status">{status}</p>
    {!tooShort && ready && visible.length > 0 && <ol className="search-results">{visible.map((result, position) => <li key={`${result.kind}-${result.moduleId}-${result.sectionId ?? ''}-${result.title}-${position}`} className="search-result">
      <a href={formatRoute(routeFor(result))} onClick={open(result)}><span className="search-result-module">{result.moduleTitle}</span><strong>{result.title}</strong></a>
      <p>{result.snippet.before}{result.snippet.match && <mark>{result.snippet.match}</mark>}{result.snippet.after}</p>
    </li>)}</ol>}
  </div>
}
