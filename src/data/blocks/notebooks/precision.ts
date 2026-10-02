import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «Notebooks & Dashboards».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión sobre Notebooks y Dashboards',
  intro: 'La diferencia no es “uno sirve para consultar y otro para graficar”. Ambos pueden consultar y visualizar; lo que cambia es la intención, la narrativa, la persistencia y la audiencia.',
  rows: [
    {
      topic: 'Notebooks',
      fact: 'Son documentos de análisis que combinan consultas, visualizaciones, Markdown, resultados y narrativa.',
      examNote: 'Elige Notebook cuando necesites explorar, explicar y conservar el razonamiento.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Dashboards',
      fact: 'Están orientados a seguimiento continuo y comunicación de indicadores para una audiencia operativa o ejecutiva.',
      examNote: 'Elige Dashboard cuando la pregunta sea “qué vigilo de forma recurrente”.',
      source: { title: 'Dashboards', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new' },
    },
    {
      topic: 'Tile Types en Dashboards',
      fact: 'Los Dashboards ofrecen tiles Explore, Query (DQL), Code (JavaScript) y Markdown, además de Service-Level Objectives, Image y Variables.',
      examNote: 'Las anotaciones no son tiles: se configuran sobre gráficos Line, Area o Bar (con DQL, código o alertas).',
      source: { title: 'Dashboards', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new' },
    },
    {
      topic: 'Variables y Parámetros ($var)',
      fact: 'Las variables (`$variable`) son una función de Dashboards (tipos DQL, Code, List y Free Text). Notebooks no documenta variables: el contexto se ajusta con el timeframe y los segments de cada sección.',
      examNote: 'Al cambiar una variable se recalculan las variables que dependen de ella y se actualizan los tiles que la usan.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Estructura JSON de Documentos',
      fact: 'Los Dashboards y Notebooks se representan internamente como documentos JSON estructurados gestionados vía Document API.',
      examNote: 'Permite versionar y desplegar cuadros de mando mediante pipelines de GitOps y automatización.',
      source: { title: 'Dashboards', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new' },
    },
    {
      topic: 'Drilldowns y Enlaces de Contexto',
      fact: 'Open with y los Suggested app links pasan el contexto de la selección (campos, entidades, timeframe y filtros); los custom links pueden usar placeholders como {{:from}}, {{:to}} o variables del Dashboard ({{$variable}}).',
      examNote: 'Un drilldown bien diseñado preserva el contexto analítico del usuario sin reiniciar la búsqueda.',
      source: { title: 'Dashboards', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/dashboards-new' },
    },
    {
      topic: 'Secciones',
      fact: 'Una sección de Notebook puede usar DQL, visualizaciones, Markdown y otras capacidades de análisis.',
      examNote: 'Una visualización bonita no corrige un dataset, unidad, timeframe o filtro incorrectos.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Persistencia',
      fact: 'Algunos resultados o visualizaciones pueden depender de volver a ejecutar la consulta; distingue datos persistidos de datos vivos.',
      examNote: 'En una revisión, pregunta si el resultado representa ahora o el momento de ejecución.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Permisos',
      fact: 'Notebooks requieren permisos de app, funciones y documentos; crear/actualizar/borrar son permisos distintos.',
      examNote: 'Leer un Notebook no implica poder modificarlo ni compartirlo.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Sharing',
      fact: 'El owner puede compartir con Can view o Can edit y puede permitir que editors compartan.',
      examNote: 'El enlace no convierte el documento en público fuera del entorno.',
      source: { title: 'Share documents', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share' },
    },
    {
      topic: 'Calidad de gráfico',
      fact: 'Toda gráfica debe declarar periodo, unidad, agregación, dimensión y tratamiento de null.',
      examNote: 'Un gráfico sin esos metadatos puede inducir a conclusiones falsas.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Narrativa',
      fact: 'La conclusión debe apuntar a la consulta, el filtro y el contexto que la sostienen.',
      examNote: 'Separar evidencia de interpretación es una señal de madurez en escenarios.',
      source: { title: 'Notebooks', url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks' },
    },
    {
      topic: 'Papelera de Notebooks',
      fact: 'Restaurar un Notebook eliminado requiere document:trash.documents:restore; document:trash.documents:read solo da acceso a los Notebooks eliminados.',
      examNote: 'document:documents:write crea y actualiza y document:documents:delete elimina: ninguno de los dos restaura desde la papelera.',
      source: {
        title: 'Notebooks',
        url: 'https://docs.dynatrace.com/docs/analyze-explore-automate/dashboards-and-notebooks/notebooks',
        kind: 'official-docs',
      },
    },
  ],
}
