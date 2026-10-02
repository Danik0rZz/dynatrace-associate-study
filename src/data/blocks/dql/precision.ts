import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «DQL (Dynatrace Query Language)».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión de DQL',
  intro: 'DQL se domina entendiendo el flujo de records y fields, los comandos que cambian la forma del resultado y las condiciones de tipo, timeframe, permisos y volumen.',
  rows: [
    {
      topic: 'Pipeline',
      fact: 'Los comandos se encadenan con “|”; cada comando recibe el resultado anterior y devuelve una tabla o colección de records.',
      examNote: 'El orden afecta al resultado y al rendimiento.',
      source: { title: 'Use DQL queries', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide' },
    },
    {
      topic: 'Filtros Temporales Explícitos',
      fact: 'En DQL se define el rango temporal en el comando de inicio con from: (y, opcionalmente, to:), por ejemplo `from:now()-2h, to:now()`, o con timeframe:; anula el selector global de la interfaz.',
      examNote: 'Fijar el timeframe dentro de la query garantiza reproducibilidad en ejecuciones programadas y workflows.',
      source: { title: 'Use DQL queries', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide' },
    },
    {
      topic: 'Campos Canónicos de Kubernetes',
      fact: 'En logs de contenedores, los atributos semánticos oficiales son `k8s.container.name`, `k8s.pod.name` y `k8s.namespace.name`.',
      examNote: 'No utilices nombres propietarios inventados para filtrar contenedores en DQL.',
      source: { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands' },
    },
    {
      topic: 'Funciones sobre Arrays en DQL',
      fact: 'DQL proporciona funciones como `arraySize()`, `in(value, array)` y `arrayIndexOf()`, y el comando `expand` para aplanar arrays en múltiples filas.',
      examNote: 'El comando expand es necesario cuando quieres una fila por cada elemento del array; para comprobar pertenencia basta in(value, array).',
      source: { title: 'DQL data types', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types' },
    },
    {
      topic: 'fetch',
      fact: 'Define la fuente inicial, por ejemplo “fetch logs” o “fetch bizevents”; si no se especifica timeframe, se usa el de la UI.',
      examNote: 'Un timeframe de la UI puede ser la causa oculta de un resultado vacío.',
      source: { title: 'Use DQL queries', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide' },
    },
    {
      topic: 'filter',
      fact: '“filter” conserva records que cumplen una condición; reducir pronto el volumen suele mejorar consulta y claridad.',
      examNote: 'Filtrar una dimensión después de agregarla no es equivalente a filtrar el dato bruto.',
      source: { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands' },
    },
    {
      topic: 'fields',
      fact: '“fields” conserva los campos seleccionados; “fieldsAdd”, “fieldsKeep”, “fieldsRemove” y “fieldsRename” cambian el esquema de salida.',
      examNote: 'No confundas ocultar un campo con eliminarlo del almacenamiento.',
      source: { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands' },
    },
    {
      topic: 'summarize',
      fact: 'Agrupa records por “by:{...}” y aplica aggregations como “count()”, “avg()” o “countDistinct()”.',
      examNote: 'El resultado ya no tiene una fila por evento original.',
      source: { title: 'Use DQL queries', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide' },
    },
    {
      topic: 'timeseries',
      fact: 'Combina carga, filtrado y agregación de métricas y produce series homogéneas con timeframe e interval.',
      examNote: 'Para una serie temporal de métricas, “timeseries” es distinto de “summarize” sobre records.',
      source: {
        title: 'DQL metric commands',
        url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
      },
    },
    {
      topic: 'metrics command',
      fact: '“metrics” es exploratorio, limitado a los últimos 10 días y a 100.000 metric series por query; no está pensado para charting o cálculos.',
      examNote: 'Si necesitas charting o cálculo de una serie, estudia “timeseries”.',
      source: {
        title: 'DQL metric commands',
        url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
      },
    },
    {
      topic: 'Tipos',
      fact: 'DQL es strongly typed: string, long, double, boolean, timestamp, duration, array y record aceptan operaciones distintas.',
      examNote: 'Si el tipo no encaja, inspecciona y convierte explícitamente; no compares todo como texto.',
      source: { title: 'DQL data types', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types' },
    },
    {
      topic: 'parse y DPL',
      fact: '“parse” interpreta un campo con un patrón DPL; JSON/KVP pueden producir un “record” estructurado.',
      examNote: 'DQL consulta; DPL describe el patrón de parsing.',
      source: { title: 'DQL data types', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types' },
    },
    {
      topic: 'data',
      fact: '“data” genera records de ejemplo durante la ejecución y sirve para probar o documentar una consulta pequeña.',
      examNote: 'No equivale a ingestar esos datos en Grail.',
      source: { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands' },
    },
    {
      topic: 'Permisos',
      fact: 'Para “timeseries” y “metrics” se necesitan permisos de lectura de metrics y buckets adecuados.',
      examNote: 'Una query válida puede fallar o devolver menos datos por autorización.',
      source: {
        title: 'DQL metric commands',
        url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
      },
    },
    {
      topic: 'Buenas prácticas',
      fact: 'Filtra por campos directamente, limita el timeframe, considera “scanLimitGBytes” y evita transformaciones innecesarias antes de reducir datos.',
      examNote: 'La consulta correcta también debe ser operable en volumen.',
      source: { title: 'DQL best practices', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices' },
    },
    {
      topic: 'Permisos para timeseries',
      fact: 'Para consultar métricas con timeseries hacen falta dos permisos: storage:buckets:read (nivel bucket) y storage:metrics:read (nivel tabla). Para logs serían storage:buckets:read y storage:logs:read.',
      examNote: 'El permiso de bucket es obligatorio siempre; el de tabla cambia según el dato (metrics, logs, events…).',
      source: { title: 'Permissions in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail' },
    },
    {
      topic: 'Campos tras summarize',
      fact: 'Tras summarize solo quedan los campos de agrupación de by: y los campos de agregación: con summarize n = count(), by:{service.name} el resultado tiene service.name y n, y campos como loglevel ya no existen.',
      examNote: 'Un filter posterior sobre un campo que no está en by: no puede funcionar: filtra antes de summarize.',
      source: {
        title: 'DQL aggregation commands',
        url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands',
      },
    },
  ],
}
