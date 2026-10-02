import { useEffect, useRef, useSyncExternalStore } from 'react'
import { answerDialog, currentDialog, subscribeDialogs, type DialogRequest } from '../lib/dialogs'

/** Pinta el diálogo pendiente, si lo hay. Se monta una vez, fuera del contenido que queda inerte. */
export function DialogHost() {
  const request = useSyncExternalStore(subscribeDialogs, currentDialog, () => null)
  return request ? <Dialog key={request.id} request={request} /> : null
}

/**
 * Diálogo modal accesible (mismo patrón que el panel de la guía): role="alertdialog", foco inicial en el botón
 * seguro (Cancelar en las confirmaciones), Tab atrapado, Esc cancela y al cerrar el foco vuelve a donde estaba.
 */
function Dialog({ request }: { request: DialogRequest }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const safeRef = useRef<HTMLButtonElement>(null)
  const titleId = `dialog-title-${request.id}`
  const messageId = `dialog-message-${request.id}`
  const confirm = request.kind === 'confirm'

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const panel = panelRef.current
    safeRef.current?.focus()
    // En captura sobre window: el diálogo gestiona Esc y Tab antes que el resto de la app (panel de la guía, atajos…).
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        answerDialog(request.id, false)
        return
      }
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = [...panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const inside = panelRef.current.contains(document.activeElement)
        if (event.shiftKey && (document.activeElement === first || !inside)) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && (document.activeElement === last || !inside)) { event.preventDefault(); first.focus() }
        event.stopPropagation()
        return
      }
      // El resto de teclas no llega a la app (los atajos del quiz quedan desactivados).
      if (!panelRef.current?.contains(event.target as Node)) event.stopPropagation()
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      // Solo si el foco se ha quedado sin dueño: si la acción aceptada ya lo ha movido (p. ej., al cambiar de vista), se respeta.
      const orphan = !document.activeElement || document.activeElement === document.body || panel?.contains(document.activeElement)
      if (orphan && previous?.isConnected) previous.focus()
    }
  }, [request.id])

  return <div className="dialog-layer" role="presentation">
    <div ref={panelRef} className="dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={messageId}>
      <h2 id={titleId}>{request.title}</h2>
      <p id={messageId}>{request.message}</p>
      <div className="dialog-actions">
        {confirm && <button ref={safeRef} type="button" className="button-outline" onClick={() => answerDialog(request.id, false)}>{request.cancelLabel ?? 'Cancelar'}</button>}
        <button ref={confirm ? undefined : safeRef} type="button" className="button-primary" onClick={() => answerDialog(request.id, true)}>{request.confirmLabel ?? 'Aceptar'}</button>
      </div>
    </div>
  </div>
}
