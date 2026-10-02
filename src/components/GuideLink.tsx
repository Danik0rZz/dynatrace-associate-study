import type { Question } from '../data/types'
import { InlineText } from './InlineText'
import { guideRefFor } from '../lib/guide-links'

export function GuideLink({ question, onOpenGuide }: { question: Question; onOpenGuide: () => void }) {
  const ref = guideRefFor(question)
  if (!ref) return null
  return <button type="button" className="guide-link" onClick={onOpenGuide}><span className="guide-link-icon" aria-hidden="true">❏</span><span><small>VER EN LA GUÍA</small><strong><InlineText text={ref.title} /></strong></span><b aria-hidden="true">→</b></button>
}
