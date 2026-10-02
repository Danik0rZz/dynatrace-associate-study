import type { Block } from '../types'
import { guide as welcomeGuide } from './welcome/guide'
import { precision as welcomePrecision } from './welcome/precision'
import { questions as welcomeQuestions } from './welcome/questions'
import { guide as instructionsGuide } from './instructions/guide'
import { precision as instructionsPrecision } from './instructions/precision'
import { questions as instructionsQuestions } from './instructions/questions'
import { guide as platformGuide } from './platform/guide'
import { precision as platformPrecision } from './platform/precision'
import { questions as platformQuestions } from './platform/questions'
import { guide as observabilityGuide } from './observability/guide'
import { precision as observabilityPrecision } from './observability/precision'
import { questions as observabilityQuestions } from './observability/questions'
import { guide as notebooksGuide } from './notebooks/guide'
import { precision as notebooksPrecision } from './notebooks/precision'
import { questions as notebooksQuestions } from './notebooks/questions'
import { guide as businessDemGuide } from './business-dem/guide'
import { precision as businessDemPrecision } from './business-dem/precision'
import { questions as businessDemQuestions } from './business-dem/questions'
import { guide as dataAnalysisGuide } from './data-analysis/guide'
import { precision as dataAnalysisPrecision } from './data-analysis/precision'
import { questions as dataAnalysisQuestions } from './data-analysis/questions'
import { guide as dqlGuide } from './dql/guide'
import { precision as dqlPrecision } from './dql/precision'
import { questions as dqlQuestions } from './dql/questions'
import { guide as securityGuide } from './security/guide'
import { precision as securityPrecision } from './security/precision'
import { questions as securityQuestions } from './security/questions'
import { guide as automationGuide } from './automation/guide'
import { precision as automationPrecision } from './automation/precision'
import { questions as automationQuestions } from './automation/questions'
import { guide as ingestionGuide } from './ingestion/guide'
import { precision as ingestionPrecision } from './ingestion/precision'
import { questions as ingestionQuestions } from './ingestion/questions'
import { guide as otherGuide } from './other/guide'
import { precision as otherPrecision } from './other/precision'
import { questions as otherQuestions } from './other/questions'

/** Contenido por bloque: guía, ficha de precisión y preguntas. Un bloque nuevo se añade aquí y en modules.ts. */
export const blocks: Record<string, Block> = {
  'welcome': { guide: welcomeGuide, precision: welcomePrecision, questions: welcomeQuestions },
  'instructions': { guide: instructionsGuide, precision: instructionsPrecision, questions: instructionsQuestions },
  'platform': { guide: platformGuide, precision: platformPrecision, questions: platformQuestions },
  'observability': { guide: observabilityGuide, precision: observabilityPrecision, questions: observabilityQuestions },
  'notebooks': { guide: notebooksGuide, precision: notebooksPrecision, questions: notebooksQuestions },
  'business-dem': { guide: businessDemGuide, precision: businessDemPrecision, questions: businessDemQuestions },
  'data-analysis': { guide: dataAnalysisGuide, precision: dataAnalysisPrecision, questions: dataAnalysisQuestions },
  'dql': { guide: dqlGuide, precision: dqlPrecision, questions: dqlQuestions },
  'security': { guide: securityGuide, precision: securityPrecision, questions: securityQuestions },
  'automation': { guide: automationGuide, precision: automationPrecision, questions: automationQuestions },
  'ingestion': { guide: ingestionGuide, precision: ingestionPrecision, questions: ingestionQuestions },
  'other': { guide: otherGuide, precision: otherPrecision, questions: otherQuestions },
}
