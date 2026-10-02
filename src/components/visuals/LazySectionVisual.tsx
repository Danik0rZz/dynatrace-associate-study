import { lazy, Suspense, type ComponentType } from 'react'
import { ErrorBoundary } from '../ErrorBoundary'
import { SectionVisual } from './SectionVisual'
import type { VisualRegistry } from './types'

type Loader = () => Promise<VisualRegistry>

/** Cada bloque descarga sus visuales en un fichero aparte la primera vez que se abre. */
export const visualLoaders: Record<string, Loader> = {
  welcome: () => import('./welcome').then((module) => module.welcomeVisuals),
  instructions: () => import('./instructions').then((module) => module.instructionsVisuals),
  platform: () => import('./platform').then((module) => module.platformVisuals),
  observability: () => import('./observability').then((module) => module.observabilityVisuals),
  notebooks: () => import('./notebooks').then((module) => module.notebooksVisuals),
  'business-dem': () => import('./business').then((module) => module.businessVisuals),
  'data-analysis': () => import('./data').then((module) => module.dataVisuals),
  dql: () => import('./dql').then((module) => module.dqlVisuals),
  security: () => import('./security').then((module) => module.securityVisuals),
  automation: () => import('./automation').then((module) => module.automationVisuals),
  ingestion: () => import('./ingestion').then((module) => module.ingestionVisuals),
  other: () => import('./other').then((module) => module.otherVisuals),
}

/** Un componente diferido por bloque, creado una sola vez al cargar el módulo (lazy no descarga nada hasta que se pinta). */
const components: Record<string, ComponentType<{ sectionId: string }>> = Object.fromEntries(Object.entries(visualLoaders).map(([moduleId, load]) => [
  moduleId,
  lazy(async () => {
    const registry = await load()
    return { default: ({ sectionId }: { sectionId: string }) => (registry[sectionId] ? <SectionVisual spec={registry[sectionId]} /> : null) }
  }),
]))

export function LazySectionVisual({ moduleId, sectionId }: { moduleId: string; sectionId: string }) {
  const Visual = components[moduleId]
  if (!Visual) return null
  return (
    <ErrorBoundary fallback={() => null}>
      <Suspense fallback={<div className="sv-loading" role="status" aria-label="Cargando ilustración" />}>
        <Visual sectionId={sectionId} />
      </Suspense>
    </ErrorBoundary>
  )
}
