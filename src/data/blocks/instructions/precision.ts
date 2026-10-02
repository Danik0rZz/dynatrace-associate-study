import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Instructions».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión sobre preparación, requisitos y examen',
  intro: 'Requisitos técnicos indispensables, políticas de proctoring y estrategias analíticas para abordar preguntas de certificación sin caer en trampas de lectura.',
  rows: [
    {
      topic: 'Arquitectura Web Multicapa',
      fact: 'El examen asume dominio de arquitecturas multicapa: balanceador de carga, frontend web, backend de microservicios y bases de datos relacionales/NoSQL.',
      examNote: 'Localizar el cuello de botella requiere relacionar llamadas HTTP de servicios con queries de base de datos.',
      source: {
        title: 'Associate Certification Learning Plan',
        url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
      },
    },
    {
      topic: 'Lectura Adversarial de Enunciados',
      fact: 'Examina los términos absolutistas: "only", "always", "first step", "best practice", "write permission" y la variante de plataforma solicitada.',
      examNote: 'Una opción técnicamente cierta en general es incorrecta si no responde a la restricción exacta de la pregunta.',
      source: {
        title: 'Associate Certification Learning Path 2025',
        url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
      },
    },
    {
      topic: 'Simulaciones y Transferencia Práctica',
      fact: 'Associate no evalúa memorización estéril sino capacidad de interpretar pantallas, tablas DQL, logs y árboles causales de problemas reales.',
      examNote: 'Ante dos respuestas posibles, prioriza siempre el siguiente paso que reduce mayor incertidumbre técnica.',
      source: {
        title: 'Associate Certification Learning Path 2025',
        url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
      },
    },
    {
      topic: 'Conectividad saliente: 443 y 9999',
      fact: 'La comunicación de OneAgent hacia Dynatrace es solo saliente: por el puerto 443 directamente al clúster SaaS, o por el puerto 9999 hacia un Environment ActiveGate, que a su vez sale al clúster SaaS por el 443.',
      examNote: 'Los hosts monitorizados no necesitan puertos inbound; solo el Environment ActiveGate escucha en el 9999 para sus OneAgents.',
      source: {
        title: 'Supported connectivity schemes for ActiveGates',
        url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate/supported-connectivity-schemes-for-activegates',
      },
    },
    {
      topic: 'Proxy en OneAgent y ActiveGate',
      fact: 'OneAgent define el proxy con `--set-proxy` (instalador u oneagentctl); ActiveGate lo define en `custom.properties`, sección `[http.client]` (`proxy-server`, `proxy-port`…). En ambos casos se reinicia el servicio.',
      examNote: 'Si un firewall bloquea el acceso directo a internet, un Environment ActiveGate o un proxy corporativo es el canal de salida.',
      source: {
        title: 'Set up proxy authentication for ActiveGate',
        url: 'https://docs.dynatrace.com/docs/ingest-from/dynatrace-activegate/configuration/set-up-proxy-authentication-for-activegate',
      },
    },
    {
      topic: 'Jerarquía lógica de Kubernetes',
      fact: 'Jerarquía lógica: Cluster → Namespace → Workload (Deployment, DaemonSet, StatefulSet…) → Pod → Container. El Node es la máquina donde el scheduler coloca los Pods; el Namespace es una partición lógica de todo el clúster, no de un Node.',
      examNote: 'Los procesos de los contenedores de un Pod aparecen como process group instances (PGI) en el host que representa al Node; el Pod no se convierte en un host ni en un PGI.',
      source: {
        title: 'Kubernetes app',
        url: 'https://docs.dynatrace.com/docs/observe/infrastructure-observability/container-platform-monitoring/kubernetes-app',
      },
    },
    {
      topic: 'Formato y supervisión del examen',
      fact: 'Según el Learning Path oficial, el examen tiene 60 preguntas escritas (multiple-choice y multiple-response) y 10-15 preguntas prácticas; solo la parte práctica es open book. Lo supervisa ProctorU, con proctoring solo en inglés.',
      examNote: 'Comprueba los requisitos técnicos y de identidad vigentes en la web de ProctorU y de Dynatrace University antes de reservar.',
      source: {
        title: 'Associate Certification Learning Path 2025',
        url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
      },
    },
    {
      topic: 'Búsqueda en la documentación (parte práctica)',
      fact: 'En la parte práctica (open book), la búsqueda en la documentación oficial debe ser quirúrgica: busca por término exacto (`app-engine:*`, nombres de tablas) y verifica la versión Latest.',
      examNote: 'Revisa siempre el banner de versión en Docs; las rutas o permisos Classic son distractores frecuentes.',
      source: {
        title: 'Associate Certification Learning Path 2025',
        url: 'https://community.dynatrace.com/pssft35649/attachments/pssft35649/GetStarted/1351/1/Associate_Certification_Learning_Path_2025.pdf',
      },
    },
  ],
}
