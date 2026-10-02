import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Notebooks & Dashboards».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Notebooks y Dashboards comparten datos y consultas, pero sirven a momentos distintos del trabajo. El criterio de selección es audiencia, repetición, exploración y necesidad de narrar evidencia. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Elegir Notebook o Dashboard con criterio.',
    'Construir una secuencia de análisis reproducible.',
    'Relacionar DQL, visualizaciones y Markdown.',
    'Diseñar vistas que no oculten timeframe ni fuente.',
    'Validar celdas, resultados, variables y permisos antes de compartir.',
    'Separar exploración, comunicación recurrente y acción.',
  ],
  sections: [
    {
      id: 'notebook',
      title: 'Notebook como laboratorio documentado',
      lead: 'Un Notebook cuenta cómo llegaste a una conclusión.',
      paragraphs: [
        'Un Notebook combina celdas de consulta, resultados, visualizaciones y texto. Es apropiado para exploración, investigación de incidentes, análisis de negocio y documentación de una hipótesis. La narrativa debe explicar qué pregunta responde cada celda.',
        'Una buena secuencia empieza por contexto y timeframe, ejecuta una consulta mínima, inspecciona campos, crea una vista y documenta la conclusión. El resultado no es solo un gráfico: es un artefacto que otra persona puede revisar y repetir.',
      ],
      bullets: [
        'Contexto: qué investigas y por qué.',
        'Consulta: qué dataset y filtros usas.',
        'Resultado: qué patrón aparece.',
        'Interpretación: qué se sabe y qué sigue siendo hipótesis.',
        'Siguiente paso: qué fuente o acción valida la conclusión.',
      ],
      sourceRefs: [
        {
          title: 'Dashboards and Notebooks overview',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'dashboard',
      title: 'Dashboard como vista operativa',
      lead: 'Un Dashboard comunica y monitoriza de forma recurrente.',
      paragraphs: [
        'Un Dashboard reúne indicadores y visualizaciones para una audiencia que necesita detectar cambios, revisar estado o comunicar resultados. El diseño debe limitar ruido, declarar periodo y priorizar decisiones, no reproducir todas las exploraciones realizadas.',
        'Un tile con una consulta no es automáticamente un KPI correcto. Comprueba granularidad, agregación, unidad, filtros, permisos, refresco y coste. Un Dashboard puede mostrar una vista útil y aun así ocultar una mala definición de la métrica.',
        'La comparación oficial entre Dashboards y Notebooks asigna a los Dashboards cuatro usos: la monitorización continua en tiempo real de aplicaciones, services y sistemas; el seguimiento de métricas clave y KPIs; la visión general de la salud del sistema; y el seguimiento regular del rendimiento frente a los SLOs, detectando anomalías o degradaciones. El análisis ad hoc y troubleshooting, la investigación de incidentes complejos y la documentación y lanzamiento (Documentation and launching) son usos de Notebooks.',
      ],
      bullets: [
        'Define audiencia y frecuencia de consulta.',
        'Muestra unidad, periodo y dimensión.',
        'Evita mezclar señales incompatibles sin explicarlo.',
        'Enlaza el siguiente drill-down o Notebook de investigación.',
      ],
      sourceRefs: [
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'choose',
      title: 'Elegir herramienta',
      lead: 'La diferencia no es estética; es de propósito.',
      paragraphs: [
        'El mismo dato puede aparecer en ambas herramientas, pero la interacción cambia. Si aún estás descubriendo qué significa el dato, usa Notebook. Si ya sabes qué debe vigilar un equipo y quieres hacerlo visible de forma repetible, usa Dashboard.',
        'En escenarios de examen, palabras como “explorar”, “documentar hipótesis” o “compartir análisis” apuntan a Notebook. “Seguimiento continuo”, “estado operativo” o “visión para un equipo” apuntan a Dashboard.',
        'La comparación oficial lo resume así: los Notebooks se leen y los Dashboards se ven. Los Notebooks encajan en training y enablement, documentación, análisis ad hoc y troubleshooting, investigación de incidentes complejos que requieren un análisis más profundo y colaboración para compartir análisis. Los Dashboards encajan en la monitorización continua en tiempo real, el seguimiento de métricas clave y KPIs, la visión general de la salud del sistema y el seguimiento regular de SLOs.',
        'También cambia dónde vive el dato: los datos de un Notebook se almacenan dentro del Notebook, mientras que los datos de un Dashboard se consultan cuando se abre el Dashboard. Por eso un Notebook sirve como evidencia de una investigación pasada y un Dashboard como vista viva.',
      ],
      comparison: {
        headers: ['Necesidad', 'Herramienta preferente', 'Por qué'],
        rows: [
          ['Explorar una anomalía', 'Notebook', 'Permite iterar y narrar'],
          ['Monitorizar un KPI', 'Dashboard', 'Facilita seguimiento recurrente'],
          ['Explicar un incidente', 'Notebook', 'Conserva evidencia y razonamiento'],
          ['Comunicar estado a equipo', 'Dashboard', 'Ofrece vista resumida y repetible'],
        ],
      },
      sourceRefs: [
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
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
      id: 'quality',
      title: 'Calidad y compartición',
      lead: 'Una vista compartida necesita contrato.',
      paragraphs: [
        'Antes de compartir, revisa si la consulta expone datos sensibles, si el receptor tiene permisos y si el timeframe es explícito. Documenta el origen y la última verificación. Si el dato cambia de esquema, un Notebook o Dashboard puede seguir cargando pero responder otra pregunta.',
        'La visualización es una capa de salida. Si el análisis exige datos completos, no uses una métrica muestreada o una extrapolación sin indicarlo. La precisión del mensaje depende de la precisión del dato.',
        'Un caso típico de dato muestreado es el parámetro samplingRatio de fetch logs. Sus valores admitidos son 1 (por defecto, sin muestreo), 10, 100, 1000 y 10000, y con samplingRatio: N el comando devuelve 1/N de los registros de log disponibles: con samplingRatio: 100, un count() se calcula sobre 1/100 de los registros y no es el total real. Para estimar el total hay que extrapolar a mano (multiplicar por el ratio, por ejemplo fieldsAdd c = c*100) e indicar que es una estimación; el parámetro no selecciona hosts, no limita el número de registros y no multiplica el resultado por sí mismo.',
      ],
      bullets: [
        'Fuente y query identificables.',
        'Timeframe y filtros visibles.',
        'Audiencia y permisos entendidos.',
        'Resultado interpretado, no solo decorado.',
        'Enlace a la siguiente investigación.',
      ],
      sourceRefs: [
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
          kind: 'official-docs',
        },
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        { title: 'Data Explorer', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/explorer', kind: 'official-docs' },
      ],
    },
    {
      id: 'notebook-cells',
      title: 'Celdas, narrativa y reproducibilidad',
      lead: 'La unidad de calidad es la secuencia completa, no una celda aislada.',
      paragraphs: [
        'Ordena el Notebook para que otra persona pueda reconstruir el razonamiento: objetivo, contexto, query inicial, inspección, refinamiento, visualización y conclusión. Una celda Markdown debe explicar la intención; una celda DQL debe conservar el periodo y los filtros que hacen reproducible el resultado.',
        'No escondas una transformación importante en una visualización. Si una agregación, conversión o filtro cambia la interpretación, déjalo visible en la consulta o en la explicación. Usa nombres y comentarios que conecten la evidencia con el objetivo del análisis.',
        'Para que una sección Query devuelva siempre el mismo periodo, usa un intervalo absoluto en la propia consulta: el parámetro timeframe de fetch acepta un intervalo ISO 8601, por ejemplo fetch logs, timeframe: "2026-09-30T10:00:00Z/2026-09-30T12:00:00Z". Si el timeframe está definido en la consulta, el selector de timeframe de la sección queda deshabilitado. Un intervalo relativo, como from: now()-2h o Last 2 hours en el selector, cambia en cada ejecución, y una nota en Markdown documenta el periodo pero no filtra los datos.',
      ],
      bullets: [
        'Objetivo y pregunta.',
        'Dataset y timeframe.',
        'Consulta de exploración.',
        'Validación de campos y tipos.',
        'Resultado visual.',
        'Conclusión y siguiente paso.',
      ],
      sourceRefs: [
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        { title: 'Data Explorer', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/explorer', kind: 'official-docs' },
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'visualizations',
      title: 'Visualizaciones y elección de salida',
      lead: 'La forma de salida debe respetar la semántica del dato.',
      paragraphs: [
        'Una tabla es útil para detalle y auditoría; un chart temporal para tendencia; una tarjeta para un KPI ya definido; una distribución para variabilidad. Elegir una visualización llamativa no corrige una métrica mal definida. Declara unidad, periodo, dimensión y si hay muestreo o agregación.',
        'Cuando una query devuelve una serie, comprueba intervalos, timezone, dimensiones y valores ausentes. Cuando devuelve filas, decide si la salida debe ordenar, limitar o agrupar. La visualización debe hacer evidente el patrón que la pregunta solicita.',
        'Dos parámetros de makeTimeseries que afectan directamente al gráfico: interval (la longitud de cada bucket, por ejemplo 5m) y bins (el número de buckets, 120 por defecto) son excluyentes: si indicas uno no puedes indicar el otro, y la consulta con ambos da error. Además, los intervalos sin datos se rellenan por defecto con null, lo que deja huecos en un line chart; el parámetro default (por ejemplo default: 0) define el valor con el que se rellenan esos intervalos vacíos.',
      ],
      comparison: {
        headers: ['Salida', 'Pregunta', 'Riesgo'],
        rows: [
          ['Tabla', '¿Qué registros forman el resultado?', 'Ocultar volumen o duplicados'],
          ['Serie temporal', '¿Cómo evoluciona?', 'Elegir intervalo inadecuado'],
          ['KPI', '¿Cuál es el valor de decisión?', 'Omitir unidad o periodo'],
          ['Distribución', '¿Cómo se reparte?', 'Confundir promedio con población'],
        ],
      },
      sourceRefs: [
        { title: 'Data Explorer', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/explorer', kind: 'official-docs' },
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
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
      id: 'sup-annotations',
      title: 'Anotaciones sobre gráficos',
      lead: 'Una anotación sitúa un evento, como un despliegue, sobre la serie temporal.',
      paragraphs: [
        'Las anotaciones marcan eventos sobre un gráfico de series temporales para correlacionarlos con cambios de la serie. Solo se admiten en las visualizaciones Line, Area y Bar; Single value o Pie chart no tienen eje temporal. Se definen con una consulta DQL que devuelva timestamps y metadatos, con código JavaScript o seleccionando alertas del entorno. Existen en Dashboards y en Notebooks; en un Notebook, las anotaciones son específicas de la sección a la que se añaden.',
        'En el mapeo de campos, name (texto que se muestra en el gráfico) y start (punto de anclaje) son obligatorios; description (tooltip) y end son opcionales, y end convierte el punto en un rango. Con alertas, el mapeo por defecto es event.name para el nombre, event.description para la descripción y event.start y event.end para el intervalo. En la DQL o el código de una anotación puedes usar variables del Dashboard igual que en los tiles, con el prefijo $ (por ejemplo $Host).',
      ],
      comparison: {
        headers: ['Campo', 'Obligatorio', 'Uso'],
        rows: [
          ['name', 'Sí', 'Texto que se muestra en el gráfico'],
          ['start', 'Sí', 'Punto de anclaje'],
          ['description', 'No', 'Tooltip'],
          ['end', 'No', 'Convierte el punto en un rango'],
        ],
      },
      sourceRefs: [
        {
          title: 'Add annotations to dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new/components/dashboard-component-annotation',
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
      id: 'sup-visualization-types',
      title: 'Tipos de visualización y cuándo usarlos',
      lead: 'Cada visualización responde a una forma de pregunta distinta.',
      paragraphs: [
        'Single value muestra una única medida agregada y su tendencia en el tiempo; es la opción para KPIs de negocio o SLOs críticos. Puede añadir una sparkline (área, línea o barras) y un trend, que calcula la diferencia entre el primer y el último elemento de la serie, en valor absoluto o en porcentaje. Si el resultado tiene varias filas, Single value cambia a vista de cuadrícula y muestra hasta 25 valores individuales.',
        'Honeycomb ofrece una vista compacta y de alta densidad de métricas sobre muchas entidades, ideal para monitorizar infraestructura y detectar hotspots; los colores se aplican con reglas condicionales evaluadas de arriba abajo. Histogram visualiza la distribución de valores numéricos en bins, cada uno un rango continuo, por ejemplo la distribución de tiempos de respuesta.',
        'Line, Area y Bar muestran evolución temporal; Table, Raw y Record list muestran registros; Pie y Donut, proporciones; y los mapas (Choropleth, Dot, Connection y Bubble map), datos geográficos. Si eliges una visualización no adecuada para la consulta, un mensaje te pide elegir otra visualización o modificar la consulta.',
      ],
      sourceRefs: [
        {
          title: 'Visualizations',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/edit-visualizations',
          kind: 'official-docs',
        },
        {
          title: 'Single value visualization',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/edit-visualizations/visualization-chart-single-value',
          kind: 'official-docs',
        },
        {
          title: 'Honeycomb visualization',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/edit-visualizations/visualization-honeycomb',
          kind: 'official-docs',
        },
        {
          title: 'Histogram visualization',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/edit-visualizations/visualization-histogram',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'variables-sharing',
      title: 'Variables, filtros y contexto compartido',
      lead: 'Una vista reutilizable necesita controles explícitos.',
      paragraphs: [
        'Si un Notebook o Dashboard permite cambiar periodo, entidad, entorno o dimensión, documenta cómo esos controles afectan cada celda o tile. Un filtro aplicado a una parte de la página puede crear una comparación inconsistente si el usuario cree que afecta a todo.',
        'Comprueba valores por defecto, estados vacíos y permisos del receptor. El hecho de que el autor vea resultados no prueba que quien recibe el documento vea los mismos datos. Conserva enlaces y nombres de entidad de forma que el análisis se pueda retomar.',
        'No todos los tiles aceptan cualquier variable: en los tiles Explore de un Dashboard, añadir variables solo funciona con variables single-select combinadas con el operador =; una variable con Multi-select activado no se puede aplicar en Explore, aunque sí funcione en los tiles Query.',
        'Para los estados vacíos, makeTimeseries no devuelve ninguna serie cuando el filtro no encuentra registros, y el lector puede dudar de si el tile funciona. El parámetro nonempty: true hace que se produzcan series vacías cuando no hay datos, en lugar de no devolver nada.',
      ],
      bullets: [
        'Qué controles existen.',
        'A qué celdas o tiles afectan.',
        'Qué valor por defecto se aplica.',
        'Cómo se comporta un conjunto vacío.',
        'Qué permisos necesita la audiencia.',
      ],
      sourceRefs: [
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards and Notebooks overview',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'dashboard-operations',
      title: 'Dashboard operativo y drill-down',
      lead: 'El Dashboard detecta; el análisis explica.',
      paragraphs: [
        'Un Dashboard operativo debe llevar de un indicador a la entidad, la query o el Notebook que permiten investigar. Si solo presenta semáforos, el equipo sabe que algo cambió pero no qué evidencia revisar. Diseña títulos, unidades y enlaces para reducir ese salto.',
        'Revisa refresco, periodo y coste. Un panel puede quedar visualmente correcto mientras sus datos están obsoletos o sus tiles consultan ventanas distintas. En un escenario, la mejor respuesta suele ser enlazar el KPI con el drill-down correcto, no añadir otra tarjeta.',
        'La primera vez que abres un Dashboard, su refresh rate está en Off: no hay refresco automático y los tiles mantienen los valores del momento de apertura hasta que refrescas o cambias el timeframe. Para una pantalla de NOC hay que elegir un intervalo de refresco; si lo cambias, ese valor se recuerda la próxima vez que abras el Dashboard.',
      ],
      bullets: [
        'Indicador con definición.',
        'Timeframe visible.',
        'Estado y tendencia separados.',
        'Enlace al contexto de entidad.',
        'Drill-down reproducible.',
        'Permisos y coste revisados.',
      ],
      sourceRefs: [
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards and Notebooks overview',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks',
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
      id: 'sup-navigation-links',
      title: 'Open with, enlaces y navegación con contexto',
      lead: 'Pasar de un tile a otra app sin perder el contexto acelera el drill-down.',
      paragraphs: [
        'Open with muestra acciones que puedes realizar en otras apps de Dynatrace con los datos seleccionados. Los Suggested app links aparecen sin configuración manual cuando los datos lo permiten: por ejemplo, si el resultado contiene un host ID se ofrece Go to Host. Ambos pasan el contexto de la selección (campos y entidades, timeframe y filtros aplicados); no reenvían la DQL del tile. Cuanto más concreta es la selección, más acotado es el contexto: seleccionar un punto de datos transmite un contexto más específico que seleccionar todo el tile.',
        'En enlaces manuales a un Dashboard o Notebook, una ruta relativa (/ui/dashboards/...) abre en la misma pestaña y una URL absoluta (https://<environment>/ui/dashboards/...) abre una pestaña nueva. Los custom links se crean desde el menú de la visualización, pero las visualizaciones de mapa (Choropleth, Dot, Connection y Bubble map) no admiten custom links. Las tablas admiten columnas Markdown con enlaces: una URL sin más, un enlace con nombre [Display](URL) o enlaces basados en intents.',
      ],
      sourceRefs: [
        {
          title: 'Drilldowns and navigation',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/drilldowns-and-navigation',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sharing-governance',
      title: 'Compartición, permisos y gobierno',
      lead: 'Compartir conocimiento también comparte el contrato de datos.',
      paragraphs: [
        'Antes de publicar, identifica audiencia, permisos, datos sensibles, propietario y ciclo de revisión. La lectura de un Notebook o Dashboard no implica permisos para editar queries, cambiar settings o ejecutar una acción. El acceso debe seguir mínimo privilegio.',
        'Añade fecha de verificación y fuente oficial cuando el resultado dependa de una capacidad, retención o versión. Retira o actualiza vistas que ya no representen el modelo de datos vigente; una visualización heredada puede perpetuar una decisión errónea.',
        'En Notebooks cada acción tiene su propio permiso: document:documents:read permite acceder a los Notebooks; document:documents:write, crearlos y actualizarlos (guardar cambios); document:documents:delete, eliminarlos; document:trash.documents:read y document:trash.documents:restore, ver y restaurar los eliminados; y document:direct-shares:read, acceder a los compartidos directamente. Quien solo tiene read puede abrir, pero no crear ni guardar.',
      ],
      bullets: [
        'Audiencia y scope.',
        'Propietario y permisos.',
        'Datos sensibles o PII.',
        'Fecha y fuente de verificación.',
        'Ciclo de revisión.',
        'Enlace para corregir o ampliar.',
      ],
      sourceRefs: [
        {
          title: 'Dashboards and Notebooks overview',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'review-readiness',
      title: 'Revisión antes de confiar en una vista',
      lead: 'Una vista está lista cuando responde y se puede auditar.',
      paragraphs: [
        'Antes de usar un Dashboard o Notebook como evidencia, ejecuta una revisión adversarial: cambia el periodo, comprueba una entidad conocida, inspecciona una muestra, compara con otra fuente y prueba el caso vacío. Pregunta qué afirmación dejaría de ser cierta si cambia la retención, el permiso o el esquema.',
        'Esta rutina convierte la herramienta en preparación para examen: obliga a justificar la fuente, la unidad, el filtro y la limitación. Una respuesta precisa puede decir “con los datos y permisos disponibles” en lugar de prometer una universalidad que la documentación no garantiza.',
      ],
      bullets: [
        '¿Qué pregunta responde?',
        '¿Qué fuente y record type usa?',
        '¿Qué periodo y unidad representa?',
        '¿Qué permiso necesita?',
        '¿Qué caso límite rompe la interpretación?',
        '¿Qué fuente oficial verifica el comportamiento?',
      ],
      sourceRefs: [
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-notebook-sections',
      title: 'Anatomía de un Notebook y tipos de secciones',
      lead: 'Un Notebook combina exploración, consulta, código y narrativa.',
      paragraphs: [
        'Las secciones Explore permiten analizar logs, métricas, business events y otros datos con una interfaz point-and-click. Query escribe DQL contra Grail y ofrece autocomplete y timeframe; Code devuelve datos mediante Dynatrace functions en JavaScript; Markdown aporta contexto, enlaces, imágenes y conclusiones. Un Notebook grande se organiza con el panel de secciones, duplicación, ocultación, ejecución parcial o ejecución de todo el documento.',
        'El valor pedagógico de un Notebook está en dejar visible la pregunta, los filtros, la consulta, la visualización y la interpretación. Las variables (`$variable`) son una función de Dashboards: la documentación de Notebooks no describe variables, así que en un Notebook el contexto se ajusta con el timeframe y los segments de cada sección.',
        'Mientras escribes DQL en una sección Query, el atajo Ctrl+Space muestra las sugerencias de autocompletado en cualquier momento.',
      ],
      bullets: [
        'Explore: descubrimiento guiado visual.',
        'Query: consulta DQL directa y visualización sobre Grail.',
        'Code: lógica avanzada en JavaScript con Dynatrace AppEngine SDK.',
        'Markdown: explicación, notas y documentación reproducible.',
        'Timeframe y segments por sección: el contexto que filtra cada consulta.',
        'Prompt: una pregunta en lenguaje natural que la IA generativa traduce a una consulta DQL.',
      ],
      sourceRefs: [
        {
          title: 'Dashboards and Notebooks overview',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-notebook-section-actions',
      title: 'Secciones de Notebook: acciones, resultados y análisis',
      lead: 'Cada sección se ejecuta, oculta, exporta o reutiliza de forma independiente.',
      paragraphs: [
        'Un Notebook admite secciones Explore (exploración point-and-click de logs, métricas y business events, sin escribir DQL), Query (muestra datos consultados en Grail con DQL), Code (muestra datos devueltos por JavaScript ejecutado como Dynatrace function, por ejemplo tras llamar a una API externa) y Markdown (contenido estático editado en Markdown, ideal para la narrativa), además de la sección Prompt, que usa IA generativa para traducir preguntas en lenguaje natural a consultas DQL. No existe un tipo de sección Custom Function. Desde una sección Explore, Create DQL section crea una sección Query con la DQL equivalente para seguir trabajando con la consulta explícita.',
        'Run ejecuta una sección y Run all, en el menú x sections de la esquina superior derecha del Notebook, ejecuta todas las secciones del Notebook; desde ese menú también puedes fijar el timeframe de todas las secciones seleccionadas. Clear result borra el resultado de la sección pero conserva su consulta, así que basta con volver a ejecutarla; Delete section elimina la sección entera. Hide input oculta la consulta o el código de la sección y deja visible solo el resultado, lo que permite presentar un informe sin mostrar la DQL. Duplicate section copia la sección para reutilizarla.',
        'Cada sección Query tiene su propio selector de timeframe; si el timeframe se define en la propia consulta, el selector queda deshabilitado y manda el intervalo de la consulta. Cada sección tiene también su propio selector de segments: un segment aplicado en una sección solo filtra esa sección.',
        'El menú de la sección incluye Download result con tres formatos: CSV (con las columnas visibles y su formato), CSV (raw) (todos los datos, sin formato) y JSON; no hay exportación de resultados a XLSX ni a PDF. Add to dashboard lleva la sección a un Dashboard y Open with abre la sección en otra app de Dynatrace. Para enlazar desde Markdown a una sección concreta de otro Notebook se usa la ruta del Notebook seguida de # y el identificador de la sección.',
        'En una serie temporal puedes elegir la visualización Davis AI analysis. El analyzer Forecast (Prediction) predice la evolución de la serie, por ejemplo cuándo se llenará un disco; los analyzers de anomaly detection (Static threshold, Auto adaptive threshold y Seasonal baseline) detectan desviaciones, no predicen. El analyzer admite análisis de hasta 1000 series: con un split por miles de entidades hay que filtrar o reducir el split antes de analizar.',
        'Para probar una expresión (por ejemplo un parse) sin ingerir nada, una sección Query puede empezar con el comando data, que genera datos de ejemplo en tiempo de consulta a partir de record() o de un JSON. En cambio, fetch lee datos ingeridos en Grail, load carga datos de lookup almacenados y el comando lookup enriquece registros existentes.',
      ],
      bullets: [
        'Explore → Create DQL section → Query con la DQL equivalente.',
        'Clear result: borra el resultado, conserva la consulta.',
        'Hide input: oculta la consulta, conserva el resultado.',
        'Download result: CSV, CSV (raw) o JSON.',
        'Davis AI analysis: Forecast predice; anomaly detection detecta; hasta 1000 series.',
      ],
      code: '[Ver el análisis](/ui/apps/dynatrace.notebooks/notebook/<notebookid>#<sectionid>)\n\ndata record(content = "2026-10-01 ERROR user=42 code=500"),\n     record(content = "2026-10-01 INFO user=7 code=200")\n| fieldsAdd isError = contains(content, "ERROR")',
      codeNote: 'Primera línea: enlace Markdown a una sección concreta de otro Notebook. Después: una sección Query que prueba una expresión con datos de ejemplo generados por data, sin leer Grail.',
      sourceRefs: [
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
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
      id: 'deep-dashboard-model',
      title: 'Anatomía de un Dashboard, tiles y variables',
      lead: 'El Dashboard convierte análisis en seguimiento operativo o comunicación continua.',
      paragraphs: [
        'Los Dashboards en Latest Dynatrace soportan diversos tipos de tiles: Explore tiles (exploración point-and-click sin DQL), Code tiles (JavaScript ejecutado como Dynatrace function), Query tiles (ejecutan DQL y renderizan gráficos de barras, líneas, tablas o single values), Markdown tiles (para añadir títulos y notas explicativas; las anotaciones de eventos se configuran sobre los gráficos, no en tiles Markdown) y componentes como Service-Level Objectives, Image y Variables. El documento completo se almacena como una estructura JSON declarativa accesible y editable mediante la Document API.',
        'Las variables permiten dinamizar el Dashboard. Se referencian en DQL mediante la sintaxis `$variable`. Una variable puede ser de tipo DQL, Code, List o Free Text. Las variables pueden depender jerárquicamente de otras (por ejemplo, filtrar Procesos según el Host seleccionado), pero las dependencias circulares están prohibidas. La clave de una variable no puede comenzar por el prefijo reservado de sistema `dt_`.',
        'Un tile Query necesita, además de storage:buckets:read, el permiso de lectura de cada tabla que consulta: storage:logs:read para fetch logs, storage:spans:read para fetch spans, storage:events:read para eventos, storage:metrics:read para métricas. Con buckets y logs, pero sin storage:spans:read, los tiles de logs muestran datos y un tile con fetch spans queda vacío. document:documents:write afecta al documento, no a la lectura de datos de Grail.',
      ],
      comparison: {
        headers: ['Elemento', 'Propósito en Dashboards', 'Regla Técnica / Restricción'],
        rows: [
          ['Query Tile', 'Ejecuta DQL contra Grail', 'Requiere permisos de lectura sobre las tablas consultadas'],
          ['Markdown Tile', 'Títulos, notas y texto enriquecido', 'No ejecuta código dinámico; admite Markdown estándar'],
          ['Variable ($var)', 'Filtro reactivo interactivo', 'No puede comenzar con prefijo reservado `dt_`'],
          ['Document API JSON', 'Estructura declarativa del cuadro', 'Permite exportar y sincronizar dashboards con GitOps'],
          ['Drilldown Action', 'Enlace con contexto hacia Notebook/App', 'Transmite timeframe, entity IDs y filtros activos'],
        ],
      },
      sourceRefs: [
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
          kind: 'official-docs',
        },
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
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
      id: 'sup-dashboard-tiles-timeframe',
      title: 'Dashboards: tiles, timeframe, refresco y segments',
      lead: 'Saber qué intervalo y qué filtro usa cada tile evita cifras que no cuadran.',
      paragraphs: [
        'Desde el menú Add de un Dashboard creas tiles Explore (exploración point-and-click de logs, métricas y business events, sin conocimientos de DQL ni de código), Query (DQL), Code (JavaScript ejecutado como Dynatrace function) y Markdown, además de Service-Level Objectives, Image y Variables. La consulta o el código de un tile se definen en su pestaña Data. Un tile Query admite cualquier DQL, por eso es la opción cuando necesitas una transformación que Explore no ofrece. Las anotaciones no son un tile: se configuran sobre un gráfico.',
        'El Dashboard tiene un timeframe global que siguen los tiles sin override. Un tile puede definir su propio Custom timeframe, que prevalece sobre el global para ese tile aunque cambies el selector del Dashboard. Si la DQL del tile define el timeframe (por ejemplo, fetch events, from: now()-7d), el selector de timeframe queda deshabilitado y se usa el intervalo de la consulta. El timeframe por defecto que configuras en Settings se aplica solo a una nueva sesión con el Dashboard; la vista abierta conserva su selección.',
        'La primera vez que abres un Dashboard, el refresh rate está en Off (sin refresco automático). Si lo cambias, ese valor se recuerda la próxima vez que abras el Dashboard. Un refresco más frecuente no acelera nada: vuelve a ejecutar las consultas y aumenta la carga.',
        'Los segments se seleccionan a nivel de Dashboard y a nivel de tile, y las selecciones de segment del tile sustituyen (override) a las del Dashboard para ese tile; no se combinan. Los segments se aplican automáticamente sobre las consultas de los tiles y conviene usarlos cuando quieres reutilizar el mismo filtro entre Dashboards. Si necesitas más control sobre cómo se aplica el filtro, como elegir el operador (==, startsWith, in) o cómo depende de otros filtros, usa variables, que referencias explícitamente en la DQL.',
        'Si la misma DQL devuelve cifras distintas en un Notebook y en un Dashboard, comprueba primero el contexto de ejecución: el timeframe efectivo y los valores de variables, filtros y segments aplicados. La visualización, la posición del tile o el owner del documento no cambian los registros que devuelve la consulta.',
        'Si editas un Dashboard en el que no tienes permiso de escritura, los cambios son temporales: puedes guardarlos con Save as new, que crea una copia nueva con tus cambios, o descartarlos. Cuando ejecutas un tile o una sección Code escritos por otra persona, Dynatrace ejecuta ese JavaScript con tu cuenta de usuario y tus permisos; por eso, antes de ejecutarlo, puedes revisarlo en la página Review code y aprobarlo solo esta vez con Accept and run o de forma permanente marcando Always trust code in this document antes de Accept and run.',
        'Dashboards guarda versiones automáticamente: puedes acceder a las 50 versiones más recientes y cada versión está disponible hasta 30 días. Desde el historial, Preview muestra una versión, Restore cambia el Dashboard a la versión elegida, Make a copy crea un Dashboard nuevo a partir de esa versión y deja el original sin cambios, y Download guarda el JSON de la versión. Un tile de Dashboard se copia a un Notebook como sección con Add to notebook (nuevo o existente); en sentido inverso, una sección de Notebook llega a un Dashboard con Add to dashboard.',
        'Para que un Dashboard cargue rápido, aplica las DQL best practices en cada tile: acota el timeframe (una ventana más corta rinde mejor con los mismos datos), filtra lo antes posible con filter o search, selecciona campos pronto con fields, fieldsKeep o fieldsRemove y coloca sort al final de la consulta, porque ordenar justo después de fetch y seguir procesando reduce el rendimiento.',
      ],
      comparison: {
        headers: ['Configuración del tile', 'Intervalo que usa', 'Al cambiar el selector global'],
        rows: [
          ['Sin override', 'El timeframe global del Dashboard', 'Sigue al selector global'],
          ['Custom timeframe del tile', 'El del tile', 'Lo conserva: el tile prevalece'],
          ['Timeframe en la DQL (from:)', 'El de la consulta', 'Selector del tile deshabilitado'],
        ],
      },
      sourceRefs: [
        {
          title: 'Dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new',
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
      id: 'sup-dashboard-variables',
      title: 'Variables de Dashboard: tipos, claves y uso',
      lead: 'Una variable es un parámetro explícito que tú decides dónde y cómo aplicar.',
      paragraphs: [
        'Una variable de Dashboard puede ser de cuatro tipos: DQL (el valor lo devuelve una consulta que escribes al definir la variable, útil para descubrir valores actuales como los servicios existentes), Code (el valor lo devuelve código que escribes, por ejemplo tras llamar a una API externa), List (una lista de valores separados por comas, CSV, para un conjunto fijo y controlado) y Free Text (texto libre que escribe el lector, con un Default value opcional).',
        'Dynatrace deriva la clave de la variable a partir de su nombre sustituyendo cualquier carácter que no sea letra o número por _ (por ejemplo, Error Rate da Error_Rate), y la clave no puede empezar por el prefijo reservado dt_. En consultas, código, Markdown y títulos se referencia con el prefijo $, como $Error_Rate.',
        'Para ofrecer un conjunto fijo de valores y permitir elegir varios a la vez, usa una variable List con Multi-select activado. Con Multi-select, el lector puede elegir varios valores a la vez; en DQL hay que envolver la variable con array() y usar in(), por ejemplo filter in(host.name, array($Host)). Si no defines un Default value, se selecciona el primer valor disponible.',
        'Display as filter on dashboard controla si la variable se muestra como filtro: al desactivarlo se oculta el selector, pero los tiles siguen usando la variable. Una variable oculta resuelve su valor automáticamente a partir de las opciones disponibles: una multi-select oculta se resuelve a * (todas las opciones) y una single-select oculta, a la primera opción disponible. Una variable oculta no usa el Default value almacenado: ese valor se conserva y vuelve a aplicarse si haces visible de nuevo la variable; para fijar una variable oculta a un valor concreto, usa una variable Free Text.',
        'Las variables sirven para filtrar el contenido del Dashboard o para actuar como valores en tiles Code. Se usan en tiles DQL, en tiles Code (por seguridad, solo dentro de la default function), en tiles Markdown y en títulos de tile, y también en la DQL o el código de las anotaciones. En tiles Explore solo funcionan las variables single-select combinadas con el operador =.',
        'Una variable puede referirse a otra en su definición (por ejemplo, Servicio según Región): el valor de una variable se recalcula si su definición se refiere a otra variable que cambia. No se permiten bucles: si A depende de B, B no puede depender de A. Los valores seleccionados viajan en la URL del Dashboard, pero si los valores de las variables superan 30 KB no pueden almacenarse en la URL.',
      ],
      code: 'fetch logs\n| filter in(host.name, array($Host))   // $Host con Multi-select\n| makeTimeseries count(), by:{ host.name }',
      codeNote: 'Con single-select basta host.name == $Host; con Multi-select la variable contiene varios valores y se usa in() con array().',
      sourceRefs: [
        {
          title: 'Dashboard variables',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new/components/dashboard-component-variable',
          kind: 'official-docs',
        },
        {
          title: 'Add annotations to dashboards',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new/components/dashboard-component-annotation',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dashboard-json',
      title: 'El documento JSON de un Dashboard',
      lead: 'tiles define el contenido; layouts, la posición en una cuadrícula de 24 columnas.',
      paragraphs: [
        'Un Dashboard de Latest Dynatrace es un documento JSON que se gestiona de forma programática con la Document API. Sus propiedades raíz obligatorias son version, variables, tiles y layouts; settings es opcional. Desde la versión 1.344 de Dynatrace, un dashboard que no supera la validación no se carga.',
        'Los IDs de los tiles en tiles deben coincidir con los IDs en layouts: un tile sin una entrada en layouts con su mismo ID no queda colocado. La cuadrícula tiene 24 columnas y x, y, w y h son posición horizontal, posición vertical, ancho y alto en unidades de cuadrícula: dos tiles con w: 12 en x: 0 y x: 12 de la misma fila quedan uno junto al otro, cada uno con la mitad del ancho.',
        'Un data tile requiere title, query, visualization y los objetos visualizationSettings y querySettings, que pueden estar vacíos. Un tile markdown guarda su texto en content y no ejecuta DQL. Si un solo tile necesita otra ventana de tiempo, se expresa en la propiedad timeframe del data tile, que debe ser un objeto y no una cadena. Un tile también puede llevar su propio filtro de segments.',
      ],
      code: '"tiles": {\n  "1": { "type": "data", "title": "Errores", "query": "fetch logs | filter loglevel == \\"ERROR\\"",\n         "visualization": "lineChart", "visualizationSettings": {}, "querySettings": {},\n         "timeframe": { "tileTimeframeEnabled": true,\n                        "tileTimeframe": { "from": "now()-24h", "to": "now()" } } },\n  "2": { "type": "markdown", "content": "# Notas del turno" }\n},\n"layouts": {\n  "1": { "x": 0,  "y": 0, "w": 12, "h": 6 },\n  "2": { "x": 12, "y": 0, "w": 12, "h": 6 }\n}',
      codeNote: 'Los IDs "1" y "2" coinciden en tiles y layouts. Con 24 columnas, w: 12 es medio ancho: los dos tiles quedan lado a lado.',
      sourceRefs: [
        {
          title: 'Dashboard document structure',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/document-api/document-structure-dashboards',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-document-sharing',
      title: 'Sharing, ownership y acceso a datos',
      lead: 'Compartir el documento no elimina los permisos sobre las funciones o los datos.',
      paragraphs: [
        'El owner puede conceder acceso para todo el environment, seleccionar usuarios o grupos y crear share links. El acceso puede ser `Can view` o `Can edit`; un viewer puede leer la investigación, pero no debe asumirse que puede ejecutar todas las funciones, guardar cambios o consultar campos restringidos. Los permisos de documentos, AppEngine y Grail pueden interactuar.',
        'Cambiar el owner es una transferencia, no una copia: el owner anterior pierde el acceso inmediatamente. Cuando una pregunta pide un documento colaborativo, elige el nivel que satisface la necesidad sin añadir capacidad de escritura. Si un Notebook se abre como read-only pero la consulta base no devuelve datos, diagnostica document permission y data permission por separado.',
        'Ejemplo de data permission: compartir un Notebook, aunque sea con Can edit, no da permisos sobre Grail. Para que una sección Query con fetch logs devuelva registros, quien la ejecuta necesita en sus políticas storage:buckets:read (nivel bucket) y storage:logs:read (nivel tabla). Si tú ves registros y tu compañero no, revisa primero esos permisos de datos, no el nivel de sharing ni el share link.',
      ],
      bullets: [
        'Can view: lectura del documento.',
        'Can edit: cambios y ejecución dentro del alcance autorizado.',
        'Share link: acceso según el permiso del enlace.',
        'Owner: controla sharing y ownership.',
        'Data permissions: siguen aplicando al contenido subyacente.',
      ],
      sourceRefs: [
        {
          title: 'DQL language reference',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-query-language/dql-reference',
          kind: 'official-docs',
        },
        { title: 'Data Explorer', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/explorer', kind: 'official-docs' },
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-sharing-methods',
      title: 'Métodos de sharing y niveles Can view y Can edit',
      lead: 'Elige el método y el nivel que cubren la necesidad sin dar más capacidad de la necesaria.',
      paragraphs: [
        'Dashboards y Notebooks se comparten de tres formas: Access for all (view-only), que da acceso de solo lectura a todo el entorno; Share access, para elegir usuarios o grupos con Can view o Can edit; y Share links, URLs con permiso de view o edit que los destinatarios pueden reenviar a otras personas del entorno, que reciben el mismo nivel de permiso. Un Share link no lo puede usar nadie fuera del entorno de Dynatrace.',
        'Can view permite mostrar el documento, ajustar timeframe y filtros, refrescar, maximizar tiles, copiar tiles, guardar una copia y exportar la definición JSON; no permite guardar cambios en el original. Can edit añade modificar el contenido, el layout y el nombre, añadir o cambiar datos, código y Markdown, y gestionar variables y filtros, pero no puede compartir, cambiar el owner ni eliminar el documento. Compartir queda reservado al owner salvo que active Allow editors to share, que permite compartir también a los editores.',
        'Cambiar el owner es una transferencia: al cambiar el owner del documento pierdes el acceso inmediatamente y solo lo recuperas si el nuevo owner lo comparte contigo.',
        'En Dashboards Classic existían los Dashboard reports: están desactivados por defecto y, si se activan para un dashboard, los usuarios con acceso pueden suscribirse a reports semanales (cada lunes) o mensuales (el primer lunes del mes). El email no contiene el contenido del report, sino un enlace público que no requiere credenciales. Dynatrace recomienda migrar a la nueva app Dashboards.',
      ],
      comparison: {
        headers: ['Acción', 'Can view', 'Can edit', 'Owner'],
        rows: [
          ['Ajustar timeframe y filtros, exportar JSON, guardar una copia', 'Sí', 'Sí', 'Sí'],
          ['Guardar cambios en el original', 'No', 'Sí', 'Sí'],
          ['Compartir', 'No', 'Solo con Allow editors to share', 'Sí'],
          ['Cambiar el owner o eliminar', 'No', 'No', 'Sí'],
        ],
      },
      sourceRefs: [
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
          kind: 'official-docs',
        },
        {
          title: 'Notebooks',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
          kind: 'official-docs',
        },
        { title: 'Dashboard reports (Classic)', url: 'https://docs.dynatrace.com/docs/shortlink/dashboard-reports', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-analysis-recipe',
      title: 'Receta de análisis reproducible',
      lead: 'Construye el documento desde la hipótesis y no desde una visualización al azar.',
      paragraphs: [
        'Primero escribe la pregunta en Markdown: disponibilidad, tendencia, causa, comportamiento, negocio o seguridad. Después elige el record type y timeframe. Empieza con una consulta pequeña para confirmar campos y tipos; añade filtros; selecciona campos; agrega o crea una serie temporal; visualiza y documenta la lectura. Conserva un ejemplo de resultado y la limitación conocida.',
        'Un Dashboard puede reutilizar una sección de Notebook (Add to dashboard), pero la transferencia debe mantener la consulta, la visualización y el contexto. Una tabla útil para operaciones no siempre es la mejor visualización para un stakeholder. El criterio no es “qué gráfico queda mejor”, sino qué forma evita una interpretación errónea.',
        'Cuidado al pasar de la exploración a la agregación: las DQL best practices advierten que no se use limit antes de agregar, porque produce agregados erróneos. Si exploraste con limit 20 y después añades summarize, solo se cuentan 20 registros; quita el limit antes de agregar o muévelo detrás de summarize.',
      ],
      bullets: [
        'Pregunta y audiencia.',
        'Fuente, timeframe y scope.',
        'Query mínima validada.',
        'Reducción, agregación y visualización.',
        'Conclusión, limitación y enlace a la fuente.',
      ],
      sourceRefs: [
        {
          title: 'Business event analysis',
          url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-analysis',
          kind: 'official-docs',
        },
        {
          title: 'DQL best practices',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/dql-best-practices',
          kind: 'official-docs',
        },
        {
          title: 'Dashboards and Notebooks overview',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Puedo elegir Notebook o Dashboard en un escenario.',
    'Sé escribir una narrativa de investigación reproducible.',
    'Compruebo filtros, periodo, unidad y permisos antes de compartir.',
    'Puedo detectar cuándo un gráfico oculta un problema de datos.',
    'Ordeno celdas desde pregunta hasta conclusión.',
    'Elijo visualización por semántica, no por apariencia.',
    'Verifico variables, filtros y comportamiento vacío.',
    'Diseño un drill-down desde KPI hasta evidencia.',
    'Comparto con mínimo privilegio y fecha de verificación.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
