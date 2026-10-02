import type { Session } from '../app/types'

/** Revisión antes de entregar el simulacro: recuentos y acceso directo a cada pregunta. */
export function MockReviewView({ session, answers, flagged, secondsLeft, onJump, onBack, onConfirm }: { session: Session; answers: Record<string, string[]>; flagged: string[]; secondsLeft: number; onJump: (index: number) => void; onBack: () => void; onConfirm: () => void }) {
  const isAnswered = (id: string) => (answers[id] ?? []).length > 0
  const answered = session.questionIds.filter(isAnswered).length
  const unanswered = session.questionIds.length - answered
  const marked = session.questionIds.filter((id) => flagged.includes(id)).length
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const seconds = (secondsLeft % 60).toString().padStart(2, '0')
  return <div className="page-stack mock-review">
    <section className="section-heading"><div><p className="eyebrow">ANTES DE ENTREGAR</p><h1>Revisa tu simulacro</h1><p>Quedan {minutes}:{seconds}. Pulsa un número para volver a esa pregunta.</p></div></section>
    <dl className="mock-review-counts">
      <div><dt>Respondidas</dt><dd data-testid="review-answered">{answered}</dd></div>
      <div><dt>Sin responder</dt><dd data-testid="review-unanswered">{unanswered}</dd></div>
      <div><dt>Marcadas</dt><dd data-testid="review-flagged">{marked}</dd></div>
    </dl>
    <section className="content-panel question-nav mock-review-grid" aria-label="Preguntas del simulacro"><div>{session.questionIds.map((id, index) => {
      const state = `${isAnswered(id) ? 'respondida' : 'sin responder'}${flagged.includes(id) ? ', marcada' : ''}`
      return <button type="button" key={id} className={`${isAnswered(id) ? 'visited' : 'pending'} ${flagged.includes(id) ? 'flagged' : ''}`} onClick={() => onJump(index)} aria-label={`Pregunta ${index + 1}: ${state}`} title={state}>{index + 1}{flagged.includes(id) ? ' ⚑' : ''}</button>
    })}</div></section>
    <div className="quiz-footer"><button type="button" className="button-quiet" onClick={onBack}>← Volver al simulacro</button><div className="quiz-footer-actions"><button type="button" className="button-primary" onClick={onConfirm}>Confirmar entrega <span>→</span></button></div></div>
  </div>
}
