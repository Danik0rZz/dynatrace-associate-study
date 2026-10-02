import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Ingestion».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión sobre ingestión y gobierno del dato',
  intro: 'La ingestión se evalúa como una cadena completa, no como una llamada HTTP aislada. Debes saber qué mecanismo corresponde a cada origen y qué ocurre después de aceptar el payload.',
  rows: [
    {
      topic: 'OpenPipeline Processing Stages',
      fact: 'Flujo: ingest source → routing (elige la pipeline) → pipeline con stages en orden fijo (Processing, Smartscape, Permission, Product/Cost allocation, Bucket assignment, Metric extraction, Davis, Data extraction) → storage en Grail.',
      examNote: 'El bucket se asigna en el stage Bucket assignment de la pipeline, no en el routing.',
      source: { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline' },
    },
    {
      topic: 'Routing en OpenPipeline',
      fact: 'El routing envía cada record a la primera ruta cuya condición coincide; si ninguna coincide, usa la Default route. Las built-in ingest sources solo admiten dynamic routing.',
      examNote: 'Un record que acaba en la pipeline equivocada suele deberse al orden o a la condición de las rutas.',
      source: { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline' },
    },
    {
      topic: 'Log Ingest API Contratos',
      fact: 'La Log ingestion API acepta hasta 10 MB y 50.000 log records por petición; admite gzip y se autentica con un access token (`Api-Token`, scope `logs.ingest`) o un platform token (`openpipeline:logs:ingest`).',
      examNote: 'Superar el tamaño devuelve HTTP 413 (no reintentable); 429, 502, 503 y 504 sí son reintentables.',
      source: { title: 'Log ingestion', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion' },
    },
    {
      topic: 'Syslog Receiver en ActiveGate',
      fact: 'Un Environment ActiveGate en Linux con syslog habilitado recibe syslog de red, por defecto en 514/UDP y 601/TCP, y lo reenvía a Grail.',
      examNote: 'Dispositivos de red (firewalls, routers…) que no admiten agentes se integran habitualmente vía syslog; VMware se integra con un Environment ActiveGate conectado a vCenter y los demás hipervisores con OneAgent en los hosts.',
      source: { title: 'ActiveGate architecture', url: 'https://docs.dynatrace.com/docs/platform/activegate' },
    },
    {
      topic: 'Data path',
      fact: 'El camino es origen → transporte → autenticación → ingestión → OpenPipeline → persistencia → permisos → consulta.',
      examNote: 'HTTP 200 o una respuesta de aceptación no prueba que el dato sea visible en la query.',
      source: { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from' },
    },
    {
      topic: 'OneAgent',
      fact: 'Es el canal recomendado cuando el dato nace en hosts y procesos soportados y quieres contexto automático de entidad.',
      examNote: 'No siempre es posible en serverless, SaaS gestionado o sistemas remotos.',
      source: { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from' },
    },
    {
      topic: 'ActiveGate',
      fact: 'Puede proporcionar gateway, conectividad remota, endpoints de API y módulos OTLP según configuración.',
      examNote: 'No es lo mismo un Environment ActiveGate que un OneAgent instalado en el origen.',
      source: { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from' },
    },
    {
      topic: 'OpenTelemetry',
      fact: 'Permite instrumentación y exportación vendor-neutral de logs, metrics y traces mediante SDKs, collectors y endpoints compatibles.',
      examNote: 'Comprueba propagación, endpoint, protocolo, TLS, resource attributes y visualización final.',
      source: { title: 'OpenTelemetry troubleshooting', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting' },
    },
    {
      topic: 'Log ingestion',
      fact: 'Los logs ingeridos pasan por procesamiento y almacenamiento en Grail/OpenPipeline; se pueden filtrar, enriquecer, transformar y enrutar.',
      examNote: 'El parser no crea una fuente; solo estructura lo que ya llegó.',
      source: { title: 'Log ingestion', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion' },
    },
    {
      topic: 'OpenPipeline',
      fact: 'Matcher, orden, transformación, masking, drop y destino determinan lo que finalmente se almacena y consulta.',
      examNote: 'Una regla correcta en el scope equivocado produce el mismo síntoma que una regla incorrecta.',
      source: { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline' },
    },
    {
      topic: 'Retention',
      fact: 'El bucket determina retención y acceso; “default_logs” está indicado con 35 días y los buckets custom pueden cubrir necesidades mayores.',
      examNote: 'Retención no es lo mismo que timeframe seleccionado.',
      source: {
        title: 'Configure log storage and retention',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment',
      },
    },
    {
      topic: 'Metrics ingestion',
      fact: 'Una métrica necesita key, valor, timestamp, unidad y dimensiones con cardinalidad controlada.',
      examNote: 'Más dimensiones no siempre aportan más precisión; pueden multiplicar series y coste.',
      source: { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from' },
    },
    {
      topic: 'Traces',
      fact: 'Sampling, propagación de trace context y límites de retención afectan a la capacidad de unir spans con logs y metrics.',
      examNote: 'No asumas trazas completas si el sistema usa sampling o no propaga contexto.',
      source: { title: 'OpenTelemetry troubleshooting', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting' },
    },
    {
      topic: 'VMware/cloud',
      fact: 'Las integraciones remotas suelen necesitar ActiveGate, credenciales, permisos, región o endpoint y feature set.',
      examNote: 'Un dashboard vacío puede ser conectividad o contrato de la integración, no DQL.',
      source: { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from' },
    },
    {
      topic: 'Timestamp de logs (Log ingestion API)',
      fact: 'Los registros con timestamp anterior a la hora actual menos 24 horas se descartan (la API responde 400 si todos están fuera de rango y 200 si solo una parte); los que superan en más de 10 minutos la hora actual se ingieren con el timestamp reseteado a la hora de ingesta.',
      examNote: 'Un registro futuro no se descarta: se reajusta. Ante datos ausentes revisa el timestamp original, no solo la hora de la query.',
      source: {
        title: 'Log Management and Analytics default limits',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-limits',
      },
    },
  ],
}
