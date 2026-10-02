import type { ReactElement } from 'react'

export type VisualRenderProps = {
  /** Paso actual (0..steps.length-1) cuando el visual es secuencial; 0 en otro caso. */
  step: number
}

export type VisualSpec = {
  /** animation: movimiento continuo o por pasos, con controles; illustration: figura estática. */
  kind: 'animation' | 'illustration'
  title: string
  /** Explicación breve que acompaña a la figura: qué debe mirar el estudiante. */
  caption: string
  /** Si existe, la animación avanza por estos pasos y muestra su texto bajo la figura. */
  steps?: string[]
  /** Milisegundos por paso (por defecto 2600). */
  stepMs?: number
  render: (props: VisualRenderProps) => ReactElement
}

export type VisualRegistry = Record<string, VisualSpec>
