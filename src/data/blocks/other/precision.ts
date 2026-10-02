import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Other».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión de Smartscape, logs, entidades y Hub',
  intro: 'Este módulo reúne los objetos que se usan como pegamento durante un troubleshooting. Su importancia está en que una pregunta puede cambiar la respuesta solo por cambiar el nivel de entidad o la fase del análisis.',
  rows: [
    {
      topic: 'Campos de Relación Topológica',
      fact: 'En el modelo Classic, las relaciones entre entidades se exponen como campos con el nombre de la relación y el tipo de destino, como `runs[dt.entity.service_instance]` en un host o `instance_of[dt.entity.process_group]` en una process group instance.',
      examNote: 'Cada relación tiene un nombre en el origen y otro en el destino (runs_on / runs, instance_of / instantiates); un campo de relación devuelve IDs, y para traer sus detalles hacen falta expand y lookup.',
      source: { title: 'Smartscape topology', url: 'https://docs.dynatrace.com/docs/shortlink/smartscape' },
    },
    {
      topic: 'Permiso storage:entities:read',
      fact: 'Consultar el catálogo y topología de entidades monitorizadas en Grail requiere el permiso IAM `storage:entities:read`.',
      examNote: 'Sin este permiso, las consultas `fetch dt.entity.*` fallan por falta de permisos.',
      source: { title: 'Query monitored entities in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities' },
    },
    {
      topic: 'Smartscape',
      fact: 'Muestra nodos y edges de la topología construida a partir de datos observados.',
      examNote: 'Una relación depende de lifetime, timeframe, soporte, fuente y permisos.',
      source: { title: 'Smartscape topology', url: 'https://docs.dynatrace.com/docs/shortlink/smartscape' },
    },
    {
      topic: 'Entity model',
      fact: 'Host es infraestructura; process group agrupa procesos; process group instance es una ejecución; service es una función observable.',
      examNote: 'El mismo síntoma puede requerir navegar por niveles distintos.',
      source: { title: 'Query monitored entities in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities' },
    },
    {
      topic: 'Parsing',
      fact: '“parse” y patrones DPL extraen campos desde contenido; JSON/KVP puede producir records estructurados.',
      examNote: 'Parser y DQL cumplen funciones diferentes: uno extrae, el otro consulta y procesa.',
      source: { title: 'DQL data types', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types' },
    },
    {
      topic: 'Buckets',
      fact: 'Las tablas consultan por record type y los buckets separan almacenamiento, retención, acceso y coste.',
      examNote: 'Leer “logs” no implica consultar solo un bucket.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Hub',
      fact: 'El catálogo descubre apps, extensiones, integraciones y templates, pero cada elemento conserva requisitos de versión y configuración.',
      examNote: 'Hub no es una garantía de que el componente esté instalado.',
      source: { title: 'Dynatrace Hub', url: 'https://www.dynatrace.com/hub/' },
    },
    {
      topic: 'Lookup',
      fact: 'Un lookup añade campos relacionando claves; con claves no únicas lookup solo toma el primer registro coincidente (resultado ambiguo), mientras que join genera una fila por coincidencia y puede multiplicar registros y distorsionar agregaciones.',
      examNote: 'Valida cardinalidad y tipo antes de enriquecer en producción.',
      source: { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands' },
    },
    {
      topic: 'Investigación reproducible',
      fact: 'Conserva timeframe, filtro, query, muestra y conclusión para que otra persona repita el análisis.',
      examNote: 'Un screenshot sin consulta ni contexto es una evidencia débil.',
      source: { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs' },
    },
    {
      topic: 'Logs y contexto',
      fact: 'Un log aislado gana valor cuando contiene timestamp, servicio, entidad, trace ID, severidad y campos estructurados.',
      examNote: 'Volumen de logs no equivale a observabilidad útil.',
      source: { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs' },
    },
    {
      topic: 'Entity query',
      fact: 'Las entidades se pueden consultar en Grail y relacionar con datos observables mediante campos y vistas soportadas.',
      examNote: 'No inventes un entity ID ni asumas que todas las entidades tienen los mismos campos.',
      source: { title: 'Query monitored entities in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities' },
    },
    {
      topic: 'Entidades Classic en Grail',
      fact: 'Las entidades Classic se consultan con `fetch dt.entity.host`, `fetch dt.entity.service` o `fetch dt.entity.process_group` (requiere `storage:entities:read`).',
      examNote: 'Desde la versión 1.334 Dynatrace está en transición a Smartscape on Grail: en Latest, la topología se consulta con smartscapeNodes, smartscapeEdges y traverse.',
      source: {
        title: 'Query monitored entities in Grail (Classic)',
        url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
      },
    },
    {
      topic: 'Smartscape Classic: 5 tiers',
      fact: 'Data centers → Hosts → Processes → Services → Applications (en el tier Processes cada nodo es un proceso).',
      examNote: 'Eje vertical: dependencias full-stack entre tiers; eje horizontal: llamadas entrantes y salientes dentro de cada tier. El Smartscape actual es un grafo de nodos y edges, sin tiers.',
      source: { title: 'Smartscape Classic', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape-classic' },
    },
    {
      topic: 'Log Management and Analytics / Logs app',
      fact: 'Permite explorar logs sin exigir un esquema fijo de antemano y analizarlos con DQL y schema-on-read.',
      examNote: 'Que no haya esquema previo no elimina la necesidad de tipos y parsing.',
      source: { title: 'Log Management and Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs' },
    },
  ],
}
