import { useState } from 'react'
import { glossary } from '../data/glossary'
import { modulesWithQuestions } from '../data/questions'
import { matchesSearch } from '../lib/search'

const glossaryModules = modulesWithQuestions.filter((module) => glossary.some((entry) => entry.moduleId === module.id))

export function GlossaryView({ search, onSearch, onOpenModule }: { search: string; onSearch: (value: string) => void; onOpenModule: (id: string) => void }) {
  const [moduleId, setModuleId] = useState('')
  const entries = glossary.filter((entry) => (!moduleId || entry.moduleId === moduleId) && matchesSearch(`${entry.term} ${entry.definition}`, search))
  const moduleTitle = glossaryModules.find((module) => module.id === moduleId)?.title
  return <div className="page-stack glossary-page"><section className="section-heading"><div><p className="eyebrow">REFERENCIA RÁPIDA</p><h1>Glosario</h1><p>Los términos se mantienen en inglés cuando así aparecen en Dynatrace; la explicación está en español.</p></div><div className="glossary-filters"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Buscar término" aria-label="Buscar término en el glosario" /></label><label className="filter-field" htmlFor="glossary-module"><span>Bloque</span><select id="glossary-module" value={moduleId} onChange={(event) => setModuleId(event.target.value)}><option value="">Todos los bloques</option>{glossaryModules.map((module) => <option value={module.id} key={module.id}>{String(module.order).padStart(2, '0')} {module.title}</option>)}</select></label></div></section><p className="glossary-count" role="status">{entries.length} {entries.length === 1 ? 'término' : 'términos'}</p><div className="glossary-grid">{entries.map((entry) => <article className="glossary-card" key={`${entry.moduleId}-${entry.term}`}><div><span className="term-chip">{entry.term}</span><button onClick={() => onOpenModule(entry.moduleId)}>Ver módulo ↗</button></div><p>{entry.definition}</p></article>)}</div>{entries.length === 0 && <p className="empty-state">No hay términos que coincidan con “{search}”{moduleTitle ? ` en ${moduleTitle}` : ''}.</p>}</div>
}
