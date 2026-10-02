import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «The Dynatrace Platform».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'La plataforma no es solo la pantalla de inicio: es el punto donde datos, aplicaciones, entidades, permisos y acciones se encuentran. Estudia este módulo como el vocabulario de navegación que usarás en los demás. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Orientarte en la UI y encontrar aplicaciones.',
    'Relacionar Grail, Hub, soporte y capacidades.',
    'Distinguir contexto, permisos y experiencia.',
    'Explicar cómo una plataforma unificada reduce cambios de contexto.',
    'Separar Latest Dynatrace, Classic, variante, licencia y alcance.',
    'Diagnosticar visibilidad desde datos, permisos y contexto.',
  ],
  sections: [
    {
      id: 'ui-navigation',
      title: 'UI, Dock y búsqueda',
      lead: 'Navegar bien significa conservar la intención de la investigación.',
      paragraphs: [
        'El Dock (Search, Apps y las apps fijadas) y los Launchpads te llevan a aplicaciones, entidades y análisis. Platform search ayuda a localizar capacidades, datos y recursos sin recordar cada ruta exacta. El criterio importante es saber qué aplicación responde a tu pregunta, no memorizar una posición visual que puede cambiar.',
        'Al abrir una entidad, conserva el contexto: nombre, ID, timeframe, filtros y relación. Saltar a otra app sin registrar ese contexto es una causa habitual de análisis no reproducible.',
      ],
      bullets: [
        'Exploración: busca una entidad o capacidad.',
        'Diagnóstico: abre el detalle con timeframe y relaciones.',
        'Comunicación: prepara Notebook o Dashboard.',
        'Acción: usa Workflows o una integración con permisos explícitos.',
      ],
      sourceRefs: [
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-ui-dock',
      title: 'Dock, Apps, Launchpads y menús de la UI',
      lead: 'El Dock es la barra lateral desde la que se llega a la búsqueda, las apps, el soporte y los ajustes de usuario.',
      paragraphs: [
        'El Dock reúne, de arriba abajo: Dynatrace (vuelve a tu página de inicio), Search (siempre disponible en el Dock y con el atajo Ctrl/Cmd+K), Apps (lista y lanza las apps instaladas, por categoría o filtrando por nombre) y una sección central con las apps predeterminadas, las que has fijado y las usadas recientemente. Al pie están Collapse, Support y el menú de usuario. Collapse oculta las etiquetas y deja una columna estrecha de iconos para ganar espacio para los datos.',
        'Para fijar una app al Dock, ábrela desde Search o Apps (su icono aparece en el Dock) y después, en el Dock, pasa el cursor sobre ella y selecciona Pin to dock; queda fijada hasta que eliges Unpin from dock. Fijar apps personaliza tu propio Dock: no es un ajuste compartido con el equipo ni algo que se haga desde Hub.',
        'Un Launchpad es una página de inicio personalizada con listas de apps, documentos, enlaces y texto informativo elegidos a mano. La página de inicio predeterminada es el Launchpad Getting started with Dynatrace, y puedes crear Launchpads adicionales. Como Dashboards y Notebooks, los Launchpads son documentos y se comparten con los mismos controles de acceso.',
        'El menú Support agrupa Documentation, Release notes, Community (Dynatrace Community), University (Dynatrace University), Help & Support (enlace al Support hub) y recursos de desarrollo como Dynatrace Developer, Dynatrace API y Developer Forum. El menú de usuario (tus iniciales y tu nombre al pie del Dock) contiene User settings (idioma, zona horaria y modo claro/oscuro), Environments, Appearance (cambio rápido entre tema claro, oscuro o el del navegador), Account Management, el toggle Latest Dynatrace, que activa o desactiva la experiencia Latest, y Sign out.',
      ],
      comparison: {
        headers: ['Necesidad', 'Dónde se resuelve', 'Confusión típica'],
        rows: [
          ['Tener una app siempre a mano', 'Dock: hover sobre la app y Pin to dock', 'Buscarlo en Hub o en un Launchpad'],
          [
            'Página de inicio común con apps, documentos, enlaces y texto',
            'Launchpad (documento compartible)',
            'Usar un Dashboard o un segment',
          ],
          ['Cursos, Community, documentación y soporte', 'Menú Support del Dock', 'Buscarlo en Settings o en Account Management'],
          ['Volver a la experiencia anterior', 'Menú de usuario: toggle Latest Dynatrace', 'Desinstalar apps o cambiar un ajuste global'],
        ],
      },
      sourceRefs: [
        {
          title: 'Navigate the Dynatrace platform',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-platform-search',
      title: 'Platform search: qué busca y con qué límites',
      lead: 'Platform search encuentra apps, documentos, settings, métricas y entidades, pero cada categoría se busca por campos concretos.',
      paragraphs: [
        'Platform search está siempre disponible en el Dock (Search) y se abre también con Ctrl/Cmd+K; entre otras cosas, encuentra métricas por key y por nombre. Las categorías apps, settings y documents son obligatorias y no se pueden quitar; puedes añadir hasta 25 categorías predeterminadas más (por ejemplo, tipos de entidad), y esa configuración es personal de tu cuenta.',
        'Cada categoría se busca por campos distintos: las apps instaladas por nombre y descripción; Dashboards, Notebooks y Workflows por nombre (no por el texto de sus consultas); los settings por nombre y ubicación; las fichas de Hub por nombre, descripción y tags; las métricas por key y por nombre; y las entidades monitorizadas por nombre, ID y tags.',
        'Por defecto, la búsqueda de entidades solo refleja las entidades vistas en las últimas 72 horas. Que un host inactivo desde hace días no aparezca no demuestra que se haya borrado: simplemente queda fuera de esa ventana.',
      ],
      comparison: {
        headers: ['Categoría', 'Se busca por', 'Ojo con'],
        rows: [
          ['Dashboards, Notebooks y Workflows', 'Nombre del documento', 'Una palabra que solo está en una consulta DQL no lo encuentra'],
          ['Métricas', 'Key y nombre', 'No hace falta abrir una app de métricas para localizarlas'],
          ['Entidades monitorizadas', 'Nombre, ID y tags', 'Por defecto, solo las vistas en las últimas 72 horas'],
          ['Apps, settings y documents', 'Categorías obligatorias', 'No se pueden eliminar de la búsqueda'],
        ],
      },
      sourceRefs: [
        {
          title: 'Platform search',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/search',
          kind: 'official-docs',
        },
        {
          title: 'Navigate the Dynatrace platform',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'grail-hub',
      title: 'Grail, Dynatrace Hub y Support',
      lead: 'Cada punto de entrada resuelve una necesidad diferente.',
      paragraphs: [
        'Grail es el almacén común en el que se consultan distintos tipos de datos con DQL. Dynatrace Hub es el catálogo donde descubres apps, extensiones e integraciones; descubrir no significa instalar ni configurar. El Support hub (Help & Support, en el menú Support del Dock) y la documentación aportan procedimientos, requisitos y límites.',
        'En un escenario de integración, comprueba siempre el contrato: versión, permisos, ActiveGate, red, credenciales, grupos, datos que produce y coste. La existencia de una tarjeta en Hub no garantiza datos visibles.',
        'Los usuarios no acceden directamente a los datos almacenados en Grail: no hay SQL contra tablas físicas ni descarga de ficheros de los buckets. La recuperación y las consultas de cualquier tipo de dato (logs, métricas, eventos…) se hacen solo con consultas DQL a través de la capa de Query Processing, que actúa como pasarela segura.',
      ],
      comparison: {
        headers: ['Recurso', 'Úsalo para', 'No implica'],
        rows: [
          ['Grail', 'Consultar y analizar datos', 'Que todos los datos existan o sean visibles'],
          ['Hub', 'Descubrir apps, extensiones e integraciones', 'Que una integración esté instalada'],
          ['Documentación', 'Entender contrato, límites y pasos', 'Que tengas permisos para ejecutarlos'],
          ['Support', 'Resolver incidencias y acceder a ayuda', 'Sustituir la evidencia del entorno'],
        ],
      },
      sourceRefs: [
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        { title: 'What is Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-platform-components',
      title: 'Las piezas de la plataforma y cómo se reparten el trabajo',
      lead: 'Cada componente tiene un papel: capturar, almacenar, relacionar, analizar, construir apps o actuar.',
      paragraphs: [
        'OneAgent descubre, activa e instrumenta automáticamente aplicaciones, microservicios, infraestructura y sus dependencias. OpenPipeline, junto con OneAgent y OpenTelemetry, recoge y procesa la telemetría en la ingesta. Grail es el data lakehouse unificado que guarda y correlaciona logs, métricas, trazas y eventos. Smartscape mapea de forma dinámica las relaciones entre todos los componentes de la aplicación en cada capa.',
        'Dynatrace Intelligence (Davis) combina IA predictiva e IA causal para casos de uso de observabilidad, seguridad y negocio: detecta anomalías y explica su root cause. AutomationEngine ejecuta Workflows y respuestas automatizadas a partir de lo que detecta Dynatrace Intelligence, por ejemplo una acción de remediación cuando se abre un Problem.',
        'AppEngine permite construir apps a medida sobre los datos de observabilidad, seguridad y negocio. Su backend son app functions escritas en TypeScript que se ejecutan en el JavaScript runtime de Dynatrace; las apps interactúan con otras apps mediante intents y, a través de EdgeConnect (que se ejecuta en tu red corporativa), con sistemas on-premises. AppEngine mantiene la lógica y los datos dentro de los límites de seguridad de la plataforma.',
        'Dynatrace Hub es el catálogo para explorar, activar y ejecutar apps y extensiones: lista las tecnologías que OneAgent soporta de serie, los frameworks de observabilidad abiertos soportados, las extensiones creadas por Dynatrace y las apps de Dynatrace basadas en AppEngine.',
      ],
      comparison: {
        headers: ['Componente', 'Papel', 'No es'],
        rows: [
          ['OneAgent', 'Descubre e instrumenta automáticamente apps, infraestructura y dependencias', 'El almacén de datos'],
          ['OpenPipeline', 'Procesa y enruta los datos en la ingesta', 'El motor que ejecuta acciones'],
          ['Grail', 'Almacena y correlaciona logs, métricas, trazas y eventos', 'Un mapa de topología'],
          ['Smartscape', 'Mapea las relaciones dinámicas entre componentes de todas las capas', 'Un catálogo de apps'],
          ['Dynatrace Intelligence', 'IA predictiva y causal: detecta y explica', 'El ejecutor de Workflows'],
          ['AutomationEngine', 'Ejecuta Workflows y respuestas automatizadas', 'El entorno de desarrollo de apps'],
          ['AppEngine', 'Construye y ejecuta apps (app functions en TypeScript)', 'El motor de Workflows'],
        ],
      },
      sourceRefs: [
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
        { title: 'AppEngine', url: 'https://docs.dynatrace.com/docs/platform/appengine', kind: 'official-docs' },
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
      ],
    },
    {
      id: 'permissions',
      title: 'Permisos y contexto',
      lead: 'La misma UI puede mostrar resultados diferentes según identidad y scope.',
      paragraphs: [
        'Un resultado vacío o menor de lo esperado puede deberse a falta de datos, a una consulta o un timeframe incorrectos, a un segment o a una condición WHERE por registro en los permisos (por ejemplo sobre dt.security_context). Leer tablas almacenadas en buckets (logs, events, spans, bizevents, security.events, métricas) necesita storage:buckets:read y el permiso de la tabla: sin ellos no se obtienen esos registros; un fieldset sin permiso oculta los campos sensibles. Diferencia lectura de escritura: poder ver una configuración no significa poder modificarla.',
        'Cuando una aplicación solicita permisos, identifica qué necesita la persona y qué necesita el actor o servicio que ejecutará una acción. El principio de mínimo privilegio reduce errores y riesgo.',
        'Un ejemplo en Settings: settings:objects:read permite leer los objetos de configuración de un schema y settings:objects:write, escribirlos, así que quien ve los objetos pero no puede guardar un cambio necesita settings:objects:write para ese schema. settings:schemas:read solo permite leer los schemas, y document:documents:write crea y actualiza documentos como Dashboards o Notebooks, no objetos de Settings.',
      ],
      bullets: [
        'Identidad y grupo del usuario.',
        'Permiso de aplicación.',
        'Permiso de storage o entidad.',
        'Condición WHERE por registro, segment o filtro.',
        'Permiso de escritura o de ejecución, si aplica.',
      ],
      sourceRefs: [
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
        { title: 'What is Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail', kind: 'official-docs' },
        { title: 'Grail concepts', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail/concepts', kind: 'official-docs' },
      ],
    },
    {
      id: 'experience',
      title: 'Experiencia digital y resiliencia',
      lead: 'La plataforma conecta funcionamiento técnico con experiencia.',
      paragraphs: [
        'La experiencia digital observa cómo funciona una aplicación para usuarios reales y pruebas controladas. Resiliencia añade la pregunta de cómo responde el sistema ante degradación, dependencias o cambios. Ambas perspectivas se enriquecen con topología y señales operativas.',
        'La respuesta correcta no es elegir una única métrica “importante”. Es relacionar impacto, servicio, infraestructura y acción de forma que otra persona pueda validar la hipótesis.',
      ],
      bullets: [
        'Impacto: qué ve el usuario o negocio.',
        'Causa: qué dependencia o componente explica el comportamiento.',
        'Resiliencia: cómo se degrada y recupera el sistema.',
        'Acción: qué mitigación o automatización está autorizada.',
      ],
      sourceRefs: [
        { title: 'What is Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail', kind: 'official-docs' },
        { title: 'Grail concepts', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail/concepts', kind: 'official-docs' },
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-dem-resilience',
      title: 'RUM, Synthetic, Session Replay y Site Reliability Guardian',
      lead: 'Usuarios reales, pruebas simuladas y validación de cambios responden a preguntas distintas.',
      paragraphs: [
        'Real User Monitoring (RUM) observa a los usuarios reales que interactúan con la aplicación: comportamiento y rendimiento del frontend. Synthetic Monitoring ejecuta pruebas automatizadas y programadas desde ubicaciones de todo el mundo, a cualquier hora, por lo que verifica disponibilidad y rendimiento aunque no haya tráfico real. Session Replay captura y reproduce visualmente la experiencia digital completa de los usuarios para depurar lo que vieron.',
        'Para la resiliencia ante cambios, Site Reliability Guardian automatiza el análisis del impacto de un cambio validando objetivos de disponibilidad, rendimiento y capacidad: ayuda a tomar la decisión de release y permite aplicar Service-Level Objectives (SLOs) a los servicios críticos. Puede lanzarse automáticamente desde Workflows, y sus resultados de validación (Pass, Warning, Fail, entre otros) informan la decisión del pipeline de entrega.',
      ],
      bullets: [
        'RUM: ¿qué experimentan los usuarios reales ahora?',
        'Synthetic Monitoring: ¿está disponible el flujo aunque nadie lo use?',
        'Session Replay: ¿qué vio exactamente un usuario concreto?',
        'Site Reliability Guardian: ¿cumple este release sus objetivos antes de promocionarlo?',
      ],
      sourceRefs: [
        { title: 'Digital Experience', url: 'https://docs.dynatrace.com/docs/observe/digital-experience', kind: 'official-docs' },
        {
          title: 'Site Reliability Guardian',
          url: 'https://docs.dynatrace.com/docs/deliver/site-reliability-guardian',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'data-context',
      title: 'Datos, entidades y aplicaciones',
      lead: 'La UI es una experiencia sobre datos con un modelo común.',
      paragraphs: [
        'Una aplicación especializada puede presentar la misma realidad con una pregunta distinta: una vista de servicio prioriza requests y dependencias; una vista de logs prioriza registros y campos; un Notebook permite construir una investigación reproducible; un Dashboard comunica indicadores. La entidad, el timeframe y el scope deben conservarse al cambiar de aplicación.',
        'Grail reúne record types, pero que varios datos vivan en el mismo almacén no significa que tengan el mismo esquema, retención o permiso. Antes de afirmar que “la plataforma tiene el dato”, identifica el record type, el campo y el camino de ingestión.',
      ],
      bullets: [
        'Record type: qué clase de dato se consulta.',
        'Entidad: a qué objeto se asocia.',
        'Aplicación: qué pregunta presenta.',
        'Timeframe: qué ventana limita la evidencia.',
        'Scope: qué identidad y permisos filtran el resultado.',
      ],
      sourceRefs: [
        { title: 'Grail concepts', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail/concepts', kind: 'official-docs' },
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
        {
          title: 'Dynatrace UI',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'latest-classic',
      title: 'Latest Dynatrace y Classic',
      lead: 'La variante forma parte de la respuesta correcta.',
      paragraphs: [
        'Latest Dynatrace y Classic pueden exponer capacidades con nombres, rutas, permisos, límites o modelos diferentes. Si el enunciado fija una variante, esa condición manda; no mezcles una ruta de configuración Classic con un comportamiento documentado solo para Latest.',
        'Cuando no se indique variante, responde con el concepto estable y declara qué parte depende de versión, licencia o aplicación. En preguntas de retención, permisos, settings o API, busca siempre la fuente de la variante concreta antes de generalizar.',
      ],
      comparison: {
        headers: ['Dimensión', 'Qué debes comprobar', 'Error típico'],
        rows: [
          ['UI', 'Aplicación y ruta disponibles', 'Tratar una ruta Classic como universal'],
          ['Datos', 'Record type, esquema y retención', 'Asumir que todos los datos comparten política'],
          ['Permisos', 'Scope y permiso requerido', 'Confundir lectura con escritura'],
          ['Licencia', 'DPS/capability incluida', 'Confundir presencia en Hub con disponibilidad'],
        ],
      },
      sourceRefs: [
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
        {
          title: 'Dynatrace UI',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
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
      id: 'platform-contract',
      title: 'Contrato de una capacidad',
      lead: 'Descubrir una función no equivale a poder usarla.',
      paragraphs: [
        'Para evaluar una capacidad, separa descubrimiento, habilitación, configuración, producción de datos, consulta y acción. Dynatrace Hub puede mostrar una app o integración; la documentación describe requisitos; la tenant puede necesitar permisos, un ActiveGate, una red, credenciales o una suscripción específica.',
        'Este orden evita respuestas precipitadas. Si una pantalla está vacía, comprueba primero si la capacidad está disponible y habilitada, después si produce datos y por último si tu identidad puede leerlos. Si una acción falla, añade el permiso de escritura o ejecución y el sistema destino.',
        'Ejemplo de contrato: las extensiones. El Extension Execution Controller consulta fuentes de datos locales cuando se ejecuta en OneAgent y fuentes remotas (un dispositivo de red donde no se puede instalar OneAgent) cuando se ejecuta en un ActiveGate. Todo ActiveGate que ejecuta una extensión debe pertenecer a un ActiveGate group, y los Cluster ActiveGates y los multi-environment ActiveGates no están admitidos en el framework de extensiones: hace falta un Environment ActiveGate. EdgeConnect es otra pieza: permite que apps y workflows interactúen de forma segura con tus sistemas, no ejecuta extensiones.',
      ],
      bullets: [
        'Existe: aparece en Hub o documentación.',
        'Está habilitada: la capability está activa.',
        'Está configurada: requisitos y credenciales correctos.',
        'Produce: llega una entidad o señal observable.',
        'Es visible: query, timeframe y permisos permiten verla.',
        'Actúa: el usuario o actor puede ejecutar el cambio.',
      ],
      sourceRefs: [
        {
          title: 'Dynatrace UI',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
          kind: 'official-docs',
        },
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-grail-records',
      title: 'Grail como modelo de datos, no como palabra comodín',
      lead: 'Compartir almacenamiento no elimina las diferencias de esquema, retención o permisos.',
      paragraphs: [
        'Grail funciona como el almacenamiento unificado para logs, métricas, trazas, eventos, datos de negocio y otros record types. La consulta se realiza con DQL, pero cada objeto conserva campos, tipos, políticas de acceso y condiciones de ingestión. `fetch logs`, `fetch bizevents`, `fetch dt.davis.problems` y `timeseries` no son intercambiables: parten de fuentes y contratos diferentes.',
        'Los buckets organizan almacenamiento y permiten asociar retención y acceso. La tabla de sistema `dt.system.buckets` permite inspeccionar todos los buckets creados en el entorno, sus record types asociados y sus días de retención. ABAC y políticas pueden restringir records o campos. Por eso una consulta válida puede devolver menos datos que otra identidad, o una aplicación puede ocultar una propiedad sensible aunque el record exista. En el examen, separa siempre “está almacenado”, “puedo consultarlo” y “puedo modificarlo”.',
        'Modificar es otra capa: para borrar registros concretos (por ejemplo, datos personales ingeridos por error), la record deletion API exige storage:records:delete además de los permisos de lectura; storage:bucket-definitions:truncate, en cambio, vacía todos los registros de un bucket.',
        'Cada fuente tiene su comando de inicio: `timeseries` combina la carga, el filtrado y la agregación de métricas en una serie temporal; `fetch dt.davis.problems` lee los Problems de Davis; `fetch logs` lee registros de log, que no contienen series de métricas, y `fetch bizevents` lee eventos de negocio, no Problems.',
      ],
      bullets: [
        'Record type: estructura lógica consultable.',
        'Bucket: destino de almacenamiento, retención y gobierno.',
        'dt.system.buckets: tabla para auditar buckets y retenciones del tenant.',
        'DQL: lenguaje que lee y transforma el resultado.',
        'Permiso: condición de acceso de usuario, grupo, app o actor.',
        'Timeframe: ventana de análisis, no política de retención.',
      ],
      sourceRefs: [
        { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace', kind: 'official-docs' },
        { title: 'Dynatrace Platform', url: 'https://docs.dynatrace.com/docs/platform', kind: 'official-docs' },
        { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-grail-buckets',
      title: 'Buckets, tables y views en Grail',
      lead: 'La retención y el aislamiento se deciden en el bucket; la tabla agrupa por tipo y la view es virtual.',
      paragraphs: [
        'Los buckets son unidades lógicas de almacenamiento donde se guardan los registros; cada bucket se asocia a un tipo de registro (logs, events, spans…) y fija su retención. Las tables agrupan los registros por tipo: un fetch de una tabla recupera los registros de todos sus buckets que el usuario puede leer, sin nombrarlos. Las views son tablas virtuales definidas por consultas sobre tablas existentes, como las vistas dt.entity.* para consultar entidades classic. Las tablas de sistema, como dt.system.buckets, dt.system.data_objects y dt.system.files, representan información que no se guarda en buckets. En resumen: la tabla agrupa los registros por tipo y su lectura exige storage:<tabla>:read; el bucket fija la retención y su lectura exige storage:buckets:read.',
        'Los buckets integrados no se pueden modificar: los default buckets (prefijo default_) y los system buckets (prefijo dt_). Por eso, si los logs de un servicio necesitan 90 días y default_logs retiene 35, la solución es crear un bucket custom con esa retención y enrutar allí esos registros con la bucket assignment de OpenPipeline. Si ninguna regla asigna bucket, la pipeline predeterminada asigna los registros al bucket por defecto (default_logs para logs) para que no se pierdan.',
        'Un bucket custom admite una retención de 1 día a 10 años más una semana (1–3657 días). Su nombre tiene entre 3 y 100 caracteres, empieza por una letra y solo usa minúsculas alfanuméricas, guiones bajos y guiones; no se puede cambiar después. Acortar la retención en una actualización borra los datos que superan el nuevo periodo, y cualquier operación que borra datos es un proceso de larga duración. Truncate borra todos los registros de un bucket sin eliminar el bucket; solo se pueden borrar los buckets definidos por el usuario (no los default_ ni los dt_) y el borrado es irreversible.',
        'Gestionar buckets exige los permisos storage:bucket-definitions:read, storage:bucket-definitions:write, storage:bucket-definitions:delete y storage:bucket-definitions:truncate, distintos de storage:buckets:read, que da acceso a leer los datos del bucket. Cada creación, actualización, truncate o borrado de un bucket registra un audit event con el usuario, el estado (éxito o fallo) y la descripción del cambio; en una actualización incluye la configuración anterior y la nueva. Para la configuración vigente se consulta dt.system.buckets; para el historial, dt.system.events filtrando event.kind == "AUDIT_EVENT" y event.category == "BUCKET_MANAGEMENT", que requiere storage:system:read.',
        'Partition data in Grail da cinco motivos para crear buckets custom: retención propia, atribución de costes a centros de coste (cross-charging), rendimiento de consulta (pocos buckets por consulta), control de acceso por bucket mediante políticas IAM y propiedad de los datos (data ownership: quién responde de su ciclo de vida y su gestión).',
      ],
      comparison: {
        headers: ['Bucket integrado', 'Tabla', 'Retención'],
        rows: [
          ['default_logs', 'logs', '35 días'],
          ['default_spans', 'spans', '10 días'],
          ['default_metrics', 'metrics', '15 meses'],
          ['default_events', 'events', '35 días'],
          ['default_securityevents_builtin', 'security.events', '3 años'],
          ['dt_system_events', 'dt.system.events', '1 año'],
        ],
      },
      code: 'fetch dt.system.buckets\n| filter startsWith(name, "default_") or startsWith(name, "dt_")\n\nfetch dt.system.events\n| filter event.kind == "AUDIT_EVENT" and event.category == "BUCKET_MANAGEMENT"\n| sort timestamp desc',
      codeNote: 'La primera consulta muestra la definición actual de los buckets integrados (nombre, tabla, retención); la segunda, el historial auditado de cambios, con los más recientes arriba.',
      warning: 'El timeframe de una consulta o de un Dashboard nunca alarga la retención: los datos que el bucket ya eliminó no vuelven.',
      sourceRefs: [
        { title: 'Grail data model', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
        {
          title: 'Partition data in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/partition-data',
          kind: 'official-docs',
        },
        {
          title: 'OpenPipeline processing',
          url: 'https://docs.dynatrace.com/docs/platform/openpipeline/concepts/processing',
          kind: 'official-docs',
        },
        {
          title: 'dt.system.events (Semantic Dictionary)',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/dt-system-events',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-grail-permissions',
      title: 'Permisos en Grail: bucket, tabla, registro y campo',
      lead: 'Para leer un registro hacen falta dos llaves: la del bucket y la de la tabla; los WHERE y los fieldsets recortan aún más.',
      paragraphs: [
        'Sin permisos, un usuario no puede consultar datos de Grail. Leer una tabla almacenada en buckets (logs, events, spans, bizevents, security.events o métricas) necesita storage:buckets:read para los buckets que contienen los datos y, además, el permiso de la tabla que se consulta; para las vistas de entidades Classic (fetch dt.entity.*) la documentación solo pide storage:entities:read. Con solo uno de los dos no se obtienen esos registros (la documentación no detalla si se muestra un error o un resultado vacío). El resultado es la intersección: por ejemplo, ALLOW storage:buckets:read WHERE storage:bucket-name MATCH ("default_*", "common_logs") junto con ALLOW storage:logs:read WHERE storage:k8s.namespace.name="namespace1" devuelve solo logs de namespace1 que estén en buckets default_* o common_logs.',
        'Los permisos de tabla admiten condiciones WHERE por registro con campos como storage:dt.security_context, storage:k8s.namespace.name, storage:k8s.cluster.name, storage:host.name o storage:event.kind; por ejemplo, ALLOW storage:logs:read WHERE storage:dt.security_context="TeamA". Las políticas se suman: si otra política del usuario concede el mismo permiso de tabla sin condición, el WHERE es irrelevante y el usuario verá siempre todos los registros de esa tabla.',
        'Los field permissions ocultan campos sensibles aunque se pueda leer la tabla. Los fieldsets predefinidos (builtin-sensitive-spans, builtin-request-attributes-spans y builtin-sensitive-user-events-and-sessions) se aplican a spans, user.events y user.sessions; para usar sus campos hace falta ALLOW storage:fieldsets:read WHERE storage:fieldset-name="<fieldset>". Sin ese permiso, los campos sensibles no se muestran en el resultado ni se pueden usar para filtrar o agrupar.',
        'Los permisos de un documento y los de los datos son capas distintas: Can view en un Dashboard da acceso al documento, pero sus tiles DQL se ejecutan con los permisos storage de quien lo abre. Mínimo privilegio en Latest significa Can view en los documentos más storage:<tabla>:read acotado con WHERE (por ejemplo por dt.security_context) y el acceso a los buckets necesarios.',
      ],
      comparison: {
        headers: ['Tabla', 'Permiso de tabla', 'Comandos DQL afectados'],
        rows: [
          ['logs', 'storage:logs:read', 'fetch'],
          ['events', 'storage:events:read', 'fetch'],
          ['metrics', 'storage:metrics:read', 'timeseries'],
          ['spans', 'storage:spans:read', 'fetch'],
          ['bizevents', 'storage:bizevents:read', 'fetch'],
          ['security.events', 'storage:security.events:read', 'fetch'],
          ['entities', 'storage:entities:read', 'fetch, classicEntitySelector, entityAttr, entityName'],
          ['smartscape', 'storage:smartscape:read', 'smartscapeNodes, smartscapeEdges, getNodeName(), getNodeField()'],
          ['dt.system.events', 'storage:system:read', 'fetch'],
        ],
      },
      warning: 'Un WHERE filtra registros, no columnas: para ocultar campos sensibles se usan fieldsets. Y un filtro DQL guardado en un Notebook no es control de acceso.',
      sourceRefs: [
        {
          title: 'Permissions in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail',
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
      id: 'deep-hub-lifecycle',
      title: 'Dynatrace Hub, permisos IAM y ciclo de una capacidad',
      lead: 'Descubrir, instalar, autorizar y producir datos son estados distintos.',
      paragraphs: [
        'Dynatrace Hub es el catálogo central de apps, extensiones y soluciones. La página de cada app en Hub se organiza en `Product information` (descripción, getting started y use cases), `Technical information` (permisos requeridos y supported intents), `Contents` (Dashboards, Notebooks y workflow actions incluidos) y `Release notes`.',
        'Para instalar una app desde el Hub se requiere el permiso IAM específico `app-engine:apps:install`, mientras que para desinstalarla se requiere `app-engine:apps:delete`. Visualizar la ficha de una aplicación no concede automáticamente privilegios para desplegarla en el entorno.',
      ],
      comparison: {
        headers: ['Pestaña / Estado', 'Qué contiene / Requisito', 'Distractor frecuente en examen'],
        rows: [
          ['Product information', 'Descripción, getting started y use cases', 'Creer que aquí se configuran las credenciales'],
          ['Contents', 'Dashboards, Notebooks y workflow actions incluidos', 'Buscar los artefactos en Settings o Administration'],
          [
            'Technical information',
            'Permisos requeridos (`app-engine:*`, `storage:*`)',
            'Asumir que las apps se instalan sin permisos IAM',
          ],
          [
            'app-engine:apps:install',
            'Permiso IAM obligatorio para desplegar la app',
            'Confundirlo con permisos de lectura o administración global',
          ],
          [
            'app-engine:apps:delete',
            'Permiso IAM obligatorio para retirar la app',
            'Creer que cualquier editor de dashboard puede borrar la app',
          ],
        ],
      },
      sourceRefs: [
        { title: 'What is Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail', kind: 'official-docs' },
        { title: 'Grail concepts', url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-grail/concepts', kind: 'official-docs' },
        { title: 'Organize data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-hub-extensions',
      title: 'Instalar apps y activar extensiones desde Hub',
      lead: 'Una app se instala en segundos para todo el entorno; una extensión necesita además su monitoring configuration.',
      paragraphs: [
        'Con app-engine:apps:install, instalar una app desde Hub es automático y tarda unos segundos; después la app está disponible para todos los usuarios del entorno, y las apps instaladas desde Hub se mantienen actualizadas automáticamente. Desinstalarla exige app-engine:apps:delete. Que la app esté instalada no basta para usar todas sus funciones: cada usuario necesita los permisos que su ficha enumera en Technical information.',
        'Las extensiones amplían la captura de datos de tecnologías no cubiertas por OneAgent (por ejemplo, una base de datos o un dispositivo SNMP) y aportan métricas de forma declarativa, que se analizan como las demás métricas de la plataforma, por ejemplo con timeseries en un Notebook. Las apps, en cambio, ofrecen experiencias de análisis orientadas a un caso de uso.',
        'Activar una extensión sigue una secuencia: revisar sus requisitos, añadirla al entorno con Add to environment (permiso extensions:definitions:write, que permite subir y retirar extensiones), crear su monitoring configuration para los hosts o dispositivos (permiso extensions:configurations:write) y comprobar que llegan sus métricas. Que la extensión aparezca en Hub no significa que esté activa ni que produzca datos.',
      ],
      bullets: [
        'Instalar app: app-engine:apps:install.',
        'Desinstalar app: app-engine:apps:delete.',
        'Añadir extensión al entorno: extensions:definitions:write.',
        'Crear o actualizar monitoring configuration: extensions:configurations:write.',
      ],
      sourceRefs: [
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
        {
          title: 'Manage extensions',
          url: 'https://docs.dynatrace.com/docs/ingest-from/extensions/manage-extensions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-documents-permissions',
      title: 'Documents, ownership y sharing controls',
      lead: 'Dashboards, Notebooks y Launchpads son documentos gestionados con control de acceso granular.',
      paragraphs: [
        'Quien crea un documento es su owner. En el panel de compartición, el propietario puede conceder acceso a usuarios y grupos específicos con permisos `Can view` o `Can edit`. Adicionalmente, existen controles avanzados como la casilla `Allow editors to share` (que autoriza a usuarios con rol de edición a compartir el documento con terceros) y la opción `Visible to anyone in your environment` (que permite que cualquier usuario autenticado en el tenant pueda ver el documento sin publicarlo en internet).',
        'En un escenario de colaboración, elige el nivel mínimo que permite el trabajo. Si el documento contiene queries sensibles, revisa el acceso a los datos subyacentes: compartir la vista no convierte automáticamente todos los datos en públicos ni elimina las reglas de storage. Los permisos del documento y los permisos de la aplicación o de Grail son capas distintas.',
      ],
      bullets: [
        'Can view vs Can edit: lectura o modificación del layout y tiles.',
        'Allow editors to share: delega la capacidad de compartir a colaboradores editores.',
        'Visible to anyone in your environment: visibilidad interna para todo el tenant sin exposición pública.',
        'Transfer ownership: transfiere la propiedad del documento a otro usuario.',
      ],
      sourceRefs: [
        {
          title: 'Dynatrace UI',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
          kind: 'official-docs',
        },
        { title: 'Dynatrace Hub', url: 'https://docs.dynatrace.com/docs/manage/hub', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-document-sharing',
      title: 'Compartir documentos: Share access, enlaces y propiedad',
      lead: 'Hay tres formas de compartir y cada una se revoca de forma distinta.',
      paragraphs: [
        'Dashboards, Notebooks y Launchpads se comparten de tres maneras. Visible to anyone in your environment (Read only) da lectura a todos los usuarios del entorno y es fácil de revertir. Share access concede Can view o Can edit a usuarios o grupos concretos, de modo que puedes cambiar o retirar el acceso de un destinatario sin afectar al resto. Un enlace compartido (Can view o Can edit) lo puede usar cualquiera del entorno que lo reciba, nadie de fuera del entorno, y los destinatarios pueden reenviarlo.',
        'El acceso concedido por un enlace no se puede revocar de forma individual: solo se puede borrar el enlace entero, y entonces deja de funcionar para todos los que lo tenían; habría que crear uno nuevo para quienes sí deben seguir. Por defecto solo el owner comparte; si activa Allow editors to share, las personas con Can edit también pueden compartir.',
        'Can view permite ver el documento, ajustar el timeframe, refrescar y su frecuencia, ajustar filtros, maximizar tiles, copiar tiles, guardar una copia propia y exportar la definición JSON. Can edit añade editar, renombrar y modificar el contenido. Solo el owner puede compartir (salvo Allow editors to share), transferir la propiedad y eliminar el documento. Al transferir la propiedad, el owner anterior pierde el acceso de inmediato, salvo que el nuevo owner se lo vuelva a conceder.',
        'Cuando ejecutas una sección o tile de código escrito por otra persona, Dynatrace ejecuta su JavaScript con tu cuenta de usuario y tus permisos, y ese código puede llamar a APIs externas en tu nombre. Revisa el código antes de aprobar su ejecución.',
      ],
      comparison: {
        headers: ['Acción', 'Can view', 'Can edit', 'Owner'],
        rows: [
          ['Ver, timeframe, refrescar, filtrar', 'Sí', 'Sí', 'Sí'],
          ['Guardar una copia, exportar JSON', 'Sí', 'Sí', 'Sí'],
          ['Editar, renombrar, cambiar contenido', 'No', 'Sí', 'Sí'],
          ['Compartir', 'No', 'Solo con Allow editors to share', 'Sí'],
          ['Transferir la propiedad o eliminar', 'No', 'No', 'Sí'],
        ],
      },
      sourceRefs: [
        {
          title: 'Share documents',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share',
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
      id: 'deep-problems-platform',
      title: 'Problems como experiencia transversal y estructura de registros',
      lead: 'Problems une detección, topología, impacto y siguientes pasos en Grail.',
      paragraphs: [
        'La aplicación Problems presenta la situación correlacionada, sus entidades afectadas, root cause, impacto, severidad, timeline y resolución visual. En el modelo de datos de Grail, cada Problem se almacena con atributos específicos: el array `dt.davis.event_ids` contiene los identificadores de todos los Davis events correlacionados que componen el incidente. Además, los Problem fields personalizados solo se pueden definir para campos de origen con valores de tipo string; los campos con valores de otros tipos no están admitidos.',
        'La severidad orienta prioridad, pero no explica causa. Un problema crítico puede tener una root cause diferente de la entidad más visible para el usuario. Lee el grafo, la evidencia temporal y el impacto de negocio antes de comunicar una conclusión. Esta distinción alimenta preguntas trampa que presentan severity como si fuera root cause.',
      ],
      comparison: {
        headers: ['Campo / Atributo', 'Estructura en Grail', 'Implicación Práctica en Análisis'],
        rows: [
          [
            'dt.davis.event_ids',
            'Array de strings con IDs de eventos',
            'Permite unir el Problem con cada anomalía individual que lo disparó.',
          ],
          [
            'Problem custom fields',
            'Solo cadenas de texto (string values)',
            'Un campo de origen numérico, booleano o de tipo record no se puede configurar como Problem field.',
          ],
          ['Root cause entity', 'Identificador de la entidad causante', 'Punto de partida del análisis causal en Smartscape.'],
          ['Affected entities', 'Lista de entidades con impacto degradado', 'Determina el blast radius del incidente.'],
        ],
      },
      sourceRefs: [
        {
          title: 'Data privacy and security',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security',
          kind: 'official-docs',
        },
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Intelligence limits',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/reference/dynatrace-intelligence-limits',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-problems-app',
      title: 'La app Problems: lista, filtros, detalles y cierre',
      lead: 'Un Problem reúne los eventos correlacionados, su impacto y la causa propuesta; la app permite filtrarlo, investigarlo y cerrarlo.',
      paragraphs: [
        'Cuando varios Davis events relacionados se correlacionan, Dynatrace Intelligence los reúne en un Problem: el objeto que se investiga, con sus entidades afectadas, la root cause propuesta y el impacto. Los eventos individuales son la evidencia, y el array dt.davis.event_ids del registro del Problem guarda sus identificadores. Los Problems se almacenan como eventos en Grail (event.kind = "DAVIS_PROBLEM"), por lo que leerlos depende de storage:events:read; davis:analyzers:execute ejecuta el analizador de detalles del Problem.',
        'La lista muestra por defecto los Problems de las últimas 2 horas, con los Problems abiertos arriba aunque empezaran antes. La barra de filtros ofrece Status (Active o Closed), Category (naturaleza: slowdown, error, resource, availability) e Impact (área afectada: frontends, services, infrastructure, environments); los criterios se combinan con AND por defecto y se pueden usar operadores booleanos explícitos. Como los Problems son eventos, un segment para filtrarlos debe definir un event filter, por ejemplo cloud.region = "us-east-1c" AND event.kind = "DAVIS_PROBLEM". Un segment solo acota la vista: que un Problem no aparezca no significa que esté resuelto.',
        'En los detalles, Root cause se centra en la causa del incidente y su deployment stack, y la deployment que contiene la root cause se marca con un red root cause badge; Impact muestra todas las entidades de Smartscape impactadas con un breve detalle por entidad. En el Visual resolution path, cada nodo es una entidad donde se detectó un problema de salud, y los nodos grises son entidades relacionadas usadas en el análisis pero no impactadas directamente. La pestaña Logs reúne las líneas de log recogidas durante el incidente, con referencias a las entidades afectadas y a sus entidades relacionadas, como los hosts padre.',
        'Puedes cerrar Problems manualmente de uno en uno o hasta 50 a la vez, y siempre hay que escribir un comentario de cierre, que se guarda en Grail como un nuevo annotation event. Tras enviar el cierre, el Status pasa a Closing...; si refrescas, puede volver a mostrar Active hasta que el cierre quede registrado en Grail. El registro del Problem no se borra.',
        'Un evento personalizado puede llevar propiedades que la app usa: dt.query guarda la consulta DQL que permite reconstruir el gráfico del evento en un Notebook o Dashboard, y dt.settings.object_id enlaza con el objeto de Settings que lo originó. Dynatrace propaga al Problem un conjunto de campos integrados junto con los campos de permisos por registro, como dt.host_group.id, k8s.namespace.name o k8s.cluster.name; un campo personalizado de los eventos solo llega al Problem si se configura como Problem field en Settings > Dynatrace Intelligence > Root cause analysis > Problem fields. Solo se pueden definir Problem fields para campos de origen de tipo string, y renombrar o quitar un Problem field cambia los registros de Problems actuales y futuros y puede romper consultas DQL.',
      ],
      comparison: {
        headers: ['Elemento', 'Qué aporta', 'Confusión típica'],
        rows: [
          [
            'Root cause',
            'Entidad causal propuesta (red root cause badge)',
            'Tomarla por la entidad con más eventos o la primera en alertar',
          ],
          ['Impact', 'Todas las entidades de Smartscape impactadas', 'Creer que calcula la prioridad del Problem'],
          [
            'Nodo gris del Visual resolution path',
            'Entidad relacionada usada en el análisis, no impactada',
            'Leerlo como causa pendiente o entidad ya recuperada',
          ],
          [
            'Pestaña Logs',
            'Logs del incidente de las entidades afectadas y relacionadas',
            'Pensar que solo muestra la root cause o todo el entorno',
          ],
          ['dt.query', 'Consulta DQL para reconstruir el gráfico del evento', 'Confundirla con un enlace a Settings'],
          ['dt.settings.object_id', 'Enlace al objeto de Settings de origen', 'Usar event.id para ese fin'],
        ],
      },
      sourceRefs: [
        { title: 'Problems app', url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/problems-app', kind: 'official-docs' },
        {
          title: 'Permissions in Grail',
          url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data/assign-permissions-in-grail',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Puedo explicar la diferencia entre Grail, Hub, Support y documentación.',
    'Sé por qué descubrir una integración no equivale a tener datos.',
    'Puedo diagnosticar un resultado vacío por capas.',
    'Sé conectar experiencia, observabilidad y acción.',
    'Distingo Latest Dynatrace y Classic cuando cambia el contrato.',
    'Puedo describir el ciclo existencia → habilitación → configuración → datos → consulta → acción.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
