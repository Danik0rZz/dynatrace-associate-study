import type { VisualRegistry, VisualSpec } from './types'
import { welcomeVisuals } from './welcome'
import { instructionsVisuals } from './instructions'
import { platformVisuals } from './platform'
import { observabilityVisuals } from './observability'
import { notebooksVisuals } from './notebooks'
import { businessVisuals } from './business'
import { dataVisuals } from './data'
import { dqlVisuals } from './dql'
import { securityVisuals } from './security'
import { automationVisuals } from './automation'
import { ingestionVisuals } from './ingestion'
import { otherVisuals } from './other'

/** Visuales por módulo y por id de apartado (StudySection.id). */
export const visualsByModule: Record<string, VisualRegistry> = {
  welcome: welcomeVisuals,
  instructions: instructionsVisuals,
  platform: platformVisuals,
  observability: observabilityVisuals,
  notebooks: notebooksVisuals,
  'business-dem': businessVisuals,
  'data-analysis': dataVisuals,
  dql: dqlVisuals,
  security: securityVisuals,
  automation: automationVisuals,
  ingestion: ingestionVisuals,
  other: otherVisuals,
}

export const getSectionVisual = (moduleId: string, sectionId: string): VisualSpec | undefined => visualsByModule[moduleId]?.[sectionId]
