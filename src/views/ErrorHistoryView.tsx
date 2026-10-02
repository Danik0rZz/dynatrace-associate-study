import type { Question } from '../data/types'
import { GuideLink } from '../components/GuideLink'
import { InlineText } from '../components/InlineText'
import { allQuestions } from '../data/questions'
import { bucketLabels, difficultyLabels } from '../app/labels'
import { type ProgressState, latestAttempt } from '../lib/progress'

export function ErrorHistoryView({ progress, onOpenModule, onOpenGuide }: { progress: ProgressState; onOpenModule: (id: string) => void; onOpenGuide: (question: Question) => void }) {
  const errors = allQuestions
    .map((question) => ({ question, attempt: latestAttempt(progress, question.id) }))
    .filter(({ attempt }) => attempt && !attempt.correct)
    .sort((left, right) => (right.attempt?.timestamp ?? '').localeCompare(left.attempt?.timestamp ?? ''))
  return <div className="page-stack errors-page"><section className="section-heading"><div><p className="eyebrow">MEMORIA DE ERRORES</p><h1>Historial de errores</h1><p>Revisa el último fallo de cada pregunta, vuelve a la fuente y retoma el módulo con una hipótesis concreta.</p></div><span className="completion-badge">{errors.length} pendientes</span></section>{errors.length ? <div className="error-list">{errors.map(({ question, attempt }) => <article className="error-card" key={question.id}><div className="error-card-top"><span className={`difficulty-pill ${question.difficulty}`}>{difficultyLabels[question.difficulty]}</span><span className="bucket-pill">{bucketLabels[question.bucket]}</span><span className="error-date">{attempt ? new Date(attempt.timestamp).toLocaleString('es-ES') : ''}</span></div><h2><InlineText text={question.promptEs} /></h2><div className="error-card-answer"><span>Tu selección: <b>{attempt?.selectedOptionIds.length ? attempt.selectedOptionIds.map((id) => question.options.find((option) => option.id === id)?.text).join(' / ') : 'sin respuesta'}</b></span><span>Respuesta correcta: <b><InlineText text={question.options.filter((option) => question.correctOptionIds.includes(option.id)).map((option) => option.text).join(' / ')} /></b></span></div><p><InlineText text={question.explanationEs} /></p><GuideLink question={question} onOpenGuide={() => onOpenGuide(question)} /><div className="error-card-links">{question.sourceRefs.slice(0, 2).map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.title} ↗</a>)}<button onClick={() => onOpenModule(question.moduleId)}>Abrir módulo ↗</button></div></article>)}</div> : <section className="content-panel empty-error-state"><p className="eyebrow">TODO LIMPIO</p><h2>Aún no tienes errores registrados.</h2><p>Empieza un quiz y vuelve aquí para convertir cada fallo en una sesión de estudio trazable.</p></section>}</div>
}
