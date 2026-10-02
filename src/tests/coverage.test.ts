import { describe, expect, it } from 'vitest'
import { precisionFacts, studyGuide } from '../data/guide'
import { modules } from '../data/modules'
import { questionsByModule } from '../data/questions'
import { normalizeText, precisionText, sectionText } from '../lib/guide-text'

/**
 * Cada pregunta apunta a un apartado de la guía de su bloque y cita una frase literal que contiene el dato decisivo.
 * Este test comprueba que la frase existe; que BASTE para responder exige revisión (ver CLAUDE.md).
 */
describe('cada pregunta está respaldada por la guía de estudio de su bloque', () => {
  for (const module of modules) {
    it(module.id, () => {
      const chapter = studyGuide[module.id]
      const failures: string[] = []
      for (const question of questionsByModule[module.id]) {
        const entry = question.guide
        if (!entry) { failures.push(`${question.id}: sin respaldo en la guía`); continue }
        if (entry.evidence.trim().length < 25) failures.push(`${question.id}: evidencia demasiado corta`)
        const text = entry.section === 'precision-facts'
          ? precisionText(precisionFacts[module.id])
          : (() => { const section = chapter.sections.find((candidate) => candidate.id === entry.section); return section ? sectionText(section) : null })()
        if (text === null) { failures.push(`${question.id}: apartado inexistente ${entry.section}`); continue }
        if (!normalizeText(text).includes(normalizeText(entry.evidence))) failures.push(`${question.id}: la evidencia no aparece en ${entry.section}`)
      }
      expect(failures, failures.slice(0, 15).join('\n')).toEqual([])
    })
  }
})
