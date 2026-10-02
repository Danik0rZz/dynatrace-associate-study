import { useMemo } from 'react'
import { useMediaQuery } from '../app/useMediaQuery'
import { modulesWithQuestions } from '../data/question-catalog'
import { loadMockHistory, type MockHistoryEntry } from '../lib/mock-history'

const moduleTitle = (id: string) => modulesWithQuestions.find((module) => module.id === id)?.title ?? id
const formatDate = (iso: string) => new Date(iso).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)} min ${String(seconds % 60).padStart(2, '0')} s`

/** Los dos bloques con menor proporción de aciertos (con al menos una pregunta). */
const weakest = (entry: MockHistoryEntry) => Object.entries(entry.byModule)
  .filter(([, counts]) => counts.total > 0)
  .sort(([leftId, left], [rightId, right]) => left.correct / left.total - right.correct / right.total || moduleTitle(leftId).localeCompare(moduleTitle(rightId)))
  .slice(0, 2)

/** Estadísticas de los simulacros entregados (los 20 más recientes). */
export function StatsView() {
  const history = useMemo(() => loadMockHistory(), [])
  return <div className="page-stack stats-page">
    <section className="section-heading"><div><p className="eyebrow">ESTADÍSTICAS</p><h1>Tus simulacros</h1><p>Nota, duración y bloques más flojos de los últimos {history.length || 20} simulacros entregados en este navegador.</p></div></section>
    {history.length === 0
      ? <section className="content-panel"><p className="empty-state">Todavía no has entregado ningún simulacro. Cuando termines uno, aparecerá aquí.</p></section>
      : <>
        <section className="content-panel"><ScoreChart history={history} /></section>
        <section className="content-panel stats-table-wrap"><table className="stats-table">
          <caption>Simulacros entregados, del más reciente al más antiguo</caption>
          <thead><tr><th scope="col">Fecha</th><th scope="col">Nota</th><th scope="col">Aciertos</th><th scope="col">Duración</th><th scope="col">Bloques más flojos</th></tr></thead>
          <tbody>{[...history].reverse().map((entry, index) => <tr key={`${entry.date}-${index}`}>
            <th scope="row">{formatDate(entry.date)}</th>
            <td>{entry.score}%</td>
            <td>{entry.correct}/{entry.total}</td>
            <td>{formatDuration(entry.durationSeconds)}</td>
            <td>{weakest(entry).map(([id, counts]) => `${moduleTitle(id)} ${counts.correct}/${counts.total}`).join(' · ')}</td>
          </tr>)}</tbody>
        </table></section>
      </>}
  </div>
}

/** Evolución de la nota en SVG: una línea con un punto por simulacro, en orden cronológico. */
function ScoreChart({ history }: { history: MockHistoryEntry[] }) {
  // En móvil el lienzo es más estrecho para que, al escalar, las etiquetas no bajen de 12 px.
  const mobile = useMediaQuery('(max-width: 780px)')
  const width = mobile ? 340 : 640
  const height = 220
  const pad = { top: 16, right: 16, bottom: 30, left: mobile ? 52 : 40 }
  const innerWidth = width - pad.left - pad.right
  const innerHeight = height - pad.top - pad.bottom
  const x = (index: number) => pad.left + (history.length === 1 ? innerWidth / 2 : index / (history.length - 1) * innerWidth)
  const y = (score: number) => pad.top + (1 - score / 100) * innerHeight
  const points = history.map((entry, index) => `${x(index)},${y(entry.score)}`).join(' ')
  const description = `Notas en orden cronológico: ${history.map((entry) => `${entry.score}%`).join(', ')}.`
  return <figure className="score-chart">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="score-chart-title score-chart-desc">
      <title id="score-chart-title">Evolución de la nota del simulacro</title>
      <desc id="score-chart-desc">{description}</desc>
      {[0, 50, 100].map((tick) => <g key={tick}><line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} className="score-chart-grid" /><text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" className="score-chart-label">{tick}%</text></g>)}
      <polyline points={points} className="score-chart-line" />
      {history.map((entry, index) => <circle key={`${entry.date}-${index}`} cx={x(index)} cy={y(entry.score)} r={4} className="score-chart-point" />)}
      <text x={pad.left} y={height - 8} className="score-chart-label">Más antiguo</text>
      <text x={width - pad.right} y={height - 8} textAnchor="end" className="score-chart-label">Más reciente</text>
    </svg>
    <figcaption>{description}</figcaption>
  </figure>
}
