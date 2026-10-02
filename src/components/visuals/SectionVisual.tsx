import { useEffect, useRef, useState } from 'react'
import type { VisualSpec } from './types'
import './visuals.css'

const prefersReducedMotion = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Marco común de las ilustraciones y animaciones de cada apartado.
 * - Pausa automáticamente cuando la figura sale de pantalla.
 * - Respeta prefers-reduced-motion (arranca en pausa).
 * - Las animaciones por pasos permiten saltar a un paso concreto.
 */
export function SectionVisual({ spec }: { spec: VisualSpec }) {
  const isAnimation = spec.kind === 'animation'
  const steps = spec.steps ?? []
  const stepMs = spec.stepMs ?? 2600
  const rootRef = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(() => isAnimation && !prefersReducedMotion())
  const [inView, setInView] = useState(false)
  const [step, setStep] = useState(0)
  const [nonce, setNonce] = useState(0)
  const active = isAnimation && playing && inView

  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Avance automático de pasos: el último paso se mantiene algo más antes de reiniciar.
  useEffect(() => {
    if (!active || steps.length < 2) return
    const isLast = step === steps.length - 1
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % steps.length), isLast ? stepMs * 1.6 : stepMs)
    return () => window.clearTimeout(timer)
  }, [active, step, steps.length, stepMs])

  // Pausa/reanuda las animaciones SMIL (animateMotion) además de las CSS.
  useEffect(() => {
    const svgs = rootRef.current?.querySelectorAll('svg') ?? []
    svgs.forEach((svg) => {
      if (typeof svg.pauseAnimations !== 'function') return
      if (active) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
  }, [active, nonce])

  const restart = () => {
    setStep(0)
    setNonce((value) => value + 1)
    setPlaying(true)
  }

  const goTo = (index: number) => {
    setStep(index)
    setPlaying(false)
  }

  return (
    <figure ref={rootRef} className={`sv ${isAnimation ? 'sv-animated' : 'sv-static'} ${active ? '' : 'sv-paused'}`}>
      <header className="sv-header">
        <div>
          <span className="sv-kind">{isAnimation ? '▶ Animación' : '◆ Ilustración'}</span>
          <strong>{spec.title}</strong>
        </div>
        {isAnimation && (
          <div className="sv-controls">
            <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pausar animación' : 'Reproducir animación'}>
              {playing ? '❚❚' : '▶'}
            </button>
            <button type="button" onClick={restart} aria-label="Reiniciar animación">↺</button>
          </div>
        )}
      </header>
      <div className="sv-stage" key={nonce}>
        {spec.render({ step: steps.length ? step : 0 })}
      </div>
      {steps.length > 0 && (
        <ol className="sv-steps" aria-label="Pasos de la animación">
          {steps.map((label, index) => (
            <li key={label} className={index === step ? 'active' : index < step ? 'done' : ''}>
              <button type="button" onClick={() => goTo(index)}>
                <span>{index + 1}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
      )}
      <figcaption>{spec.caption}</figcaption>
    </figure>
  )
}
