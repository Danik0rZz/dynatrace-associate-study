import { useEffect, useState } from 'react'
import { difficultyLabels } from '../app/labels'
import type { Difficulty } from '../data/types'
import { COUNT_OPTIONS, countMessage, customModules, customPool, DIFFICULTIES, sectionsWithQuestions, type CustomFilters, type CustomStatus } from '../lib/custom-quiz'
import type { ProgressState } from '../lib/progress'

const statusOptions: { value: CustomStatus; label: string; hint: string }[] = [
  { value: 'all', label: 'Todas', hint: 'Sin filtrar por tu historial.' },
  { value: 'review', label: 'Falladas o dudosas', hint: 'Las que están en el repaso: falladas o respondidas con confianza 1 o 2.' },
  { value: 'unseen', label: 'Nunca vistas', hint: 'Sin ningún intento.' },
]

/** Título de la sesión según el alcance elegido. */
const sessionTitle = (filters: CustomFilters): string => {
  if (filters.modules.length !== 1) return `Quiz a medida · ${filters.modules.length} bloques`
  const module = customModules.find((item) => item.id === filters.modules[0])
  const section = filters.section ? sectionsWithQuestions(filters.modules[0]).find((item) => item.id === filters.section) : undefined
  return `Quiz a medida · ${section?.title ?? module?.title ?? filters.modules[0]}`
}

/**
 * Configuración del quiz a medida. Todo se calcula con el catálogo ligero: el texto de las preguntas se descarga al
 * empezar (y solo el de los bloques de las preguntas elegidas).
 */
export function CustomQuizView({ filters, progress, onChange, onStart }: { filters: CustomFilters; progress: ProgressState; onChange: (next: CustomFilters) => void; onStart: (filters: CustomFilters, title: string) => void }) {
  const available = customPool(filters, progress).length
  const served = Math.min(available, filters.count)
  const message = countMessage(available, filters.count)
  // El recuento visible cambia al instante; el anunciado (role="status") espera a que se dejen de tocar los filtros.
  const [announced, setAnnounced] = useState(message)
  useEffect(() => {
    const timer = window.setTimeout(() => setAnnounced(message), 700)
    return () => window.clearTimeout(timer)
  }, [message])

  const update = (patch: Partial<CustomFilters>) => {
    const next = { ...filters, ...patch }
    // El apartado es de un bloque concreto: si cambia la elección de bloques, se quita.
    if (patch.modules && (patch.modules.length !== 1 || patch.modules[0] !== filters.modules[0])) next.section = null
    onChange(next)
  }
  const toggleModule = (id: string) => update({ modules: filters.modules.includes(id) ? filters.modules.filter((item) => item !== id) : customModules.map((module) => module.id).filter((item) => item === id || filters.modules.includes(item)) })
  const toggleDifficulty = (value: Difficulty) => update({ difficulties: filters.difficulties.includes(value) ? filters.difficulties.filter((item) => item !== value) : DIFFICULTIES.filter((item) => item === value || filters.difficulties.includes(item)) })
  const singleModule = filters.modules.length === 1 ? filters.modules[0] : null
  const sections = singleModule ? sectionsWithQuestions(singleModule) : []

  return <div className="page-stack custom-page">
    <section className="section-heading"><div><p className="eyebrow">PRÁCTICA DIRIGIDA</p><h1>Quiz a medida</h1><p>Elige qué practicar: bloques, apartado, dificultad y si quieres solo lo fallado o lo que nunca has visto. Las preguntas se eligen sin repetir y dando prioridad a las menos practicadas.</p></div></section>
    <form className="custom-form" onSubmit={(event) => { event.preventDefault(); if (served) onStart(filters, sessionTitle(filters)) }}>
      <fieldset className="custom-group custom-group-wide">
        <legend>Bloques</legend>
        <div className="custom-group-tools"><button type="button" className="text-button" onClick={() => update({ modules: customModules.map((module) => module.id) })}>Todos</button><button type="button" className="text-button" onClick={() => update({ modules: [] })}>Ninguno</button></div>
        <div className="custom-options custom-options-modules">{customModules.map((module) => <label className="custom-option" key={module.id}><input type="checkbox" checked={filters.modules.includes(module.id)} onChange={() => toggleModule(module.id)} /><span><b>{String(module.order).padStart(2, '0')}</b> {module.title}</span></label>)}</div>
      </fieldset>
      <fieldset className="custom-group custom-group-wide">
        <legend>Apartado</legend>
        {singleModule
          ? <label className="filter-field custom-select" htmlFor="custom-section"><span>Apartado de la guía</span><select id="custom-section" value={filters.section ?? ''} onChange={(event) => update({ section: event.target.value || null })}><option value="">Todos los apartados</option>{sections.map((section) => <option value={section.id} key={section.id}>{section.title} ({section.count})</option>)}</select></label>
          : <p className="custom-hint">Elige un único bloque para filtrar por un apartado de su guía.</p>}
      </fieldset>
      <fieldset className="custom-group">
        <legend>Dificultad</legend>
        <div className="custom-options">{DIFFICULTIES.map((value) => <label className="custom-option" key={value}><input type="checkbox" checked={filters.difficulties.includes(value)} onChange={() => toggleDifficulty(value)} /><span>{difficultyLabels[value]}</span></label>)}</div>
      </fieldset>
      <fieldset className="custom-group">
        <legend>Tu historial</legend>
        <div className="custom-options custom-options-stack">{statusOptions.map((option) => <label className="custom-option" key={option.value}><input type="radio" name="custom-status" checked={filters.status === option.value} onChange={() => update({ status: option.value })} /><span><b>{option.label}</b><small>{option.hint}</small></span></label>)}</div>
      </fieldset>
      <fieldset className="custom-group">
        <legend>Número de preguntas</legend>
        <div className="custom-options">{COUNT_OPTIONS.map((count) => <label className="custom-option custom-option-count" key={count}><input type="radio" name="custom-count" checked={filters.count === count} onChange={() => update({ count })} /><span>{count}</span></label>)}</div>
      </fieldset>
      <div className="custom-summary">
        <p className={`custom-count ${available === 0 ? 'custom-count-empty' : ''}`} aria-hidden="true">{message}</p>
        <p className="sr-only" role="status">{announced}</p>
        <button type="submit" className="button-primary" disabled={!served}>Empezar quiz{served ? <> <span>{served}</span></> : null} <b>→</b></button>
      </div>
    </form>
  </div>
}
