import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Other».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Other reúne capacidades que aparecen constantemente en investigaciones: topología, logs, entidades, parsing, lookups y Dynatrace Hub. Es el módulo que te ayuda a conectar piezas que ya estudiaste. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Leer relaciones de Smartscape.',
    'Investigar logs de forma reproducible.',
    'Distinguir entidades y niveles.',
    'Usar Hub sin asumir instalación o disponibilidad.',
    'Separar DQL, DPL, entity model y visualización.',
    'Evaluar una integración y su enriquecimiento con evidencia.',
  ],
  sections: [
    {
      id: 'smartscape',
      title: 'Smartscape y topología',
      lead: 'Una topología responde cómo se relacionan los objetos.',
      paragraphs: [
        'Smartscape modela entidades y dependencias observadas. Host, process group instance, service, application, database y otras entidades ocupan niveles diferentes. El drill-down correcto depende de dónde aparece el síntoma.',
        'La ausencia de una relación puede tener causas de datos, soporte tecnológico, lifetime, timeframe, permisos o modelo de correlación. Revisa el contexto antes de afirmar que el mapa está equivocado.',
        'En Smartscape on Grail las aristas (edges) son estáticas o dinámicas. Una arista estática hereda el lifetime del nodo y se basa sobre todo en configuración (por ejemplo, un disco conectado a un host). Una arista dinámica se registra para un momento concreto y se basa en señales de monitorización, como las trazas que muestran que un servicio llama a otro: SERVICE calls SERVICE es dinámica, así que si hoy no ha habido llamadas, una consulta de la última hora devuelve ambos nodos SERVICE pero no la arista calls.',
        'Los tipos de arista se leen del origen al destino: calls indica quién llama a quién, runs_on dónde se ejecuta algo (proceso, host, contenedor) y belongs_to pertenencia (por ejemplo, DISK belongs_to HOST). Una aplicación frontend monitorizada con RUM es el node type FRONTEND y se conecta con los servicios que utiliza mediante la arista FRONTEND calls SERVICE.',
      ],
      bullets: [
        'Entidad: objeto monitorizado o modelado.',
        'Relación: vínculo entre entidades.',
        'Topología: conjunto de entidades y relaciones.',
        'Lifetime: periodo en que la relación se considera válida.',
        'Contexto: fuente que permite construir el vínculo.',
      ],
      sourceRefs: [
        { title: 'Smartscape', url: 'https://docs.dynatrace.com/docs/shortlink/smartscape', kind: 'official-docs' },
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
    {
      id: 'sup-smartscape-app',
      title: 'App Smartscape: nodos, grupos, búsqueda, filtros y layouts',
      lead: 'La app Smartscape dibuja la topología como un grafo que puedes buscar, filtrar y reorganizar sin cambiar los datos.',
      paragraphs: [
        'En la app Smartscape, los nodes representan entidades (hosts, procesos, servicios…) y se dibujan como círculos; los edges representan relaciones o dependencias entre nodos y se dibujan como líneas; los groups son colecciones de nodos que comparten una característica o contexto común, y nodos y grupos admiten varios niveles de anidamiento. Las vistas de Smartscape solo muestran entidades nuevas de Smartscape on Grail: los entity types de Smartscape Classic no se muestran ni se soportan.',
        'Para localizar una entidad, la búsqueda admite un nombre completo o parcial (está tokenizada: elastic cache y elasticcache devuelven lo mismo) o un ID completo o parcial, como AWS_ELASTICACHE_USERGROUP-2759FE0518A12C3B. Los nodos coincidentes se resaltan en el grafo y los no coincidentes se atenúan; no se eliminan.',
        'Los filtros acotan la vista a los nodos, edges o problems relevantes sin modificar los datos: Filter by nodes admite claves como name, hostname o id; Filter by edges usa las claves estándar source_id, source_type, target_id, target_type y type; Filter by problems usa event.name, event.status, event.category, event.id y display_id. La práctica recomendada es aplicar segmentos para reducir el grafo a los datos de tu equipo. Los segmentos solo filtran nodos, y en vistas anidadas, si el segmento filtra un grupo padre, no verás sus nodos hijos aunque el segmento no les afecte directamente.',
        'La leyenda ofrece tres layouts: Force (distribución física que reparte las entidades para reducir solapes), Vertical (capas de arriba abajo) y Horizontal (capas de izquierda a derecha). En View topology, en los modos Related nodes y Direct calls con layout horizontal, el trigger node aparece resaltado en el centro; el grupo source (izquierda) contiene las entidades que llaman o usan el trigger node y el grupo target (derecha), las entidades que el trigger node llama o usa. En los modos de call chain el trigger node se coloca en un extremo: a la izquierda (horizontal) o arriba (vertical) en Downstream call chain, y a la derecha o abajo en Upstream call chain. View topology no aplica los filtros al trigger node, que siempre permanece visible.',
        'Los nodos y edges de la app no siempre se corresponden 1:1 con los de Smartscape on Grail: las vistas pueden adaptar relaciones y enriquecerse con datos de otras fuentes, como AI Observability, Security Enrichment o apps de negocio. Una arista de la vista que no existe tal cual en Smartscape on Grail no es necesariamente un error.',
      ],
      bullets: [
        'Search: nombre o ID, completo o parcial; resalta y atenúa.',
        'Filters: nodes, edges (source_id, source_type, target_id, target_type, type) y problems.',
        'Segments: filtran nodos; un padre filtrado oculta a sus hijos.',
        'Layouts: Force, Vertical y Horizontal.',
      ],
      sourceRefs: [
        {
          title: 'Smartscape concepts',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-concepts',
          kind: 'official-docs',
        },
        {
          title: 'Smartscape views',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-views',
          kind: 'official-docs',
        },
        {
          title: 'View topology',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-in-context-views/smartscape-view-topology',
          kind: 'official-docs',
        },
        { title: 'Smartscape on Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/smartscape-on-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-problem-graph',
      title: 'Problem graph: alcance de los Problems activos',
      lead: 'El Problem graph superpone los Problems activos sobre la topología para ver alcance y concentración.',
      paragraphs: [
        'El Problem graph muestra los Problems detectados con sus affected nodes, related nodes y root causes, pero solo Problems con estado ACTIVE: los Problems CLOSED no aparecen en el grafo, aunque sigan en el histórico de la app Problems. Los affected nodes son los elementos de Smartscape directamente impactados (hosts, procesos, servicios, aplicaciones, workloads de Kubernetes); los related nodes son nodos de Smartscape conectados de forma indirecta que aportan contexto para el troubleshooting.',
        'Dos lecturas son clave. Los Problems de alto impacto son los que afectan al mayor número de entidades. Los nodos afectados por varios Problems (problem-heavy nodes) concentran incidencias y ayudan a priorizar las áreas que requieren atención inmediata: en el grafo se ven como un mismo nodo afectado conectado a varios Problems. Para acotar el grafo a tu área, selecciona uno o varios segmentos y verás solo los Problems y nodos del área de responsabilidad de tu equipo. Para el análisis detallado, la root cause y las recomendaciones de resolución, abre el Problem en la app Problems.',
      ],
      sourceRefs: [
        {
          title: 'Problem graph',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/smartscape/smartscape-views/problem-graph',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'logs',
      title: 'Investigación de logs',
      lead: 'Filtra primero, parsea después, relaciona al final.',
      paragraphs: [
        'Una investigación de logs empieza por acotar periodo, fuente, host, servicio, severidad y patrón. Después inspecciona el contenido real y crea campos estructurados mediante parsing. Finalmente relaciona el log con entidad, Problem, trace o evento.',
        'No leas millones de registros sin hipótesis ni concluyas a partir de un mensaje aislado. Conserva timestamps, query, muestra y filtros para que otra persona pueda repetir el análisis.',
        'Una señal puede tener varios campos dt.smartscape.<type> (por ejemplo, host, proceso y servicio); dt.smartscape_source.id apunta a la fuente exacta que la originó y dt.smartscape_source.type describe su tipo.',
        'Cómo leer la consulta de ejemplo: fetch logs, from: -1h lee la última hora; filter contains(content, "timeout") conserva los registros cuyo content contiene esa subcadena; fields deja tres columnas; sort timestamp desc ordena del más reciente al más antiguo, y limit 100 se queda con las 100 primeras filas. Resultado: hasta 100 registros con "timeout", los más recientes primero; sin summarize no hay recuentos ni agrupación por servicio.',
        'contains() distingue mayúsculas y minúsculas: su parámetro caseSensitive vale true por defecto, así que contains(content, "timeout") no encuentra "Connection Timeout". Para ignorar mayúsculas se añade caseSensitive: false, como en contains(content, "timeout", caseSensitive: false).',
      ],
      code: 'fetch logs, from: -1h\n| filter contains(content, "timeout")\n| fields timestamp, content, dt.entity.service\n| sort timestamp desc\n| limit 100',
      codeNote: 'dt.entity.service contiene el entity ID Classic del servicio. En Smartscape on Grail, el origen topológico de la señal está en campos dt.smartscape.<type> (para un servicio, dt.smartscape.service) y su nombre se obtiene con getNodeName(dt.smartscape.service).',
      sourceRefs: [
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
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
      ],
    },
    {
      id: 'entities',
      title: 'Niveles de entidad',
      lead: 'El nivel correcto evita diagnósticos demasiado amplios.',
      paragraphs: [
        'Un host describe infraestructura. Un process group representa procesos relacionados; su process group instance es una ejecución concreta. Un service representa una función observable. Una application o frontend representa una experiencia que consume esas capas.',
        'Cuando una pregunta pide el “mejor siguiente paso”, elige el nivel que conecta síntoma y acción. Buscar solo el host cuando la latencia pertenece a un endpoint oculta la ruta; empezar por un contenedor cuando el problema es de cluster puede ser demasiado específico.',
      ],
      comparison: {
        headers: ['Entidad', 'Qué representa', 'Ejemplo de pregunta'],
        rows: [
          ['Host', 'Infraestructura', '¿Qué recurso está saturado?'],
          ['Process group instance', 'Ejecución concreta', '¿Qué instancia tiene el error?'],
          ['Service', 'Función/endpoint', '¿Qué operación está lenta?'],
          ['Application', 'Experiencia/frontend', '¿Qué ve el usuario?'],
        ],
      },
      sourceRefs: [
        {
          title: 'Smartscape core entities',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        { title: 'Logs app', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app', kind: 'official-docs' },
      ],
    },
    {
      id: 'hub-integrations',
      title: 'Hub, extensiones y lookups',
      lead: 'Descubrimiento, configuración y datos son estados distintos.',
      paragraphs: [
        'Dynatrace Hub cataloga apps, extensiones e integraciones. Antes de instalar, revisa requisitos, versión, permisos, ActiveGate, red, credenciales y modelo de datos. Después verifica que el componente esté activo y produzca la entidad o señal esperada.',
        'Un lookup puede enriquecer resultados, pero las claves, tipos y cardinalidad importan. Con claves no únicas el resultado es ambiguo: lookup solo añade el primer registro coincidente de la tabla de lookup, mientras que join genera una fila por cada coincidencia y puede multiplicar filas y falsear una métrica. Trata el lookup como un contrato de datos y prueba con una muestra pequeña.',
      ],
      bullets: [
        'Catálogo: ¿qué existe?',
        'Instalación: ¿está disponible en el entorno?',
        'Configuración: ¿tiene requisitos satisfechos?',
        'Datos: ¿produce campos y entidades?',
        'Enriquecimiento: ¿las claves son únicas y compatibles?',
      ],
      sourceRefs: [
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        { title: 'Logs app', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app', kind: 'official-docs' },
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
      ],
    },
    {
      id: 'entity-model',
      title: 'Entity model e identificadores',
      lead: 'Una entidad es más que una etiqueta visible.',
      paragraphs: [
        'Para navegar, correlacionar o automatizar necesitas distinguir el tipo de entidad, su identificador y sus relaciones. El nombre puede cambiar o no ser único; el ID y el entity type permiten mantener una referencia más precisa. El contexto de una entidad incluye timeframe, tags, tecnología y fuente de observación.',
        'Cuando el examen pida el mejor nivel de investigación, no elijas por el nombre más familiar. Empieza en el tipo que posee la señal y navega hacia el padre, hijo o dependencia que explica impacto o causa. Un host puede alojar muchos process groups; un service puede depender de varias bases de datos.',
        'En Smartscape on Grail, la dependencia de un servicio con sus bases de datos se modela con aristas dinámicas SERVICE calls DB_INSTANCE_* y SERVICE calls DB_DATABASE_*, una por base de datos llamada y basadas en señales observadas; la dirección va del servicio que llama a la base de datos.',
        'En las entidades Classic (fetch dt.entity.host, por ejemplo), la primera y la última observación se guardan en el campo lifetime, de tipo timeframe, con un inicio y un fin. Una entidad solo aparece en la consulta si su lifetime solapa el timeframe consultado.',
      ],
      bullets: [
        'Entity type: qué clase de objeto es.',
        'Entity ID: qué objeto concreto representa.',
        'Relación: qué dependencia conecta.',
        'Tags: qué contexto ayuda a filtrar.',
        'Timeframe: cuándo es válida la evidencia.',
      ],
      sourceRefs: [
        { title: 'Logs app', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app', kind: 'official-docs' },
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
      ],
    },
    {
      id: 'dql-dpl',
      title: 'DQL, DPL y parsing',
      lead: 'Consultar registros y extraer campos son tareas distintas.',
      paragraphs: [
        'DQL construye una consulta sobre records: selecciona, filtra, proyecta, agrega y ordena. DPL define patrones de parsing para reconocer estructura en texto en contextos donde se necesita extraer campos. Una pregunta puede mencionar ambos para comprobar si sabes cuál actúa sobre el dataset y cuál interpreta contenido.',
        'La secuencia práctica es inspeccionar un registro, elegir el patrón de parsing, validar campos y después usar DQL sobre esos campos. Si el parser no se aplica, `filter` sobre un campo supuesto devolverá vacío aunque el texto original contenga la palabra buscada.',
        'Si el pattern DPL de `parse` no coincide en un registro, parse no elimina ese registro: los campos extraídos quedan en null (con preserveFieldsOnFailure: true se conservan los valores previos de esos campos). Es un `filter` posterior sobre el campo, como filter status >= 500, el que descarta los registros con null; un fallo de parseo no aborta la consulta.',
      ],
      comparison: {
        headers: ['Herramienta', 'Responsabilidad', 'Error habitual'],
        rows: [
          ['DQL', 'Consultar y analizar records', 'Usarlo para inventar campos que no existen'],
          ['DPL', 'Definir parsing de texto', 'Tratarlo como un lenguaje de consultas'],
          ['Entity model', 'Identificar objetos y relaciones', 'Filtrar solo por nombre visible'],
          ['Dashboard/Notebook', 'Presentar y documentar resultados', 'Confundir visualización con ingestión'],
        ],
      },
      sourceRefs: [
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'log-evidence',
      title: 'Logs: del mensaje a la evidencia',
      lead: 'El valor de un log está en el contexto que puedes comprobar.',
      paragraphs: [
        'Un mensaje aislado no basta para declarar causa. Conserva timestamp, severidad, host, service, trace ID, contenido y campos estructurados. Compara frecuencia, entidades afectadas y señales vecinas; después decide si el log es causa, síntoma o evidencia complementaria.',
        'Si el campo no está parseado, la consulta debe partir de `content` o de la estructura real. Si el log aparece fuera del periodo, revisa timestamp y timezone. Si no aparece, sigue la ruta de ingestión y retención antes de concluir que el sistema no lo generó.',
        'La retención es lo primero que se comprueba con logs antiguos: el bucket integrado default_logs conserva los logs 35 días. Un log de hace dos meses guardado ahí ya expiró, y ampliar el timeframe de la consulta no lo recupera; para conservar logs más tiempo hay que enviarlos a un bucket personalizado con más retención.',
      ],
      bullets: [
        'Acotar timeframe y fuente.',
        'Inspeccionar muestra real.',
        'Parsear campos necesarios.',
        'Relacionar entidad y trace.',
        'Comparar con métricas/events/Problems.',
        'Guardar query y evidencia.',
      ],
      sourceRefs: [
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
        { title: 'Semantic Dictionary', url: 'https://docs.dynatrace.com/docs/semantic-dictionary', kind: 'official-docs' },
      ],
    },
    {
      id: 'smartscape-diagnosis',
      title: 'Smartscape como hipótesis',
      lead: 'La topología orienta la investigación; no sustituye la prueba.',
      paragraphs: [
        'Smartscape ayuda a descubrir dependencias y a moverte entre entidades. Una flecha es una hipótesis de relación observada, no una prueba de causalidad. Confirma la dirección, la ventana temporal, la tecnología y la señal que conecta ambos objetos.',
        'Si falta una relación, comprueba soporte, instrumentación, permisos, datos recientes y lifetime. Si existe una relación, comprueba que el tráfico o el error la sustente. Esta actitud evita tanto ignorar una dependencia como culparla sin evidencia.',
        'Para saber si una arista depende de señales observadas, mira si es dinámica en el modelo core. Son dinámicas, por ejemplo, SERVICE calls SERVICE, SERVICE calls DB_*, HOST calls HOST y las aristas runs_on que parten de un SERVICE (SERVICE runs_on PROCESS, HOST, CONTAINER o K8S_POD). Son estáticas, basadas sobre todo en configuración, aristas como PROCESS runs_on HOST, CONTAINER runs_on HOST o CONTAINER runs_on K8S_NODE.',
      ],
      bullets: [
        'Relación observada.',
        'Señal que la respalda.',
        'Dirección de dependencia.',
        'Ventana temporal.',
        'Impacto y causalidad por confirmar.',
      ],
      sourceRefs: [
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
        { title: 'Semantic Dictionary', url: 'https://docs.dynatrace.com/docs/semantic-dictionary', kind: 'official-docs' },
        {
          title: 'Data privacy and security',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'hub-verification',
      title: 'Verificar una integración del Hub',
      lead: 'Una tarjeta de catálogo es el comienzo del análisis.',
      paragraphs: [
        'Valida una integración en capas: descubre el componente, revisa requisitos y versión, confirma instalación, configura credenciales y ActiveGate, comprueba el estado, identifica las entidades o record types que produce y consulta una muestra. Documenta también qué permisos necesita la persona y qué actor la ejecuta.',
        'Si los datos no aparecen, no reinstales a ciegas. Comprueba primero red, grupo, endpoint, scopes, logs del componente, timeframe, bucket, parser y query. La evidencia de “instalado” no prueba la evidencia de “produciendo datos”.',
        'En una extensión de Extensions 2.0, la pestaña Health muestra la salud de la extensión por monitoring configuration; junto con los logs de la extensión es el primer sitio para ver fallos de conectividad, credenciales o ActiveGate group. Se pueden mantener hasta 10 versiones, pero solo una está activa.',
        'Permisos: extensions:definitions:read y extensions:definitions:write leen y gestionan las propias extensiones (subirlas, borrarlas); extensions:configurations:read lee las monitoring configurations y extensions:configurations:write las crea y actualiza. Instalar apps desde Hub requiere app-engine:apps:install.',
      ],
      bullets: [
        'Catálogo y compatibilidad.',
        'Instalación y versión.',
        'Configuración y credenciales.',
        'Conectividad y ActiveGate.',
        'Entidad/record type producido.',
        'Consulta, permisos y retención.',
      ],
      sourceRefs: [
        { title: 'Semantic Dictionary', url: 'https://docs.dynatrace.com/docs/semantic-dictionary', kind: 'official-docs' },
        {
          title: 'Data privacy and security',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security',
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
      id: 'deep-smartscape-graph',
      title: 'Smartscape Classic: 5 tiers y entidades dt.entity.*',
      lead: 'Smartscape Classic organizaba la topología en tiers; las vistas dt.entity.* de Grail exponen esas entidades Classic.',
      paragraphs: [
        'Smartscape Classic presenta el entorno en 5 tiers, de arriba abajo: Applications, Services, Processes, Hosts y Data centers; de la infraestructura a la experiencia de usuario el orden es Data centers → Hosts → Processes → Services → Applications. El eje vertical muestra las dependencias full-stack entre tiers (por ejemplo, servicio → proceso → host) y el eje horizontal muestra las relaciones de llamada entrantes y salientes dentro de cada tier. El tier Data centers indica dónde residen los hosts: ciudades para servidores físicos y, en infraestructura virtual o cloud, nodos etiquetados como VMware data center, AWS Availability Zone o Azure region. El Smartscape actual (app Smartscape y Smartscape on Grail) no se organiza en estos tiers: es un grafo de nodos y edges.',
        'En el modelo Classic de Grail, las entidades se consultan con vistas como `fetch dt.entity.host` o `fetch dt.entity.service`, y las relaciones se exponen como campos con el nombre de la relación y el tipo de destino (por ejemplo, `instance_of[dt.entity.process_group]` en una process group instance). Consultarlas requiere el permiso `storage:entities:read`. En Latest, la topología se consulta con Smartscape on Grail (`smartscapeNodes`, `smartscapeEdges`, `traverse`).',
      ],
      comparison: {
        headers: ['Tier de Smartscape Classic', 'Vista Classic aproximada', 'Qué representa'],
        rows: [
          ['Applications', 'dt.entity.application', 'Experiencia de usuario que llama a servicios'],
          ['Services', 'dt.entity.service', 'Servicios que se ejecutan en procesos'],
          [
            'Processes',
            'dt.entity.process_group_instance (ejecución concreta; agrupada en dt.entity.process_group)',
            'Procesos que se ejecutan en hosts',
          ],
          ['Hosts', 'dt.entity.host', 'Máquinas físicas o virtuales'],
          ['Data centers', '—', 'Ciudad, VMware data center, AWS Availability Zone o Azure region'],
        ],
      },
      sourceRefs: [
        { title: 'Smartscape', url: 'https://docs.dynatrace.com/docs/shortlink/smartscape', kind: 'official-docs' },
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
    {
      id: 'sup-smartscape-on-grail',
      title: 'Smartscape on Grail: IDs, lifetime, edges y retención',
      lead: 'Smartscape on Grail es el almacenamiento nativo de Grail para la topología, y sus reglas difieren de las de logs o spans.',
      paragraphs: [
        'Smartscape on Grail registra automáticamente datos topológicos, como entidades monitorizadas y sus relaciones, y permite consultarlos con DQL (smartscapeNodes, smartscapeEdges, traverse) desde Notebooks y Dashboards. A diferencia de los registros de buckets tradicionales (logs, events, spans o data points de métricas), que se ingieren para un timestamp y nunca cambian, los nodos y edges de Smartscape son mutables y pueden cambiar con el tiempo.',
        'Un Smartscape ID combina el entity type y un número de 16 símbolos, por ejemplo HOST-000000000000007B. El tipo Smartscape ID es totalmente compatible con su representación string, así que puedes comparar un string con un Smartscape ID. Por convención, los node types se escriben siempre en mayúsculas, como HOST, K8S_NAMESPACE o AWS_EC2_INSTANCE. El campo id_classic contiene el entity ID de la entidad Classic correspondiente, cuando existe.',
        'Cada nodo tiene dos campos de lifetime: lifetime.start (la primera vez que se descubrió) y lifetime.end (la última vez que se observó), que se actualiza con cada upsert mientras el nodo se sigue observando. Una consulta solo devuelve los nodos cuyo lifetime solapa el timeframe consultado: un nodo con lifetime.end de ayer no aparece al consultar las últimas 2 horas. Los timeframes que empiezan hace menos de 15 minutos se amplían automáticamente a 15 minutos. La retención es fija de 35 días: se borran los nodos cuyo lifetime.end tiene más de 35 días, con todas sus static edges, y las dynamic edges también se limpian a los 35 días.',
        'Las edges pueden ser static, que heredan el lifetime del nodo (por ejemplo, un disco conectado a un host según su configuración), o dynamic, que se registran para un momento concreto (por ejemplo, llamadas entre servicios reveladas por trazas). Todas las static edges se pueden consultar desde el nodo origen con el campo references, que se muestra con fieldsAdd references. Por ejemplo, smartscapeNodes CONTAINER | summarize by:references[runs_on.host], count() resume los contenedores por el host en el que se ejecutan.',
        'Las señales (logs, spans, eventos…) se conectan con la topología mediante campos dt.smartscape.<type> (en la documentación, dt.smartscape.__type__; por ejemplo, dt.smartscape.host) que contienen Smartscape IDs e indican que la señal se originó en ese nodo. Para enriquecerlas, getNodeName(dt.smartscape.host) devuelve el nombre del nodo y getNodeField(dt.smartscape.host, "tags") otros campos.',
        'Otros límites: solo los nodos se pueden filtrar con segmentos, las edges no; Smartscape on Grail está incluido en la licencia DPS, así que los datos devueltos por consultas de Smartscape no tienen coste adicional; los nodos tienen un campo dt.security_context que puede contener varios valores, y puedes configurar fieldsets sobre la tabla smartscape; los tags solo se fijan en la fuente de datos (Kubernetes añade labels y annotations, cloud monitoring añade tags de AWS, OneAgent añade agent tags). Los tags cloud de las señales cambian de notación en el nodo: aws.tags.* pasa a ser tags:aws[*], de modo que aws.tags.team aparece como tags:aws[team].',
      ],
      comparison: {
        headers: ['Aspecto', 'Smartscape on Grail', 'Logs, events, spans'],
        rows: [
          ['Mutabilidad', 'Nodos y edges mutables (upserts)', 'Registro fijo a su timestamp'],
          ['Tiempo', 'lifetime.start / lifetime.end; solapamiento con el timeframe', 'timestamp puntual'],
          ['Retención', 'Fija: 35 días desde lifetime.end', 'La del bucket'],
          ['Coste de consulta', 'Incluido en DPS', 'Según rate card'],
        ],
      },
      sourceRefs: [
        { title: 'Smartscape on Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/smartscape-on-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-smartscape-dql',
      title: 'Consultar la topología: smartscapeNodes, smartscapeEdges y traverse',
      lead: 'Tres comandos DQL cubren nodos, aristas y navegación; el modelo core define qué aristas existen.',
      paragraphs: [
        'smartscapeNodes carga nodos por patrón de tipo (usa "*" para todos), por ejemplo smartscapeNodes HOST; es el inicio equivalente al migrar una consulta fetch dt.entity.host de la vista Classic. smartscapeEdges carga aristas por patrón de tipo de edge y devuelve registros con source_id, source_type, target_id, target_type y type. Por eso, smartscapeEdges "*" | filter source_type == "K8S_POD" | summarize by:{type, target_type}, edges = count() cuenta aristas por tipo y tipo de destino, no nodos destino distintos.',
        'traverse recorre desde los nodos de origen hasta los nodos destino siguiendo tipos de edge: traverse edgeType, targetType [, direction] [, fieldsKeep]. La dirección por defecto es forward y la alternativa es backward. El resultado son los nodos destino, con un campo adicional dt.traverse.history: un array de records con información de los nodos de origen; fieldsKeep indica qué campos del origen se conservan en él. En smartscapeNodes SERVICE | filter tags[owner] == "Joe" | traverse runs_on, HOST | fields id, el filter se aplica a los servicios y el resultado son los IDs de los HOST en los que corren.',
        'El Semantic Dictionary define node types como HOST, PROCESS, SERVICE, CONTAINER, DISK, FRONTEND, NETWORK_INTERFACE u OS_SERVICE; PROCESS_GROUP y PROCESS_GROUP_INSTANCE no son node types. Entre las aristas documentadas están SERVICE calls SERVICE (dynamic), SERVICE runs_on PROCESS, HOST o CONTAINER, PROCESS runs_on HOST, CONTAINER runs_on HOST, CONTAINER belongs_to K8S_CLUSTER o K8S_NAMESPACE, DISK belongs_to HOST y FRONTEND calls SERVICE. La dirección importa: el servicio corre sobre procesos o hosts (runs_on), no al revés; calls modela comunicación y belongs_to, pertenencia.',
      ],
      code: 'smartscapeNodes CONTAINER\n| filter k8s.workload.kind == "daemonset"\n| traverse {runs_on, belongs_to}, {HOST, K8S_CLUSTER}, fieldsKeep: name\n| fields container_name = dt.traverse.history[0][name],\n         node_name = name, node_type = type',
      codeNote: 'Tras traverse, name y type son los del nodo destino (HOST o K8S_CLUSTER); el name del contenedor de origen se recupera de dt.traverse.history[0] porque fieldsKeep: name lo conservó.',
      sourceRefs: [
        {
          title: 'DQL Smartscape commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/smartscape-commands',
          kind: 'official-docs',
        },
        {
          title: 'Smartscape core entities (Semantic Dictionary)',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core',
          kind: 'official-docs',
        },
        { title: 'Smartscape on Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/smartscape-on-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-smartscape-events',
      title: 'Smartscape events: upserts parciales y borrado con null',
      lead: 'Los eventos de topología actualizan nodos; no se guardan como registros.',
      paragraphs: [
        'Los Smartscape events se ingieren por el endpoint de Smartscape events (/platform/ingest/v1/smartscape.events), pasan por el pipeline de Smartscape events de OpenPipeline y se transforman en upserts de Smartscape; los eventos en sí no se persisten como registros. Los eventos no necesitan contener todos los campos del nodo: solo los campos presentes en el evento entran en el upsert, así que un campo omitido conserva su valor anterior. Para borrar un campo de un nodo, inclúyelo en el evento con el valor null.',
        'Esto tiene una trampa al copiar valores de tags a primary_tags: si usas true como matching condition, el processor se ejecuta en cada registro; cuando falta el tag de origen, el origen se resuelve a null y el upsert escribe null en el campo destino, borrándolo. Limita el matcher a los registros que tienen el tag de origen. Los primary_tags también se pueden fijar en la etapa compartida Primary Grail tags, que se aplica a todos los datos del pipeline.',
      ],
      sourceRefs: [
        { title: 'Smartscape on Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/smartscape-on-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-log-investigation',
      title: 'Investigar logs sin perder el contexto',
      lead: 'Filtra pronto, estructura después y conserva la evidencia.',
      paragraphs: [
        'Empieza con timeframe, fuente, host, service, severity o patrón relevante. Después inspecciona campos presentes y tipos. Si el contenido es texto o JSON, usa DQL y DPL para extraer `trace_id`, IP, código de error, endpoint o usuario. Comprueba los registros no coincidentes antes de concluir que la regla o parser funciona.',
        'Relaciona logs con entidad, trace y Problem cuando exista contexto. Una búsqueda textual puede encontrar el término, pero un filtro por campo es más preciso y suele ser más eficiente. Guarda query, muestra, timezone y criterio de inclusión para que otra persona pueda reproducir la investigación.',
        'DPL (Dynatrace Pattern Language) se usa en dos lugares: en el comando parse de DQL, para extraer un campo en varios campos de salida, y en el procesamiento de logs, para remodelar los datos que llegan. No se usa para permisos ni para retención.',
        'Orden recomendado en DQL: fetch, después filter para reducir pronto los registros, después parse (solo sobre lo que queda) y sort al final. Ordenar justo tras fetch y seguir con la consulta reduce el rendimiento. Si sabes en qué campo está el término, filtra o busca directamente sobre ese campo (field ~ "keyword") en vez de recorrer todo el texto.',
      ],
      bullets: [
        'Acota timeframe y población.',
        'Filtra por fields cuando existan.',
        'Parsea solo lo que necesitas.',
        'Comprueba tipos y nulls.',
        'Relaciona con entidad o trace.',
      ],
      sourceRefs: [
        {
          title: 'Smartscape core entities',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/smartscape/core',
          kind: 'official-docs',
        },
        { title: 'Log Analytics', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs', kind: 'official-docs' },
        { title: 'Logs app', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-logs-app',
      title: 'Logs app: permisos, facetas, filtros y continuidad',
      lead: 'La Logs app permite investigar sin escribir DQL, pero sus facetas, sugerencias y búsquedas tienen reglas precisas.',
      paragraphs: [
        'La Logs app permite buscar, filtrar y analizar logs sin dominar DQL. Necesita storage:logs:read y storage:buckets:read para leer logs, y storage:files:read para joins con lookup tables. Gracias a schema on read y DQL no hace falta decidir qué vas a consultar durante la ingesta: los atributos nuevos se exploran al leer, y DQL permite filtrar y agregar los logs de Grail (por ejemplo, contar errores por servicio con summarize count()) antes de abrir los registros. Desde los detalles de un registro puedes navegar a los hosts, clusters de Kubernetes y traces relacionados, y puedes continuar el análisis en Notebooks, Dashboards o Investigations, o automatizarlo con Workflows.',
        'En las facetas, varios valores de una misma faceta se combinan con OR y facetas distintas con AND: un log debe cumplir al menos un valor de cada faceta seleccionada. Los recuentos son aproximados según los últimos filtros; el símbolo ~ indica que Dynatrace usa sampling al leer los logs para mejorar la respuesta. Los primary Grail tags aparecen en un grupo de facetas Primary tags (campos primary_tags.*), pero la lista se refresca cada 24 horas, así que un tag configurado recientemente puede tardar en aparecer. Los tags de AWS, Azure, GCP y Kubernetes (aws.tags.*, azure.tags.*, gcp.labels.*, k8s.*) son facetas ocultas por defecto, agrupadas por origen; puedes desocultarlas en la configuración de facetas y usarlas como los primary tags.',
        'En el filtro, un atributo JSON anidado se escribe fieldname$.attributename = value, por ejemplo content$.loyalty_level = "silver"; si el atributo lleva puntos, se usan corchetes: content$["process.technology"] = "nodejs". Search in results filtra la tabla con tu palabra clave sin ejecutar una nueva consulta: solo busca en los resultados ya devueltos y cargados en el navegador. Las sugerencias de valores devuelven hasta 100 valores distintos por campo, del timeframe seleccionado (hasta las últimas 24 horas), y no funcionan para el campo content; que un valor no aparezca en la sugerencia no prueba que no exista.',
        'Consultar logs consume según tu modelo de rate card, pero las sugerencias de facetas y filtros, la log distribution chart y la búsqueda en los resultados ya devueltos no tienen coste. Volver a ejecutar la consulta o cargar más registros sí son consultas nuevas.',
      ],
      sourceRefs: [
        { title: 'Logs app', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app', kind: 'official-docs' },
        {
          title: 'Logs app: facets',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app/facets',
          kind: 'official-docs',
        },
        {
          title: 'Logs app: query and filter',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app/query-and-filter',
          kind: 'official-docs',
        },
        {
          title: 'Log Management and Analytics',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-log-patterns',
      title: 'Surrounding logs y pattern analysis',
      lead: 'Dos funciones para pasar de un registro aislado a contexto y tendencias.',
      paragraphs: [
        'Show surrounding logs reúne el contexto de un registro. Si el registro tiene trace_id, verás otros registros con el mismo trace ID (requiere la conexión de logs con trazas). Si no hay trace ID, se correlacionan los logs de la misma entidad de topología, por ejemplo el mismo host. Para ampliar, Run query for 15 logs before y Run query for 15 logs after cargan los registros anteriores o posteriores al timestamp del original.',
        'Pattern analysis agrupa los registros en patterns a partir del campo content. Es una vista de lectura (read-time) sobre los logs que cumplen los filtros y el timeframe: el resultado no se reingiere ni se almacena. Si la consulta supera 50.000 registros o 100 MB se aplica sampling, y los patterns pequeños pueden quedar fuera. Los registros cuyo content supera 1.500 caracteres se excluyen, y las estructuras JSON dentro de content se tratan como un único token, sin parsear sus elementos. Para reducir el sampling, aplica un filtro por un Grail primary field o primary tag, acota el timeframe a 30 minutos y filtra un único status.',
      ],
      sourceRefs: [
        {
          title: 'Surrounding logs',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app/surrounding-logs',
          kind: 'official-docs',
        },
        {
          title: 'Log patterns',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-logs-app/patterns',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-entities-query',
      title: 'Entidades y consulta con DQL (storage:entities:read)',
      lead: 'El mismo nombre visible puede ocultar niveles de entidad diferentes.',
      paragraphs: [
        'Host, Process Group, Process Group Instance, Service, Application, Container y Pod responden preguntas distintas. Host sirve para infraestructura; Process Group agrupa procesos que comparten identidad lógica; Process Group Instance representa una ejecución concreta; Service representa una unidad de servicio observable; Frontend/Application representa la experiencia de usuario. Elegir la entidad incorrecta produce un filtro demasiado amplio o una acción que no afecta al componente deseado.',
        'DQL permite consultar entidades mediante `fetch dt.entity.<tipo>` y unirlas a métricas y logs mediante lookups. Sin el permiso IAM `storage:entities:read`, las consultas a tablas de entidades serán rechazadas por falta de permisos.',
        'En Smartscape on Grail los node types pueden no coincidir con los tipos de entidad Classic: un pod (CLOUD_APPLICATION_INSTANCE en Classic) es el node type K8S_POD, y el campo id_classic del nodo conserva el ID Classic.',
      ],
      code: 'fetch dt.entity.host\n| fieldsAdd runs[dt.entity.service_instance]\n| limit 20',
      codeNote: 'Consulta Classic de hosts que añade los IDs de las service instances que ejecutan (runs es la inversa de runs_on). Para traer sus detalles necesitas expand y lookup (ver el apartado de entidades Classic).',
      sourceRefs: [
        { title: 'DQL commands', url: 'https://docs.dynatrace.com/docs/shortlink/dql-commands', kind: 'official-docs' },
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-classic-entities',
      title: 'Entidades Classic en DQL: fetch dt.entity.*, relaciones y límites',
      lead: 'Las vistas dt.entity.* siguen presentes en muchos entornos, pero desde la versión 1.334 Dynatrace está en transición hacia Smartscape on Grail.',
      paragraphs: [
        'Consultar entidades Classic en Grail requiere el permiso storage:entities:read. Grail no aplica filtros de management zone: quien tiene storage:entities:read puede consultar todas las entidades. fetch dt.entity.host devuelve por defecto el ID y el nombre de la entidad sin configurar nada más. Un process group es un cluster lógico de procesos que realizan la misma función en varios hosts (por ejemplo, un clúster Tomcat); cada process group instance (dt.entity.process_group_instance) es la ejecución de ese grupo en un host concreto y enlaza con su grupo mediante instance_of.',
        'Las relaciones legacy se exponen con un nombre en el origen y otro en el destino: isInstanceOf → instance_of / instantiates; runsOn → runs_on / runs; isProcessOf → belongs_to / contains; calls → calls / called_by; hostsComputeNode → hosts / hosted_by. Así, dt.entity.service_instance tiene runs_on[dt.entity.host] y el host tiene runs[dt.entity.service_instance]; dt.entity.process_group_instance tiene instance_of[dt.entity.process_group]. Las relaciones 1:n solo devuelven 100 entity IDs por tipo y por registro; si necesitas más, usa classicEntitySelector().',
        'Para enriquecer registros con datos de una entidad se usa lookup: lookup sourceField:dt.entity.host, lookupField:id, [fetch dt.entity.host] añade a cada registro los campos del host cuyo id coincide, sin agrupar ni multiplicar filas. Por ejemplo, fetch dt.entity.service_instance | fieldsAdd runs_on[dt.entity.host] | lookup … [fetch dt.entity.host] devuelve una fila por service instance con los campos del host en el que corre. Si el campo de relación es un array de IDs (runs[dt.entity.service_instance] en el host), primero hay que aplicar expand para obtener un registro por ID y después lookup. append añade filas, no columnas, y dedup elimina duplicados. En Latest, el nombre de un host referenciado por un Smartscape ID se obtiene con getNodeName(dt.smartscape.host).',
      ],
      code: 'fetch dt.entity.host\n| fieldsAdd runs[dt.entity.service_instance]\n| expand runs[dt.entity.service_instance]\n| lookup sourceField:`runs[dt.entity.service_instance]`, lookupField:id,\n    [ fetch dt.entity.service_instance ]',
      codeNote: 'expand convierte el array de IDs en registros individuales; solo entonces lookup puede traer los detalles de cada service instance.',
      sourceRefs: [
        {
          title: 'Query monitored entities in Grail (Classic)',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
        {
          title: 'Process groups',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-hub-extensions',
      title: 'Hub, apps y Extensions 2.0',
      lead: 'Las apps presentan capacidades; las extensiones conectan y producen observabilidad.',
      paragraphs: [
        'Dynatrace Hub centraliza aplicaciones, extensiones e integraciones. La ficha de cada app en Hub incluye permisos, intents, contenidos y requisitos. Extensions 2.0 permite llevar métricas de tecnologías al modelo de la plataforma y conectarlas con analytics y monitoring. El lifecycle incluye instalar, configurar, actualizar, revisar release notes, comprobar permisos y validar datos producidos.',
        'No respondas “instala desde Hub” si el escenario también requiere ActiveGate, credenciales, un endpoint, un grupo de usuarios o una capability DPS. El nombre de la app no dice qué records crea, dónde se almacenan ni qué puede consultar cada usuario. Usa la ficha técnica y la documentación de la extensión como fuentes distintas de la vista de catálogo.',
        'La ficha de una app en Hub tiene secciones distintas: Product information (visión general, primeros pasos, casos de uso), Technical information (lo necesario para empezar, incluidos los permisos requeridos y los intents soportados), Contents (los dashboards, notebooks y workflow actions ya preparados que incluye la app) y Release notes (cambios de versión).',
        'Al actualizar una extensión, las personalizaciones de sus metric events (por ejemplo, umbrales) se restablecen a los valores por defecto. Documenta esos cambios antes de actualizar y vuelve a aplicarlos después; mantener instaladas versiones anteriores no los conserva, porque solo una versión está activa.',
      ],
      bullets: [
        'Catalog: descubrir.',
        'Install: hacer disponible.',
        'Configure: conectar origen y permisos.',
        'Run/use: ejecutar con permisos de aplicación.',
        'Observe: validar records, entities y métricas.',
      ],
      sourceRefs: [
        {
          title: 'Query monitored entities',
          url: 'https://docs.dynatrace.com/docs/platform/grail/querying-monitored-entities',
          kind: 'official-docs',
        },
        { title: 'Semantic Dictionary', url: 'https://docs.dynatrace.com/docs/semantic-dictionary', kind: 'official-docs' },
        {
          title: 'Data privacy and security',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-hub-extensions-setup',
      title: 'Hub y extensiones SNMP: permisos y pasos de configuración',
      lead: 'Instalar una app y configurar una extensión son procesos distintos, con permisos y componentes distintos.',
      paragraphs: [
        'Instalar apps desde Dynatrace Hub requiere el permiso app-engine:apps:install, y desinstalarlas, app-engine:apps:delete; las Hub subscriptions requieren lectura y escritura del schema de settings builtin:hub-channel.subscriptions. Las apps se instalan en segundos y todas las apps instaladas desde Hub se actualizan automáticamente. Las apps son piezas autocontenidas basadas en AppEngine; las extensions (Extensions 2.0) incorporan métricas de forma declarativa desde fuentes propias y se gestionan en la Extensions app.',
        'Para usar una extensión, primero se añade al entorno: Extensions > Discover, selecciona su tile y Add to environment. Después se crea su monitoring configuration, cuyos pasos dependen de la fuente de datos. Las extensiones SNMP se ejecutan en remoto en un ActiveGate group (no en OneAgent), y todos los ActiveGates de cada grupo designado deben poder conectarse a los dispositivos SNMP. La configuración SNMP sigue cuatro pasos: elegir el ActiveGate group; definir los dispositivos con IP o hostname, puerto y credenciales SNMP (v2c o v3); ajustar, si hace falta, propiedades avanzadas como timeouts o retries; y activar la configuración con su descripción y feature sets. Tras unos minutos, verifica las métricas en el metric browser.',
      ],
      bullets: [
        'Add to environment (Extensions > Discover).',
        'Monitoring configuration: ActiveGate group.',
        'Dispositivos: IP o hostname, puerto, SNMP v2c/v3 y credenciales.',
        'Activar con feature sets y verificar métricas.',
      ],
      sourceRefs: [
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
        {
          title: 'Manage extensions',
          url: 'https://docs.dynatrace.com/docs/ingest-from/extensions/manage-extensions',
          kind: 'official-docs',
        },
        {
          title: 'SNMP extensions',
          url: 'https://docs.dynatrace.com/docs/ingest-from/extensions/supported-extensions/data-sources/snmp',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-cross-app-troubleshooting',
      title: 'Drilldowns y diagnóstico transversal',
      lead: 'La investigación madura cambia de aplicación sin perder la entidad ni la evidencia.',
      paragraphs: [
        'Desde Smartscape o una tabla de resultados puedes abrir una entidad en otra aplicación, llevar una query a Notebook, navegar desde un Problem a la root cause, abrir logs desde un Pod o iniciar Investigations con el contexto seleccionado. El drilldown es útil porque mantiene una hipótesis y reduce trabajo manual; no es una invitación a abrir pestañas al azar.',
        'Cuando una transición pierde contexto, registra entity ID, timeframe, segment, query y filtro. Si la aplicación destino muestra algo diferente, compara permisos, variante, record type y timezone. El patrón transversal del path es siempre el mismo: identificar, acotar, relacionar, validar y actuar.',
        'El mecanismo de plataforma que permite abrir una entidad o un resultado en otra app es el intent: un objeto mensaje que una app define para pasar el flujo del usuario a otra app junto con el contexto necesario. Por eso la Technical information de cada app en Hub indica los intents que admite. Un segment filtra datos y un workflow trigger inicia una automatización; ninguno pasa el flujo entre apps.',
      ],
      bullets: [
        'Preserva entity ID y timeframe.',
        'Verifica que el destino acepta el record type.',
        'Comprueba permisos de la aplicación y datos.',
        'Documenta la evidencia antes de cambiar de contexto.',
      ],
      sourceRefs: [
        {
          title: 'Data privacy and security',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Pattern Language',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-pattern-language',
          kind: 'official-docs',
        },
        { title: 'Smartscape', url: 'https://docs.dynatrace.com/docs/shortlink/smartscape', kind: 'official-docs' },
      ],
    },
  ],
  masteryChecklist: [
    'Puedo explicar entidad frente a relación.',
    'Sé seguir un log desde filtro hasta contexto.',
    'Distingo host, process group instance, service y application.',
    'Puedo evaluar una integración del Hub y el riesgo de un lookup.',
    'Uso entity type e ID sin depender solo del nombre visible.',
    'Distingo DQL de DPL y sé cuándo necesito parsing.',
    'Trato Smartscape como contexto e hipótesis, no como causalidad automática.',
    'Puedo verificar una integración sin confundir instalación con datos.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
