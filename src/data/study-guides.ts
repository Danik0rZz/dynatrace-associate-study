export const studyGuides: Record<string, string[]> = {
  welcome: [
    'Dynatrace se presenta como una plataforma unificada para observar el entorno, investigar problemas y convertir datos técnicos en decisiones. La ruta Associate debe leerse como un mapa transversal: no estudies cada capacidad como una isla.',
    'La navegación recomendada parte de la experiencia o del síntoma, conserva el contexto entre entidades y llega a la dependencia que explica el impacto. Smartscape, Problems, Notebooks, Dashboards y DQL cumplen papeles distintos dentro de ese recorrido.',
    'En esta aplicación, cada concepto se traduce a una decisión: reconocer la capacidad, elegir la vista adecuada, consultar la fuente y explicar por qué una alternativa cercana no encaja.',
  ],
  instructions: [
    'El apartado de instrucciones convierte la preparación en una lista verificable: revisar el learning path, practicar conceptos en un entorno disponible, organizar la documentación y conocer las condiciones del proveedor del examen.',
    'La experiencia recomendada no debe confundirse con un requisito absoluto ni con una garantía de aprobado. Es una señal para planificar práctica, especialmente cuando el objetivo exige pasar de una definición a un escenario operativo.',
    'El formato y los requisitos externos pueden cambiar. Por eso la guía conserva fecha, variante y enlace vivo, y marca como referencia cualquier detalle que deba confirmarse antes de reservar.',
  ],
  platform: [
    'La plataforma se entiende mejor como un conjunto de capacidades conectadas: la UI orienta, Grail contiene datos consultables, Dynatrace Hub descubre aplicaciones e integraciones y Support Center complementa la ayuda de producto.',
    'La búsqueda de plataforma, los launchpads y las páginas de entidad reducen el tiempo entre una pregunta y la evidencia. La clave no es memorizar dónde está cada botón, sino reconocer qué contexto debe conservarse al cambiar de aplicación.',
    'Relaciona observabilidad, seguridad, negocio y automatización con una misma disciplina: reunir datos, entender relaciones, validar una hipótesis y actuar dentro de los permisos disponibles.',
  ],
  observability: [
    'OneAgent observa procesos y tecnologías compatibles desde el entorno monitorizado. ActiveGate cubre conectividad, monitorización remota o extensibilidad cuando la arquitectura lo requiere; no son intercambiables por defecto.',
    'La investigación conecta aplicaciones, services, process groups, hosts, bases de datos y Kubernetes. El valor está en el modelo de entidades y dependencias, no en mirar una métrica aislada sin contexto.',
    'Cuando aparezca AI o Davis en un escenario, busca primero la señal, la entidad y la evidencia que la sustenta. Una recomendación automática ayuda a priorizar, pero no sustituye el diagnóstico ni la verificación de alcance.',
  ],
  notebooks: [
    'Un Notebook sirve para explorar, consultar, documentar y compartir un análisis reproducible. Puede combinar resultados, visualizaciones y Markdown para que otra persona entienda la pregunta, la evidencia y la conclusión.',
    'Un Dashboard prioriza seguimiento continuo, comunicación y visibilidad de indicadores. La elección depende de la frecuencia, la audiencia, el grado de exploración y si la vista debe funcionar como referencia operativa.',
    'Antes de construir cualquiera de los dos, fija la pregunta y la fuente de datos. Después enlaza la consulta o el tile con documentación, timeframe y límites para no confundir presentación con diagnóstico.',
  ],
  'business-dem': [
    'Business Analytics observa hechos relevantes para el negocio mediante Business Events y otras capacidades de análisis. El objetivo es conectar una acción —por ejemplo, checkout o login— con contexto técnico y resultado empresarial.',
    'Real User Monitoring describe la experiencia de usuarios reales; Synthetic Monitoring ejecuta recorridos o comprobaciones controladas. Ambos responden preguntas distintas y no deben presentarse como sustitutos.',
    'La lectura correcta separa señal, fuente y propósito: user event no es automáticamente Business Event, una prueba sintética no representa todos los usuarios y una métrica técnica no es por sí sola una métrica de negocio.',
  ],
  'data-analysis': [
    'Analizar datos implica fijar timeframe, seleccionar dimensiones, comparar segmentos y expresar qué evidencia soporta la conclusión. Una visualización clara no corrige una pregunta mal definida ni un filtro demasiado amplio.',
    'Performance, sesiones, comportamiento y reportes deben leerse con su unidad y granularidad. Distingue una métrica agregada, una distribución de eventos y una secuencia de usuario antes de elegir una operación.',
    'Un buen reporte separa observación, interpretación e hipótesis causal. Incluye la consulta o el origen, el periodo, los filtros y una limitación para que otra persona pueda reproducir la lectura.',
  ],
  dql: [
    'DQL es el lenguaje de consulta de Dynatrace para explorar y analizar datos en Grail. La estructura habitual encadena comandos: fetch obtiene un tipo de registro, filter reduce el conjunto y fields deja visibles los campos que interesan.',
    'summarize agrega por dimensiones; timeseries representa una evolución temporal y no debe usarse como sustituto automático de cualquier agregación. sort y limit ayudan a controlar la salida y a hacer explícita la intención.',
    'La precisión depende del tipo de dato, del nombre del campo, del timeframe y del volumen. Antes de afirmar que no hay datos, prueba una consulta mínima y separa un problema de consulta de uno de ingestión o permisos.',
  ],
  security: [
    'Application Security relaciona vulnerabilidades con aplicaciones y contexto de ejecución para priorizar investigación y remediación. La prioridad no se decide leyendo únicamente el nombre o la severidad.',
    'Distingue riesgos de código propio, dependencias de terceros y exposición del entorno. Security Advisor e Investigations ayudan a ordenar evidencia, pero cada flujo conserva sus requisitos, permisos y alcance.',
    'En una pregunta de seguridad, busca la afirmación exacta: una vulnerabilidad no es lo mismo que un Problem operativo, una recomendación no demuestra remediación y una librería de terceros no se convierte en código propio por estar en el mismo proceso.',
  ],
  automation: [
    'AutomationEngine permite diseñar Workflows que reaccionan a triggers, consultan contexto y ejecutan acciones. El workflow es una secuencia controlada, no una promesa de que cualquier integración o actor tenga permisos ilimitados.',
    'Un diseño sólido declara actor, credenciales o permisos, alcance, entradas, manejo de errores y resultado. Las acciones de escritura deben ser explícitas y revisables, sobre todo cuando se disparan desde una señal operativa.',
    'Separa automatización de ingestión: un workflow puede actuar sobre datos disponibles, mientras que el canal de ingestión determina cómo llegan, se procesan y se conservan los datos.',
  ],
  ingestion: [
    'La ingestión debe pensarse como un recorrido completo: origen, transporte, autenticación, procesamiento, persistencia, permisos y consulta. Que una regla exista no prueba que el dato haya sido aceptado ni que sea visible para la persona.',
    'Logs, métricas y trazas tienen mecanismos y contratos distintos. OneAgent, APIs, OpenTelemetry, cloud integrations, OpenPipeline y ActiveGate se eligen según el tipo de señal, el origen y la arquitectura.',
    'Cuando una señal falta, evita saltar directamente al Dashboard. Comprueba primero una muestra en el origen, el matcher o pipeline, la ruta de almacenamiento, el timeframe y una consulta mínima; después considera volumen, cardinalidad, retención y coste.',
  ],
  other: [
    'Smartscape muestra entidades y relaciones topológicas para navegar por dependencias. Una entidad es el objeto técnico; una relación expresa cómo se conecta con otro objeto en el modelo observable.',
    'En Log Management and Analytics, la investigación comienza acotando tiempo, fuente, severidad o patrón. Después se parsea el contenido para extraer campos y se relaciona la evidencia con la entidad correspondiente.',
    'Dynatrace Hub funciona como catálogo de aplicaciones, extensiones e integraciones. Descubrir una opción en el Hub no significa que esté instalada, configurada, autorizada o produciendo datos: esos estados deben verificarse por separado.',
  ],
}
