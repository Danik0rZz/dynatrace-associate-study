import { secondsUntil, type SavedMock } from '../lib/mock-session'

/** Ofrece reanudar o descartar un simulacro guardado. */
export function ResumeMockPanel({ mock, discardLabel, onResume, onDiscard }: { mock: SavedMock; discardLabel: string; onResume: () => void; onDiscard: () => void }) {
  const answered = mock.questionIds.filter((id) => (mock.answers[id] ?? []).length > 0).length
  const left = secondsUntil(mock.deadline)
  const time = left > 0 ? `quedan ${Math.floor(left / 60)} min` : 'el tiempo se ha agotado: al reanudarlo se entregará con tus respuestas'
  return <div className="resume-mock" role="region" aria-label="Simulacro sin terminar"><p><strong>Tienes un simulacro sin terminar</strong> ({answered}/{mock.questionIds.length} respondidas; {time}).</p><div className="resume-mock-actions"><button type="button" className="button-primary" onClick={onResume}>Reanudar</button><button type="button" className="button-quiet" onClick={onDiscard}>{discardLabel}</button></div></div>
}
