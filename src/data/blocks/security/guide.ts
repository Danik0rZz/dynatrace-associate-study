import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Security».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'Security exige precisión sobre vulnerabilidades, exposición, código propio, dependencias de terceros, permisos y proceso de investigación. No conviertas cada señal de seguridad en un Problem operativo ni cada recomendación en una prueba de remediación. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Distinguir tipos de riesgo y contexto.',
    'Separar código propio y terceros.',
    'Usar Advisor e Investigations con criterio.',
    'Entender permisos y evidencia de remediación.',
    'Explicar Runtime Vulnerability Analytics y code-level context.',
    'Diferenciar capability, modo de monitorización y profundidad de evidencia.',
  ],
  sections: [
    {
      id: 'security-model',
      title: 'Qué es una vulnerabilidad en contexto',
      lead: 'El nombre y la severidad no bastan para priorizar.',
      paragraphs: [
        'Una vulnerabilidad es una debilidad que puede tener impacto si se cumplen determinadas condiciones. La priorización requiere versión, componente, exposición, uso real, alcance, evidencia y posibilidad de remediación. Un hallazgo estático o una dependencia vulnerable no describe por sí solo todo el riesgo operativo.',
        'Relaciona seguridad con contexto de aplicación y runtime, pero conserva el vocabulario del producto. Una vulnerabilidad, un security event, un Davis event y un Problem pueden interactuar y aun así representar objetos diferentes.',
        'En Latest Dynatrace, las vulnerabilidades de Runtime Vulnerability Analytics se registran como security events en la tabla security.events (por ejemplo, con event.type VULNERABILITY_STATE_REPORT_EVENT), no como Davis events en dt.davis.events. Una vulnerabilidad no es un Problem de Davis, ni un Problem es la vista agregada de las vulnerabilidades de una entidad, y "security event" no es otro nombre para un Davis event.',
      ],
      bullets: [
        'Qué componente está afectado.',
        'Dónde se ejecuta y quién puede alcanzarlo.',
        'Qué evidencia confirma la condición.',
        'Qué dependencia o código debe corregirse.',
        'Cómo verificar que la remediación funcionó.',
      ],
      sourceRefs: [
        { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security', kind: 'official-docs' },
        {
          title: 'Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
          kind: 'official-docs',
        },
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'code-thirdparty',
      title: 'Código propio frente a terceros',
      lead: 'La propiedad del componente cambia la remediación.',
      paragraphs: [
        'El código propio se remedia cambiando la aplicación, configuración o pipeline que lo produce. Una vulnerabilidad de una librería de terceros exige identificar versión, dependencia transitiva, disponibilidad de actualización y posible mitigación mientras se corrige.',
        'No confundas “aparece en el mismo proceso” con “es código propio”. El análisis de runtime, composición de software y contexto de ejecución ayuda a priorizar, pero la decisión debe apoyarse en evidencia y en el proceso de desarrollo.',
      ],
      comparison: {
        headers: ['Caso', 'Pregunta', 'Siguiente paso'],
        rows: [
          ['Código propio', '¿Qué ruta o componente controlamos?', 'Corregir, probar y desplegar'],
          ['Dependencia directa', '¿Qué versión y uso están activos?', 'Actualizar o mitigar'],
          ['Dependencia transitiva', '¿Qué paquete la introduce?', 'Trazar cadena y evaluar upgrade'],
          ['Exposición runtime', '¿Se ejecuta y es alcanzable?', 'Priorizar con contexto'],
        ],
      },
      sourceRefs: [
        {
          title: 'Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
          kind: 'official-docs',
        },
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
        {
          title: 'Third-party vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'advisor-investigations',
      title: 'Security Advisor e Investigations',
      lead: 'Las aplicaciones ayudan a organizar evidencia.',
      paragraphs: [
        'Davis Security Advisor recomienda qué librerías actualizar: agrupa las third-party vulnerabilities abiertas y no silenciadas por librería y ordena el consejo por severidad según el DSS. Investigations ayuda a reunir pistas, navegar relaciones y documentar una conclusión. Ninguna vista elimina la necesidad de comprobar fuente, scope, permisos y evidencia actual.',
        'En preguntas de escenario, elige la acción que reduce incertidumbre: abrir el componente, comprobar exposición, revisar versión y contexto, consultar evidencia relacionada o definir una remediación verificable. No elijas “cerrar” o “ignorar” solo porque la severidad parezca baja.',
      ],
      bullets: [
        'Prioriza por riesgo y contexto, no solo por etiqueta.',
        'Distingue descubrimiento de remediación.',
        'Documenta hipótesis, evidencia y decisión.',
        'Revisa si el usuario tiene permiso para ver datos sensibles.',
      ],
      sourceRefs: [
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
        {
          title: 'Third-party vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities',
          kind: 'official-docs',
        },
        {
          title: 'Code-level vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/code-level-vulnerabilities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'security-permissions',
      title: 'Permisos y ciclo de remediación',
      lead: 'La investigación segura debe respetar mínimo privilegio.',
      paragraphs: [
        'Los datos de seguridad pueden estar restringidos y algunas acciones requieren permisos de escritura o administración. Que un usuario vea un hallazgo no significa que pueda editar una configuración, cerrar una exposición o ejecutar una acción automática.',
        'El ciclo completo es detectar → contextualizar → priorizar → remediar → verificar. La verificación puede requerir nueva observación, reanálisis, cambio de versión o evidencia de que el camino vulnerable ya no está activo.',
        'Ejemplo con las políticas por defecto: Read Security Events solo concede lectura (storage:security.events:read, storage:events:read y storage:buckets:read acotado a los buckets de security events). Guardar una configuración, como una third-party monitoring rule, es escribir settings y requiere settings:objects:write, que incluye Admin User pero no Standard User ni Pro User (que solo leen settings). Por eso un analista puede revisar vulnerabilidades y no poder guardar la regla.',
      ],
      bullets: [
        'Detectar el hallazgo.',
        'Contextualizar componente y exposición.',
        'Priorizar con impacto y evidencia.',
        'Aplicar corrección autorizada.',
        'Comprobar que el riesgo se reduce.',
      ],
      sourceRefs: [
        {
          title: 'Third-party vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities',
          kind: 'official-docs',
        },
        {
          title: 'Code-level vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/code-level-vulnerabilities',
          kind: 'official-docs',
        },
        {
          title: 'Prioritize vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'rva',
      title: 'Runtime Vulnerability Analytics',
      lead: 'RVA conecta una vulnerabilidad con el flujo observado en runtime.',
      paragraphs: [
        'Runtime Vulnerability Analytics aporta contexto de ejecución: ayuda a saber si una ruta de entrada puede alcanzar un componente vulnerable y qué evidencia existe en el flujo instrumentado. No lo reduzcas a un escáner de paquetes ni asumas que la mera presencia de una librería demuestra explotación.',
        'La señal debe leerse con sus condiciones: tecnología soportada, code-module injection, proceso monitorizado, versión, request y permisos. Una pregunta de precisión puede ofrecer “la dependencia está en el disco” como distractor frente a “el componente está cargado y participa en el flujo observado”.',
      ],
      bullets: [
        'Componente: qué versión y dependencia están presentes.',
        'Runtime: si el componente está cargado y observado.',
        'Input flow: por qué camino entra el dato.',
        'Contexto: qué aplicación, servicio y endpoint intervienen.',
        'Evidencia: qué observación permite priorizar y verificar.',
      ],
      sourceRefs: [
        {
          title: 'Code-level vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/code-level-vulnerabilities',
          kind: 'official-docs',
        },
        {
          title: 'Prioritize vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize',
          kind: 'official-docs',
        },
        {
          title: 'Davis Security Advisor API',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'appsec-modes',
      title: 'Application Security y monitoring modes',
      lead: 'La capability disponible depende del modo y de la inyección.',
      paragraphs: [
        'Application Security no debe estudiarse como un interruptor aislado. El modo Full-Stack, Infrastructure o Discovery cambia la profundidad disponible; Discovery requiere habilitar code-module injection para ciertas funciones y reiniciar los procesos monitorizados. El permiso o la licencia tampoco sustituyen la instrumentación.',
        'Cuando una pregunta describe AppSec sin resultados, sigue la cadena: tecnología soportada → modo → code-module injection → reinicio → proceso activo → datos y permisos. No concluyas que el fallo está en el análisis porque no se ha comprobado la condición de captura.',
      ],
      comparison: {
        headers: ['Capa', 'Pregunta de control', 'Qué no demuestra'],
        rows: [
          ['Capability/licencia', '¿Está disponible para la tenant?', 'Que el proceso esté instrumentado'],
          ['Monitoring mode', '¿Qué profundidad permite?', 'Que todas las funciones estén activas'],
          ['Code module', '¿Se inyectó en el proceso?', 'Que OneAgent esté instalado'],
          ['Restart', '¿El proceso cargó el cambio?', 'Que cambiar el setting altere procesos vivos'],
        ],
      },
      sourceRefs: [
        {
          title: 'Prioritize vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize',
          kind: 'official-docs',
        },
        {
          title: 'Davis Security Advisor API',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice',
          kind: 'official-docs',
        },
        { title: 'Investigations', url: 'https://docs.dynatrace.com/docs/secure/investigations', kind: 'official-docs' },
      ],
    },
    {
      id: 'third-party-runtime',
      title: 'Third-party components y librerías cargadas',
      lead: 'La evaluación de terceros necesita distinguir inventario de uso.',
      paragraphs: [
        'Las vulnerabilidades de terceros se relacionan con componentes y librerías que la aplicación utiliza. Un artefacto que contiene un paquete, un paquete resuelto por el build y una librería cargada en runtime no son evidencias equivalentes. Para priorizar, confirma versión, proceso, uso, exposición y posibilidad de actualización.',
        'La remediación suele pasar por actualizar o sustituir la dependencia, revisar dependencias transitivas y verificar que el proceso desplegado ya no carga la versión afectada. No cierres el ciclo porque el pipeline haya cambiado: falta comprobar el runtime que recibe tráfico.',
      ],
      bullets: [
        'Inventario: qué componente declara o contiene el paquete.',
        'Carga: qué librería se usa en el proceso.',
        'Exposición: qué camino puede alcanzarla.',
        'Corrección: qué versión o configuración elimina el riesgo.',
        'Verificación: qué nueva evidencia confirma el cambio.',
      ],
      sourceRefs: [
        {
          title: 'Davis Security Advisor API',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice',
          kind: 'official-docs',
        },
        { title: 'Investigations', url: 'https://docs.dynatrace.com/docs/secure/investigations', kind: 'official-docs' },
        { title: 'Investigations concepts', url: 'https://docs.dynatrace.com/docs/secure/investigations/concepts', kind: 'official-docs' },
      ],
    },
    {
      id: 'security-evidence',
      title: 'Límites, fuentes y evidencia',
      lead: 'Una recomendación de seguridad es una hipótesis priorizada, no una prueba final.',
      paragraphs: [
        'Davis Security Advisor recomienda actualizaciones de librerías e Investigations organiza la evidencia de una investigación con DQL y DPL, pero debes conservar la fuente, la fecha, el scope y la versión de la capability. La severidad puede ayudar a ordenar trabajo, pero la decisión operativa necesita alcance y evidencia.',
        'En el examen, desconfía de absolutos: “todo”, “siempre”, “solo con una métrica” o “si la vulnerabilidad es alta se remedia automáticamente”. La respuesta fuerte identifica la siguiente comprobación que reduce riesgo sin ejecutar una acción no autorizada.',
        'Davis Security Advisor recomienda el upgrade, pero no lo aplica (tampoco con severidad Critical): el equipo debe actualizar la librería. La remediación se verifica cuando ningún proceso carga ya la versión vulnerable y la vulnerabilidad pasa a Resolved, que se cierra automáticamente porque la causa raíz ya no está presente. Silenciarla (mute) la retira del advisor, que solo considera third-party vulnerabilities abiertas y no silenciadas, pero solo documenta una aceptación de riesgo: no la corrige ni la resuelve.',
      ],
      bullets: [
        'Fuente y fecha de la observación.',
        'Variante Latest/Classic si aplica.',
        'Permiso de lectura, escritura o administración.',
        'Impacto, exposición y alcance.',
        'Prueba posterior de remediación.',
      ],
      sourceRefs: [
        { title: 'Investigations', url: 'https://docs.dynatrace.com/docs/secure/investigations', kind: 'official-docs' },
        { title: 'Investigations concepts', url: 'https://docs.dynatrace.com/docs/secure/investigations/concepts', kind: 'official-docs' },
        { title: 'Application Security FAQ', url: 'https://docs.dynatrace.com/docs/secure/faq', kind: 'official-docs' },
      ],
    },
    {
      id: 'deep-security-capabilities',
      title: 'Mapa de Application Security y consulta de security.events',
      lead: 'La seguridad se entiende por tipo de riesgo, evidencia y consulta en Grail.',
      paragraphs: [
        'Application Security en Latest Dynatrace centraliza la gestión de riesgos en tiempo de ejecución. En Grail, las vulnerabilidades detectadas por Dynatrace se consultan con `fetch security.events`, filtrando `event.provider == "Dynatrace"` y `event.type == "VULNERABILITY_STATE_REPORT_EVENT"`; los registros incluyen estado de resolución (`vulnerability.resolution.status`), estado de mute, entidades afectadas y puntuación de riesgo. Leerlos requiere `storage:security.events:read`.',
        'La profundidad depende de OneAgent, tecnología, versión, modo de monitorización, capability, licencia y permisos. Una vulnerabilidad visible no significa que la aplicación esté explotada; una recomendación de Security Advisor no significa que la actualización se haya aplicado. El razonamiento debe separar detección, evaluación, priorización, remediación y verificación.',
      ],
      code: 'fetch security.events\n| filter event.provider == "Dynatrace"\n    and event.type == "VULNERABILITY_STATE_REPORT_EVENT"\n    and event.level == "VULNERABILITY"\n| dedup {vulnerability.display_id}, sort: {timestamp desc}\n| filter vulnerability.resolution.status == "OPEN"\n| fields vulnerability.display_id, vulnerability.title, vulnerability.risk.level\n| limit 20',
      codeNote: 'Patrón basado en los ejemplos DQL oficiales de Threat Observability: el último state report por vulnerabilidad indica su estado vigente. Comprueba los nombres de campo en el semantic dictionary antes de automatizar.',
      sourceRefs: [
        { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security', kind: 'official-docs' },
        {
          title: 'Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
          kind: 'official-docs',
        },
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-security-events-grail',
      title: 'security.events en Grail: tipos de evento, buckets y permisos',
      lead: 'Para consultar vulnerabilidades con DQL hay que saber qué registro es un snapshot, cuál un cambio y cuál un finding externo.',
      paragraphs: [
        'Los security events se guardan en la tabla security.events. Los generados por Dynatrace a partir del entorno monitorizado van al bucket default_securityevents_builtin y se retienen tres años; los ingeridos desde fuentes de terceros van al bucket default_securityevents y se retienen un año. Los findings externos se ingieren a través de OpenPipeline; el endpoint de ingesta por defecto es /platform/ingest/v1/security.events. Las vulnerabilidades no están en las tablas events, dt.davis.events ni logs.',
        'Los vulnerability events generados por Dynatrace se clasifican por event.level y event.group_label, que juntos determinan el event.type. event.level vale ENTITY (estado de la vulnerabilidad en una entidad afectada, con campos affected_entity.*) o VULNERABILITY (agregación global en todo el entorno); event.group_label vale STATE_REPORT (snapshots) o CHANGE_EVENT (cambios). Los findings y escaneos ingeridos de terceros no se clasifican así: no tienen event.level ni event.group_label, y su event.provider es la herramienta de origen (Snyk, Amazon ECR, Tenable, Qualys, Amazon Inspector).',
        'VULNERABILITY_STATE_REPORT_EVENT es un snapshot periódico del estado actual de cada vulnerabilidad por entidad, exportado a Grail de forma regular. Como cada snapshot es un registro, contar sin deduplicar multiplica el resultado: la consulta oficial usa dedup {vulnerability.display_id, affected_entity.id}, sort:{timestamp desc} para quedarse con el snapshot más reciente de cada par vulnerabilidad–entidad y después cuenta con countDistinctExact(vulnerability.display_id). Para abiertas y no silenciadas filtra vulnerability.resolution.status=="OPEN" (valores OPEN o RESOLVED) y vulnerability.mute.status!="MUTED" (valores MUTED o NOT_MUTED); vulnerability.risk.level contiene LOW, MEDIUM, HIGH, CRITICAL o NONE.',
        'Para reconstruir la historia usa los change events. Threat Observability los describe por separado: VULNERABILITY_STATUS_CHANGE_EVENT recoge los cambios de estado de la vulnerabilidad o de una entidad afectada, incluidos los estados de resolución y de mute (por ejemplo, al resolverse o silenciarse), y VULNERABILITY_ASSESSMENT_CHANGE_EVENT, los cambios de assessment (Dynatrace Security Score y Dynatrace Assessment). El Semantic Dictionary define VULNERABILITY_STATUS_CHANGE_EVENT de forma más amplia: Runtime Vulnerability Analytics lo genera cuando cambia el status o el assessment de una vulnerabilidad, a nivel de entidad (cada par vulnerabilidad–entidad) y a nivel de vulnerabilidad (el cambio agregado en todas las entidades afectadas). En ambas fuentes, el evento que registra cuándo se resolvió o se silenció una vulnerabilidad es STATUS_CHANGE. VULNERABILITY_EXTERNAL_ID_CHANGE_EVENT se emite cuando cambian los identificadores del proveedor externo. VULNERABILITY_COVERAGE_REPORT_EVENT es un informe periódico de cobertura. VULNERABILITY_FINDING es una vulnerabilidad concreta identificada en un proceso en un momento dado, y VULNERABILITY_SCAN, el análisis de los paquetes detectados en un proceso en un momento dado; ambos aparecen tanto en Runtime Vulnerability Analytics como en escáneres de terceros ingeridos.',
        'Permisos: storage:security.events:read da acceso de lectura a la tabla security.events, y storage:logs:read es necesario cuando se consultan logs ingeridos que se usan como datos de seguridad. La política Read Security Events concede storage:security.events:read y storage:events:read (tablas events y security.events); la política Read Logs concede storage:logs:read.',
      ],
      code: 'fetch security.events\n| filter dt.system.bucket=="default_securityevents_builtin"\n     AND event.provider=="Dynatrace"\n     AND event.type=="VULNERABILITY_STATE_REPORT_EVENT"\n     AND event.level=="ENTITY"\n| dedup {vulnerability.display_id, affected_entity.id}, sort:{timestamp desc}\n| filter vulnerability.resolution.status=="OPEN"\n     AND vulnerability.mute.status!="MUTED"\n| summarize {`Open vulnerabilities`=countDistinctExact(vulnerability.display_id)}',
      codeNote: 'Consulta oficial de Threat Observability: snapshots por entidad, dedup al más reciente y recuento de vulnerabilidades abiertas no silenciadas.',
      warning: 'Un filtro event.provider=="Dynatrace" excluye los findings de Snyk u otras herramientas, y un filtro por event.level los excluye también, porque los datos externos no llevan ese campo.',
      sourceRefs: [
        {
          title: 'Threat Observability concepts',
          url: 'https://docs.dynatrace.com/docs/secure/threat-observability/concepts',
          kind: 'official-docs',
        },
        {
          title: 'DQL examples for security data',
          url: 'https://docs.dynatrace.com/docs/secure/threat-observability/dql-examples',
          kind: 'official-docs',
        },
        {
          title: 'Semantic Dictionary: vulnerability events',
          url: 'https://docs.dynatrace.com/docs/semantic-dictionary/model/security-events/vulnerability',
          kind: 'official-docs',
        },
        {
          title: 'Data retention periods',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
        {
          title: 'Dynatrace default policies',
          url: 'https://docs.dynatrace.com/docs/manage/identity-access-management/use-cases/built-in-policies',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-third-party-code-level',
      title: 'Third-party vs Code-level vulnerabilities',
      lead: 'El componente afectado determina el método de detección y la respuesta.',
      paragraphs: [
        'Third-party vulnerability analysis detecta librerías y dependencias externas de código abierto o comerciales vulnerables (asociadas a CVEs conocidos) cuando un proceso monitorizado las carga en memoria de ejecución. Si una librería vulnerable está en el disco pero nunca es invocada por el runtime, no se emite el hallazgo de riesgo activo.',
        'Code-level vulnerability analysis examina en runtime el código propio desarrollado por la organización. Analiza cómo fluyen los datos de entrada del usuario a través de la aplicación para identificar rutas de código inseguras que podrían explotarse: SQL injection, command injection, improper input validation (por ejemplo, JNDI lookups) y server-side request forgery (SSRF). Cross-site scripting (XSS) y path traversal no figuran entre los tipos detectados.',
        'Para distinguirlas, fíjate en la evidencia: una third-party vulnerability se apoya en un componente vulnerable en uso (librería cargada por un proceso y su CVE); una code-level vulnerability, en un flujo de datos explotable desde un entry point hasta una función peligrosa. Una code-level vulnerability se reporta aunque nadie la haya atacado; detectar o bloquear ataques reales es tarea de Runtime Application Protection.',
      ],
      comparison: {
        headers: ['Tipo de Vulnerabilidad', 'Origen del Fallo', 'Mecanismo de Detección en OneAgent'],
        rows: [
          [
            'Third-party Vulnerability',
            'Librería o framework externo (CVE)',
            'Detección de binarios/JARs cargados en memoria por el proceso',
          ],
          [
            'Code-level Vulnerability',
            'Código propio de la aplicación (CWE)',
            'Análisis del flujo de entrada y sinks vulnerables en runtime',
          ],
          [
            'Runtime Application Protection',
            'Ataque activo en ejecución',
            'Detección de payloads maliciosos intentando explotar el servicio',
          ],
          [
            'Mute (silenciar)',
            'Riesgo evaluado o falso positivo',
            'Acción sobre entidades afectadas en la app Vulnerabilities: no corrige ni excluye (excluir = monitoring rules)',
          ],
        ],
      },
      sourceRefs: [
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
        {
          title: 'Third-party vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities',
          kind: 'official-docs',
        },
        {
          title: 'Code-level vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/code-level-vulnerabilities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-third-party-evaluation',
      title: 'Cómo se evalúan las third-party vulnerabilities',
      lead: 'Qué componentes se comparan, con qué feed, cada cuánto y cuándo una vulnerabilidad se resuelve o se reabre.',
      paragraphs: [
        'La evaluación third-party compara dos clases de componentes con los vulnerability feeds: las librerías, que OneAgent reporta cuando un proceso las carga, y los paquetes runtime de Kubernetes que usa el clúster (en el control plane, kube-apiserver, etcd, kube-scheduler, kube-controller-manager y cloud-controller-manager; en los worker nodes, kubelet y kube-proxy). Un JAR que solo está en disco, en una imagen de contenedor, en un manifiesto o en el inventario de paquetes del host, pero que ningún proceso carga, no genera una third-party vulnerability. La evaluación no comprueba configuraciones, runtime information ni sistemas operativos.',
        'Los feeds dependen del tipo de componente: el Dynatrace Vulnerability feed cubre los componentes de software y los componentes runtime de Kubernetes, y el NVD feed cubre los runtimes .NET, Java y Node.js. Dynatrace comprueba si hay actualizaciones del feed cada cinco minutos, los feeds actualizados se importan al Dynatrace Cluster en un plazo de dos horas y la búsqueda de nuevas vulnerabilidades en los componentes del entorno se hace cada minuto. Por eso un CVE recién publicado puede tardar hasta dos horas en reflejarse, sin reiniciar nada.',
        'Resolución third-party: cuando ningún process group ha reportado el componente vulnerable durante más de dos horas, la vulnerabilidad se marca como Resolved. Ese silencio puede deberse a que el componente se actualizó o eliminó, pero también a que el proceso está detenido o aún no ha cargado la librería por falta de tráfico, así que Resolved no confirma por sí solo la versión instalada. Si el proceso vuelve a ejecutarse y carga otra vez el componente vulnerable, la vulnerabilidad se reabre.',
        'Resolución code-level: una code-level vulnerability se resuelve cuando el proceso vulnerable se ha reiniciado y OneAgent ya no detecta flujos de datos que puedan conducir a la vulnerabilidad.',
        'Vulnerable functions es un dato exclusivo de third-party: muestra qué funciones de la librería afectada están implicadas y si la aplicación las usa, para afinar la priorización. No modifica el DSS, no muestra flujos de datos (eso es code-level) y en Java requiere activar Java vulnerable function reporting.',
      ],
      comparison: {
        headers: ['Componente', 'Ejemplos', 'Feed'],
        rows: [
          ['Librerías cargadas por procesos', 'Librerías de Java, .NET, Node.js, Python, Go o PHP', 'Dynatrace Vulnerability feed'],
          ['Paquetes runtime de Kubernetes', 'kube-apiserver, etcd, kubelet, kube-proxy', 'Dynatrace Vulnerability feed'],
          ['Runtimes', '.NET, Java, Node.js', 'NVD feed'],
        ],
      },
      warning: 'Resolved por ausencia de reportes no es una prueba de remediación: comprueba la versión cuando el proceso vuelva a recibir tráfico.',
      sourceRefs: [
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
        {
          title: 'Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
          kind: 'official-docs',
        },
        {
          title: 'Vulnerabilities concepts',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/concepts',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-code-level-details',
      title: 'Code-level vulnerabilities: tipos, tecnologías y detalle',
      lead: 'El detalle de una code-level vulnerability apunta al código que hay que cambiar, no a una librería.',
      paragraphs: [
        'Code-level vulnerability detection identifica cuatro tipos: SQL injection, command injection, improper input validation (por ejemplo, una JNDI lookup con datos no confiables) y SSRF. La detección third-party está soportada en Java, .NET, Node.js, Python, Go y PHP; la code-level, en Java 8+, .NET (.NET Framework 4.5+ y .NET Core 3.0+, procesos de 64 bits) y Go. PHP, Python y Node.js no tienen code-level detection.',
        'El entry point describe por dónde entra el atacante: la URL path de la petición HTTP, el untrusted input que llega a la función vulnerable y los Payloads, el input controlado por el usuario que podría explotarla, que aparece resaltado. En Payloads se ve la parte de la sentencia SQL (SQL injection), el comando (command injection), el nombre de la JNDI lookup (improper input validation) o la request URL (SSRF). La code location muestra desde dónde se llama a la función vulnerable, por ejemplo SQL injection at DatabaseManager.updateBio():82.',
        'La puntuación de una code-level vulnerability es siempre 10 y su riesgo Critical, porque se considera explotable en cualquier momento; no tiene CVE ni depende del CVSS de una librería. Como todas puntúan igual, para priorizarlas se mira el contexto de las entidades relacionadas: public internet exposure y reachable data assets.',
      ],
      comparison: {
        headers: ['Tipo', 'Qué resalta Payloads'],
        rows: [
          ['SQL injection', 'La parte de la sentencia SQL'],
          ['Command injection', 'El comando'],
          ['Improper input validation', 'El nombre de la JNDI lookup'],
          ['SSRF', 'La request URL'],
        ],
      },
      sourceRefs: [
        {
          title: 'Vulnerabilities concepts',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics',
          kind: 'official-docs',
        },
        {
          title: 'Get started with Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/get-started-with-vulnerability-analytics',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-monitoring-rules',
      title: 'Monitoring rules de third-party y de code-level',
      lead: 'Las dos familias de reglas incluyen o excluyen entidades, pero difieren en reinicio y en su relación con el control global.',
      paragraphs: [
        'Las third-party monitoring rules incluyen o excluyen entidades del análisis de Runtime Vulnerability Analytics con el control Monitor o Do not monitor. Se recomienda basarlas en resource attributes (host name, process group ID, Kubernetes namespace, atributos propios o indicadores de tecnología como java.main.class); las reglas clásicas por process group tags, host tags o management zones están deprecadas. El orden importa: en cuanto una regla coincide con una entidad, las reglas posteriores ya no se consideran para ella, así que las reglas específicas deben ir antes que las generales. El control por defecto se aplica a las entidades que no coinciden con ninguna regla. Activar o desactivar una third-party monitoring rule no requiere reiniciar.',
        'Aunque no haga falta reiniciar, el cambio no es instantáneo: puede tardar hasta 10 minutos en aplicarse en todo el sistema, y hasta 70 minutos cuando se excluye una entidad que antes se monitorizaba. Las reglas de procesos se definen con resource attributes, que aplican a process groups; las reglas de Kubernetes nodes y hosts necesitan Kubernetes labels, y si solo configuras reglas de resource attributes, los Kubernetes nodes pueden seguir monitorizados aunque sus process groups estén excluidos. En entornos creados en la versión 1.313 o posterior, las reglas clásicas por process group tag, host tag y management zone no están disponibles.',
        'Con Do not monitor no se crean vulnerabilidades nuevas para los procesos que cumplen la regla y las vulnerabilidades existentes que solo afectan a esos procesos se resuelven; si la regla se elimina o deja de aplicarse, se reabren. Una regla no silencia (mute) ni borra datos.',
        'Las code-level monitoring rules usan resource attributes como dt.entity.process_group o aws.region para aplicar Monitor o Do not monitor, y sobrescriben el control global de code-level vulnerability detection de la tecnología seleccionada. Están ordenadas y se aplica la primera regla que coincide. Tras crear o cambiar code-level monitoring rules hay que reiniciar los procesos.',
      ],
      comparison: {
        headers: ['Aspecto', 'Third-party rules', 'Code-level rules'],
        rows: [
          ['Orden', 'La primera que coincide; específicas antes que generales', 'La primera que coincide'],
          [
            'Relación con el control global',
            'El control por defecto cubre lo no coincidente',
            'Sobrescriben el control global de la tecnología',
          ],
          ['Reinicio', 'No requiere reinicio', 'Reiniciar los procesos'],
        ],
      },
      sourceRefs: [
        {
          title: 'Third-party monitoring rules',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities/define-monitoring-rules-tpv',
          kind: 'official-docs',
        },
        {
          title: 'Code-level monitoring rules',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/code-level-vulnerabilities/define-monitoring-rules-clv',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-security-prioritization',
      title: 'Priorización contextual con Dynatrace Security Score (DSS)',
      lead: 'La prioridad es contextual: severidad CVSS y riesgo real no son idénticos.',
      paragraphs: [
        'El Dynatrace Security Score (DSS) parte del CVSS base (v4 si existe, si no v3) y lo ajusta con el contexto del entorno: Public internet exposure (si el proceso afectado está expuesto a internet) y Reachable data assets (si tiene acceso a bases de datos). Public exploit availability y Vulnerable functions se muestran como factores de riesgo informativos, pero no entran en el cálculo del DSS. El DSS nunca supera el CVSS base: el contexto solo puede mantenerlo o reducirlo.',
        'Gracias a esta ponderación, una vulnerabilidad con CVSS 9.8 en un servicio interno sin exposición ni acceso a datos puede recibir un DSS menor, y los equipos priorizan primero lo expuesto. Si alguna process group instance afectada no está en Full-Stack, la evaluación pasa a modo Reduced.',
        'Por tanto, sin public internet exposure ni reachable data assets el DSS de una third-party vulnerability puede quedar por debajo del CVSS base, nunca por encima: los modificadores ambientales solo reducen o mantienen la puntuación. En un CVSS 9.8 con impacto alto en confidencialidad e integridad, la falta de ambos factores reduce el DSS; con ambos factores presentes se mantiene en el valor base. Un exploit público disponible o el uso de vulnerable functions ayudan a decidir el orden de trabajo, pero no cambian el DSS.',
      ],
      bullets: [
        'Public internet exposure: si no hay exposición, el DSS puede reducirse respecto al CVSS.',
        'Reachable data assets: sin acceso a datos, el DSS puede reducirse.',
        'Public exploit availability: factor informativo para priorizar; no modifica el DSS.',
        'Mute (silenciar vulnerabilidades o entidades afectadas): documenta una aceptación de riesgo sin corregir ni dejar de detectar; para excluir procesos del análisis se usan monitoring rules.',
      ],
      sourceRefs: [
        {
          title: 'Prioritize vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize',
          kind: 'official-docs',
        },
        {
          title: 'Davis Security Advisor API',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice',
          kind: 'official-docs',
        },
        { title: 'Investigations', url: 'https://docs.dynatrace.com/docs/secure/investigations', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-dss-assessment',
      title: 'DSS y Dynatrace Assessment en detalle',
      lead: 'Versión de CVSS, métricas que se modifican, factores del entorno, escala de riesgo y modos de assessment.',
      paragraphs: [
        'CVSS v4 está disponible actualmente solo para las vulnerabilidades del Dynatrace Vulnerability feed; cuando existe un vector v4 se usa para el DSS y, si no, se usa CVSS v3. Como los runtimes .NET, Java y Node.js se evalúan con NVD, su DSS parte previsiblemente de v3. El DSS modifica métricas ambientales: con CVSS v3, Modified Confidentiality (MC) y Modified Integrity (MI); con CVSS v4, Modified Vulnerable Confidentiality (MVC) y Modified Vulnerable Integrity (MVI). El DSS nunca supera el CVSS Base Score: los modificadores solo pueden reducirlo o mantenerlo.',
        'Ojo con las versiones de la documentación: la página Latest (Vulnerabilities concepts) solo cita MC/MI (v3) y MVC/MVI (v4); la página clásica del Davis Security Score, de la app deprecada Third-Party Vulnerabilities, describía además una rebaja del Modified Attack Vector (MAV) cuando no hay exposición pública. En el examen, responde con la versión Latest.',
        'Public internet exposure: Dynatrace analiza si las peticiones entrantes a servicios web y las llamadas a web services del último día proceden de una IP pública. Reachable data assets: se revisan los servicios relacionados y los servicios a los que estos llaman directamente; si alguno es una base de datos, hay un reachable data asset afectado. El examen se limita a esos dos niveles: si el servicio del proceso vulnerable llama directamente a una base de datos, cuenta; una base de datos a la que solo llama un servicio intermedio queda fuera de lo que describe la documentación. Public exploit availability y vulnerable functions se consideran en la evaluación de riesgo, pero no en el DSS.',
        'Escala de riesgo: Low 0.1–3.9, Medium 4.0–6.9, High 7.0–8.9 y Critical 9.0–10.0. Las severidades de findings externos sin puntuación se normalizan a Critical 10.0, High 8.9, Medium 6.9, Low 3.9 y Other 0.0.',
        'En la app Vulnerabilities, el DSS de una vulnerabilidad se evalúa a partir del DSS de sus entidades afectadas dentro del segmento seleccionado y se toma el más alto; la app clásica Third-Party Vulnerabilities agrega los factores de riesgo de las entidades afectadas dentro de la management zone, lo que puede dar una severidad mayor.',
        'Dynatrace Assessment tiene tres modos: Full, cuando todas las process instances afectadas están monitorizadas en Full-Stack; Reduced, cuando al menos una no está en Full-Stack y la evaluación detallada se limita (exposición y activos de datos no se pueden examinar, así que el DSS no se reduce); y Not available, cuando la vulnerabilidad está resuelta.',
      ],
      comparison: {
        headers: ['Factor', '¿Entra en el DSS?', 'Para qué sirve'],
        rows: [
          ['Public internet exposure', 'Sí', 'Sin exposición, el DSS se reduce'],
          ['Reachable data assets', 'Sí', 'Sin bases de datos alcanzables, el DSS se reduce'],
          ['Public exploit availability', 'No', 'Priorizar dentro de la evaluación de riesgo'],
          ['Vulnerable functions', 'No', 'Saber si se usan las funciones afectadas (third-party)'],
        ],
      },
      sourceRefs: [
        {
          title: 'Vulnerabilities concepts',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Vulnerability evaluation',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/vulnerability-evaluation',
          kind: 'official-docs',
        },
        {
          title: 'Davis Security Score (classic)',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities/davis-security-score',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-vulnerabilities-app',
      title: 'La app Vulnerabilities: entidades, mute y priorización',
      lead: 'Qué muestra la app, qué estados existen y qué señales usar para decidir el orden de remediación.',
      paragraphs: [
        'La app Vulnerabilities muestra vulnerabilidades de dos fuentes: Dynatrace Runtime Vulnerability Analytics y findings ingeridos de herramientas de seguridad externas. Para acceder, el grupo vulnerability-service necesita las políticas Read Entities y Read Security Events (esta incluye storage:security.events:read y un storage:buckets:read acotado a los buckets de security events), más una política de usuario (Admin User, Pro User o Standard User).',
        'Las entidades afectadas son los procesos, process groups o Kubernetes nodes que contienen directamente la vulnerabilidad; las entidades relacionadas son la infraestructura conectada: aplicaciones, servicios, hosts, Kubernetes workloads y clusters, e imágenes de contenedor.',
        'El mute se aplica a las entidades afectadas y no corrige ni deja de detectar la vulnerabilidad. Muted (Affected): la entidad sigue afectada, pero se silenció a petición. Muted (Open): la vulnerabilidad sigue activa, pero todas sus entidades afectadas se silenciaron. Muted (Resolved): una entidad silenciada que se cerró automáticamente porque la causa raíz desapareció no pasa a Resolved, sino a Muted (Resolved). Para excluir procesos del análisis se usan monitoring rules, no el mute.',
        'Para priorizar, la app combina DSS, Dynatrace Assessment, entidades afectadas y relacionadas, exploit attempts (requieren configurar Runtime Application Protection), vulnerability evolution y el CISA KEV catalog. Las vulnerabilidades del CISA KEV catalog cuya fecha límite de remediación ha pasado muestran la etiqueta Overdue. Los eventos de vulnerability evolution se guardan un año y solo pueden consultarse hasta el timestamp de la primera detección. Para ver vulnerable functions se abre el apartado Details de una third-party vulnerability. La vista de coverage muestra cómo de bien monitoriza Runtime Vulnerability Analytics los procesos y hosts del entorno, para detectar huecos.',
      ],
      bullets: [
        'Mayor DSS + exposición + activos de datos + CISA KEV Overdue = candidata clara a remediar primero.',
        'Mismo CVSS no implica mismo riesgo: compara el DSS.',
        'El mute documenta una aceptación de riesgo; no es una remediación.',
      ],
      sourceRefs: [
        { title: 'Vulnerabilities app', url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities', kind: 'official-docs' },
        {
          title: 'Vulnerabilities concepts',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/concepts',
          kind: 'official-docs',
        },
        {
          title: 'Prioritize vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-security-advisor',
      title: 'Davis Security Advisor y APIs de seguridad',
      lead: 'Recomendaciones de actualización agrupadas por librería y acceso programático a vulnerabilidades.',
      paragraphs: [
        'Davis Security Advisor agrupa las librerías que provocan vulnerabilidades para simplificar la remediación y recomienda actualizarlas. Evalúa todas las third-party vulnerabilities abiertas y no silenciadas; las resueltas o silenciadas no se tienen en cuenta. Al calcular el consejo ignora la versión concreta de la librería y recomienda actualizar a la última versión cualquier librería con vulnerabilidades conocidas; las recomendaciones se ordenan por severidad según el DSS.',
        'Por API, /api/v2/davis/securityAdvices lista las recomendaciones de Davis sobre vulnerabilidades abiertas y no silenciadas, agrupadas por tecnología y componente vulnerable (adviceType UPGRADE), y /api/v2/securityProblems lista vulnerabilidades. Ambos endpoints requieren un token con el scope securityProblems.read.',
      ],
      sourceRefs: [
        {
          title: 'Davis Security Advisor',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/third-party-vulnerabilities/davis-security-advisor',
          kind: 'official-docs',
        },
        {
          title: 'Davis Security Advisor API',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/davis-security-advice',
          kind: 'official-docs',
        },
        {
          title: 'Vulnerabilities API - List vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/dynatrace-api/environment-api/application-security/vulnerabilities/get-vulnerabilities',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-security-modes',
      title: 'Application Security y modos de OneAgent',
      lead: 'La cobertura de seguridad depende de la instrumentación disponible.',
      paragraphs: [
        'La tabla de monitoring modes marca Application Security como opt-in en Full Stack, Infrastructure y Discovery, pero las condiciones y la profundidad no son idénticas. En Discovery, code-module injection está deshabilitado por defecto y debe habilitarse para ciertos usos de Application Security y Live Debugger. En Infrastructure, auto-injection puede aportar runtime metrics de backing services, pero no convierte el modo en trazabilidad Full Stack.',
        'Si se desactiva auto-injection o se modifica la configuración de un módulo, pueden desaparecer descubrimiento de vulnerabilidades o Live Debugger aunque la capability aparezca habilitada. Comprueba versión, soporte de tecnología, modo, injection, reinicio de procesos, permisos y licencia antes de concluir que AppSec está roto.',
        'Excepción documentada: la process injection está habilitada por defecto en Infrastructure Monitoring, pero si OneAgent se ejecuta como contenedor con Infrastructure Monitoring, la process injection no se realiza y esos backing services no aportan runtime metrics.',
      ],
      bullets: [
        'Capability habilitada no significa code module cargado.',
        'Code-module injection puede requerir reinicio.',
        'Discovery tiene cobertura ligera y condiciones específicas.',
        'Infrastructure no equivale a Full Stack tracing.',
      ],
      sourceRefs: [
        { title: 'Investigations concepts', url: 'https://docs.dynatrace.com/docs/secure/investigations/concepts', kind: 'official-docs' },
        { title: 'Application Security FAQ', url: 'https://docs.dynatrace.com/docs/secure/faq', kind: 'official-docs' },
        {
          title: 'Security data retention',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-rva-setup',
      title: 'Prerrequisitos de Runtime Vulnerability Analytics por tecnología y modo',
      lead: 'Cuando no aparecen componentes o hallazgos, recorre los prerrequisitos de la tecnología antes de culpar al análisis.',
      paragraphs: [
        'Runtime Vulnerability Analytics necesita deep monitoring del process group (Settings > Process and contextualize > Process groups > Process group monitoring). Para .NET, Go y Python el deep monitoring automático está deshabilitado por defecto y hay que activarlo manualmente. Para Python hay que activar Monitor Python (Settings > Collect and capture > General monitoring settings > Monitoring technologies) y Python software component reporting (Settings > Collect and capture > General monitoring settings > OneAgent features), y reiniciar los procesos. En Java, vulnerable functions es opcional y requiere activar Java vulnerable function reporting; la detección de SSRF code-level requiere activar Java SSRF code-level vulnerability and attack evaluation. Tras activar code-level detection o cambiar OneAgent features hay que reiniciar los procesos.',
        'Los tres monitoring modes admiten Application Security, con diferencias. Full-Stack es el recomendado y aporta todo el contexto. En Infrastructure Monitoring faltan datos ambientales como reachable data assets o public internet exposure, y la información de entidades relacionadas (bases de datos, servicios) es limitada; por eso el DSS no puede adaptarse al entorno y estos factores suelen aparecer como Not available. En Discovery mode, tras activarlo hay que habilitar también code-module injection (y reiniciar los procesos para cargar el módulo), y Dynatrace no puede adaptar el DSS.',
        'Excepción documentada: en hosts Linux en Discovery mode, la public internet exposure se detecta vía eBPF, con los estados Public network y Not detected.',
      ],
      bullets: [
        'Python: Monitor Python (Monitoring technologies) + Python software component reporting (OneAgent features) + reinicio.',
        '.NET, Go y Python: deep monitoring manual por host.',
        'Java vulnerable functions: Java vulnerable function reporting + reinicio.',
        'Java SSRF: Java SSRF code-level vulnerability and attack evaluation + reinicio.',
        'Discovery mode: code-module injection + reinicio.',
      ],
      sourceRefs: [
        {
          title: 'Get started with Runtime Vulnerability Analytics',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/get-started-with-vulnerability-analytics',
          kind: 'official-docs',
        },
        {
          title: 'Application Security and monitoring modes',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/getting-started/monitoring-modes',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-rap',
      title: 'Runtime Application Protection',
      lead: 'Detectar una vulnerabilidad no es lo mismo que detectar o bloquear un ataque.',
      paragraphs: [
        'Runtime Application Protection detecta ataques reales de SQL injection, JNDI injection, command injection y SSRF. Java admite los cuatro tipos; .NET y Go detectan SQL injection y command injection, y JNDI injection y SSRF están limitados a Java. Está soportada en los tres monitoring modes (Full-Stack, Infrastructure y Discovery) para detectar y bloquear ataques.',
        'Cada tecnología tiene tres controles: Off (no se reportan ataques), Monitor (se reportan ataques sin bloquear ninguno) y Block (se reportan y se bloquean en runtime). Para empezar en producción sin riesgo de bloquear peticiones legítimas se usa Monitor. Do not monitor no es un modo de protección: es un control de las monitoring rules de vulnerability analytics. Los exploit attempts que muestra la app Vulnerabilities requieren configurar Runtime Application Protection.',
      ],
      sourceRefs: [
        {
          title: 'Runtime Application Protection',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/application-protection',
          kind: 'official-docs',
        },
        {
          title: 'Application Security and monitoring modes',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/getting-started/monitoring-modes',
          kind: 'official-docs',
        },
        {
          title: 'Prioritize vulnerabilities',
          url: 'https://docs.dynatrace.com/docs/secure/vulnerabilities/prioritize',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-investigations',
      title: 'Investigations como flujo de evidencia',
      lead: 'Investigar seguridad y operaciones comparte DQL, DPL y una cadena de evidencia.',
      paragraphs: [
        'Investigations permite crear un escenario, ejecutar queries, filtrar logs, extraer campos con DPL Architect, controlar timeframe, administrar query tree y conservar evidence. Puedes navegar desde resultados hacia entidades, traces, Notebooks u otras aplicaciones. La investigación no es un log viewer: conserva el camino de razonamiento para repetirlo o compartirlo.',
        'Para resolver un incidente, empieza por una señal o indicador, reduce la población, extrae los campos que permiten correlación, busca conexiones temporales y topológicas y adjunta la evidencia relevante. Los límites documentados (un máximo de 100 nodos y 1 GB de tamaño por investigación), el acceso al dato y la necesidad de log ingestion son parte de la evaluación. Un resultado sin contexto no prueba una hipótesis.',
        'Investigations consulta datos almacenados en Grail: logs, métricas y traces que ya se han ingerido en Grail. Por eso, para investigar logs hay que configurar antes su log ingestion; unos logs que solo existen en el disco local de un servidor no aparecen en ninguna consulta hasta que se ingieren.',
      ],
      bullets: [
        'DQL para consultar.',
        'DPL para extraer estructura.',
        'Query tree para conservar evolución.',
        'Evidence para fijar hallazgos.',
        'Sharing controlado para colaborar.',
      ],
      sourceRefs: [
        {
          title: 'Security data retention',
          url: 'https://docs.dynatrace.com/docs/manage/data-privacy-and-security/data-privacy/data-retention-periods',
          kind: 'official-docs',
        },
        {
          title: 'Security notifications for vulnerabilities (Classic)',
          url: 'https://docs.dynatrace.com/docs/secure/application-security/vulnerability-analytics/security-notifications-rva',
          kind: 'official-docs',
        },
        { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security', kind: 'official-docs' },
      ],
    },
    {
      id: 'sup-investigations-details',
      title: 'Investigations: query tree, evidencia, tiempo y enriquecimiento',
      lead: 'Las piezas concretas de la app que aparecen en preguntas de escenario.',
      paragraphs: [
        'Investigations es una app para investigaciones basadas en evidencia en seguridad, operaciones, compliance y fraude, con DQL sobre datos de Grail. Requiere logs ingeridos y conocer DQL y DPL. Con DPL Architect se extraen campos concretos de los logs (por ejemplo IP, usuarios o comandos). La investigación puede compartirse con otros usuarios y los cambios se guardan automáticamente.',
        'El query tree representa el recorrido: el root node se crea al ejecutar la primera consulta DQL, cada vez que modificas y ejecutas una consulta se añade un query node, y una query branch es la cadena de nodos que forma un camino de investigación, a la que puedes volver. Las evidence lists guardan fragmentos de logs y direcciones IP relevantes para usarlos después al buscar y filtrar.',
        'Tiempo: si no indicas periodo, se aplica el timeframe por defecto -2h (las últimas dos horas). El timeframe se define con los parámetros timeframe o from/to de fetch (que prevalecen sobre la selección manual), con el timeframe selector junto al botón Run, desde los resultados o desde el resumen de la consulta. Al seleccionar varios timestamps con shift y hacer clic derecho, Add to custom timeframes crea un timeframe con el mínimo y el máximo seleccionados. Set as reference time (clic derecho en un timestamp) añade una columna virtual con el offset entre cada evento y la referencia; puede sustituirse en cualquier momento y los offsets se recalculan.',
        'Enriquecimiento: IP enrichment añade datos de reputación externa a las direcciones IP con fuentes de threat intelligence como AbuseIPDB o VirusTotal. Las lookup tables son datasets estructurados guardados en Grail que enriquecen la investigación con contexto externo o de comportamiento y permiten correlacionar eventos con patrones conocidos, comportamiento de usuarios o metadatos de activos (por ejemplo, el inventario de activos de la empresa).',
      ],
      bullets: [
        'Query tree: volver a una rama anterior.',
        'Evidence lists: conservar fragmentos de log e IP.',
        'Add to custom timeframes: ventana reutilizable desde timestamps.',
        'Set as reference time: offsets respecto al incidente.',
        'IP enrichment: reputación externa; lookup tables: contexto propio.',
      ],
      sourceRefs: [
        { title: 'Investigations app', url: 'https://docs.dynatrace.com/docs/secure/investigations', kind: 'official-docs' },
        { title: 'Investigations concepts', url: 'https://docs.dynatrace.com/docs/secure/investigations/concepts', kind: 'official-docs' },
        {
          title: 'Manage investigation time',
          url: 'https://docs.dynatrace.com/docs/secure/investigations/define-timeframes',
          kind: 'official-docs',
        },
      ],
    },
  ],
  masteryChecklist: [
    'Distingo vulnerabilidad, evento y Problem.',
    'Puedo priorizar sin depender de la severidad aislada.',
    'Explico la diferencia entre código propio y tercero.',
    'Sé qué permisos pueden bloquear una investigación o remediación.',
    'Explico qué evidencia añade RVA y por qué no equivale a inventario.',
    'Puedo seguir un diagnóstico de AppSec desde modo e inyección hasta evidencia.',
    'Distingo componente presente, cargado, alcanzable y remediado.',
    'Sé qué afirmaciones requieren una fuente vigente antes de responder.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
