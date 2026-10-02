import { useEffect, useRef, type ReactNode, type RefObject } from 'react'
import { useModalFocus } from '../app/useModalFocus'

export const MOBILE_MENU_ID = 'mobile-menu'

/** Cabecera móvil (≤ 780 px): título de la vista y botón «Menú», que abre la barra lateral como panel. */
export function MobileHeader({ title, open, onOpen, buttonRef }: { title: string; open: boolean; onOpen: () => void; buttonRef: RefObject<HTMLButtonElement | null> }) {
  return <header className="mobile-header">
    <span className="brand-mark" aria-hidden="true">SL</span>
    <span className="mobile-header-title">{title}</span>
    <button ref={buttonRef} type="button" className="mobile-menu-button" aria-expanded={open} aria-controls={MOBILE_MENU_ID} aria-haspopup="dialog" onClick={onOpen}>
      <span aria-hidden="true">☰</span> Menú
    </button>
  </header>
}

/**
 * Panel lateral con la barra lateral de siempre (`children`), como diálogo modal: foco atrapado (useModalFocus, el
 * mismo patrón que el panel de la guía), Esc o un toque en el fondo lo cierran y el foco vuelve al botón «Menú».
 * Mientras está abierto, la página no hace scroll (el contenido queda inerte desde App).
 */
export function MobileMenu({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useModalFocus(panelRef, closeRef, onClose)

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = previous }
  }, [])

  return <div className="mobile-menu-layer" role="presentation" onClick={onClose}>
    <div ref={panelRef} id={MOBILE_MENU_ID} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú" onClick={(event) => event.stopPropagation()}>
      <button ref={closeRef} type="button" className="mobile-menu-close" aria-label="Cerrar el menú" onClick={onClose}>×</button>
      {children}
    </div>
  </div>
}
