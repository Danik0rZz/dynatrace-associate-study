import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'

/**
 * Foco de un panel modal (panel de la guía, menú móvil): al abrir, foco en `initialFocus`; Esc llama a `onClose`;
 * Tab y Shift+Tab no salen del panel; al cerrar, el foco vuelve al elemento que tenía el foco antes de abrir.
 * Los diálogos de confirmación (components/Dialog) escuchan en captura y paran el evento, así que si se abren encima
 * del panel, Esc y Tab son suyos.
 */
export function useModalFocus(panelRef: RefObject<HTMLElement | null>, initialFocus: RefObject<HTMLElement | null>, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose })

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    initialFocus.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onCloseRef.current(); return }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (previous?.isConnected) previous.focus()
    }
  }, [panelRef, initialFocus])
}
