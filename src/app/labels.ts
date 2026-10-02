import type { QuestionBucket } from '../data/types'
import type { View } from './types'

export const bucketLabels: Record<QuestionBucket, string> = {
  knowledge: 'Conocimiento',
  precision: 'Precisión',
  scenario: 'Escenario',
  troubleshooting: 'Troubleshooting',
  practical: 'Mini-práctica',
}

export const difficultyLabels = { basic: 'Básica', intermediate: 'Intermedia', advanced: 'Avanzada' }

export const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'home', label: 'Inicio', icon: '⌂' },
  { id: 'map', label: 'Mapa de estudio', icon: '◈' },
  { id: 'review', label: 'Repaso adaptativo', icon: '↻' },
  { id: 'custom', label: 'Quiz a medida', icon: '⚙' },
  { id: 'practice', label: 'Prácticas', icon: '⌁' },
  { id: 'mock', label: 'Simulacro', icon: '◷' },
  { id: 'errors', label: 'Errores', icon: '!' },
  { id: 'glossary', label: 'Glosario', icon: 'Aa' },
  { id: 'search', label: 'Buscar', icon: '⌕' },
  { id: 'stats', label: 'Estadísticas', icon: '▤' },
]

export const sourceKindLabel = (kind: string) => (kind === 'official-training' ? 'Training oficial' : kind === 'support' ? 'Support oficial' : 'Documentación oficial')
