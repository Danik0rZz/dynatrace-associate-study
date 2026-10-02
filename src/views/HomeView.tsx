import { useMediaQuery } from '../app/useMediaQuery'
import { BackupTools } from '../components/BackupTools'
import type { Module } from '../data/types'
import { allQuestions } from '../data/questions'
import { examProfile } from '../data/modules'
import { type ProgressState, moduleCompletion } from '../lib/progress'

export function HomeView({ modules: moduleList, progress, continueTarget: activeModule, overallPercentage, overallScore, attemptedQuestionCount, onStart, onMap, onMock, onOpenModule }: { modules: Module[]; progress: ProgressState; continueTarget: Module; overallPercentage: number; overallScore: number; attemptedQuestionCount: number; onStart: () => void; onMap: () => void; onMock: () => void; onOpenModule: (id: string) => void }) {
  const mobile = useMediaQuery('(max-width: 780px)')
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">PREPARACIÓN TÉCNICA · 2026</p>
          <h1>Convierte el path en<br /><em>criterio operativo.</em></h1>
          <p className="hero-lede">Una ruta de estudio en español para dominar la certificación Associate: conceptos, precisión, escenarios y decisiones con evidencia oficial.</p>
          <div className="hero-actions"><button className="button-primary" onClick={onStart} aria-describedby="continue-target">Continuar ruta <span>→</span></button><button className="button-quiet" onClick={onMap}>Explorar mapa <span>↗</span></button></div>
          <div className="hero-source-line"><span className="source-check">✓</span> Fuentes oficiales enlazadas por módulo y por pregunta</div>
        </div>
        <div className="hero-progress-card">
          <div className="progress-orbit" style={{ background: `conic-gradient(var(--teal) 0 ${overallPercentage}%, rgba(255,255,255,.15) ${overallPercentage}% 100%)` }}><div className="orbit-center"><strong>{overallPercentage}%</strong><span>revisado</span></div></div>
          <div className="progress-card-copy"><span className="card-label">ESTADO DE LA RUTA</span><strong id="continue-target">{activeModule.title}</strong><span>{attemptedQuestionCount} de {allQuestions.length} preguntas practicadas</span></div>
          <div className="progress-card-footer"><span>Score acumulado</span><strong>{attemptedQuestionCount ? `${Math.round(overallScore / attemptedQuestionCount * 100)}%` : '—'}</strong></div>
        </div>
      </section>

      <section className="metric-strip">
        <Metric value="12" label="módulos" detail="del study path" />
        <Metric value={String(allQuestions.length)} label="preguntas" detail="con explicación" />
        <Metric value="60" label="simulacro" detail="práctica local" />
      </section>

      <section className="exam-ribbon"><div><p className="eyebrow">PERFIL DE EXAMEN · REFERENCIA</p><h2>{examProfile.label}</h2><p>{examProfile.note}</p></div><div className="exam-links">{examProfile.officialLinks.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.title} ↗</a>)}</div></section>

      <section className="section-heading"><div><p className="eyebrow">PUNTO DE PARTIDA</p><h2>Tu ruta, en una mirada</h2></div><button className="text-button" onClick={onMap}>Abrir mapa completo <span>↗</span></button></section>
      <div className="module-overview-grid">{moduleList.map((module) => <ModuleOverviewCard key={module.id} module={module} progress={progress} onOpen={() => onOpenModule(module.id)} />)}</div>
      {/* En móvil la barra lateral no muestra la copia de seguridad: se ofrece aquí. */}
      {mobile && <section className="home-backup content-panel" aria-labelledby="home-backup-title"><div><p className="eyebrow">COPIA DE SEGURIDAD</p><h2 id="home-backup-title">Guarda o recupera tu progreso</h2><p>El progreso vive en este navegador. Exporta una copia para no perderlo o importa una anterior.</p></div><BackupTools className="data-tools home-backup-tools" /></section>}
      <section className="cta-band"><div><p className="eyebrow">CUANDO QUIERAS MEDIRTE</p><h2>Un simulacro sin pistas.</h2><p>60 preguntas, feedback al final y revisión por dominio.</p></div><button className="button-dark" onClick={onMock}>Iniciar simulacro <span>→</span></button></section>
    </div>
  )
}

function Metric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return <div className="metric"><strong>{value}</strong><div><span>{label}</span><small>{detail}</small></div></div>
}

function ModuleOverviewCard({ module, progress, onOpen }: { module: Module; progress: ProgressState; onOpen: () => void }) {
  const completion = moduleCompletion(progress, module.questionIds)
  return <button className="module-overview-card" onClick={onOpen}><div className="module-card-top"><span className="module-number">{String(module.order).padStart(2, '0')}</span><span className="module-status">{completion ? `${completion}%` : 'pendiente'}</span></div><h3>{module.title}</h3><p>{module.summary}</p><div className="thin-progress"><span style={{ width: `${completion}%` }} /></div></button>
}
