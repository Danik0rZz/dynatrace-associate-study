import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Welcome».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión: Fundamentos y Arquitectura Dynatrace 101',
  intro: 'Estas son las relaciones arquitectónicas y conceptuales esenciales que sustentan el examen Associate. No memorices definiciones aisladas: comprende cómo se conectan las entidades y el valor diagnóstico de cada capa.',
  rows: [
    {
      topic: 'MELT Stack Unificado',
      fact: 'Grail unifica métricas, eventos, logs y trazas (MELT) en un data lakehouse columnar sin indexación previa ni esquemas rígidos.',
      examNote: 'Grail elimina silos de almacenamiento; no es una aplicación visual ni un dialecto DQL.',
      source: { title: 'Grail overview', url: 'https://docs.dynatrace.com/docs/platform/grail' },
    },
    {
      topic: 'Smartscape 5 Layers',
      fact: 'Smartscape Classic muestra 5 tiers: Data centers, Hosts, Processes, Services y Applications, conectados mediante relaciones verticales (dependencias entre tiers) y horizontales (llamadas dentro de un tier).',
      examNote: 'Comprender qué entidad pertenece a qué capa es crítico para navegar el grafo de problemas en el examen.',
      source: { title: 'Smartscape topology', url: 'https://docs.dynatrace.com/docs/shortlink/smartscape' },
    },
    {
      topic: 'DPS Licensing Model',
      fact: 'Dynatrace Platform Subscription (DPS) es un compromiso anual único que se consume por capability según un rate card, en lugar de cuotas fijas por producto (Host Units, DEM units…).',
      examNote: 'Todas las capabilities consumen del mismo compromiso, cada una con su unidad; las Host Units y las licencias separadas por producto no forman parte de DPS.',
      source: { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace' },
    },
    {
      topic: 'Grail Schema-on-Read',
      fact: 'Grail almacena datos estructurados y no estructurados tal como llegan; la estructura y tipos se procesan en el momento de consulta con DQL.',
      examNote: 'Schema-on-read agiliza la ingestión y evita cuellos de botella de indexación en almacenamiento masivo.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Contexto Operativo',
      fact: 'La telemetría adquiere valor diagnóstico únicamente cuando se relaciona con una entidad monitoreada, una ventana temporal y un impacto en el usuario.',
      examNote: 'Una métrica de saturación de CPU aislada no demuestra la causa raíz de una degradación de servicio.',
      source: { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace' },
    },
    {
      topic: 'Davis event vs Problem',
      fact: 'Un Davis event es una anomalía individual; un Problem es un incidente correlacionado que agrupa múltiples eventos en una línea de tiempo causal.',
      examNote: 'No confundas la anomalía puntual de una entidad con el Problem que agrupa todo el blast radius.',
      source: { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace' },
    },
    {
      topic: 'Causal AI de Dynatrace Intelligence',
      fact: 'El causal AI de Dynatrace Intelligence (antes Davis AI) identifica la root cause con un análisis determinista sobre las dependencias reales de Smartscape, no por coincidencia temporal. Dynatrace Intelligence incluye además predictive AI (forecast analysis) y generative AI (Dynatrace Assist), y el seasonal baseline usa una predicción probabilística para su banda de confianza.',
      examNote: 'La root cause sale de las dependencias topológicas, no de la alerta que se disparó primero ni de una correlación estadística de alertas.',
      source: { title: 'Dynatrace Intelligence', url: 'https://docs.dynatrace.com/docs/dynatrace-intelligence' },
    },
    {
      topic: 'Launcher, Dock y Hub',
      fact: 'Launcher permite crear launchpads: páginas de inicio personalizables (propias o compartidas) con bloques Links, Markdown y Cards. Las apps se abren y anclan desde el Dock; se descubren e instalan en Hub.',
      examNote: 'Para abrir o anclar una app se usa el Dock (Pin to dock), no Launcher.',
      source: { title: 'Launchpads', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/launchpads' },
    },
  ],
}
