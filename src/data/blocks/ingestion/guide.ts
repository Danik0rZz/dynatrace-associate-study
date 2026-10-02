import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Ingestion».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Ingestion explica cómo una señal llega a Dynatrace y se vuelve consultable. El método universal de troubleshooting es seguir el dato desde el origen hasta la consulta, verificando cada transición. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Elegir el mecanismo de ingestión adecuado.',
    'Diferenciar logs, métricas y trazas.',
    'Entender OpenPipeline y procesamiento.',
    'Diagnosticar pérdida, visibilidad y coste.',
    'Relacionar OneAgent, ActiveGate, OpenTelemetry y APIs con el origen.',
    'Aplicar retención, cardinalidad y calidad como parte del diseño.',
  ],
  sections: [
    {
      id: 'data-path',
      title: 'El camino completo del dato',
      lead: 'No existe “el dato” hasta que se puede demostrar cada etapa.',
      paragraphs: [
        'El recorrido es origen → transporte → autenticación → ingestión → procesamiento → persistencia → permisos → consulta → visualización. Un fallo en cualquiera puede producir una pantalla vacía. Una regla de drop puede ser correcta y aun así explicar por qué no hay registros.',
        'Usa una muestra concreta: timestamp, host, servicio, contenido, event type, metric key o trace ID. Después compara lo que salió del origen con lo que se aceptó, procesó y almacenó.',
        'Aceptado no es lo mismo que consultable. En la Log ingestion API, HTTP 204 significa éxito completo (la petición se aceptó y no tiene cuerpo de respuesta) y HTTP 200 significa ingesta parcial: parte de los eventos se descartaron por ser inválidos, por ejemplo por un timestamp fuera de rango. Ni 204 ni 200 prueban que el registro esté en Grail ni que tú puedas leerlo: después de la aceptación, un processor Drop record cuyo matcher coincide lo descarta antes del almacenamiento, y para consultar logs hacen falta dos permisos, storage:buckets:read sobre el bucket y storage:logs:read sobre la tabla; con solo uno de ellos la query no devuelve los registros.',
        'Antes de culpar al formato, recuerda lo que la API sí admite: payloads application/json, application/jsonl, application/x-ndjson (varios eventos) o text/plain (un solo evento), y registros con timestamp de hasta 24 horas en el pasado. Un registro de hace unos minutos está dentro de la ventana.',
      ],
      bullets: [
        'Origen: ¿se generó?',
        'Canal: ¿se envió por el mecanismo esperado?',
        'Auth: ¿el token o credencial tiene scopes?',
        'Pipeline: ¿matcher y orden son correctos?',
        'Storage: ¿retención y bucket aplican?',
        'Query: ¿dataset, campos y permisos son correctos?',
      ],
      sourceRefs: [
        {
          title: 'Log ingestion',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion via OneAgent',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion API',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'signals',
      title: 'Logs, metrics y traces',
      lead: 'Cada señal tiene un modelo y una estrategia.',
      paragraphs: [
        'Logs contienen mensajes y campos que pueden parsearse o enriquecerse. Metrics representan valores y dimensiones con una semántica de medición. Traces y spans describen recorridos distribuidos y tiempos de operaciones. No sustituyas un tipo por otro solo porque todos aparezcan en un Dashboard.',
        'La elección del canal depende de la fuente: OneAgent, OpenTelemetry, APIs, cloud integrations, ActiveGate, VMware o extensiones. Comprueba soporte, versión, red, credenciales y modelo de datos antes de implementarlo.',
        'Un valor dentro de content (por ejemplo, "order=8812 status=FAILED") no es un campo estructurado. Para filtrar de forma persistente por status hay que parsearlo antes del almacenamiento con un processor de la etapa Processing de un pipeline de OpenPipeline, por ejemplo un processor DQL que parsee content y cree el campo status. Bucket assignment solo decide en qué bucket se guarda el registro; las log ingest rules de OneAgent solo deciden qué logs se envían; y el routing se evalúa antes de Processing, cuando el campo status todavía no existe.',
      ],
      comparison: {
        headers: ['Señal', 'Prioridad de ingestión', 'Error habitual'],
        rows: [
          ['Logs', 'Contenido, parser, retención', 'Consultar un campo que nunca se parseó'],
          ['Metrics', 'Key, unidad, dimensión', 'Sumar valores que no son aditivos'],
          ['Traces', 'Contexto, sampling, propagación', 'Esperar cobertura completa sin comprobar muestreo'],
          ['VMware/cloud', 'Gateway, API y credenciales', 'Asumir que OneAgent siempre media'],
        ],
      },
      sourceRefs: [
        {
          title: 'Log ingestion via OneAgent',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion API',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
      ],
    },
    {
      id: 'openpipeline',
      title: 'OpenPipeline y reglas',
      lead: 'Procesar es transformar el dato con un contrato.',
      paragraphs: [
        'OpenPipeline permite enrutar y procesar datos mediante reglas, matchers y destinos. El orden puede cambiar el resultado: una regla de drop o una transformación anterior modifica lo que recibe la siguiente. En OpenPipeline, los configuration scopes son tipos de datos (logs, events, spans, metrics…): cada uno tiene sus propias ingest sources, rutas y pipelines. No hay que confundirlos con los scopes de las log ingest rules de OneAgent (Host, Kubernetes cluster, Host group, Environment).',
        'Antes de cambiar una regla, captura evidencia, revisa el impacto y comprueba el resultado. Enmascarar o descartar datos puede ser necesario por seguridad o coste, pero debe estar documentado y probado con muestras.',
      ],
      bullets: [
        'Matcher: qué datos toca.',
        'Orden: qué regla se aplica primero.',
        'Transformación: qué campos cambia.',
        'Destino/bucket: dónde se conserva.',
        'Drop/mask: qué información desaparece o se protege.',
        'Permiso: quién puede leer o escribir la regla.',
      ],
      sourceRefs: [
        {
          title: 'Log ingestion API',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline', kind: 'official-docs' },
      ],
    },
    {
      id: 'cost-quality',
      title: 'Calidad, retención y coste',
      lead: 'La ingestión es también una decisión de gobierno del dato.',
      paragraphs: [
        'Más datos no siempre significa más valor. Controla volumen, cardinalidad, frecuencia, duplicación, enriquecimiento y retención. Una métrica con dimensiones ilimitadas o un log sin filtro puede aumentar coste y dificultar el análisis.',
        'Distingue calidad de disponibilidad: que una señal aparezca no significa que tenga los campos, unidad o contexto necesarios. Valida la consulta y el resultado con un caso conocido antes de declarar la ingestión correcta.',
      ],
      bullets: [
        'Volumen por origen y tipo.',
        'Cardinalidad de campos y dimensiones.',
        'Retención y bucket.',
        'Sensibilidad y masking.',
        'Coste de consulta e ingestión.',
        'Valor analítico de cada campo.',
      ],
      sourceRefs: [
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline', kind: 'official-docs' },
        {
          title: 'Ingest sources in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/reference/api-ingestion-reference',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'mechanisms',
      title: 'OneAgent, ActiveGate, OpenTelemetry y APIs',
      lead: 'El origen y el contexto determinan el mecanismo de ingestión.',
      paragraphs: [
        'OneAgent es la ruta natural cuando el dato nace en hosts y procesos compatibles y quieres contexto automático de entidades. ActiveGate puede actuar como gateway o recoger observabilidad remota según la integración. OpenTelemetry es una vía agnóstica para traces, metrics y logs; las APIs permiten enviar datos desde sistemas que no pueden usar un agente.',
        'La mejor respuesta no es elegir el mecanismo con más funciones, sino el que satisface cobertura, contexto, red, credenciales, volumen y soporte. En un sistema gestionado o serverless, instalar OneAgent puede no ser posible; en un host soportado, una API manual puede perder contexto que OneAgent ya produce.',
        'Ejemplos de examen: si los hosts tienen OneAgent pero la red no permite que cada host salga a Dynatrace SaaS, un Environment ActiveGate actúa como proxy seguro y enruta el tráfico de OneAgent hacia Dynatrace, como único punto de contacto disponible en la red local; reduce la complejidad de red y protege redes aisladas. En AWS Lambda no se instala OneAgent como en un host: las funciones serverless se monitorizan con la Dynatrace Lambda extension o con OpenTelemetry.',
      ],
      comparison: {
        headers: ['Mecanismo', 'Cuándo encaja', 'Comprobación crítica'],
        rows: [
          ['OneAgent', 'Host/proceso compatible', 'Modo, versión, inyección y soporte'],
          ['ActiveGate', 'Gateway, cloud o monitorización remota', 'Grupo, red, credenciales y endpoint'],
          ['OpenTelemetry', 'Instrumentación/exportación agnóstica', 'Endpoint, protocolo, auth, atributos y sampling'],
          ['API', 'Fuente externa o integración específica', 'Token, payload, límites y modelo de datos'],
        ],
      },
      sourceRefs: [
        { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline', kind: 'official-docs' },
        {
          title: 'Ingest sources in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/reference/api-ingestion-reference',
          kind: 'official-docs',
        },
        { title: 'OpenTelemetry and Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry', kind: 'official-docs' },
      ],
    },
    {
      id: 'log-ingestion',
      title: 'Log ingestion y timestamps',
      lead: 'Un log visible depende de más que enviar texto.',
      paragraphs: [
        'Para investigar logs confirma fuente, transporte, formato, timestamp, campos parseados, pipeline, bucket, retención y permisos. Un timestamp ausente o mal interpretado puede hacer que el registro exista pero quede fuera del timeframe esperado. Un campo en el mensaje no es automáticamente un campo estructurado de consulta.',
        'La ruta de OneAgent, API, OpenTelemetry o cloud integration puede tener requisitos diferentes. Prueba con una muestra conocida y conserva el contenido original, el timestamp y el record type antes de corregir un parser o una regla de procesamiento.',
        'En la Log ingestion API, el timestamp se busca en claves como timestamp, @timestamp, _timestamp, eventtime, date, time o ts, y se admiten tres formatos: Unix epoch en UTC, RFC3339 y RFC3164. Si el formato no es uno de ellos (por ejemplo, "02/10/2026 14:03:11"), se usa la hora actual y el valor original se guarda en el atributo unparsed_timestamp. Si el registro no contiene ninguna clave de timestamp reconocida, también se usa la hora actual: el registro no se rechaza, pero aparece a la hora de ingesta y no en el timeframe del evento original. Sin zona horaria, se asume UTC.',
      ],
      bullets: [
        'Fuente y archivo/endpoint.',
        'Timestamp del evento y timestamp de ingestión.',
        'Parser/DPL y campos resultantes.',
        'OpenPipeline: matcher, orden y transformación.',
        'Bucket y retención.',
        'Query y permisos del lector.',
      ],
      sourceRefs: [
        {
          title: 'Ingest sources in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/reference/api-ingestion-reference',
          kind: 'official-docs',
        },
        { title: 'OpenTelemetry and Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry', kind: 'official-docs' },
        { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from', kind: 'official-docs' },
      ],
    },
    {
      id: 'metric-ingestion',
      title: 'Métricas, dimensiones y cardinalidad',
      lead: 'Una métrica es una medida con semántica, unidad y dimensiones.',
      paragraphs: [
        'Antes de ingerir o consultar una métrica, identifica metric key, unidad, tipo, frecuencia, agregación y dimensiones. La cardinalidad alta multiplica series y puede afectar coste, rendimiento y utilidad. Sumar una métrica que representa un gauge, o promediar una métrica que ya es un ratio, puede producir una conclusión inválida aunque la query sea sintácticamente correcta.',
        'La retención y la resolución también condicionan la respuesta. Una serie histórica puede existir agregada mientras el detalle fino ya no esté disponible. Cuando una pregunta pida un periodo largo, comprueba la variante de métricas, la granularidad y el datastore antes de prometer resultados.',
        'El metric ingestion protocol admite dos tipos de payload: gauge (por defecto) y count. Un count exige el campo delta con el incremento desde el envío anterior, por ejemplo app.requests,service=checkout count,delta=37; no hay un tipo rate ni summary. Un gauge puede enviarse como valor único o como resumen gauge,min=…,max=…,sum=…,count=…, donde count es el número de mediciones incluidas en el data point; la media se obtiene como sum/count. Cada línea admite hasta 50 dimensiones separadas por comas.',
      ],
      bullets: [
        'Key y unidad.',
        'Tipo: gauge, count, rate u otra semántica.',
        'Dimensiones y cardinalidad.',
        'Agregación válida.',
        'Resolución del periodo consultado.',
        'Retención del datastore aplicable.',
      ],
      sourceRefs: [
        { title: 'OpenTelemetry and Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry', kind: 'official-docs' },
        { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from', kind: 'official-docs' },
        {
          title: 'VMware vSphere monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'trace-ingestion',
      title: 'Traces, spans y sampling',
      lead: 'La ausencia de un span no demuestra que no existiera la petición.',
      paragraphs: [
        'Las trazas distribuidas dependen de instrumentación, propagación del trace context, exportación y sampling. Un trace puede unir spans de varios servicios solo si el contexto se transmite y los componentes exportan datos compatibles. Logs y métricas pueden relacionarse por atributos o entidades, pero la relación no aparece por arte de magia.',
        'En troubleshooting, separa “no se generó”, “se muestreó”, “no se exportó”, “se descartó en pipeline”, “expiró por retención” y “no tengo permiso”. Esta taxonomía evita modificar la query cuando el problema está antes de la consulta.',
        'El sampling de OpenTelemetry en el backend puede romper el enlace entre RUM JavaScript y la traza de backend: Dynatrace respeta la decisión de muestreo del SDK de OTel y no muestrea encima, así que el sampler del backend decide qué trazas se conservan. Para conservar el máximo de transacciones de extremo a extremo, la documentación recomienda ParentBasedSampler (o equivalente), de modo que el backend siga la decisión de muestreo del agente del frontend.',
      ],
      bullets: [
        'Instrumentación del servicio.',
        'Propagación de trace/span context.',
        'Sampling de la fuente o collector.',
        'Exportación y endpoint.',
        'Procesamiento y storage.',
        'Retención y permisos.',
      ],
      sourceRefs: [
        { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from', kind: 'official-docs' },
        {
          title: 'VMware vSphere monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Configure log storage and retention',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'cloud-vmware',
      title: 'Cloud, VMware y monitorización remota',
      lead: 'La arquitectura remota tiene sus propias condiciones.',
      paragraphs: [
        'En cloud y VMware, la recogida suele depender de una integración, un ActiveGate o un endpoint de proveedor. El hecho de tener OneAgent en una VM no implica automáticamente que se hayan recogido todos los objetos de la plataforma cloud o del hypervisor. Comprueba qué entidad y capability aporta cada ruta.',
        'Los fallos suelen estar en el grupo de ActiveGate, conectividad, certificado, credenciales, permisos de API, versión o límites del proveedor. La respuesta de examen debe conservar la distinción entre host monitorizado, sistema remoto consultado y gateway que media la conexión.',
      ],
      bullets: [
        'Origen remoto y API.',
        'ActiveGate group y ruta de salida.',
        'Credenciales y scopes.',
        'Entidades que debe crear la integración.',
        'Frecuencia y límites del proveedor.',
        'Evidencia en estado, logs y datos.',
      ],
      sourceRefs: [
        {
          title: 'VMware vSphere monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Configure log storage and retention',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment',
          kind: 'official-docs',
        },
        {
          title: 'Business event capture',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'retention-storage',
      title: 'Buckets, retención y consulta',
      lead: 'Retención es una propiedad del almacenamiento, no de la pantalla.',
      paragraphs: [
        'Un bucket organiza datos y puede determinar retención, acceso y coste. Cambiar el timeframe no recupera datos que ya expiraron, y ampliar una ventana de UI no cambia la política de almacenamiento. Del mismo modo, que un dato esté en Grail no significa que todos los record types compartan la misma retención.',
        'Cuando una pregunta pida periodos de retención, identifica record type, datastore, bucket, variante Latest/Classic, granularidad y política de la tenant. Después distingue datos de detalle, agregados, problemas y diagnósticos: una cifra válida para un tipo no debe extrapolarse a otro.',
        'Los logs se guardan por defecto en el bucket default_logs, con 35 días de retención; los buckets custom admiten retenciones de 10 días a 10 años. La retención es una propiedad del bucket: para conservar más tiempo ciertos logs se crea un bucket custom y se asignan con un processor de la etapa Bucket assignment del pipeline. Ni el routing ni las log ingest rules fijan la retención.',
      ],
      bullets: [
        'Record type correcto.',
        'Datastore y bucket.',
        'Retención configurada y mínimo incluido.',
        'Granularidad disponible.',
        'Permiso de lectura.',
        'Timeframe de la consulta.',
      ],
      sourceRefs: [
        {
          title: 'Configure log storage and retention',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment',
          kind: 'official-docs',
        },
        {
          title: 'Business event capture',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing',
          kind: 'official-docs',
        },
        {
          title: 'Ingest business events via API',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-ingestion-lifecycle',
      title: 'El ciclo completo de ingestión y Log Ingest API',
      lead: 'Aceptar un payload es solo una etapa del camino hacia una consulta útil.',
      paragraphs: [
        'Un dato recorre origen, instrumentación o exporter, transporte, autenticación, endpoint, OpenPipeline/procesamiento, bucket, retención, permisos y query. Cada etapa puede producir un síntoma parecido: “no veo datos”. Una respuesta profesional identifica el punto exacto con evidencia en lugar de culpar a la visualización.',
        'La Log ingestion API acepta por petición hasta 10 MB y 50.000 log records (un lote puede expandirse hasta 16 MB); si se supera, responde HTTP 413 (Payload Too Large). Admite compresión `gzip` y autenticación con un access token (`Api-Token`) con el scope `logs.ingest` o con un platform token con `openpipeline:logs:ingest`. Registros con timestamp de más de 24 h en el pasado se descartan.',
      ],
      bullets: [
        'Log ingestion API: hasta 10 MB y 50.000 records por petición; por encima, HTTP 413.',
        'Un lote que supera los límites de la petición se rechaza con HTTP 413: divide los envíos grandes en varias peticiones.',
        'Token: access token con scope logs.ingest o platform token con openpipeline:logs:ingest.',
        'Syslog en ActiveGate: un Environment ActiveGate (Linux) con syslog habilitado escucha por defecto en 514/UDP y 601/TCP.',
      ],
      sourceRefs: [
        {
          title: 'Log ingestion',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion via OneAgent',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion API',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-log-ingestion',
      title: 'Logs: OneAgent, API, ActiveGate y cloud',
      lead: 'Los logs tienen canales complementarios y una fase de procesamiento explícita.',
      paragraphs: [
        'OneAgent descubre y recopila logs de hosts y process groups cuando la configuración, permisos del sistema y reglas permiten leerlos. Log Ingestion API recibe logs de sistemas externos y serverless; Syslog puede entrar vía un Environment ActiveGate (por defecto 514/UDP y 601/TCP); Kubernetes puede usar OneAgent, Fluent Bit, Collector, Logstash o Fluentd; cloud forwarding entrega logs desde servicios cloud. Extensions pueden recolectar y enviar logs junto con otras señales.',
        'Los logs se almacenan en Grail y pueden pasar por OpenPipeline para parse, extraction, masking, filtering, routing y métricas derivadas. Schema-on-read permite consultar contenido sin imponer un esquema rígido en el momento de entrada, pero una investigación de calidad todavía necesita conocer fields, tipos, timestamp y sensibilidad.',
        'No confundas canales de entrada con otras piezas que suenan parecido. Forwarding de OpenPipeline no trae logs: va en sentido contrario y reenvía registros desde Dynatrace hacia cloud object storage (con un Dynatrace AWS o Azure Connector). Las log ingest rules tampoco son un canal: configuran los OneAgent instalados para incluir o excluir log sources, así que solo actúan en hosts donde OneAgent ya está desplegado y no recogen logs de equipos sin agente.',
      ],
      comparison: {
        headers: ['Origen/limitación', 'Mecanismo a evaluar', 'Matiz'],
        rows: [
          ['Host compatible', 'OneAgent', 'contexto automático y reglas'],
          ['Serverless/external', 'Log Ingestion API', 'endpoint, payload y token'],
          ['Syslog/private network', 'ActiveGate (514/UDP, 601/TCP)', 'red, grupo y certificado'],
          ['Kubernetes', 'OneAgent/Collector/Fluent Bit', 'metadata y masking'],
          ['Cloud platform', 'forwarding/integration', 'región, servicio y permisos'],
        ],
      },
      sourceRefs: [
        {
          title: 'Log ingestion API',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-log-api-contract',
      title: 'Log ingestion API: contrato, respuestas y ActiveGate',
      lead: 'Un cliente fiable respeta límites, ventanas de timestamp y códigos retryable.',
      paragraphs: [
        'La Log ingestion API está pensada para cuando no se puede instalar OneAgent, por ejemplo en entornos serverless, y recibe datos de log shippers como Fluent Bit, Fluentd, Logstash o el OpenTelemetry Collector. Endpoint SaaS: https://{environment-id}.live.dynatrace.com/api/v2/logs/ingest; a través de un Environment ActiveGate: https://{activegate}:9999/e/{environment-id}/api/v2/logs/ingest. El ActiveGate sirve el endpoint, recoge los datos y los reenvía a Dynatrace en lotes. Con un Classic access token (cabecera Authorization: Api-Token) el scope es logs.ingest; con un platform token (Bearer) u OAuth el scope es openpipeline:logs:ingest (storage:logs:write figura como legacy).',
        'Cada request admite hasta 10 MB de payload y 50.000 log records; tras el procesamiento un lote puede expandirse hasta 16 MB, y por encima la API responde 413. Cada log event admite hasta 500 atributos. Los registros con timestamp anterior a la hora actual menos 24 horas se descartan: si todos están fuera de rango la API responde 400 y si solo una parte, 200. Los registros con timestamp más de 10 minutos en el futuro se ingieren con el timestamp reseteado a la hora de ingesta.',
        'Respuestas: 204 indica éxito; 200, ingesta parcial por eventos inválidos; 400, entrada inválida; 413, payload demasiado grande. Son retryable con exponential backoff 429 (Too Many Requests), 502, 503 y 504; 400 y 413 no lo son: hay que corregir o dividir el lote. Si la cola en disco del ActiveGate se llena, responde 503 "Usable space limit reached", normalmente de forma temporal en picos de tráfico; si persiste, se aumenta disk_queue_max_size_mb en custom.properties (300 MB por defecto).',
        'Con log processing en un pipeline custom de OpenPipeline, la API admite todos los tipos de datos JSON para los valores de atributos desde SaaS 1.295+ o ActiveGate 1.295+; en los demás casos todos los valores ingeridos se convierten a string.',
      ],
      sourceRefs: [
        {
          title: 'Log ingestion API',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api',
          kind: 'official-docs',
        },
        {
          title: 'Log Monitoring API v2 - POST ingest logs',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/log-monitoring-v2/post-ingest-logs',
          kind: 'official-docs',
        },
        {
          title: 'Log Management and Analytics default limits',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-limits',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-oneagent-logs',
      title: 'OneAgent: autodiscovery, log ingest rules y Kubernetes',
      lead: 'Detectar un archivo, decidir si se envía y enriquecerlo son tres pasos distintos.',
      paragraphs: [
        'OneAgent es el método de ingesta de logs recomendado: descubre logs automáticamente, centraliza la configuración y aporta masking de datos sensibles, vinculación con entidades y metadatos de Kubernetes. El autodiscovery detecta archivos de log abiertos por procesos en ejecución, ubicaciones conocidas (Windows Event Logs, /var/log/messages, /var/log/syslog), logs de contenedores y journald, y se repite cada 60 segundos. Para autodetectarse, un archivo debe cumplir todos estos requisitos: lo mantiene abierto un proceso en ejecución, existe desde hace al menos un minuto, se ha escrito en los últimos 7 días, está en una carpeta log o logs (o sus subcarpetas) o su nombre contiene log precedido o seguido de punto o guion bajo (.log, _log), y usa una codificación soportada (UTF-8 por defecto; también UTF-8 BOM y, si llevan byte-order mark, UTF-16LE y UTF-16BE). Además, los archivos binarios se excluyen salvo que se configuren como custom log source con formato binario.',
        'Detectar un archivo no implica ingerirlo: que se almacene depende de las log ingest rules, y si ninguna regla coincide el archivo no se envía. Las reglas no amplían la detección: para un archivo que no cumple los criterios del autodiscovery se define un custom log source (Add missing log sources). Las reglas son de tipo Include (almacenar) o Exclude (bloquear), se procesan de arriba abajo y, si una regla superior coincide, las inferiores se omiten. Los matchers distinguen mayúsculas y minúsculas, salvo el atributo Log source en Windows; en Log source se admiten comodines con asterisco (*).',
        'Las log ingest rules se configuran en cuatro scopes, de mayor a menor prioridad: Host, Kubernetes cluster, Host group y Environment; el scope más específico prevalece. Process group, Log source o el nivel de log son atributos del matcher, no scopes de configuración.',
        'En Kubernetes, el método recomendado es OneAgent desplegado con Dynatrace Operator, que enriquece los logs con topología y metadatos como k8s.namespace.name, k8s.pod.name, k8s.container.name, k8s.deployment.name, dt.entity.kubernetes_cluster y dt.source_entity. Otras opciones son Fluent Bit, el OpenTelemetry Collector, Logstash o Fluentd; con la Log ingestion API, el contexto Kubernetes hay que añadirlo en el propio envío.',
      ],
      sourceRefs: [
        {
          title: 'Log ingestion',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion via OneAgent',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa',
          kind: 'official-docs',
        },
        {
          title: 'Log content autodiscovery',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa/lma-autodiscovery',
          kind: 'official-docs',
        },
        {
          title: 'Log ingest rules',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa/lma-log-storage-configuration',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-syslog-cloud',
      title: 'Syslog en ActiveGate y logs de proveedores cloud',
      lead: 'Cuando el origen no admite agentes, el canal lo decide el tipo de origen.',
      paragraphs: [
        'La ingesta de syslog la realiza un Environment ActiveGate 1.295+ en Linux mediante un OpenTelemetry Collector embebido; los ActiveGate multi-environment no admiten syslog. Se habilita añadiendo syslogenabled=true en extensionsuser.conf. Por defecto escucha en 514/UDP y 601/TCP (RFC 5424); el listener 6514 con TLS aparece comentado y requiere certificado. El receptor admite los formatos RFC 3164 y RFC 5424: los listeners por defecto esperan RFC 5424, y para RFC 3164 hay que ajustar la configuración del receiver. Es la vía habitual para dispositivos de red, como firewalls, que no admiten agentes. La Log ingestion API es HTTP y no actúa como receptor syslog.',
        'Para servicios cloud en los que no se puede instalar OneAgent se usan las integraciones del proveedor: en Azure, los logs se transmiten desde Azure Event Hubs mediante una Azure Function App, o con Azure Native Dynatrace Service; en AWS, desde CloudWatch, S3 o Amazon Data Firehose; en Google Cloud, mediante una suscripción de Pub/Sub. Forwarding de OpenPipeline va en sentido contrario: envía datos desde Dynatrace hacia cloud object storage.',
      ],
      sourceRefs: [
        {
          title: 'Syslog ingestion',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-syslog',
          kind: 'official-docs',
        },
        {
          title: 'Cloud provider log forwarding',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-cloud-provider-log-forwarding',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-openpipeline',
      title: 'OpenPipeline: ingest sources, routing, pipelines y storage',
      lead: 'El routing decide qué pipeline procesa el dato; la pipeline lo transforma y asigna su bucket.',
      paragraphs: [
        'OpenPipeline procesa los datos en streaming antes de guardarlos en Grail. El flujo documentado es: 1) ingest sources (API endpoints, OneAgent, extensions); 2) primary Grail tags; 3) pre-processing, solo en custom ingest sources; 4) routing, que envía cada record a una pipeline (la primera ruta que coincide o la Default route); 5) la pipeline, con sus stages; y 6) storage en un bucket de Grail, con forwarding opcional.',
        'Dentro de la pipeline los stages tienen un orden fijo: Processing (parse con DPL, masking, drop…), Smartscape, Permission, Product/Cost allocation, Bucket assignment, Metric extraction, Davis y Data extraction. El bucket no se decide en el routing, sino en el stage Bucket assignment; Permission, allocation y Bucket assignment aplican solo el primer processor que coincide.',
        'Qué hace cada stage, en su orden: Processing parsea, transforma y filtra; Smartscape node y Smartscape edge extraen nodos y aristas de Smartscape; Permission aplica el security context; Product allocation y Cost allocation asignan uso a productos y centros de coste; Bucket assignment elige el bucket; Metric extraction extrae métricas de los registros; Davis extrae un registro y lo reingesta como Davis event; y Data extraction, la última, extrae un registro y lo reingesta como otro tipo de datos.',
      ],
      comparison: {
        headers: ['Paso del flujo', 'Responsabilidad', 'Detalle de examen'],
        rows: [
          ['1. Ingest source', 'Recibir el dato (API, OneAgent, extensions)', 'Pre-processing solo en custom ingest sources'],
          ['2. Routing', 'Elegir la pipeline', 'Primera ruta que coincide; si ninguna, Default route'],
          ['3. Pipeline · Processing', 'Transformar y sanear', 'Parse con DPL, masking de PII, drop de records'],
          [
            '4. Pipeline · Bucket assignment',
            'Elegir el bucket de destino',
            '`default_logs` o un bucket custom; gana el primer processor que coincide',
          ],
          ['5. Storage', 'Persistir en Grail', 'Forwarding opcional a cloud object storage'],
        ],
      },
      sourceRefs: [
        {
          title: 'Ingest sources in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/reference/api-ingestion-reference',
          kind: 'official-docs',
        },
        { title: 'OpenTelemetry and Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry', kind: 'official-docs' },
        { title: 'Ingest data into Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-op-sources-routing',
      title: 'Ingest sources, routing y forwarding en OpenPipeline',
      lead: 'Antes de que un pipeline toque un registro, OpenPipeline ya sabe por qué fuente entró y a qué pipeline va.',
      paragraphs: [
        'El flujo documentado es: ingest source → primary Grail tags → pre-processing (solo en custom ingest sources) → routing → pipeline → almacenamiento en un bucket de Grail, con forwarding opcional. Cada ingest source se define por un nombre y una ruta, y esa ruta se identifica con el atributo dt.openpipeline.source.',
        'Las reglas de primary Grail tags se evalúan para cada registro elegible antes del pre-processing de la ingest source y del routing; promueven campos existentes a primary_tags.* para que puedan usarse como condiciones de routing. El pre-processing de una custom ingest source también precede al routing, así que puede normalizar estructuras distintas de varios proveedores antes de evaluar las rutas. En cambio, los campos que crea la etapa Processing de un pipeline todavía no existen cuando se evalúa el routing.',
        'Hay tres tipos de ingest source. Las built-in pertenecen a OpenPipeline, son view-only, no tienen pre-processing configurable y solo admiten routing dinámico. Las ready-made pertenecen a la extensión que las crea, son view-only para los usuarios (settings:read), no tienen pre-processing configurable y admiten routing estático y dinámico. Las custom las crea el usuario, tienen pre-processing configurable, admiten routing estático y dinámico y usan owner-based access control.',
        'Con routing estático, los datos de la ingest source van a un pipeline concreto, que permanece fijo hasta que se cambie manualmente: no se evalúan rutas dinámicas ni se duplica el registro. Con routing dinámico, cada ruta tiene como condición de coincidencia una consulta DQL; la posición en la lista establece el orden de ejecución y el registro va al pipeline de la primera ruta que coincide. Si ninguna coincide, el registro sigue la Default route hacia el pipeline built-in (el default pipeline), que asegura su almacenamiento en Grail.',
        'Los logs que una ruta dinámica envía a un pipeline custom no son procesados por el default pipeline; solo los que no se enrutan a pipelines custom pasan por él. Por eso, al crear una ruta nueva, las reglas del default pipeline dejan de aplicarse a los registros desviados.',
        'El almacenamiento y la retención de los system events no son configurables. Forwarding es un paso del flujo que envía registros a cloud object storage soportado mediante un Dynatrace AWS o Azure Connector: puede reenviar registros sin procesar, inmediatamente después de la ingesta, o procesados, tras el procesamiento del pipeline. Los registros pueden seguir almacenados en Grail mientras se reenvía solo lo que necesitan los sistemas externos.',
      ],
      comparison: {
        headers: ['Tipo de ingest source', 'Propietario y acceso', 'Pre-processing', 'Routing'],
        rows: [
          ['Built-in', 'OpenPipeline · view-only (settings:read)', 'No configurable', 'Solo dinámico'],
          ['Ready-made', 'Extensión · view-only (settings:read)', 'No configurable', 'Estático y dinámico'],
          ['Custom', 'Usuario · owner-based access control', 'Configurable', 'Estático y dinámico'],
        ],
      },
      sourceRefs: [
        {
          title: 'Data flow in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/data-flow',
          kind: 'official-docs',
        },
        {
          title: 'Log processing with OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-processing/lma-openpipeline',
          kind: 'official-docs',
        },
        {
          title: 'Forwarding data via OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/forwarding',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-op-stages-processors',
      title: 'Stages y processors dentro de un pipeline',
      lead: 'El orden de las etapas es fijo; lo que configuras son los processors de cada etapa.',
      paragraphs: [
        'Cada pipeline ejecuta sus stages en un orden fijo que no se puede alterar: Processing, Smartscape node, Smartscape edge, Permission, Product allocation, Cost allocation, Bucket assignment, Metric extraction, Davis y Data extraction. Por eso Metric extraction se ejecuta después de Bucket assignment, y ambas después de Processing. El routing solo elige el pipeline; el bucket se decide en la etapa Bucket assignment con un processor y su matcher.',
        'Un processor combina un matcher, una sentencia DQL que delimita los registros objetivo, y una processing definition, que transforma o modifica los datos filtrados. Los processors se aplican en el orden de la lista: la salida de cada processor es la entrada del siguiente, de modo que un processor posterior ve el registro ya transformado. En Processing, Smartscape, Metric extraction, Davis y Data extraction se ejecutan todos los processors que coinciden; en Permission, Product allocation, Cost allocation y Bucket assignment solo se ejecuta el primer processor que coincide (first match only), así que el orden decide el resultado.',
        'La etapa Processing ofrece los processors DQL, Add fields, Remove fields, Rename fields, Drop record, Inline lookup, GeoIP lookup (Early Access) y Technology bundle, que aplica parsers predefinidos a los logs de tecnologías soportadas. Drop record elimina los registros completos que cumplen el matcher, que no llegan a almacenarse en Grail; Remove fields quita campos concretos y conserva el registro; Rename fields solo cambia el nombre (el valor se sigue guardando); Inline lookup mapea valores con una tabla clave-valor definida en el processor. Para enmascarar un identificador sensible antes de almacenarlo, la transformación se hace en un processor de Processing. Con logs de OneAgent sin valor hay dos puntos de corte: una log ingest rule Exclude impide que OneAgent los envíe, y un Drop record en Processing los elimina antes del almacenamiento; un bucket con retención corta, en cambio, los sigue almacenando.',
        'Los campos con prefijo dt.temp. son temporales: están disponibles para los processors posteriores del mismo pipeline, se eliminan antes del almacenamiento y no se guardan en Grail ni se reenvían a Workflows. Sirven, por ejemplo, para parsear un valor que solo se necesita para extraer una métrica.',
        'El procesamiento se basa en los registros disponibles y no tiene en cuenta el enriquecimiento desde servicios externos. Antes de guardar la configuración puedes seleccionar Run sample data para probarla con datos de ejemplo y ver el resultado. Para cuentas nuevas creadas desde septiembre de 2026, Classic pipeline no está disponible y los logs se procesan con OpenPipeline.',
        'Las ready-made pipelines pertenecen a la extensión que las crea y son view-only para los usuarios: la extensión define sus processors y los actualiza automáticamente cuando se actualiza, y la pipeline solo se elimina al desinstalar la extensión. Para añadir procesamiento propio sin editarlas se usan pipeline groups.',
      ],
      sourceRefs: [
        {
          title: 'Processing in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing',
          kind: 'official-docs',
        },
        {
          title: 'Processing stage in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing-stage',
          kind: 'official-docs',
        },
        {
          title: 'Log processing with OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-processing/lma-openpipeline',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-op-groups-access',
      title: 'Pipeline groups y owner-based access control',
      lead: 'Un equipo central puede imponer reglas a muchos pipelines sin editarlos uno a uno.',
      paragraphs: [
        'Los pipeline groups permiten gestionar la configuración de varios pipelines a la vez y aplicar estándares globales de seguridad y operación. La composición del grupo define base pipelines y la posición del placeholder de member pipelines: las base pipelines situadas antes del placeholder se ejecutan primero, los member pipelines se ejecutan en la posición del placeholder y las base pipelines situadas después se ejecutan a continuación. Así, un administrador puede imponer que la etapa Permission de una base pipeline se ejecute antes que cualquier definición de los equipos.',
        'Cuando una base pipeline y un member pipeline tienen la misma etapa activa, se ejecutan ambas: las etapas no son mutuamente excluyentes. Para impedir que los miembros ejecuten una etapa, como Permission (que fija dt.security_context), se excluye de los member pipelines con memberStages, que indica qué etapas de los miembros pueden ejecutarse (includeAll o include). Una pipeline pertenece a un solo pipeline group a la vez y los pipeline groups no pueden anidarse. Las ready-made pipelines pueden actuar como base pipelines, y tanto las custom como las ready-made pueden ser member pipelines.',
        'Las custom pipelines y las custom ingest sources usan owner-based access control; el routing no está sujeto a él. Los permisos settings:objects:read y settings:objects:write a nivel de entorno no bastan: el owner debe compartir acceso de lectura o edición con usuarios o grupos concretos, y los administradores pueden acceder a cualquier configuración. El owner puede transferir la propiedad a otro usuario o grupo en cualquier momento, sin intervención de un administrador. Las built-in pipelines e ingest sources son view-only y se ven con settings:read.',
      ],
      bullets: [
        'Base antes del placeholder: se ejecuta primero (p. ej., Permission global).',
        'Member pipelines: se ejecutan en la posición del placeholder.',
        'Base después del placeholder: se ejecuta al final.',
        'memberStages: decide qué etapas pueden ejecutar los miembros.',
      ],
      sourceRefs: [
        {
          title: 'OpenPipeline pipeline groups',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/pipeline-groups',
          kind: 'official-docs',
        },
        {
          title: 'OpenPipeline access control',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/access-control',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-otel-signals',
      title: 'OpenTelemetry para logs, métricas y traces',
      lead: 'OTLP aporta portabilidad, pero no elimina las decisiones de contexto y operación.',
      paragraphs: [
        'OpenTelemetry usa SDKs, auto-instrumentation y Collectors para producir o transportar logs, metrics y traces mediante OTLP. Dynatrace ofrece endpoints nativos para SaaS, ActiveGate y OneAgent según la arquitectura. El Collector puede batch, transformar o enmascarar antes de enviar. La configuración debe preservar resource attributes, service.name, trace context, timestamps y TLS.',
        'Cuando logs, metrics y traces no se correlacionan, comprueba propagación de trace IDs, naming de services, reloj, exporter, protocol HTTP/gRPC, endpoint y sampling. OTLP aceptado no significa que el campo sea útil en la UI; valida el record type en Grail, la entidad vinculada y la query mínima.',
        'Si el servicio corre en un host con OneAgent, el SDK puede exportar al endpoint OTLP local de OneAgent, http://localhost:14499/otlp/v1/traces por defecto: solo acepta traces (no metrics ni logs), por HTTP con Protocol Buffers binario (sin gRPC ni JSON), no admite compresión con Content-Encoding y, al ser local, no requiere autenticación.',
        'Hacia /api/v2/otlp, el token decide el scope. Con un Classic access token (Authorization: Api-Token): openTelemetryTrace.ingest para traces, metrics.ingest para metrics y logs.ingest para logs. Con un platform token: openpipeline:traces:ingest, openpipeline:metrics:ingest y openpipeline:logs:ingest.',
      ],
      comparison: {
        headers: ['Componente', 'Función', 'Fallo típico'],
        rows: [
          ['SDK/agent', 'instrumentar y crear señales', 'no instrumenta la librería esperada'],
          ['Collector', 'batch, procesar y exportar', 'resource attributes o endpoint incorrectos'],
          ['OTLP endpoint', 'recibir señales', 'token, protocolo o TLS'],
          ['Grail/OpenPipeline', 'procesar y almacenar', 'bucket, masking o permisos'],
        ],
      },
      sourceRefs: [
        {
          title: 'VMware vSphere monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Configure log storage and retention',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-bucket-assignment',
          kind: 'official-docs',
        },
        {
          title: 'Business event capture',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-otlp',
      title: 'OTLP en Dynatrace: endpoints, protocolo y correlación',
      lead: 'Endpoint, protocolo, token y temporalidad deciden si la telemetría OTel llega y se correlaciona.',
      paragraphs: [
        'Los endpoints OTLP de Dynatrace solo aceptan HTTP con payload binario Protocol Buffers: gRPC no está soportado y JSON tampoco. La base URL en SaaS es https://{environment-id}.live.dynatrace.com/api/v2/otlp y a través de un Environment ActiveGate es https://{activegate}:9999/e/{environment-id}/api/v2/otlp; a la base se añaden /v1/traces, /v1/metrics y /v1/logs. En un SDK se configura OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf; en el Collector se usa el exporter otlphttp, porque el exporter otlp usa gRPC. Si una fuente solo exporta gRPC, un OpenTelemetry Collector la recibe y la reenvía por HTTP.',
        'Scopes: con platform token, openpipeline:traces:ingest, openpipeline:metrics:ingest y openpipeline:logs:ingest; con Classic access token (Api-Token), openTelemetryTrace.ingest, metrics.ingest y logs.ingest. Dynatrace requiere delta temporality en las métricas OTLP: una suma monótona acumulativa se rechaza con UNSUPPORTED_METRIC_TYPE_MONOTONIC_CUMULATIVE_SUM.',
        'OpenTelemetry no tiene una especificación estable de RUM: la captura automática de user actions, el análisis de user journeys, Session Replay y la puntuación de Core Web Vitals no están especificados. Dynatrace recomienda combinar el backend instrumentado con OTel con RUM JavaScript (o OneAgent for Mobile). El enlace frontend-backend usa W3C Trace Context: los Collectors y demás intermediarios deben reenviar sin cambios las cabeceras traceparent y tracestate, o la correlación se rompe.',
      ],
      bullets: [
        'Exportación directa: OTLP sobre HTTP con Protocol Buffers binario y, con platform token, scope openpipeline:traces:ingest para trazas.',
        'Collector: exporter otlphttp hacia la base URL /api/v2/otlp.',
        'Métricas: delta temporality.',
        'Correlación con RUM: traceparent y tracestate sin modificar.',
      ],
      sourceRefs: [
        {
          title: 'Dynatrace OTLP API endpoints',
          url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/otlp-api',
          kind: 'official-docs',
        },
        { title: 'OpenTelemetry and Dynatrace', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry', kind: 'official-docs' },
        {
          title: 'OpenTelemetry troubleshooting',
          url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-activegate-integrations',
      title: 'ActiveGate, cloud y VMware',
      lead: 'ActiveGate es un componente de conectividad e integración, no un sustituto universal de OneAgent.',
      paragraphs: [
        'ActiveGate puede actuar como gateway entre agentes y Dynatrace, ejecutar monitorización remota, recibir o reenviar datos y alojar extensiones según el caso. Bases de datos, VMware y Kubernetes pueden necesitar grupos de ActiveGate con conectividad hacia la API o sistema de origen. Valida versión, endpoint, firewall, certificados, credenciales, permisos de lectura y distribución del grupo.',
        'En VMware, ActiveGate consulta la capa vCenter/ESXi y OneAgent en VMs aporta observabilidad complementaria del sistema operativo y procesos. En cloud, el alcance depende del servicio, región, permisos de API y feature set. Si la integración está instalada pero no hay datos, el troubleshooting debe separar autenticación, conectividad, descubrimiento, ingestión y consulta.',
        'VMware vSphere monitoring requiere un Environment ActiveGate, con la propiedad vmware_monitoring_enabled=true en custom.properties (es el valor por defecto, no hay que activarla), conectado a vCenter o a un ESXi standalone. Basta con un usuario con acceso de solo lectura a vCenter: no se requieren privilegios de administrador. El ActiveGate recoge los datos de la capa de virtualización (CPU, memoria, almacenamiento, migraciones vMotion y nuevas VM) y los envía a Dynatrace; OneAgent instalado en cada VM aporta la visibilidad del sistema operativo y de los procesos.',
        'La monitorización de la capa de gestión de virtualización está soportada para VMware; con otros hipervisores se usa OneAgent en los hosts.',
      ],
      bullets: [
        'ActiveGate group correcto.',
        'Conectividad desde el gateway al origen.',
        'Permisos de lectura en cloud/vCenter/database.',
        'Versión compatible y extensión instalada.',
        'Entidades y métricas realmente producidas.',
      ],
      sourceRefs: [
        {
          title: 'Ingest business events via API',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
        { title: 'Metrics powered by Grail', url: 'https://docs.dynatrace.com/docs/license/capabilities/metrics', kind: 'official-docs' },
        {
          title: 'OpenTelemetry troubleshooting',
          url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-ingestion-governance',
      title: 'Buckets, retención, seguridad y coste',
      lead: 'La ingesta termina en una política de almacenamiento que debes poder explicar.',
      paragraphs: [
        'El bucket define dónde se guardan records y qué políticas de retención y acceso se aplican. `default_logs` no es sinónimo de toda la retención de logs: puede existir una configuración custom y rutas que asignen otros buckets. Cambiar retención puede hacer que datos antiguos dejen de estar disponibles; limitar una query por timeframe no cambia el storage.',
        'La cardinalidad, el volumen, el enriquecimiento y la retención afectan consumo. Mide el valor de cada campo y dimensión antes de ingestar sin control. El masking debe ocurrir en la etapa adecuada para reducir exposición y el acceso debe usar permisos de bucket, table y record. Una respuesta técnicamente completa menciona utilidad, seguridad, coste y posibilidad de consulta posterior.',
        'Grail admite permisos en cuatro niveles: bucket, table, record y field. Los permisos de campo usan fieldsets: un campo incluido en un fieldset solo aparece en los resultados para quien tiene ALLOW storage:fieldsets:read WHERE storage:fieldset-name="<nombre>". Los fieldsets predefinidos solo se aplican a spans, user.events y user.sessions; para ocultar campos de logs se crea un fieldset custom por REST API, acotado a buckets o tablas.',
        'Los permisos de registro se expresan como una condición sobre el campo dt.security_context dentro del permiso de tabla. Si los logs de varios equipos comparten bucket y cada registro lleva su dt.security_context, la política ALLOW storage:logs:read WHERE storage:dt.security_context="TeamA"; limita al equipo A a sus propios registros. Una condición sobre el nombre del bucket no separa registros de un bucket compartido, y un permiso de escritura (storage:logs:write) no gobierna la lectura.',
      ],
      bullets: [
        'Define el dato que necesitas conservar.',
        'Asigna bucket y retención con intención.',
        'Enmascara o elimina PII en el punto correcto.',
        'Controla cardinalidad y volumen.',
        'Verifica permisos y query posterior.',
      ],
      sourceRefs: [
        {
          title: 'OpenTelemetry troubleshooting',
          url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/troubleshooting',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion',
          kind: 'official-docs',
        },
        {
          title: 'Log ingestion via OneAgent',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Puedo recorrer el camino completo de un dato ausente.',
    'Diferencio los modelos de logs, metrics y traces.',
    'Sé analizar matcher, orden y scope de una regla.',
    'Incluyo coste, retención y calidad en la decisión.',
    'Elijo OneAgent, ActiveGate, OpenTelemetry o API con una justificación técnica.',
    'Diagnostico un log por timestamp, parser, pipeline, bucket y query.',
    'Puedo razonar sobre cardinalidad, agregación y retención de métricas.',
    'No confundo ausencia de trace con ausencia de petición.',
    'Sé separar VM/host, gateway y sistema remoto.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
