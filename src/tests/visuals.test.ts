import { describe, expect, it } from 'vitest'
import { visualIds } from '../components/visuals/index-ids'
import { visualLoaders } from '../components/visuals/LazySectionVisual'
import { visualsByModule } from '../components/visuals/registry'
import { studyGuide } from '../data/guide'

describe('ilustraciones y animaciones', () => {
  it('el índice ligero coincide con los visuales de cada bloque', () => {
    for (const [moduleId, registry] of Object.entries(visualsByModule)) expect(visualIds[moduleId], moduleId).toEqual(Object.keys(registry))
    expect(Object.keys(visualIds).sort()).toEqual(Object.keys(visualsByModule).sort())
    expect(Object.keys(visualLoaders).sort(), 'cada bloque con visuales necesita su cargador diferido').toEqual(Object.keys(visualsByModule).sort())
  })

  it('cada visual pertenece a un apartado que existe en la guía', () => {
    for (const [moduleId, ids] of Object.entries(visualIds)) {
      const sections = new Set(studyGuide[moduleId].sections.map((section) => section.id))
      for (const id of ids) expect(sections.has(id), `${moduleId}/${id}`).toBe(true)
    }
  })
})
