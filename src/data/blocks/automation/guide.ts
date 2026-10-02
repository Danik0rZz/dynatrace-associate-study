import type { StudyChapter } from '../../types'

/**
 * Guía de estudio (los apartados se numeran solos por su orden) del bloque «Automation».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const guide: StudyChapter = {
  introduction: 'AutomationEngine y Workflows convierten señales y horarios en acciones controladas. El dominio técnico está en triggers, tasks, actor, permisos, estados, errores y límites de alcance. Esta versión ampliada añade una lectura de dominio, fuentes por bloque y matices de versión, permisos, límites y troubleshooting para estudiar el apartado sin depender de saltar constantemente fuera de la aplicación.',
  outcomes: [
    'Elegir el trigger adecuado.',
    'Describir actor y autorización.',
    'Separar lectura, transformación y escritura.',
    'Diagnosticar un workflow sin asumir permisos.',
    'Diseñar inputs, actions y outputs observables.',
    'Aplicar límites, idempotencia y control de errores.',
  ],
  sections: [
    {
      id: 'workflow-model',
      title: 'Anatomía de un Workflow',
      lead: 'Un workflow es una secuencia de tareas ejecutada en un contexto.',
      paragraphs: [
        'Un Workflow combina un trigger con una o más tareas o acciones. Puede consultar datos, transformar entradas, llamar integraciones, notificar, crear o ingerir eventos y orquestar procesos. El resultado debe ser observable mediante ejecución, estado y logs del propio flujo.',
        'Workflows no son el mecanismo general para ingestión masiva o exportación masiva. Para grandes volúmenes, considera OpenPipeline u otras soluciones adecuadas. Esta distinción es un distractor frecuente.',
        'La documentación de AutomationEngine lo dice de forma explícita: AutomationEngine no está pensado para ingestión ni exportación masiva de datos; para procesar grandes volúmenes plantea OpenPipeline o extensiones. Sus casos de uso documentados son otros: notificación dirigida y colaboración entre equipos (tickets, mensajes de Slack), remediación closed-loop de Problems y vulnerabilidades, quality and security gating u orquestación de releases.',
      ],
      bullets: [
        'Trigger: cuándo comienza.',
        'Input: qué datos recibe.',
        'Task/action: qué hace.',
        'Actor: con qué identidad y permisos.',
        'Execution: qué ocurrió y cómo terminó.',
      ],
      sourceRefs: [
        { title: 'Workflows', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows', kind: 'official-docs' },
        { title: 'AutomationEngine', url: 'https://docs.dynatrace.com/docs/platform/automationengine', kind: 'official-docs' },
        {
          title: 'Event triggers for workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'triggers',
      title: 'Triggers: on-demand, event y schedule',
      lead: 'La pregunta de negocio determina cuándo debe arrancar.',
      paragraphs: [
        'On-demand se ejecuta cuando alguien o una API lo invoca. Event empieza cuando se ingiere en OpenPipeline un evento que coincide con el trigger (Problem trigger, Davis event trigger o Event trigger). Schedule ejecuta en un intervalo o momento programado.',
        'Los triggers automáticos actúan sobre workflows live; un draft no debe confundirse con una automatización activa. Un trigger desactivado impide la ejecución automática, pero una llamada API puede seguir iniciando el workflow live.',
        'Todo workflow tiene exactamente un trigger. Las categorías son tres: On demand arranca solo cuando se invoca explícitamente (con Run desde la UI o vía API); Event arranca cuando se ingiere en OpenPipeline un evento que coincide con el trigger (Problem trigger, Davis event trigger o Event trigger); y Schedule se ejecuta a intervalos o a horas configuradas.',
        'Un workflow existe a la vez en dos versiones: live y draft. Solo el workflow live, publicado con Deploy, arranca automáticamente por su trigger; el draft es una copia de trabajo que no afecta a la versión live y que puedes probar manualmente con Run. Un workflow guardado con Schedule trigger que nunca se ha desplegado no se ejecuta por horario: falta hacer Deploy. Para detener los arranques automáticos sin perder el trabajo puedes hacer undeploy: el workflow vuelve a quedar solo como draft.',
        'Una llamada API puede iniciar siempre un workflow live, sea cual sea su trigger (Schedule, Event u On demand), incluso con el trigger desactivado: el interruptor del trigger solo detiene las ejecuciones automáticas. El input enviado en la llamada se fusiona con el input por defecto del workflow y las tasks lo leen con la expresión input().',
        'Version history marca la versión live, lista el draft existente y permite restaurar versiones anteriores con Restore; la última versión, etiquetada como Current, no se puede restaurar.',
      ],
      comparison: {
        headers: ['Trigger', 'Cuándo', 'Ejemplo'],
        rows: [
          ['On-demand', 'Invocación explícita', 'Prueba o remediación puntual'],
          ['Event', 'Evento que coincide', 'Notificar un Problem'],
          ['Schedule', 'Hora o intervalo', 'Informe nocturno'],
          ['API', 'No es un tipo de trigger: inicia cualquier workflow live', 'Orquestación desde otro sistema, con cualquier trigger'],
        ],
      },
      sourceRefs: [
        { title: 'AutomationEngine', url: 'https://docs.dynatrace.com/docs/platform/automationengine', kind: 'official-docs' },
        {
          title: 'Event triggers for workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
          kind: 'official-docs',
        },
        {
          title: 'Workflow triggers',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-schedule-triggers',
      title: 'Schedule triggers: Fixed time, Time interval y cron',
      lead: 'Un Schedule trigger arranca el workflow por tiempo, no por eventos.',
      paragraphs: [
        'Hay tres tipos de schedule. Fixed time ejecuta a una hora concreta en los días que definas: todos los días, solo laborables, días hábiles según un business calendar o un patrón personalizado. Time interval repite la ejecución cada N minutos, con un intervalo de 1 a 720 minutos (12 horas), y admite Active hours para limitarla a una franja diaria, por ejemplo de 08:00 a 18:00. Cron schedule cubre patrones avanzados que no encajan en los anteriores.',
        'El cron de Workflows usa la sintaxis estándar de cinco campos (minuto, hora, día del mes, mes y día de la semana) con los caracteres especiales *, la coma, -, */n y n/m. Las expresiones Quartz de seis campos y el comodín ? no están soportados: `0 0 6 ? * MON-FRI` debe reescribirse como `0 6 * * 1-5`.',
        'La zona horaria se indica en formato IANA (por ejemplo, Asia/Tokyo o Europe/Madrid) y es UTC por defecto; el cambio de horario de verano se gestiona automáticamente. Un Fixed time a las 08:00 sin Timezone se ejecuta a las 08:00 UTC, que en Tokio son las 17:00.',
        'Las scheduling rules y los business calendars controlan en qué días se ejecuta el trigger: días de la semana, fechas concretas o días hábiles de un calendario. Para saltar festivos se añaden al business calendar, sin modificar la programación principal.',
      ],
      comparison: {
        headers: ['Tipo', 'Cuándo arranca', 'Detalle clave'],
        rows: [
          ['Fixed time', 'A una hora fija en los días elegidos', 'Días: todos, laborables o business calendar'],
          ['Time interval', 'Cada N minutos', 'De 1 a 720 minutos; Active hours opcional'],
          ['Cron schedule', 'Patrón avanzado', 'Cinco campos; sin Quartz ni ?'],
        ],
      },
      warning: 'Para una ejecución diaria no sirve Time interval con 1440 minutos: el máximo es 720. Usa Fixed time (o cron).',
      sourceRefs: [
        {
          title: 'Workflow schedules',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/schedules',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'actor-permissions',
      title: 'Actor, owner y permisos',
      lead: 'La ejecución nunca debe evaluarse sin identidad.',
      paragraphs: [
        'Cada task se ejecuta en el contexto de un actor. El actor puede ser la persona configurada o un service user, y no puede superar los permisos disponibles. Al ejecutar por primera vez, AutomationEngine puede requerir consentimiento de los permisos que usará.',
        'El owner controla inicialmente la visibilidad y el acceso del workflow. Permisos de lectura, escritura, ejecución y administración son diferentes. Además, cada acción puede necesitar permisos específicos de la app o sistema destino.',
        'Ejemplo de permiso de acción: una task HTTP Request que se autentica (Basic o Token) con una credencial del credential vault solo puede leerla si la configuración de esa credencial permite el acceso al actor del workflow: credential scope AppEngine, app access para la app Workflows y Owner access o el actor como usuario seleccionado. Tener automation:workflows:read, write y run no basta, y ni el owner ni la visibilidad public del workflow sustituyen ese acceso.',
      ],
      bullets: [
        'Usuario: quién puede ver o editar.',
        'Owner: quién posee inicialmente el workflow.',
        'Actor: en qué contexto se ejecutan tasks.',
        'Permiso de workflow: leer, escribir, ejecutar o administrar.',
        'Permiso de acción: acceso a datos o sistema concreto.',
      ],
      sourceRefs: [
        {
          title: 'Event triggers for workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
          kind: 'official-docs',
        },
        {
          title: 'Workflow triggers',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger',
          kind: 'official-docs',
        },
        {
          title: 'Manage workflow permissions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'safe-automation',
      title: 'Automatización segura',
      lead: 'Automatiza una decisión explícita, no una suposición.',
      paragraphs: [
        'Diseña idempotencia cuando sea posible: si el workflow se repite, no debe duplicar tickets o cambios. Valida entradas, limita scope, registra resultados, maneja errores y diferencia fallos transitorios de fallos permanentes.',
        'Las acciones de escritura merecen una revisión adicional. El actor, los secretos, el sistema destino, el alcance y la posibilidad de rollback deben estar documentados. Un workflow rápido pero no trazable es un riesgo operativo.',
        'Secretos: guarda las credenciales en el credential vault. En HTTP Request no pongas un header Authorization estático, porque los valores de los headers son visibles para quien accede al workflow; usa Authentication Basic o Token con credenciales del vault. En Run JavaScript lee el secreto con credentialVaultClient y nunca lo incluyas en el resultado de la task: los resultados de ejecución son visibles para cualquiera con acceso de lectura al workflow, así que cada task que lo necesite debe leerlo del vault.',
        'Carga sobre los sistemas destino: si varios workflows programados llaman al mismo sistema a la misma hora (por ejemplo, una API de ITSM que empieza a responder HTTP 429), la documentación de schedules recomienda escalonar unos minutos sus horas de inicio para evitar ráfagas de peticiones.',
      ],
      bullets: [
        'Validar datos de entrada.',
        'Evitar duplicados y loops.',
        'Usar mínimo privilegio.',
        'Registrar éxito, error y evidencia.',
        'Definir reintentos y salida segura.',
      ],
      sourceRefs: [
        {
          title: 'Workflow triggers',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger',
          kind: 'official-docs',
        },
        {
          title: 'Manage workflow permissions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security',
          kind: 'official-docs',
        },
        {
          title: 'Monitor workflow executions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'simple-workflow',
      title: 'Simple workflow y actions',
      lead: 'Una acción pequeña sigue teniendo un contrato de entrada y salida.',
      paragraphs: [
        'El patrón de simple workflow sirve para resolver una acción concreta con el mínimo de configuración: seleccionar el trigger o la ejecución manual, elegir una tarea y suministrar sus inputs. La simplicidad reduce superficie, pero no elimina permisos, consentimiento, actor ni validación.',
        'Antes de reutilizar una salida como entrada de otra tarea, comprueba el tipo, el nombre del campo y el tamaño. Los resultados de una action pueden incluir datos y logs; no trates una salida textual como si fuera un objeto estructurado sin transformarla.',
        'Un simple workflow tiene un trigger (de cualquier tipo) y una única task, y no consume workflow hours directamente, aunque su ejecución puede consumir otras capacidades facturables (por ejemplo, invocaciones de AppEngine al enviar un mensaje de Slack, o consultas DQL). Puede usar las actions disponibles excepto Run JavaScript, Run workflow y la action de aprobación manual; Execute DQL Query y HTTP Request sí están permitidas. Solo registra metadatos de la ejecución, sin logs completos, y no tiene workflow result.',
        'Pasa a ser un workflow estándar en cuanto usas una función estándar: añadir una segunda task, usar task conditions (como una custom condition), usar task options (como Retry on error), acceder al workflow result o activar logs completos. Una vez convertido no hay opción para volver atrás, aunque elimines lo añadido: hay que crear un workflow nuevo o restaurar una versión anterior desde version history. Los permisos pueden limitarse a este tipo con la condición automation:workflow-type = "SIMPLE".',
      ],
      bullets: [
        'Trigger: cuándo se inicia.',
        'Task: qué acción se ejecuta.',
        'Input: qué valores necesita.',
        'Output: qué produce.',
        'Evidence: dónde se inspecciona la ejecución.',
      ],
      sourceRefs: [
        {
          title: 'Manage workflow permissions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security',
          kind: 'official-docs',
        },
        {
          title: 'Monitor workflow executions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running',
          kind: 'official-docs',
        },
        {
          title: 'Workflow actions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/actions',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'event-trigger-precision',
      title: 'Event trigger: coincidencia y límites',
      lead: 'Un trigger de evento no significa “cada cosa que ocurra”.',
      paragraphs: [
        'El event trigger debe coincidir con las condiciones configuradas y con el tipo de evento que el producto entrega. Distingue un Problem correlacionado, un Davis event y un evento de negocio: pueden participar en flujos diferentes y no comparten automáticamente todos los campos.',
        'La documentación establece límites operativos que son material de precisión: el event trigger tiene un máximo de ejecuciones por hora y la expresión compilada tiene un límite de caracteres. Estos límites obligan a acotar el matcher y a evitar usar el workflow como colector masivo.',
        'El Event trigger genérico se configura con un filtro DQL matcher (Additional custom filter query) y puede escuchar events, bizevents, security.events y dt.system.events; logs y spans no están entre los tipos admitidos. El actor necesita lectura del tipo de evento: storage:events:read, storage:bizevents:read, storage:security.events:read o storage:system:read, y además storage:buckets:read restringido al bucket que contiene esos eventos.',
        'Cada evento se evalúa por separado en el momento en que entra en OpenPipeline: las funciones de agregación y las consultas multievento (por ejemplo, contar cinco eventos en diez minutos) no están soportadas en el filtro. La expresión de coincidencia completa, compilada a partir de todos los campos del trigger (filtros de entidad, nombre del evento y Additional custom filter query), está limitada a 1.000 caracteres.',
        'Cada workflow admite como máximo 1.000 ejecuciones event-triggered por hora. Si se supera, las ejecuciones se limitan (throttling, HTTP 429) durante hasta una hora; si se supera tres veces en siete días, el trigger se desactiva automáticamente. Un workflow cuyas tasks generan eventos que vuelven a coincidir con su propio filtro acaba en ese throttling, así que el filtro debe excluirlos. Antes de guardar el trigger, usa Query past events para estimar cuántos eventos de tu entorno coinciden con el filtro.',
        'Cuando el workflow arranca, el evento que lo activó puede no estar persistido aún en Grail, y una task que lo busque con fetch events puede no encontrarlo. La documentación propone esperar 30–45 segundos (por ejemplo, con Wait before en la task) o pasar el evento directamente a la consulta con `data` y `{{ event()|to_json }}`. Los datos del evento están disponibles en todas las tasks con la expresión event().',
      ],
      comparison: {
        headers: ['Pregunta', 'Respuesta que debes buscar', 'Distractor típico'],
        rows: [
          ['¿Qué inicia el flujo?', 'Un evento que satisface el trigger', 'Cualquier registro ingerido'],
          ['¿Qué filtra?', 'La condición/event query configurada', 'Una query DQL arbitraria sin relación'],
          ['¿Qué limita?', 'Frecuencia y complejidad de la expresión', 'Que solo falle el sistema destino'],
          ['¿Qué hacer con volumen?', 'Acotar o usar ingestión/procesamiento adecuado', 'Crear un workflow por cada registro'],
        ],
      },
      sourceRefs: [
        {
          title: 'Monitor workflow executions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running',
          kind: 'official-docs',
        },
        {
          title: 'Workflow actions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/actions',
          kind: 'official-docs',
        },
        {
          title: 'Jinja expressions for Workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/reference',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-problem-davis-triggers',
      title: 'Problem trigger y Davis event trigger',
      lead: 'Elige entre reaccionar al Problem agrupado o a cada alerta individual.',
      paragraphs: [
        'Problem trigger se activa cuando un Davis problem se abre, cambia o se cierra; Davis event trigger se activa con alertas individuales durante la detección de anomalías. Los Davis events son más granulares: un único Problem puede agrupar varios Davis events. Si quieres una ejecución por incidente correlacionado, y no una por cada anomalía, usa Problem trigger. Ambos requieren storage:events:read para el actor.',
        'Opciones del Problem trigger: Problem state (active, por defecto; closed; o active or closed para reaccionar a la apertura y al cierre); Minimum duration, que pospone el trigger hasta que el Problem lleva abierto el tiempo elegido (de 5 a 10.080 minutos, es decir, hasta una semana); Wait for root cause analysis, con el que el trigger arranca solo cuando Dynatrace Intelligence ha completado el root cause analysis del Problem; y Updates, que vuelve a disparar el workflow cuando cambia el valor de un campo seleccionado, por ejemplo severity o affected entities. Cada combinación distinta de valores de los campos seleccionados dispara el workflow como mucho una vez.',
        'Minimum duration filtra los Problems de corta duración antes de arrancar; un Wait before en la task no sirve para eso, porque el workflow ya ha arrancado y la task se ejecutaría igualmente. En workflows con Problem trigger, `{{ problem_link() }}` devuelve la URL del Problem en la app Problems.',
      ],
      comparison: {
        headers: ['Opción', 'Qué hace', 'Úsala cuando'],
        rows: [
          ['Problem state', 'active, closed o active or closed', 'Quieres avisar también del cierre'],
          ['Minimum duration', 'Espera a que el Problem siga abierto N minutos', 'Muchos Problems se cierran solos en minutos'],
          ['Wait for root cause analysis', 'Espera a que termine el root cause analysis', 'La primera task necesita la root cause'],
          ['Updates', 'Re-dispara al cambiar campos seleccionados', 'Debes reaccionar a cambios de severity'],
        ],
      },
      sourceRefs: [
        {
          title: 'Event triggers for workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
          kind: 'official-docs',
        },
        {
          title: 'Expression reference (Jinja)',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/reference',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'execution-limits',
      title: 'Resultados, límites y observabilidad',
      lead: 'Un workflow puede completar una tarea y aun así no producir un resultado utilizable.',
      paragraphs: [
        'Lee por separado el estado del workflow, el estado de cada task, los logs y el resultado. El resultado de cada action execution no puede superar 6 MB menos el tamaño de sus logs; el workflow result tiene su propio límite de 10 MB y debe ser JSON válido. No uses el tamaño como mecanismo de exportación masiva.',
        'Diseña outputs mínimos y útiles: IDs, estados, timestamps, enlaces o un resumen. Para grandes volúmenes, procesa cerca del dato con la solución adecuada y deja al workflow la orquestación, notificación o decisión.',
      ],
      bullets: [
        'Estado global: ¿el workflow terminó?',
        'Task: ¿qué paso falló?',
        'Actor: ¿con qué permisos?',
        'Output: ¿qué valor se produjo?',
        'Tamaño: ¿el resultado cabe?',
        'Logs: ¿qué evidencia explica el fallo?',
      ],
      sourceRefs: [
        {
          title: 'Workflow actions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/actions',
          kind: 'official-docs',
        },
        {
          title: 'Jinja expressions for Workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/reference',
          kind: 'official-docs',
        },
        {
          title: 'Execute DQL Query action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/dql-query-workflow-action',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'debug-workflow',
      title: 'Depurar una ejecución',
      lead: 'La ejecución es la evidencia de lo que realmente ocurrió.',
      paragraphs: [
        'Cuando un workflow no se ejecuta, distingue draft de workflow live, trigger habilitado de trigger deshabilitado y ejecución manual de ejecución automática. Cuando se ejecuta y falla, revisa actor, consentimiento, permisos de la action, input, sistema destino, timeout y respuesta.',
        'No resuelvas un error de autorización dando permisos globales por defecto. Identifica el permiso mínimo, el contexto del actor y si el usuario que edita el workflow es distinto del que lo ejecuta. Una corrección correcta deja evidencia reproducible.',
      ],
      bullets: [
        'Estado del workflow y versión publicada.',
        'Tipo de trigger y condición de coincidencia.',
        'Actor, owner y consentimiento.',
        'Input real de esa ejecución.',
        'Error de task y respuesta del destino.',
        'Reintento o rollback controlado.',
      ],
      sourceRefs: [
        {
          title: 'Jinja expressions for Workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/reference',
          kind: 'official-docs',
        },
        {
          title: 'Execute DQL Query action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/dql-query-workflow-action',
          kind: 'official-docs',
        },
        {
          title: 'Run JavaScript action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/run-javascript-workflow-action',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-workflow-anatomy',
      title: 'Anatomía de un Workflow y tipos de acciones',
      lead: 'Un workflow es un grafo de trigger, tasks, actions, condiciones y resultados.',
      paragraphs: [
        'Un workflow puede arrancar on demand, por event, por schedule o mediante llamada API externa. Sus tasks ejecutan acciones nativas: Execute DQL Query (para recuperar registros de Grail), Run JavaScript (para ejecutar lógica de negocio algorítmica y llamar a APIs externas con fetch), HTTP Request, y notificaciones (Slack, Jira, ServiceNow, Email).',
        'Draft y live son estados distintos: los triggers automáticos solo arrancan la versión live publicada, aunque ambos estados pueden ser ejecutados de forma manual durante el desarrollo.',
        'Run JavaScript no admite expresiones en su input, para evitar la inyección de código: si escribes `{{ event()["event.type"] }}` o `{{ result("task") }}` dentro del script, no se evalúa. El script lee el contexto con el SDK @dynatrace-sdk/automation-utils: execution() para el evento que activó el workflow y result("task") para el resultado de una task anterior.',
        'Todas las llamadas HTTP de Workflows (HTTP Request y fetch en Run JavaScript) se validan contra la allowlist global de External requests: antes de llamar a un dominio externo nuevo hay que añadirlo en Settings > General > External requests (New host pattern). Si falta, la llamada falla aunque la URL y la credencial sean correctas.',
      ],
      comparison: {
        headers: ['Tipo de Tarea en Workflow', 'Capacidad Técnica', 'Restricción de Seguridad'],
        rows: [
          [
            'Execute DQL Query',
            'Consulta Grail y expone `records`, `types` y `metadata`',
            'Sujeto a permisos de lectura de storage del actor',
          ],
          [
            'Run JavaScript',
            'Lógica JavaScript/TypeScript en el Dynatrace JavaScript runtime',
            'No admite templating Jinja en input por seguridad',
          ],
          ['HTTP Request', 'Llamadas a webhooks y servicios externos', 'Requiere endpoints y credenciales autorizados'],
          [
            'Run Workflow',
            'Ejecución separada de la versión live de un sub-workflow',
            'El actor necesita automation:workflows:run y acceso al sub-workflow',
          ],
        ],
      },
      sourceRefs: [
        { title: 'Workflows', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows', kind: 'official-docs' },
        { title: 'AutomationEngine', url: 'https://docs.dynatrace.com/docs/platform/automationengine', kind: 'official-docs' },
        {
          title: 'Event triggers for workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-dql-js-actions',
      title: 'Execute DQL Query y Run JavaScript en detalle',
      lead: 'Cada action tiene sus campos, sus valores por defecto y su forma de fallar.',
      paragraphs: [
        'Execute DQL Query admite cuatro campos: DQL query, Filter segment, Timezone y Fail on empty result. Su resultado tiene tres propiedades de la Grail Query API: records (las filas), types (el esquema) y metadata (detalles de ejecución como timeframe, bytes escaneados e id de la consulta). La action no escribe en buckets: su resultado queda en la ejecución del workflow.',
        'Diferencias con Notebooks y Dashboards: la action usa UTC si no se configura Timezone (Notebooks y Dashboards aplican automáticamente la zona horaria del navegador o la configurada en user settings; la action no tiene acceso a user settings), y las anclas de calendario como -1M@M se evalúan en esa zona. Si la consulta no fija timeframe, se usan las últimas 2 horas.',
        'Success significa que la consulta se ejecutó sin error, no que devolviera filas: una task puede terminar en Success con records=[]. Fail on empty result hace fallar la task si no hay records, de modo que una rama con condición de estado error puede reaccionar. Para leer campos sin riesgo, comprueba antes `{{ result("dql_task")["records"] | length > 0 }}`.',
        'Run JavaScript ejecuta un script que debe exportar por defecto una función async (export default async function), invocada por el Dynatrace JavaScript runtime. Ese runtime no tiene contexto de app ni de navegador, así que los paquetes SDK que lo necesitan no funcionan, ni las librerías que dependen de módulos de Node.js como fs, net o tls. Límites: 120 segundos de timeout del runtime, 256 MB de RAM y 6 MB de resultado de la task.',
        'Lo que devuelve la función es el resultado de la task, aunque contenga ok: false: la task termina en Success. Para marcarla como fallida y activar una rama de error, el script debe lanzar una excepción no gestionada (throw new Error()). La action no admite expresiones en su input para evitar code injection: los resultados de tasks previas se leen con `await result("task")` de @dynatrace-sdk/automation-utils o con executionsClient de @dynatrace-sdk/client-automation.',
      ],
      code: 'import { result } from \'@dynatrace-sdk/automation-utils\';\n\nexport default async function () {\n  const r = await result(\'get_orders\');\n  if (r.records.length === 0) {\n    throw new Error(\'Sin pedidos\');   // la task termina en Error\n  }\n  return { count: r.records.length }; // resultado de la task (máx. 6 MB)\n}',
      codeNote: 'return produce un resultado normal (Success); solo una excepción no gestionada hace fallar la task.',
      sourceRefs: [
        {
          title: 'Execute DQL Query workflow action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/dql-query-workflow-action',
          kind: 'official-docs',
        },
        {
          title: 'Run JavaScript workflow action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/run-javascript-workflow-action',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-http-run-workflow',
      title: 'HTTP Request y Run workflow',
      lead: 'Llamar a otro sistema o a otro workflow tiene reglas propias.',
      paragraphs: [
        'HTTP Request configura Method, URL, Payload, Headers, Authentication y qué códigos de respuesta hacen fallar la task. Su resultado incluye status_code, body, headers y, si la respuesta es JSON, json con el contenido ya parseado. Si para tu caso de uso una respuesta como 404 es aceptable, desactiva la opción de fallar según códigos de respuesta HTTP o define qué códigos deben hacer fallar la task. Todas las llamadas se validan contra una allowlist global de hosts.',
        'Run workflow crea una ejecución separada de otro workflow (sub-workflow) y ejecuta siempre su versión live. La lista de candidatos solo muestra workflows a los que tienes acceso y excluye los simple workflows y los que solo existen como draft. El input de la task se fusiona con el input por defecto del sub-workflow, que lo lee con input(), y el resultado de la action es el workflow result definido en el sub-workflow.',
        'No se permiten recursiones directas ni indirectas de ejecuciones (A invoca a B y B invoca a A). El actor del workflow padre necesita automation:workflows:run y acceso al workflow seleccionado.',
      ],
      bullets: [
        'HTTP Request → status_code, body, headers, json.',
        'Execute DQL Query → records, types, metadata.',
        'Run workflow → el workflow result del sub-workflow.',
        'Run JavaScript → lo que devuelve la función exportada.',
      ],
      sourceRefs: [
        {
          title: 'HTTP Request workflow action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/http-request-workflow-action',
          kind: 'official-docs',
        },
        {
          title: 'Run workflow action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/run-workflow-action',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-actor-permissions',
      title: 'Actor, Service Users y permisos IAM en Workflows',
      lead: 'El servicio de automatización nunca supera los permisos del actor configurado.',
      paragraphs: [
        'Cada ejecución de un flujo ocurre en el contexto de un actor. En entornos de producción colaborativos, es una mala práctica dejar al creador personal como actor, ya que si el usuario pierde privilegios o abandona la empresa, el workflow fallará con errores 403. Para solucionar esto, se configuran Service Users (usuarios de servicio desatendidos), lo cual requiere el permiso IAM `iam:service-users:use`.',
        'Asimismo, la gestión del ciclo de vida del flujo se controla mediante permisos específicos de la capability de Automation: para crear, editar triggers o modificar tasks de un workflow se exige el permiso `automation:workflows:write`. Para ejecutarlo manualmente se requiere `automation:workflows:run`.',
        'El actor es la identidad en cuyo contexto se ejecutan las tasks y determina qué permisos pueden usar sus actions; el owner o quien pulsa Run no lo sustituyen. Inicialmente el actor es el creador, y al actualizar el workflow quien lo modifica pasa automáticamente a ser el actor, salvo que el cambio se haga en admin mode o que el actor sea un service user.',
        'Con iam:service-users:use puedes seleccionar como actor los service users que se te han concedido. Dynatrace recomienda service users con permisos mínimos para workflows colaborativos de producción, porque no dependen de la cuenta de una persona.',
      ],
      bullets: [
        'iam:service-users:use: autoriza a vincular un Service User como actor de ejecución.',
        'automation:workflows:write: permiso para crear, modificar y eliminar workflows.',
        'automation:workflows:run: permiso para iniciar ejecuciones bajo demanda o por API.',
        'Principio de mínimo privilegio: otorgar solo lectura de las tablas estrictamente consultadas.',
      ],
      sourceRefs: [
        {
          title: 'Workflow triggers',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger',
          kind: 'official-docs',
        },
        {
          title: 'Manage workflow permissions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security',
          kind: 'official-docs',
        },
        {
          title: 'Monitor workflow executions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-workflow-permissions',
      title: 'Permisos de Workflows, visibilidad y autorización',
      lead: 'Quién ve, edita o ejecuta un workflow es distinto de con qué identidad corre.',
      paragraphs: [
        'Permisos IAM: automation:workflows:read permite ver workflows; automation:workflows:write, crear, actualizar y borrar workflows, incluida la configuración de schedules y Event triggers; automation:workflows:run, ejecutarlos manualmente desde la UI o por API; y automation:workflows:admin da acceso a todos los workflows y ejecuciones del entorno y permite gestionar los de owners que ya no están disponibles (en Workflow admin mode). La condición automation:workflow-type = "SIMPLE" limita write a workflows de un trigger y una task, que no consumen workflow hours.',
        'Por defecto un workflow es private: solo el owner puede verlo, gestionarlo y ejecutarlo. Para compartirlo, el owner lo hace public (visible para usuarios con permisos de Workflows) o transfiere la propiedad a otro usuario o a un grupo. El acceso a una ejecución depende de la propiedad y la visibilidad que tenía el workflow cuando comenzó la ejecución: cambiarlas solo afecta a ejecuciones futuras.',
        'La primera vez que ejecutas un workflow en un entorno, Dynatrace pide autorizar a AutomationEngine a ejecutar workflows en tu nombre (Allow and run). Qué permisos puede ejercer AutomationEngine se configura en Settings > Authorization settings de la app Workflows, con las listas Primary permissions y Secondary permissions. Un 403 en una task apunta a dos comprobaciones: que el actor tenga el permiso (por ejemplo, lectura de eventos) y que AutomationEngine esté autorizado a usarlo. app-engine:functions:run se necesita para usar el function executor.',
      ],
      comparison: {
        headers: ['Permiso', 'Permite', 'No permite'],
        rows: [
          ['automation:workflows:read', 'Ver workflows', 'Ejecutar ni editar'],
          ['automation:workflows:run', 'Ejecutar con Run o por API', 'Modificar tasks o triggers'],
          ['automation:workflows:write', 'Crear, actualizar y borrar, con triggers', 'Saltarse owner y visibilidad'],
          ['automation:workflows:admin', 'Todos los workflows y ejecuciones', '— (no es mínimo privilegio para un uso normal)'],
          ['iam:service-users:use', 'Elegir un service user como actor', 'Gestionar workflows'],
        ],
      },
      sourceRefs: [
        {
          title: 'Manage workflow permissions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security',
          kind: 'official-docs',
        },
        {
          title: 'Get started with Workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/quickstart',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-execution-states',
      title: 'Ejecución, tasks, retries y loops',
      lead: 'El estado final del workflow depende de la ejecución de sus tasks y actions.',
      paragraphs: [
        'Una workflow execution instancia el workflow; una task execution instancia una task; una action execution es la invocación concreta. Una ejecución puede estar Running, Success, Error o Canceled. Una task puede estar Idle, Running, Success, Error, Skipped, Discarded, Canceled o Waiting for approval. Entender esta jerarquía permite localizar si el fallo ocurrió antes de ejecutar, durante la acción o al evaluar una condición.',
        'Retries generan múltiples action executions dentro de una task; loops generan una ejecución por iteración y el resultado es una lista. Las condiciones de sucesores determinan si una task continúa tras error, cancelación o skip. El execution monitor conserva logs, input, params y result para revisar el camino real. No confundas “action returned successfully” con “query returned records”.',
        'Estados de la workflow execution: Running (al menos una task está Idle o Running), Success (terminaron todas las tasks cuyas condiciones se cumplieron y no queda ninguna task fallida sin gestionar), Error (al menos una task fallida sin gestionar) y Canceled (el usuario canceló el workflow o una task).',
        'Estados de task: Idle (aún no se ha disparado porque sus predecesoras no han terminado), Running (al menos una action execution está en curso o pendiente), Success, Error (también al vencer el timeout), Skipped, Discarded, Canceled y Waiting for approval, que indica que la task está en pausa esperando que un usuario la apruebe o la rechace manualmente.',
      ],
      comparison: {
        headers: ['Objeto', 'Qué representa', 'Diagnóstico'],
        rows: [
          ['Workflow execution', 'una ejecución completa', 'estado global y trigger'],
          ['Task execution', 'una task dentro de una ejecución', 'condiciones, retries y sucesores'],
          ['Action execution', 'una invocación concreta', 'input, output, timeout y error'],
          ['Workflow result', 'resultado final evaluado', 'JSON válido y tamaño permitido'],
        ],
      },
      sourceRefs: [
        {
          title: 'Workflow actions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/actions',
          kind: 'official-docs',
        },
        {
          title: 'Jinja expressions for Workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/reference',
          kind: 'official-docs',
        },
        {
          title: 'Execute DQL Query action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/dql-query-workflow-action',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-task-options',
      title: 'Task conditions y task options',
      lead: 'Las condiciones deciden si una task corre; las opciones, cómo corre.',
      paragraphs: [
        'Cada task tiene una condición de estado sobre sus predecesoras. La opción por defecto es success or skipped (la predecesora terminó bien o se omitió); las demás son success, error or cancelled, error y any (cualquier resultado). Además puedes añadir una custom condition con una expresión Jinja que devuelva un booleano, por ejemplo `{{ result("task_1").foo == "bar" }}`. Si las condiciones no se cumplen eliges qué hacer: Skip omite la task (estado Skipped) y continúa con las siguientes; Stop detiene la ejecución en esa rama (estado Discarded).',
        'Task options: Wait before retrasa el inicio de la task (0 segundos por defecto, máximo 86.400 segundos, admite expresiones). Retry on error reintenta la task con Number of retries (2 por defecto) y Delay between retries (30 segundos por defecto); no se documenta backoff exponencial. El timeout de la task es de 60 minutos por defecto y puede ampliarse hasta 7 días; el timeout del Dynatrace runtime (120 segundos por defecto) limita cada action individual, así que una task solo dura más ejecutando varias actions en loop o con retries, y ese tiempo total es el que cuenta para el timeout de la task.',
        'Loop task recorre una lista: configuras Item variable name, List y, opcionalmente, Concurrency, y el elemento actual se referencia con `{{ _.<item variable name> }}`, por ejemplo `{{ _.host }}`. Cada iteración crea una action execution y la task falla si falla cualquier iteración; con Retry on error solo se reintentan las iteraciones fallidas.',
        'Con reintentos hay una única task execution con una action execution por intento: la task termina en Success con el primer intento correcto y en Error si fallan todos. El timeout cubre todos los intentos: la task falla en cuanto vence, aunque una action en curso termine después.',
      ],
      comparison: {
        headers: ['Opción', 'Valor por defecto', 'Límite o nota'],
        rows: [
          ['Wait before', '0 segundos', 'Máximo 86.400 segundos'],
          ['Retry on error', '2 reintentos, 30 s entre ellos', 'Con loops, solo iteraciones fallidas'],
          ['Timeout', '60 minutos', 'Hasta 7 días; cubre los reintentos'],
          ['Loop task', 'Concurrency opcional', 'Elemento actual: {{ _.<item variable name> }}'],
        ],
      },
      sourceRefs: [
        {
          title: 'Build workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build',
          kind: 'official-docs',
        },
        {
          title: 'Monitor workflow executions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'sup-execution-control',
      title: 'Cancelar, repetir y conservar ejecuciones',
      lead: 'El monitor de ejecuciones permite intervenir y deja evidencia durante un tiempo limitado.',
      paragraphs: [
        'Cancel task deja terminar la iteración en curso y la task finaliza en Canceled; sus sucesoras siguen sus condiciones. Cancel execution deja terminar las tasks en curso, no inicia ninguna nueva y la ejecución termina en Canceled. Rerun repite una ejecución con el input y los parámetros originales, y el contexto del evento original sigue accesible mediante expresiones.',
        'La información de ejecución de workflow, tasks y actions se conserva 30 días desde el inicio de la ejecución, y una ejecución puede durar como máximo 30 días. El resultado de una action execution no puede superar 6 MB menos el tamaño de los logs de esa ejecución. El workflow result se compila a partir de resultados de tasks con expresiones: debe evaluarse a JSON válido y no superar 10 MB, o la ejecución falla. El input por defecto del workflow tiene el mismo límite de 10 MB.',
      ],
      bullets: [
        'Cancel task → termina la iteración actual → Canceled.',
        'Cancel execution → no empieza ninguna task nueva → Canceled.',
        'Rerun → mismo input y parámetros que la ejecución original.',
        'Retención → 30 días desde el inicio de la ejecución.',
        'Límites → 6 MB por action result; 10 MB y JSON válido para el workflow result.',
      ],
      sourceRefs: [
        {
          title: 'Monitor workflow executions',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running',
          kind: 'official-docs',
        },
        {
          title: 'Build workflows',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-jinja-dql',
      title: 'Jinja, DQL y datos entre tasks',
      lead: 'Las expresiones dinámicas tienen contexto, límites y reglas de seguridad.',
      paragraphs: [
        'Workflows usa Jinja con `{{ ... }}` para expresiones y `{% ... %}` para statements y estructuras de control. Puedes acceder a resultados de tareas predecesoras, event context, execution, calendarios y funciones, siempre en el contexto del actor. El Run JavaScript action es una excepción importante: no admite expresiones Jinja en su input para evitar code injection; usa sus SDKs y contexto nativo.',
        'La acción Execute DQL Query devuelve `records`, `types` y `metadata`. Usa UTC si no se configura Timezone, las últimas 2 horas si la consulta no fija timeframe y como máximo 1.000 records por defecto (amplíalo con limit). Si una query no devuelve records, la action puede estar en Success salvo que actives Fail on empty result. Pasa datos pequeños y estructurados entre tasks; no conviertas Workflows en pipeline de datos masivo.',
        'Funciones de expresión: result("task") devuelve el resultado de una task anterior de la misma ejecución; input() el input del workflow (el input por defecto fusionado con el de la ejecución); event() el evento que activó el workflow; execution() el contexto de la ejecución (id, estado, tiempos); environment() datos del entorno como id y url; y problem_link() la URL del Problem en la app Problems, solo en workflows con Problem trigger. Las claves que contienen puntos se leen con corchetes: `{{ event()["event.type"] }}`.',
        'Filtros útiles: length devuelve el número de elementos de una lista (o de caracteres de una cadena), to_json convierte un objeto a JSON y md_table convierte el resultado de una consulta DQL o una lista de objetos en una tabla markdown, por ejemplo `{{ result("query_task") | md_table }}`. Dentro de un bloque `{% for %}` existen variables como loop.index o loop.last; en una loop task, en cambio, el elemento actual se lee con `{{ _.<item variable name> }}`.',
        'Execute DQL Query devuelve por defecto como máximo 1.000 records; para obtener más se usa el comando limit con un valor mayor.',
      ],
      code: '{{ result("query_task")["records"] | length > 0 }}\n\ndata json:"""{{ event()|to_json }}"""\n| fields timestamp, event.name, event.id',
      codeNote: 'Comprueba existencia antes de acceder al primer record y fija timezone/timeframe cuando la decisión dependa del calendario.',
      sourceRefs: [
        {
          title: 'Execute DQL Query action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/dql-query-workflow-action',
          kind: 'official-docs',
        },
        {
          title: 'Run JavaScript action',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions/run-javascript-workflow-action',
          kind: 'official-docs',
        },
        {
          title: 'Create a simple workflow',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/simple-workflow',
          kind: 'official-docs',
        },
      ],
    },
    {
      id: 'deep-workflow-limits',
      title: 'Event Triggers: límites de 1.000 caracteres y Simple Workflows',
      lead: 'Conoce las restricciones operativas y límites de ejecución de AutomationEngine.',
      paragraphs: [
        'Los Event Triggers permiten activar workflows automáticamente cuando entra un evento (Problems, Davis events, Business events o eventos de sistema). La expresión compilada de filtrado DQL en la configuración del Event Trigger tiene un límite máximo estricto de 1.000 caracteres. Además, cada workflow admite como máximo 1.000 ejecuciones event-triggered por hora; al superarlo se aplica throttling (HTTP 429).',
        'Un Simple Workflow está compuesto por un único trigger y una única acción directa (por ejemplo, enviar un correo al detectar un problema). No consume horas de workflow directamente. Sin embargo, en el momento en que se agrega una segunda tarea al diseño, el flujo se convierte en un Workflow estándar.',
        'Superar estos límites no trunca nada: un workflow result que no es JSON válido o que supera 10 MB hace fallar la ejecución del workflow, y una action execution cuyo resultado pasa de 6 MB menos sus logs hace fallar la task.',
      ],
      bullets: [
        'Filtro DQL en Event Trigger: máximo 1.000 caracteres compilados.',
        'Límite horario de Event Trigger: hasta 1.000 ejecuciones por hora y por workflow.',
        'Simple Workflow: exactamente 1 trigger y 1 task; no consume horas de workflow.',
        'Action result limit: máximo 6 MB menos el tamaño de los logs de la ejecución.',
        'Workflow result limit: máximo 10 MB para el resultado global consolidado.',
      ],
      sourceRefs: [
        {
          title: 'Create a simple workflow',
          url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/simple-workflow',
          kind: 'official-docs',
        },
        { title: 'Workflows', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows', kind: 'official-docs' },
        { title: 'AutomationEngine', url: 'https://docs.dynatrace.com/docs/platform/automationengine', kind: 'official-docs' },
      ],
    },
  ],
  masteryChecklist: [
    'Diferencio los tres grupos principales de trigger.',
    'Explico actor, owner y permisos.',
    'Sé por qué Workflows no es ingestión masiva.',
    'Puedo diseñar un flujo con validación, error y mínimo privilegio.',
    'Sé razonar un simple workflow desde input hasta output.',
    'Puedo explicar la precisión del event trigger y sus límites.',
    'Diferencio estado global, task, logs y resultado.',
    'Depuro sin conceder permisos más amplios de los necesarios.',
    'Puedo localizar la fuente oficial de cada bloque y explicar su condición de aplicabilidad.',
    'Puedo resolver un escenario y justificar por qué los distractores no encajan.',
  ],
}
