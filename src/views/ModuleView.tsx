import { useState, type MouseEvent } from 'react'
import { sectionHref } from '../app/router'
import type { Module, QuestionBucket, StudyChapter } from '../data/types'
import { InlineText } from '../components/InlineText'
import { OfficialSources } from '../components/OfficialSources'
import { PRECISION_SECTION, questionIdsForSection } from '../lib/guide-links'
import { PrecisionFactsView, StudySectionView } from '../components/StudySection'
import { bucketLabels } from '../app/labels'
import { hasSectionVisual } from '../components/visuals/index-ids'
import { precisionFacts, studyGuide as studyContent } from '../data/guide'
import { modulesWithQuestions, questionsByModule } from '../data/questions'
import { studyGuides } from '../data/study-guides'
import { type ProgressState, moduleCompletion } from '../lib/progress'
import { safeSetItem } from '../lib/safe-storage'

export function ModuleView({ module, progress, onOpenModule, onOpenSection, onPracticeSection, onQuick, onFull, onPractice }: { module: Module; progress: ProgressState; onOpenModule: (moduleId: string) => void; onOpenSection: (sectionId: string) => void; onPracticeSection: (moduleId: string, sectionId: string) => void; onQuick: () => void; onFull: () => void; onPractice: () => void }) {
  const questions = questionsByModule[module.id]
  const completion = moduleCompletion(progress, module.questionIds)
  const translatedGuide = studyGuides[module.id] ?? [`${module.summary} En esta lectura, el objetivo es entender el lugar de este apartado dentro de la plataforma y poder explicarlo con vocabulario técnico preciso.`, `La documentación oficial se ha convertido aquí en una guía de estudio en español: conserva nombres de producto, aplicaciones, entidades y sintaxis en inglés, y traduce el criterio operativo que debes aplicar.`, `La práctica se concentra en ${module.focus}. Contrasta siempre la explicación con los enlaces oficiales del panel de documentación y con la variante de producto que estés utilizando.`]
  const chapter = studyContent[module.id]
  return <div className="page-stack module-page"><section className="module-hero"><div><p className="eyebrow">{module.eyebrow}</p><h1>{module.title}</h1><p className="module-summary">{module.summary}</p><div className="module-focus"><span>FOCO</span>{module.focus}</div></div><div className="module-score"><span>PROGRESO</span><strong>{completion}%</strong><div className="ring-bar"><span style={{ width: `${completion}%` }} /></div><small>{module.questionIds.filter((id) => (progress.attempts[id] ?? []).length > 0).length}/{questions.length} intentadas</small></div></section>
    <section className="module-actions">{questions.length > 0 && <><button className="button-primary" onClick={onQuick}>Quiz rápido <span>{Math.min(8, questions.length)}</span> <b>→</b></button><button className="button-outline" onClick={onFull}>Banco completo <span>{questions.length}</span> <b>→</b></button></>}<button className="button-outline" onClick={onPractice}>Abrir prácticas <b>↗</b></button></section>
    <section className="translation-panel"><div className="panel-heading"><div><p className="eyebrow">RESUMEN DE ORIENTACIÓN</p><h2>Antes de estudiar en profundidad</h2></div><span className="panel-count">{chapter?.sections.length ?? 0} bloques · {module.sources.length} fuentes</span></div><div className="translation-copy">{translatedGuide.map((paragraph) => <p key={paragraph}><InlineText text={paragraph} /></p>)}</div><p className="translation-callout">La lección completa de abajo contiene la explicación interna en español, tablas, ejemplos, límites, checklist y enlaces oficiales por bloque. Puedes estudiar el apartado sin salir de la aplicación y usar las fuentes como verificación viva.</p></section>
    {chapter && <StudyChapterView key={module.id} moduleId={module.id} chapter={chapter} onOpenSection={onOpenSection} onPracticeSection={(sectionId) => onPracticeSection(module.id, sectionId)} />}
    <div className="module-detail-grid"><section className="content-panel"><div className="panel-heading"><div><p className="eyebrow">OBJETIVOS DE APRENDIZAJE</p><h2>Al terminar este módulo podrás…</h2></div><span className="panel-count">{module.objectives.length} objetivos</span></div><ol className="objective-list">{module.objectives.map((objective, index) => <li key={objective}><span>{String(index + 1).padStart(2, '0')}</span><p>{objective}</p></li>)}</ol><div className="terms-row"><span className="eyebrow">TÉRMINOS CLAVE</span><div>{module.keyTerms.map((term) => <span key={term} className="term-chip">{term}</span>)}</div></div></section><OfficialSources sources={module.sources} /></div>
    <section className="question-bank-panel"><div className="panel-heading"><div><p className="eyebrow">BANCO AVANZADO</p><h2>Qué vas a practicar</h2></div><span className="panel-count">{questions.length} preguntas</span></div><div className="bucket-grid">{(['knowledge', 'precision', 'scenario', 'troubleshooting', 'practical'] as QuestionBucket[]).map((bucket) => <div className="bucket-cell" key={bucket}><span>{bucketLabels[bucket]}</span><strong>{questions.filter((question) => question.bucket === bucket).length}</strong><small>{bucket === 'precision' ? 'distractores cercanos' : bucket === 'scenario' ? 'decisiones operativas' : bucket === 'troubleshooting' ? 'límites y diagnóstico' : bucket === 'practical' ? 'interpretación' : 'base conceptual'}</small></div>)}</div></section>
    <ModulePager current={module} onOpenModule={onOpenModule} />
  </div>
}

function ModulePager({ current, onOpenModule }: { current: Module; onOpenModule: (moduleId: string) => void }) {
  const ordered = [...modulesWithQuestions].sort((a, b) => a.order - b.order)
  const index = ordered.findIndex((module) => module.id === current.id)
  const previous = index > 0 ? ordered[index - 1] : undefined
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined
  return <nav className="module-pager" aria-label="Navegación entre bloques">
    {previous ? <button type="button" className="pager-link pager-prev" onClick={() => onOpenModule(previous.id)}><span className="pager-arrow">←</span><span><small>Bloque anterior · {String(previous.order).padStart(2, '0')}</small><strong>{previous.title}</strong></span></button> : <span className="pager-spacer" />}
    <button type="button" className="pager-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Volver arriba</button>
    {next ? <button type="button" className="pager-link pager-next" onClick={() => onOpenModule(next.id)}><span><small>Siguiente bloque · {String(next.order).padStart(2, '0')}</small><strong>{next.title}</strong></span><span className="pager-arrow">→</span></button> : <span className="pager-end">Has llegado al último bloque. Prueba el simulacro de 60 preguntas.</span>}
  </nav>
}

function StudyChapterView({ moduleId, chapter, onOpenSection, onPracticeSection }: { moduleId: string; chapter: StudyChapter; onOpenSection: (sectionId: string) => void; onPracticeSection: (sectionId: string) => void }) {
  // El índice navega a la ruta del apartado (#/<bloque>/guia/<id>); la app se encarga del desplazamiento.
  const openSection = (sectionId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onOpenSection(sectionId)
  }
  const storageKey = `dynatrace-associate-mastery-${moduleId}`
  const [checked, setChecked] = useState<boolean[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) ?? '[]') as boolean[]
    } catch {
      return []
    }
  })
  const toggleMastery = (index: number) => {
    const next = chapter.masteryChecklist.map((_, itemIndex) => itemIndex === index ? !checked[itemIndex] : Boolean(checked[itemIndex]))
    setChecked(next)
    safeSetItem(storageKey, JSON.stringify(next))
  }
  const sourceCount = chapter.sections.reduce((total, section) => total + (section.sourceRefs?.length ?? 0), 0)
  return <section className="study-chapter"><div className="study-chapter-header"><div><p className="eyebrow">LECCIÓN COMPLETA · ESTUDIO SIN SALIR DE LA APP</p><h2>Contenido de estudio</h2><p>{chapter.introduction}</p><div className="chapter-stats"><span><strong>{chapter.sections.length}</strong> bloques internos</span><span><strong>{sourceCount}</strong> enlaces por bloque</span><span><strong>{chapter.masteryChecklist.length}</strong> criterios de dominio</span></div></div><div className="chapter-outcomes"><span className="eyebrow">AL TERMINAR</span>{chapter.outcomes.map((outcome) => <span key={outcome}>✓ {outcome}</span>)}</div></div><nav className="chapter-index" aria-label="Índice de la lección">{chapter.sections.map((section) => <a href={sectionHref(moduleId, section.id)} onClick={openSection(section.id)} key={section.id} className={hasSectionVisual(moduleId, section.id) ? 'has-visual' : undefined} title={hasSectionVisual(moduleId, section.id) ? 'Incluye ilustración o animación' : undefined}><InlineText text={section.title} /></a>)}<a href={sectionHref(moduleId, PRECISION_SECTION)} onClick={openSection(PRECISION_SECTION)}>Hechos de precisión</a></nav><div className="study-sections">{chapter.sections.map((section) => <StudySectionView section={section} moduleId={moduleId} key={section.id} practiceCount={questionIdsForSection(moduleId, section.id).length} onPractice={() => onPracticeSection(section.id)} />)}</div>{precisionFacts[moduleId] && <PrecisionFactsView factSheet={precisionFacts[moduleId]} practiceCount={questionIdsForSection(moduleId, PRECISION_SECTION).length} onPractice={() => onPracticeSection(PRECISION_SECTION)} />}<div className="mastery-box"><div><p className="eyebrow">CHECKLIST DE DOMINIO</p><h3>Antes de pasar de módulo</h3><small>{checked.filter(Boolean).length}/{chapter.masteryChecklist.length} criterios confirmados</small></div><div className="mastery-list">{chapter.masteryChecklist.map((item, index) => <label key={item}><input type="checkbox" checked={Boolean(checked[index])} onChange={() => toggleMastery(index)} /> <span>{item}</span></label>)}</div></div></section>
}
