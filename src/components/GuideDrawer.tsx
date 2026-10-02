import { useEffect, useRef } from 'react'
import { InlineText } from './InlineText'
import { PrecisionFactsView, StudySectionView } from './StudySection'
import { precisionFacts } from '../data/guide'
import { modules } from '../data/modules'
import { PRECISION_SECTION, precisionRowsFor, sectionFor, type GuideRef } from '../lib/guide-links'

/**
 * Panel lateral con el apartado de la guía que respalda una pregunta.
 * Se abre encima de la sesión, así que consultar la guía no interrumpe el quiz.
 */
export function GuideDrawer({ guide, inSession, onClose, onOpenInGuide }: { guide: GuideRef; inSession: boolean; onClose: () => void; onOpenInGuide: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose })

  // Al abrir: foco en «Cerrar». Esc cierra, Tab no sale del panel y al cerrar el foco vuelve a donde estaba.
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onCloseRef.current(); return }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [])

  const module = modules.find((item) => item.id === guide.moduleId)
  const section = guide.sectionId === PRECISION_SECTION ? undefined : sectionFor(guide.moduleId, guide.sectionId)
  const sheet = guide.sectionId === PRECISION_SECTION ? precisionFacts[guide.moduleId] : undefined

  return <div className="guide-drawer-layer" role="presentation" onClick={onClose}>
    <aside ref={panelRef} className="guide-drawer" role="dialog" aria-modal="true" aria-label={`Guía de estudio: ${guide.title}`} onClick={(event) => event.stopPropagation()}>
      <header className="guide-drawer-header">
        <div><p className="eyebrow">GUÍA DE ESTUDIO · {module ? `${String(module.order).padStart(2, '0')} ${module.title}` : guide.moduleId}</p><h2><InlineText text={guide.title} /></h2></div>
        <button ref={closeRef} type="button" className="guide-drawer-close" onClick={onClose} aria-label="Cerrar la guía">×</button>
      </header>
      <div className="guide-drawer-body">
        <div className="guide-evidence"><span className="eyebrow">LA CLAVE EN LA GUÍA</span><p>«<InlineText text={guide.evidence} />»</p></div>
        {section && <StudySectionView section={section} moduleId={guide.moduleId} headingLevel="h3" anchor={false} />}
        {sheet && <PrecisionFactsView factSheet={sheet} rows={precisionRowsFor(guide.moduleId, guide.evidence)} anchor={false} />}
        {!section && !sheet && <p className="empty-state">No se ha encontrado este apartado en la guía.</p>}
      </div>
      <footer className="guide-drawer-footer">
        <button type="button" className="button-outline" onClick={onOpenInGuide}>{inSession ? 'Abrir en el bloque (termina la sesión)' : 'Abrir en el bloque'} <b>↗</b></button>
        <button type="button" className="button-primary" onClick={onClose}>{inSession ? 'Volver a la pregunta' : 'Cerrar'}</button>
      </footer>
    </aside>
  </div>
}
