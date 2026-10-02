import type { Preparing } from '../app/useStudySession'

/** Pantalla de una sesión cuyas preguntas se están descargando (o no se han podido descargar). */
export function SessionPreparing({ preparing, onRetry, onHome }: { preparing: Preparing; onRetry: () => void; onHome: () => void }) {
  const mock = preparing.mode === 'mock'
  return <div className="page-stack session-preparing">
    <section className="section-heading"><div><p className="eyebrow">{mock ? 'MODO SIMULACRO' : 'SESIÓN DE ESTUDIO'}</p><h1>{preparing.title}</h1></div></section>
    {preparing.status === 'loading' && <p className="loading-state" role="status">{mock ? `Cargando las preguntas del simulacro…${preparing.resume ? '' : ' El tiempo empezará a contar cuando estén todas.'}` : 'Cargando las preguntas…'}</p>}
    {preparing.status === 'error' && <div className="loading-state" role="alert"><p>No se han podido cargar las preguntas. Comprueba la conexión y vuelve a intentarlo.{mock && !preparing.resume ? ' El simulacro no ha empezado: el tiempo no corre.' : ''}</p><div className="resume-mock-actions"><button type="button" className="button-primary" onClick={onRetry}>Reintentar</button><button type="button" className="button-quiet" onClick={onHome}>Volver al inicio</button></div></div>}
    {preparing.status === 'incompatible' && <div className="loading-state" role="alert"><p>El simulacro guardado ya no es compatible con el banco de preguntas actual y se ha descartado.</p><div className="resume-mock-actions"><button type="button" className="button-quiet" onClick={onHome}>Volver al inicio</button></div></div>}
  </div>
}
