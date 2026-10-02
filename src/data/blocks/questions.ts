import type { Question } from '../types'
import { questions as welcome } from './welcome/questions'
import { questions as instructions } from './instructions/questions'
import { questions as platform } from './platform/questions'
import { questions as observability } from './observability/questions'
import { questions as notebooks } from './notebooks/questions'
import { questions as businessDem } from './business-dem/questions'
import { questions as dataAnalysis } from './data-analysis/questions'
import { questions as dql } from './dql/questions'
import { questions as security } from './security/questions'
import { questions as automation } from './automation/questions'
import { questions as ingestion } from './ingestion/questions'
import { questions as other } from './other/questions'

/**
 * Preguntas por bloque, SIN la guía: es lo que la app carga de forma síncrona. La guía y la ficha de precisión
 * se cargan por bloque (src/data/guide-loader.ts). Un bloque nuevo se añade aquí, en index.ts y en modules.ts.
 */
export const blockQuestions: Record<string, Question[]> = {
  welcome,
  instructions,
  platform,
  observability,
  notebooks,
  'business-dem': businessDem,
  'data-analysis': dataAnalysis,
  dql,
  security,
  automation,
  ingestion,
  other,
}
