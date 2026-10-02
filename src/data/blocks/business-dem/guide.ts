import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Business Analytics and DEM».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Business Analytics and DEM conecta datos de negocio con la experiencia digital. Para dominarlo debes separar qué ocurrió, cómo lo vivieron los usuarios, cómo se comprobó sintéticamente y cómo se procesó el dato antes de analizarlo. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Definir Business Event y business-grade data.',
    'Diferenciar RUM, Synthetic Monitoring, user event y session.',
    'Describir captura, procesamiento, análisis y visualización.',
    'Elegir fuentes y propiedades para un journey de negocio.',
    'Aplicar el modelo de campos, sesión y evento con precisión.',
    'Evaluar completitud, cardinalidad, privacidad y retención.',
  ],
  sections: [
    {
      id: 'business-events',
      title: 'Business Events y datos de negocio',
      lead: 'Un Business Event representa un hecho de negocio con precisión y contexto.',
      paragraphs: [
        'Un event es una acción o acontecimiento; se convierte en Business Event cuando genera datos de negocio útiles. El modelo busca información completa, consultable, en tiempo real, granular y con contexto topológico. Esto permite analizar acciones como compras, pagos, logins, suscripciones o reclamaciones.',
        'Los campos identificadores como event.provider y event.type dan consistencia. El Semantic Dictionary ayuda a mantener nombres y significados comunes. En una pregunta, no confundas “evento de usuario” con “Business Event”: el propósito, el modelo y el origen importan.',
      ],
      bullets: [
        'Completo: se capturan eventos sin depender de una muestra.',
        'Accesible: se pueden consultar sin extrapolar.',
        'Granular: los eventos no se convierten automáticamente en una cifra agregada.',
        'Topology-aware: pueden relacionarse con entidades técnicas.',
        'Unified: se consultan en Grail mediante DQL.',
      ],
      sourceRefs: [
        { title: 'Business Observability', url: 'https://docs.dynatrace.com/docs/observe/business-observability', kind: 'official-docs' },
        {
          title: 'Basic concepts of Business Observability',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
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
      id: 'capture-process',
      title: 'Captura y procesamiento',
      lead: 'La calidad del análisis nace antes del Dashboard.',
      paragraphs: [
        'Business Events pueden proceder de OneAgent, RUM JavaScript API, Mobile OneAgent, OpenKit, logs, spans, fuentes externas mediante API o una acción de Workflow. La elección depende del origen, del control que tengas y del contexto que necesites conservar.',
        'OpenPipeline y reglas de procesamiento pueden filtrar, parsear, enriquecer, transformar, enmascarar, descartar o asignar retención. Una regla mal acotada puede eliminar datos, multiplicar cardinalidad o exponer información. Comprueba orden, matcher, scope y evidencia de aceptación o rechazo.',
        'Para web y mobile hay tres vías de captura en el propio cliente: la RUM JavaScript API (dynatrace.sendBizEvent()) en aplicaciones web que se ejecutan en el navegador; OneAgent for Mobile en apps nativas Android e iOS (y frameworks como Flutter, React Native o .NET MAUI); y OpenKit en clientes propios sin navegador, como un quiosco o una aplicación de escritorio. La RUM JavaScript API no se carga en una app nativa, y un monitor sintético no genera los hechos de negocio reales del dispositivo.',
      ],
      bullets: [
        'Captura: ¿de dónde sale el hecho?',
        'Proceso: ¿qué campos se normalizan o protegen?',
        'Persistencia: ¿dónde queda y cuánto tiempo?',
        'Consulta: ¿qué permisos y dataset necesito?',
        'Visualización: ¿qué KPI o journey representa?',
      ],
      sourceRefs: [
        {
          title: 'Basic concepts of Business Observability',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
          kind: 'official-docs',
        },
        {
          title: 'Business event capture',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing',
          kind: 'official-docs',
        },
        {
          title: 'Business event ingestion API',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'rum-synthetic',
      title: 'RUM frente a Synthetic Monitoring',
      lead: 'Son complementarios, no intercambiables.',
      paragraphs: [
        'Real User Monitoring observa interacciones reales en aplicaciones web, mobile o híbridas. Aporta rendimiento, errores, comportamiento y propiedades para segmentar usuarios y acciones. Synthetic Monitoring ejecuta pruebas automatizadas: Browser Monitor o Clickpath simulan recorridos, HTTP Monitor comprueba recursos o endpoints y las integraciones sintéticas pueden aportar datos de terceros.',
        'RUM responde “qué viven los usuarios reales y a qué escala”. Synthetic responde “¿puedo comprobar de forma controlada que un recorrido o endpoint funciona?”. Un monitor sintético no representa a todos los usuarios y RUM no garantiza una prueba proactiva de cada ruta.',
      ],
      comparison: {
        headers: ['Capacidad', 'Fuente', 'Pregunta principal'],
        rows: [
          ['RUM', 'Interacción real', '¿Cómo experimentan los usuarios?'],
          ['Browser Monitor / Clickpath', 'Recorrido automatizado', '¿Funciona el journey controlado?'],
          ['HTTP Monitor', 'Request o endpoint', '¿Está disponible y responde?'],
          ['Business Event', 'Hecho de negocio', '¿Qué acción empresarial ocurrió?'],
        ],
      },
      sourceRefs: [
        {
          title: 'Business event capture',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing',
          kind: 'official-docs',
        },
        {
          title: 'Business event ingestion API',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
        {
          title: 'Business event enrichment',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'journeys',
      title: 'Journeys, propiedades y análisis',
      lead: 'Un journey conecta pasos de usuario con resultado.',
      paragraphs: [
        'Construye un journey con pasos observables y un criterio de finalización. Captura las propiedades que permitan segmentar sin depender de texto ambiguo: identificador de pedido, canal, producto, región o resultado. Evalúa cardinalidad, sensibilidad y permisos antes de almacenar.',
        'El flujo completo es capture/process → analyze → visualize. DQL consulta Business Events en Notebooks, Dashboards o apps como Business Flow. Si el KPI requiere todos los eventos, no lo reemplaces por una métrica muestreada sin declarar la diferencia.',
      ],
      code: 'fetch bizevents\n| filter event.type == "checkout.completed"\n| summarize count(), by: {event.provider}',
      codeNote: 'Ejemplo didáctico: valida los nombres de campos y el tipo de evento disponibles en tu entorno.',
      sourceRefs: [
        {
          title: 'Business event ingestion API',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
        {
          title: 'Business event enrichment',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment',
          kind: 'official-docs',
        },
        {
          title: 'Business event processing',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-event-processing',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'event-model',
      title: 'Modelo de Business Event',
      lead: 'Los campos mínimos y el propósito separan un evento útil de un mensaje suelto.',
      paragraphs: [
        'Un Business Event necesita una identidad de proveedor y de tipo para que el dato pueda clasificarse y consultarse con consistencia. event.provider y event.type son obligatorios en el modelo documentado; event.category puede aportar contexto, pero no sustituye los campos requeridos.',
        'Los campos adicionales deben tener semántica estable: identificadores, valores, moneda, canal, producto, región o resultado. El Semantic Dictionary ayuda a alinear nombres y definiciones; una propiedad con alta cardinalidad o datos sensibles debe revisarse antes de capturarse.',
      ],
      bullets: [
        'Proveedor: quién origina el hecho.',
        'Tipo: qué hecho ocurrió.',
        'Categoría: clasificación adicional cuando aplica.',
        'Propiedades: contexto de análisis.',
        'Entidad: relación técnica o de experiencia.',
        'Privacidad: qué debe enmascararse o limitarse.',
      ],
      sourceRefs: [
        {
          title: 'Business event enrichment',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment',
          kind: 'official-docs',
        },
        {
          title: 'Business event processing',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-event-processing',
          kind: 'official-docs',
        },
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'user-events',
      title: 'Business Event frente a user event',
      lead: 'La misma interacción puede generar señales con propósitos diferentes.',
      paragraphs: [
        'Un user event describe una interacción de usuario dentro del modelo RUM: click, acción, navegación u otra actividad observada. Un Business Event representa un hecho de negocio que puede originarse desde RUM, OneAgent u otras fuentes y que se analiza con semántica empresarial, como una compra completada o una reclamación creada.',
        'No conviertas automáticamente cada click en un KPI de negocio. El evento debe representar el hecho que la organización quiere medir y contener los campos necesarios para evitar inferencias frágiles.',
      ],
      comparison: {
        headers: ['Señal', 'Pregunta', 'Error de examen'],
        rows: [
          ['User event', '¿Qué interacción realizó el usuario?', 'Llamarlo Business Event sin contexto'],
          ['Business Event', '¿Qué hecho de negocio ocurrió?', 'Inferirlo de una métrica técnica'],
          ['User session', '¿Qué recorrido tuvo una sesión?', 'Contarla como una transacción'],
          ['Metric', '¿Cómo evoluciona una medida?', 'Tratarla como evidencia de cada evento'],
        ],
      },
      sourceRefs: [
        {
          title: 'Business event processing',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-event-processing',
          kind: 'official-docs',
        },
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
        {
          title: 'Business reporting',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-reporting',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'rum-sessions',
      title: 'RUM, sessions y final de sesión',
      lead: 'Una sesión no dura simplemente lo que dura una pestaña abierta.',
      paragraphs: [
        'En web RUM, una sesión termina cuando se cumplen condiciones documentadas como inactividad, cierre del navegador, duración máxima o una finalización explícita por API. La guía oficial describe 30 minutos de inactividad, cierre del navegador, seis horas de duración o dtrum.endSession() como condiciones relevantes.',
        'El final de sesión cambia cómo interpretas usuarios, journeys y conversiones. Una pestaña abierta sin actividad no demuestra una sesión activa indefinida. Lee siempre la definición del modelo RUM antes de comparar sesiones o atribuir una acción.',
      ],
      bullets: [
        'Inactividad: 30 minutos.',
        'Cierre: el navegador finaliza el contexto.',
        'Duración máxima: 6 horas.',
        'API: dtrum.endSession() puede terminarla explícitamente.',
        'Análisis: conserva la definición de sesión usada.',
      ],
      sourceRefs: [
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
        {
          title: 'Business reporting',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-reporting',
          kind: 'official-docs',
        },
        {
          title: 'Real User Monitoring model',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/rum',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'dem-components',
      title: 'DEM: RUM, Synthetic y journeys',
      lead: 'Digital Experience Management combina observación real y controlada.',
      paragraphs: [
        'RUM recoge experiencia de usuarios reales a escala y con variabilidad natural. Synthetic ejecuta pruebas planificadas desde ubicaciones o condiciones controladas. Los journeys de negocio conectan pasos, eventos y resultados para explicar impacto; ninguno de estos componentes sustituye por completo a los demás.',
        'Si el caso pide validar disponibilidad antes de que haya tráfico, Synthetic es la vía controlada. Si pide conocer qué porcentaje de usuarios reales sufre una degradación, RUM aporta la población observada. Si pide cuántas compras se completaron, Business Events proporciona el hecho de negocio.',
      ],
      comparison: {
        headers: ['Pregunta', 'Capacidad', 'Por qué'],
        rows: [
          ['¿Qué viven usuarios reales?', 'RUM', 'Observa sesiones e interacciones reales'],
          ['¿Funciona un recorrido controlado?', 'Synthetic', 'Repite pruebas planificadas'],
          ['¿Qué hecho comercial ocurrió?', 'Business Events', 'Conserva semántica de negocio'],
          ['¿Qué pasos forman una conversión?', 'Journey', 'Relaciona eventos y resultado'],
        ],
      },
      sourceRefs: [
        {
          title: 'Business reporting',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-reporting',
          kind: 'official-docs',
        },
        {
          title: 'Real User Monitoring model',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/rum',
          kind: 'official-docs',
        },
        {
          title: 'RUM data model',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'business-quality',
      title: 'Completitud, cardinalidad y privacidad',
      lead: 'Business-grade data debe ser útil y gobernable.',
      paragraphs: [
        'La calidad de un Business Event incluye completitud, coherencia, granularidad, disponibilidad y contexto. Si faltan identificadores o resultados, el análisis puede contar eventos pero no explicar el journey. Si sobran dimensiones de alta cardinalidad, el coste y la consulta se degradan.',
        'Evalúa PII, secretos, identificadores, retención y permisos antes de capturar. Enmascarar o descartar un campo puede ser correcto por privacidad, pero cambia el análisis: documenta la limitación para no presentar una conclusión con falsa precisión.',
        'El masking de OpenPipeline se aplica en el stage Processing, antes de almacenar: en Grail queda solo el valor enmascarado, no una copia cifrada del original que un permiso permita leer, y DQL ve ese valor enmascarado. Desactivar el masking solo afecta a los eventos que lleguen después. Por eso un campo enmascarado deja de servir como identificador fiable para contar clientes únicos: hay que documentar el límite y usar otra clave adecuada.',
      ],
      bullets: [
        'Completitud del hecho.',
        'Consistencia de nombres y tipos.',
        'Cardinalidad de propiedades.',
        'Sensibilidad y masking.',
        'Retención y acceso.',
        'Impacto en KPI y journey.',
      ],
      sourceRefs: [
        {
          title: 'Real User Monitoring model',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/rum',
          kind: 'official-docs',
        },
        {
          title: 'RUM data model',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model',
          kind: 'official-docs',
        },
        {
          title: 'User sessions in web frontends',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-bizevents-governance',
      title: 'Business-grade data, metadatos, buckets y privacidad',
      lead: 'La definición oficial de business-grade data y la retención en Grail condicionan cómo se diseña el almacenamiento.',
      paragraphs: [
        'La documentación define business-grade data con nueve rasgos: complete (todos los eventos se capturan sin sampling), fully accessible (se consultan sin extrapolación), real-time (los eventos están disponibles inmediatamente después de producirse), unconstrained (sin límite al número de eventos), granular (los eventos no se agregan con el tiempo), long-term (retención de hasta diez años), topology-aware (se guardan con contexto de topología), available from multiple sources (OneAgent, RUM, logs y fuentes externas) y unified (en un único almacén, Grail, consultable con un solo lenguaje de consulta). Sus metadatos son event.provider, obligatorio, que indica la fuente del evento (el componente o sistema que lo generó); event.type, obligatorio, el identificador único del tipo de evento; y event.category, opcional, una categorización estándar basada en ITIL.',
        'Los Business Events se guardan por defecto en el bucket default_bizevents, con 35 días de retención, y se consultan con fetch bizevents; los user events de RUM van al bucket default_user_events (también 35 días) y se consultan en user.events. default_logs retiene 35 días y default_spans 10 días. Los buckets custom admiten retenciones de 1 a 3657 días (unos diez años) y el procesador Bucket assignment de OpenPipeline enruta los registros elegidos a ellos.',
        'Si un dato sensible, como el email de un cliente, no es necesario para el análisis, lo correcto es no capturarlo en la capture rule o editarlo y enmascararlo en la etapa de processing de OpenPipeline antes de que se almacene. Limitar quién ve un Dashboard o filtrarlo en DQL deja el dato guardado en Grail.',
      ],
      sourceRefs: [
        {
          title: 'Basic concepts of Business Observability',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
          kind: 'official-docs',
        },
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
        {
          title: 'Processing in OpenPipeline',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'business-troubleshooting',
      title: 'Diagnosticar un KPI de negocio vacío',
      lead: 'Sigue el evento desde la captura hasta la visualización.',
      paragraphs: [
        'Si un KPI no aparece, comprueba que el hecho se generó en origen, que tiene event.provider y event.type, que el parser o enrichment conserva los campos, que el evento se persiste en el record type esperado y que la query usa el nombre, timeframe y permisos correctos.',
        'No cambies RUM por Synthetic ni uses una métrica técnica como sustituto sin explicar el cambio de significado. Una prueba sintética que pasa demuestra un recorrido controlado; no demuestra que todas las compras reales estén completándose.',
        'Los Business Events se guardan en Grail en la tabla bizevents y se consultan con fetch bizevents: una consulta fetch logs no los encuentra aunque el filtro por event.type sea correcto. Para leerlos, la política del usuario necesita el permiso de tabla storage:bizevents:read, además de storage:buckets:read sobre los buckets; storage:events:read da acceso a otra tabla (events) y bizevents.ingest es el scope de un access token para ingerir por la API, no un permiso de lectura.',
      ],
      bullets: [
        'Origen y método de captura.',
        'Campos obligatorios y propiedades.',
        'Pipeline y reglas de drop/mask.',
        'Record type y retención.',
        'Query, filtros y permisos.',
        'Interpretación del resultado.',
      ],
      sourceRefs: [
        {
          title: 'RUM data model',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model',
          kind: 'official-docs',
        },
        {
          title: 'User sessions in web frontends',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web',
          kind: 'official-docs',
        },
        {
          title: 'Real User and Synthetic Monitoring overview',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/real-user-synthetic-monitoring',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-business-event-model',
      title: 'Business Events y business-grade data',
      lead: 'Un hecho se convierte en Business Event cuando aporta precisión útil para el negocio.',
      paragraphs: [
        'Business Observability usa Business Events para representar acciones u ocurrencias con datos de negocio. El modelo exige metadatos consistentes como `event.provider` y `event.type`; `event.category` puede clasificar el hecho. Los eventos se capturan, procesan y analizan. Processing puede filtrar, parsear, enriquecer, transformar, extraer métricas, asignar seguridad y fijar retención antes de consultar con DQL.',
        'Business-grade data se caracteriza por completitud, accesibilidad, disponibilidad en tiempo real, granularidad, contexto de topología y retención a largo plazo (long-term: hasta diez años, según la retención del bucket). Esto no significa que cualquier user event sea Business Event ni que la ausencia de sampling elimine duplicados, errores de modelado o problemas de captura. La pregunta de negocio debe definir qué hecho, identificador y dimensión necesita.',
        'En OpenPipeline, «asignar seguridad» es tarea de un stage propio: el stage Permission aplica el security context a los registros que cumplen su condición mediante el procesador Set dt.security_context, y ese campo dt.security_context permite controlar el acceso a nivel de registro (record-level access). No lo hace Processing (que parsea, transforma, filtra y enmascara), ni Bucket assignment (que elige el bucket de almacenamiento), ni Data extraction (que extrae Business Events o SDLC events a partir de los registros).',
      ],
      comparison: {
        headers: ['Concepto', 'Significado', 'Error frecuente'],
        rows: [
          ['User event', 'Evento del comportamiento del usuario', 'Llamarlo Business Event automáticamente'],
          ['Business Event', 'Hecho con datos business-grade', 'Confundirlo con una métrica técnica'],
          ['Business KPI', 'Indicador derivado para una decisión', 'Consultar un único evento como tendencia'],
          ['Journey', 'Secuencia de acciones/eventos', 'Inferirlo de una sola métrica'],
        ],
      },
      sourceRefs: [
        { title: 'Business Observability', url: 'https://docs.dynatrace.com/docs/observe/business-observability', kind: 'official-docs' },
        {
          title: 'Basic concepts of Business Observability',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
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
      id: 'deep-business-capture',
      title: 'Captura, ingestión y enriquecimiento',
      lead: 'El origen determina qué campos se generan automáticamente y qué debes configurar.',
      paragraphs: [
        'Business Events pueden venir de OneAgent, RUM JavaScript API, OneAgent for Mobile, OpenKit, fuentes externas mediante `/bizevents/ingest`, logs y spans mediante OpenPipeline o acciones de Workflows. OneAgent puede capturar payloads en vuelo según reglas; las fuentes externas necesitan enviar el formato y metadatos requeridos. El API admite JSON y CloudEvents y tiene límites de payload y autenticación específicos.',
        'Dynatrace puede enriquecer eventos con información de aplicación, geolocalización, dispositivo y otros contextos, pero la forma exacta depende del origen. Cuando el evento nace en un API externo, no asumas que tiene los mismos campos automáticos que uno capturado por RUM o OneAgent. Revisa `event.provider`, `event.type`, timestamp, identificador de usuario y gobierno de datos antes de construir KPIs.',
        'El enriquecimiento automático depende del origen. Un Business Event capturado por OneAgent en un servicio backend recibe timestamp, dt.entity.host, dt.entity.process_group_instance, event.id, campos event.* y contexto de traza (span_id, trace_id, trace_sampled y traceparent). Los Business Events de RUM reciben en cambio campos de aplicación, sesión (dt.rum.session.id), dispositivo, sistema operativo, navegador (browser.name…) y geolocalización (geo.country.name, geo.city.name…).',
      ],
      bullets: [
        'OneAgent: captura contextual desde servicios instrumentados.',
        'RUM/Mobile/OpenKit: eventos ligados a experiencia digital.',
        'API: control explícito del payload y autenticación.',
        'OpenPipeline: procesamiento de logs/spans y rutas.',
        'Workflow: generación de eventos desde automatización.',
      ],
      sourceRefs: [
        {
          title: 'Business event ingestion API',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
        {
          title: 'Business event enrichment',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment',
          kind: 'official-docs',
        },
        {
          title: 'Business event processing',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-event-processing',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-bizevents-api',
      title: 'Business events API y Workflows',
      lead: 'Las fuentes externas envían Business Events por API; un Workflow puede generarlos con una acción.',
      paragraphs: [
        'Los sistemas externos sin OneAgent, como un ERP o una pasarela de pago, envían Business Events por POST a /api/v2/bizevents/ingest. El endpoint admite JSON puro (application/json), CloudEvents (application/cloudevent+json o application/cloudevents+json) y lotes de CloudEvents (application/cloudevents-batch+json). La Business events API limita el payload a 5 MB por petición. Con un access token Classic, la autenticación exige el scope Ingest bizevents (bizevents.ingest); con un platform token, el scope openpipeline:bizevents:ingest. events.ingest es el scope de los eventos genéricos de /api/v2/events/ingest.',
        'En CloudEvents, source se convierte en event.provider, type en event.type e id en event.id. En JSON puro no hay campos obligatorios: si faltan, event.provider y event.type toman el valor Unknown y event.category el valor Other. El campo event.kind se fija siempre en BIZ_EVENT, sea cual sea el valor recibido. Dynatrace guarda los campos de primer nivel como campos de primer nivel en Grail, pero convierte los objetos JSON complejos (por ejemplo, un objeto customer anidado) en strings.',
        'Un Workflow puede generar Business Events con la acción Ingest business event, por ejemplo para ingerir a diario tipos de cambio de divisa o datos de un sistema no monitorizado. La acción necesita el permiso storage:events:write en los authorization settings del Workflow.',
      ],
      code: 'POST https://{environment-id}.live.dynatrace.com/api/v2/bizevents/ingest\nContent-Type: application/cloudevent+json\nAuthorization: Api-Token <token con bizevents.ingest>\n\n{ "specversion": "1.0", "source": "erp.billing", "type": "com.acme.invoice.created", "id": "inv-7781", "data": { "amount": 129.9 } }',
      codeNote: 'source → event.provider, type → event.type, id → event.id.',
      sourceRefs: [
        {
          title: 'Business events API (external sources)',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-external-sources',
          kind: 'official-docs',
        },
        {
          title: 'Business event enrichment',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment',
          kind: 'official-docs',
        },
        {
          title: 'Business events from Workflows',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-workflows-overview',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-bizevents-capture-sources',
      title: 'Capture rules, RUM y OpenPipeline como fuentes de Business Events',
      lead: 'Sin tocar el código se pueden obtener Business Events de requests de servicios, de logs y de spans.',
      paragraphs: [
        'OneAgent captura Business Events de servicios backend (Java, .NET, Node.js, Go y webservers como Apache, NGINX o IIS) con capture rules, sin modificar el código. Cada regla define event.provider, event.type y, opcionalmente, event.category; los triggers indican cuándo se crea el evento (path, método, headers, query, body o status de la request) y se combinan con lógica AND, de modo que deben cumplirse todas las condiciones; los data fields extraen atributos del payload JSON o XML, como accountId o amount. Hay que reiniciar el proceso de la aplicación antes de poder capturar Business Events de él, y la captura de request/response body está limitada por defecto a unos 64 KiB.',
        'En el frontend, dynatrace.sendBizEvent() envía Business Events desde la RUM JavaScript API. Los Business Events de RUM solo se capturan en sesiones monitorizadas: si el RUM JavaScript está desactivado, por un método específico o por cost and traffic control, esos eventos no se reportan. Los Business Events de RUM se enriquecen con dispositivo, navegador, aplicación, geolocalización (geo.country.name, geo.city.name…) y campos dt.rum.* como dt.rum.session.id; los capturados por OneAgent reciben en cambio dt.entity.host, dt.entity.process_group_instance, trace_id y span_id.',
        'Para logs y spans ya ingeridos se añade un procesador Business event en un pipeline de OpenPipeline, con event.type y event.provider estáticos y una condición de coincidencia. En el caso de los spans hay que configurar además dynamic routing para que los spans correctos lleguen a ese pipeline, por ejemplo con matchesPhrase(service.name, "payment.service").',
      ],
      bullets: [
        'Las capture rules de OneAgent y el procesador Business event de OpenPipeline obtienen Business Events sin modificar el código de la aplicación.',
        'dynatrace.sendBizEvent() y la Business events API requieren añadir llamadas en el código que emite el evento.',
      ],
      comparison: {
        headers: ['Origen', 'Mecanismo', 'Requisito clave'],
        rows: [
          ['Servicio con OneAgent', 'Capture rules', 'Reiniciar el proceso; triggers con AND'],
          ['Frontend web o mobile', 'dynatrace.sendBizEvent()', 'Solo en sesiones monitorizadas'],
          ['Logs', 'Procesador Business event en OpenPipeline', 'Pipeline de logs con el procesador'],
          ['Spans', 'Procesador Business event en OpenPipeline', 'Dynamic routing hacia ese pipeline'],
          ['Sistema externo', '/api/v2/bizevents/ingest', 'bizevents.ingest; 5 MB por petición'],
        ],
      },
      sourceRefs: [
        {
          title: 'Get business events via OneAgent',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-oneagent',
          kind: 'official-docs',
        },
        {
          title: 'Business events from web and mobile RUM',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/web-and-mobile-rum',
          kind: 'official-docs',
        },
        {
          title: 'Business event enrichment',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment',
          kind: 'official-docs',
        },
        {
          title: 'Business events from logs and spans',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-capturing/bo-events-capturing-logs-and-spans',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-rum-session-semantics',
      title: 'RUM en Grail: tablas user.events vs user.sessions y lifecycle',
      lead: 'RUM describe usuarios reales; comprende las tablas en Grail y el ciclo de vida de sesión.',
      paragraphs: [
        'En Latest Dynatrace, la telemetría de Digital Experience se organiza en dos tablas principales en Grail: `user.events` (que contiene cada evento de interacción atómico: clics, navegaciones, errores de JavaScript y cargas de página) y `user.sessions` (que almacena el registro consolidado de la sesión de usuario, su duración total y propiedades agregadas).',
        'En web frontends, una user session termina tras 30 minutos de inactividad del navegador, al cerrar el navegador, al alcanzar 6 horas de duración o de forma programática con `dtrum.endSession()` de la RUM JavaScript API; son las condiciones que documenta la página User sessions in web frontends, tanto en la nueva experiencia RUM como en RUM Classic. El modelo de datos de la nueva experiencia RUM las resume de forma genérica (una sesión termina tras un periodo de inactividad o al alcanzar la duración máxima), y en Grail la tabla user.sessions guarda el motivo en el campo end_reason, cuyos valores documentados son timeout (la sesión expiró), duration (alcanzó la duración máxima) y synthetic_execution_finished (terminó una ejecución sintética).',
        'Las dos tablas se relacionan con dt.rum.session.id: cada user event lleva el identificador de su sesión, el campo documentado para unir user events con user sessions en DQL. Por eso contar valores distintos de dt.rum.session.id en user.events (countDistinct) da un recuento válido de sesiones; lo que solo está en user.sessions es lo que se calcula por sesión, como la duración, el bounce y las session properties.',
      ],
      comparison: {
        headers: ['Dimensión / Tabla', 'Qué contiene / Regla', 'Distractor común de examen'],
        rows: [
          [
            'Tabla user.events',
            'Eventos atómicos (clicks, web requests, errors)',
            'Buscar la duración o el bounce de la sesión en esta tabla (están en user.sessions)',
          ],
          [
            'Tabla user.sessions',
            'Sesión agregada, duración, bounce y properties',
            'Buscar eventos de clic detallados en la tabla de sesiones',
          ],
          ['Inactividad: 30 minutos', 'Cierre automático si no hay nuevas interacciones', 'Confundir con la duración máxima total'],
          [
            'Límite máximo: 6 horas',
            'Cierre forzado de sesiones muy prolongadas',
            'Creer que una sesión puede durar días ininterrumpidamente',
          ],
          [
            'dtrum.endSession()',
            'Cierre programático explícito de la sesión',
            'Creer que cerrar sesión en la app web siempre cierra la sesión RUM',
          ],
          [
            'Campo end_reason (user.sessions)',
            'Motivo de fin registrado: timeout, duration o synthetic_execution_finished',
            'Buscar en end_reason un valor propio para el cierre del navegador o para dtrum.endSession()',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
        {
          title: 'Business reporting',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-reporting',
          kind: 'official-docs',
        },
        {
          title: 'Real User Monitoring model',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/rum',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-rum-data-model',
      title: 'Modelo de datos RUM: user events, views y user actions',
      lead: 'En la nueva experiencia RUM todo se registra como user events; las user actions y las sesiones los relacionan.',
      paragraphs: [
        'RUM captura los datos como user events, que se guardan en la tabla user.events con atributos básicos y contexto como sistema operativo, geolocalización, dispositivo y navegador. Las user sessions, en la tabla user.sessions, resumen los user events del mismo usuario dentro de un periodo limitado. Hay varias clases de user events: los navigation events describen la transición de una view a otra o de una page a otra; los page summary y view summary agregan métricas de rendimiento y recuentos de errores; los user interaction events recogen clics, scroll o mouseover en web y toques, gestos o rotaciones en mobile; los request events describen llamadas HTTP con URL (url.full), método (http.request.method), código de estado (http.response.status_code) y tiempos W3C; y los error events recogen requests fallidas, excepciones no capturadas, violaciones CSP en web, y crashes y ANR en mobile.',
        'Las pages solo existen en web y corresponden a cargas completas de documento HTML. Una view es el contenido que se muestra al usuario en cada momento, en web y en mobile; en web una nueva view puede aparecer sin una carga completa de página, como ocurre al cambiar de pantalla en una SPA.',
        'Una user action es una interacción significativa iniciada por el usuario que conecta los eventos relacionados: interacciones, requests, navegaciones y errores. Su duración va desde la interacción hasta el resultado visible para el usuario, aunque intervengan varias llamadas. Los eventos de una misma acción se agrupan con user_action.instance_id, un identificador generado para cada instancia, y user_action.name describe la acción (por ejemplo, click on order on /cart). A diferencia de RUM Classic, las interacciones se capturan con independencia de que lancen una request.',
        'Las propiedades personalizadas tienen dos ámbitos: las event properties describen un user event individual y se guardan en el namespace event_properties; las session properties se agregan a nivel de sesión en el namespace session_properties de user.sessions. Las event properties se recogen con capture rules (solo web) o con las RUM APIs; las session properties, con las RUM APIs o agregándolas en OpenPipeline a partir de event properties durante la ingesta. El user identifier de la sesión se puebla con la RUM API o enriqueciéndolo en OpenPipeline a partir de una event property.',
      ],
      comparison: {
        headers: ['Concepto', 'Qué representa', 'Campo o tabla'],
        rows: [
          ['Navigation', 'Transición entre views o pages', 'user.events'],
          ['Request', 'Llamada HTTP con URL, método, status y W3C timing', 'url.full, http.request.method, http.response.status_code'],
          ['Error', 'Request fallida, excepción, CSP violation, crash o ANR', 'user.events (characteristics.has_error)'],
          ['User action', 'Interacción significativa y sus eventos relacionados', 'user_action.instance_id, user_action.name'],
          ['Event property', 'Dato de un user event individual', 'event_properties'],
          ['Session property', 'Dato agregado a la sesión', 'session_properties en user.sessions'],
        ],
      },
      warning: 'characteristics.has_error vale true cuando el user event contiene al menos un error; contar valores distintos de dt.rum.session.id sobre esos eventos da sesiones con al menos un error, no el total de sesiones.',
      sourceRefs: [
        {
          title: 'RUM data model',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model',
          kind: 'official-docs',
        },
        {
          title: 'Real User Monitoring semantic dictionary',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/rum',
          kind: 'official-docs',
        },
        {
          title: 'Request user events',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/rum/user-events/requests',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-rum-sessions-web',
      title: 'User sessions web: cierre, bounce, duración e identificadores',
      lead: 'Una user session resume los user events del mismo usuario dentro de un periodo limitado.',
      paragraphs: [
        'Una user session web termina tras 30 minutos de inactividad del navegador, cuando el usuario cierra el navegador, cuando la duración de la sesión alcanza 6 horas o de forma programática con dtrum.endSession(), que termina inmediatamente la sesión actual. Otros métodos de la RUM JavaScript API tienen funciones distintas: dtrum.identifyUser() asigna el user tag que identifica a un usuario entre navegadores, dispositivos y sesiones; dtrum.leaveAction() cierra una acción creada con enterAction; dtrum.disableSessionReplay() desactiva Session Replay.',
        'Una sesión con una sola user action o navegación se marca como bounced. Para que una sesión se registre debe capturarse al menos un evento que indique actividad del usuario: una user action o una navegación. La duración de la sesión es el tiempo entre el primer evento y la última user action o navegación; la extended duration abarca todos los eventos, incluidas las requests del navegador posteriores a que el usuario deje de usar la página. Una sesión puede recorrer varios frontends.',
        'dt.rum.session.id identifica la sesión a la que pertenece cada evento; dt.rum.instance.id identifica el navegador del usuario y, salvo que se desactive Use persistent cookies for user tracking, se guarda en una cookie persistente, por lo que sirve para reconocer usuarios recurrentes entre sesiones. RUM no impone ningún límite al número de user actions o eventos por sesión; RUM Classic tenía un límite de 200 user actions por sesión.',
      ],
      bullets: [
        'Inactividad del navegador: 30 minutos.',
        'Duración máxima: 6 horas.',
        'Bounce: una sola user action o navegación.',
        'dt.rum.session.id: sesión; dt.rum.instance.id: navegador, persistente entre sesiones.',
      ],
      sourceRefs: [
        {
          title: 'User sessions in web frontends',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/web-frontends/concepts/user-sessions-web',
          kind: 'official-docs',
        },
        {
          title: 'RUM data model',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-rum-classic',
      title: 'RUM Classic: tipos de user action, Apdex y key user actions',
      lead: 'Algunas preguntas usan todavía el modelo Classic; conviene reconocer sus conceptos propios.',
      paragraphs: [
        'En RUM Classic hay tres tipos de user action. Una load action es una carga real de página en el navegador, por ejemplo al introducir una URL, durante la que se cargan HTML, CSS e imágenes. Una XHR action se produce cuando la interacción del usuario lanza XMLHttpRequests o llamadas fetch(); Dynatrace vigila las peticiones en cascada y las modificaciones del DOM antes de cerrar la acción. Una custom action la define el equipo de desarrollo con la RUM JavaScript API para medir interacciones que la detección automática no recoge.',
        'Apdex valora la satisfacción comparando la duración de cada user action con umbrales configurables (Satisfactory, Tolerable y Frustrating), con un umbral global de 3 segundos; las acciones con errores JavaScript se valoran como Frustrated. Las interacciones importantes para el negocio, como signup, checkout o búsqueda, pueden marcarse como key user actions y recibir su propio umbral Apdex, distinto del global de la aplicación.',
      ],
      bullets: [
        'Load action: carga de página completa.',
        'XHR action: interacción que lanza XHR o fetch() sin recargar la página.',
        'Custom action: definida con la RUM JavaScript API.',
        'Key user action: Apdex propio para una acción crítica.',
      ],
      sourceRefs: [
        {
          title: 'User actions in RUM Classic',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum-classic/rum-concepts/user-actions',
          kind: 'official-docs',
        },
        {
          title: 'Apdex ratings',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum-classic/rum-concepts/scores-and-ratings/apdex-ratings',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-synthetic-semantics',
      title: 'Synthetic Monitoring y scripting con api.fail()',
      lead: 'Synthetic comprueba recorridos bajo condiciones controladas y valida aserciones de negocio.',
      paragraphs: [
        'Synthetic Monitoring ejecuta monitores HTTP y browser clickpaths desde localizaciones públicas gestionadas o privadas (mediante ActiveGate). A diferencia de RUM, que refleja el tráfico real y variado de usuarios, Synthetic ofrece una línea base de disponibilidad y tiempo de respuesta repetible bajo demanda o en un horario programado.',
        'En los pasos JavaScript avanzados de un browser clickpath, los ingenieros pueden interactuar con el DOM de la página y evaluar condiciones lógicas. Si una aserción de negocio falla (por ejemplo, el carrito muestra un importe incorrecto o falta un elemento crítico), se puede invocar el método `api.fail("mensaje de error descriptivo")`. Esto marca el paso y la ejecución del monitor como fallidos, con ese mensaje como motivo visible en los resultados.',
        'La JavaScript API de Synthetic distingue registrar de fallar: api.info(), api.warn() y api.error() solo escriben un mensaje en el log con el nivel info, warning o error, sin cambiar el resultado del paso; para marcar como fallidos el paso y la ejecución hay que llamar a api.fail(message).',
      ],
      bullets: [
        'api.fail("mensaje"): marca como fallida la ejecución desde un paso JavaScript, con un motivo legible.',
        'HTTP Monitors: validación de disponibilidad y tiempos de respuesta de endpoints REST.',
        'Browser Clickpaths: simulación de flujos de interacción completos de usuario en navegador.',
        'Private Synthetic Locations: ejecución de pruebas sintéticas tras cortafuegos internos corporativos.',
      ],
      sourceRefs: [
        {
          title: 'RUM data model',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model',
          kind: 'official-docs',
        },
        {
          title: 'User sessions in web frontends',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web',
          kind: 'official-docs',
        },
        {
          title: 'Real User and Synthetic Monitoring overview',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/real-user-synthetic-monitoring',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-synthetic-monitors',
      title: 'Tipos de monitor, locations y control de ejecuciones',
      lead: 'Synthetic ofrece tres tipos de monitor y varias formas de decidir cuándo se ejecutan y cuándo alertan.',
      paragraphs: [
        'Un HTTP monitor consiste en una o varias HTTP requests y funciona sin navegador; su tiempo de respuesta es la suma de DNS lookup time, TCP connect time, TLS handshake time, Waiting y Download. Un browser monitor usa un navegador: el single-URL monitor prueba una sola página y el clickpath reproduce un recorrido de usuario con varios pasos. Los NAM monitors comprueban la disponibilidad de hosts, dispositivos y servicios sin interfaz HTTP mediante checks ICMP, TCP y DNS, con frecuencias de 1 min a 1 h, y se ejecutan solo desde private locations.',
        'Las private Synthetic locations ejecutan HTTP, browser y NAM monitors dentro de redes corporativas sin acceso público. Pueden ser classic locations, sobre ActiveGates con Synthetic habilitado, o containerized locations sobre Kubernetes u OpenShift. Las public locations gestionadas por Dynatrace no alcanzan recursos internos.',
        'Un browser monitor se programa cada 5, 10, 15 o 30 minutos, o cada 1, 2 o 4 horas, o con la frecuencia On demand only. Una on-demand execution lanza el monitor al momento, fuera de su programación, en las locations elegidas, desde la UI, por API o desde un pipeline de CI/CD. Su processing mode decide cómo cuenta: Standard (por defecto) cuenta para disponibilidad, rendimiento y detección de Problems; Disable problem detection cuenta para disponibilidad y rendimiento, pero no para Problems; con Execution details only, las ejecuciones no cuentan en las estadísticas de disponibilidad y rendimiento ni en la detección de Problems.',
        'El outage handling define cuándo se abre un Problem: Global outage se dispara cuando fallan todas las locations; Local outage solo está disponible con al menos dos locations y alerta con fallos consecutivos en una o varias locations. El automatic retry está activado por defecto: una ejecución fallida se reintenta una vez de inmediato y solo cuenta el resultado del segundo intento, para evitar falsos positivos. Una maintenance window con Disable synthetic monitor execution impide que se ejecuten los HTTP y browser monitors de su scope. Por seguridad, Dynatrace bloquea que los monitores envíen requests a localhost.',
      ],
      comparison: {
        headers: ['Necesidad', 'Mecanismo', 'Detalle'],
        rows: [
          ['Probar endpoints sin navegador', 'HTTP monitor', 'Una o varias requests; DNS, TCP, TLS, Waiting, Download'],
          ['Recorrido de usuario en navegador', 'Browser clickpath', 'Pasos Navigate, Click, Keystroke…'],
          ['Host o servicio sin HTTP', 'NAM monitor', 'ICMP, TCP y DNS desde private locations'],
          ['Red interna', 'Private location', 'ActiveGate con Synthetic o Kubernetes/OpenShift'],
          ['Validar un despliegue', 'On-demand execution', 'UI o API; processing mode elegible'],
          ['Mantenimiento planificado', 'Maintenance window', 'Disable synthetic monitor execution'],
        ],
      },
      sourceRefs: [
        {
          title: 'Create and configure browser monitors',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/create-configure-browser-monitors',
          kind: 'official-docs',
        },
        {
          title: 'HTTP monitors in the Synthetic app',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/synthetic-details-for-http-monitors',
          kind: 'official-docs',
        },
        {
          title: 'Create a NAM monitor',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/create-a-nam-monitor-synthetic-app',
          kind: 'official-docs',
        },
        {
          title: 'Private Synthetic locations',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/private-locations',
          kind: 'official-docs',
        },
        {
          title: 'On-demand executions',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/on-demand-executions',
          kind: 'official-docs',
        },
        {
          title: 'Define a maintenance window',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/maintenance-windows/define-maintenance-window',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-clickpath-steps',
      title: 'Pasos del clickpath, esperas, validaciones y JavaScript API',
      lead: 'Cada paso del clickpath tiene un propósito; elegir bien el paso, el locator y la espera evita falsos fallos.',
      paragraphs: [
        'Los tipos de paso son Navigate, que simula escribir una URL en la barra de direcciones y cargar la página; Click, que define dónde se hace clic; Tap, su equivalente mobile; Keystroke, que captura el texto escrito en un campo; Select option, que registra la posición (Index, desde 0) y el valor de la opción elegida en una lista; JavaScript, que ejecuta fragmentos de código; y Cookie, que fija estado del navegador. Todo clickpath necesita al menos un paso Navigate y solo los pasos JavaScript pueden precederlo. En escritorio, pulsar un enlace dentro de la página crea un paso Click, no Navigate.',
        'Keystroke guarda por defecto el texto como plain text; las contraseñas deben guardarse en Credential Vault, como username/password o token, y referenciarse como credentials. Los pasos que actúan sobre un elemento (Click, Tap, Keystroke, Select option) usan locators DOM o CSS que se evalúan en orden; si un cambio de frontend modifica el DOM, el locator deja de encontrar el elemento.',
        'La wait strategy decide cuándo se considera terminado un paso: No condition, Page loads completely, A specific amount of time has passed, Any of the elements from the next step appears, Network activity is complete o The next step begins. Page loads completely espera a que termine la actividad de red tras la carga de la página; Any of the elements from the next step appears espera a que aparezca, según su locator CSS o DOM, un elemento del paso siguiente, lo que encaja cuando un script lo inserta tarde. Las content validations comprueban Visible text, un Element que contiene un texto concreto o un texto en el DOM o en cualquier recurso; si no se cumple el criterio, el paso falla y la ejecución se aborta. Cada paso puede tener además un umbral de rendimiento que genera un Problem al superarse. El browser monitor también permite bloquear requests por URL completa o patrón, por ejemplo http:*://*/*.png.',
        'En un paso JavaScript, api.fail(message) marca la ejecución como fallida con ese motivo; api.finish() completa el paso JavaScript para que continúe el siguiente; api.skipNextSyntheticEvent() omite el paso siguiente; api.setValue(key, value) y api.getValue(key) guardan y recuperan valores entre pasos; y api.getCredential(id, type) lee un credential de Credential Vault.',
      ],
      comparison: {
        headers: ['Necesidad', 'Paso o ajuste', 'No confundir con'],
        rows: [
          ['Abrir una URL', 'Navigate', 'Click en un enlace (escritorio)'],
          ['Escribir una contraseña', 'Keystroke con credentials de Credential Vault', 'Keystroke en plain text'],
          ['Elegir en un desplegable', 'Select option (Index y valor)', 'Click o Keystroke'],
          ['Esperar a un elemento tardío', 'Any of the elements from the next step appears', 'Aumentar el umbral de rendimiento'],
          ['Exigir un texto en la página', 'Content validation', 'Wait strategy'],
          ['Fallar por una regla de negocio', 'api.fail(message)', 'api.finish()'],
        ],
      },
      sourceRefs: [
        {
          title: 'Browser clickpath steps',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/create-configure-browser-monitors/browser-clickpath-steps',
          kind: 'official-docs',
        },
        {
          title: 'Steps: waiting time, validation and thresholds',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/create-configure-browser-monitors/steps-waiting-time-validation-thresholds',
          kind: 'official-docs',
        },
        {
          title: 'Create and configure browser monitors',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic/synthetic-app/create-configure-browser-monitors',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-business-journeys',
      title: 'Journeys, Business Flow y KPIs',
      lead: 'Un journey convierte eventos y acciones en una secuencia que puede medirse.',
      paragraphs: [
        'Analizar un journey implica identificar la secuencia de pasos, unir eventos con identificadores consistentes, segmentar por atributos y localizar abandono, fricción o conversión. Business Flow permite seguir procesos y KPIs en contexto, pero la calidad depende de que los eventos tengan `event.type`, provider, timestamp y claves de correlación coherentes. Una métrica técnica de latencia puede explicar fricción, pero no es automáticamente el KPI de conversión.',
        'Una pregunta de negocio bien definida incluye población, periodo, evento de inicio, evento de éxito, evento de abandono, dimensiones de segmentación y criterio de atribución. Después se comprueba que la fuente capture todos los hechos necesarios y que la retención del bucket cubra el horizonte de análisis. La aplicación tratará estas decisiones como mini-prácticas, no como vocabulario aislado.',
        'Para medir un journey, todos sus pasos deben compartir un identificador común (correlation ID), por ejemplo order_id; Business Flow lo exige para unir los pasos y reporta como KPI los flows completed (conversions). La conversión se calcula como el número de identificadores distintos que alcanzan el evento de éxito dividido entre el número de identificadores distintos que registraron el evento de inicio; ni la latencia, ni el número de sesiones, ni el total de eventos entre usuarios son la conversión.',
      ],
      bullets: [
        'Define start y success events.',
        'Valida identificadores y timestamps.',
        'Separa conteo de eventos, usuarios y sesiones.',
        'Segmenta por atributos business-grade.',
        'Comprueba retención y duplicados antes de concluir.',
      ],
      sourceRefs: [
        {
          title: 'Synthetic Monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic',
          kind: 'official-docs',
        },
        {
          title: 'Business Flow',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-flow/set-up-business-flow',
          kind: 'official-docs',
        },
        { title: 'Business Observability', url: 'https://docs.dynatrace.com/docs/observe/business-observability', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-business-flow',
      title: 'Business Flow: correlation ID, KPI y entidad BIZ_FLOW',
      lead: 'Business Flow modela los pasos de un proceso con Business Events y los une por un identificador común.',
      paragraphs: [
        'La app Business Flow define los pasos de un proceso de negocio (por ejemplo Place order y Ship order) a partir de Business Events y permite analizar su avance, sus business exceptions y un KPI. Los eventos de distintos pasos se unen como una instancia del flujo mediante un correlation ID: el correlation ID por defecto se aplica a todos los pasos, y los correlation IDs locales opcionales lo sobrescriben en los pasos donde el identificador tiene otro nombre. En cada paso se pueden designar eventos como Business exception, por ejemplo un evento de falta de stock.',
        'Al mapear el KPI del flujo, como el importe de cada pedido, solo se muestran los atributos de tipo long o double. Para ingerir la configuración como entidad BIZ_FLOW en Smartscape on Grail hace falta un flujo de al menos dos pasos con un correlation ID; así el flujo se relaciona con entidades de topología y la app Problems puede mostrar el proceso de negocio afectado y abrirlo en modo de investigación. Si se seleccionan buckets para una configuración, ese alcance se aplica a las consultas del modo de edición (selección de event types), a las consultas de análisis y al DQL de Anomaly Detection de las alertas KPI.',
      ],
      bullets: [
        'Correlation ID por defecto: se aplica a todos los pasos.',
        'Correlation ID local: sobrescribe el valor por defecto en un paso.',
        'KPI: solo atributos long o double.',
        'BIZ_FLOW: al menos dos pasos y un correlation ID.',
      ],
      sourceRefs: [
        {
          title: 'Set up Business Flow',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-flow/set-up-business-flow',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Defino Business Event sin confundirlo con user event.',
    'Puedo explicar las etapas capture → process → analyze → visualize.',
    'Sé elegir RUM, Synthetic o Business Events según la pregunta.',
    'Puedo describir un journey y sus propiedades con criterio de privacidad y cardinalidad.',
    'Recuerdo event.provider y event.type como campos obligatorios del modelo.',
    'Explico user event frente a Business Event y session.',
    'Recuerdo las condiciones relevantes de fin de sesión RUM.',
    'Elijo RUM, Synthetic o Business Event por la pregunta, no por costumbre.',
    'Diagnostico un KPI vacío desde captura hasta query.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
