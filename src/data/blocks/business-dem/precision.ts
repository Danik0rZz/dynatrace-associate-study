import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Business Analytics and DEM».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión de Business Analytics y DEM',
  intro: 'Aquí se decide si sabes separar experiencia real, pruebas controladas y hechos de negocio. Aprende el flujo y las condiciones, no solo el nombre de cada app.',
  rows: [
    {
      topic: 'Business event',
      fact: 'Es una acción o ocurrencia convertida en business-grade data, como una compra, login o pago.',
      examNote: 'Un user event de RUM no se vuelve Business Event solo por llamarlo “de negocio”.',
      source: {
        title: 'Basic concepts of Business Observability',
        url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
      },
    },
    {
      topic: 'Tablas DEM en Grail: user.events vs user.sessions',
      fact: 'En Grail, `user.events` contiene los eventos atómicos individuales de RUM mientras que `user.sessions` almacena las sesiones agregadas completas.',
      examNote: 'La duración, el bounce y las session properties están en `user.sessions`; los eventos individuales, en `user.events`, donde `dt.rum.session.id` permite contar sesiones o unir ambas tablas.',
      source: { title: 'RUM data model', url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model' },
    },
    {
      topic: 'Synthetic Scripting: api.fail()',
      fact: 'En pasos JavaScript de Synthetic clickpaths, el método `api.fail("mensaje")` fuerza el fallo inmediato del monitor con una causa documentada.',
      examNote: 'Permite validar aserciones funcionales complejas que van más allá de códigos HTTP 200.',
      source: { title: 'Synthetic Monitoring', url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic' },
    },
    {
      topic: 'Dataflow',
      fact: 'El flujo de Business Observability es capture → process → analyze; la visualización y reporting consumen el resultado.',
      examNote: 'Capture no significa que el dato ya esté limpio, enriquecido o retenido como necesitas.',
      source: {
        title: 'Basic concepts of Business Observability',
        url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
      },
    },
    {
      topic: 'Fuentes',
      fact: 'Business events pueden llegar desde OneAgent, RUM JavaScript API y fuentes externas.',
      examNote: 'El origen condiciona los campos automáticos y el método de troubleshooting.',
      source: {
        title: 'Basic concepts of Business Observability',
        url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
      },
    },
    {
      topic: 'Metadata',
      fact: '“event.provider” y “event.type” son campos obligatorios del modelo de business events; “event.category” es opcional.',
      examNote: 'Confundir event.type con una dimensión visual o con user action cambia la respuesta.',
      source: {
        title: 'Basic concepts of Business Observability',
        url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
      },
    },
    {
      topic: 'Enrichment',
      fact: 'RUM business events pueden enriquecerse con geolocalización, dispositivo, navegador y aplicación.',
      examNote: 'El enrichment añade contexto, pero no autoriza a capturar PII sin gobierno.',
      source: { title: 'Business event enrichment', url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-events-enrichment' },
    },
    {
      topic: 'RUM',
      fact: 'RUM observa usuarios reales, user events, sessions, frontend performance y errores.',
      examNote: 'RUM responde “qué experimentan usuarios reales”, no “qué pasaría en una prueba controlada”.',
      source: { title: 'RUM data model', url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model' },
    },
    {
      topic: 'Session lifecycle',
      fact: 'En web frontends (nueva experiencia RUM y RUM Classic), una session termina tras 30 minutos de inactividad, al cerrar el navegador, al llegar a 6 horas o con “dtrum.endSession()”. En Grail, user.sessions registra el motivo en end_reason: timeout, duration o synthetic_execution_finished.',
      examNote: 'Una session no es ilimitada ni equivale siempre a una visita de negocio.',
      source: {
        title: 'User sessions in web frontends',
        url: 'https://docs.dynatrace.com/docs/observe/digital-experience/rum/web-frontends/concepts/user-sessions-web',
      },
    },
    {
      topic: 'Synthetic',
      fact: 'Synthetic ejecuta HTTP, browser o NAM monitors desde localizaciones públicas o privadas para comprobar disponibilidad y rendimiento.',
      examNote: 'Synthetic es una observación controlada y programada; no representa a todos los usuarios reales.',
      source: { title: 'Synthetic Monitoring', url: 'https://docs.dynatrace.com/docs/observe/digital-experience/synthetic' },
    },
    {
      topic: 'Business-grade',
      fact: 'Business-grade data busca ser precisa y no depender de muestreo para baselines, tendencias y anomalías de negocio.',
      examNote: 'La precisión de negocio no elimina la necesidad de validar volumen, duplicados y cardinalidad.',
      source: {
        title: 'Basic concepts of Business Observability',
        url: 'https://docs.dynatrace.com/docs/observe/business-observability/bo-basic-concepts',
      },
    },
    {
      topic: 'Journey',
      fact: 'Un journey ordena acciones y eventos del usuario para analizar un recorrido, abandono, conversión o fricción.',
      examNote: 'Un journey necesita identificadores y contexto consistentes; no se deduce de una sola métrica técnica.',
      source: { title: 'RUM data model', url: 'https://docs.dynatrace.com/docs/observe/digital-experience/new-rum-experience/concepts/data-model' },
    },
  ],
}
