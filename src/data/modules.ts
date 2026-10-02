import type { ModuleBlueprint, SourceRef } from './types'
const docs = (title: string, url: string): SourceRef => ({ title, url, kind: 'official-docs' })
const training = (title: string, url: string): SourceRef => ({ title, url, kind: 'official-training' })
const support = (title: string, url: string): SourceRef => ({ title, url, kind: 'support' })

export const modules: ModuleBlueprint[] = [
  {
    id: 'welcome', order: 1, title: 'Welcome', eyebrow: '01 · Orientación',
    summary: 'Sitúa la certificación dentro del mapa de Dynatrace y convierte los objetivos en una ruta de estudio accionable.',
    focus: 'valor de la plataforma, navegación, análisis de problemas, Notebooks, Dashboards, automatización y DQL',
    objectives: ['Explicar qué valida la certificación Associate.', 'Relacionar observabilidad, seguridad, negocio y automatización.', 'Describir el flujo de investigar un problema de usuario a infraestructura.', 'Reconocer el papel de DQL como lenguaje de consulta de Grail.'],
    keyTerms: ['observability', 'security', 'automation', 'Smartscape', 'Problems', 'Notebooks', 'Dashboards', 'DQL'],
    sources: [training('Dynatrace Associate Certification Learning Plan', 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan'), docs('What is Dynatrace', 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace'), docs('Get started with Dynatrace', 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started')],
  },
  {
    id: 'instructions', order: 2, title: 'Instructions', eyebrow: '02 · Preparación',
    summary: 'Convierte prerrequisitos, reglas y recursos del examen en un checklist verificable.',
    focus: 'prerrequisitos, learning path, documentación, equipo, proctoring y preparación práctica',
    objectives: ['Comprobar la base técnica necesaria.', 'Distinguir preparación de certificación y práctica real.', 'Conocer el formato publicado y sus límites de actualidad.', 'Planificar documentación y tiempo antes del examen.'],
    keyTerms: ['prerequisites', 'learning path', 'proctored', 'open book', 'written questions', 'practical questions'],
    sources: [training('Dynatrace Associate Certification Learning Plan', 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan'), support('ProctorU Equipment Requirements', 'https://support.proctoru.com/hc/en-us/articles/24692181239309-Equipment-Requirements'), support('ProctorU Exam Day FAQs', 'https://support.proctoru.com/hc/en-us/articles/24721945091725-Frequently-Asked-Questions-About-Exam-Day')],
  },
  {
    id: 'platform', order: 3, title: 'The Dynatrace Platform', eyebrow: '03 · Plataforma',
    summary: 'Aprende a orientarte en la plataforma, sus capacidades y el recorrido que conecta datos, contexto y acción.',
    focus: 'UI, capacidades, documentación, Support Center, Hub, resiliencia y experiencia digital',
    objectives: ['Navegar la UI y localizar aplicaciones.', 'Explicar la relación entre observabilidad, seguridad, automatización y negocio.', 'Usar documentación, Hub y soporte como recursos.', 'Conectar resiliencia con experiencia digital.'],
    keyTerms: ['Launcher', 'Platform search', 'Grail', 'OneAgent', 'Smartscape', 'Dynatrace Intelligence', 'Hub', 'Support Center'],
    sources: [docs('What is Dynatrace', 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace'), docs('Navigate the Dynatrace platform', 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui'), docs('Platform search', 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/search'), docs('Dynatrace Hub', 'https://www.dynatrace.com/hub/')],
  },
  {
    id: 'observability', order: 4, title: 'Monitoring & Infrastructure Observability', eyebrow: '04 · Observabilidad',
    summary: 'Conecta OneAgent, aplicaciones, infraestructura y apps de monitorización para entender el sistema de extremo a extremo.',
    focus: 'telemetría, capacidades OneAgent, arquitectura, inyección, modos de monitorización, aplicaciones, bases de datos, Kubernetes, infraestructura y AI-powered insights',
    objectives: ['Enumerar las capacidades de OneAgent y sus condiciones de soporte.', 'Explicar cómo funciona OneAgent, su comunicación outbound y la inyección de módulos.', 'Comparar Full-Stack, Infrastructure y Discovery monitoring mode.', 'Activar y diagnosticar modos, auto-injection, logs, procesos y cobertura.', 'Navegar apps de Kubernetes, databases e infraestructura con contexto de entidad.', 'Relacionar telemetría, Smartscape, Problems y detección de anomalías.'],
    keyTerms: ['OneAgent', 'ActiveGate', 'Full-Stack Monitoring', 'Infrastructure Monitoring', 'Discovery Monitoring', 'auto-injection', 'code-module injection', 'deep monitoring', 'runtime metrics', 'host', 'process group', 'process group instance', 'service', 'Kubernetes', 'database'],
    sources: [docs('OneAgent monitoring capabilities', 'https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types'), docs('How OneAgent works', 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works'), docs('OneAgent monitoring modes', 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes'), docs('Enable OneAgent monitoring modes', 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes'), docs('OneAgent support matrix', 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix'), docs('Infrastructure Observability', 'https://docs.dynatrace.com/docs/shortlink/infra-mon'), docs('Kubernetes monitoring', 'https://www.dynatrace.com/technologies/kubernetes-monitoring/')],
  },
  {
    id: 'notebooks', order: 5, title: 'Notebooks & Dashboards', eyebrow: '05 · Análisis visual',
    summary: 'Aprende cuándo explorar en un Notebook y cuándo comunicar o monitorizar en un Dashboard.',
    focus: 'sections, DQL, Markdown, visualizaciones, variables, personalización, compartir y reporting',
    objectives: ['Crear un Notebook con narrativa y consultas.', 'Diseñar un Dashboard para seguimiento.', 'Elegir visualización y contexto según audiencia.', 'Distinguir exploración de monitorización continua.'],
    keyTerms: ['Notebook', 'Dashboard', 'section', 'Markdown', 'DQL tile', 'variable', 'annotation', 'sharing'],
    sources: [docs('Notebooks', 'https://docs.dynatrace.com/docs/shortlink/notebooks'), docs('Dashboard tiles and filters', 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new/components'), docs('Dashboards', 'https://docs.dynatrace.com/docs/shortlink/dashboards'), docs('Grail concepts', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail/concepts')],
  },
  {
    id: 'business-dem', order: 6, title: 'Business Analytics and DEM', eyebrow: '06 · Experiencia y negocio',
    summary: 'Relaciona señales de negocio con la experiencia real y sintética del usuario.',
    focus: 'Business Analytics, business events, DEM, RUM, Synthetic Monitoring y journeys',
    objectives: ['Diferenciar event types y user events.', 'Explicar RUM frente a Synthetic.', 'Relacionar experiencia con métricas de negocio.', 'Usar eventos y sesiones para analizar journeys.'],
    keyTerms: ['Business Analytics', 'business event', 'DEM', 'RUM', 'Synthetic Monitoring', 'user action', 'session', 'journey'],
    sources: [docs('Digital Experience', 'https://docs.dynatrace.com/docs/observe/digital-experience'), docs('RUM and Synthetic overview', 'https://docs.dynatrace.com/docs/license/capabilities/real-user-synthetic-monitoring'), docs('Basic concepts of Business Observability', 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts'), docs('Business event enrichment', 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment'), docs('RUM data model', 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model'), docs('User sessions in web frontends', 'https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web'), docs('Business Analytics', 'https://docs.dynatrace.com/docs/semantic-dictionary/model/business-analytics'), docs('Synthetic Monitoring', 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic')],
  },
  {
    id: 'data-analysis', order: 7, title: 'Data, Reporting & Analysis', eyebrow: '07 · Datos y reporting',
    summary: 'Aprende a convertir telemetría en análisis de rendimiento, comportamiento de usuario y reporting útil.',
    focus: 'AI-driven analytics, performance analysis, metrics, user behavior, session segmentation, APIs y reports',
    objectives: ['Interpretar métricas y tendencias.', 'Analizar comportamiento, sesiones y journeys.', 'Usar dashboards y APIs para comunicar resultados.', 'Distinguir exploración de datos y monitorización.'],
    keyTerms: ['metric', 'timeseries', 'Data Explorer', 'Dashboard report', 'user behavior', 'session segmentation', 'Performance analysis', 'Metrics API'],
    sources: [docs('Metrics powered by Grail', 'https://docs.dynatrace.com/docs/shortlink/metrics-grail'), docs('Data retention periods', 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods'), docs('FAQ for Metrics', 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq'), docs('Monitor key requests', 'https://docs.dynatrace.com/docs/observe/application-observability/services-classic/monitor-key-requests'), docs('Built-in metrics on Grail', 'https://docs.dynatrace.com/docs/shortlink/built-in-metrics-on-grail'), docs('User behavior analysis', 'https://docs.dynatrace.com/docs/shortlink/user-behavior'), docs('RUM user sessions', 'https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web'), docs('Performance analysis', 'https://docs.dynatrace.com/docs/shortlink/application-performance'), docs('Dashboard reports', 'https://docs.dynatrace.com/docs/shortlink/dashboard-reports')],
  },
  {
    id: 'dql', order: 8, title: 'DQL (Dynatrace Query Language)', eyebrow: '08 · Grail y consultas',
    summary: 'Construye criterio para leer y escribir consultas DQL que respondan preguntas reales sobre Grail.',
    focus: 'Grail, fetch, filter, fields, summarize, sort, limit, timeseries, parse y entidades',
    objectives: ['Explicar relación Grail–DQL.', 'Construir consultas lineales y legibles.', 'Distinguir eventos, logs, métricas y entidades.', 'Diagnosticar errores de filtro, agregación y contexto.'],
    keyTerms: ['Grail', 'DQL', 'fetch', 'filter', 'fields', 'summarize', 'sort', 'limit', 'timeseries', 'parse', 'lookup'],
    sources: [docs('Dynatrace Query Language', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language'), docs('Use DQL queries', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide'), docs('DQL commands', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands'), docs('DQL metric commands', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands'), docs('DQL data types', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types'), docs('DQL best practices', 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices')],
  },
  {
    id: 'security', order: 9, title: 'Security', eyebrow: '09 · Seguridad',
    summary: 'Distingue exposición, vulnerabilidades e investigaciones y aprende a priorizar acciones con evidencia.',
    focus: 'Application Security, third-party vulnerabilities, code-level vulnerabilities, Security Advisor e Investigations',
    objectives: ['Diferenciar vulnerabilidades de terceros y de código.', 'Interpretar riesgo, exposición y prioridad.', 'Usar Security Advisor e Investigations.', 'Relacionar seguridad, Grail, permisos y remediación.'],
    keyTerms: ['Application Security', 'Vulnerabilities', 'third-party vulnerability', 'code-level vulnerability', 'Security Advisor', 'Security Score', 'Investigations', 'Grail'],
    sources: [docs('Application Security', 'https://docs.dynatrace.com/docs/secure/application-security'), docs('Runtime Vulnerability Analytics', 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics'), docs('Vulnerability evaluation', 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation'), docs('Prioritize vulnerabilities', 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize'), docs('Vulnerabilities', 'https://docs.dynatrace.com/docs/secure/vulnerabilities'), docs('Investigations', 'https://docs.dynatrace.com/docs/secure/investigations'), docs('Davis Security Advisor API', 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice')],
  },
  {
    id: 'automation', order: 10, title: 'Automation', eyebrow: '10 · Acción',
    summary: 'Diseña workflows explicables que conviertan señales de observabilidad y seguridad en acciones controladas.',
    focus: 'AutomationEngine, Workflows, triggers, actions, actors, permisos, errores y quick start',
    objectives: ['Explicar AutomationEngine y Workflows.', 'Distinguir triggers, tasks y actions.', 'Comprender actor y autorización.', 'Diseñar automatización segura y observable.'],
    keyTerms: ['AutomationEngine', 'Workflow', 'trigger', 'task', 'action', 'actor', 'authorization settings', 'execution'],
    sources: [docs('AutomationEngine', 'https://docs.dynatrace.com/docs/platform/automationengine'), docs('Workflows', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows'), docs('Workflow triggers', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger'), docs('Event triggers for workflows', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger'), docs('Get started with Workflows', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/quickstart'), docs('Manage workflow permissions', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security'), docs('Monitor workflow executions', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running'), docs('Create a simple workflow', 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/simple-workflow')],
  },
  {
    id: 'ingestion', order: 11, title: 'Ingestion', eyebrow: '11 · Entrada de datos',
    summary: 'Elige el canal de ingestión adecuado y entiende cómo logs, cloud y VMware llegan al contexto Dynatrace.',
    focus: 'OneAgent, Log Ingestion API, syslog, extensions, cloud integrations, ActiveGate y VMware',
    objectives: ['Distinguir captura, ingestión, procesamiento y consulta.', 'Escoger canal de logs según restricciones.', 'Comprender ActiveGate y VMware.', 'Relacionar ingestión, contexto, coste y permisos.'],
    keyTerms: ['ingestion', 'OneAgent', 'Log Ingestion API', 'OpenTelemetry', 'syslog', 'ActiveGate', 'cloud integration', 'VMware vSphere'],
    sources: [docs('Ingest data into Dynatrace', 'https://docs.dynatrace.com/docs/ingest-from'), docs('Log ingestion', 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion'), docs('Log ingestion via OneAgent', 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa'), docs('Configure log storage and retention', 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment'), docs('Advanced log settings', 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/advanced-log-settings'), docs('OpenTelemetry troubleshooting', 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting'), docs('VMware vSphere monitoring', 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring'), docs('Cloud integrations', 'https://docs.dynatrace.com/docs/shortlink/cloud-monitor-hub')],
  },
  {
    id: 'other', order: 12, title: 'Other', eyebrow: '12 · Integración final',
    summary: 'Cierra el mapa con Smartscape, análisis de logs, entidades y Dynatrace Hub.',
    focus: 'topología, Smartscape, Log Management and Analytics, parsing, entidades y Hub',
    objectives: ['Leer relaciones topológicas.', 'Investigar y parsear logs.', 'Distinguir entidades y niveles de la plataforma.', 'Explorar integraciones y aplicaciones del Hub.'],
    keyTerms: ['Smartscape', 'topology', 'entity', 'host', 'process group', 'service', 'log content analysis', 'Dynatrace Hub'],
    sources: [docs('Smartscape topology', 'https://docs.dynatrace.com/docs/shortlink/smartscape'), docs('Log Content Analysis', 'https://docs.dynatrace.com/docs/shortlink/lma-analysis'), docs('Dynatrace Hub', 'https://www.dynatrace.com/hub/'), docs('Query monitored entities in Grail', 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities')],
  },
]

export const examProfile = {
  label: 'Associate Certification · formato de referencia',
  verifiedOn: '2026-10-02',
  note: 'El simulacro reproduce la parte escrita del examen: 60 preguntas multiple-choice y multiple-response, como indica el Learning Path oficial. La parte práctica (10-15 preguntas, open book) no se simula. La duración y el peso de cada área no aparecen en una fuente oficial que hayamos podido verificar: las preguntas se reparten en proporción al temario de cada bloque y los 60 minutos son un ritmo de práctica de 1 minuto por pregunta. Verifica el formato vigente en Dynatrace University.',
  officialLinks: [
    training('Learning Plan oficial', 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan'),
    training('Study Path oficial', 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf'),
  ],
}
