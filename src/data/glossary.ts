import { modulesWithQuestions } from './question-catalog'

export type GlossaryEntry = {
  term: string
  definition: string
  moduleId: string
}

const definitions: Record<string, string> = {
  Grail: 'Almacén de datos de Dynatrace orientado a consultas y análisis.',
  OneAgent: 'Agente de monitorización que observa tecnologías compatibles desde el entorno monitorizado.',
  ActiveGate: 'Componente que proporciona conectividad, funciones de monitorización remota y extensibilidad según el caso.',
  Smartscape: 'Vista de topología y relaciones entre entidades monitorizadas.',
  DQL: 'Dynatrace Query Language para explorar y analizar datos en Grail.',
  'Business Event': 'Evento de negocio que representa una acción o hecho relevante para el análisis empresarial.',
  RUM: 'Real User Monitoring: observación de la experiencia de usuarios reales.',
  'Synthetic Monitoring': 'Monitorización de recorridos o endpoints mediante pruebas controladas.',
  'Business Analytics': 'Capacidades para analizar eventos y datos de negocio dentro del contexto observable.',
  'Process Group': 'Agrupación lógica de procesos relacionados que ayuda a modelar una aplicación o componente.',
  'Process Group Instance': 'Instancia concreta de un process group en ejecución.',
  Workflow: 'Flujo automatizado de trigger, acciones y resultados dentro de AutomationEngine.',
  OpenPipeline: 'Capacidad para enrutar y procesar datos durante su ingestión.',
  'Dynatrace Hub': 'Catálogo de aplicaciones, extensiones e integraciones.',
}

export const glossary: GlossaryEntry[] = modulesWithQuestions.flatMap((module) =>
  module.keyTerms.map((term) => ({
    term,
    definition: definitions[term] ?? `Concepto trabajado en el módulo ${module.title}; consulta sus fuentes oficiales para ver el alcance vigente.`,
    moduleId: module.id,
  })),
)
