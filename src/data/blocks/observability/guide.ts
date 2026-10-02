import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Monitoring & Infrastructure Observability».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Este módulo enseña a observar aplicaciones e infraestructura de extremo a extremo. La clave de examen es distinguir los componentes de captura y acceso, el nivel de entidad y el camino de diagnóstico. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Enumerar las capacidades soportadas por OneAgent y sus condiciones.',
    'Explicar arquitectura, comunicación outbound y code-module injection.',
    'Comparar Full-Stack, Infrastructure y Discovery.',
    'Activar, cambiar y verificar modos de monitorización.',
    'Relacionar host, process group, service, Kubernetes y dependencias.',
    'Diagnosticar datos ausentes sin saltar a conclusiones.',
  ],
  sections: [
    {
      id: 'oneagent',
      title: 'OneAgent y observabilidad automática',
      lead: 'OneAgent observa desde el entorno donde se ejecuta.',
      paragraphs: [
        'OneAgent se instala en hosts compatibles y recopila telemetría de tecnologías soportadas, procesos, servicios y experiencia según la configuración. Su presencia, versión y estado son datos de diagnóstico: no asumas que tener un host monitorizado significa que toda aplicación o tecnología esté cubierta.',
        'En un escenario, empieza comprobando despliegue, conexión, versión, configuración, proceso y permisos. Después revisa la entidad y el timeframe. La etiqueta del agente no reemplaza la evidencia de que el dato concreto se está generando.',
      ],
      bullets: [
        'Host: infraestructura y sistema operativo.',
        'Process Group: agrupación lógica de procesos relacionados.',
        'Process Group Instance: instancia concreta en ejecución.',
        'Service: unidad observable que ofrece una función o endpoint.',
        'Application: experiencia o aplicación que consume el servicio.',
      ],
      sourceRefs: [
        { title: 'OneAgent', url: 'https://docs.dynatrace.com/docs/platform/oneagent', kind: 'official-docs' },
        {
          title: 'Supported monitoring types',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types',
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
      id: 'activegate',
      title: 'ActiveGate y monitorización remota',
      lead: 'ActiveGate media capacidades que no se ejecutan igual que OneAgent.',
      paragraphs: [
        'ActiveGate puede proporcionar conectividad, monitorización remota y funciones de extensibilidad según el caso. En integraciones como VMware o algunas tecnologías de red y cloud, el gateway puede ser el componente que llega al sistema remoto mientras OneAgent observa VMs o procesos donde está instalado.',
        'Confundir ambos produce diseños imposibles: instalar OneAgent dentro de un servicio que requiere acceso remoto no resuelve el requisito. Comprueba grupo, conectividad, credenciales, versión, feature set y permisos.',
        'ActiveGate también puede ejecutar synthetic monitors como private Synthetic location: desplegado dentro de una red corporativa, llega a aplicaciones internas que las public Synthetic locations no alcanzan.',
        'La página oficial de ActiveGate enumera sus funciones: enrutar el tráfico de los OneAgents hacia Dynatrace (Route OneAgent traffic), actuando como secure proxy; monitorizar entornos cloud y tecnologías remotas mediante API (Monitor cloud environments and remote technologies: AWS, Azure, VMware, Kubernetes, SNMP, WMI, Prometheus…); ejecutar synthetic monitors (Run synthetic monitors) y enrutar el tráfico de z/OS. Inyectar code modules en procesos o recopilar las métricas del sistema operativo de un host no son funciones de ActiveGate: las hace el OneAgent instalado en ese host.',
      ],
      comparison: {
        headers: ['Componente', 'Modelo', 'Pregunta de diagnóstico'],
        rows: [
          ['OneAgent', 'Se despliega en el host/proceso observado', '¿Está instalado, conectado y soporta la tecnología?'],
          ['ActiveGate', 'Media acceso o monitorización remota', '¿El grupo, red y credenciales permiten llegar al origen?'],
          ['Extensión', 'Define integración y modelo de datos', '¿Está activa, configurada y produciendo entidades?'],
        ],
      },
      sourceRefs: [
        {
          title: 'Supported monitoring types',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types',
          kind: 'official-docs',
        },
        {
          title: 'How OneAgent works',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-activegate-routing',
      title: 'ActiveGate: tipos, puertos, fallback y network zones',
      lead: 'ActiveGate es a la vez proxy seguro de OneAgent y motor de monitorización remota por API; las network zones deciden por qué ActiveGates sale el tráfico.',
      paragraphs: [
        'ActiveGate es un proxy seguro entre OneAgents y Dynatrace Clusters (o entre OneAgents y otros ActiveGates), y además puede realizar tareas de monitorización usando API para consultar y monitorizar tecnologías donde no se instala OneAgent: AWS, Azure, Google Cloud, VMware, Kubernetes, OpenShift, Cloud Foundry, Oracle, SNMP, WMI o Prometheus. Hay Environment ActiveGates y Cluster ActiveGates; en SaaS solo se necesita un Environment ActiveGate (los Cluster ActiveGates y el embedded ActiveGate de los nodos del cluster son propios de Dynatrace Managed).',
        'En VMware vSphere monitoring, ActiveGate recibe los datos de VMware y los envía al Cluster usando un Environment ActiveGate con acceso de solo lectura a vCenter o a un host ESXi standalone; no se instala OneAgent en el hipervisor. OneAgent en cada máquina virtual aporta datos complementarios de la salud del sistema invitado y de cómo se comportan y comunican sus procesos. La integración detecta migraciones vMotion y la creación de nuevas VMs.',
        'Conectividad por defecto en SaaS: OneAgent abre conexiones salientes HTTPS; el Environment ActiveGate recibe conexiones en el puerto 9999 y el SaaS Cluster en el 443. OneAgent se conecta a un Environment ActiveGate si existe, pero se conecta directamente al SaaS Cluster si no es posible ninguna conexión con un Environment ActiveGate. Dynatrace nunca inicia la conexión hacia OneAgent y un OneAgent no hace de ActiveGate para otros.',
        'Las network zones agrupan OneAgents y ActiveGates por ubicación de red. OneAgent prefiere los ActiveGates de su propia zona; si no hay ninguno disponible, prueba las alternative zones configuradas y después aplica el fallback mode: Any ActiveGate (por defecto, cualquier ActiveGate disponible, incluida la default zone), Only default zone (solo ActiveGates de la default zone) o None (el tráfico permanece dentro de la zona principal y las alternative zones). Los nombres de network zone no distinguen mayúsculas (Dynatrace los guarda en minúsculas) y la función se activa en Settings > Preferences > Network zones con Enable network zones in this environment.',
      ],
      comparison: {
        headers: ['Fallback mode', 'Adónde va el tráfico si no hay ActiveGate en la zona ni en las alternative zones', 'Cuándo encaja'],
        rows: [
          ['Any ActiveGate (default)', 'A cualquier ActiveGate disponible, incluida la default zone', 'Priorizar que los datos lleguen'],
          ['Only default zone', 'Solo a ActiveGates de la default zone', 'Hay una zona central de respaldo'],
          ['None', 'No sale de la zona principal ni de las alternative zones', 'La política prohíbe cruzar zonas'],
        ],
      },
      warning: 'Una cosa es el puerto (9999 hacia Environment ActiveGate, 443 hacia SaaS Cluster) y otra el sentido: siempre es OneAgent quien inicia la conexión.',
      sourceRefs: [
        { title: 'Dynatrace ActiveGate', url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate', kind: 'official-docs' },
        {
          title: 'Supported connectivity schemes for ActiveGates',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate/supported-connectivity-schemes-for-activegates',
          kind: 'official-docs',
        },
        {
          title: 'Network zones',
          url: 'https://docs.dynatrace.com/docs/manage/network-zones/network-zones-basic-info',
          kind: 'official-docs',
        },
        {
          title: 'VMware vSphere monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring',
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
      id: 'topology',
      title: 'Entidades, Smartscape y Problems',
      lead: 'El contexto topológico convierte señales en un recorrido.',
      paragraphs: [
        'Smartscape muestra relaciones entre entidades monitorizadas y ayuda a navegar dependencias. Problems agrupa o contextualiza anomalías relacionadas para investigar alcance y causa. Un Davis event puede ser una señal de evento; no lo trates como sinónimo automático de Problem.',
        'La topología depende de datos de origen, soporte tecnológico, permisos, lifetime y momento de observación. Que una relación no aparezca no prueba que la dependencia no exista; indica que debes revisar el modelo y la evidencia disponible.',
        'Relación entre Davis events y Problems según la documentación de root cause analysis: un Problem representa un incidente y Dynatrace correlaciona en un único Problem todos los Davis events con la misma root cause, así que un Problem puede reunir varios Davis events. A la inversa, la mayoría de los Davis events no indican un estado anormal ("only a small fraction of Davis events are considered within problems"): no cada event abre su propio Problem, y los events existen antes de correlacionarse en el Problem.',
      ],
      bullets: [
        'Usa Smartscape para “qué depende de qué”.',
        'Usa Problems para “qué situación correlacionada está ocurriendo”.',
        'Usa detalles de entidad para comprobar métricas, logs, eventos y trazas.',
        'Conserva el timeframe: una relación o señal puede no estar vigente.',
      ],
      sourceRefs: [
        {
          title: 'How OneAgent works',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'Enable OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-process-groups',
      title: 'Host groups, process groups y process group instances',
      lead: 'El modo en que se agrupan hosts y procesos decide en qué entidad analizas y dónde aplicas configuración.',
      paragraphs: [
        'Un process group agrupa procesos que pertenecen juntos (por ejemplo, los nodos de un cluster Tomcat), y cada process group instance (PGI) representa una instancia concreta: para aislar el nodo que consume más memoria se analiza su PGI, no el process group. Un service es una unidad lógica que puede ejecutarse en varias instancias.',
        'Cada host pertenece como máximo a un host group. Los host groups permiten configurar a escala alerting y anomaly detection, políticas de actualización de OneAgent y configuración de process groups y services. Si el mismo proceso se ejecuta en dos host groups distintos, Dynatrace crea un process group por cada host group, y la separación se extiende a los services. El host group se asigna con --set-host-group en la instalación o después con oneagentctl, Deployment Status o configuración remota; cambiarlo reinicia OneAgent. Su nombre solo admite caracteres alfanuméricos, guiones, guiones bajos y puntos, no puede empezar por dt. y tiene un máximo de 100 caracteres.',
        'Para ajustar la agrupación hay variables de entorno que se definen proceso a proceso: con DT_CLUSTER_ID, todos los procesos que comparten el mismo cluster ID se tratan como miembros del mismo process group (la documentación advierte de no definirla a nivel de sistema); con DT_NODE_ID indicas qué procesos deben tratarse como process group instances separadas. Las reglas y ajustes de process group detection requieren reiniciar los procesos para afectar a cómo se identifican y agrupan; esperar o reiniciar solo OneAgent no basta.',
      ],
      comparison: {
        headers: ['Necesidad', 'Mecanismo', 'Efecto'],
        rows: [
          ['Separar staging y producción del mismo proceso', 'Host groups distintos', 'Un process group por host group'],
          ['Unir procesos en un mismo process group', 'DT_CLUSTER_ID con el mismo valor', 'Mismo process group'],
          ['Ver instancias separadas dentro del process group', 'DT_NODE_ID con valores distintos', 'Process group instances separadas'],
          ['Aplicar una regla de detección nueva', 'Regla + reinicio de los procesos', 'Nueva identificación y agrupación'],
        ],
      },
      sourceRefs: [
        {
          title: 'Organize your environment using host groups',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/hosts/configuration/organize-your-environment-using-host-groups',
          kind: 'official-docs',
        },
        {
          title: 'Process group detection',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups/configuration/pg-detection',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent configuration via command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-davis-problems',
      title: 'Cómo construye Dynatrace un Problem',
      lead: 'Un Problem no es una alerta por síntoma: es la correlación de Davis events con la misma root cause sobre la topología.',
      paragraphs: [
        'Dynatrace correlaciona todos los Davis events con la misma root cause en un único Problem. Para ello sigue un enfoque context-aware: detecta Davis events interdependientes a lo largo del tiempo, procesos, hosts, services y aplicaciones, combinando las perspectivas topológicas vertical y horizontal. La vertical va del service al proceso y al host que lo ejecuta; la horizontal sigue las llamadas entre services. Si una base de datos lenta degrada tres services dependientes, verás un único Problem cuya root cause es la base de datos, no tres Problems ni el service más afectado como causa.',
        'Hay límites temporales: si el inicio de los primeros Davis events se separa más de 5 minutos, no se fusionan en el mismo Problem; y si un Problem dura más de 90 minutos, no se fusionan más Davis events después de ese punto y se abre un nuevo Problem. Un Problem permanece activo mientras alguna entidad afectada siga en estado unhealthy o abnormal, normalmente indicado por un Davis event activo.',
        'El impact analysis identifica qué entry-point services de las aplicaciones se ven afectados y el tamaño del blast radius en número total de entidades afectadas, lo que ayuda a priorizar. Es distinto de la root cause (qué lo provocó) y del baseline aprendido (que sirve para detectar la anomalía).',
      ],
      bullets: [
        'Correlación: Davis events con la misma root cause → un único Problem.',
        'Topología: vertical (service → proceso → host) y horizontal (service → service).',
        'Tiempo: 5 minutos entre los primeros eventos; nada se fusiona tras 90 minutos.',
        'Impacto: entry-point services afectados y blast radius.',
      ],
      sourceRefs: [
        {
          title: 'Root cause analysis concepts',
          url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence/root-cause-analysis/concepts',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent monitoring capabilities',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'kubernetes-db',
      title: 'Kubernetes, bases de datos e infraestructura',
      lead: 'La capa técnica cambia, pero el método de investigación se mantiene.',
      paragraphs: [
        'En Kubernetes, separa cluster, namespace, workload, pod, container y node según la pregunta. En bases de datos, relaciona service, proceso, instancia y tecnología; no reduzcas el análisis al host con mayor CPU.',
        'La observabilidad de infraestructura debe responder qué recurso está degradado, qué aplicación depende de él y si la señal es causa, síntoma o correlación. El banco de preguntas usa escenarios de ese tipo para evitar respuestas centradas en una única métrica.',
        'En la app Kubernetes, el Explorer facilita esa navegación por niveles: su barra lateral agrupa todos los objetos de Kubernetes por tipo (clusters, nodes, namespaces, workloads, pods, services y containers). Para bajar de un namespace a las réplicas que fallan, pasas de namespaces a workloads y de ahí a pods; management zones, severidad o etiquetas de ownership son filtros o detalles, no la estructura de la barra lateral.',
      ],
      bullets: [
        'Empieza por el nivel de entidad que describe el síntoma.',
        'Navega hacia abajo para detalle y hacia arriba para impacto.',
        'Compara salud, rendimiento, errores y dependencias.',
        'Valida la configuración antes de declarar falta de cobertura.',
      ],
      sourceRefs: [
        {
          title: 'OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'Enable OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'oneagent-capabilities',
      title: 'Capacidades soportadas por OneAgent',
      lead: 'OneAgent cubre más que “instalar un agente y ver CPU”.',
      paragraphs: [
        'La documentación de capacidades agrupa monitorización de usuarios reales en navegador y móvil, server-side services, procesos, hosts, red, cloud y máquinas virtuales, contenedores Docker, logs y análisis de causa raíz. La profundidad depende de la tecnología, versión, plataforma, modo y configuración.',
        'En web, OneAgent puede insertar el JavaScript de RUM en las páginas servidas y observar la experiencia del navegador. En mobile, el modelo es diferente: la librería se integra, compila, empaqueta y distribuye dentro de la aplicación Android o iOS. En server-side, puede aportar relaciones entre servicios, llamadas a bases de datos y visibilidad de código para tecnologías soportadas.',
        'La pregunta correcta no es “¿OneAgent lo monitoriza todo?”. Es “¿qué capacidad está soportada para esta tecnología, en qué modo, con qué requisitos y con qué nivel de profundidad?”.',
        'Algunos matices de la página de capacidades que conviene memorizar. En contenedores, basta con instalar OneAgent en los hosts que sirven las aplicaciones en contenedores: detecta la creación y terminación de contenedores y no hace falta modificar las imágenes Docker ni los comandos de arranque. En server-side service monitoring, OneAgent informa de qué aplicaciones o services usan qué otros services y de si un service hace llamadas a otros services o a bases de datos. En red, OneAgent obtiene métricas de red a nivel de proceso gracias a la monitorización proceso a proceso de las comunicaciones, más allá de las métricas agregadas de interfaz del host. En topología, aporta qué procesos se ejecutan en qué hosts y cómo se conectan entre sí. Para root cause analysis, Dynatrace aprende automáticamente el baseline de response time y failure rate de todas las requests y evalúa las desviaciones frente a ese baseline, no frente a un umbral estático global.',
        'La OneAgent support matrix indica qué capacidades soporta OneAgent en cada sistema operativo y plataforma, con cuatro estados: GA (generally available and fully supported), Preview (no está lista para producción y no tiene soporte oficial), Future (en el roadmap o bajo demanda) y Not planned (Dynatrace no prevé desarrollarla). Una capability en Preview no debe tratarse como soportada en producción.',
      ],
      comparison: {
        headers: ['Capacidad', 'Qué aporta', 'Condición que debes comprobar'],
        rows: [
          ['RUM web', 'Interacciones y rendimiento de navegador', 'Aplicación web, inyección/configuración y modelo RUM'],
          ['Mobile RUM', 'Experiencia de apps nativas', 'Plataforma, librería, compilación y distribución'],
          ['Server-side', 'Servicios, requests, dependencias y código', 'Tecnología soportada, proceso e inyección'],
          ['Host/process/network', 'Salud, procesos y comunicación', 'Sistema, permisos y modo de monitorización'],
          ['Logs', 'Descubrimiento y análisis de archivos', 'Configuración de fuentes, retención y permisos'],
          ['Root cause', 'Baselines y correlación de anomalías', 'Datos suficientes y configuración de AI'],
        ],
      },
      sourceRefs: [
        {
          title: 'Enable OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent platform and capability support matrix',
          url: 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'oneagent-architecture',
      title: 'Cómo funciona internamente',
      lead: 'La arquitectura explica muchos “por qué” del examen.',
      paragraphs: [
        'OneAgent está compuesto por procesos especializados que se ejecutan en cada host monitorizado. Recoge métricas del sistema operativo, detecta procesos y puede inyectar módulos de deep monitoring en tecnologías soportadas como Java, Node.js, .NET y otras. La inyección enlaza dinámicamente el módulo con el proceso monitorizado.',
        'Para RUM web, OneAgent puede insertar un JavaScript tag en el HTML servido y usar un módulo instalado en el servidor web. Para logs, descubre y analiza archivos del host o process group; según configuración, los logs pueden conservarse en Dynatrace aunque el almacenamiento original sea volátil o tenga poca retención.',
        'La comunicación de OneAgent hacia Dynatrace es outbound-only: el agente informa mediante HTTP/S al Cluster o a ActiveGate. Dynatrace no inicia una conexión entrante al agente, por lo que no se requiere abrir puertos inbound para este flujo. Puede conectarse directamente al Cluster o a uno o varios ActiveGates; el agente recibe del Cluster la información para decidir la ruta.',
        'En Linux, OneAgent se instala por defecto en non-privileged mode: los privilegios de superusuario solo se usan para iniciar la instalación, y después Dynatrace OneAgent Watchdog arranca y ejecuta todos los demás procesos de OneAgent bajo un usuario sin privilegios (dtuser), con Linux capabilities concretas y conservando el conjunto completo de funcionalidades. No depende del modo de monitorización. La herramienta oneagentctl, en cambio, sí requiere privilegios de root para ejecutarse.',
        'Además del HTTP/S habitual, si Live Debugger está habilitado OneAgent crea una sesión WebSocket saliente hacia los ActiveGates o el Cluster para la información en tiempo real; la telemetría normal sigue usando HTTP/S. OneAgent puede conectarse simultáneamente a través de varios ActiveGates y decide por cuáles comunicarse según la información que recibe del Cluster.',
      ],
      bullets: [
        'La inyección ocurre cuando se inicia el proceso y cumple soporte y reglas.',
        'Desactivar o detener el agente no elimina necesariamente módulos ya inyectados.',
        'Un proceso inyectado requiere reinicio para quitar el módulo enlazado.',
        'El canal de comunicación y el canal de instrumentación son conceptos distintos.',
        'ActiveGate es una ruta de comunicación posible, no el reemplazo conceptual de OneAgent.',
      ],
      sourceRefs: [
        {
          title: 'OneAgent command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent platform and capability support matrix',
          url: 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix',
          kind: 'official-docs',
        },
        {
          title: 'Application and Infrastructure Observability overview',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'monitoring-modes',
      title: 'Modos de monitorización: Full-Stack, Infrastructure y Discovery',
      lead: 'Los modos cambian la profundidad, el coste y el tipo de evidencia disponible.',
      paragraphs: [
        'Full-Stack es el modo por defecto y proporciona visibilidad completa a través de hosts, procesos y services, incluyendo tracing y profiling según soporte. Infrastructure monitoring mode reduce el foco a infraestructura, logs, AIOps y servicios de backing; mantiene auto-injection por defecto para aportar datos adicionales de Infrastructure Observability y runtime metrics, salvo que se desactive.',
        'Discovery monitoring mode ofrece métricas básicas para descubrir hosts y procesos y valorar dónde extender la cobertura. La documentación actual indica que está disponible solo con Dynatrace Platform Subscription (DPS) y que el consumo se realiza mediante Foundation & Discovery. No es equivalente a Full-Stack ni a Infrastructure mode.',
        'Los tres modos comparten descubrimiento de topología, host criticality y basic monitoring en la tabla oficial. La profundidad de host process details, detailed disk/network/memory analysis, tracing/profiling, process injection, extensions y Application Security varía. Estudia la matriz como una decisión de capacidad, no como una etiqueta.',
        'Lectura literal de la tabla oficial: Topology discovery, Host criticality (detección de external services y app dependencies) y Basic monitoring (host health, filesystem, OS Services) son GA en los tres modos. Host process details, Detailed disk analysis, Network analysis y Memory analysis son GA en Full-Stack e Infrastructure y no figuran en Discovery. Tracing and profiling solo figura en Full-Stack. Extensions es opt-in en Full-Stack e Infrastructure y no figura en Discovery. Log Management, Application Security y Live Debugger son opt-in en los tres modos.',
        'En Infrastructure, OneAgent inyecta automáticamente en procesos para monitorizar backing services Java y runtime metrics de los lenguajes soportados (process injection opt-out, es decir, activa salvo que se desactive) y admite custom metrics con un límite de 100 por host. En Full-Stack, el límite de custom metrics es 15 por cada 256 MiB de memoria del host, y Discovery no incluye custom metrics.',
      ],
      comparison: {
        headers: ['Capacidad', 'Full-Stack', 'Infrastructure', 'Discovery'],
        rows: [
          ['Topology discovery / Smartscape', 'Sí', 'Sí', 'Sí'],
          ['Basic host monitoring', 'Sí', 'Sí', 'Sí'],
          ['Host process details', 'Sí', 'Sí', 'No (—)'],
          ['Disk, network, memory analysis', 'Sí', 'Sí', 'No (—)'],
          ['Tracing and profiling', 'Sí', 'No', 'No'],
          ['Process injection', 'Sí', 'Opt-out', 'No (—); code-module injection se habilita por host para AppSec y Live Debugger'],
          ['Log Management', 'Opt-in', 'Opt-in', 'Opt-in'],
          ['Extensions', 'Opt-in', 'Opt-in', 'No (—)'],
          ['Application Security', 'Opt-in', 'Opt-in', 'Opt-in con requisitos de modo'],
          ['Host criticality', 'Sí', 'Sí', 'Sí'],
          ['Custom metrics', '15 / 256 MiB', '100 / host', 'No (—)'],
          ['Live Debugger', 'Opt-in', 'Opt-in', 'Opt-in'],
        ],
      },
      sourceRefs: [
        {
          title: 'OneAgent platform and capability support matrix',
          url: 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix',
          kind: 'official-docs',
        },
        {
          title: 'Application and Infrastructure Observability overview',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability',
          kind: 'official-docs',
        },
        {
          title: 'Infrastructure Observability',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-mode-licensing',
      title: 'Cómo consume licencia cada modo en DPS',
      lead: 'El modo no solo cambia la profundidad: también cambia la capability DPS y la unidad con la que se mide el consumo.',
      paragraphs: [
        'Cada modo consume una capability distinta de DPS. Full-Stack Monitoring se mide en GiB-hours (memory-gibibyte-hours) según la memoria del host: la RAM se redondea al siguiente múltiplo de 0,25 GiB (256 MiB) y se aplica un mínimo de 4 GiB a hosts físicos y virtuales. Infrastructure Monitoring se mide en host hours, con independencia de la memoria del host: cada host monitorizado aporta una host hour por hora tenga la RAM que tenga.',
        'Foundation & Discovery, la capability de Discovery mode, también se mide en host hours, independientes de la memoria, e incluye las métricas básicas integradas; no incluye la ingesta de custom metrics, que requiere Infrastructure o Full-Stack, y los logs se cobran aparte en Log Management and Analytics. En todos los casos el consumo se calcula en intervalos de 15 minutos: un host monitorizado menos de 15 minutos en un intervalo cuenta como 15 minutos.',
      ],
      comparison: {
        headers: ['Modo', 'Capability DPS', 'Unidad de consumo'],
        rows: [
          ['Full-Stack', 'Full-Stack Monitoring', 'GiB-hours según la RAM (mínimo 4 GiB por host)'],
          ['Infrastructure', 'Infrastructure Monitoring', 'Host hours, independientes de la memoria'],
          ['Discovery', 'Foundation & Discovery', 'Host hours, independientes de la memoria'],
        ],
      },
      warning: 'Desactivar la auto-injection en un host Full-Stack no lo convierte en Infrastructure: sigue consumiendo Full-Stack Monitoring.',
      sourceRefs: [
        {
          title: 'Full-Stack Monitoring (DPS)',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability/full-stack-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Infrastructure Monitoring (DPS)',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability/infrastructure-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Foundation & Discovery (DPS)',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability/foundation-and-discovery',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'enable-modes',
      title: 'Cómo activar y cambiar modos',
      lead: 'El modo puede definirse como valor por defecto o por host.',
      paragraphs: [
        'Antes de instalar, puedes definir un default monitoring mode en Latest Dynatrace desde Settings > Fleet management > Default mode; en Classic, desde Settings > General > Versions and updates > OneAgent default mode. Ese valor cambia el valor por defecto del despliegue, no convierte mágicamente todos los hosts existentes sin una configuración efectiva.',
        'Infrastructure mode puede activarse durante la instalación con `--set-monitoring-mode=infra-only` o después desde el host, CLI o Settings API (schema builtin:host.monitoring). Discovery mode puede activarse durante la instalación con `--set-monitoring-mode=discovery` o después desde el host o CLI. En un escenario de escala, distingue la configuración por host de un valor predeterminado.',
        'La auto-injection también se desactiva por host (en la configuración del host, Host Monitoring > Advanced settings > ProcessAgent Injection, o con --set-auto-injection-enabled=false): ese host deja de inyectar aunque el resto del entorno siga inyectando. Para extensiones JMX/PMI en Infrastructure mode, la documentación indica que el ajuste a nivel de host prevalece sobre el de entorno ("The setting at the host level takes precedence over environment settings"). Cuando un cambio afecta a inyección o módulos, el reinicio de los procesos monitorizados es una condición operativa esencial.',
        'Para cambiar el modo de muchos hosts ya instalados sin entrar en cada uno, la vía documentada es la Settings API: se descarga el schema con GET a schema usando builtin:host.monitoring como schemaId y se crea la configuración con POST an object. El Default mode de Settings > Fleet management afecta a las nuevas instalaciones, no convierte los hosts existentes.',
        'Si un solo host deja de inyectar mientras el resto del entorno sí lo hace, la causa no es el modo: en Infrastructure mode la process injection está habilitada por defecto ("Process injection is enabled by default") y en Full-Stack la configuración de entorno tampoco se ignora. Revisa la auto-injection de ese host concreto (configuración del host o oneagentctl --get-auto-injection-enabled).',
      ],
      code: 'oneagentctl --set-monitoring-mode=infra-only\noneagentctl --set-monitoring-mode=discovery\noneagentctl --set-auto-injection-enabled=false',
      codeNote: 'Los comandos son ejemplos de la documentación oficial; la sintaxis final depende de la plataforma y del instalador. No ejecutes cambios en producción sin validar el procedimiento de tu sistema.',
      sourceRefs: [
        {
          title: 'Application and Infrastructure Observability overview',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability',
          kind: 'official-docs',
        },
        {
          title: 'Infrastructure Observability',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability',
          kind: 'official-docs',
        },
        {
          title: 'Databases',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'injection',
      title: 'Auto-injection, code-module injection y reinicios',
      lead: 'Desactivar una capa no significa detener toda la actividad del agente.',
      paragraphs: [
        'En Infrastructure mode, process injection está habilitado por defecto y aporta runtime metrics para Java, .NET, Node.js, Go, PHP y web servers como Apache HTTP, NGINX o Microsoft IIS, además de backing services Java y extensiones JMX/PMI. Si OneAgent se ejecuta como container con Infrastructure mode, la inyección de procesos no se realiza según la guía de activación.',
        'Puedes desactivar auto-injection en un host con la UI o `--set-auto-injection-enabled=false`, definir reglas de process monitoring para grupos concretos, desactivar runtime metrics o desactivar extensiones. Estas rutas no son equivalentes: algunas cambian el control desde la UI o API y pueden impedir gestionar auto-injection desde determinados lugares.',
        'En Discovery mode, code-module injection está desactivado por defecto. Para que Application Security y Live Debugger funcionen en Discovery, se debe habilitar code-module injection en el host y reiniciar los procesos. En todos los modos, la inyección ya realizada permanece enlazada hasta que se reinicia el proceso.',
        'Significado de cada estado de Auto-injection en Deployment Status: Enabled (se habilitó correctamente), Disabled manually (se desactivó después de instalar OneAgent), Disabled on installation (se desactivó durante la instalación de OneAgent), Disabled on sanity check (no se habilitó porque falló un test) y Failed on installation (falló por un error durante la instalación).',
        'Para excluir de la inyección solo ciertos procesos, las custom process monitoring rules dan control fino sobre en qué procesos inyecta OneAgent, sin desactivar la auto-injection de todo el host. Desactivar runtime metrics (Settings > Monitoring > Monitored technologies) es otra cosa: quita esas métricas, no excluye un grupo de procesos. Tras cualquiera de estos cambios hay que reiniciar los procesos afectados.',
      ],
      bullets: [
        'Desactivar auto-injection limita deep monitoring y puede impedir detección de vulnerabilidades o Live Debugger.',
        'El estado puede consultarse en Deployment Status filtrando Auto-injection.',
        '“Disabled manually”, “Disabled on installation”, “Disabled on sanity check” y “Failed on installation” son estados distintos.',
        'Detener OneAgent no implica que desaparezca el módulo ya inyectado.',
        'Siempre distingue cambio de configuración, reinicio y evidencia posterior.',
      ],
      sourceRefs: [
        {
          title: 'Infrastructure Observability',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability',
          kind: 'official-docs',
        },
        {
          title: 'Databases',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases',
          kind: 'official-docs',
        },
        {
          title: 'Kubernetes',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'oneagent-troubleshooting',
      title: 'Troubleshooting de OneAgent',
      lead: 'Diagnostica cobertura, modo, inyección, comunicación y datos.',
      paragraphs: [
        'Si no ves una aplicación, comprueba primero que el host tenga OneAgent conectado, que el proceso sea compatible, que el modo permita la profundidad esperada y que no exista una regla de exclusión. Si el proceso arrancó antes de cambiar la regla, reinícialo para que el agente evalúe de nuevo la inyección.',
        'Si no ves logs, separa descubrimiento del archivo, permisos de lectura, configuración de log source, procesamiento, retención y query. Si no ves una relación de red, comprueba que la tecnología y el nivel de monitorización lo soporten, que el timeframe sea correcto y que el contexto de entidad esté disponible.',
        'Si OneAgent aparece “disabled”, recuerda que el core de comunicación puede seguir activo para informar estado y consultar si debe comenzar a monitorizar de nuevo. No interpretes tráfico residual como prueba de que el deep monitoring siga funcionando.',
      ],
      bullets: [
        'Cobertura: host, proceso, tecnología y versión.',
        'Modo: Full-Stack, Infrastructure o Discovery.',
        'Inyección: habilitada, excluida, fallida o pendiente de reinicio.',
        'Comunicación: outbound, Cluster/ActiveGate, certificado y red.',
        'Datos: logs, métricas, traces, RUM, entidades y permisos.',
        'Verificación: evidencia posterior al cambio.',
      ],
      sourceRefs: [
        {
          title: 'Databases',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases',
          kind: 'official-docs',
        },
        {
          title: 'Kubernetes',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app',
          kind: 'official-docs',
        },
        {
          title: 'Monitor Kubernetes metrics',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-monitoring/monitor-metrics-kubernetes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-oneagent-capabilities',
      title: 'OneAgent: qué puede observar y desde dónde',
      lead: 'La presencia del agente no equivale a cobertura completa.',
      paragraphs: [
        'OneAgent recopila métricas del sistema operativo, detecta procesos, observa tecnologías soportadas mediante code modules, puede inyectar RUM en páginas web, monitorizar logs y construir relaciones de red proceso-a-proceso. La cobertura concreta depende de plataforma, versión, tecnología, modo, configuración y capacidad habilitada. En móvil, la instrumentación usa bibliotecas compiladas para Android/iOS; no es el mismo mecanismo que inyectar JavaScript en un frontend web.',
        'Para servicios server-side, la cobertura puede incluir web services, web containers, database requests, custom services y relaciones entre componentes. En infraestructura, host, filesystem, disk, network, memory, OS services, process details y extensiones tienen condiciones diferentes. Infrastructure mode proporciona métricas de infraestructura y runtime metrics mediante process injection, pero no tracing and profiling.',
      ],
      comparison: {
        headers: ['Área', 'Ejemplos de cobertura', 'Condición que debes verificar'],
        rows: [
          ['Host', 'OS, CPU, memoria, disco, red', 'OneAgent, modo y soporte de plataforma'],
          ['Process', 'detección, runtime y detalles', 'proceso soportado e inyección'],
          ['Service', 'requests, llamadas, errores', 'tecnología y code module'],
          ['Frontend', 'RUM web y experiencia', 'inyección/configuración RUM'],
          ['Log', 'archivos de host o process group', 'descubrimiento y reglas de ingestión'],
        ],
      },
      sourceRefs: [
        { title: 'OneAgent', url: 'https://docs.dynatrace.com/docs/platform/oneagent', kind: 'official-docs' },
        {
          title: 'Supported monitoring types',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types',
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
      id: 'deep-oneagent-architecture',
      title: 'Cómo funciona OneAgent internamente y CLI oneagentctl',
      lead: 'El agente combina procesos especializados, detección e instrumentación local.',
      paragraphs: [
        'OneAgent tiene procesos que recopilan métricas del sistema y detectan qué procesos se están ejecutando. Para tecnologías como Java, Node.js o .NET puede inyectar módulos y observar desde dentro del proceso. La herramienta de línea de comandos `oneagentctl` permite a los administradores del sistema interactuar directamente con la instalación local de OneAgent: consultar el estado del servicio, configurar endpoints de comunicación, definir proxy settings y ajustar el modo de monitorización localmente.',
        'La comunicación desde OneAgent hacia Dynatrace es exclusivamente saliente (outbound-only) por HTTP/S: hacia un Environment ActiveGate usa por defecto el puerto 9999 y hacia el SaaS Cluster el 443. El agente puede conectarse directamente al Cluster SaaS o a través de uno o varios ActiveGates. La inyección de código dinámico enlaza librerías en memoria: si se modifica la configuración de auto-injection o se desactiva un code module, los procesos monitorizados deben ser reiniciados para que el cambio surta efecto.',
      ],
      bullets: [
        'oneagentctl: herramienta CLI para inspeccionar y configurar OneAgent en el host.',
        'Outbound-only (9999 hacia Environment ActiveGate, 443 hacia SaaS Cluster): sin puertos de entrada requeridos en firewalls.',
        'Reinicio de procesos: obligatorio tras modificar reglas de code-module injection.',
        'RUM injection: añade el agente JavaScript a páginas web cuando corresponde.',
        'Log monitoring: descubre y almacena archivos según configuración.',
      ],
      sourceRefs: [
        {
          title: 'How OneAgent works',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'Enable OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-oneagent-modes',
      title: 'Full Stack, Infrastructure y Discovery',
      lead: 'Los modos son perfiles de cobertura y coste, no simples etiquetas de instalación.',
      paragraphs: [
        'Full-Stack es la opción de mayor profundidad para aplicaciones críticas: incluye tracing y profiling, detalles de proceso, análisis de disco, red y memoria, además de topology y basic monitoring. Infrastructure está orientado a salud de infraestructura y backing services; mantiene métricas de host y determinados runtime metrics mediante auto-injection, pero no ofrece la misma trazabilidad de aplicaciones. Discovery proporciona una huella ligera para descubrir hosts y procesos y se licencia con Foundation & Discovery del modelo DPS.',
        'Los tres modos comparten topology discovery, host criticality y basic monitoring. La tabla oficial distingue también extensions, custom metrics, Log Management, Application Security, Live Debugger, process injection, tracing y profiling. Una pregunta precisa puede preguntar qué se mantiene, qué es opt-in, qué está ausente o qué requiere activar code-module injection. Responde con la matriz y no con una frase genérica como “Discovery monitoriza menos”.',
      ],
      comparison: {
        headers: ['Capability', 'Full-Stack', 'Infrastructure', 'Discovery'],
        rows: [
          ['Topology/basic monitoring', 'GA', 'GA', 'GA'],
          ['Host process/details', 'GA', 'GA', 'no (—)'],
          ['Tracing/profiling', 'GA', 'no (—)', 'no (—)'],
          ['Process injection', 'GA', 'opt-out', 'no (—)'],
          ['Application Security/Live Debugger', 'opt-in', 'opt-in', 'opt-in con requisitos'],
          ['Licensing focus', 'Full Stack', 'Infrastructure', 'Foundation & Discovery'],
        ],
      },
      sourceRefs: [
        {
          title: 'Enable OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent platform and capability support matrix',
          url: 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-oneagent-change-control',
      title: 'Activación, cambio de modo e inyección',
      lead: 'Cambiar un modo es una operación de configuración con efectos observables.',
      paragraphs: [
        'El modo por defecto se puede definir antes de instalar OneAgent. Infrastructure puede establecerse durante o después de la instalación mediante `--set-monitoring-mode=infra-only`, UI o Settings API; Discovery usa `--set-monitoring-mode=discovery`. `--get-monitoring-mode` permite verificar el valor local. La respuesta no debe asumir que cambiar el selector de la UI ha modificado ya la profundidad de una aplicación que necesita reinicio o reinstrumentación.',
        'Desactivar auto-injection puede impedir que Application Security o Live Debugger descubran lo que dependía de esa instrumentación. Infrastructure puede inyectar runtime metrics para Java, .NET, Node.js, Go, PHP y algunos web servers, mientras que una instalación del agente como container tiene condiciones distintas. Discovery requiere habilitar code-module injection para ciertos usos de AppSec y Live Debugger y reiniciar procesos.',
      ],
      bullets: [
        'Verifica el modo después del cambio.',
        'Comprueba si el proceso necesita reinicio.',
        'Distingue auto-injection de code-module injection.',
        'Comprueba la precedencia de host settings frente a environment settings.',
        'Revisa el soporte de la tecnología concreta en la matriz oficial.',
      ],
      sourceRefs: [
        {
          title: 'OneAgent platform and capability support matrix',
          url: 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix',
          kind: 'official-docs',
        },
        {
          title: 'Application and Infrastructure Observability overview',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability',
          kind: 'official-docs',
        },
        {
          title: 'Infrastructure Observability',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-oneagentctl',
      title: 'oneagentctl: parámetros y reinicios que exige cada cambio',
      lead: 'La CLI local cambia configuración del host, pero cada parámetro tiene su propio requisito de reinicio.',
      paragraphs: [
        'oneagentctl está en <INSTALL_PATH>/agent/tools: por defecto /opt/dynatrace/oneagent/agent/tools en Linux y AIX, donde necesitas privilegios de root, y %PROGRAMFILES%\\dynatrace\\oneagent\\agent\\tools en Windows, donde necesitas privilegios de administrador. Se ejecuta localmente en el host; no depende de API tokens ni del modo de monitorización.',
        'Los parámetros de lectura siguen el patrón --get-… (--get-monitoring-mode, --get-auto-injection-enabled, --get-host-id, --get-server). Los valores de --set-monitoring-mode son fullstack, infra-only y discovery. --set-auto-injection-enabled=true o false activa o desactiva la auto-injection; tras activarla hay que reiniciar los procesos monitorizados para que carguen el code module. Cambiar el modo con --set-monitoring-mode requiere reiniciar OneAgent y también todos los services monitorizados, igual que --set-host-group. --set-proxy configura el proxy (con valor vacío lo elimina) y requiere reiniciar OneAgent; --set-no-proxy excluye dominios o IPs. --set-host-tag y --set-host-property no exigen reiniciar los services monitorizados; como con todo parámetro --set ("When you use the set parameters, you need to restart OneAgent service to apply changes"), el cambio se aplica al reiniciar el servicio OneAgent. Para que ese reinicio de OneAgent se haga automáticamente puedes añadir --restart-service.',
        'En la instalación desatendida se usan los mismos parámetros (por ejemplo --set-monitoring-mode=infra-only, --set-host-group y --set-host-tag con formato clave=valor). Si el host no aparece en el host group esperado, revisa las reglas de nombre: alfanuméricos, guiones, guiones bajos y puntos, sin empezar por dt. y con un máximo de 100 caracteres. El orden de los parámetros no importa.',
        'Diagnóstico típico con la CLI: si --get-monitoring-mode devuelve infra-only y --get-auto-injection-enabled devuelve false, la falta de runtime metrics de la JVM no se debe al modo, porque Infrastructure mode aporta runtime metrics de Java (y de .NET, Node.js, Go, PHP y web servers) mediante process injection, habilitada por defecto. La causa es la auto-injection desactivada: actívala con --set-auto-injection-enabled=true y reinicia el proceso Java. Pasar a fullstack no hace falta, y --restart-service solo reinicia OneAgent: no cambia ese false.',
      ],
      comparison: {
        headers: ['Parámetro', 'Qué hace', 'Reinicio que requiere'],
        rows: [
          ['--set-monitoring-mode', 'fullstack, infra-only o discovery', 'OneAgent y todos los services monitorizados'],
          ['--set-host-group', 'Asigna el host a un host group', 'OneAgent y todos los services monitorizados'],
          ['--set-auto-injection-enabled', 'Activa o desactiva la auto-injection', 'Reiniciar los procesos para que cambie su inyección'],
          ['--set-proxy / --set-no-proxy', 'Proxy y exclusiones', 'OneAgent'],
          ['--set-host-tag / --set-host-property', 'Tags y propiedades del host', 'OneAgent (no los services monitorizados)'],
        ],
      },
      code: 'oneagentctl --get-monitoring-mode\noneagentctl --set-monitoring-mode=fullstack --restart-service\noneagentctl --set-proxy=my-proxy.com --restart-service\noneagentctl --set-auto-injection-enabled=true',
      codeNote: 'Ejemplos con la sintaxis de la documentación oficial; --restart-service reinicia OneAgent, no los procesos monitorizados.',
      sourceRefs: [
        {
          title: 'OneAgent configuration via command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
        {
          title: 'Enable OneAgent monitoring modes',
          url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-infrastructure-connectors',
      title: 'Bases de datos, Kubernetes y ActiveGate 1.327+',
      lead: 'Infrastructure Observability combina OneAgent, ActiveGate, APIs y extensiones.',
      paragraphs: [
        'Las bases de datos monitorizadas remotamente requieren un ActiveGate group, conectividad directa hacia el servidor de base de datos, permisos y componentes adicionales como drivers cuando la extensión los necesita. OneAgent en el host puede aportar contexto complementario. La aplicación Databases separa fleet, instances, logical databases y host dependencies; no respondas que “Database monitoring” significa únicamente instalar OneAgent.',
        'Kubernetes utiliza ActiveGate para monitorizar la API de control del cluster y OneAgent para pods, contenedores y procesos. Para disponer de Enhanced Object Visibility (visibilidad avanzada de objetos de Kubernetes), la versión de ActiveGate debe ser 1.327 o superior. Versiones anteriores no recopilan la metadata completa requerida por la experiencia moderna de Kubernetes Platform Monitoring en Latest Dynatrace.',
        'Reparto de papeles en la app Databases: la extensión de base de datos, ejecutada en el ActiveGate group (con drivers como JDBC instalados en los ActiveGates), es la que se conecta a la instancia y aporta las SQL statements, los execution plans y la salud de la instancia. El OneAgent del servidor añade contexto del host: la app usa los datos de los hosts con OneAgent, como sus métricas de recursos, para analizar en profundidad las dependencias de recursos.',
      ],
      comparison: {
        headers: ['Escenario', 'Componente que suele intervenir', 'Qué validar'],
        rows: [
          ['Base de datos remota', 'Environment ActiveGate + extensión', 'driver, red, credenciales y permisos'],
          ['Kubernetes API', 'ActiveGate (versión 1.327+)', 'Enhanced Object Visibility, RBAC y cluster connection'],
          ['Kubernetes workload/process', 'OneAgent / Dynatrace Operator', 'modo Full-Stack, auto-injection en pods y namespace'],
          ['VMware vSphere', 'ActiveGate', 'vCenter/ESXi, lectura, red y grupo'],
        ],
      },
      sourceRefs: [
        {
          title: 'Databases',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases',
          kind: 'official-docs',
        },
        {
          title: 'Kubernetes',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app',
          kind: 'official-docs',
        },
        {
          title: 'Monitor Kubernetes metrics',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-monitoring/monitor-metrics-kubernetes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dynakube-modes',
      title: 'Kubernetes con Dynatrace Operator: modos de DynaKube',
      lead: 'Cada modo de DynaKube decide si hay monitorización de nodos, de aplicación o de la plataforma Kubernetes.',
      paragraphs: [
        'cloudNativeFullStack usa mutating webhooks para inyectar code modules en los Pods de aplicación y combina monitorización de infraestructura y de aplicación. Sus componentes: Dynatrace Operator (rollout y ciclo de vida), el webhook (valida configuraciones e inyecta configuración en los Pods), el CSI driver (DaemonSet que proporciona almacenamiento para los binarios de OneAgent; no inyecta), OneAgent (recoge métricas de host de los nodos) y ActiveGate, que enruta los datos de observabilidad al cluster de Dynatrace y monitoriza la Kubernetes API.',
        'classicFullStack requiere acceso de escritura desde el Pod de OneAgent al sistema de archivos del nodo y no está soportado cuando se usa un platform token. applicationMonitoring inyecta code modules en los Pods y monitoriza los procesos del contenedor (disco, CPU y red), pero no monitoriza métricas de host y, sin Kubernetes platform monitoring, la topología se limita a Pods y contenedores; el CSI driver es opcional. hostMonitoring recoge métricas de host y datos de procesos de los nodos con OneAgent, sin monitorización a nivel de aplicación. Kubernetes platform monitoring usa la Kubernetes API y cAdvisor para obtener métricas de nodos y contenedores y eventos de Kubernetes; no incluye OneAgent ni monitorización de aplicación por defecto, aunque se combina con los demás modos.',
      ],
      comparison: {
        headers: ['Modo', 'Qué aporta', 'Qué no aporta o qué exige'],
        rows: [
          ['cloudNativeFullStack', 'Inyección por mutating webhooks + métricas de nodos', 'Es la opción full-stack con platform token'],
          ['classicFullStack', 'Full-stack inyectando desde el Pod de OneAgent', 'Escritura en el filesystem del nodo; sin platform token'],
          ['applicationMonitoring', 'Code modules en los Pods y procesos del contenedor', 'Sin métricas de host; topología limitada'],
          ['hostMonitoring', 'Métricas de host y procesos de los nodos', 'Sin monitorización de aplicación'],
          [
            'Kubernetes platform monitoring',
            'Kubernetes API + cAdvisor: nodos, contenedores y eventos',
            'Sin OneAgent ni aplicación por defecto',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'Full-stack observability with Dynatrace Operator',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/cloud-native-fullstack',
          kind: 'official-docs',
        },
        {
          title: 'Classic Full-Stack monitoring',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/other-deployment-modes/classic-fullstack',
          kind: 'official-docs',
        },
        {
          title: 'Application observability with Dynatrace Operator',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/application-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Host monitoring with Dynatrace Operator',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/other-deployment-modes/host-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Kubernetes platform monitoring',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/kubernetes-monitoring',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-kubernetes-app',
      title: 'La app Kubernetes y Enhanced Object Visibility',
      lead: 'La nueva experiencia Kubernetes vive sobre Grail y AppEngine y añade objetos, YAML y alertas de buenas prácticas.',
      paragraphs: [
        'Requisitos: un entorno Dynatrace SaaS con Grail y AppEngine, licencia DPS con la capability Kubernetes Platform Monitoring y permisos suficientes. La nueva experiencia no está disponible para Managed ni para SaaS sin Grail; en esos entornos se sigue usando Kubernetes Classic. Como las métricas, eventos y logs están en Grail, el mismo análisis puede hacerse con DQL y reutilizarse en Notebooks, Dashboards o Workflows.',
        'Enhanced Object Visibility (desde el 19 de enero de 2026) añade objetos como Ingress, NetworkPolicies, CRDs, PVCs, PVs y ConfigMaps, da acceso a sus definiciones YAML para depurar y validar configuraciones en tiempo real y permite consultar los YAML de todos los clusters y namespaces con DQL para detectar misconfigurations. Requiere ActiveGate 1.327 o superior. Con ActiveGates anteriores, el cluster funciona en modo de compatibilidad y aparece una pestaña adicional Explorer (Classic); al actualizar ActiveGate pasa al Explorer nuevo sin pérdida de datos de monitorización. Desde junio de 2026, Explorer (Classic) pasa a soporte de solo mantenimiento (maintenance only): los clusters con ActiveGates antiguos siguen visibles ahí, pero sin acceso a las funciones nuevas.',
        'Salud y alertas: para eventos críticos se genera un Health alert, que inicia una investigación de Problems; para situaciones no críticas, un Warning signal informa de un posible problema. Un objeto de Kubernetes (por ejemplo, un cluster) se considera unhealthy si cualquiera de sus custom alert configurations asociadas está unhealthy. La pestaña Recommendations presenta alertas de buenas prácticas para clusters, nodes, namespaces, persistent volume claims y workloads, y resalta cuáles están active, partially active o inactive. Al seleccionar un objeto en el Explorer se abre una vista de detalle con pestañas de health y utilization, logs, events, ownership y vulnerabilities.',
      ],
      bullets: [
        'Prerrequisitos: SaaS + Grail + AppEngine, DPS con Kubernetes Platform Monitoring, permisos.',
        'Enhanced Object Visibility: ActiveGate 1.327+; antes, Explorer (Classic), en maintenance only desde junio de 2026.',
        'Health alert (crítico, inicia Problems) frente a Warning signal (no crítico).',
        'Recommendations: alertas de buenas prácticas active, partially active o inactive.',
      ],
      sourceRefs: [
        {
          title: 'Kubernetes app',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-infra-apps',
      title: 'Databases, Infrastructure & Operations y Discovery & Coverage',
      lead: 'Tres apps de Infrastructure Observability con preguntas distintas: bases de datos, salud de infraestructura y huecos de cobertura.',
      paragraphs: [
        'La app Databases ofrece un health score compuesto que resume la salud de cada instancia de base de datos, análisis de SQL statements y execution plans, y vistas como Overview, Explorer, Databases, Tables e Indexes. Se alimenta de extensiones de base de datos (Extensions Framework 2.0) ejecutadas en ActiveGate, con OneAgent como fuente complementaria de métricas de host. Prerrequisitos: asignar uno o varios ActiveGate groups que conecten remotamente con los servidores de base de datos, instalar los componentes necesarios, como drivers JDBC, en esos ActiveGates, validar la conectividad directa desde ActiveGate y crear un usuario de monitorización con permisos sobre system views y schemas. Así se monitoriza también una base de datos gestionada en la que no se pueden instalar agentes.',
        'Infrastructure & Operations simplifica la monitorización de salud de la infraestructura y facilita el root cause analysis de Problems, con vistas de Hosts, Containers, Processes y Network Devices y un Explorer para filtrar entidades, revisar su salud e investigar Problems. Discovery & Coverage sirve para detectar blind spots e implementar el nivel de observabilidad adecuado a escala. En Host coverage, la columna Recommended action propone No action, Connect cloud (para clouds sin conectar) o Install OneAgents (con prioridad según el tamaño del hueco de observabilidad; con filtros, el botón indica cuántos OneAgents se instalarán). En Service coverage, la columna Enable Full-Stack permite pasar a Full-Stack monitoring mode los OneAgents de los hosts descubiertos. En Network coverage, Configure scanning, Ping all (Network Availability Monitoring) y Poll all (la extensión SNMP adecuada). Además, reglas de buenas prácticas recomiendan, por ejemplo, poner OneAgent al menos en Infrastructure Monitoring mode y configurar la extensión de base de datos adecuada si se detecta una base de datos en el host; si no sabes qué modo usar, puedes empezar por Foundation & Discovery para ver qué aplicaciones o infraestructura hay en el host y sus interdependencias. Detecta los huecos con datos de Smartscape, con el eBPF Discovery module (componente de OneAgent de bajo overhead que determina qué URLs se envían a un proceso, con qué frecuencia y si el origen es público) y con la extensión SNMP Autodiscovery, que escanea la red en busca de network devices SNMP.',
      ],
      comparison: {
        headers: ['App', 'Pregunta que responde', 'Fuente de datos clave'],
        rows: [
          ['Databases', '¿Qué instancia está degradada y qué statement la carga?', 'Extensiones de base de datos en ActiveGate'],
          [
            'Infrastructure & Operations',
            '¿Qué host, proceso o network device está degradado?',
            'OneAgent, integraciones cloud y Dynatrace Intelligence',
          ],
          [
            'Discovery & Coverage',
            '¿Qué hosts o tecnologías quedan sin monitorizar?',
            'Smartscape, eBPF Discovery module, SNMP Autodiscovery',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'Databases',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/databases',
          kind: 'official-docs',
        },
        {
          title: 'Infrastructure & Operations',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/infrastructure-and-operations',
          kind: 'official-docs',
        },
        { title: 'Discovery & Coverage', url: 'https://docs.dynatrace.com/docs/ingest-from/discovery-coverage-app', kind: 'official-docs' },
        {
          title: 'Foundation & Discovery (DPS)',
          url: 'https://docs.dynatrace.com/docs/license/capabilities/app-infra-observability/foundation-and-discovery',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-observability-troubleshooting',
      title: 'Árbol de troubleshooting de OneAgent',
      lead: 'Diagnostica por capas antes de concluir que falta soporte.',
      paragraphs: [
        'Cuando no ves una service o una métrica esperada, comienza por Deployment Status, versión y estado de conexión. Continúa con el modo de monitorización, auto-injection, proceso reiniciado, tecnología soportada y configuración de la capability. Si el dato debería venir de un ActiveGate o extensión, comprueba el grupo, endpoint, permisos y salud del gateway. Solo después revisa la UI, timeframe, management zone y query.',
        'Si el host aparece pero el servicio no, la causa puede estar en inyección, proceso no reiniciado, tecnología no soportada o reglas de process monitoring. Si el servicio aparece pero faltan logs, el problema está en descubrimiento, path, permisos de lectura de archivo, regla de ingestión, OpenPipeline, bucket o query. Si el problema solo afecta a un usuario, añade la capa de permisos y scope.',
        'En la capa de ingestión de logs con OneAgent: el log module de OneAgent está habilitado por defecto en todas las instalaciones, así que no hace falta Full-Stack ni un ActiveGate para leer archivos del host. OneAgent descubre automáticamente los archivos de log de los procesos monitorizados; si un archivo no se detecta, se añade como custom log source. Después, las log ingest rules deciden qué logs descubiertos y custom se ingieren: si ninguna regla incluye el archivo, no llega a Grail.',
      ],
      bullets: [
        'Conectividad y versión.',
        'Modo y capacidad habilitada.',
        'Proceso, reinicio e inyección.',
        'ActiveGate, extensión o integración.',
        'Ingestión, procesamiento y retención.',
        'Consulta, timeframe y permisos.',
      ],
      sourceRefs: [
        {
          title: 'Monitor Kubernetes events',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-monitoring/monitor-events-kubernetes',
          kind: 'official-docs',
        },
        {
          title: 'VMware vSphere monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/vmware-vsphere-monitoring',
          kind: 'official-docs',
        },
        {
          title: 'Cloud application and workload detection',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups/configuration/cloud-app-and-workload-detection',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Enumero las capacidades de OneAgent sin prometer soporte universal.',
    'Explico OneAgent frente a ActiveGate con un ejemplo de monitorización remota.',
    'Distingo host, process group, process group instance y service.',
    'Comparo Full-Stack, Infrastructure y Discovery con sus límites.',
    'Sé explicar auto-injection, code-module injection y por qué hace falta reiniciar.',
    'Sé usar Smartscape y Problems sin confundirlos con DQL.',
    'Puedo ordenar un diagnóstico de datos ausentes con evidencia.',
    'Sé consultar la support matrix antes de afirmar cobertura.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
