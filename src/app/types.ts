/** Pantallas de la app. */
export type View = 'home' | 'map' | 'module' | 'quiz' | 'review' | 'practice' | 'mock' | 'errors' | 'glossary'

/** Tipos de sesión de preguntas. */
export type QuizMode = 'quick' | 'full' | 'review' | 'mock' | 'section'

export type Confidence = 1 | 2 | 3 | 4 | 5

export type Session = {
  mode: QuizMode
  title: string
  questionIds: string[]
  optionOrderByQuestionId: Record<string, string[]>
  moduleId?: string
  sectionId?: string
}

/** Duración del simulacro: 60 preguntas a 1 minuto por pregunta. */
export const MOCK_DURATION_SECONDS = 60 * 60
