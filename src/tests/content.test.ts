import { describe, expect, it } from 'vitest'
import { blocks } from '../data/blocks'
import { precisionFacts, studyGuide } from '../data/guide'
import { modules } from '../data/modules'
import { allQuestions, modulesWithQuestions, questionCounts, questionsByModule } from '../data/questions'

const OFFICIAL_HOSTS = ['docs.dynatrace.com', 'university.dynatrace.com', 'community.dynatrace.com', 'support.proctoru.com', 'www.dynatrace.com', 'developer.dynatrace.com']
const isOfficial = (url: string) => { const host = new URL(url).hostname; return OFFICIAL_HOSTS.some((official) => host === official || host.endsWith(`.${official}`)) }

describe('estructura del contenido', () => {
  it('tiene doce bloques, cada uno con guía, ficha y preguntas', () => {
    expect(modules).toHaveLength(12)
    expect(Object.keys(blocks).sort()).toEqual(modules.map((module) => module.id).sort())
    for (const module of modules) expect(blocks[module.id].questions.every((question) => question.moduleId === module.id), module.id).toBe(true)
  })

  it('no repite ids ni enunciados', () => {
    expect(new Set(allQuestions.map((question) => question.id)).size).toBe(allQuestions.length)
    expect(new Set(allQuestions.map((question) => question.promptEs)).size).toBe(allQuestions.length)
  })
})

describe('banco de preguntas', () => {
  it('cada bloque tiene un banco amplio y variado', () => {
    for (const module of modulesWithQuestions) {
      const questions = questionsByModule[module.id]
      expect(module.questionIds).toEqual(questions.map((question) => question.id))
      expect(Object.values(questionCounts[module.id]).reduce((sum, count) => sum + count, 0)).toBe(questions.length)
      expect(questions.length, module.id).toBeGreaterThanOrEqual(75)
      expect(questions.filter((question) => question.type === 'multiple').length, module.id).toBeGreaterThanOrEqual(8)
      expect(questions.filter((question) => question.stimulus).length, module.id).toBeGreaterThanOrEqual(4)
    }
  })

  it('la opción correcta no se delata por ser la más larga', () => {
    for (const module of modules) {
      const single = questionsByModule[module.id].filter((question) => question.type === 'single')
      const longest = single.filter((question) => {
        const correct = question.options.find((option) => option.id === question.correctOptionIds[0])!.text.length
        return question.options.filter((option) => option.id !== question.correctOptionIds[0]).every((option) => option.text.length < correct)
      })
      expect(longest.length / single.length, module.id).toBeLessThanOrEqual(0.3)
    }
  })

  it('cada pregunta es evaluable y trazable', () => {
    for (const question of allQuestions) {
      const where = question.id
      expect(question.options, where).toHaveLength(4)
      expect(question.options.map((option) => option.id), where).toEqual(['A', 'B', 'C', 'D'])
      expect(new Set(question.options.map((option) => option.text)).size, where).toBe(4)
      expect(question.options.every((option) => option.text.trim().length >= 2), where).toBe(true)
      expect(question.correctOptionIds.length, where).toBeGreaterThanOrEqual(1)
      expect(question.correctOptionIds.every((id) => question.options.some((option) => option.id === id)), where).toBe(true)
      expect(question.type, where).toBe(question.correctOptionIds.length > 1 ? 'multiple' : 'single')
      if (question.type === 'multiple') expect(question.promptEs, where).toContain(`(Selecciona ${question.correctOptionIds.length})`)
      expect(question.explanationEs.length, where).toBeGreaterThan(40)
      expect(question.sourceRefs.length, where).toBeGreaterThan(0)
      expect(question.sourceRefs.every((source) => isOfficial(source.url)), where).toBe(true)
      expect(question.objectiveId, where).toContain(question.moduleId)
      expect(question.versionNote, where).toBeTruthy()
      expect(question.lastVerified, where).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})

describe('guía de estudio', () => {
  it('cada bloque tiene una lección completa con fuentes oficiales', () => {
    for (const module of modules) {
      const chapter = studyGuide[module.id]
      expect(chapter.introduction.length, module.id).toBeGreaterThan(100)
      expect(chapter.outcomes.length, module.id).toBeGreaterThanOrEqual(4)
      expect(chapter.sections.length, module.id).toBeGreaterThanOrEqual(10)
      expect(new Set(chapter.sections.map((section) => section.id)).size, module.id).toBe(chapter.sections.length)
      expect(chapter.masteryChecklist.length, module.id).toBeGreaterThanOrEqual(4)
      for (const section of chapter.sections) {
        const where = `${module.id}/${section.id}`
        expect(section.title && section.lead, where).toBeTruthy()
        expect(section.paragraphs.length, where).toBeGreaterThanOrEqual(2)
        expect(section.sourceRefs?.length ?? 0, where).toBeGreaterThanOrEqual(1)
        expect(section.sourceRefs!.every((source) => isOfficial(source.url)), where).toBe(true)
        if (section.comparison) expect(section.comparison.rows.every((row) => row.length === section.comparison!.headers.length), where).toBe(true)
      }
      expect(module.sources.every((source) => isOfficial(source.url)), module.id).toBe(true)
    }
  })

  it('los apartados se numeran por su orden', () => {
    for (const module of modules) {
      studyGuide[module.id].sections.forEach((section, index) => expect(section.title.startsWith(`${index + 1}. `), `${module.id}/${section.id}`).toBe(true))
      expect(blocks[module.id].guide.sections.every((section) => !/^\d+\.\s/.test(section.title)), `${module.id}: títulos con número escrito a mano`).toBe(true)
    }
  })

  it('cada bloque tiene su ficha de hechos de precisión con fuentes oficiales', () => {
    for (const module of modules) {
      const sheet = precisionFacts[module.id]
      expect(sheet.rows.length, module.id).toBeGreaterThanOrEqual(7)
      expect(new Set(sheet.rows.map((row) => row.topic)).size, module.id).toBe(sheet.rows.length)
      for (const row of sheet.rows) expect(row.topic && row.fact.length > 30 && row.examNote.length > 20 && isOfficial(row.source.url), `${module.id}: ${row.topic}`).toBeTruthy()
    }
  })
})
