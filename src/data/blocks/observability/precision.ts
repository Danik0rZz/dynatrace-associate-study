import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Monitoring & Infrastructure Observability».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos críticos de OneAgent e Infrastructure Observability',
  intro: 'Este bloque es deliberadamente memorizable: contiene las distinciones de capacidades, modos, comunicación e inyección que suelen esconderse detrás de preguntas aparentemente sencillas.',
  rows: [
    {
      topic: 'Capacidades',
      fact: 'OneAgent puede cubrir RUM web/mobile, server-side services, host/process/network, cloud/VM, Docker containers, logs y root-cause analysis, según soporte.',
      examNote: 'La palabra “puede” está condicionada por tecnología, versión, plataforma, modo y configuración.',
      source: { title: 'OneAgent monitoring capabilities', url: 'https://docs.dynatrace.com/docs/platform/oneagent/supported-monitoring-types' },
    },
    {
      topic: 'Arquitectura',
      fact: 'OneAgent usa procesos especializados para métricas del sistema, instrumentación de procesos, logs y comunicación con Dynatrace.',
      examNote: 'Instalar el agente no prueba que cada proceso tenga deep monitoring.',
      source: { title: 'How OneAgent works', url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works' },
    },
    {
      topic: 'Comunicación',
      fact: 'OneAgent inicia comunicación outbound-only hacia el Cluster o a través de ActiveGate usando HTTP/S; WebSocket se reserva para Live Debugger.',
      examNote: 'No confundas el canal de comunicación con code-module injection.',
      source: { title: 'How OneAgent works', url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works' },
    },
    {
      topic: 'Full-Stack',
      fact: 'Ofrece la mayor profundidad: host/process details, runtime metrics, tracing/profiling y process injection según soporte.',
      examNote: 'Es el modo a evaluar para aplicaciones críticas de negocio cuando se necesita profundidad.',
      source: { title: 'OneAgent monitoring modes', url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes' },
    },
    {
      topic: 'Infrastructure',
      fact: 'Proporciona infraestructura, logs, AIOps y backing services; process injection está habilitado por defecto para runtime metrics, salvo condiciones de despliegue.',
      examNote: 'Reduce profundidad de aplicación frente a Full-Stack; no equivale a “sin procesos”.',
      source: { title: 'OneAgent monitoring modes', url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes' },
    },
    {
      topic: 'Discovery',
      fact: 'Es un modo ligero de basic monitoring para descubrir hosts/procesos; code-module injection está desactivado por defecto y está ligado a Foundation & Discovery en DPS.',
      examNote: 'No incluye tracing and profiling (solo Full-Stack lo tiene) y no debe venderse como Full-Stack barato.',
      source: { title: 'OneAgent monitoring modes', url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes' },
    },
    {
      topic: 'Activación',
      fact: 'Durante la instalación se puede usar “--set-monitoring-mode=infra-only” o “--set-monitoring-mode=discovery”; desde la UI también se cambia el modo.',
      examNote: 'Después de cambiar auto-injection, los procesos monitorizados deben reiniciarse.',
      source: {
        title: 'Enable OneAgent monitoring modes',
        url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
      },
    },
    {
      topic: 'Inyección',
      fact: 'El módulo inyectado se enlaza dinámicamente al proceso y no se retira solo por detener OneAgent; normalmente requiere reiniciar el proceso.',
      examNote: '“OneAgent stopped” y “módulo retirado” son estados diferentes.',
      source: { title: 'OneAgent monitoring modes', url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/monitoring-modes' },
    },
    {
      topic: 'Auto-injection',
      fact: 'Se puede desactivar por host (configuración del host o “--set-auto-injection-enabled=false”, que afecta a todo el host) o excluir procesos concretos con custom process monitoring rules.',
      examNote: 'Desactivar auto-injection también impide capacidades que dependen del code module, como AppSec o Live Debugger.',
      source: {
        title: 'Enable OneAgent monitoring modes',
        url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
      },
    },
    {
      topic: 'OneAgent CLI (oneagentctl)',
      fact: 'La utilidad `oneagentctl` permite consultar el estado del agente, cambiar parámetros de red y reconfigurar modos desde la línea de comandos local.',
      examNote: 'Se ejecuta localmente desde <INSTALL_PATH>/agent/tools y requiere root en Linux/AIX o administrador en Windows.',
      source: { title: 'How OneAgent works', url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works' },
    },
    {
      topic: 'ActiveGate Kubernetes 1.327+',
      fact: 'Para aprovechar la visibilidad mejorada de objetos de Kubernetes (Enhanced Object Visibility), el ActiveGate debe estar en versión 1.327 o superior.',
      examNote: 'ActiveGates antiguos no podrán recopilar los metadatos extendidos de objetos de Kubernetes.',
      source: {
        title: 'Kubernetes monitoring',
        url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-monitoring',
      },
    },
    {
      topic: 'ActiveGate',
      fact: 'Puede actuar como gateway y soportar monitorización remota; no es un sustituto universal de OneAgent.',
      examNote: 'Para VMware, cloud o sistemas remotos revisa red, grupo, credenciales, versión y permisos.',
      source: { title: 'Infrastructure Observability', url: 'https://docs.dynatrace.com/docs/shortlink/infra-mon' },
    },
    {
      topic: 'Entidades',
      fact: 'Host aloja procesos; process group agrupa procesos; process group instance representa una ejecución; service representa una función observable.',
      examNote: 'El nivel de entidad determina el drill-down correcto.',
      source: { title: 'How OneAgent works', url: 'https://docs.dynatrace.com/docs/platform/oneagent/how-one-agent-works' },
    },
    {
      topic: 'Soporte',
      fact: 'La support matrix es el contrato para plataforma, sistema operativo, tecnología, versión y capability status.',
      examNote: 'Nunca generalices una capacidad observada en Linux/Java a cualquier tecnología.',
      source: {
        title: 'OneAgent support matrix',
        url: 'https://docs.dynatrace.com/docs/ingest-from/technology-support/oneagent-platform-and-capability-support-matrix',
      },
    },
    {
      topic: 'AppSec en Discovery',
      fact: 'En Discovery, Application Security requiere habilitar code-module injection y reiniciar el proceso; la profundidad contextual puede ser limitada.',
      examNote: 'Que el modo permita una capability no significa que venga activa ni con la misma precisión.',
      source: { title: 'Application Security', url: 'https://docs.dynatrace.com/docs/secure/application-security' },
    },
    {
      topic: 'Diagnóstico',
      fact: 'Para datos ausentes separa servicio, conexión, versión, token, modo, compatibilidad, proceso, permisos, timeframe y entidad.',
      examNote: 'El orden de comprobación es parte de la respuesta técnica.',
      source: {
        title: 'Enable OneAgent monitoring modes',
        url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
      },
    },
    {
      topic: 'Cambiar el modo de un host desde la UI',
      fact: 'Para un host ya instalado: Hosts Classic > host > More (…) > Settings > Host monitoring > Monitoring mode, elegir el modo y Save changes; después hay que reiniciar los procesos monitorizados.',
      examNote: 'Default mode (Settings > Fleet management) solo cambia el modo por defecto de las nuevas instalaciones; las custom process monitoring rules deciden la inyección por proceso, no el modo del host.',
      source: {
        title: 'Enable OneAgent monitoring modes',
        url: 'https://docs.dynatrace.com/docs/platform/oneagent/monitoring-modes/enable-monitoring-modes',
        kind: 'official-docs',
      },
    },
    {
      topic: 'ActiveGate no sustituye al OneAgent del host',
      fact: 'Se necesita un OneAgent por host para recopilar todos los datos de monitorización relevantes: OneAgent descubre los procesos del host y sus code modules instrumentan esos procesos, de donde salen los detalles de proceso y las distributed traces. ActiveGate solo actúa como proxy seguro entre OneAgents y el Cluster y monitoriza por API tecnologías donde no se instala OneAgent (cloud, VMware, SNMP…); no inyecta code modules en procesos.',
      examNote: 'Sin OneAgent en los hosts no hay traces ni detalles de proceso de las aplicaciones, por muchos ActiveGates que se desplieguen; Full-Stack, Infrastructure y Discovery son modos de OneAgent, no de ActiveGate.',
      source: { title: 'Dynatrace ActiveGate', url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate', kind: 'official-docs' },
    },
  ],
}
