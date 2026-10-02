import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «DQL (Dynatrace Query Language)».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'DQL es uno de los módulos más técnicos. Estúdialo como un lenguaje de análisis de registros y como una forma de razonar sobre tipos, pipeline, cardinalidad y salida; no como una lista de comandos para memorizar sin datos. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Construir pipelines con comandos básicos.',
    'Elegir summarize o timeseries.',
    'Filtrar y seleccionar campos con precisión.',
    'Diagnosticar errores de tipos, campos y volumen.',
    'Consultar métricas con la orden y el límite adecuados.',
    'Separar parsing DPL, consulta DQL y permisos de datos.',
  ],
  sections: [
    {
      id: 'pipeline',
      title: 'Modelo de pipeline',
      lead: 'Cada comando transforma el resultado que recibe.',
      paragraphs: [
        'Una consulta DQL se lee de arriba abajo. fetch selecciona el dataset y el periodo; filter reduce registros; fields limita o calcula campos; sort ordena; limit controla la salida. El orden puede cambiar coste, legibilidad y resultado.',
        'Filtra temprano cuando el filtro reduce el conjunto y selecciona campos antes de compartir una tabla. Pero no elimines el campo que necesitarás para agrupar, ordenar o relacionar. La consulta debe mantener una intención visible.',
      ],
      code: 'fetch logs, from: -2h\n| filter loglevel == "ERROR"\n| fields timestamp, content, dt.entity.host\n| sort timestamp desc\n| limit 50',
      codeNote: 'La sintaxis y los nombres de campos deben validarse en el entorno y la documentación de la variante usada.',
      sourceRefs: [
        {
          title: 'Dynatrace Query Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language',
          kind: 'official-docs',
        },
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        {
          title: 'DQL guide',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'commands',
      title: 'Comandos fundamentales',
      lead: 'Conoce la función y la condición de uso.',
      paragraphs: [
        'fetch inicia la lectura; filter selecciona filas; fields proyecta o crea campos; sort ordena; limit acota; summarize agrupa y agrega; timeseries construye series temporales. DQL no es DPL: DPL se utiliza para definir patrones de parsing en determinados contextos.',
        'Una pregunta de precisión puede ofrecer comandos todos válidos pero con propósitos diferentes. Elige según la forma de salida deseada: tabla de agregados, serie temporal, detalle de registros o lista de campos.',
      ],
      comparison: {
        headers: ['Comando', 'Produce', 'Úsalo cuando'],
        rows: [
          ['fetch', 'Registros de un dataset', 'Necesitas iniciar la consulta'],
          ['filter', 'Subset de registros', 'Quieres restringir condiciones'],
          ['fields', 'Campos seleccionados/calculados', 'Necesitas controlar salida'],
          ['summarize', 'Agregaciones agrupadas', 'Quieres una tabla de resumen'],
          ['timeseries', 'Serie temporal', 'Quieres evolución por intervalos'],
        ],
      },
      sourceRefs: [
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        {
          title: 'DQL guide',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide',
          kind: 'official-docs',
        },
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
      ],
    },
    {
      id: 'aggregation',
      title: 'summarize frente a timeseries',
      lead: 'La visualización y la pregunta deben coincidir.',
      paragraphs: [
        'summarize responde preguntas como “¿cuántos errores hay por servicio?” o “¿cuál es la media por host?”. Agrupa registros y calcula agregados. timeseries responde “¿cómo evoluciona esta medida a lo largo del tiempo?”, con intervalos y dimensiones opcionales.',
        'No uses timeseries solo porque quieres un chart, ni summarize solo porque devuelve un número. Decide primero si necesitas una dimensión temporal regular y una métrica por intervalo.',
        'Cuando by: lleva varias expresiones, summarize devuelve una fila por cada combinación distinta de sus valores, con el agregado de ese grupo. En el ejemplo, bin(timestamp, 1h) redondea cada timestamp al inicio de su hora y loglevel añade una segunda dimensión: cada fila es una combinación de hora y loglevel con su count(). Ya no queda una fila por registro original, y no se obtiene un array con un valor por intervalo: esa es la forma de timeseries o makeTimeseries.',
      ],
      code: 'fetch logs, from: -3d\n| summarize count(), by: {bin(timestamp, 1h), loglevel}\n\n timeseries avg(dt.host.cpu.usage), interval: 1h, by: {dt.entity.host}, from: -3d',
      codeNote: 'El segundo ejemplo muestra la forma conceptual de una serie temporal; revisa la métrica y la sintaxis exactas en tu entorno.',
      sourceRefs: [
        {
          title: 'DQL guide',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide',
          kind: 'official-docs',
        },
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
        {
          title: 'DQL filtering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'types',
      title: 'Tipos, arrays y records',
      lead: 'El tipo del campo condiciona la operación válida.',
      paragraphs: [
        'Los registros pueden contener strings, números, booleanos, arrays, records, timestamps y duraciones. Comparar un array como texto, usar una función numérica sobre un string o asumir que todo campo existe produce resultados incorrectos o errores.',
        'Cuando el esquema no es evidente, empieza con limit y fields para inspeccionar valores. Usa funciones compatibles con el tipo y convierte de forma explícita solo cuando entiendas la pérdida de precisión. En datos JSON, separa parsing del análisis.',
      ],
      bullets: [
        'Inspecciona nombres y tipos antes de agregar.',
        'Trata null y campos ausentes de forma explícita.',
        'Distingue un record anidado de un string JSON.',
        'Comprueba cardinalidad al expandir arrays.',
        'Documenta conversiones y unidades.',
      ],
      sourceRefs: [
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
        {
          title: 'DQL filtering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'dql-troubleshooting',
      title: 'Diagnóstico de consultas',
      lead: 'Un resultado vacío tiene varias causas posibles.',
      paragraphs: [
        'Comprueba primero que el dataset y timeframe contienen registros. Después quita temporalmente filtros, inspecciona fields, valida valores y revisa permisos. Si el dato no existe en origen, cambiar DQL no lo creará; si existe pero no es visible, el problema puede ser ingestión, procesamiento o autorización.',
        'Controla el volumen con timeframe, filtros y limit. Una query que funciona con diez registros puede ser inadecuada para millones. Rendimiento y coste forman parte de la calidad técnica.',
      ],
      bullets: [
        'Dataset correcto.',
        'Periodo correcto.',
        'Campo y valor correctos.',
        'Tipo compatible.',
        'Permisos de bucket, tabla y record (security context) correctos.',
        'Volumen y cardinalidad razonables.',
      ],
      sourceRefs: [
        {
          title: 'DQL filtering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL data types',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'metric-commands',
      title: 'Métricas: comando metrics frente a timeseries',
      lead: 'La orden y el límite de consulta cambian la respuesta.',
      paragraphs: [
        'La categoría Metric commands de la referencia DQL incluye dos comandos: timeseries y metrics. El comando metrics recupera series de métricas para explorar metric keys, dimension keys y valores de dimensión; no devuelve timestamps ni valores de series temporales (timeseries values), así que no sirve para charting ni para cálculos. La documentación oficial impone condiciones de precisión que debes memorizar: está limitado a los últimos 10 días y a 100.000 series por consulta. Si la pregunta requiere chart, intervalos y cálculo temporal, timeseries expresa mejor la intención.',
        'No respondas con el nombre de un comando sin leer periodo, cardinalidad y objetivo. Una consulta de métricas puede quedar limitada antes de que el problema sea la métrica; una timeseries puede ser correcta para evolución y no para enumerar cada serie.',
      ],
      comparison: {
        headers: ['Necesidad', 'Elección habitual', 'Condición que vigilar'],
        rows: [
          ['Series de una métrica', 'comando metrics', 'Últimos 10 días y 100.000 series'],
          ['Evolución temporal', 'timeseries', 'Intervalo, dimensiones y agregación'],
          ['Tabla agregada', 'summarize', 'Grupo, unidad y campos conservados'],
          ['Registros de detalle', 'fetch + fields/filter', 'Dataset, timeframe y permisos'],
        ],
      },
      sourceRefs: [
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL data types',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types',
          kind: 'official-docs',
        },
        {
          title: 'DQL functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'parse-fields',
      title: 'Parsing, fields y datos estructurados',
      lead: 'Primero crea estructura; después formula la pregunta.',
      paragraphs: [
        'Cuando el dato llega como texto o JSON, inspecciona una muestra y decide cómo extraer campos. DPL describe patrones de parsing en los contextos que lo admiten; `fields` selecciona o calcula columnas una vez que el record ya tiene estructura. El orden importa: filtrar por un campo antes de crearlo no puede funcionar.',
        'Una expansión o conversión puede cambiar tipos, nulls y cardinalidad. Valida la transformación con pocos registros y conserva el campo original cuando necesites auditar el resultado.',
        'El comando expand convierte un array en registros separados: por cada registro de entrada produce tantos registros como elementos tiene el array, cada uno con un elemento y una copia de los demás campos, y los registros originales no se conservan aparte. Así, 100 registros con un array de 3 elementos dan 300 registros tras expand, y un count() posterior devuelve 300.',
      ],
      bullets: [
        'Contenido original.',
        'Patrón DPL o parser aplicable.',
        'Campo resultante y tipo.',
        'Null y campos ausentes.',
        'Cardinalidad tras expandir.',
        'Consulta sobre la estructura final.',
      ],
      sourceRefs: [
        {
          title: 'DQL data types',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types',
          kind: 'official-docs',
        },
        {
          title: 'DQL functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'functions-null',
      title: 'Funciones, null y agregaciones',
      lead: 'Una función válida puede producir una interpretación incorrecta.',
      paragraphs: [
        'Antes de agregar, comprueba unidades, tipos y valores ausentes. `count()` de registros no equivale a contar usuarios, sesiones o requests únicos; una suma de valores no siempre representa el total de negocio; una media puede ocultar colas y outliers.',
        'Las preguntas avanzadas mezclan una función correcta con una unidad incorrecta. Explica qué representa cada fila, qué población se incluye y qué ocurre con null. Si necesitas un resultado auditable, conserva dimensiones y muestra de validación antes de reducirlo a un número.',
      ],
      bullets: [
        'Unidad de la fila.',
        'Población incluida.',
        'Valores null o ausentes.',
        'Agregación compatible.',
        'Duplicados y cardinalidad.',
        'Unidades y timezone.',
      ],
      sourceRefs: [
        {
          title: 'DQL functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Pattern Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'permissions-performance',
      title: 'Permisos, rendimiento y coste',
      lead: 'Una DQL correcta también debe ser segura y operable.',
      paragraphs: [
        'La visibilidad de un record en Grail depende de los permisos, que se asignan a nivel de bucket (storage:buckets:read), de tabla (por ejemplo storage:logs:read), de record (por ejemplo con condiciones sobre dt.security_context) y de field. Un usuario puede ejecutar la consulta pero no ver todos los campos o record types. No arregles un resultado vacío ampliando permisos sin demostrar que el scope es la causa.',
        'Para rendimiento, filtra por periodo y campos relevantes, limita durante la exploración, evita expandir cardinalidad sin control y selecciona solo lo necesario. En producción, documenta la intención, el coste esperado y el criterio de actualización.',
      ],
      bullets: [
        'Permisos de bucket, tabla y record (security context).',
        'Timeframe acotado.',
        'Filtro selectivo.',
        'Proyección de campos.',
        'Cardinalidad y volumen.',
        'Resultado reproducible y compartible.',
      ],
      sourceRefs: [
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Pattern Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language',
          kind: 'official-docs',
        },
        {
          title: 'Davis DQL examples',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/use-cases/dynatrace-intelligence-dql-examples',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-dql-pipeline',
      title: 'Modelo mental de DQL y filtros temporales explícitos',
      lead: 'DQL es una tubería de records y fields; el orden y el timeframe son fundamentales.',
      paragraphs: [
        'Una consulta DQL contiene comandos separados por `|`. El primer comando carga o genera datos; los siguientes filtran, seleccionan, transforman, agrupan, ordenan o limitan. Cada paso recibe la salida anterior. Para que una consulta sea determinista y reproducible independientemente del selector de la UI, se debe fijar el timeframe de forma explícita en el primer comando mediante from: (y, opcionalmente, to:), por ejemplo `from:now()-2h, to:now()` o `from:now()-24h, to:now()-2h`, o mediante timeframe: para un rango absoluto. to: solo marca el final de la ventana; el inicio lo fija from: (o timeframe:).',
        'La consulta correcta debe producir la forma que necesita la aplicación. Para una tabla de top hosts, `fetch` + `filter` + `summarize` + `sort` + `limit` es apropiado. Para una gráfica de CPU, `timeseries` define la serie y el intervalo. Para investigar logs de contenedores, se filtran atributos semánticos estándar como `k8s.container.name` y `k8s.pod.name`.',
      ],
      code: 'fetch logs, from:now()-2h, to:now()\n| filter k8s.namespace.name == "production"\n| filter loglevel == "ERROR"\n| summarize error_count = count(), by:{k8s.container.name}\n| sort error_count desc\n| limit 10',
      codeNote: 'El timeframe explícito asegura que la query devuelva exactamente las últimas 2 horas en cualquier contexto de ejecución.',
      sourceRefs: [
        {
          title: 'Dynatrace Query Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language',
          kind: 'official-docs',
        },
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        {
          title: 'DQL guide',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-sources',
      title: 'Comandos de inicio, data objects y permisos',
      lead: 'El primer comando decide qué datos se cargan; el resto solo transforma lo recibido.',
      paragraphs: [
        'Solo algunos comandos pueden iniciar una consulta. `fetch` es un data source command que carga registros de un data object de Grail, por ejemplo `fetch logs`, `fetch events`, `fetch bizevents` o `fetch spans`. `timeseries` es un metric command de inicio que combina carga, filtrado y agregación de métricas en una serie temporal. Comandos como `filter`, `fields` o `summarize` procesan los registros que reciben por el pipe: no cargan datos y no pueden ser el primer comando.',
        'Otros comandos de inicio: `data` genera registros de ejemplo en tiempo de consulta a partir de expresiones record o de un string JSON (por ejemplo `data record(a = "DQL", b = 1), record()`), ideal para probar un patrón de parse sin leer datos de Grail; `describe` devuelve la definición de esquema de un data object, con sus campos y tipos, sin cargar sus registros; `load` carga un archivo tabular de lookup; `metrics` explora series de métricas; `smartscapeNodes` y `smartscapeEdges` cargan nodos y aristas de Smartscape.',
        'fetch admite parámetros que acotan la lectura: `from:` y `to:` (duraciones relativas como `-24h` o timestamps absolutos), `timeframe:` (rango absoluto), `bucket:` (uno o varios buckets, con comodines), `samplingRatio` y `scanLimitGBytes`. samplingRatio admite 1 (valor por defecto, sin muestreo), 10, 100, 1000 o 10000 y devuelve 1/samplingRatio de los registros, así que el resultado es aproximado. scanLimitGBytes limita los datos escaneados: 500 GB por defecto, y -1 analiza todos los datos del timeframe. interval: y shift: no son parámetros de fetch, sino de timeseries.',
        'Si no especificas limit, la consulta muestra 1000 resultados: ese limit se añade por defecto como última línea. Ver 1000 filas no significa que existan 1000 registros; para conocer el total hay que agregar con `summarize count()`.',
        'Sin permisos, un usuario no puede consultar datos de Grail. Hacen falta dos niveles: el permiso de bucket `storage:buckets:read` y el permiso de tabla del data object, como `storage:logs:read` para logs, `storage:bizevents:read`, `storage:spans:read`, `storage:events:read`, `storage:metrics:read` o `storage:entities:read`. Una consulta válida puede fallar o devolver menos datos por autorización.',
      ],
      comparison: {
        headers: ['Comando de inicio', 'Qué carga o genera', 'Ejemplo'],
        rows: [
          ['fetch', 'Registros de un data object de Grail', 'fetch logs, from:-2h'],
          ['timeseries', 'Series temporales de métricas agregadas', 'timeseries avg(dt.host.cpu.usage)'],
          ['data', 'Registros de ejemplo en tiempo de consulta', 'data record(a = "DQL", b = 1)'],
          ['describe', 'Definición de esquema de un data object', 'describe logs'],
          ['smartscapeNodes / smartscapeEdges', 'Nodos o aristas de Smartscape', 'smartscapeNodes HOST'],
        ],
      },
      code: 'fetch logs, from:now()-2h, to:now(), bucket:{"default_logs"}\n| filter loglevel == "ERROR"\n| summarize errors = count()',
      codeNote: 'from:, to: y bucket: acotan qué lee fetch; summarize count() da el total real, no las 1000 filas que se muestran sin limit.',
      sourceRefs: [
        {
          title: 'DQL data source commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/data-source-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL ordering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/ordering-commands',
          kind: 'official-docs',
        },
        {
          title: 'Permissions in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-filtering',
      title: 'Filtros, búsqueda y lógica con null',
      lead: 'DQL usa lógica de tres estados: true, false y null.',
      paragraphs: [
        'filter conserva solo los registros cuya condición es true. Los operadores de comparación devuelven null si uno de los operandos es null; incluso null == null devuelve null. Como filter descarta todo lo que no es true, `filter log.source != "nginx"` pierde los registros sin log.source, y añadir `or log.source == null` no los recupera porque esa comparación también es null. La negación tampoco ayuda: not null = null.',
        'filterOut elimina los registros cuya condición es true y conserva el resto, incluidos los null: filterOut x conserva un registro con x = null, mientras que filter not x lo elimina. Para incluir los null de forma explícita existe isTrueOrNull(expresión), que devuelve true si la expresión es true o null. isNull(expresión) devuelve true para valores null y campos ausentes, e isNotNull hace lo contrario. if(condición, then, else) devuelve then solo si la condición es true y devuelve else cuando la condición es false o null: con `if(duration > 1s, "slow", else:"fast")`, un registro sin duration obtiene "fast". coalesce(a, b, …) devuelve el primer argumento no null, útil para sustituir un null por un valor como "unknown".',
        'Para comparar strings, la guía de buenas prácticas recomienda == o != cuando conoces el valor exacto (`filter k8s.container.name == "coredns"`) y ~ para coincidencias parciales con comodines (`filter k8s.container.name ~ "core*"`). El operador ~ es insensible a mayúsculas y, sin comodines, busca el valor como token dentro del string: "Hello World" ~ "world" es true, pero "HelloWorld" ~ "world" es false porque no hay separador entre tokens. Con comodines basta con que un token coincida con el patrón, así que "*timeout*" encuentra "connectionTimeout".',
        'search conserva los registros que coinciden con una condición de búsqueda, con coincidencia de strings insensible a mayúsculas y basada en tokens. `search "error"` busca el término en todos los campos; `search content ~ "error"` limita la búsqueda al campo content. Entre las string functions, contains(expresión, substring, caseSensitive) distingue mayúsculas por defecto (caseSensitive es true por defecto), mientras que matchesPhrase no las distingue por defecto.',
        'in(needle, haystack, …) comprueba si un valor es miembro de un array o de una lista de valores: `filter in(loglevel, "ERROR", "FATAL")` equivale a `filter loglevel == "ERROR" or loglevel == "FATAL"`, y `filter in("production", tags)` conserva los registros cuyo array tags contiene "production". Con and, la condición loglevel == "ERROR" and loglevel == "FATAL" nunca se cumple para un único valor.',
      ],
      comparison: {
        headers: ['Expresión', 'Registro con el campo a null', 'Resultado'],
        rows: [
          ['filter x != "a"', 'x != "a" es null', 'Descartado'],
          ['filter not (x == "a")', 'not null es null', 'Descartado'],
          ['filterOut x == "a"', 'La condición no es true', 'Conservado'],
          ['filter isTrueOrNull(x != "a")', 'isTrueOrNull devuelve true', 'Conservado'],
          ['filter isNull(x)', 'isNull devuelve true', 'Conservado'],
        ],
      },
      code: 'fetch logs, from:-1h\n| filter isTrueOrNull(log.source != "nginx")\n| summarize n = count(), by:{svc = coalesce(service.name, "unknown")}',
      codeNote: 'isTrueOrNull incluye los registros sin log.source; coalesce agrupa como "unknown" los que no tienen service.name.',
      sourceRefs: [
        {
          title: 'DQL filter and search commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL operators',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/operators',
          kind: 'official-docs',
        },
        {
          title: 'DQL boolean functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/boolean-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL conditional functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/conditional-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL string functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/string-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL general functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/general-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-dql-command-contract',
      title: 'Contrato de los comandos esenciales y arrays en DQL',
      lead: 'Comprende el manejo de estructuras anidadas y manipulación de listas en DQL.',
      paragraphs: [
        'DQL cuenta con funciones nativas para inspeccionar y transformar arrays: `arraySize(array)` devuelve la cantidad de elementos, `in(value, array)` o `arrayIndexOf(array, value)` comprueban si un elemento está presente (la segunda devuelve -1 si no lo encuentra), y el comando `expand` desanida un array creando una fila independiente para cada elemento de la lista.',
        'Un error frecuente es usar `limit` antes de una agregación: puedes contar solo la muestra limitada, no el conjunto completo. Otro es filtrar un campo después de eliminarlo con `fields`, o intentar aplicar una función de string a un record. Lee la forma de salida tras cada pipe y comprueba el tipo antes de seguir.',
      ],
      comparison: {
        headers: ['Operación sobre Array', 'Sintaxis DQL', 'Efecto en el Pipeline'],
        rows: [
          ['Contar elementos', 'fieldsAdd n = arraySize(items)', 'Agrega una columna numérica con la longitud del array'],
          ['Verificar existencia', 'filter in("critical", tags)', 'Conserva solo las filas donde el array contiene el valor'],
          ['Aplanar lista (unwind)', '| expand item = items', 'Multiplica las filas del dataset: una fila por cada elemento del array'],
          ['Acceso por índice', 'fields first_item = items[0]', 'Extrae el elemento en la posición 0'],
        ],
      },
      sourceRefs: [
        {
          title: 'DQL guide',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide',
          kind: 'official-docs',
        },
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
        {
          title: 'DQL filtering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-fields',
      title: 'Selección y modificación de campos, dedup y sort',
      lead: 'Cada comando fields* cambia el esquema de una forma distinta.',
      paragraphs: [
        'fields conserva solo los campos indicados, en el orden indicado, y puede crear campos a partir de expresiones. fieldsAdd evalúa una expresión y añade o reemplaza un campo, conservando todos los demás (`| fieldsAdd uid = upper(k8s.pod.uid)`). fieldsKeep conserva los campos seleccionados y, a diferencia de fields, no crea campos nuevos; admite patrones con comodín (`| fieldsKeep event, "dt.smartscape.*"`). fieldsRemove elimina campos del resultado y también admite patrones (`| fieldsRemove loglevel, "k8s.cluster.*"`).',
        'fieldsRename usa la sintaxis fieldName = originalName: primero el nombre nuevo y después el original, y el campo original deja de existir (`| fieldsRename host = dt.smartscape.host, severity = loglevel`). fieldsMove reúne los campos de nivel raíz que coinciden con include: (menos los de exclude:) en un campo nuevo de tipo record anidado (`| fieldsMove k8s, include: {"k8s.*"}, exclude: {k8s.namespace.name}`). fieldsFlatten hace lo contrario: extrae los campos de un record anidado a campos de nivel raíz, con el nombre del campo como prefijo y un parámetro depth (por defecto 1, entre 1 y 10). fieldsSummary calcula la cardinalidad de los valores de los campos indicados, útil para conocer los datos antes de diseñar filtros.',
        'dedup elimina duplicados según la combinación de campos indicada y conserva un registro completo por combinación (`dedup service.name, status`), a diferencia de summarize, que devuelve solo los grupos y sus agregaciones. Sin el parámetro sort:, el registro que se conserva de cada grupo es aleatorio; con `dedup location, sort: { timestamp desc }` se conserva el más reciente de cada location.',
        'sort ordena de forma ascendente por defecto y distingue mayúsculas: los valores que empiezan por mayúscula (por ejemplo K) se listan antes que los que empiezan por minúscula (por ejemplo d). Por eso `sort server asc` sobre apache, Nginx y envoy devuelve Nginx, apache, envoy.',
      ],
      comparison: {
        headers: ['Comando', 'Efecto en el esquema', 'Ejemplo'],
        rows: [
          ['fields', 'Conserva solo los campos indicados; puede calcular campos', 'fields timestamp, content'],
          ['fieldsAdd', 'Añade o reemplaza un campo y conserva el resto', 'fieldsAdd uid = upper(k8s.pod.uid)'],
          ['fieldsKeep', 'Conserva campos o patrones; no crea campos', 'fieldsKeep event, "dt.smartscape.*"'],
          ['fieldsRemove', 'Elimina campos o patrones', 'fieldsRemove loglevel, "k8s.cluster.*"'],
          ['fieldsRename', 'Renombra: nombre nuevo = nombre original', 'fieldsRename severity = loglevel'],
          ['fieldsMove', 'Mueve campos raíz a un record anidado', 'fieldsMove k8s, include: {"k8s.*"}'],
          ['fieldsFlatten', 'Saca a la raíz los campos de un record', 'fieldsFlatten r, depth: 2'],
          ['fieldsSummary', 'Calcula la cardinalidad de los valores', 'fieldsSummary loglevel'],
        ],
      },
      sourceRefs: [
        {
          title: 'DQL selection and modification commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/selection-and-modification-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL structuring commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/structuring-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL aggregation commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL filter and search commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL ordering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/ordering-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-structure-parse',
      title: 'expand, parse y jsonExtract',
      lead: 'Antes de analizar, convierte arrays, texto y JSON en campos utilizables.',
      paragraphs: [
        'expand crea un registro independiente por cada elemento de un array (`expand [alias =] expresión [, limit]`); sin alias, el campo expandido sustituye al array. Si el array está vacío, no se produce ningún registro, de modo que esa fila desaparece del resultado. El parámetro limit: restringe cuántos elementos se expanden de cada array: se toman desde el principio del array hasta el final o hasta el límite.',
        'parse aplica un patrón DPL a un campo de texto y coloca los resultados en uno o varios campos (`parse content, "LD \'status=\' INT:status"`). Si el patrón no coincide, el registro se conserva y los campos del patrón quedan null; con preserveFieldsOnFailure:true se conservan los valores existentes de esos campos. parsingPrerequisite determina si un registro debe parsearse. Los campos que añade parse sobrescriben los existentes con el mismo nombre.',
        'jsonExtract analiza un string JSON y extrae sus claves de nivel raíz como campos de nivel raíz del registro. Nunca sobrescribe campos existentes: si hay colisiones, las claves en conflicto se guardan en el campo indicado en conflicts: o se descartan. No hay que confundirlo con fieldsFlatten, que trabaja sobre un record ya estructurado, ni con expand, que trabaja sobre arrays.',
      ],
      code: 'data record(id = 1, tags = array("a", "b", "c")),\n     record(id = 2, tags = array())\n| expand tags, limit: 2',
      codeNote: 'id=1 produce dos registros (tags "a" y "b"); id=2 tiene un array vacío y no produce ningún registro.',
      sourceRefs: [
        {
          title: 'DQL structuring commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/structuring-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL extraction and parsing commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/extraction-and-parsing-commands',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Pattern Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-join',
      title: 'join, lookup, joinNested y append',
      lead: 'Elige el comando según qué filas deben sobrevivir y cómo se representan las coincidencias.',
      paragraphs: [
        'join combina los registros de la consulta (lado left) con los de una subconsulta (lado right) según on:. kind admite inner (valor por defecto), leftOuter y outer. inner devuelve solo los registros que coinciden en ambos lados; leftOuter devuelve todos los registros de la izquierda y solo los coincidentes de la derecha, de modo que un registro de la izquierda sin coincidencia se mantiene; outer devuelve los registros coincidentes y los no coincidentes de cualquiera de los dos lados. Los campos añadidos desde la subconsulta llevan por defecto el prefijo right.',
        'Si la clave tiene el mismo nombre en ambos lados basta con on:{id}; si los nombres son distintos se indica el lado de cada campo: on:{left[dt.entity.host] == right[id]}. Varias condiciones separadas por comas se combinan con AND. Cuando las claves de ambos lados son null, los registros no se emparejan, sea cual sea el kind; para tratarlos como iguales hay que sustituir antes el null, por ejemplo con coalesce.',
        'lookup enriquece cada registro de origen con los campos de un registro coincidente de una subconsulta y conserva todas las filas de origen. Necesita sourceField (campo de la tabla de origen) y lookupField (campo de la subconsulta), como en `lookup [fetch dt.entity.kubernetes_cluster], sourceField: dt.entity.kubernetes_cluster, lookupField: id`. Si hay varias coincidencias, solo se recupera el primer registro coincidente, y los campos añadidos llevan por defecto el prefijo lookup. Los prefijos por defecto son, por tanto, right. en join y lookup. en lookup; ambos se cambian con el parámetro prefix.',
        'joinNested funciona como una variante de leftOuter que, en lugar de duplicar filas, añade los resultados coincidentes de la subconsulta como un array de records anidados en un campo nuevo (`joinNested nestedRecords = [ … ], on: { key }`). append combina los registros de dos fuentes de forma similar a UNION ALL de SQL: añade los registros de la subconsulta a los del stream sin emparejarlos por clave, sin deduplicar y sin modificar los campos.',
      ],
      comparison: {
        headers: ['Comando', 'Filas de origen sin coincidencia', 'Varias coincidencias', 'Prefijo por defecto'],
        rows: [
          ['join (kind:inner, por defecto)', 'Se descartan', 'Una fila por coincidencia', 'right.'],
          ['join kind:leftOuter', 'Se conservan', 'Una fila por coincidencia', 'right.'],
          ['join kind:outer', 'Se conservan, también las de la subconsulta', 'Una fila por coincidencia', 'right.'],
          ['lookup', 'Se conservan', 'Solo la primera coincidencia', 'lookup.'],
          ['joinNested', 'Se conservan', 'Array de records en un campo nuevo', 'Nombre del campo nuevo'],
          ['append', 'No empareja: concatena registros', 'No aplica', 'Sin prefijo'],
        ],
      },
      code: 'fetch logs, from:-1h\n| join [fetch dt.entity.host | fields id, entity.name],\n    kind:leftOuter,\n    on:{left[dt.entity.host] == right[id]}',
      codeNote: 'leftOuter conserva todos los logs; el nombre del host llega como right.entity.name.',
      sourceRefs: [
        {
          title: 'DQL correlation and join commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/correlation-and-join-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-smartscape',
      title: 'Consultas Smartscape: smartscapeNodes, smartscapeEdges y traverse',
      lead: 'Los nodos se cargan; las relaciones se recorren.',
      paragraphs: [
        'smartscapeNodes carga nodos de Smartscape de un tipo: el tipo se escribe sin comillas cuando es concreto (`smartscapeNodes HOST`), entre comillas dobles cuando es un patrón con comodines (`smartscapeNodes "*EC2*"`) o como * para todos los tipos. smartscapeEdges carga aristas, es decir, relaciones entre nodos, filtradas por su tipo, por ejemplo `smartscapeEdges runs_on`.',
        'traverse no inicia una consulta: recibe nodos de un comando anterior y sigue un tipo de arista hasta un tipo de nodo destino, con la sintaxis traverse edgeType, targetType. Por ejemplo, `smartscapeNodes PROCESS | traverse runs_on, HOST` va de los procesos a los hosts en los que se ejecutan. direction admite forward (valor por defecto) y backward: partiendo de HOST, `smartscapeNodes HOST | traverse runs_on, PROCESS, direction: backward` recorre runs_on en sentido contrario y devuelve los procesos.',
        'traverse devuelve los nodos destino con un campo adicional, dt.traverse.history, un array de records con información del nodo de origen. Para conservar en ese historial campos del nodo de origen se usa el parámetro fieldsKeep: (`traverse runs_on, HOST, fieldsKeep: name`). nodeId indica el campo identificador del nodo de origen (id por defecto). Un comando fieldsKeep posterior solo ve los campos de los nodos destino.',
      ],
      code: 'smartscapeNodes PROCESS\n| traverse runs_on, HOST, fieldsKeep: name',
      codeNote: 'Devuelve nodos HOST; el name del PROCESS de origen queda en dt.traverse.history.',
      sourceRefs: [
        {
          title: 'DQL Smartscape commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/smartscape-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-dql-aggregation',
      title: '`summarize` frente a `timeseries`',
      lead: 'La elección depende de la forma temporal y de la pregunta.',
      paragraphs: [
        '`summarize` produce una salida tabular agrupada por expresiones en `by:{...}` y acepta agregaciones como `count()`, `avg()`, `sum()` o `countDistinct()`. Es adecuado para top lists, conteos por servicio, errores por nivel o una tabla de resultados. Para incluir tiempo en una tabla, puedes agrupar por un bin temporal, pero el resultado sigue siendo tabular.',
        '`timeseries` está diseñado para métricas y devuelve una estructura de series con timeframe e interval. Es la opción natural para evolución de CPU, latencia o throughput y permite visualizaciones temporales. No uses `summarize` o `timeseries` por costumbre: pregunta si necesitas filas agrupadas o una serie homogénea con puntos temporales.',
      ],
      code: 'timeseries avg(dt.host.cpu.usage), interval:1h, by:{dt.entity.host}, from:now()-3d\n\nfetch logs, from:now()-3d\n| summarize errors = count(), by:{loglevel}',
      codeNote: 'La primera consulta devuelve series temporales para gráficas; la segunda devuelve filas tabulares agrupadas.',
      sourceRefs: [
        {
          title: 'DQL filtering commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/filtering-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL data types',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-aggregation-functions',
      title: 'Funciones de agregación y agrupación temporal',
      lead: 'La agregación correcta depende de qué representa cada fila.',
      paragraphs: [
        'summarize agrupa los registros con valores idénticos en los campos de by:{…} y calcula agregaciones por grupo. Si el campo de agrupación no existe en todos los registros, summarize añade un grupo null al resultado. Sin by:, summarize devuelve un único registro, incluso si no recibe ningún registro de entrada: en ese caso count() vale 0 y agregaciones como sum() valen null. summarize no tiene parámetro interval:; para agrupar por tiempo en formato tabla se usa by:{bin(timestamp, 1h)}, donde bin redondea hacia abajo al múltiplo del tamaño indicado.',
        'count() cuenta registros y no recibe condición. countIf(condición) cuenta los registros que cumplen la condición dentro de cada grupo, sin filtrar el resto, lo que permite calcular total y errores en la misma agregación. countDistinct es un alias de countDistinctApprox, que estima la cardinalidad de forma estocástica (algoritmo UltraLogLog); countDistinctExact calcula la cardinalidad exacta, hasta 1 millón de valores distintos. sum y avg trabajan con long, double o duration. percentile(expresión, percentil) devuelve el valor bajo el que queda ese porcentaje y revela colas que la media oculta; median equivale a percentile(expresión, 50) y takeFirst/takeLast devuelven el primer o el último valor.',
        'makeTimeseries construye series temporales a partir de los registros que ya están en el stream, por ejemplo logs filtrados, y admite interval: o bins:, by:, default: y nonempty:; toma el tiempo del campo timestamp (o start_time) salvo que se indique time:. No hay que confundirlo con timeseries, un comando de inicio que carga y agrega datos de métricas, no registros de logs: para contar logs por intervalo se usa fetch logs seguido de makeTimeseries. Para agrupar por la hora del día, getHour(timestamp) extrae la hora: en 7 días produce 24 grupos, mientras que bin(timestamp, 1h) crea un grupo por cada hora real (168). getDayOfWeek devuelve el día de la semana (1 = lunes, 7 = domingo).',
        'Para mostrar el nombre de una entidad a partir de su ID, entityName(expresión) devuelve el nombre, por ejemplo `fieldsAdd entityName(dt.entity.host)`; renombrar el campo o convertirlo a string conserva el ID. La documentación de general functions sugiere usar getNodeName en lugar de entityName.',
      ],
      code: 'fetch logs, from:-2h\n| summarize total = count(), errors = countIf(loglevel == "ERROR"), by:{service.name}\n| fieldsAdd error_rate = errors * 100.0 / total',
      codeNote: 'countIf cuenta los ERROR de cada servicio sin perder el total, que filtrar antes eliminaría.',
      sourceRefs: [
        {
          title: 'DQL aggregation commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL aggregation functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/aggregation-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL time functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/time-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL mathematical functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/mathematical-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL general functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/general-functions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-timeseries',
      title: 'timeseries en detalle y el comando metrics',
      lead: 'Una salida homogénea: mismas fechas, mismo intervalo, un array por agregación.',
      paragraphs: [
        'timeseries es un comando de inicio que combina carga, filtrado y agregación de métricas en una salida de series temporales. Admite varias agregaciones separadas por comas en el mismo comando (`timeseries cpu_avg = avg(dt.host.cpu.usage), cpu_max = max(dt.host.cpu.usage), interval:1h`), y todas comparten timeframe e interval. by:{dt.entity.host} devuelve una serie por valor de la dimensión. filter: aplica una condición sobre los registros de origen antes de la agregación (`timeseries http_503 = sum(http_requests), filter:{code == 503}`).',
        'La salida es homogénea: todas las series tienen el mismo inicio y fin, el mismo intervalo y el mismo número de elementos. Cada agregación es una columna de tipo array con un valor por time slot, y el resultado incluye además los campos timeframe e interval. Para obtener un único valor por serie se aplica una array function como arrayMax(cpu) al array, o el parámetro scalar:true de la agregación, que calcula un único valor para todo el timeframe.',
        'interval: fija la duración de cada time slot y bins: el número de slots; son excluyentes y una serie admite como máximo 1.500 time slots. shift: desplaza el timeframe (valores negativos hacia el pasado), útil para comparar con la semana anterior mediante append. Los slots sin datos valen null salvo que la agregación indique default: (`sum(http_requests, default:0)`). nonempty:true devuelve registros aunque no haya datos que coincidan, union:true combina las series con outer join en lugar del inner join por defecto y rollup: indica la agregación del rollup temporal.',
        'El comando metrics recupera series de métricas para explorar metric keys, dimension keys y valores de dimensión; no devuelve timestamps ni valores de series temporales, por eso no sirve para charting ni cálculos. Está limitado a los últimos diez días y a 100.000 metric series por consulta. Para analizar la evolución de una métrica se usa timeseries.',
      ],
      code: 'timeseries avail = avg(dt.host.disk.avail), by:{dt.entity.host}, from:-24h\n| append [\n  timeseries avail.7d = avg(dt.host.disk.avail), by:{dt.entity.host}, shift:-7d\n]',
      codeNote: 'shift:-7d desplaza el timeframe una semana al pasado para superponer el mismo periodo de la semana anterior.',
      sourceRefs: [
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL array functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/array-functions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-dql-types-records',
      title: 'Tipos, arrays y records',
      lead: 'DQL es strongly typed: el tipo limita las funciones y operadores válidos.',
      paragraphs: [
        'Los tipos primitivos incluyen boolean, string, long, double, timestamp y duration. Los tipos complejos incluyen array y record. Un record contiene pares clave-valor y se accede por clave (record[campo]); un array se indexa por posición (array[0]). JSON y KVP parseados suelen producir records. Si comparas un número como string, o tratas un array como un escalar, la consulta puede fallar o tener semántica distinta.',
        'Usa funciones de conversión cuando la fuente sea flexible y valida nulls o campos ausentes. `fieldsAdd` puede construir campos calculados; `parse` puede extraer un record; después puedes leer `record[field]` o anidar acceso. Las mini-prácticas de este módulo muestran el resultado esperado para que aprendas a predecir la forma, no solo a reconocer sintaxis.',
        'Los índices de un array empiezan en 0: array[0] es el primer elemento, array[2] el tercero y array[4] el quinto. Un record no se indexa por posición: meta[region] lee la clave region, y meta[0] no devuelve ese valor.',
      ],
      code: 'data record(payload = "{\\"status\\":\\"ok\\",\\"count\\":3}")\n| parse payload, "JSON:json"\n| fields json[status], json[count]',
      codeNote: 'El parsing JSON crea un record cuyos campos se pueden leer por clave.',
      sourceRefs: [
        {
          title: 'DQL functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Pattern Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-types-conversion',
      title: 'Acceso a records, identificadores y conversiones',
      lead: 'Corchetes para acceder, backticks para nombres especiales y to* para convertir.',
      paragraphs: [
        'DQL opera con datos strongly typed: las funciones y operadores aceptan solo los tipos declarados. Además de boolean, long, double, string, timestamp y duration, hay tipos como timeframe, ip address y UID, y los tipos complejos array y record.',
        'Los campos de un record se leen con corchetes: person[name], y los anidados con person[address][pcode]. Los elementos de un array se leen por posición empezando en 0: int_array[0] es el primero. Un timeframe expone sus límites con tf[start] y tf[end], y las time functions getStart(timeframe) y getEnd(timeframe) devuelven los mismos timestamps. Un punto no es un operador de acceso: tf.start o json_data.status se interpretan como nombres de campo que contienen un punto.',
        'Los nombres de campo que usan caracteres distintos de a-zA-Z0-9_. o que empiezan por un carácter distinto de a-zA-Z_ deben ir entre backticks, es decir, con un acento grave delante y otro detrás del nombre: un campo llamado http status (con espacio) se escribe en la consulta con un backtick antes de http y otro después de status, como muestra el bloque de código de este apartado. Entre comillas dobles sería un literal string, no un campo, y http_status sería otro campo distinto.',
        'Las funciones as* solo garantizan el tipo: asLong devuelve el valor si ya es long y null en otro caso, y asString devuelve el valor si es string y null en otro caso. Las funciones to* convierten: toLong convierte a long un valor de un tipo adecuado, como el string "1532", y toString devuelve la representación string de un valor. Por eso, para sumar bytes extraídos como string se usa sum(toLong(bytes)).',
        'Array functions útiles: arraySize(array) devuelve el número de elementos; arrayMax(array) el elemento máximo; arrayIndexOf(array, value) devuelve la posición (empezando en 0) del primer elemento igual al valor, o -1 si no está. No existen arrayContains ni arrayLength: la pertenencia se comprueba con in(value, array).',
      ],
      code: 'fetch logs\n| fields `http status`, `my host*`',
      codeNote: 'Cada nombre lleva un backtick (acento grave) delante y otro detrás; "http status" entre comillas dobles sería un string literal.',
      sourceRefs: [
        {
          title: 'DQL data types',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/data-types',
          kind: 'official-docs',
        },
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        {
          title: 'DQL conversion and casting functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/conversion-and-casting-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL array functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/array-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL time functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/time-functions',
          kind: 'official-docs',
        },
        {
          title: 'DQL general functions',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/functions/general-functions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-dql-dpl',
      title: 'DQL y DPL no son el mismo lenguaje',
      lead: 'DQL orquesta la consulta; DPL describe cómo reconocer patrones.',
      paragraphs: [
        'DPL es un lenguaje de patrones basado en matchers como `INT`, `IPADDR`, `LD`, `HTTPDATE`, `JSON` y otros. Se utiliza con `parse` para extraer campos desde contenido y en OpenPipeline para procesar datos. DQL utiliza ese resultado para filtrar, agregar, ordenar o visualizar. Si una pregunta pide “qué lenguaje define el patrón”, la respuesta es DPL; si pide “cómo encadeno filtros y agregaciones”, es DQL.',
        'Un parser debe probarse con muestras reales y con casos que no coinciden. Un patrón demasiado amplio extrae datos incorrectos; uno demasiado estricto devuelve null o pierde registros. Estudia también escapes, JSON, KVP, contenido multilínea y la diferencia entre parsear en ingestión y parsear al consultar.',
        'En `parse content, "IPADDR:ip LD HTTPDATE:time"`, el comando parse, el campo content y el resto de la consulta son DQL; solo el string del patrón es DPL. Cada matcher reconoce un tipo de dato (IPADDR una dirección IPv4 o IPv6, INT un entero, LD datos de línea, HTTPDATE un timestamp con formato de log HTTP) y el nombre tras los dos puntos es el campo que se exporta.',
      ],
      comparison: {
        headers: ['Tecnología', 'Responsabilidad', 'Momento'],
        rows: [
          ['DQL', 'consultar, filtrar, agregar y visualizar', 'query time y apps'],
          ['DPL', 'describir patrones y matchers', 'parse/query u OpenPipeline'],
          ['OpenPipeline', 'procesar, enrutar, enmascarar y extraer', 'ingestión/procesamiento'],
        ],
      },
      sourceRefs: [
        {
          title: 'Dynatrace Pattern Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language',
          kind: 'official-docs',
        },
        {
          title: 'Davis DQL examples',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/use-cases/dynatrace-intelligence-dql-examples',
          kind: 'official-docs',
        },
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-dql-performance',
      title: 'Buenas prácticas, coste y límites',
      lead: 'Una consulta correcta también debe ser operable.',
      paragraphs: [
        'Reduce pronto el dataset con filtros sobre campos directos, selecciona campos temprano y evita joins o lookups innecesarios. Coloca `sort` cerca del final y no uses `limit` antes de una agregación salvo que esa muestra sea intencionada. El timeframe y las opciones de `fetch`, como bucket o scan limits documentados, controlan cuánto se procesa, pero no convierten una consulta en gratis ni sustituyen la política de acceso.',
        'La consulta ejecutada desde un Notebook puede tener comportamiento de timezone y timeframe distinto de una acción DQL en Workflows. La API o el Workflow puede usar UTC, un timeframe por defecto y límites de records distintos. Cuando una práctica se ejecuta fuera de la UI, documenta explícitamente `from`, `to`, timezone, permisos y forma del resultado.',
        'Las DQL best practices piden evitar join y lookup para filtrar salvo que sea necesario. Si ya conoces los valores, no hagas join con una subconsulta data que los devuelva (ni append, joinNested o lookup): filtra directamente, por ejemplo filter in(dt.entity.host, "H-1", "H-2", "H-3").',
      ],
      bullets: [
        'Filtra por campos directos y temprano.',
        'Selecciona campos antes de transformaciones costosas.',
        'Agrega antes de ordenar grandes volúmenes.',
        'Define timeframe explícito en automatizaciones.',
        'Comprueba tipos, permisos, scanned records y límites de salida.',
      ],
      sourceRefs: [
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Query Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language',
          kind: 'official-docs',
        },
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-best-practices',
      title: 'Buenas prácticas oficiales de DQL',
      lead: 'Menos datos leídos, menos registros procesados y el orden al final.',
      paragraphs: [
        'La guía de buenas prácticas propone este orden: filtrar primero para reducir registros (mejor con filtros inclusivos que con negaciones), seleccionar pronto los campos con fields, fieldsKeep o fieldsRemove, procesar los datos, agregar con summarize o makeTimeseries y ordenar al final. Ordenar justo después de fetch empeora el rendimiento, y join y lookup deben evitarse para filtrar salvo que sean necesarios.',
        'Para reducir los datos leídos, acota el timeframe con el selector o directamente en fetch (`fetch bizevents, from:-10m`), limita los buckets (`fetch logs, bucket:{"default_logs", "logs_365_*"}`) y, si basta una aproximación, usa samplingRatio (`fetch spans, samplingRatio:100`); scanLimitGBytes (`fetch logs, scanLimitGBytes:100`) limita el escaneo. Filtrar por timestamp después de leer siete días no reduce lo leído, y samplingRatio da resultados aproximados, incompatibles con un conteo exacto.',
        'Filtra directamente sobre el campo: en lugar de `filter matchesValue(lower(k8s.namespace.name), "astro*")`, usa `filter k8s.namespace.name ~ "astro*"`. Recuerda que cada comando procesa la salida del anterior: un limit antes de summarize hace que la agregación cuente solo los registros que limit deja pasar. Para quedarte con los N grupos mayores, filtra, agrega con summarize, ordena el resultado y aplica limit al final.',
      ],
      bullets: [
        '1. filter: reduce registros cuanto antes.',
        '2. fields, fieldsKeep o fieldsRemove: selecciona pronto los campos.',
        '3. Procesa los datos.',
        '4. summarize o makeTimeseries: agrega.',
        '5. sort: ordena al final.',
      ],
      code: 'fetch logs, from:-24h\n| filter loglevel == "ERROR"\n| summarize errors = count(), by:{service.name}\n| sort errors desc\n| limit 5',
      codeNote: 'Top 5 de servicios por errores: filtrar, contar todos los grupos, ordenar y solo entonces limitar.',
      sourceRefs: [
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'DQL data source commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/data-source-commands',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Puedo leer un pipeline de arriba abajo.',
    'Sé diferenciar summarize y timeseries.',
    'Inspecciono tipos y campos antes de concluir.',
    'Puedo depurar una query vacía sin inventar datos.',
    'Puedo explicar por qué limit y filter protegen la consulta.',
    'Recuerdo el alcance por defecto del metric command: 10 días y 100.000 series.',
    'Distingo DPL de DQL y valido el tipo tras un parsing.',
    'No confundo count de registros con usuarios, sesiones o hechos únicos.',
    'Puedo revisar permisos, cardinalidad y coste antes de compartir una query.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
