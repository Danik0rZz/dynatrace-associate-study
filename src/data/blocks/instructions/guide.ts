import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Instructions».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Este capítulo transforma el path y las reglas de preparación en un plan operativo. El formato publicado y los requisitos de terceros pueden cambiar, por lo que la aplicación los presenta como referencia fechada y te obliga a comprobarlos antes de reservar. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Separar recomendación, requisito y evidencia.',
    'Planificar una preparación basada en objetivos.',
    'Preparar documentación y entorno de práctica.',
    'Llegar al examen con una estrategia de tiempo y revisión.',
  ],
  sections: [
    {
      id: 'scope',
      title: 'Qué debe cubrir tu preparación',
      lead: 'La amplitud de Associate exige una base transversal.',
      paragraphs: [
        'El path recorre la plataforma, observabilidad, análisis, DQL, seguridad, automatización e ingestión. No necesitas convertirte en especialista profundo de cada producto, pero sí reconocer el propósito, el flujo de trabajo y los límites de cada capacidad.',
        'Una preparación completa alterna lectura, práctica y recuperación. Leer una página demuestra exposición; resolver un escenario demuestra aplicación; explicar un distractor demuestra precisión.',
      ],
      bullets: [
        'Define objetivos por módulo antes de abrir el banco.',
        'Practica tanto conceptos como decisiones operativas.',
        'Anota terminología original y sinónimos que puedan confundir.',
        'Revisa fuentes cuando una respuesta dependa de versión, permisos o coste.',
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
        { title: 'Dynatrace University', url: 'https://university.dynatrace.com/', kind: 'official-training' },
      ],
    },
    {
      id: 'readiness',
      title: 'Checklist de preparación',
      lead: 'Haz visibles los riesgos que no aparecen en una puntuación.',
      paragraphs: [
        'Comprueba que puedes navegar por la plataforma o Playground disponible, ejecutar consultas de ejemplo y leer documentación técnica sin perderte en la terminología. Si no tienes tenant, marca la práctica como no ejecutada; no conviertas una explicación teórica en una validación falsa.',
        'Prepara también el lado logístico: navegador, red, cámara, audio, identidad, zona horaria, reglas del proveedor y documentación permitida. Dynatrace University y el proveedor de proctoring son la autoridad para la reserva; esta aplicación solo organiza el estudio.',
      ],
      bullets: [
        'Conocimiento: definiciones y propósito.',
        'Aplicación: elección de herramienta o flujo.',
        'Diagnóstico: orden de comprobaciones.',
        'Logística: equipo, tiempo, identidad y reglas vigentes.',
        'Evidencia: fuente, fecha y variante.',
      ],
      sourceRefs: [
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'Dynatrace University', url: 'https://university.dynatrace.com/', kind: 'official-training' },
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
      ],
    },
    {
      id: 'source-literacy',
      title: 'Leer documentación técnica con precisión',
      lead: 'No todas las frases de una página tienen el mismo alcance.',
      paragraphs: [
        'Busca primero la variante: Latest Dynatrace o Classic, capability, app, versión, licencia y permisos. Después separa requisitos, comportamiento principal, límites, ejemplos y advertencias. Una frase de “overview” no sustituye una tabla de permisos ni un procedimiento de configuración.',
        'En esta app cada módulo muestra el enlace oficial junto a una explicación interna. Estudia la explicación sin salir, pero conserva el enlace para confirmar cambios y profundizar cuando el examen o tu entorno use otra variante.',
      ],
      bullets: [
        '¿Es una definición, un procedimiento o una limitación?',
        '¿Aplica a Latest, Classic o ambos?',
        '¿Requiere permiso de lectura, escritura o administración?',
        '¿Habla de datos completos, muestreados, agregados o con retención?',
      ],
      sourceRefs: [
        { title: 'Dynatrace University', url: 'https://university.dynatrace.com/', kind: 'official-training' },
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
        {
          title: 'Dynatrace UI getting started',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'exam-strategy',
      title: 'Estrategia de examen',
      lead: 'La precisión temporal es parte de la competencia.',
      paragraphs: [
        'Lee el enunciado antes de mirar las opciones y busca palabras de alcance: “mejor”, “primero”, “siempre”, “solo”, “todas”, “Latest” o “con permiso de escritura”. Muchos distractores son verdaderos en otro contexto pero fallan la condición exacta.',
        'En preguntas múltiples, comprueba cada opción de forma independiente. En escenarios, identifica la evidencia disponible y la siguiente comprobación de mayor valor. Marca dudas, avanza y regresa con una hipótesis; cambiar respuestas al azar no es una estrategia.',
      ],
      bullets: [
        'Elimina absolutismos no soportados.',
        'No conviertas “recomendado” en “obligatorio”.',
        'No asumas permisos que el escenario no concede.',
        'Si dos opciones parecen válidas, revisa el criterio “mejor siguiente paso”.',
      ],
      sourceRefs: [
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
        {
          title: 'Dynatrace UI getting started',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Associate Certification Learning Plan',
          url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
          kind: 'official-training',
        },
      ],
    },
    {
      id: 'deep-exam-readiness',
      title: 'Conectividad de red de OneAgent y ActiveGate',
      lead: 'Puertos, sentido de las conexiones y papel del ActiveGate: la base de red que el examen da por sabida.',
      paragraphs: [
        'El examen Associate asume conocimientos consolidados de infraestructura de red y arquitectura de software. La comunicación de OneAgent hacia Dynatrace es solo saliente (outbound) y Dynatrace nunca inicia comunicación con OneAgent, así que no hace falta abrir puertos de entrada en los hosts monitorizados. Sin ningún ActiveGate intermedio, OneAgent conecta directamente con el clúster SaaS por el puerto 443. Con un Environment ActiveGate, los OneAgents se conectan a él por el puerto 9999 y el ActiveGate sale hacia el clúster SaaS por el puerto 443. Si la red corporativa exige un proxy HTTP/HTTPS, OneAgent se configura con `--set-proxy` y ActiveGate en la sección `[http.client]` de `custom.properties`. Asimismo, debes comprender la resolución DNS, la terminación TLS y las arquitecturas de microservicios distribuidos que se ejecutan sobre plataformas de contenedores como Docker y Kubernetes (Nodes, Namespaces, Pods y Services).',
        'OneAgent informa de los datos recogidos mediante peticiones HTTP/S a los ActiveGates o al clúster de Dynatrace. Puede conectar directamente con el clúster o a través de uno o más ActiveGates, y es posible la conexión simultánea a través de varios ActiveGates. La regla de preferencia es clara: OneAgent se conecta a un Environment ActiveGate si existe uno, y solo conecta directamente con el clúster SaaS si no es posible ninguna conexión con un Environment ActiveGate.',
        'Entre las capacidades de routing del ActiveGate están el enrutado del tráfico de OneAgent hacia Dynatrace, el buffering y la compresión, y la monitorización de redes aisladas. Por eso, cuando cientos de hosts no tienen salida a internet, se despliega un Environment ActiveGate en un punto con salida (por ejemplo, la DMZ): los OneAgents solo necesitan alcanzar el ActiveGate por el 9999 y únicamente el ActiveGate sale a SaaS por 443. El ActiveGate no sustituye a OneAgent en los hosts ni guarda una copia local de Grail, y OneAgent no actúa como proxy de otros hosts.',
        'La documentación de capacidades define tres propósitos de ActiveGate: routing y monitorización (enrutar el tráfico de OneAgent, monitorizar entornos cloud o tecnologías remotas con extensions), ejecutar monitores synthetic desde una private location y el módulo zRemote para z/OS. Los módulos no se deben mezclar entre propósitos: esa reconfiguración no está soportada.',
        'Para diagnosticar un host que no aparece, separa capas de red. Si `curl` al endpoint del entorno falla con "Could not resolve host" pero una conexión TCP a la IP del endpoint por el puerto 443 se establece, la ruta y el puerto funcionan: el problema está en la resolución DNS del FQDN. Un tenant token incorrecto provocaría un rechazo después de conectar, y un firewall que bloquea el 443 impediría también la conexión por IP.',
      ],
      comparison: {
        headers: ['Área de Prerrequisito', 'Concepto Técnico Clave', 'Comportamiento en Examen'],
        rows: [
          [
            'Comunicaciones de Red',
            'Outbound-only: 443 hacia SaaS, 9999 hacia un Environment ActiveGate',
            'Los hosts monitorizados no necesitan puertos inbound; solo el Environment ActiveGate escucha en el 9999 para sus OneAgents.',
          ],
          [
            'Proxies y Gateways',
            'Proxy HTTP/HTTPS y Environment ActiveGate',
            'Permiten que hosts aislados sin internet directo alcancen el cluster Dynatrace.',
          ],
          [
            'Kubernetes Mapping',
            'Procesos del Pod = Process Group Instances (PGI)',
            'Los procesos de los contenedores se ven como PGI en el host que representa al Node.',
          ],
          [
            'Proctoring',
            'Requisitos del proveedor del examen',
            'Se comprueban en la fuente oficial del proveedor; no forman parte del temario técnico.',
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
        { title: 'Dynatrace University', url: 'https://university.dynatrace.com/', kind: 'official-training' },
      ],
      bullets: [
        'OneAgent → clúster SaaS (sin ActiveGate): salida TCP 443.',
        'OneAgent → Environment ActiveGate: el ActiveGate recibe conexiones en el puerto 9999.',
        'Environment ActiveGate → clúster SaaS: el ActiveGate abre la conexión de salida hacia el clúster, que recibe conexiones en el puerto 443.',
        'Propósitos de ActiveGate: routing y monitorización, synthetic desde private locations y zRemote; no se mezclan.',
      ],
    },
    {
      id: 'sup-proxy-config',
      title: 'Proxies: configurar OneAgent y ActiveGate',
      lead: 'El proxy se configura de forma distinta en cada componente, y casi todos los errores vienen de la sintaxis o de olvidar el reinicio.',
      paragraphs: [
        'En OneAgent, el proxy se define con `--set-proxy`, tanto en el instalador como después con la herramienta oneagentctl. El formato es `host:puerto` y, si el proxy exige autenticación, `username:password@host:puerto`, con el usuario y la contraseña URL-encoded. Así, una contraseña `P@ss:2026` debe escribirse `P%40ss%3A2026`: sin codificar, la "@" y los ":" de la contraseña se confunden con los separadores. Para que OneAgent deje de usar el proxy se ejecuta `--set-proxy=` con el valor vacío.',
        'oneagentctl está en `<INSTALL_PATH>/agent/tools`, por defecto `/opt/dynatrace/oneagent/agent/tools` en Linux, y requiere privilegios de root (administrador en Windows). Después de usar parámetros set hay que reiniciar el servicio de OneAgent para aplicar los cambios, por ejemplo añadiendo `--restart-service`. `--get-proxy` muestra el valor guardado, pero el agente no lo usa hasta el reinicio. `--set-server` cambia el endpoint de comunicación de Dynatrace, no el proxy, y `--set-host-property` solo añade metadatos al host.',
        'En un ActiveGate, el proxy se configura en `custom.properties`, sección `[http.client]`, con `proxy-server`, `proxy-port`, `proxy-user` y `proxy-password`; si se omite `proxy-port`, el valor por defecto es 8080. Hay que reiniciar el servicio principal del ActiveGate y, al hacerlo, la contraseña en claro se cifra y se guarda en la propiedad `proxy-password-encr`. Así, si un Environment ActiveGate de la DMZ solo puede salir a internet por un proxy corporativo, el proxy se configura en el `custom.properties` del ActiveGate: los OneAgents internos siguen conectándose al ActiveGate por el puerto 9999 y no necesitan `--set-proxy`.',
        'Un HTTP 407 (Proxy Authentication Required) lo devuelve el propio proxy cuando la petición no trae credenciales válidas; se corrige revisando las credenciales de `--set-proxy`. Es distinto de un 401/403 del destino, de un 503 por indisponibilidad o de un fallo del handshake TLS, que ocurre antes de que haya código HTTP.',
      ],
      code: '# Linux, como root\ncd /opt/dynatrace/oneagent/agent/tools\n./oneagentctl --set-proxy=svc_dt:P%40ss%3A2026@proxy.corp:8080 --restart-service\n./oneagentctl --get-proxy\n./oneagentctl --set-proxy= --restart-service   # quitar el proxy\n\n# ActiveGate: custom.properties\n[http.client]\nproxy-server=proxy.corp\nproxy-port=8080\nproxy-user=username\nproxy-password=password',
      codeNote: 'OneAgent usa oneagentctl; ActiveGate usa custom.properties. En ambos casos el cambio se aplica al reiniciar el servicio.',
      comparison: {
        headers: ['Componente', 'Dónde se configura el proxy', 'Para aplicarlo'],
        rows: [
          ['OneAgent', '`--set-proxy` en el instalador u oneagentctl', 'Reiniciar el servicio de OneAgent (`--restart-service`)'],
          ['ActiveGate', '`custom.properties`, sección `[http.client]`', 'Reiniciar el servicio principal del ActiveGate'],
        ],
      },
      sourceRefs: [
        {
          title: 'How to pass a proxy address during OneAgent installation on Linux',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/installation-and-operation/linux/installation/how-to-pass-a-proxy-address-during-oneagent-installation-on-linux',
          kind: 'official-docs',
        },
        {
          title: 'OneAgent configuration via command-line interface',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-configuration-via-command-line-interface',
          kind: 'official-docs',
        },
        {
          title: 'Set up proxy authentication for ActiveGate',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate/configuration/set-up-proxy-authentication-for-activegate',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-tls-trust',
      title: 'Certificados propios: proxies con inspección TLS y PKI interna',
      lead: 'Cada componente confía en certificados adicionales mediante su propio fichero: no son intercambiables.',
      paragraphs: [
        'OneAgent incluye los certificados de Dynatrace para verificar el servidor o el ActiveGate. Si un Environment ActiveGate usa un certificado propio, sus CA se guardan como `custom.pem`; si el entorno usa un proxy con certificado propio (por ejemplo, un proxy con inspección TLS firmado por una CA interna), se guardan como `custom-proxy.pem`. Si existen ambos casos, hay que proporcionar los dos ficheros. En Linux, el directorio customkeys de OneAgent es `/var/lib/dynatrace/oneagent/agent/customkeys`; en Windows, `%PROGRAMDATA%\\dynatrace\\oneagent\\agent\\customkeys`.',
        'Un matiz importante: OneAgent solo lee `custom-proxy.pem` si se ha configurado explícitamente para usar un proxy. Con un proxy transparente y sin `--set-proxy`, el fichero se ignora y no actúa como almacén general de CA. El modo FIPS no sirve para relajar la validación de certificados.',
        'El ActiveGate tiene su propio mecanismo. Cuando su log indica que un certificado no es de confianza, por ejemplo porque un proxy que intercepta SSL usa una CA interna, se configura `trustedstore` (con `trustedstore-password` y `trustedstore-type`) en la sección `[collector]` de `custom.properties`, se coloca el keystore en el directorio SSL del ActiveGate (`/var/lib/dynatrace/gateway/ssl` en Linux) y se reinicia el servicio principal. Los ficheros de OneAgent no afectan a las conexiones del propio ActiveGate.',
      ],
      comparison: {
        headers: ['Caso', 'Qué se configura', 'Dónde'],
        rows: [
          ['OneAgent → Environment ActiveGate con certificado propio', '`custom.pem`', 'customkeys de OneAgent'],
          ['OneAgent → proxy con certificado propio', '`custom-proxy.pem` (solo con proxy configurado)', 'customkeys de OneAgent'],
          [
            'ActiveGate → servidor o proxy con CA interna',
            '`trustedstore` en `[collector]`',
            '`custom.properties` y keystore en el directorio SSL',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'OneAgent security',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-oneagent/oneagent-security',
          kind: 'official-docs',
        },
        {
          title: 'Configure trusted root certificates on ActiveGate',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate/configuration/configure-trusted-root-certificates-on-activegate',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-network-zones',
      title: 'Network zones y ActiveGate groups',
      lead: 'Las network zones deciden a qué ActiveGates se conecta cada OneAgent; las ActiveGate groups sirven para acciones en bloque.',
      paragraphs: [
        'Las network zones ayudan a enrutar el tráfico de forma eficiente, evitando tráfico innecesario entre centros de datos y regiones de red. Un OneAgent se asigna a una zona con `oneagentctl --set-network-zone=<your.network.zone>` (y reinicio del servicio). Los nombres no distinguen mayúsculas y minúsculas (Dynatrace los guarda en minúsculas), admiten caracteres alfanuméricos, guiones y guiones bajos, usan el punto como separador (sin empezar por punto) y tienen un máximo de 256 caracteres. El patrón recomendado es `provider.region.availability-zone.datacenter.tier`.',
        'OneAgent agrupa los ActiveGates en cuatro grupos de prioridad: grupo 1, ActiveGates de la misma network zone; grupo 2, de la zona alternativa; grupo 3, de la zona default; grupo 4, todos los demás. Los OneAgents se reparten entre los ActiveGates con el índice más bajo posible, prueban el siguiente si uno no responde, y comprueban periódicamente en segundo plano si vuelven a estar disponibles ActiveGates con un índice menor, para regresar a ellos. Los OneAgents sin network zone configurada funcionan como si las zonas no existieran y se conectan a cualquier Environment ActiveGate que responda, en orden aleatorio.',
        'La fallback mode decide qué ocurre cuando no hay ActiveGates disponibles en la zona propia ni en la alternativa: "Any ActiveGate" (por defecto) permite usar cualquier ActiveGate; "Only default zone" solo permite la zona default; "None" mantiene el aislamiento de zona, sin salto a otras zonas, y si los ActiveGates de la zona y de la alternativa fallan, los datos se descartan. Por eso, para requisitos de residencia de datos se usa "None" con una zona alternativa de la misma región.',
        'Las ActiveGate groups son otra cosa: permiten acciones en bloque sobre ActiveGates, como gestionar las extensions que se ejecutan en ellos o conectar foundations de Cloud Foundry. Un ActiveGate pertenece a una sola group (por defecto, `default`) y se asigna con `--set-group` al instalar o, después, con la propiedad `group` de la sección `[collector]` de `custom.properties`. Las extensions remotas necesitan un ActiveGate en una group, porque Dynatrace usa la group para indicar dónde debe ejecutarse la extension. Las groups no enrutan OneAgents ni definen su fallback.',
      ],
      bullets: [
        'Reparto y failover de OneAgent entre varios ActiveGates de un centro de datos: misma network zone para ActiveGates y OneAgents.',
        'Organización multirregión: un único entorno, ActiveGates en cada ubicación y network zones por ubicación.',
        'Un único ActiveGate central para todas las regiones añade latencia y es un punto único de fallo.',
        'Extensions remotas: se ejecutan en una ActiveGate group, no en una network zone.',
      ],
      comparison: {
        headers: ['Fallback mode', 'ActiveGates que puede usar el OneAgent', 'Uso típico'],
        rows: [
          ['Any ActiveGate (por defecto)', 'Zona propia → alternativa → default → resto', 'Máxima disponibilidad'],
          ['Only default zone', 'Zona propia → alternativa → default', 'Limitar el salto a la zona default'],
          ['None', 'Zona propia → alternativa; si fallan, se descartan los datos', 'Aislamiento estricto (residencia de datos)'],
        ],
      },
      sourceRefs: [
        {
          title: 'Network zones: basic information',
          url: 'https://docs.dynatrace.com/docs/manage/network-zones/network-zones-basic-info',
          kind: 'official-docs',
        },
        {
          title: 'Network zones: OneAgent connectivity',
          url: 'https://docs.dynatrace.com/docs/manage/network-zones/oneagent-connectivity',
          kind: 'official-docs',
        },
        {
          title: 'ActiveGate group',
          url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate/activegate-group',
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
      id: 'deep-official-scope',
      title: 'Qué es fuente de examen y qué es ampliación',
      lead: 'El path marca el alcance; la documentación vigente aporta la profundidad operativa.',
      paragraphs: [
        'El Learning Plan actual publica el Study Guide, el Exam Preparation Guide y las Practice Simulations como recursos de preparación. El PDF del path proporciona los doce apartados y sus objetivos. Dynatrace Docs es la autoridad para conceptos, procedimientos, permisos, límites y cambios de producto; una página de comunidad puede ayudar a localizar el path, pero no debe utilizarse para justificar un hecho técnico si existe una fuente oficial de producto.',
        'La guía interna traduce el contenido al español y conserva en inglés nombres de aplicaciones, permisos, entidades, campos y comandos. “Traducido” significa explicado con claridad, no sustituir `Process Group`, `Business Event`, `ActiveGate`, `Grail` o `timeseries` por palabras que ya no coincidan con la UI o la documentación.',
      ],
      comparison: {
        headers: ['Capa', 'Pregunta que responde', 'Cómo estudiarla'],
        rows: [
          ['Path', '¿Qué dominios entran?', 'Usarlo como índice y alcance'],
          ['Concepts', '¿Qué significa el producto?', 'Construir modelo mental'],
          ['How-to', '¿Cómo se habilita o usa?', 'Practicar pasos y prerequisitos'],
          ['Reference', '¿Qué campos, comandos o límites existen?', 'Memorizar matices verificables'],
        ],
      },
      sourceRefs: [
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'Dynatrace University', url: 'https://university.dynatrace.com/', kind: 'official-training' },
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-prerequisite-map',
      title: 'Prerrequisitos técnicos que debes activar',
      lead: 'El examen presupone que entiendes el entorno donde viven las capacidades.',
      paragraphs: [
        'El path menciona SOA, application servers, arquitecturas web y móviles, bases de datos, redes, procesos, sistemas operativos y tecnologías cloud como Azure, Docker, Kubernetes, Cloud Foundry u OpenStack. No necesitas convertirte en administrador de cada tecnología, pero sí saber qué capa representa un host, un proceso, un service, un contenedor, una base de datos o un ActiveGate.',
        'Si una pregunta habla de una integración remota, tradúcela mentalmente a conectividad, credenciales, componente intermediario, permisos, datos producidos y consulta. Si habla de una aplicación distribuida, piensa en frontend, requests, services, procesos, dependencias y storage. Esta base evita elegir una respuesta de UI cuando el problema real pertenece a la arquitectura.',
      ],
      bullets: [
        'Repasa HTTP, TLS, DNS, proxies y comunicación outbound.',
        'Repasa proceso, process group, host, container y service.',
        'Repasa bases de datos, colas y dependencias remotas.',
        'Repasa JSON, timestamps, métricas, logs, traces y sampling.',
      ],
      sourceRefs: [
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
        {
          title: 'Dynatrace UI getting started',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Associate Certification Learning Plan',
          url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
          kind: 'official-training',
        },
      ],
    },
    {
      id: 'sup-processes-services',
      title: 'Procesos, process groups y services',
      lead: 'Entender cómo agrupa Dynatrace los procesos explica por qué aparecen o se duplican los services.',
      paragraphs: [
        'Un process group es un clúster lógico de procesos que pertenecen a la misma aplicación o unidad de despliegue y cumplen la misma función en varios hosts. Cada proceso concreto se ve como process group instance (PGI) en el host donde se ejecuta; en Kubernetes con OneAgent full-stack, los procesos de los contenedores de un Pod aparecen como PGI en el host que representa al Node, y el Pod no se convierte en un host propio. Los services se detectan a partir de los process groups: un process group puede alojar varios services.',
        'La detección de process groups usa propiedades de cada tecnología. Para Tomcat, Dynatrace usa `CATALINA_HOME` y `CATALINA_BASE` para distinguir clústeres Tomcat distintos. Cuando Dynatrace detecta el "mismo" service en process groups separados, los trata como services separados (por ejemplo, staging y producción), así que dos bases distintas producen dos services con el mismo nombre.',
        'La monitorización profunda (deep monitoring) de los process groups detectados empieza después de reiniciar todos los procesos que ya se estaban ejecutando durante la instalación de OneAgent. Si ves métricas del host y del proceso pero ningún service ni trace de una aplicación que ya corría, el siguiente paso es reiniciar ese proceso para que reciba el code module.',
      ],
      bullets: [
        'Un process group es un clúster lógico de procesos con la misma función en varios hosts, y el mismo service en process groups distintos cuenta como services separados.',
        'PGI: el process group en un host concreto.',
        'Service: se detecta dentro de un process group, que puede alojar varios services.',
      ],
      sourceRefs: [
        {
          title: 'Process groups',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups',
          kind: 'official-docs',
        },
        {
          title: 'Process deep monitoring',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/process-groups/configuration/pg-monitoring',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-k8s-operator',
      title: 'Kubernetes y Dynatrace Operator',
      lead: 'Antes de leer la app Kubernetes, sitúa cada objeto y cada componente del Operator.',
      paragraphs: [
        'La organización lógica de Kubernetes es Cluster → Namespace → Workload → Pod → Container. El Namespace es una partición lógica de todo el clúster para aislar recursos y equipos, así que los Pods de un mismo Namespace pueden ejecutarse en Nodes distintos. Los Workloads (Deployment, DaemonSet, StatefulSet…) viven en un Namespace y gestionan Pods. El Node es la máquina, física o virtual, en la que el scheduler coloca los Pods. Un Deployment mantiene un número de réplicas, mientras que un DaemonSet ejecuta una copia de un Pod en cada Node elegible, también en los que se añaden después. En Grail, el Semantic Dictionary define campos como `k8s.cluster.name`, `k8s.namespace.name`, `k8s.workload.name`, `k8s.pod.name`, `k8s.container.name` y `k8s.node.name` para segmentar la telemetría.',
        'Dynatrace Operator gestiona el rollout automatizado, la configuración y el ciclo de vida de los componentes de Dynatrace a partir de custom resources (DynaKube y EdgeConnect). En un despliegue cloudNativeFullStack, OneAgent se ejecuta como DaemonSet y recoge las métricas de los Nodes; el ActiveGate enruta los datos de observabilidad hacia el clúster de Dynatrace y monitoriza la API de Kubernetes; el webhook (por defecto, 2 réplicas por clúster) valida los DynaKube y muta los Pods al crearse, añadiendo un init container que configura los code modules, sin reconstruir las imágenes; y el CSI driver, desplegado como DaemonSet con una réplica por Node, proporciona los code modules descargándolos una vez por Node en lugar de una vez por Pod, lo que reduce almacenamiento y carga.',
        'La inyección ocurre al crear el Pod: los Pods que ya estaban en ejecución antes del despliegue no pasaron por el webhook y hay que reiniciar esos workloads (por ejemplo, con un rollout restart). Para excluir un Pod concreto se usa la anotación `dynatrace.com/inject: "false"` (ponerla a "true" no tiene efecto; solo sirve para excluir). Para limitar la inyección a ciertos namespaces se usa `namespaceSelector` en el DynaKube, con `matchLabels` para incluir namespaces etiquetados o `matchExpressions` con `NotIn` para excluirlos.',
        'La guía del Operator crea el Secret de tokens en el namespace `dynatrace` con `kubectl -n dynatrace create secret generic dynakube --from-literal="apiToken=<OPERATOR_TOKEN>" --from-literal="dataIngestToken=<DATA_INGEST_TOKEN>"`. La URL del entorno no va en el Secret, sino en `spec.apiUrl` del DynaKube.',
      ],
      bullets: [
        'Operator: rollout, configuración y ciclo de vida a partir de DynaKube.',
        'Webhook: muta los Pods al crearse (init container de code modules).',
        'CSI driver: DaemonSet, una réplica por Node, code modules compartidos.',
        'OneAgent: DaemonSet, métricas de los Nodes.',
        'ActiveGate: enruta datos y monitoriza la API de Kubernetes.',
      ],
      sourceRefs: [
        {
          title: 'Dynatrace Operator',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/components/dynatrace-operator',
          kind: 'official-docs',
        },
        {
          title: 'Full-stack observability (Kubernetes)',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/how-it-works/cloud-native-fullstack',
          kind: 'official-docs',
        },
        {
          title: 'Configure monitoring for namespaces and pods',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/guides/deployment-and-configuration/monitoring-and-instrumentation/annotate',
          kind: 'official-docs',
        },
        {
          title: 'Migrate from classic full-stack to cloud-native full-stack mode',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/guides/migration/classic-to-cloud-native',
          kind: 'official-docs',
        },
        {
          title: 'Migrate Dynatrace Operator to a new environment',
          url: 'https://docs.dynatrace.com/docs/ingest-from/setup-on-k8s/guides/operation/migrate-dto-to-tenant',
          kind: 'official-docs',
        },
        { title: 'Semantic Dictionary: fields', url: 'https://docs.dynatrace.com/docs/semantic-dictionary/fields', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-k8s-health',
      title: 'Estados de Kubernetes y alertas de Dynatrace',
      lead: 'Cada estado de un Pod tiene una causa distinta y Dynatrace lo refleja con una alerta integrada concreta.',
      paragraphs: [
        'La app Kubernetes distingue health alerts, para situaciones críticas que desencadenan una investigación de Problems, y warning signals, que informan de un posible problema en situaciones no críticas. Entre las alertas integradas de workloads están "Detect container restarts", "Detect pods stuck in pending" (Pods pendientes 10 minutos o más), "Detect workloads with non-ready pods", "Detect high CPU throttling", "Detect out-of-memory kills" y "Detect pod backoff events" (Pods en CrashLoopBackOff o ImagePullBackOff).',
        'Memoria y CPU se limitan de forma distinta. Si un contenedor supera su memory limit, se termina: en la pestaña Events verás `OOMKilled` seguido de `Created` y `Started`, porque el contenedor superó su memory limit, `kubelet` lo terminó y Kubernetes lo recreó automáticamente. Si un contenedor alcanza su CPU limit, no se termina: se limita (throttling) y responde más lento, lo que refleja "Detect high CPU throttling". Kubernetes no quita memoria a otros Pods y el scheduler no migra Pods en ejecución.',
        'Un Pod en Pending con el evento `FailedScheduling: ... Insufficient memory` no ha arrancado: el scheduler no encuentra un Node con memoria asignable suficiente para los requests del Pod. `CrashLoopBackOff` significa que el contenedor arranca, falla y Kubernetes lo reinicia con esperas crecientes; la causa está en los logs del contenedor y en los eventos del Pod. Un fallo al descargar la imagen da `ErrImagePull`/`ImagePullBackOff`.',
        'Los probes también se distinguen por su efecto. Si falla el Liveness probe, kubelet reinicia el contenedor. Si falla el Readiness probe, el Pod deja de estar listo y se retira de los endpoints del Service, sin reiniciarse. El Startup probe solo actúa durante el arranque. Por eso un workload con Pods no listos y sin reinicios apunta al Readiness probe.',
      ],
      comparison: {
        headers: ['Síntoma', 'Causa', 'Alerta integrada'],
        rows: [
          ['`OOMKilled` y reinicio del contenedor', 'Supera el memory limit', 'Detect out-of-memory kills'],
          ['Contenedor lento, sin reinicios', 'Alcanza el CPU limit (throttling)', 'Detect high CPU throttling'],
          ['Pod en Pending (`FailedScheduling`)', 'Ningún Node tiene recursos para sus requests', 'Detect pods stuck in pending'],
          ['`CrashLoopBackOff` / `ImagePullBackOff`', 'Falla en bucle / no descarga la imagen', 'Detect pod backoff events'],
          ['Pods no listos, sin reinicios', 'Falla el Readiness probe', 'Detect workloads with non-ready pods'],
        ],
      },
      sourceRefs: [
        {
          title: 'Kubernetes app',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-app',
          kind: 'official-docs',
        },
        {
          title: 'Kubernetes alerting',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app/reference/kubernetes-alerting',
          kind: 'official-docs',
        },
        {
          title: 'Troubleshoot common health problems of Kubernetes workloads',
          url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/kubernetes-app/use-cases/troubleshoot-health-problems',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-http-web',
      title: 'HTTP en Dynatrace: failure detection, IP del cliente y campos de spans',
      lead: 'Los códigos HTTP y las cabeceras de proxy importan porque Dynatrace los usa para decidir qué es un fallo y quién es el usuario.',
      paragraphs: [
        'Los códigos 5xx son errores del lado servidor (502 Bad Gateway y 503 Service Unavailable suelen venir de un balanceador o gateway que no obtiene respuesta válida del backend); los 4xx indican que el servidor rechaza una petición inválida o no autorizada del cliente (404, 403); los 3xx son redirecciones. La failure detection por defecto interpreta los códigos HTTP 500-599 como errores en el lado servidor y 400-599 como errores en el lado cliente (Service Detection v1); en Service Detection v2, el rango por defecto que hace fallar un span es 500-599.',
        'Con componentes no instrumentados como balanceadores, CDN o proxies, la IP remota que ve Dynatrace no es la del usuario. Dynatrace revisa ciertas cabeceras HTTP para obtener la IP de origen (los proxies suelen usar `X-Forwarded-For`), y, en RUM Classic, en Settings > Web and mobile monitoring > IP determination puedes ver esa lista y crear una custom client IP header. Si todas las sesiones de RUM muestran la misma IP y ubicación, identifica la cabecera en la que el balanceador pasa la IP original y configúrala ahí.',
        'En Grail, el modelo de spans define `http.request.method` (GET, POST…) y `http.response.status_code` (por ejemplo, 200 o 503). `span.status_code` es otro campo: solo admite `ok` o `error` y resume si hubo un error de procesamiento.',
      ],
      bullets: [
        'Failure detection por defecto, lado servidor: 500-599.',
        'IP determination (RUM Classic): custom client IP header cuando un balanceador oculta la IP del usuario.',
        'Código HTTP de un span: `http.response.status_code`.',
      ],
      sourceRefs: [
        {
          title: 'Configure service failure detection',
          url: 'https://docs.dynatrace.com/docs/observe/application-observability/services/service-detection/service-detection-v1/configure-service-failure-detection',
          kind: 'official-docs',
        },
        {
          title: 'Customize failure detection in Service Detection v2',
          url: 'https://docs.dynatrace.com/docs/observe/application-observability/services/service-detection/service-detection-v2/failure-detection-v2',
          kind: 'official-docs',
        },
        {
          title: 'Customize IP address detection for web applications',
          url: 'https://docs.dynatrace.com/docs/observe/digital-experience/web-applications/additional-configuration/customize-ip-address-detection-web',
          kind: 'official-docs',
        },
        {
          title: 'Semantic Dictionary: traces',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/trace',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-traces',
      title: 'Traces y spans en el Semantic Dictionary',
      lead: 'Un trace descompone una petición; sus campos permiten reconstruirla y unirla con logs.',
      paragraphs: [
        'Un trace descompone una petición en spans con su `duration` y su relación padre-hijo, lo que permite ver qué llamada downstream consume el tiempo de una petición concreta. Las métricas muestran la tendencia agregada, pero no el desglose de una petición; los logs y los eventos aportan contexto. `trace.id` es un identificador de 16 bytes codificado en hexadecimal; `span.id` y `span.parent_id` son identificadores de 8 bytes en hexadecimal. `span.parent_id` contiene el `span.id` del span padre, y así se reconstruye el árbol de llamadas dentro del trace.',
        '`duration` es la diferencia entre `start_time` y `end_time` en nanosegundos; ambos son tiempos UNIX epoch en nanosegundos. `span.kind` distingue el contexto: una llamada síncrona saliente es un span `client` en quien llama y la misma petición es un span `server` en quien la recibe; `producer` y `consumer` corresponden a mensajería, e `internal` a operaciones sin comunicación remota.',
        'Para correlacionar spans con logs, recuerda que cambian los nombres: el modelo de spans usa `trace.id` y `span.id`, mientras que el modelo de logs define `trace_id` y `span_id`.',
      ],
      sourceRefs: [
        {
          title: 'Semantic Dictionary: traces',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/trace',
          kind: 'official-docs',
        },
        { title: 'Semantic Dictionary: logs', url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/log', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-ingest-formats',
      title: 'Timestamps, métricas y logs JSON en la ingesta',
      lead: 'Cada vía de ingesta tiene su unidad de tiempo, sus formatos y sus reglas de saneamiento.',
      paragraphs: [
        'En Grail, el campo `timestamp` es el momento (UNIX epoch en nanosegundos) en que se originó el evento. El metric ingestion protocol, en cambio, espera el timestamp en milisegundos UTC y acepta valores entre 1 hora en el pasado y 10 minutos en el futuro; si se omite, usa la hora actual del servidor. Un valor en segundos, leído como milisegundos, cae en enero de 1970 y queda fuera de rango.',
        'En ese protocolo, un gauge se envía con un único valor o pre-agregado como `gauge,min=…,max=…,sum=…,count=…`; un contador se envía como `count,delta=…`. En métricas Classic, una metric key solo puede referirse a un tipo de payload, así que la metric key de un contador recibe automáticamente el sufijo `.count` salvo que ya termine en `.count` (y un gauge cuya clave termina en `.count` recibe `.gauge`); las métricas en Grail no aplican los sufijos `.count` ni `.gauge`. Las claves de dimensión admiten letras minúsculas, números, guiones, puntos, dos puntos y guiones bajos.',
        'La Log ingestion API acepta timestamps en Unix epoch en UTC, RFC3339 y RFC3164. Si el registro no tiene una clave de timestamp admitida, se usa la hora actual. Si el formato no es compatible, se usa la hora actual y el valor original se mueve al atributo `unparsed_timestamp`. Los timestamps más de 10 minutos en el futuro se sustituyen por la hora actual. El contenido se busca en este orden: `content`, `message`, `payload`, `body`, `log`. El nivel se detecta, sin distinguir mayúsculas, de `loglevel`, `status`, `severity`, `level` o `syslog.severity`, y es NONE si no hay ninguna.',
        'En el registro almacenado, `loglevel` conserva el nivel original, mientras que `status` es la importancia global derivada del nivel de log y solo admite INFO, WARN, ERROR y NONE. Si el `content` es JSON, en DQL `parse content, "JSON:payload"` crea un record `payload` y `fieldsFlatten payload` extrae los campos de ese record anidado a campos de primer nivel; crear una fila por cada elemento de un array es lo que hace `expand`.',
      ],
      bullets: [
        'Timestamp en Grail: UNIX epoch en nanosegundos.',
        'Timestamp en el metric ingestion protocol: milisegundos UTC; en la Log ingestion API: Unix epoch en UTC, RFC3339 o RFC3164.',
        'Logs sin timestamp, con formato no compatible o más de 10 minutos en el futuro: hora actual.',
      ],
      code: 'cpu.temperature,hostname=hosta 55 1790812800000\nnew_user_count,region=east count,delta=50\nlatency,service=checkout gauge,min=1,max=9,sum=20,count=4\n\nfetch logs\n| parse content, "JSON:payload"\n| fieldsFlatten payload',
      codeNote: 'Líneas del metric ingestion protocol (timestamp en milisegundos UTC; la segunda, como métrica Classic, queda como `new_user_count.count`; en Grail, como `new_user_count`) y una consulta DQL que convierte el JSON de `content` en campos.',
      sourceRefs: [
        { title: 'Semantic Dictionary: fields', url: 'https://docs.dynatrace.com/docs/semantic-dictionary/fields', kind: 'official-docs' },
        {
          title: 'Metric ingestion protocol',
          url: 'https://docs.dynatrace.com/docs/ingest-from/extend-dynatrace/extend-metrics/reference/metric-ingestion-protocol',
          kind: 'official-docs',
        },
        {
          title: 'Ingest JSON and TXT logs',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-log-ingestion/lma-log-ingestion-via-api/lma-ingest-json-txt-logs',
          kind: 'official-docs',
        },
        { title: 'Semantic Dictionary: logs', url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/log', kind: 'official-docs' },
        {
          title: 'DQL structuring commands',
          url: 'https://docs.dynatrace.com/docs/platform/grail/dynatrace-query-language/commands/structuring-commands',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-otlp',
      title: 'OpenTelemetry (OTLP) hacia Dynatrace',
      lead: 'El endpoint OTLP de Dynatrace tiene restricciones de protocolo y una URL distinta si pasa por ActiveGate.',
      paragraphs: [
        'El endpoint OTLP de Dynatrace no admite gRPC: las llamadas deben usar HTTP con codificación binaria de Protocol Buffers (`http/protobuf`), y JSON no se admite. Si una aplicación solo exporta OTLP/gRPC, un OTel Collector puede convertir las peticiones a HTTP.',
        'La URL base de SaaS es `https://{your-environment-id}.live.dynatrace.com/api/v2/otlp`. A través de un Environment ActiveGate es `https://{your-activegate-domain}:9999/e/{your-environment-id}/api/v2/otlp`: puerto 9999 y prefijo `/e/{env-id}`. Cada señal añade su sufijo: `/v1/traces`, `/v1/metrics` o `/v1/logs`.',
        'Con un classic access token, los scopes son `openTelemetryTrace.ingest` (trazas), `metrics.ingest` (métricas) y `logs.ingest` (logs). Con un platform token, los permisos son `openpipeline:traces:ingest`, `openpipeline:metrics:ingest` y `openpipeline:logs:ingest`.',
      ],
      comparison: {
        headers: ['Destino', 'URL base OTLP'],
        rows: [
          ['Dynatrace SaaS', '`https://{env-id}.live.dynatrace.com/api/v2/otlp`'],
          ['Environment ActiveGate', '`https://{activegate}:9999/e/{env-id}/api/v2/otlp`'],
        ],
      },
      sourceRefs: [
        {
          title: 'Export with OTLP',
          url: 'https://docs.dynatrace.com/docs/ingest-from/opentelemetry/getting-started/otlp-export',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-study-routine',
      title: 'Rutina de estudio comprobable',
      lead: 'La app debe ayudarte a cerrar cada objetivo con evidencia de aprendizaje.',
      paragraphs: [
        'Una sesión eficaz comienza con la lectura del capítulo y sus fuentes internas. Después cierra la documentación y escribe de memoria las diferencias importantes. Resuelve ocho preguntas del quiz rápido; si fallas una pregunta de precisión, vuelve a la fila de hechos y al bloque fuente antes de intentar otra vez. Cuando consigas una base estable, completa el banco y termina con una práctica que obligue a explicar el razonamiento.',
        'Usa la confianza como una señal separada de la corrección. Un acierto con confianza baja merece revisión; un fallo con confianza alta revela una falsa seguridad y debe tener prioridad. La aplicación conserva el intento, la respuesta elegida, la explicación del distractor, la fuente y el capítulo relacionado para que el repaso no sea una lista anónima de letras.',
      ],
      bullets: [
        'Lectura profunda: 30–60 minutos según módulo.',
        'Recuperación libre: explicar sin mirar y comparar términos.',
        'Quiz rápido: detectar huecos iniciales.',
        'Banco: practicar precisión y escenarios.',
        'Repaso: corregir la causa del error, no solo repetir la opción.',
      ],
      sourceRefs: [
        {
          title: 'Associate Certification Learning Path 2025',
          url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
          kind: 'official-training',
        },
        { title: 'Dynatrace University', url: 'https://university.dynatrace.com/', kind: 'official-training' },
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-question-reading',
      title: 'Lectura adversarial del enunciado y tácticas de búsqueda',
      lead: 'La precisión comienza antes de leer las opciones y al buscar en la documentación.',
      paragraphs: [
        'Subraya mentalmente el sujeto, la acción, la condición y el resultado pedido. “¿Qué permite?” no es lo mismo que “¿qué garantiza?”; “¿cuál es el primer paso?” no es lo mismo que “¿qué solución final?”; “Latest Dynatrace” no es lo mismo que Classic. Las palabras `only`, `always`, `best`, `first`, `read`, `write`, `actor`, `retention` y `injection` suelen cambiar el criterio.',
        'En la parte práctica del examen (10-15 preguntas), la única que el Learning Path oficial declara open book, la búsqueda en la documentación oficial debe ser precisa: busca nombres de permisos exactos (`app-engine:apps:install`, `storage:bucket-definitions:write`), tablas de Grail (`dt.system.buckets`, `dt.entity.host`) o cláusulas DQL (`timeseries`, `summarize`). Comprueba siempre el banner superior de la documentación para verificar si el artículo aplica a Dynatrace Latest o Classic.',
        'Conviene saber qué concede cada uno de esos nombres. `app-engine:apps:install` permite instalar y actualizar apps (Hub lo exige para instalarlas); `app-engine:apps:run` permite listar y ejecutar las apps ya instaladas y `app-engine:apps:delete`, desinstalarlas. `storage:bucket-definitions:write` permite escribir definiciones de bucket en Grail, es decir, crear o modificar buckets personalizados (`storage:bucket-definitions:read` solo las lee), mientras que `storage:buckets:read` autoriza a leer los registros guardados en los buckets, además del permiso de la tabla.',
        'Con las tablas pasa lo mismo: `fetch dt.system.buckets` devuelve la lista de todos los buckets del entorno (default, internos y definidos por el usuario) con su tabla asociada y su retención; `fetch dt.entity.host` devuelve las entidades host (por defecto, su ID y su nombre) y, como toda consulta de entidades, exige `storage:entities:read`. `timeseries` es el comando de inicio para métricas, no para tablas de entidades.',
      ],
      bullets: [
        'Identifica la variante y la capability.',
        'Distingue recomendación, requisito y límite.',
        'Comprueba si la respuesta requiere lectura, escritura o administración.',
        'Descarta absolutos no respaldados por documentación.',
      ],
      sourceRefs: [
        { title: 'Dynatrace documentation', url: 'https://docs.dynatrace.com/', kind: 'official-docs' },
        {
          title: 'Dynatrace UI getting started',
          url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace Associate Certification Learning Plan',
          url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
          kind: 'official-training',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Distingo requisitos de preparación, recomendaciones y datos por verificar.',
    'Puedo explicar cómo estudiar sin tenant usando teoría y prácticas manuales.',
    'Sé detectar una afirmación dependiente de versión o permisos.',
    'Tengo una estrategia de tiempo, marcadores y revisión.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
