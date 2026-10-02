import type { SourceRef } from './types'

export type PracticeTask = {
  id: string
  moduleId: string
  title: string
  prompt: string
  checklist: string[]
  deliverable: string
  timebox: string
  sourceRefs: SourceRef[]
}

const docs = (title: string, url: string): SourceRef => ({ title, url, kind: 'official-docs' })

export const practices: PracticeTask[] = [
  {
    id: 'practice-platform-map',
    moduleId: 'platform',
    title: 'Orientación de plataforma',
    prompt: 'Explica a otra persona dónde buscarías una capacidad, una integración y ayuda técnica dentro del ecosistema Dynatrace.',
    checklist: ['Distingue plataforma y producto.', 'Incluye Dynatrace Hub.', 'Incluye documentación y soporte.', 'Indica qué dato confirmarías antes de actuar.'],
    deliverable: 'Un mapa de navegación de cinco pasos.',
    timebox: '15 min',
    sourceRefs: [docs('What is Dynatrace?', 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace'), docs('Dynatrace Hub', 'https://www.dynatrace.com/hub/')],
  },
  {
    id: 'practice-observability-triage',
    moduleId: 'observability',
    title: 'Triage de una aplicación',
    prompt: 'Construye un recorrido desde una aplicación lenta hasta la infraestructura y la dependencia que podría explicar el impacto.',
    checklist: ['Parte de un problema.', 'Usa entidades y relaciones.', 'Separa evidencia de hipótesis.', 'Indica dónde interviene OneAgent o ActiveGate.'],
    deliverable: 'Un árbol de diagnóstico con una evidencia por salto.',
    timebox: '20 min',
    sourceRefs: [docs('OneAgent', 'https://docs.dynatrace.com/docs/shortlink/oneagent'), docs('Smartscape topology', 'https://docs.dynatrace.com/docs/shortlink/smartscape')],
  },
  {
    id: 'practice-notebook-dashboard',
    moduleId: 'notebooks',
    title: 'Elegir la herramienta de análisis',
    prompt: 'Dado un análisis exploratorio y un informe recurrente, decide qué construirías con un Notebook y qué con un Dashboard.',
    checklist: ['Formula la pregunta.', 'Elige herramienta por audiencia y repetición.', 'Incluye una consulta o visualización.', 'Documenta límites y siguiente acción.'],
    deliverable: 'Una comparación de dos vistas y su público objetivo.',
    timebox: '20 min',
    sourceRefs: [docs('Notebooks', 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks'), docs('Dashboards', 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new')],
  },
  {
    id: 'practice-dem-journey',
    moduleId: 'business-dem',
    title: 'Separar una jornada digital',
    prompt: 'Clasifica señales de usuario real, monitorización sintética y eventos de negocio para una jornada de compra.',
    checklist: ['Define usuario real.', 'Define prueba sintética.', 'Define evento de negocio.', 'Explica qué pregunta responde cada una.'],
    deliverable: 'Una tabla señal → propósito → fuente de evidencia.',
    timebox: '20 min',
    sourceRefs: [docs('Real user and Synthetic Monitoring', 'https://docs.dynatrace.com/docs/license/capabilities/real-user-synthetic-monitoring'), docs('Business Analytics', 'https://docs.dynatrace.com/docs/observe/business-analytics')],
  },
  {
    id: 'practice-analysis-brief',
    moduleId: 'data-analysis',
    title: 'Informe basado en evidencia',
    prompt: 'Convierte una señal de rendimiento en una conclusión reproducible: contexto, métrica, segmento, impacto y siguiente acción.',
    checklist: ['Fija timeframe.', 'Identifica dimensiones.', 'Distingue correlación de causa.', 'Incluye una limitación.'],
    deliverable: 'Un informe de una página con fuentes de datos.',
    timebox: '25 min',
    sourceRefs: [docs('Data Explorer', 'https://docs.dynatrace.com/docs/analyze-explore-automate/explorer'), docs('Metrics powered by Grail', 'https://docs.dynatrace.com/docs/license/capabilities/metrics')],
  },
  {
    id: 'practice-dql-investigation',
    moduleId: 'dql',
    title: 'Consulta DQL explicada',
    prompt: 'Escribe y explica una consulta que acote datos, seleccione campos, agregue resultados y ordene la salida.',
    checklist: ['Empieza con fetch.', 'Filtra pronto.', 'Selecciona campos útiles.', 'Usa summarize o timeseries según la pregunta.', 'Comprueba tipos y volumen.'],
    deliverable: 'Una consulta DQL comentada y su interpretación.',
    timebox: '30 min',
    sourceRefs: [docs('Dynatrace Query Language', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language'), docs('DQL reference', 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference')],
  },
  {
    id: 'practice-security-triage',
    moduleId: 'security',
    title: 'Priorización de vulnerabilidad',
    prompt: 'Prioriza una vulnerabilidad teniendo en cuenta exposición, contexto de ejecución, evidencia y remediación.',
    checklist: ['Distingue vulnerabilidad y problema operativo.', 'Separa código propio y tercero.', 'Comprueba contexto.', 'Define una remediación verificable.'],
    deliverable: 'Una ficha de riesgo con decisión y evidencia.',
    timebox: '25 min',
    sourceRefs: [docs('Application Security', 'https://docs.dynatrace.com/docs/secure/application-security'), docs('Investigations', 'https://docs.dynatrace.com/docs/secure/investigations')],
  },
  {
    id: 'practice-workflow-design',
    moduleId: 'automation',
    title: 'Workflow con permisos',
    prompt: 'Diseña un workflow que reaccione a una señal, consulte contexto y ejecute una acción controlada.',
    checklist: ['Elige trigger.', 'Define actor y permisos.', 'Limita alcance.', 'Incluye manejo de error.', 'Registra el resultado.'],
    deliverable: 'Un diagrama trigger → acciones → resultado.',
    timebox: '30 min',
    sourceRefs: [docs('AutomationEngine', 'https://docs.dynatrace.com/docs/platform/automationengine'), docs('Workflows', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows')],
  },
  {
    id: 'practice-ingestion-path',
    moduleId: 'ingestion',
    title: 'Ruta de ingestión',
    prompt: 'Diagnostica por qué un log o una métrica no aparece: origen, transporte, procesamiento, persistencia, permisos y consulta.',
    checklist: ['Identifica tipo de señal.', 'Elige canal de ingestión.', 'Comprueba OpenPipeline o reglas.', 'Valida con una consulta mínima.', 'Considera coste y retención.'],
    deliverable: 'Un runbook de datos ausentes.',
    timebox: '30 min',
    sourceRefs: [docs('Log ingestion', 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion'), docs('OpenPipeline', 'https://docs.dynatrace.com/docs/platform/openpipeline')],
  },
  {
    id: 'practice-smartscape-logs',
    moduleId: 'other',
    title: 'Entidad y log en contexto',
    prompt: 'Relaciona un log con su entidad y usa la topología para explicar el impacto técnico.',
    checklist: ['Identifica entidad.', 'Localiza relación topológica.', 'Filtra y parsea el log.', 'Conserva timeframe y evidencia.'],
    deliverable: 'Un recorrido entidad → log → dependencia → impacto.',
    timebox: '20 min',
    sourceRefs: [docs('Smartscape topology', 'https://docs.dynatrace.com/docs/shortlink/smartscape'), docs('Log Content Analysis', 'https://docs.dynatrace.com/docs/shortlink/lma-analysis')],
  },
]
