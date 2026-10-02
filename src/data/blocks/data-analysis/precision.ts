import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Data, Reporting & Analysis».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión: retención, métricas y análisis',
  intro: 'Este cuadro contiene cifras y condiciones que conviene saber de memoria. Son valores de referencia de Latest Dynatrace consultados en la documentación oficial; revisa la fecha y no mezcles automáticamente Classic con Grail.',
  rows: [
    {
      topic: 'Metrics powered by Grail',
      fact: 'Retención incluida general: 15 meses con granularidad de 1 minuto por defecto; puede ampliarse hasta 10 años.',
      examNote: 'Si la pregunta dice Grail metrics, la respuesta esperada no es la retención de Metrics Classic.',
      source: { title: 'FAQ for Metrics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq' },
    },
    {
      topic: 'storage:bucket-definitions:write',
      fact: 'Crear nuevos buckets o modificar las políticas de retención en Grail requiere el permiso IAM explícito `storage:bucket-definitions:write`.',
      examNote: 'Tener acceso de lectura o escritura a los datos de un bucket no permite alterar su retención.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Retención de Buckets del Sistema',
      fact: '`default_logs`: 35 días; `default_securityevents`: 1 año; `default_securityevents_builtin`: 3 años; Davis problems y events: 14 meses.',
      examNote: 'Los buckets integrados (default_ y dt_) no son editables: para otra retención se usa un bucket personalizado (salvo el programa preview de retención extendida para RUM y Synthetic, hasta 13 meses).',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'timeseries default:0',
      fact: 'En DQL, `default:0` es un parámetro de la función de agregación (p. ej. `sum(m, default:0)`), no del comando `timeseries`: sustituye por 0 los intervalos vacíos (null) de una serie existente; para obtener 0 cuando no hay ningún dato se combina con `nonempty:true`.',
      examNote: 'Evita discontinuidades y saltos artificiales en gráficos de líneas cuando no hay muestras en ciertos minutos.',
      source: {
        title: 'DQL metric commands',
        url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
      },
    },
    {
      topic: 'Metrics Classic',
      fact: 'Retención general indicada para Metrics Classic: 5 años; Grail metrics usa un almacenamiento separado.',
      examNote: 'Classic metrics y Grail metrics no comparten automáticamente su histórico.',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'Distributed traces en Grail',
      fact: '`default_spans`: 10 días, no editable. Un bucket personalizado de spans amplía la retención hasta 10 años (Data retention periods indica para tracing un rango de 10 días a 10 años; Organize data, de 1 día a 10 años para cualquier bucket personalizado).',
      examNote: 'Distingue la retención fija del bucket integrado (10 días) de la de un bucket personalizado de spans (hasta 10 años).',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'Logs en Grail',
      fact: 'El bucket “default_logs” tiene 35 días; los buckets de logs se pueden configurar según el rango permitido por la capacidad, hasta 10 años.',
      examNote: 'El valor por defecto y el valor configurado son preguntas diferentes.',
      source: {
        title: 'Configure log storage and retention',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment',
      },
    },
    {
      topic: 'RUM y Synthetic',
      fact: 'User events, user sessions, user replays y Synthetic aparecen con 35 días como retención general por defecto.',
      examNote: 'No extrapoles esta cifra a todas las métricas derivadas ni a datos Classic específicos.',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'Davis',
      fact: 'Davis problems and events tienen 14 meses de retención general.',
      examNote: 'Un Problem no comparte automáticamente la retención de un log, trace o metric.',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'Application Security',
      fact: 'Security data powered by Grail se conserva entre 1 y 3 años según fuente; la tabla general indica 3 años para Dynatrace-generated y 1 año para third-party.',
      examNote: 'Antes de responder, identifica si la pregunta habla de Grail security o Security Classic.',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'OneAgent diagnostics',
      fact: 'Support archives y analysis results de OneAgent tienen 30 días de retención general.',
      examNote: 'No es la retención de toda la telemetría del host.',
      source: {
        title: 'Data retention periods',
        url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
      },
    },
    {
      topic: 'Key requests Classic',
      fact: 'Detailed code-level data: 10 días; aggregated code-level data: 35 días; long-term metric history: 5 años.',
      examNote: 'La palabra “detailed”, “aggregated” o “long-term” cambia la respuesta.',
      source: {
        title: 'Monitor key requests',
        url: 'https://docs.dynatrace.com/docs/observe/application-observability/services-classic/monitor-key-requests',
      },
    },
    {
      topic: 'Buckets custom',
      fact: 'Los buckets custom permiten diseñar retención y acceso por tipo de dato; acortar retención puede eliminar datos que ya superan el nuevo periodo.',
      examNote: 'La retención es una política de storage, no un filtro visual del dashboard.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Granularidad',
      fact: 'La retención y la granularidad no son lo mismo: se puede conservar un periodo largo con datos agregados o consultar detalle solo mientras exista.',
      examNote: 'Lee la unidad temporal antes de comparar dos historiales.',
      source: { title: 'FAQ for Metrics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq' },
    },
  ],
}
