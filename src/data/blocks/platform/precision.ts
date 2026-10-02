import type { PrecisionFactSheet } from '../../types'

/**
 * Ficha de hechos de precisión del bloque «The Dynatrace Platform».
 * Fuente única: edita aquí directamente. Tras cualquier cambio: npm run inventario && npm test (ver CLAUDE.md).
 */
export const precision: PrecisionFactSheet = {
  title: 'Hechos de precisión de la plataforma',
  intro: 'La plataforma se examina a través de sus contratos: qué guarda cada capa, quién puede acceder, qué aplicación lo representa y qué significa que un recurso esté descubierto pero no configurado.',
  rows: [
    {
      topic: 'Grail data model',
      fact: 'Grail organiza datos en buckets, tables y views; las tablas agrupan por tipo de registro y los buckets controlan almacenamiento lógico.',
      examNote: 'Consultar una tabla no implica que todos los buckets o registros sean visibles para tu usuario.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Buckets',
      fact: 'Un bucket es una unidad lógica asociada a un record type, como logs, events, bizevents, spans o metrics.',
      examNote: 'El bucket influye en retención, acceso, partición y coste; no es un dashboard.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Views',
      fact: 'Una view ofrece una perspectiva virtual definida sobre datos existentes.',
      examNote: 'Una view no duplica necesariamente los registros ni cambia la ingestión.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Hub',
      fact: 'Dynatrace Hub es un catálogo para descubrir apps, extensiones e integraciones.',
      examNote: 'Descubrir una tarjeta no significa que esté instalada, configurada o produciendo datos.',
      source: { title: 'Dynatrace Hub', url: 'https://www.dynatrace.com/hub/' },
    },
    {
      topic: 'Hub IAM Permissions',
      fact: 'Instalar y eliminar aplicaciones de Dynatrace Hub requiere permisos específicos: `app-engine:apps:install` para instalar y `app-engine:apps:delete` para desinstalar.',
      examNote: 'Poder visualizar una app en el Hub no otorga permiso para instalarla en el entorno.',
      source: { title: 'Dynatrace Hub', url: 'https://www.dynatrace.com/hub/' },
    },
    {
      topic: 'Hub Tabs Structure',
      fact: 'La página de una app en Hub incluye `Product information` (descripción y use cases), `Technical information` (permisos requeridos e intents), `Contents` (Dashboards, Notebooks y workflow actions incluidos) y `Release notes`.',
      examNote: 'Los Dashboards, Notebooks y workflow actions que incluye una app se consultan en la pestaña `Contents` de su ficha.',
      source: { title: 'Dynatrace Hub', url: 'https://www.dynatrace.com/hub/' },
    },
    {
      topic: 'Problem Records en Grail',
      fact: 'Los registros de Problems en Grail almacenan los eventos agrupados en el campo de tipo array `dt.davis.event_ids` y sus campos personalizados solo admiten valores string.',
      examNote: 'Los campos custom de un Problem no admiten arrays ni objetos complejos; se restringen a strings.',
      source: { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace' },
    },
    {
      topic: 'Tablas de Sistema en Grail',
      fact: 'La tabla del sistema `dt.system.buckets` permite consultar la lista de todos los buckets configurados, su record type y sus políticas de retención activas.',
      examNote: 'La lista de buckets del entorno se consulta con `fetch dt.system.buckets`. Ver las definiciones de los buckets es `storage:bucket-definitions:read` (gestionarlas, `storage:bucket-definitions:write`); `storage:buckets:read` es otra cosa: autoriza a leer los registros guardados en los buckets.',
      source: { title: 'How to organize your data in Grail', url: 'https://docs.dynatrace.com/docs/platform/grail/organize-data' },
    },
    {
      topic: 'Documentos',
      fact: 'Dashboards, notebooks y launchpads tienen owner y permisos de view/edit.',
      examNote: 'Poder ver un documento no concede permiso para editarlo, compartirlo o cambiar su owner.',
      source: { title: 'Share documents', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share' },
    },
    {
      topic: 'Document Sharing Controls',
      fact: 'Al compartir un documento, el propietario puede marcar `Allow editors to share` y configurar visibilidad con `Visible to anyone in your environment`.',
      examNote: 'Compartir con el entorno no lo hace público en internet; solo es visible para usuarios autenticados del tenant.',
      source: { title: 'Share documents', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share' },
    },
    {
      topic: 'IAM',
      fact: 'Permisos de lectura, escritura, ejecución, administración y acceso a datos son capacidades distintas.',
      examNote: 'Un resultado vacío o menor puede deberse a un segment o a un WHERE por registro en los permisos, no a ausencia de datos; leer tablas almacenadas en buckets necesita storage:buckets:read y el permiso de la tabla, y sin ellos no se obtienen esos registros.',
      source: { title: 'Share documents', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/get-started/dynatrace-ui/share' },
    },
    {
      topic: 'Platform search',
      fact: 'La búsqueda ayuda a localizar capacidades, entidades y recursos sin depender de una ruta visual fija.',
      examNote: 'La navegación correcta conserva timeframe, filtros, entity ID y fuente.',
      source: { title: 'What is Dynatrace', url: 'https://docs.dynatrace.com/docs/discover-dynatrace/what-is-dynatrace' },
    },
    {
      topic: 'Latest y Classic',
      fact: 'La interfaz y algunos objetos tienen experiencias Latest y Classic con modelos y rutas diferentes.',
      examNote: 'No mezcles sintaxis, permisos o nombres de app sin etiquetar la variante.',
      source: {
        title: 'Associate Certification Learning Plan',
        url: 'https://university.dynatrace.com/learn/public/learning_plan/view/47/dynatrace-associate-certification-learning-plan',
      },
    },
    {
      topic: 'Uso de apps (IAM)',
      fact: 'Usar las apps instaladas requiere `app-engine:apps:run`, que permite listar y ejecutar apps y da acceso básico al Launcher.',
      examNote: 'Instalar (`app-engine:apps:install`) y usar (`app-engine:apps:run`) son permisos distintos.',
      source: {
        title: 'IAM policy reference',
        url: 'https://docs.dynatrace.com/docs/manage/identity-access-management/permission-management/manage-user-permissions-policies/advanced/iam-policystatements',
      },
    },
    {
      topic: 'Management zones en Latest',
      fact: 'Latest Dynatrace sustituye las management zones de Classic: los segments filtran y estructuran los datos en las apps, y el acceso se controla con políticas y security context.',
      examNote: 'Un runbook de Classic que filtra con management zones se traduce a segments para filtrar y a políticas para restringir el acceso.',
      source: { title: 'Upgrade to the latest Dynatrace', url: 'https://docs.dynatrace.com/docs/platform/upgrade' },
    },
  ],
}
