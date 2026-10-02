export type QuestionBucket = 'knowledge' | 'precision' | 'scenario' | 'troubleshooting' | 'practical'
export type Difficulty = 'basic' | 'intermediate' | 'advanced'
export type CognitiveLevel = 'remember' | 'understand' | 'apply' | 'analyze'
export type QuestionStimulus =
  | { kind: 'code'; title: string; content: string }
  | { kind: 'table'; title: string; columns: string[]; rows: string[][] }
  | { kind: 'case'; title: string; content: string }

export type SourceRef = {
  title: string
  url: string
  kind: 'official-docs' | 'official-training' | 'support'
}

export type ModuleBlueprint = {
  id: string
  order: number
  title: string
  eyebrow: string
  summary: string
  objectives: string[]
  keyTerms: string[]
  sources: SourceRef[]
  focus: string
}

export type Question = {
  id: string
  moduleId: string
  objectiveId: string
  bucket: QuestionBucket
  cognitiveLevel: CognitiveLevel
  difficulty: Difficulty
  promptEs: string
  stimulus?: QuestionStimulus
  type: 'single' | 'multiple'
  options: { id: string; text: string }[]
  correctOptionIds: string[]
  explanationEs: string
  sourceRefs: SourceRef[]
  classicOrLatest: 'latest' | 'classic' | 'both' | 'mixed'
  versionNote?: string
  lastVerified: string
  form: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'W' | 'I' | 'G' | 'R'
  /** Respaldo en la guía: apartado del mismo bloque (o 'precision-facts') y frase literal que contiene el dato decisivo. */
  guide: GuideEvidence
}

export type GuideEvidence = {
  /** Id del apartado de la guía del bloque, o 'precision-facts' para la ficha de hechos de precisión. */
  section: string
  /** Fragmento literal (≥ 25 caracteres) del apartado que basta para elegir la respuesta. */
  evidence: string
}

export type Module = ModuleBlueprint & {
  questionIds: string[]
}

export type Attempt = {
  questionId: string
  selectedOptionIds: string[]
  score: number
  correct: boolean
  confidence: 1 | 2 | 3 | 4 | 5
  timestamp: string
}

/* ——— Guía de estudio ——— */

export type StudyComparison = {
  headers: string[]
  rows: string[][]
}

export type StudySection = {
  id: string
  /** Título sin número: la numeración se calcula por el orden del apartado. */
  title: string
  lead: string
  paragraphs: string[]
  bullets?: string[]
  comparison?: StudyComparison
  code?: string
  codeNote?: string
  warning?: string
  sourceRefs?: SourceRef[]
}

export type StudyChapter = {
  introduction: string
  outcomes: string[]
  sections: StudySection[]
  masteryChecklist: string[]
}

/* ——— Ficha de hechos de precisión ——— */

export type FactSource = {
  title: string
  url: string
  kind?: SourceRef['kind']
}

export type PrecisionFact = {
  topic: string
  fact: string
  examNote: string
  source: FactSource
}

export type PrecisionFactSheet = {
  title: string
  intro: string
  rows: PrecisionFact[]
}

/** Contenido completo de un bloque. */
export type Block = {
  guide: StudyChapter
  precision: PrecisionFactSheet
  questions: Question[]
}
