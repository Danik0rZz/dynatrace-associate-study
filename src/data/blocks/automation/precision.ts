import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Automation».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión de Workflows y AutomationEngine',
  intro: 'Los escenarios de automation suelen probar cuándo se ejecuta el flujo, quién lo ejecuta, qué permisos hereda y qué límite impide usarlo como una canalización masiva.',
  rows: [
    {
      topic: 'iam:service-users:use',
      fact: 'Para desacoplar un workflow de cuentas personales y ejecutarlo de forma desatendida se requiere el permiso `iam:service-users:use` para vincular un Service User.',
      examNote: 'Evita que la automatización falle si el empleado que creó el workflow abandona la organización.',
      source: { title: 'Manage workflow permissions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security' },
    },
    {
      topic: 'automation:workflows:write',
      fact: 'Crear, actualizar o eliminar la definición de un flujo de trabajo requiere el permiso IAM `automation:workflows:write`.',
      examNote: 'Tener permiso para ejecutar manualmente un workflow no autoriza a modificar sus tareas o triggers.',
      source: { title: 'Manage workflow permissions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security' },
    },
    {
      topic: 'Filtros de Event Trigger',
      fact: 'La expresión compilada de filtrado DQL en un Event Trigger no puede superar los 1.000 caracteres de longitud.',
      examNote: 'Diseña filtros concisos sobre campos clave en vez de queries extensas multilínea.',
      source: {
        title: 'Event triggers for workflows',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
      },
    },
    {
      topic: 'Acciones JS vs DQL en Workflows',
      fact: 'Las tareas JavaScript permiten ejecutar lógica algorítmica compleja y consumir APIs REST externas; las tareas DQL consultan directamente Grail.',
      examNote: 'JavaScript no sustituye a DQL para recuperar millones de registros de telemetría.',
      source: { title: 'Workflows', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows' },
    },
    {
      topic: 'Trigger categories',
      fact: 'Las categorías principales son On demand, Event y Schedule; una API puede disparar un workflow live independientemente del tipo de trigger.',
      examNote: 'Los triggers automáticos solo aplican a live workflows; el draft puede ejecutarse manualmente.',
      source: { title: 'Workflow triggers', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger' },
    },
    {
      topic: 'Problem trigger',
      fact: 'Reacciona al Problem como situación agrupada cuando abre, cambia o resuelve.',
      examNote: 'No es igual que reaccionar a cada Davis event individual.',
      source: {
        title: 'Event triggers for workflows',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
      },
    },
    {
      topic: 'Davis event trigger',
      fact: 'Reacciona a alertas individuales cuando Dynatrace Intelligence detecta anomalías.',
      examNote: 'Si necesitas el conjunto agrupado, estudia Problem trigger.',
      source: {
        title: 'Event triggers for workflows',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
      },
    },
    {
      topic: 'Event trigger',
      fact: 'Puede reaccionar a events, bizevents, security.events o dt.system.events mediante filtro DQL según el tipo.',
      examNote: 'El actor necesita permisos de lectura del event type correspondiente.',
      source: {
        title: 'Event triggers for workflows',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
      },
    },
    {
      topic: 'Límites de trigger',
      fact: 'Los event triggers tienen límite de 1.000 ejecuciones por hora y expresión compilada de filtro de 1.000 caracteres.',
      examNote: 'Usa Query past events y reduce volumen antes de desplegar.',
      source: {
        title: 'Event triggers for workflows',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
      },
    },
    {
      topic: 'Actor',
      fact: 'Cada ejecución de task ocurre en el contexto de un user actor; por defecto puede ser el creador o último editor, salvo configuración de service user.',
      examNote: 'AutomationEngine no puede superar los permisos reales del usuario actor.',
      source: { title: 'Manage workflow permissions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security' },
    },
    {
      topic: 'Consentimiento',
      fact: 'La primera ejecución puede requerir autorizar los permisos que AutomationEngine ejercerá con ese actor.',
      examNote: 'Un 403 suele apuntar a permisos del usuario, authorization settings o tarea.',
      source: { title: 'Manage workflow permissions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security' },
    },
    {
      topic: 'Simple workflow',
      fact: 'Está limitado a un trigger y una task; no consume workflow hours directamente, aunque las acciones pueden consumir otras capacidades.',
      examNote: 'Un simple workflow no admite las acciones Run JavaScript, Run workflow ni la de aprobación; añadir una segunda task, conditions, task options, workflow result o logs completos lo convierte en workflow estándar; quitar lo añadido no lo devuelve a simple: para recuperar un simple workflow hay que crear uno nuevo o restaurar una versión anterior desde version history.',
      source: {
        title: 'Create a simple workflow',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/simple-workflow',
      },
    },
    {
      topic: 'Action result',
      fact: 'Los resultados de action execution no pueden superar 6 MB menos el tamaño de logs de la ejecución.',
      examNote: 'AutomationEngine es un orquestador, no un data pipeline para mover grandes volúmenes.',
      source: { title: 'Monitor workflow executions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running' },
    },
    {
      topic: 'Workflow result',
      fact: 'Un workflow result inválido o mayor de 10 MB hace fallar la ejecución; los simple workflows no tienen workflow result.',
      examNote: 'Valida JSON y tamaño antes de devolver resultados.',
      source: { title: 'Monitor workflow executions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/running' },
    },
    {
      topic: 'Workflows vs ingestion',
      fact: 'La documentación indica que Workflows no está pensado para ingestión o exportación masiva; usa OpenPipeline o soluciones específicas.',
      examNote: 'Este distractor aparece como “automatizar todo con un workflow”.',
      source: { title: 'Workflows', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows' },
    },
    {
      topic: 'Service user',
      fact: 'Para usos colaborativos o productivos se recomienda actor service user con mínimo privilegio.',
      examNote: 'Usar una identidad personal hace frágil la continuidad cuando cambia el usuario.',
      source: { title: 'Manage workflow permissions', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/security' },
    },
    {
      topic: 'Permisos del Event trigger por tipo de dato',
      fact: 'Además de storage:buckets:read sobre el bucket, el actor necesita storage:events:read para events (y para Problem trigger y Davis event trigger), storage:bizevents:read para bizevents, storage:security.events:read para security.events y storage:system:read para dt.system.events.',
      examNote: 'storage:logs:read no interviene: logs no es un tipo de dato del Event trigger.',
      source: {
        title: 'Event triggers for workflows',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/build/trigger/event-trigger',
      },
    },
  ],
}
