import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Data, Reporting & Analysis».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Este módulo enseña a leer datos antes de convertirlos en una conclusión. La dificultad no está solo en conocer métricas: está en elegir la granularidad, el contexto y la comparación que hacen válida la respuesta. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Distinguir tipos de señal y unidad de análisis.',
    'Elegir agregación, dimensiones y periodo.',
    'Separar observación, hipótesis y causalidad.',
    'Construir reportes reproducibles.',
    'Aplicar retención, granularidad y completitud al interpretar históricos.',
    'Diferenciar métricas, key requests, sesiones, problemas y eventos.',
  ],
  sections: [
    {
      id: 'data-types',
      title: 'Qué tipo de dato estás mirando',
      lead: 'La semántica de la señal determina qué puedes concluir.',
      paragraphs: [
        'Logs son registros de texto o estructura; metrics son valores medidos o derivados; traces y spans describen recorridos y operaciones; events representan ocurrencias; user sessions y user events describen experiencia digital; bizevents representan hechos de negocio. DQL puede consultar distintos datasets, pero no todos tienen la misma semántica.',
        'Antes de agregar, identifica si una fila representa un evento, un punto de tiempo, una sesión, una entidad o un span. Contar sesiones y sumar una duración no responden a la misma pregunta que contar requests.',
      ],
      comparison: {
        headers: ['Señal', 'Unidad típica', 'Pregunta adecuada'],
        rows: [
          ['Log', 'Registro', '¿Qué mensaje o campo apareció?'],
          ['Metric', 'Valor por periodo/dimensión', '¿Cómo evoluciona una medida?'],
          ['Trace/span', 'Operación en recorrido', '¿Dónde se consume el tiempo?'],
          ['User session/event', 'Sesión o interacción', '¿Qué experiencia tuvo el usuario?'],
          ['Business Event', 'Hecho completo', '¿Qué resultado de negocio ocurrió?'],
        ],
      },
      sourceRefs: [
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        { title: 'Metrics powered by Grail', url: 'https://docs.dynatrace.com/docs/license/capabilities/metrics', kind: 'official-docs' },
        { title: 'Metrics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics', kind: 'official-docs' },
      ],
    },
    {
      id: 'timeframes',
      title: 'Timeframe, dimensiones y granularidad',
      lead: 'Un resultado sin periodo ni dimensión puede ser técnicamente correcto y operacionalmente inútil.',
      paragraphs: [
        'Fija from y to antes de comparar. Un pico puede ser un cambio real, una ventana incompleta o un efecto de agregación. Segmenta por entidad, servicio, versión, región, user type o event type solo cuando la dimensión esté disponible y tenga significado.',
        'La cardinalidad también importa: una dimensión demasiado detallada puede fragmentar la señal y dificultar la lectura; una dimensión demasiado amplia puede ocultar una población afectada. El objetivo es el nivel que responde a la decisión.',
        'Un ejemplo de efecto de agregación: si en timeseries no indicas interval ni bins, el comando divide el timeframe en intervalos iguales, calculados para que el número de puntos por serie sea adecuado para un gráfico. Sobre 7 días, cada punto de avg(dt.host.cpu.usage) promedia un intervalo mucho mayor que unos pocos minutos, así que un pico de CPU del 100 % durante 3 minutos se diluye y aparece muy por debajo. No es pérdida de datos ni muestreo: Metrics powered by Grail mantiene la resolución de 1 minuto durante toda su retención; para ver el pico, reduce el timeframe o fija un interval corto.',
      ],
      bullets: [
        'Periodo: ¿qué intervalo representa?',
        'Granularidad: ¿qué significa cada fila o punto?',
        'Dimensión: ¿qué grupos comparo?',
        'Cobertura: ¿hay muestreo o datos completos?',
        'Retención: ¿puedo consultar todo el periodo?',
      ],
      sourceRefs: [
        { title: 'Metrics powered by Grail', url: 'https://docs.dynatrace.com/docs/license/capabilities/metrics', kind: 'official-docs' },
        { title: 'Metrics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics', kind: 'official-docs' },
        { title: 'Metrics FAQ', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq', kind: 'official-docs' },
      ],
    },
    {
      id: 'correlation',
      title: 'Observación frente a causalidad',
      lead: 'Correlación es una pista, no una explicación.',
      paragraphs: [
        'Si la latencia sube al mismo tiempo que errores de base de datos, tienes evidencia correlacionada; todavía debes revisar el camino de servicio, consultas, saturación, deploy o dependencia. Una métrica de CPU alta puede ser causa, consecuencia o ruido.',
        'En el examen, elige el siguiente paso que valida la hipótesis con mayor precisión: drill-down de entidad, consulta por dimensión, comparación temporal, logs relacionados o trace. Evita acciones destructivas o cambios de configuración sin evidencia.',
        'Antes de declarar una root cause, combina una segunda señal independiente con la relación entre entidades. Los spans de las requests lentas muestran dónde se consume el tiempo; Smartscape muestra qué entidad depende de cuál y permite comprobar qué señal empezó primero. Un coeficiente de correlación alto o una relación que se repite en el tiempo siguen siendo correlación: la hipótesis causal se apoya en la topología, las dependencias y la secuencia temporal, que es también el enfoque de la root cause analysis de Dynatrace.',
      ],
      bullets: [
        'Describe lo observado.',
        'Formula una hipótesis falsable.',
        'Busca una segunda señal independiente.',
        'Conecta con entidad y dependencia.',
        'Comunica nivel de confianza y siguiente comprobación.',
      ],
      sourceRefs: [
        { title: 'Metrics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics', kind: 'official-docs' },
        { title: 'Metrics FAQ', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq', kind: 'official-docs' },
        { title: 'Metrics limits', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/limits', kind: 'official-docs' },
      ],
    },
    {
      id: 'reporting',
      title: 'Reportes, KPIs y comunicación',
      lead: 'Un buen reporte permite actuar.',
      paragraphs: [
        'Un KPI necesita definición, fuente, periodo, fórmula, dimensión, objetivo y umbral o contexto. Una tabla o chart debe mostrar lo necesario para decidir, no solo lo que resulta visualmente llamativo.',
        'Relaciona resultados con Notebooks y Dashboards. El Notebook conserva el análisis; el Dashboard conserva la vista recurrente. Si el informe usa Business Events, declara que su precisión y retención tienen un significado diferente del de una métrica agregada.',
        'Los dashboard reports de Dashboards Classic se envían weekly (cada lunes por la mañana), monthly (el primer lunes de cada mes) o con ambas frecuencias. Cada email contiene un enlace público al report, con el timeframe de la frecuencia elegida; no adjunta un PDF. Para que el enlace se abra sin credenciales hay que activar Allow anonymous access en Settings > Dashboards > General settings, y las personas sin cuenta de Dynatrace se añaden como destinatarias mediante la Reports API.',
        'La documentación describe el Notebook como algo que se lee y el Dashboard como algo que se mira. Los Notebooks encajan en el análisis ad hoc, el troubleshooting, la investigación de incidentes complejos que combinan métricas, logs y traces, la documentación y la colaboración; los Dashboards, en la monitorización continua en tiempo real, el seguimiento de KPIs y SLOs y la visión general de la salud del sistema. Además, los datos de un notebook se almacenan dentro del notebook, mientras que los datos de un dashboard se consultan al abrirlo.',
      ],
      bullets: [
        'Nombre y definición del indicador.',
        'Query o fuente y última verificación.',
        'Periodo y frecuencia de actualización.',
        'Segmentos y exclusiones.',
        'Limitaciones, permisos y coste.',
      ],
      sourceRefs: [
        { title: 'Metrics FAQ', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq', kind: 'official-docs' },
        { title: 'Metrics limits', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/limits', kind: 'official-docs' },
        {
          title: 'Data retention periods',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'retention-model',
      title: 'Retención, datastore y granularidad',
      lead: 'La cifra de retención solo tiene sentido con su record type y variante.',
      paragraphs: [
        'Las políticas de retención no son universales. Para responder con precisión, identifica si la pregunta habla de Metrics powered by Grail, Metrics Classic, logs, traces, RUM/Synthetic, Davis, Security o diagnósticos de OneAgent. Después comprueba datastore, bucket, granularidad y si la cifra es un valor general, configurable o dependiente de la tenant.',
        'Una ventana de consulta larga no recupera datos expirados. Una retención larga tampoco garantiza detalle fino durante todo el periodo: puede haber agregación, sampling o una política diferente para el dato derivado.',
        'Cifras de referencia sin buckets personalizados ni ampliaciones: Metrics powered by Grail, 15 meses a 1 minuto; Davis problems y events, 14 meses; default_logs, 35 días; default_spans, 10 días. Los buckets integrados (default_ y dt_) no se pueden modificar: si necesitas, por ejemplo, 90 días de spans, creas un bucket personalizado de spans (los buckets personalizados admiten de 1 día a 10 años) y diriges a él los datos. Ampliar el timeframe de la consulta no recupera datos expirados, y convertir spans en métricas conserva agregados, no las traces individuales.',
      ],
      bullets: [
        'Record type y datastore.',
        'Latest Dynatrace o Classic.',
        'Bucket y política aplicable.',
        'Detalle frente a agregación.',
        'Periodo consultado.',
        'Permisos y disponibilidad real.',
      ],
      sourceRefs: [
        { title: 'Metrics limits', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/limits', kind: 'official-docs' },
        {
          title: 'Data retention periods',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
      ],
    },
    {
      id: 'metric-retention',
      title: 'Métricas: Grail frente a Classic',
      lead: 'Las métricas son un terreno clásico para distractores cercanos.',
      paragraphs: [
        'La documentación oficial diferencia Metrics powered by Grail y Metrics Classic. Para Grail, la retención general indicada es 15 meses con granularidad de 1 minuto por defecto y ampliable hasta 10 años. Metrics Classic mantiene una retención de cinco años en la referencia estudiada.',
        'En una pregunta, no respondas con “las métricas duran cinco años” sin leer el datastore. La palabra Grail, Classic, resolución o bucket puede cambiar la respuesta. Si el enunciado pide un histórico de 18 meses, comprueba primero que la métrica está en Grail y que la política de retención lo permite.',
        'En Metrics Classic la granularidad disminuye con la antigüedad: 1 minuto de 0 a 14 días, 5 minutos de 14 a 28 días, 1 hora de 28 a 400 días y 1 día de 400 días a 5 años. Metrics powered by Grail mantiene 1 minuto durante todo el historial; un interval:1h en un Dashboard cambia la agregación consultada, no los datos almacenados.',
        'Metrics Classic y Metrics powered by Grail son bases de datos separadas, con almacenamiento separado: el historial Classic no se migra a Grail y sigue disponible en Data Explorer y en Dashboards Classic. Data Explorer Classic usa metric selectors, mientras que Notebooks y Dashboards usan DQL; los metric keys siguen otra convención de nombres en Grail, a menudo con correspondencia uno a uno. Ingerir en ambos sistemas no duplica el cargo: solo aplica el consumo de la licencia activa.',
      ],
      comparison: {
        headers: ['Dato', 'Referencia de retención', 'Matiz'],
        rows: [
          [
            'Metrics powered by Grail',
            '15 meses a 1 minuto por defecto; ampliable hasta 10 años',
            'La ampliación hasta 10 años es una opción de retención de métricas, no un bucket personalizado (no existen buckets personalizados de métricas)',
          ],
          ['Metrics Classic', '5 años', 'No sustituye la respuesta de Grail'],
          ['Métrica agregada', 'Depende de política y resolución', 'No implica detalle original completo'],
          ['Consulta', 'Depende de timeframe y permisos', 'La UI no recupera datos expirados'],
          [
            'Metrics Classic (granularidad)',
            '1 min (0–14 días) · 5 min (14–28 días) · 1 h (28–400 días) · 1 día (hasta 5 años)',
            'Grail mantiene 1 minuto en todo el historial',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'Data retention periods',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'key-requests',
      title: 'Key Requests y niveles históricos',
      lead: 'Una request puede tener detalle reciente y métricas históricas distintas.',
      paragraphs: [
        'Key Requests Classic separa niveles de datos: el historial detallado de code-level tiene una ventana más corta, los datos agregados de requests una ventana intermedia y el historial métrico de largo plazo otra diferente. La cifra correcta depende de qué nivel pide la pregunta, no solo de que aparezca la palabra “request”.',
        'Este patrón es generalizable: distingue registro detallado, agregado y métrica derivada. Si un usuario pide investigar el stack trace de hace meses, no prometas el mismo detalle que para una tendencia histórica. Comprueba el producto, la variante y la política vigente.',
        'En Services Classic, marcar una request como key request le da métricas dedicadas (gestionables desde la UI o la API), tiles propios en los dashboards, custom thresholds y alerting siempre activo, incluso cuando aporta menos del 1 % del throughput. Sus niveles de retención son: detailed code-level data, 10 días; aggregated code-level data, 35 días; long-term metric history, 5 años. Los dashboard tiles de una key request incluyen solo los datos recogidos después de marcarla. Cada servicio admite 100 key requests y cada entorno, 500 en total.',
      ],
      bullets: [
        'Detalle code-level: investigación reciente.',
        'Agregado de requests: tendencia con menos detalle.',
        'Historial métrico: visión prolongada.',
        'Pregunta: qué nivel de evidencia necesitas.',
        'Respuesta: fuente, variante y periodo.',
      ],
      sourceRefs: [
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sessions-problems',
      title: 'Sesiones, user events, Problems y Davis events',
      lead: 'Objetos relacionados no comparten automáticamente modelo ni retención.',
      paragraphs: [
        'Una user session agrupa experiencia durante un recorrido; un user event describe una interacción; un Problem contextualiza anomalías relacionadas; un Davis event es un evento de la plataforma. Contarlos como si fueran la misma unidad produce métricas falsas y respuestas incorrectas.',
        'Antes de comparar, define la unidad, la ventana y la fuente. La retención general documentada para user events, user sessions, user replays y Synthetic es distinta de la de Davis problems and events. La pregunta puede estar comprobando precisamente que no extrapoles una cifra entre objetos.',
        'En RUM (Latest Dynatrace) para web frontends, una user session se registra cuando se captura al menos un evento que indique actividad del usuario, como una user action o una navigation; las request events por sí solas no bastan. La sesión termina tras 30 minutos de inactividad del navegador, cuando el usuario cierra el navegador, al alcanzar 6 horas de duración o cuando el código llama a dtrum.endSession() desde la RUM JavaScript API. RUM no limita el número de acciones o eventos por sesión; el corte a las 200 acciones era propio de RUM Classic.',
        'Una sesión con una sola user action o navigation se etiqueta como bounced. En Grail, default_user_events y default_user_sessions, las user replays y los buckets de Synthetic conservan 35 días; Davis problems y Davis events se conservan 14 meses.',
      ],
      comparison: {
        headers: ['Objeto', 'Unidad', 'Pregunta'],
        rows: [
          ['User session', 'Recorrido de usuario', '¿Qué experiencia tuvo esta sesión?'],
          ['User event', 'Interacción', '¿Qué acción realizó?'],
          ['Problem', 'Situación correlacionada', '¿Qué problema afecta al entorno?'],
          ['Davis event', 'Ocurrencia de evento', '¿Qué señal produjo Davis?'],
        ],
      },
      sourceRefs: [
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-user-behavior',
      title: 'Comportamiento de usuario y sesiones en RUM Classic',
      lead: 'Bounces, conversiones, entry y exit actions responden a preguntas de negocio distintas.',
      paragraphs: [
        'El análisis de comportamiento de RUM Classic resume métricas como bounces, páginas de entrada y salida y conversiones. Un usuario se considera returning gracias a una cookie persistente en el navegador, válida durante 2 años. Los user types separan Real users, tráfico de Synthetic monitoring y Robots como Googlebot. Una sesión convertida es la que cumple al menos uno de los conversion goals definidos. La entry action es la primera page load o XHR action de la sesión (la página de llegada) y la exit action, la última page load o XHR action; revisar las exit actions ayuda a ver si problemas de rendimiento hacen que los usuarios abandonen. Las other actions son las que no son ni la primera ni la última.',
        'En la performance analysis de RUM Classic, la métrica principal de una load action es Visually complete y la de una XHR action, Response end; Speed index y time to first byte forman parte de las métricas compuestas. El top 3 de user actions más lentas se ordena por prioridad (las de prioridad alta primero) y por total time consumed (duración × número de acciones), de modo que una acción algo lenta y muy frecuente puede superar a otra muy lenta y rara.',
        'Para segmentar sesiones en RUM Classic se usa User Sessions Query Language (USQL), desde la página Query User Sessions o la Environment API. USQL no es SQL y Dynatrace no guarda los datos de sesión en una base relacional; consulta tablas como usersession y useraction (además de userevent y usererror) con la estructura SELECT … FROM … WHERE … GROUP BY … ORDER BY. Solo se consultan user sessions cerradas, así que las live sessions no aparecen. Por defecto devuelve 50 resultados y con LIMIT llega a 5.000; en timeframes grandes los datos pueden extrapolarse a partir de una muestra.',
      ],
      bullets: [
        'Returning user: cookie persistente de 2 años.',
        'Conversión: al menos un conversion goal cumplido.',
        'Entry action: primera; exit action: última.',
        'Top 3 más lentas: prioridad y total time consumed (duración × número de acciones).',
        'USQL: solo sesiones cerradas; 50 resultados por defecto, 5.000 con LIMIT.',
      ],
      sourceRefs: [
        {
          title: 'User behavior analysis in RUM Classic',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum-classic/web-applications/analyze-and-use/user-behavior-analysis',
          kind: 'official-docs',
        },
        {
          title: 'Performance analysis in RUM Classic',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum-classic/web-applications/analyze-and-use/performance-analysis',
          kind: 'official-docs',
        },
        {
          title: 'Custom queries, segmentation, and aggregation of session data',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/session-segmentation/custom-queries-segmentation-and-aggregation-of-session-data',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sampling-completeness',
      title: 'Muestreo, completitud y sesgo',
      lead: 'Un número exacto puede representar solo una parte de la realidad.',
      paragraphs: [
        'RUM, traces, métricas y eventos pueden tener métodos de captura, muestreo o agregación diferentes. Antes de convertir un resultado en porcentaje o volumen total, comprueba si representa todos los hechos, una muestra o una estimación. Business Events busca datos de negocio completos, mientras que una métrica técnica puede tener otra semántica.',
        'El sesgo también aparece al filtrar: un timeframe incompleto, una entidad ausente, una dimensión de alta cardinalidad o una regla de drop puede cambiar la población. Documenta qué quedó fuera y qué conclusión sí está respaldada.',
        'En DQL, el parámetro samplingRatio de fetch se aplica solo a logs y admite 1 (valor por defecto, sin muestreo), 10, 100, 1000 y 10000. Con samplingRatio:100 se devuelve aproximadamente 1/100 de los registros de todo el timeframe, así que un count() no es el total real. El ratio aplicado queda en el campo oculto dt.system.sampling_ratio, que solo se ve si lo seleccionas con fields.',
        'El parámetro bucket acepta un nombre, una lista o un patrón con comodín *, por ejemplo bucket:{"default_logs", "logs_365_*"}; acota qué buckets se leen, pero no amplía su retención. scanLimitGBytes limita la cantidad de datos sin comprimir que lee fetch: su valor por defecto es 500 GB y con -1 se analizan todos los datos del timeframe; si se alcanza el límite, el resultado es parcial.',
      ],
      bullets: [
        'Cobertura de la fuente.',
        'Sampling o agregación.',
        'Población incluida.',
        'Filtros y exclusiones.',
        'Campos ausentes.',
        'Nivel de confianza.',
      ],
      sourceRefs: [
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
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
      id: 'analysis-workflow',
      title: 'Flujo de análisis avanzado',
      lead: 'La precisión se construye paso a paso.',
      paragraphs: [
        'Comienza con la unidad y el objetivo; fija timeframe y variantes; inspecciona un ejemplo; valida dimensiones y campos; elige agregación; compara con una segunda señal; comprueba dependencias; comunica la limitación y guarda la query. Este flujo vale tanto para una auditoría histórica como para un incidente de minutos.',
        'Cuando dos opciones de examen parezcan razonables, elige la que hace explícita la evidencia y evita asumir disponibilidad. “Consultar más tiempo” no es siempre mejor: puede mezclar resoluciones, superar retención o diluir un cambio importante.',
        'Ejemplo: ampliar una investigación de 7 a 90 días que combina métricas Classic en Data Explorer y traces de default_spans tiene dos efectos. Mezcla resoluciones, porque Metrics Classic guarda los datos de 28 a 400 días con resolución de 1 hora; y supera retención, porque default_spans conserva 10 días y las traces más antiguas ya no existen. El timeframe de la consulta no cambia la retención del bucket, y samplingRatio es un parámetro de fetch para logs que no se activa por la duración del timeframe.',
      ],
      bullets: [
        'Objetivo y unidad.',
        'Periodo y variante.',
        'Muestra y esquema.',
        'Agregación y dimensión.',
        'Corroboración.',
        'Conclusión y límite.',
      ],
      sourceRefs: [
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Business reporting',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-reporting',
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
      id: 'deep-signal-semantics',
      title: 'Métricas, logs, trazas, eventos y sesiones',
      lead: 'La unidad de dato condiciona qué afirmación puedes hacer.',
      paragraphs: [
        'Una métrica es una serie numérica agregable con timestamp, key, dimensiones y resolución; un log es un registro de contenido que puede estructurarse mediante parsing; una traza está formada por spans que describen una ejecución distribuida; un Davis event representa una anomalía o cambio; una sesión agrupa eventos de experiencia. Pueden relacionarse por entidad, timestamp y trace context, pero no tienen el mismo muestreo, retención ni semántica.',
        'Antes de crear un gráfico, decide si necesitas una distribución, una tendencia, un conteo exacto, una tasa, una latencia, una secuencia o un caso individual. `summarize` puede producir una tabla de agregados; `timeseries` crea series temporales; una consulta de logs puede requerir `parse`; un Problem puede necesitar root-cause context. La forma de resultado no es un detalle visual: cambia la interpretación.',
        'Una distributed trace es una secuencia de spans identificada por un trace ID único que sigue una request a través de varios services. Lo que une spans generados en servicios distintos es la propagación del trace context (span context): relaciona cada child span con la trace y con su parent span y viaja entre threads, servicios y procesos, por ejemplo en cabeceras HTTP W3C trace context. Coincidir en timestamp o en host no basta para enlazar spans.',
        'Davis event frente a Problem: un Davis event es una anomalía individual (un umbral superado, una degradación frente a la baseline, un evento puntual); un Problem representa el incidente y correlaciona en un único Problem todos los Davis events con la misma root cause. No todo Davis event abre un Problem: los de categoría Info o Warning no lo hacen.',
      ],
      comparison: {
        headers: ['Señal', 'Mejor para', 'Cuidado'],
        rows: [
          ['Metric', 'tendencias, ratios y baselines', 'dimensiones, cardinalidad y agregación'],
          ['Log', 'detalle textual y contexto puntual', 'volumen, parsing y sensibilidad'],
          ['Trace/span', 'camino de una ejecución', 'sampling y propagación'],
          ['Davis event/Problem', 'anomalía correlacionada', 'evento individual frente a situación'],
          ['RUM session', 'comportamiento de usuario', 'lifecycle y variante Classic/Latest'],
        ],
      },
      sourceRefs: [
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        { title: 'Metrics powered by Grail', url: 'https://docs.dynatrace.com/docs/license/capabilities/metrics', kind: 'official-docs' },
        { title: 'Metrics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-retention-reference',
      title: 'Retención en Grail, buckets del sistema y permisos de retención',
      lead: 'Las cifras son memorizables solo si conservas el tipo de dato y la arquitectura.',
      paragraphs: [
        'En Grail, la retención se configura a nivel de bucket de almacenamiento. Para crear buckets personalizados o cambiar la retención de uno existente se requiere el permiso IAM explícito storage:bucket-definitions:write (solo buckets personalizados; los integrados no son editables). El bucket integrado `default_logs` tiene una retención de 35 días que no se puede modificar (para conservar logs hasta 10 años se envían a un bucket personalizado de logs), mientras que los security events se guardan en los buckets integrados `default_securityevents` (1 año, fuentes de terceros) y `default_securityevents_builtin` (3 años, generados por Dynatrace), y los Davis problems y events se conservan 14 meses.',
        'En cuanto a métricas, las métricas almacenadas en Grail (default_metrics) cuentan con 15 meses de retención incluidos con granularidad de 1 minuto por defecto (ampliables hasta 10 años). Esto contrasta con Metrics Classic (que conserva 5 años, no configurable, con granularidad decreciente con la antigüedad). Los distributed traces en Grail se guardan por defecto en `default_spans` con 10 días; un bucket personalizado de spans permite ampliar la retención hasta 10 años. Diferencia siempre la retención del almacenamiento de la ventana temporal de la consulta.',
        'La retención es una propiedad del bucket donde se almacenaron los datos, no del timeframe de la consulta: un selector de 90 días sobre default_logs solo devuelve lo que sigue dentro de sus 35 días. Por eso, en una consulta de 12 meses sin buckets personalizados puedes encontrar métricas (default_metrics, 15 meses) y no logs (default_logs, 35 días) de la misma fecha.',
      ],
      comparison: {
        headers: ['Dato / Bucket', 'Retención por Defecto en Grail', 'Permiso de gestión de buckets'],
        rows: [
          [
            'default_logs',
            '35 días, no editable (bucket personalizado de logs: hasta 10 años)',
            'storage:bucket-definitions:write (solo buckets personalizados; los integrados no son editables)',
          ],
          [
            'Bucket personalizado (logs, spans, events, bizevents o security events)',
            'De 1 día a 10 años (más una semana adicional), elegida al crearlo y modificable',
            'storage:bucket-definitions:write (solo buckets personalizados; los integrados no son editables)',
          ],
          [
            'default_securityevents_builtin',
            '3 años, no editable (security events generados por Dynatrace)',
            'No aplica (bucket integrado)',
          ],
          ['Davis Problems / Events', '14 meses de retención', 'No vinculado a retención de logs origen'],
          [
            'default_spans (Distributed Traces)',
            '10 días, no editable (bucket personalizado de spans: hasta 10 años)',
            'storage:bucket-definitions:write (solo para el bucket personalizado de spans; el integrado no es editable)',
          ],
          ['default_securityevents', '1 año, no editable (security events de fuentes de terceros)', 'No aplica (bucket integrado)'],
          [
            'Metrics powered by Grail (default_metrics)',
            '15 meses incluidos a 1 minuto; ampliable hasta 10 años como opción de retención de métricas',
            'No aplica (no hay buckets personalizados de métricas)',
          ],
        ],
      },
      warning: 'Estas cifras son referencias oficiales de Latest Dynatrace. Acortar la retención de un bucket personalizado elimina los datos que superan el nuevo periodo.',
      sourceRefs: [
        { title: 'Metrics FAQ', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/faq', kind: 'official-docs' },
        { title: 'Metrics limits', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/limits', kind: 'official-docs' },
        {
          title: 'Data retention periods',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-grail-buckets',
      title: 'Buckets, tablas y vistas en Grail',
      lead: 'La tabla es lógica; el bucket decide la retención y el acceso.',
      paragraphs: [
        'Grail organiza los registros en tres niveles. Los buckets son las unidades lógicas de almacenamiento donde se guardan los registros, y cada bucket está asociado a un único tipo de registro (logs, events, bizevents, security events o spans, por ejemplo). Las tablas agrupan los registros por tipo: fetch logs recupera los registros de todos los buckets de logs a los que tienes acceso, sean default_logs o buckets personalizados, en una única salida. Las vistas son tablas virtuales definidas por consultas sobre tablas existentes: ofrecen una perspectiva filtrada o transformada, pero no copian datos, así que los registros siguen sujetos a la retención y a los permisos de sus buckets.',
        'Si OpenPipeline no asigna un bucket explícito, el default pipeline procesa los datos no asignados y los guarda en el bucket predeterminado de su tipo; para logs, default_logs, cuya retención es la de ese bucket. Los buckets integrados (los que empiezan por default_ y los de sistema que empiezan por dt_) no se pueden modificar: si necesitas otra retención o separar accesos, creas buckets personalizados y diriges hacia ellos los datos. Como excepción en preview, la documentación menciona un programa (Extended retention for RUM and Synthetic) que permite conservar los datos de RUM y Synthetic más allá de los 35 días estándar, hasta 13 meses. Los buckets personalizados se pueden crear para events, security events, bizevents, logs y spans; metrics no figura en esa lista, de modo que default_metrics (15 meses) no admite un bucket propio.',
        'En un bucket personalizado defines el tipo de registro y la retención, que puede ir de 1 día a 10 años (más una semana adicional). Para guardar logs y Business Events con la misma retención hacen falta dos buckets, uno de logs y otro de bizevents. El nombre del bucket no se puede editar ni cambiar después de crearlo; el display name es un campo aparte para describir el bucket. El límite predeterminado es de 250 buckets personalizados por entorno, sin contar los buckets integrados como default_logs; para volúmenes de ingesta mayores se pueden solicitar más buckets con el equipo de cuenta de Dynatrace. Para inventariar los buckets y su retención real se consulta la tabla dt.system.buckets.',
      ],
      comparison: {
        headers: ['Bucket integrado', 'Retención', 'Datos'],
        rows: [
          ['default_logs', '35 días', 'Logs'],
          ['default_spans', '10 días', 'Spans (distributed traces)'],
          ['default_metrics', '15 meses', 'Metrics powered by Grail'],
          ['default_events y default_bizevents', '35 días', 'Events y Business Events'],
          ['default_user_events y default_user_sessions', '35 días', 'RUM'],
          ['default_synthetic_user_events y demás buckets de Synthetic', '35 días', 'Synthetic'],
          ['default_securityevents_builtin', '3 años', 'Security events'],
          ['default_securityevents', '1 año', 'Security events'],
        ],
      },
      code: 'fetch dt.system.buckets\n| filter startsWith(name, "default_") or startsWith(name, "dt_")',
      codeNote: 'Lista los buckets integrados del entorno con sus metadatos, entre ellos la retención configurada.',
      sourceRefs: [
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
        {
          title: 'OpenPipeline processing',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing',
          kind: 'official-docs',
        },
        {
          title: 'DQL data source commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/data-source-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-bucket-lifecycle',
      title: 'Permisos y ciclo de vida de un bucket',
      lead: 'Leer datos y administrar buckets son autorizaciones distintas.',
      paragraphs: [
        'Para consultar registros necesitas dos permisos a la vez: acceso al bucket (storage:buckets:read) y acceso a la tabla (storage:logs:read para logs, storage:spans:read para spans, storage:metrics:read para métricas). Ambos se pueden acotar con condiciones WHERE: storage:bucket-name limita los buckets y un campo como storage:dt.security_context limita los registros de la tabla. Si una policy concede storage:buckets:read WHERE storage:bucket-name="default_logs" y storage:logs:read WHERE storage:dt.security_context="TeamA", el usuario ve solo los logs de default_logs cuyo dt.security_context es TeamA; los de otros buckets quedan fuera.',
        'Administrar buckets es otra familia de permisos: storage:bucket-definitions:read permite ver las definiciones, storage:bucket-definitions:write crear buckets y cambiar su retención, storage:bucket-definitions:truncate vaciarlos y storage:bucket-definitions:delete eliminarlos. Poder leer los logs de un bucket no autoriza a cambiar su retención. Cuando dos equipos necesitan retenciones y permisos distintos, el diseño correcto es separar sus flujos en buckets personalizados y conceder permisos sobre cada bucket y sobre la tabla; dt.security_context separa el acceso, pero dentro de un único bucket todos los registros comparten retención.',
        'Acortar la retención de un bucket elimina los datos que superan el nuevo periodo. Truncate borra de forma permanente todos los registros de un bucket sin eliminar el bucket, que puede seguir recibiendo datos; Delete elimina el bucket personalizado junto con todos sus datos, sin necesidad de truncate previo. Si un processor de OpenPipeline todavía referencia el bucket, la petición de borrado devuelve un estado 409 conflict con la lista de processors afectados y no se elimina nada. El borrado es una tarea asíncrona: mientras se vacían los datos el estado es deleting, y puede seguirse en el campo status de GET bucket definitions.',
      ],
      bullets: [
        'Leer logs: storage:buckets:read + storage:logs:read.',
        'Ver definiciones: storage:bucket-definitions:read.',
        'Crear buckets o cambiar retención: storage:bucket-definitions:write.',
        'Vaciar: storage:bucket-definitions:truncate. Eliminar: storage:bucket-definitions:delete.',
      ],
      warning: 'Reducir la retención, truncar o eliminar un bucket borra datos de forma permanente; evalúa antes la necesidad histórica y qué pipelines lo usan.',
      sourceRefs: [
        {
          title: 'Permissions in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail',
          kind: 'official-docs',
        },
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-metric-design',
      title: 'Métricas, series temporales y timeseries default:0',
      lead: 'Una métrica útil necesita una definición que mantenga significado y coste controlado.',
      paragraphs: [
        'La key identifica qué se mide; el valor y la unidad definen la magnitud; las dimensiones permiten segmentar; el timestamp y la resolución determinan la serie temporal. Al consultar métricas con DQL mediante el comando `timeseries`, los intervalos de tiempo en los que no se han registrado muestras se devuelven por defecto como `null`.',
        'Para rellenar estos vacíos con ceros y evitar saltos abruptos o líneas discontinuas en los gráficos, se utiliza el parámetro `default:0` de la función de agregación (por ejemplo: `timeseries cpu = avg(dt.host.cpu.usage, default:0), interval:5m`). Esto asegura que cada intervalo de una serie existente tenga un valor numérico definido; si no hay ningún dato, hace falta además nonempty:true para obtener una serie.',
      ],
      code: 'timeseries requests = sum(dt.service.request.count, default:0), interval:1m, by:{dt.entity.service}',
      codeNote: 'El parámetro default:0 rellena los minutos sin peticiones con el valor 0 en lugar de dejar huecos null en la gráfica.',
      sourceRefs: [
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-timeseries-params',
      title: 'Parámetros de timeseries que cambian el resultado',
      lead: 'Cada parámetro responde a una pregunta distinta sobre la serie.',
      paragraphs: [
        'timeseries produce series homogéneas: todas las series de la respuesta comparten los timestamps de inicio y fin, el intervalo y el número de elementos. Cada fila incluye una columna timeframe, una columna interval y un array de valores por agregación. Si no indicas interval ni bins, el intervalo se calcula automáticamente dividiendo el timeframe en slots adecuados para graficar. interval (duración de cada slot) y bins (número de slots) son parámetros mutuamente excluyentes. Con by:{...} obtienes una serie por cada valor de la dimensión, cada una con su array temporal; los slots sin datos aparecen como null y no excluyen esa serie.',
        'filter puede ser global o ir dentro de una agregación concreta: dentro de una agregación limita solo esa serie, lo que permite calcular en la misma consulta un numerador filtrado (por ejemplo, solo errores 5xx) y un denominador sin filtrar. default:0 rellena con 0 los slots vacíos de una serie que existe, pero no crea series; nonempty:true devuelve resultado aunque no existan datos, y combinado con default:0 permite representar 0 en lugar de una salida vacía. union:false, el valor por defecto, combina las agregaciones como un INNER JOIN y conserva solo las series comunes; union:true aplica un OUTER JOIN y conserva las series presentes en cualquiera de ellas.',
        'scalar:true calcula un único valor que abarca todo el timeframe. rate normaliza con la fórmula (valor / intervalo) × rate: 300 solicitudes en un slot de 5 minutos con rate:1s dan 1 solicitud por segundo. shift desplaza el timeframe de una serie para compararla con otro periodo y la mapea a los timestamps originales; shift:-7d dibuja la misma ventana de la semana anterior.',
        'Las agregaciones tienen semántica propia. count(metric) calcula el número de series distintas de la métrica en cada slot (cardinalidad), no la suma de valores ni el número de muestras. percentile(metric, 99) estima un percentil y percentRank(metric, umbral) devuelve la fracción (de 0,0 a 1,0) de valores que quedan por debajo del umbral. Ambas se aplican a métricas histogram; para métricas gauge o count exigen el parámetro rollup. dt.service.request.response_time admite percentile sin rollup.',
      ],
      code: 'timeseries p99 = percentile(dt.service.request.response_time, 99), by:{dt.entity.service}',
      codeNote: 'Ejemplo de la documentación: percentil 99 del response time por servicio; avg ocultaría las peticiones más lentas.',
      sourceRefs: [
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-metrics-exploration',
      title: 'Explorar métricas frente a graficarlas',
      lead: 'Descubrir qué series existen no es lo mismo que leer sus valores.',
      paragraphs: [
        'El comando metrics sirve para descubrir qué series de métricas existen: devuelve claves de métrica y dimensiones, pero no timestamps ni valores, así que no sirve para graficar; para eso se usa timeseries, que devuelve los valores agregados por intervalo. El rango temporal de metrics llega como máximo a los últimos 10 días y cada consulta está limitada a 100.000 series de métrica, de modo que en un entorno muy grande un inventario puede quedar incompleto.',
        'timeseries lee métricas, no registros. Para dibujar en el tiempo datos de registros como logs o events se usa makeTimeseries después de fetch: crea series a partir de los registros del stream (si no indicas interval ni bins, usa 120 bins). Así, fetch logs | filter loglevel == "ERROR" | makeTimeseries count() grafica los errores de log, mientras que timeseries no puede leer la tabla logs. Para un ranking o un total por dimensión, sin array temporal, la herramienta es summarize.',
      ],
      bullets: [
        'metrics: inventario de claves y dimensiones (últimos 10 días, hasta 100.000 series).',
        'timeseries: valores de métricas en intervalos homogéneos para graficar.',
        'makeTimeseries: series a partir de registros (logs, events).',
        'summarize: tabla de agregados, una fila por grupo.',
      ],
      sourceRefs: [
        {
          title: 'DQL metric commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/metric-commands',
          kind: 'official-docs',
        },
        {
          title: 'DQL aggregation commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/aggregation-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-metric-limits',
      title: 'Límites, cardinalidad y coste de las métricas',
      lead: 'Las dimensiones multiplican series, y las series multiplican data points.',
      paragraphs: [
        'Cada combinación única de clave de métrica y valores de dimensión forma una serie: la cardinalidad es el número de series que produce una métrica, así que añadir dimensiones como servicio, región y status multiplica las combinaciones. En Metrics powered by Grail las dimensiones no tienen un límite fijo, excepto las muy volátiles: usar timestamps o IDs únicos como valor de dimensión dispara las series, y Dynatrace puede restringir o rechazar esas configuraciones. Metrics Classic limita a 1 millón las dimensiones por métrica.',
        'El consumo de métricas se factura por los data points realmente ingeridos y almacenados, no por cada combinación posible ni por serie activa; los 15 meses de retención incluidos y las consultas no tienen cargo adicional. Las métricas recogidas con más frecuencia que un minuto se agregan en intervalos fijos, de modo que se factura como máximo un data point por minuto y serie. La palanca más eficaz es eliminar dimensiones volátiles (user IDs, request IDs, UUIDs) en origen, por ejemplo con el transform processor del OTel Collector, o con el processor Remove fields de OpenPipeline; consultar con un interval mayor no cambia lo ingerido.',
        'Otros límites documentados: hasta 100.000 claves de métricas personalizadas, por lo que crear una clave por pedido o por usuario agota ese espacio y el identificador debería evaluarse como dimensión con control de cardinalidad. El prefijo dt. está reservado para métricas controladas por Dynatrace y los datos ingeridos con ese prefijo se descartan. Una consulta de Metrics powered by Grail puede leer hasta 500 millones de data points, frente a 20 millones en Metrics Classic.',
      ],
      comparison: {
        headers: ['Aspecto', 'Metrics powered by Grail', 'Metrics Classic'],
        rows: [
          ['Data points por consulta', '500 millones', '20 millones'],
          ['Claves de métricas personalizadas', '100.000', '100.000'],
          ['Dimensiones', 'Sin límite fijo, excepto las muy volátiles', '1 millón por métrica'],
          ['Granularidad', '1 minuto en todo el historial', '1 minuto los primeros 14 días; después, menor'],
          ['Retención', '15 meses incluidos, ampliable hasta 10 años', '5 años'],
        ],
      },
      sourceRefs: [
        { title: 'Metrics limits', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/limits', kind: 'official-docs' },
        {
          title: 'Optimize metrics cost',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/metrics/best-practices-metrics',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-reporting-analysis',
      title: 'Reporting, exportación y reproducibilidad',
      lead: 'Un reporte útil comunica evidencia y límites, no solo un número.',
      paragraphs: [
        'Un report debe declarar periodo, timezone, filtros, población, origen, unidad y timestamp de actualización. Si un Dashboard se distribuye a stakeholders, conserva la definición del KPI y una nota de interpretación. Si exportas a otra plataforma, comprueba API, permisos, paginación, formato, límites y si el resultado es una copia puntual o una consulta que se recalcula.',
        'La exportación no corrige retención ni permisos. Si un registro ya no está disponible, un endpoint de consulta no lo recupera mágicamente; si el usuario no tiene acceso, el reporte no debe elevar privilegios. Los datos exportados pueden tener sensibilidad propia y requieren el mismo gobierno que el origen.',
        'Para que una herramienta externa lea data points de métricas Classic se usa Metrics API v2: GET /api/v2/metrics/query con un token con el scope metrics.read (metrics.ingest sirve para enviar métricas). El parámetro metricSelector admite hasta 10 métricas separadas por comas. La respuesta es JSON por defecto, o CSV si se pide con la cabecera Accept. Si no indicas resolution, la API devuelve por defecto 120 data points por serie, y si no indicas from, el timeframe empieza en now-2h. Límites por consulta: 20 millones de data points en total y 10.080 data points por tupla de dimensiones. storage:metrics:read, en cambio, es un permiso IAM de Grail para leer métricas con DQL, no un token scope de esta API.',
      ],
      bullets: [
        'Report: contexto y decisión para una audiencia.',
        'Dashboard: seguimiento persistente.',
        'Notebook: análisis reproducible.',
        'API/export: integración externa con contrato explícito.',
      ],
      sourceRefs: [
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
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
      id: 'deep-baselines-impact',
      title: 'Baselines, anomalías e impacto',
      lead: 'La AI contextualiza, pero debes entender qué evidencia utiliza.',
      paragraphs: [
        'Dynatrace Intelligence puede comparar comportamiento con baselines, generar Davis events y correlacionar dependencias en Problems. La línea base, el timeframe, la estacionalidad, el tipo de métrica y la calidad de ingestión condicionan la detección. Una anomalía detectada no es automáticamente una causa; puede ser un síntoma o un evento informativo.',
        'Impact analysis recorre la topología para identificar aplicaciones de entrada, servicios afectados, entidades, SLOs y posibles usuarios. Usa esta información para priorizar, pero conserva la distinción entre impacto observado y causalidad. En preguntas de análisis, la respuesta más precisa suele combinar señal, contexto topológico y evidencia del usuario o negocio.',
        'Por categoría: los Davis events informativos (Info) no se envían como alertas ni abren Problems, porque no indican una situación anormal; los de categoría Warning tampoco crean un Problem nuevo. Un evento Info tras un despliegue queda registrado, pero no genera Problem ni alerta.',
        'Para correlacionar Davis events y llegar a la root cause más probable, el modelo de contexto de Dynatrace Intelligence se construye con la información de dependencias conocida de Smartscape, OneAgent y las cloud integrations, y aplica fault tree analysis sobre esas dependencias. No se basa en la mera coincidencia temporal, en coeficientes de correlación ni en reglas que el usuario defina por pareja de servicios.',
      ],
      comparison: {
        headers: ['Pregunta', 'Evidencia principal'],
        rows: [
          ['¿Qué cambió?', 'métrica, log, trace o event en timeframe'],
          ['¿Por qué?', 'root-cause candidate y dependencias'],
          ['¿A quién afecta?', 'impact, entry points, RUM y SLO'],
          ['¿Qué hago?', 'siguiente comprobación o Workflow autorizado'],
        ],
      },
      sourceRefs: [
        {
          title: 'Business reporting',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/business-reporting',
          kind: 'official-docs',
        },
        {
          title: 'Davis DQL examples',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/use-cases/dynatrace-intelligence-dql-examples',
          kind: 'official-docs',
        },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
      ],
    },
  ],
  masteryChecklist: [
    'Sé identificar la unidad de un dataset antes de agregar.',
    'Puedo detectar un timeframe o una dimensión mal elegida.',
    'No confundo correlación con causa.',
    'Puedo diseñar un KPI reproducible y comunicar sus límites.',
    'Distingo las retenciones de Grail metrics y Metrics Classic.',
    'Sé leer la diferencia entre detalle, agregado y métrica histórica.',
    'No mezclo sesiones, user events, Problems y Davis events.',
    'Puedo explicar muestreo, completitud y sesgo.',
    'Sigo un flujo de análisis reproducible con fuente y variante.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
