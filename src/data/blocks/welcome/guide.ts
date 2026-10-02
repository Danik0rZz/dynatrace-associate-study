import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Welcome».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Este capítulo te da el modelo mental que une el resto del path. Associate no se prepara memorizando pantallas aisladas: se prepara aprendiendo a pasar de una pregunta a datos, de datos a contexto y de contexto a una decisión explicable. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Explicar el propósito de la plataforma.',
    'Describir una investigación de extremo a extremo.',
    'Separar observabilidad, negocio, seguridad y automatización.',
    'Elegir una fuente de verificación antes de afirmar un comportamiento.',
  ],
  sections: [
    {
      id: 'platform-model',
      title: 'El modelo mental de Dynatrace',
      lead: 'Piensa en un ciclo de evidencia, no en una colección de productos.',
      paragraphs: [
        'La plataforma reúne datos de aplicaciones, infraestructura, usuarios, negocio, logs, métricas, eventos y seguridad. Grail proporciona un espacio común de datos; la UI y sus aplicaciones ofrecen experiencias especializadas; DQL permite preguntar directamente a los datos.',
        'El contexto hace que una señal sea útil. Una métrica de CPU puede ser un síntoma; una entidad, una relación Smartscape y un Problem ayudan a conectar ese síntoma con un proceso, un servicio y la experiencia afectada. En un escenario de examen, una respuesta precisa suele conservar ese contexto en lugar de saltar a una acción genérica.',
      ],
      bullets: [
        'Señal: qué ha ocurrido o qué valor cambió.',
        'Entidad: a qué componente pertenece.',
        'Relación: qué dependencia conecta con otros componentes.',
        'Impacto: qué usuario, proceso o resultado de negocio se ve afectado.',
        'Acción: qué compruebas o automatizas a continuación.',
      ],
      sourceRefs: [
        {
          title: 'Dynatrace Associate Certification Learning Plan',
          url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
          kind: 'official-training',
        },
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
      ],
    },
    {
      id: 'investigation-loop',
      title: 'Bucle de investigación',
      lead: 'La mejor respuesta suele ser la que reduce incertidumbre en el orden correcto.',
      paragraphs: [
        'Empieza por formular la pregunta: ¿estoy buscando causa, alcance, tendencia, disponibilidad, experiencia o impacto de negocio? A continuación fija el timeframe y la fuente de datos. Después reduce el conjunto, valida tipos y valores, relaciona entidades y solo entonces interpreta.',
        'Si una señal no aparece, no concluyas inmediatamente que el sistema no la generó. Puede faltar ingestión, procesamiento, persistencia, permiso o una consulta correcta. Este orden aparece en muchas preguntas de troubleshooting porque evita confundir ausencia de evidencia con evidencia de ausencia.',
      ],
      bullets: [
        'Pregunta → fuente → periodo → filtro → contexto → evidencia → decisión.',
        'Una investigación reproducible conserva consulta, filtros y fecha.',
        'Una recomendación de AI debe contrastarse con datos observables.',
        'La documentación oficial resuelve alcance y límites; no sustituye la hipótesis.',
      ],
      sourceRefs: [
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
      ],
    },
    {
      id: 'terminology',
      title: 'Terminología que no debes mezclar',
      lead: 'Los nombres en inglés son parte del contrato técnico.',
      paragraphs: [
        'En español puedes explicar el significado, pero conserva Product names, app names, entity types y operadores DQL en inglés. Traducir “Business Event”, “Problem”, “Process Group” o “ActiveGate” de forma inconsistente crea falsos sinónimos y te hace elegir el distractor equivocado.',
        'Durante el estudio, practica siempre tres capas: definición corta, ejemplo en la UI y diferencia frente al concepto vecino. Por ejemplo, un Problem contextualiza una situación correlacionada; un Davis event es un tipo de evento que puede alimentar automatización, y ninguno es simplemente “cualquier error”.',
      ],
      comparison: {
        headers: ['Concepto', 'Pregunta que responde', 'No confundir con'],
        rows: [
          ['RUM', '¿Cómo interactúan usuarios reales?', 'Synthetic Monitoring'],
          ['Business Event', '¿Qué acción o hecho de negocio ocurrió?', 'user event genérico'],
          ['Problem', '¿Qué situación correlacionada afecta al entorno?', 'Davis event individual'],
          ['OneAgent', '¿Qué observa desde el host/proceso?', 'ActiveGate'],
          ['DQL', '¿Cómo consulto y analizo datos?', 'DPL, que sirve para parsing'],
        ],
      },
      sourceRefs: [
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'study-method',
      title: 'Cómo usar esta aplicación',
      lead: 'El objetivo no es acumular aciertos, sino construir recuperación fiable.',
      paragraphs: [
        'Lee primero el capítulo completo del módulo. Después intenta explicar la diferencia entre los conceptos clave sin mirar. A continuación resuelve el quiz rápido; usa el banco completo cuando el dominio sea nuevo y el repaso adaptativo cuando tengas fallos o baja confianza.',
        'Cuando falles, no memorices la letra. Lee la explicación, abre mentalmente la fuente indicada, escribe qué condición omitiste y vuelve a resolver un escenario. El simulacro sirve al final de un ciclo, no como sustituto de la lectura.',
      ],
      bullets: [
        'Lectura completa → recuperación libre → quiz rápido.',
        'Banco completo → revisión de distractores → práctica.',
        'Repaso adaptativo → simulacro → análisis de dominios débiles.',
        'Marca un módulo como preparado solo si puedes justificar tus decisiones.',
      ],
      sourceRefs: [
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        { title: 'What is Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-dynatrace-101',
      title: 'Dynatrace 101: Arquitectura y Fundamentos de la Plataforma',
      lead: 'Comprende los 5 pilares arquitectónicos transversales que sustentan la observabilidad unificada.',
      paragraphs: [
        'Dynatrace unifica los pilares de telemetría clásicos MELT (Metrics, Events, Logs, Traces) junto con datos de negocio (Business Events), seguridad en runtime (vulnerabilidades) y topología viva en un único almacenamiento: Grail. A diferencia de las soluciones fragmentadas que conectan bases de datos dispares con identificadores incoherentes, la plataforma mantiene un contexto continuo donde cada dato sabe a qué entidad pertenece, qué dependencias tiene y qué impacto produce en los usuarios.',
        'La jerarquía de entidades se estructura verticalmente: Host (máquina virtual o física) → Process Group Instance / PGI (ejecución concreta de un proceso en ese host, que pertenece a un Process Group, la agrupación lógica de procesos equivalentes) → Service (interfaz lógica de llamadas y endpoints) → Application (interfaz web o móvil usada por el usuario final). Smartscape Classic mapea estas entidades en 5 tiers (Data centers, Hosts, Processes, Services y Applications) y muestra además las relaciones horizontales de llamada dentro de cada tier.',
      ],
      comparison: {
        headers: ['Componente Arquitectónico', 'Propósito Principal', 'Diferencia Crítica de Examen'],
        rows: [
          [
            'Grail Data Lakehouse',
            'Almacenamiento columnar sin esquemas rígidos (schema-on-read)',
            'No requiere indexación previa ni bases de datos de series temporales separadas.',
          ],
          [
            'Dynatrace Intelligence (antes Davis AI)',
            'Detección de anomalías y análisis de causa raíz determinista',
            'Su causal AI aplica un análisis determinista sobre el grafo topológico de Smartscape (no una correlación estadística de caja negra); además ofrece predictive AI (forecast analysis) y generative AI (Dynatrace Assist).',
          ],
          [
            'Smartscape Topology',
            'Grafo vivo y automático de dependencias en 5 capas',
            'Conecta infraestructura con servicios y aplicaciones sin configuración manual de mapas de red.',
          ],
          [
            'OneAgent & OpenPipeline',
            'Ingestión automatizada de contexto profundo y control de flujo',
            'OneAgent captura telemetría sin cambios de código (inyecta code modules en los procesos) y OpenPipeline transforma y enruta los datos antes de guardarlos.',
          ],
          [
            'DPS (Platform Subscription)',
            'Modelo de consumo flexible basado en valor unificado',
            'Un compromiso anual único que se consume por capability según un rate card, en lugar de cuotas fijas por producto (Host Units, DEM units…).',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'Dynatrace Associate Certification Learning Plan',
          url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
          kind: 'official-training',
        },
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-grail-dql',
      title: 'Grail y DQL: un único almacén y un lenguaje en pipeline',
      lead: 'Grail guarda todas las señales juntas y DQL las consulta sin esquema previo.',
      paragraphs: [
        'Grail es el data lakehouse de Dynatrace diseñado para datos de observabilidad: logs, métricas, trazas (spans), eventos y Business Events se guardan en un único almacenamiento y quedan interconectados con el modelo de topología del entorno. No hay un backend separado para logs ni una unificación que ocurra solo en la capa visual: todo se consulta con DQL junto a su contexto de entidad, y los registros originales se conservan. Esta es la gran diferencia con Dynatrace Classic, que no tenía Grail: Latest Dynatrace se apoya en Grail, en DQL y en las apps de AppEngine, y sigue usando OneAgent, Smartscape y Problems.',
        'Grail aplica schema-on-read: los datos entran sin definir un esquema previo y sin índices, y la estructura (campos y tipos) se aplica al consultar, por ejemplo con el comando parse de DQL. Lo contrario es schema-on-write, donde hay que definir el esquema o los índices antes de ingerir. Grail no necesita ningún índice y permite buscar en cualquier campo o texto, esté o no estructurado.',
        'DQL (Dynatrace Query Language) es el lenguaje de consulta de Grail. Todos los comandos se encadenan con | (pipe): los datos fluyen de un comando al siguiente y se filtran o transforman en cada paso. Como el procesamiento es secuencial, el orden de los comandos importa y afecta tanto al resultado como al rendimiento. DQL se usa en Notebooks, Dashboards y Workflows.',
        'fetch carga registros de una tabla (logs, spans, events, bizevents…). Las métricas se consultan con timeseries, un comando de inicio que carga, filtra y agrega datos de métricas en series temporales; el comando metrics solo sirve para explorar claves y dimensiones de métricas, no para dibujar gráficos ni calcular. No confundas DQL con DPL (Dynatrace Pattern Language), el lenguaje de patrones que usan parse y los procesadores para extraer campos, ni con la sintaxis de statements de las políticas IAM.',
        'Cada señal tiene su forma: una métrica es una serie temporal de valores numéricos (por ejemplo, CPU por minuto); un evento registra un hecho puntual con timestamp y atributos (un deployment, un reinicio, una alerta); un log es un registro emitido por un proceso; y una trace distribuida muestra el recorrido de una petición entre servicios en spans, con la duración de cada llamada (también a bases de datos).',
      ],
      code: 'fetch logs\n| filter loglevel == "ERROR"\n| summarize errores = count(), by: {host.name}\n| sort errores desc',
      codeNote: 'Cada comando recibe la salida del anterior: se cargan logs, se filtran los ERROR, se cuentan por host y se ordenan.',
      comparison: {
        headers: ['Necesidad', 'Comando o lenguaje', 'No confundir con'],
        rows: [
          ['Leer registros de logs, spans o eventos', 'fetch', 'timeseries (métricas)'],
          ['Series temporales de métricas', 'timeseries', 'metrics (solo explorar claves)'],
          ['Extraer campos con patrones', 'DPL dentro de parse', 'DQL'],
          ['Conceder acceso a datos', 'Políticas IAM', 'Segments (solo filtran)'],
        ],
      },
      sourceRefs: [
        { title: 'Grail data lakehouse', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        {
          title: 'Dynatrace Grail (schema-on-read, sin índices)',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Query Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language',
          kind: 'official-docs',
        },
        {
          title: 'DQL guide',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-guide',
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
      id: 'sup-buckets-permissions',
      title: 'Buckets, retención y permisos en Grail',
      lead: 'La retención la decide el bucket; lo que ve cada usuario, sus políticas.',
      paragraphs: [
        'Grail organiza los datos en buckets, tables y views. Cada bucket está asociado a un único tipo de registro (logs, events, spans…) y tiene una retención propia; la tabla logs, por ejemplo, lee de todos los buckets de logs. OpenPipeline asigna cada registro a un bucket durante la ingesta (bucket assignment), así que el tiempo que se conserva un log lo define la retención del bucket al que va: ni OneAgent, ni el timeframe de una consulta DQL, ni las políticas IAM fijan la retención.',
        'Los buckets built-in (los default_ y los de sistema dt_) no se pueden modificar. Si necesitas otra retención, creas un bucket custom, que admite retenciones de 1 día a 10 años, más una semana adicional. Con la configuración por defecto, default_logs, default_bizevents y default_events guardan 35 días, default_spans 10 días y default_metrics 15 meses: unas métricas de hace tres semanas siguen disponibles, pero sus spans ya no.',
        'Para consultar datos hacen falta dos capas de permisos: el permiso de tabla (storage:logs:read para fetch logs, storage:spans:read para spans o storage:metrics:read para timeseries) y el permiso de bucket storage:buckets:read, que puede limitarse a ciertos buckets. En las tablas almacenadas en buckets, la lectura necesita los dos: sin storage:buckets:read sobre los buckets que contienen los datos, o sin el permiso de la tabla, no se obtienen esos registros, aunque exista el otro permiso. Además, las políticas pueden restringir registros concretos con condiciones sobre campos como dt.security_context, y storage:fieldsets:read controla el acceso a los campos sensibles agrupados en fieldsets. Por eso la misma consulta, con el mismo timeframe, puede devolver 0 registros a un usuario y miles a otro.',
        'En Classic, las management zones servían a la vez para filtrar vistas y para restringir accesos. En Latest, los segments filtran los datos de forma dinámica al consultar, pero no sustituyen el control de acceso de las management zones: el acceso lo deciden las políticas IAM, apoyadas en atributos como dt.security_context.',
      ],
      comparison: {
        headers: ['Bucket built-in', 'Tabla', 'Retención por defecto'],
        rows: [
          ['default_logs', 'logs', '35 días'],
          ['default_spans', 'spans', '10 días'],
          ['default_metrics', 'metrics', '15 meses'],
          ['default_bizevents', 'bizevents', '35 días'],
          ['default_events', 'events', '35 días'],
        ],
      },
      warning: 'Un resultado vacío no prueba que no haya datos: revisa el timeframe, la retención del bucket y los permisos de tabla y de bucket.',
      sourceRefs: [
        {
          title: 'Data organization in Grail (buckets, tables, views)',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data',
          kind: 'official-docs',
        },
        {
          title: 'Assign permissions in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail',
          kind: 'official-docs',
        },
        {
          title: 'From management zones to segments',
          url: 'https://docs.dynatrace.com/docs/platform/upgrade/foundations/upgrade-guide-segments',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-openpipeline',
      title: 'OpenPipeline: procesar antes de almacenar',
      lead: 'Lo que se transforma, enmascara o enruta ocurre en la ingesta, no al consultar.',
      paragraphs: [
        'OpenPipeline es la solución de Dynatrace para ingerir y procesar datos de distintas fuentes antes de guardarlos en Grail. Actúa en la ingesta, dentro de la plataforma: no es un módulo de OneAgent, no se aplica cuando DQL lee los datos y no mueve registros entre buckets cuando caducan. Cuando un registro termina de recorrer el pipeline, se envía a almacenamiento y queda disponible para el análisis.',
        'Un pipeline se compone de stages que se ejecutan en orden: Processing, Smartscape node, Smartscape edge, Permission, Product allocation, Cost allocation, Bucket assignment, Metric extraction, Davis y Data extraction. Processing prepara los datos (parsear valores en campos, transformar, filtrar o enmascarar) antes de almacenarlos; por eso es el lugar para enmascarar datos sensibles que no deben llegar a Grail. No existen stages de índices ni de retención: Grail no usa índices y la retención es una propiedad del bucket.',
      ],
      bullets: [
        'Processing: parsear, transformar, filtrar y enmascarar antes de guardar.',
        'Permission: aplica security context a los registros.',
        'Bucket assignment: decide en qué bucket (y, por tanto, con qué retención) se guarda el registro.',
        'Metric extraction, Davis y Data extraction: derivan métricas, Davis events u otros tipos de datos a partir de los registros.',
      ],
      warning: 'Reemplazar un valor en una consulta DQL o restringir un fieldset oculta el dato al leerlo, pero el valor original sigue almacenado en Grail.',
      sourceRefs: [
        { title: 'OpenPipeline', url: 'https://docs.dynatrace.com/docs/platform/openpipeline', kind: 'official-docs' },
        {
          title: 'OpenPipeline processing',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing',
          kind: 'official-docs',
        },
        {
          title: 'Assign permissions in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-smartscape',
      title: 'Smartscape: entidades, tiers y relaciones',
      lead: 'La topología explica por qué un fallo en un host acaba afectando a una aplicación.',
      paragraphs: [
        'Smartscape Classic muestra cinco tiers verticales: Applications, Services, Processes, Hosts y Data centers; de abajo arriba, Data centers → Hosts → Processes → Services → Applications. El tier Data centers indica dónde residen los hosts: una ubicación física, un data center de VMware, una Availability Zone de AWS o una región de Azure.',
        'Las relaciones horizontales son las llamadas entrantes y salientes dentro de cada tier, como un Service que llama a otro Service. Las relaciones verticales muestran la dependencia full-stack entre tiers: una aplicación usa servicios, los servicios los atienden procesos y los procesos corren en hosts. Por eso, si un host cae, caen las Process Group Instances que ejecutaba y el impacto sube hacia los Services y Applications que dependen de ellas.',
        'Un Process Group es un clúster lógico de procesos que pertenecen a la misma aplicación o unidad de despliegue y cumplen la misma función en varios hosts; una Process Group Instance (PGI) es una ejecución concreta de ese grupo en un host. Un Service representa la funcionalidad que se invoca (peticiones web, RPC, consultas) y lo atienden los procesos de un Process Group, estén en el host o nodo que estén: un microservicio desplegado en 10 pods repartidos en 3 nodos sigue siendo un único Service atendido por varias instancias.',
        'La topología no se dibuja a mano: se construye con lo que observa OneAgent (procesos y su comunicación proceso a proceso), las APIs de las plataformas cloud y las stages Smartscape node y Smartscape edge de OpenPipeline. Para ver qué servicios y bases de datos llama un servicio y con qué volumen se usa Service flow (desde Services Classic, View service flow): muestra la secuencia de llamadas que desencadena cada petición, incluidas las llamadas a database services, el número de peticiones analizadas, el porcentaje de ellas que llega a cada servicio o base de datos y cómo contribuye cada llamada al response time. Smartscape indica con flechas si las llamadas de un servicio son entrantes o salientes, pero no muestra su volumen.',
        'En Latest, Smartscape on Grail guarda las entidades como nodos y las relaciones (runs_on, calls, relates_to…) como aristas, y se consultan con DQL mediante smartscapeNodes y smartscapeEdges.',
      ],
      comparison: {
        headers: ['Relación', 'Dirección', 'Ejemplo'],
        rows: [
          ['Llamada', 'Horizontal (mismo tier)', 'Service → Service'],
          ['Ejecución', 'Vertical (entre tiers)', 'Process Group Instance → Host'],
          ['Agrupación', 'Lógica', 'Process Group → sus PGIs'],
        ],
      },
      sourceRefs: [
        {
          title: 'Smartscape Classic',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape-classic',
          kind: 'official-docs',
        },
        {
          title: 'Smartscape on Grail',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/platform/grail/smartscape-on-grail',
          kind: 'official-docs',
        },
        {
          title: 'Process groups',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups',
          kind: 'official-docs',
        },
        {
          title: 'Service flow',
          url: 'https://docs.dynatrace.com/docs/observe/application-observability/services-classic/service-flow',
          kind: 'official-docs',
        },
        {
          title: 'Service flow filtering',
          url: 'https://docs.dynatrace.com/docs/observe/application-observability/services-classic/service-flow/service-flow-filtering',
          kind: 'official-docs',
        },
        {
          title: 'How OneAgent works',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-oneagent',
      title: 'OneAgent, ActiveGate y OpenTelemetry',
      lead: 'Un agente por host, comunicación saliente y modos que deciden la profundidad.',
      paragraphs: [
        'OneAgent es un conjunto de procesos especializados que se instala una vez por host: monitoriza el sistema operativo, detecta los procesos y se inyecta (code modules) en tecnologías compatibles como Java, Node.js o .NET para obtener visibilidad a nivel de código. También inyecta un tag de JavaScript en las páginas que sirven los servidores web monitorizados para obtener datos de Real User Monitoring, y monitoriza ficheros de log. Tras instalarlo, hay que reiniciar los procesos que ya estaban en marcha para poder monitorizarlos en profundidad.',
        'La comunicación de OneAgent con Dynatrace es solo saliente: Dynatrace nunca inicia la comunicación con OneAgent, de modo que no hay que abrir puertos entrantes. OneAgent puede conectar directamente con Dynatrace o a través de uno o varios ActiveGates opcionales. Un Environment ActiveGate actúa como proxy seguro entre los OneAgents y Dynatrace (útil en redes aisladas), monitoriza tecnologías por API de forma remota (AWS, VMware, Azure, Kubernetes, SNMP, Prometheus…) y puede ejecutar synthetic monitors desde ubicaciones privadas; no almacena datos de Grail ni ejecuta Workflows.',
        'Los modos de monitorización deciden la profundidad. Full-Stack ofrece visibilidad a nivel de código, tracing y profiling, además de la monitorización de infraestructura. Infrastructure Monitoring cubre infraestructura física y virtual (métricas de host, procesos, disco, red y memoria), log monitoring y AIOps, pero excluye tracing y profiling: un host que pasa de Full-Stack a Infrastructure pierde distributed tracing, la visibilidad a nivel de código y el profiling. Discovery mode da métricas básicas para descubrir hosts y procesos, solo está disponible con DPS y consume la capability Foundation & Discovery (host-hours).',
        'Cuando OneAgent captura logs, los enriquece automáticamente con atributos generales (host.name, log.source, loglevel…), atributos del modelo de entidades (dt.entity.host, dt.entity.process_group, dt.source_entity…) y trace_id y span_id, que conectan cada log con la traza de la petición que lo generó. host.name, dt.entity.process_group o dt.source_entity relacionan el log con entidades; para saltar a la traza concreta se usa trace_id.',
        'Dynatrace también acepta OpenTelemetry: la API OTLP recibe trazas, métricas y logs en /api/v2/otlp por HTTP con protobuf binario (http/protobuf); gRPC y JSON no están soportados. OneAgent y OpenTelemetry usan el formato W3C Trace Context, lo que permite propagar el contexto de traza en entornos mixtos.',
        'Para confirmar que un método concreto es lento hace falta visibilidad de código (Full-Stack): las trazas distribuidas del servicio con desglose por método (method hotspots en Classic) muestran el tiempo de cada método, algo que no ofrecen la vista de host, los logs ni Service flow, que muestra relaciones entre servicios.',
      ],
      comparison: {
        headers: ['Modo', 'Incluye', 'Excluye'],
        rows: [
          ['Full-Stack', 'Código, tracing, profiling e infraestructura', '—'],
          ['Infrastructure', 'Métricas de host, procesos, red, disco, logs y AIOps', 'Tracing y profiling'],
          [
            'Discovery (solo DPS)',
            'Métricas básicas para descubrir hosts y procesos',
            'Tracing, profiling y la mayoría de analíticas de infraestructura',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'How OneAgent works',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works',
          kind: 'official-docs',
        },
        {
          title: 'Install OneAgent on Linux (reinicio de procesos)',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/installation-and-operation/linux/installation/install-oneagent-on-linux',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'Automatic log enrichment',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-oa/lma-log-data-transformation-oa',
          kind: 'official-docs',
        },
        { title: 'Dynatrace ActiveGate', url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate', kind: 'official-docs' },
        { title: 'OTLP API ingest', url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/otlp-api', kind: 'official-docs' },
        {
          title: 'Span and trace context propagation',
          url: 'https://docs.dynatrace.com/docs/observe/application-observability/distributed-tracing/tracking-transactions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dps',
      title: 'Dynatrace Platform Subscription (DPS): consumo por capability',
      lead: 'Un compromiso anual, un rate card y una unidad de medida por capability.',
      paragraphs: [
        'Con DPS la organización firma un acuerdo (normalmente de 1 a 3 años) con un compromiso anual mínimo, y el consumo se acumula contra ese compromiso según un rate card que fija el precio por unidad de cada capability. Todas las capabilities —Full-Stack Monitoring, Log – Ingest & Process, Automation Workflow, Runtime Application Protection…— se consumen contra el mismo compromiso, cada una con su unidad. Las Host Units, las tarifas por usuario y las licencias separadas por producto no forman parte de DPS.',
        'Si el uso crece (por ejemplo, más logs durante Black Friday), la ingesta sigue: el consumo extra se descuenta del compromiso y, una vez alcanzado, se puede seguir usando Dynatrace con consumo on-demand sin overage premiums. Como el compromiso se consume por capability y no por máquinas concretas, una migración de servidores on-premises a Kubernetes desplaza el consumo hacia capabilities como Kubernetes Platform Monitoring (pod-hours) sin cambiar de contrato.',
        'Full-Stack Monitoring se mide en GiB-hours (memoria de cada host monitorizado por hora), así que un host con más memoria consume más; Infrastructure Monitoring se mide en host-hours. Las métricas se facturan en Metrics – Ingest & Process por data point ingerido: cada combinación distinta de valores de dimensiones crea una serie nueva, así que dimensiones de alta cardinalidad (order_id, user_id) disparan series y data points; esos identificadores encajan mejor como atributos de logs, spans o Business Events. Las consultas de logs consumen Log – Query por GiB escaneado y conservar logs más tiempo consume Log – Retain en GiB-days.',
        'Con DPS, Adaptive Traffic Management ajusta automáticamente cada 15 minutos la tasa de muestreo de trazas para que el volumen capturado no supere el volumen de trazas incluido con Full-Stack (calculado por GiB de memoria monitorizada); el recuento total de peticiones se mantiene con alta precisión estadística. El coste y el uso se consultan en Account Management > Subscription > Overview: resumen de presupuesto con previsión, desglose de coste y uso de los últimos 30 días por capability y entorno, y análisis con filtros.',
      ],
      comparison: {
        headers: ['Capability', 'Unidad', 'Qué mide'],
        rows: [
          ['Full-Stack Monitoring', 'GiB-hour', 'Memoria por host monitorizado y hora'],
          ['Infrastructure Monitoring', 'host-hour', 'Host monitorizado por hora'],
          ['Foundation & Discovery', 'host-hour', 'Host en modo ligero (Discovery) por hora'],
          ['Kubernetes Platform Monitoring', 'pod-hour', 'Pods de Kubernetes por hora'],
          ['Log – Ingest & Process', 'GiB ingested', 'Bytes comprimidos ingeridos'],
          ['Log – Retain', 'GiB-day', 'Bytes almacenados × días de retención'],
          ['Log – Query', 'GiB scanned', 'Datos escaneados por cada consulta DQL'],
          ['Metrics – Ingest & Process', 'data point', 'Data points de métricas ingeridos'],
          ['Automation Workflow', 'workflow-hour', 'Workflows activos por hora'],
        ],
      },
      sourceRefs: [
        {
          title: 'Dynatrace Platform Subscription',
          url: 'https://docs.dynatrace.com/docs/manage/subscriptions-and-licensing/dynatrace-platform-subscription',
          kind: 'official-docs',
        },
        {
          title: 'DPS capabilities and units',
          url: 'https://docs.dynatrace.com/docs/license/capabilities-and-units',
          kind: 'official-docs',
        },
        {
          title: 'Subscription overview (DPS)',
          url: 'https://docs.dynatrace.com/docs/manage/account-management/license-subscription/subscription-overview-dps',
          kind: 'official-docs',
        },
        {
          title: 'Adaptive Traffic Management with DPS',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/adaptive-traffic-management/adaptive-traffic-management-saas-dps',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-data-to-decision',
      title: 'De la telemetría a una decisión operativa',
      lead: 'La plataforma adquiere valor cuando puedes explicar qué ocurrió, a quién afecta y qué acción está autorizada.',
      paragraphs: [
        'Una métrica, un log, un trace, un user event o un security finding son señales con formas y semánticas diferentes. La investigación Associate consiste en reconocer la señal, ubicarla en una entidad o record type, buscar relaciones y decidir qué aplicación o consulta reduce la incertidumbre. Una respuesta técnicamente correcta debe conservar el contexto: qué dato se observó, en qué ventana, con qué permisos y con qué limitación.',
        'El camino habitual no es lineal. Un Problem puede llevarte a un servicio; el servicio puede abrir una traza; la traza puede explicar un error de frontend; el frontend puede relacionarse con un journey o Business Event; y una acción de Workflow puede notificar o remediar. El examen evalúa que sepas elegir el siguiente paso con mayor valor diagnóstico, no que abras todas las aplicaciones disponibles.',
        'Cada señal se lee desde su propia fuente en DQL. Las métricas se cargan con el comando `timeseries`, que combina carga, filtrado y agregación en una serie temporal (no con `fetch`); los logs, con `fetch logs`; las trazas distribuidas, formadas por spans, con `fetch spans`; las interacciones de usuarios reales capturadas por RUM se guardan como user events y se consultan con `fetch user.events`; y los hallazgos de seguridad, como las vulnerabilidades, están en la tabla `security.events` (`fetch security.events`). Filtrar logs por `span_id` solo devuelve logs enlazados a trazas, no las trazas.',
      ],
      bullets: [
        'Señal: el hecho observable y su timestamp.',
        'Contexto: entidad, topología, atributos, usuario o negocio.',
        'Hipótesis: explicación que todavía debe contrastarse.',
        'Evidencia: consulta, detalle, gráfico o configuración reproducible.',
        'Acción: comunicación, corrección o automatización dentro del permiso disponible.',
      ],
      sourceRefs: [
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-platform-apps',
      title: 'Navegación y apps clave de la plataforma',
      lead: 'Dónde está cada cosa y para qué sirve cada app de Latest Dynatrace.',
      paragraphs: [
        'El Dock es el panel lateral desde el que se abren las apps; con Pin to dock se anclan las más usadas. La búsqueda de la plataforma se abre con Ctrl+K (Windows/Linux) o Cmd+K (Mac) y encuentra apps instaladas, Dashboards, Notebooks, Workflows, settings, métricas y entidades monitorizadas como hosts, process groups o services. Launcher permite crear launchpads: páginas de inicio personalizables, propias o compartidas, con bloques Links, Markdown y Cards. Dynatrace Hub es el catálogo donde se descubren e instalan apps y extensiones.',
        'Que una extensión aparezca en Hub no significa que recopile datos: hay que añadirla al entorno (Add to environment) y crear su monitoring configuration según su origen de datos (SNMP, WMI, Prometheus, bases de datos…). Hasta entonces no hay ingesta.',
        'Notebooks está pensado para el análisis ad hoc, el troubleshooting de incidentes complejos, la documentación y la colaboración: combina DQL y Markdown en un documento que se comparte con el equipo y que otros pueden volver a ejecutar. Dashboards sirve para la monitorización continua y en tiempo real: una visión de alto nivel de la salud del sistema, el seguimiento de KPIs y el cumplimiento de SLOs. Ambos se pueden compartir y ambos visualizan métricas, logs y eventos.',
        'AutomationEngine es el motor que ejecuta Workflows. Un workflow se dispara con un event trigger (un Problem, un Davis event u otro evento ingerido en OpenPipeline), con un schedule trigger (a intervalos o a una hora fija, por ejemplo un informe nocturno) o on-demand, cuando alguien o una llamada a la API lo lanza. Para ejecutarse sin intervención humana sirven los triggers de evento y de horario.',
        'AppEngine permite construir apps personalizadas sobre los datos de la plataforma: el Dynatrace App Toolkit sirve para crearlas, construirlas y desplegarlas, con TypeScript, React y el design system Strato, y las apps se ejecutan en el runtime de la plataforma, no en servidores del cliente.',
      ],
      comparison: {
        headers: ['Necesidad', 'Dónde', 'No confundir con'],
        rows: [
          ['Abrir y anclar apps', 'Dock (Pin to dock)', 'Launcher'],
          ['Página de inicio personalizada', 'Launcher (launchpads)', 'Dock'],
          ['Descubrir e instalar apps y extensiones', 'Hub', 'Platform search'],
          ['Encontrar un host, una app o un Notebook', 'Platform search (Ctrl/Cmd+K)', 'Hub'],
          ['Investigación ad hoc documentada', 'Notebooks', 'Dashboards'],
          ['Monitorización continua de KPIs y SLOs', 'Dashboards', 'Notebooks'],
        ],
      },
      sourceRefs: [
        {
          title: 'Navigate the Dynatrace platform',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
        {
          title: 'Platform search',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/search',
          kind: 'official-docs',
        },
        {
          title: 'Launchpads',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/launchpads',
          kind: 'official-docs',
        },
        {
          title: 'Manage extensions',
          url: 'https://docs.dynatrace.com/docs/ingest-from/extensions/manage-extensions',
          kind: 'official-docs',
        },
        {
          title: 'When to use Dashboards or Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/differences-dashboards-notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Workflow triggers',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/trigger',
          kind: 'official-docs',
        },
        { title: 'Dynatrace AppEngine', url: 'https://docs.dynatrace.com/docs/platform/appengine', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-problem-davis',
      title: 'Davis event, Problem, root cause e impact',
      lead: 'Estos conceptos están relacionados, pero no son sinónimos.',
      paragraphs: [
        'Un Davis event representa una anomalía o evento individual: una métrica que se desvía, un proceso que se cae, una degradación o un cambio informativo. Dynatrace Intelligence correlaciona eventos relacionados usando contexto temporal y topológico y presenta un Problem como situación agregada con causa e impacto. Por eso una pregunta que pide “cada anomalía individual” apunta a Davis events, mientras que una pregunta que pide “la situación correlacionada y su blast radius” apunta a Problem.',
        'Root cause identifica el candidato que mejor explica el incidente; impact muestra las entidades y posibles usuarios o aplicaciones afectados. El orden importa: no conviertas la primera entidad roja en una certeza sin revisar el árbol de causa, las dependencias y la evidencia temporal. Las correlaciones son una ayuda de investigación y deben leerse junto con el dato original.',
      ],
      comparison: {
        headers: ['Concepto', 'Qué representa', 'Uso en investigación'],
        rows: [
          ['Davis event', 'Anomalía o evento individual', 'Consultar señal y momento concreto'],
          ['Problem', 'Situación correlacionada', 'Priorizar incidente y ver conjunto afectado'],
          ['Root cause', 'Candidato causal principal', 'Empezar el drill-down técnico'],
          ['Impact', 'Alcance del efecto', 'Estimar blast radius y prioridad'],
        ],
      },
      sourceRefs: [
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        { title: 'What is Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-problems-lifecycle',
      title: 'Problems: correlación, severidad y ciclo de vida',
      lead: 'Cómo nace, crece y se cierra un Problem, y cómo se investiga.',
      paragraphs: [
        'Dynatrace Intelligence (antes Davis AI) aplica un análisis determinista basado en causalidad sobre Grail y el grafo de dependencias de Smartscape: no agrupa alertas solo porque coincidan en el tiempo ni elige como causa la primera que se disparó, sino que usa las dependencias reales para determinar qué anomalía explica a las demás. Combina las anomalías relacionadas en un único Problem, lo que reduce drásticamente la carga de alertas: ante una caída de red que afecta a cientos de servicios y hosts se abre un solo Problem con el fallo de red como root cause, en lugar de una alerta por entidad.',
        'Los Davis events representan incidencias individuales: un umbral superado, una degradación respecto al baseline o un hecho puntual como la caída de un proceso. Un Problem agrupa todos los eventos que comparten la misma root cause en una única situación rastreable. En la app Problems, la root cause aparece resaltada y la sección Affected entities lista las entidades afectadas (frontends, services, infrastructure…): la root cause es la entidad que, según las dependencias, explica la degradación de las demás, no la que más eventos acumula ni la primera en el tiempo.',
        'Las categorías de evento, de mayor a menor severidad, son: Monitoring unavailable, Availability, Error, Slowdown, Resource, Custom, Info y Warning. Un Problem adopta la severidad más alta de sus eventos y puede escalar durante su vida: si a un Problem de Slowdown se le fusiona un evento Availability, pasa a Availability. Los eventos Info (deployments, cambios de configuración, acciones administrativas) no abren Problems, pero aportan contexto: Dynatrace Intelligence correlaciona cambios de código, deployments y configuración para explicar qué cambió.',
        'Un Problem se cierra cuando se cierran todos sus Davis events o cuando alguien lo cierra manualmente. Un Problem cerrado nunca se reabre: si vuelven eventos relacionados activos, se abre un Problem nuevo. Si un Problem dura más de 90 minutos, a partir de ese momento no se le fusionan eventos nuevos y se abre otro Problem. Para cerrarlo a mano en la app Problems (uno a uno o hasta 50 en bloque) siempre hay que escribir un comentario de cierre, que se guarda en Grail como annotation event; cerrar no borra datos.',
        'En DQL, dt.davis.problems es una vista con el estado actual de cada Problem (deduplicado), mientras que dt.davis.problems.snapshots guarda una instantánea cada vez que el Problem se actualiza; contar filas de snapshots sobrestima el número de Problems. dt.davis.events contiene Davis events, no Problems.',
        'Ante un Problem abierto, la secuencia más eficaz es revisar su impacto y timeframe, ir a la root cause que señala y confirmarla con trazas y logs de esa entidad. Recorrer Smartscape o las trazas a mano repite la correlación que el Problem ya hizo, y notificar a los dueños de cada entidad afectada actúa sobre los efectos en lugar de sobre la causa.',
        'Los problem alerting profiles no detectan anomalías ni agrupan eventos: filtran qué notificaciones de Problems se entregan y por qué canal (Slack, PagerDuty, Opsgenie…) según severidad, duración, management zones, eventos y tags. Para un cambio planificado se define una maintenance window (puntual o recurrente), que suprime las notificaciones de alerta durante el trabajo, excluye la interrupción planificada de los cálculos de disponibilidad y conserva los datos en Grail.',
      ],
      comparison: {
        headers: ['Pregunta', 'Respuesta documentada'],
        rows: [
          ['¿Cuándo se cierra un Problem?', 'Al cerrarse todos sus Davis events, o manualmente con comentario'],
          ['¿Se reabre?', 'No: los nuevos eventos activos crean otro Problem'],
          ['¿Hasta cuándo se le fusionan eventos?', 'Hasta 90 minutos después de abrirse'],
          ['¿Qué severidad muestra?', 'La más alta de sus eventos'],
          ['¿Abre Problem un evento Info?', 'No; aporta contexto de cambio'],
        ],
      },
      sourceRefs: [
        { title: 'Dynatrace Intelligence', url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence', kind: 'official-docs' },
        {
          title: 'Root cause analysis concepts (problem lifecycle)',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Event categories',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/event-analysis-and-correlation/event-categories',
          kind: 'official-docs',
        },
        { title: 'Problems app', url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/problems-app', kind: 'official-docs' },
        {
          title: 'Semantic Dictionary: Davis events and problems',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/semantic-dictionary/model/davis',
          kind: 'official-docs',
        },
        {
          title: 'Problem alerting profiles',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/alerting-profiles',
          kind: 'official-docs',
        },
        {
          title: 'Maintenance windows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/alerting-and-notifications/maintenance-windows',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-anomaly-ai',
      title: 'Detección de anomalías y las AI de Dynatrace Intelligence',
      lead: 'Elegir el modelo de umbral adecuado y saber qué hace cada tipo de AI.',
      paragraphs: [
        'Los custom anomaly detectors admiten tres modelos. Un static threshold es un límite fijo que la métrica no debe superar; como no cambia con el tiempo, es el adecuado para límites críticos y para problemas que crecen poco a poco, como una fuga de memoria lenta, que un umbral adaptativo acabaría acompañando. Un auto-adaptive threshold usa los datos de los últimos siete días: el percentil 99 de las medidas por minuto es el baseline y se le suma n veces la signal fluctuation (el rango intercuartílico entre p25 y p75); el umbral se recalcula cada día.',
        'El seasonal baseline aprende el comportamiento estacional de la métrica con los valores por minuto de los últimos 14 días y crea automáticamente una banda de confianza: tolera los picos previsibles, como los del horario laboral, y detecta desviaciones fuera de ese patrón.',
        'Además del causal AI, Dynatrace Intelligence ofrece predictive AI: la forecast analysis predice valores futuros de cualquier serie temporal numérica (por ejemplo, para anticipar cuándo se llenará un disco) y se puede lanzar desde Notebooks. Dynatrace Assist (antes Davis CoPilot) es el asistente de AI generativa: traduce preguntas en lenguaje natural a DQL (y puede ejecutarla), explica consultas existentes y resume Problems con su root cause y pasos de remediación. Sus respuestas deben contrastarse con datos observables.',
      ],
      comparison: {
        headers: ['Modelo', 'Cómo fija el umbral', 'Cuándo encaja'],
        rows: [
          ['Static threshold', 'Valor fijo definido por el usuario', 'Límites críticos y degradaciones lentas (fugas de memoria)'],
          ['Auto-adaptive threshold', 'p99 de los últimos 7 días + n × rango intercuartílico', 'Métricas sin patrón estacional claro'],
          ['Seasonal baseline', 'Banda de confianza aprendida con 14 días', 'Métricas con picos previsibles (horario laboral)'],
        ],
      },
      sourceRefs: [
        {
          title: 'Static thresholds',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/anomaly-detection/static-thresholds',
          kind: 'official-docs',
        },
        {
          title: 'Auto-adaptive thresholds for anomaly detection',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/anomaly-detection/auto-adaptive-threshold',
          kind: 'official-docs',
        },
        {
          title: 'Seasonal baseline',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/reference/ai-models/seasonal-baseline',
          kind: 'official-docs',
        },
        {
          title: 'Forecast analysis',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/reference/ai-models/forecast-analysis',
          kind: 'official-docs',
        },
        {
          title: 'Agentic and generative AI (Dynatrace Assist)',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/agentic-and-generative-ai',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-security-business-dem',
      title: 'Seguridad, negocio y experiencia digital en la misma plataforma',
      lead: 'El mismo agente y el mismo almacén sirven para seguridad, negocio y experiencia de usuario.',
      paragraphs: [
        'Application Security usa el mismo OneAgent en runtime. Runtime Vulnerability Analytics identifica vulnerabilidades de terceros y a nivel de código en producción, y el Dynatrace Security Score ajusta el riesgo de cada una con el contexto de topología, más allá del CVSS base. Runtime Application Protection detecta y bloquea en tiempo real ataques como la inyección SQL con información a nivel de código. Security Posture Management evalúa configuraciones frente a estándares de hardening. No es un escáner aparte ni un análisis de código fuente durante el build (SAST).',
        'Los Business Events aportan datos de negocio (importe, ID de producto, tipo de póliza) con la precisión que exigen los casos de negocio, sin depender del muestreo, y se guardan en la tabla bizevents. Se obtienen con reglas de captura de OneAgent, por API desde sistemas externos, con OpenPipeline o desde RUM.',
        'Real User Monitoring (RUM) mide la experiencia de los usuarios reales en navegadores y apps móviles; Synthetic Monitoring ejecuta monitores programados desde ubicaciones públicas o privadas que comprueban disponibilidad y rendimiento aunque no haya tráfico real. Son complementarios.',
      ],
      sourceRefs: [
        { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security', kind: 'official-docs' },
        { title: 'Business Observability', url: 'https://docs.dynatrace.com/docs/observe/business-observability', kind: 'official-docs' },
        {
          title: 'Synthetic Monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'How OneAgent works',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-evidence-quality',
      title: 'Calidad de evidencia y límites',
      lead: 'Un resultado vacío, una recomendación de AI o un gráfico bonito no son conclusiones por sí solos.',
      paragraphs: [
        'Antes de interpretar, pregunta si el dato pudo existir: ¿la tecnología está soportada?, ¿el agente o integración está habilitado?, ¿el pipeline aceptó y persistió la señal?, ¿la consulta usa el record type correcto?, ¿el timeframe contiene el evento?, ¿la identidad puede leerlo? Esta secuencia evita responder que “no hay problemas” cuando en realidad falta una fuente o un permiso.',
        'La documentación oficial delimita el comportamiento, pero el tenant puede tener una versión, licencia, configuración o política de acceso distinta. En la aplicación, cada explicación indica estas condiciones y la fuente asociada. Estudia el principio estable y después practica el matiz que convierte una afirmación verdadera en una respuesta incorrecta cuando se omite el contexto.',
        'Dos ejemplos frecuentes. Record type equivocado: las peticiones a un servicio, con su duración, se guardan como spans y se consultan con `fetch spans`; una consulta `fetch logs` que filtra por duración no las encontrará aunque existan. Permisos: leer logs exige el permiso de tabla `storage:logs:read` y además `storage:buckets:read` sobre el bucket que los guarda (para spans, `storage:spans:read`); sin el permiso de bucket no se obtienen los datos aunque se tenga el de tabla. Si un compañero ve los registros y tú no, la ingesta funciona: revisa tus políticas y el timeframe de tu consulta. Grail no necesita crear ni reconstruir índices antes de consultar.',
      ],
      bullets: [
        'Dato no observado no significa necesariamente dato inexistente.',
        'Una capability listada en Hub no implica instalación ni ingestión activa.',
        'Una recomendación de Davis no sustituye la evidencia del entorno.',
        'La retención, el sampling y los permisos condicionan lo que puedes recuperar.',
      ],
      sourceRefs: [
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Event analysis and correlation',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/event-analysis-and-correlation',
          kind: 'official-docs',
        },
        { title: 'Problems app', url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/problems-app', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-associate-transfer',
      title: 'Cómo convertir el path en dominio',
      lead: 'Cada apartado debe terminar en una explicación, una decisión y una práctica.',
      paragraphs: [
        'Para cada objetivo, estudia primero una definición con vocabulario oficial; después reconstruye el flujo de datos; luego compara el concepto con su vecino más parecido; finalmente resuelve un escenario con una restricción. Por ejemplo, OneAgent no se domina sabiendo que “monitoriza”: hay que distinguir qué recopila en cada modo, cuándo inyecta, cómo comunica y qué debes revisar si falta un dato.',
        'El banco de preguntas usa esa misma progresión. Las preguntas de conocimiento recuperan hechos; las de precisión detectan condiciones omitidas; las de escenario obligan a elegir; las de troubleshooting ordenan comprobaciones; y las mini-prácticas interpretan consultas o configuraciones. Un acierto sin poder justificar la fuente se considera dominio frágil.',
      ],
      bullets: [
        'Explica el concepto sin mirar.',
        'Diferéncialo de dos distractores cercanos.',
        'Aplica el concepto con una restricción realista.',
        'Revisa fuente, variante, permisos y fecha si es un dato sensible.',
      ],
      sourceRefs: [
        { title: 'Problems app', url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/problems-app', kind: 'official-docs' },
        {
          title: 'Smartscape concepts',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-concepts',
          kind: 'official-docs',
        },
        {
          title: 'Smartscape core entities',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Puedo explicar el ciclo señal → entidad → relación → impacto → acción.',
    'Sé diferenciar al menos cinco parejas de conceptos cercanos.',
    'Puedo justificar por qué una fuente oficial es necesaria.',
    'Puedo describir mi estrategia de estudio y revisión de errores.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
