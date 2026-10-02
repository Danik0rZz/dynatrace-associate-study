import { InlineText } from './InlineText'
import { hasSectionVisual } from './visuals/index-ids'
import { LazySectionVisual } from './visuals/LazySectionVisual'
import type { PrecisionFact, PrecisionFactSheet, StudySection } from '../data/types'

type PracticeProps = { practiceCount?: number; onPractice?: () => void }

function PracticeButton({ practiceCount, onPractice }: PracticeProps) {
  if (!onPractice || !practiceCount) return null
  return <button type="button" className="section-practice" onClick={onPractice}><span>Practicar este apartado</span><b>{practiceCount} {practiceCount === 1 ? 'pregunta' : 'preguntas'} →</b></button>
}

export function StudySectionView({ section, moduleId, practiceCount, onPractice, headingLevel = 'h3', anchor = true }: { section: StudySection; moduleId: string; headingLevel?: 'h2' | 'h3'; anchor?: boolean } & PracticeProps) {
  const Heading = headingLevel
  return <article className="study-section" id={anchor ? section.id : undefined}>
    <div className="study-section-heading"><span className="section-marker">{section.title.split('.')[0]}</span><div><Heading><InlineText text={section.title.replace(/^\d+\.\s*/, '')} /></Heading><p><InlineText text={section.lead} /></p></div></div>
    <div className="study-prose">{section.paragraphs.map((paragraph) => <p key={paragraph}><InlineText text={paragraph} /></p>)}</div>
    {hasSectionVisual(moduleId, section.id) && <LazySectionVisual moduleId={moduleId} sectionId={section.id} />}
    {section.bullets && <ul className="study-bullets">{section.bullets.map((bullet) => <li key={bullet}><InlineText text={bullet} /></li>)}</ul>}
    {section.comparison && <div className="study-table-wrap"><table><thead><tr>{section.comparison.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.comparison.rows.map((row) => <tr key={row.join('-')}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}><InlineText text={cell} /></td>)}</tr>)}</tbody></table></div>}
    {section.code && <div className="study-code"><pre><code>{section.code}</code></pre>{section.codeNote && <small><InlineText text={section.codeNote} /></small>}</div>}
    {section.warning && <div className="study-warning"><InlineText text={section.warning} /></div>}
    {section.sourceRefs?.length ? <div className="study-section-sources"><span className="eyebrow">FUENTES OFICIALES DE ESTE BLOQUE</span><div>{section.sourceRefs.map((source) => <a className="study-section-source-link" href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.title}</span><b>↗</b></a>)}</div></div> : null}
    <PracticeButton practiceCount={practiceCount} onPractice={onPractice} />
  </article>
}

export function PrecisionFactsView({ factSheet, rows, practiceCount, onPractice, anchor = true }: { factSheet: PrecisionFactSheet; rows?: PrecisionFact[]; anchor?: boolean } & PracticeProps) {
  const visibleRows = rows ?? factSheet.rows
  return <section className="precision-facts" id={anchor ? 'precision-facts' : undefined}>
    <div className="precision-facts-heading"><div><p className="eyebrow">DATOS DE ALTA PRECISIÓN · MEMORIZA Y CONTRASTA</p><h3>{factSheet.title}</h3><p>{factSheet.intro}</p></div><span>{visibleRows.length} {visibleRows.length === 1 ? 'hecho' : 'hechos'}</span></div>
    <div className="precision-facts-table-wrap"><table className="precision-facts-table"><thead><tr><th>Área</th><th>Qué debes saber</th><th>Matiz que decide la respuesta</th><th>Fuente</th></tr></thead><tbody>{visibleRows.map((row) => <tr key={row.topic}><th scope="row">{row.topic}</th><td><InlineText text={row.fact} /></td><td><InlineText text={row.examNote} /></td><td><a href={row.source.url} target="_blank" rel="noreferrer">{row.source.title} ↗</a></td></tr>)}</tbody></table></div>
    <p className="precision-facts-note">Estas cifras y comportamientos están fechados en el banco. Si el examen o tu tenant indica otra variante, manda la variante oficial vigente.</p>
    <PracticeButton practiceCount={practiceCount} onPractice={onPractice} />
  </section>
}
