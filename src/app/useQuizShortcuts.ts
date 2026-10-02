import { useEffect, useRef } from 'react'
import { isDialogOpen } from '../lib/dialogs'

/** Posición (0-8) de la opción para 1-9 o A-I; `null` para cualquier otra tecla. */
export const shortcutIndex = (key: string): number | null => {
  if (/^[1-9]$/.test(key)) return Number(key) - 1
  if (/^[a-i]$/i.test(key)) return key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)
  return null
}

/** Inputs en los que se escribe: ahí las letras y los números son texto, no atajos. Radio y checkbox no cuentan. */
const NON_TEXT_INPUTS = new Set(['radio', 'checkbox', 'button', 'submit', 'reset', 'range', 'color', 'file', 'image'])
const isTypingTarget = (element: HTMLElement): boolean =>
  (element instanceof HTMLInputElement && !NON_TEXT_INPUTS.has(element.type)) || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement || element.isContentEditable

export type QuizShortcutHandlers = {
  /** Elige o deselecciona la opción en esa posición visible. Devuelve si había algo que hacer. */
  choose: (index: number) => boolean
  /** Lo mismo que el botón principal (comprobar, siguiente…), solo si está habilitado. */
  enter: () => boolean
  /** Marcar la pregunta, si la vista lo permite. */
  flag?: () => void
}

/**
 * Atajos del quiz y del simulacro: 1-9 o A-I eligen opción, Enter = botón principal, M = marcar.
 * Se ignoran al escribir en un campo, dentro o con un diálogo abierto (también el panel de la guía) y con Ctrl, Alt o Meta.
 */
export function useQuizShortcuts(handlers: QuizShortcutHandlers) {
  const latest = useRef(handlers)
  useEffect(() => { latest.current = handlers })

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.altKey || event.metaKey) return
      if (isDialogOpen() || document.querySelector('[aria-modal="true"]')) return
      const target = event.target instanceof HTMLElement ? event.target : null
      if (target && (isTypingTarget(target) || target.closest('[role="dialog"], [role="alertdialog"]'))) return
      const current = latest.current
      if (event.key === 'Enter') {
        // Sobre un botón o un enlace, Enter ya los activa: no se ejecuta dos veces.
        if (target?.closest('button, a[href], summary, [role="button"]')) return
        if (current.enter()) event.preventDefault()
        return
      }
      if (event.key === 'm' || event.key === 'M') {
        if (current.flag) {
          event.preventDefault()
          current.flag()
        }
        return
      }
      const index = shortcutIndex(event.key)
      if (index !== null && current.choose(index)) event.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
