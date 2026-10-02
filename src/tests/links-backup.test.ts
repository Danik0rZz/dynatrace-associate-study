import { describe, expect, it } from 'vitest'
import { allQuestions, questionsById } from '../data/questions'
import { precisionFacts, studyGuide as deepStudyContent } from '../data/guide'
import { groupBySection, guideRefFor, PRECISION_SECTION, precisionRowsFor, questionIdsForSection, sectionFor } from '../lib/guide-links'
import { applyBackup, BackupError, collectBackup, parseBackup, summarizeBackup } from '../lib/backup'

class MemoryStorage {
  private map = new Map<string, string>()
  get length() { return this.map.size }
  key(index: number) { return [...this.map.keys()][index] ?? null }
  getItem(key: string) { return this.map.get(key) ?? null }
  setItem(key: string, value: string) { this.map.set(key, value) }
  removeItem(key: string) { this.map.delete(key) }
  keys() { return [...this.map.keys()].sort() }
}

describe('enlace pregunta ↔ guía', () => {
  it('cada pregunta tiene un apartado de la guía que existe', () => {
    for (const question of allQuestions) {
      const ref = guideRefFor(question)
      expect(ref, question.id).toBeDefined()
      if (ref!.sectionId === PRECISION_SECTION) expect(precisionFacts[question.moduleId], question.id).toBeDefined()
      else expect(sectionFor(question.moduleId, ref!.sectionId), `${question.id} → ${ref!.sectionId}`).toBeDefined()
      expect(ref!.title.length).toBeGreaterThan(0)
    }
  })

  it('"Practicar este apartado" reparte todo el banco sin perder ni duplicar preguntas', () => {
    const ids = Object.entries(deepStudyContent).flatMap(([moduleId, chapter]) => [
      ...chapter.sections.flatMap((section) => questionIdsForSection(moduleId, section.id)),
      ...questionIdsForSection(moduleId, PRECISION_SECTION),
    ])
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.length).toBe(allQuestions.length)
  })

  it('las preguntas de precisión muestran la fila de la ficha que contiene la evidencia', () => {
    const precisionQuestions = allQuestions.filter((question) => guideRefFor(question)?.sectionId === PRECISION_SECTION)
    for (const question of precisionQuestions) {
      const rows = precisionRowsFor(question.moduleId, guideRefFor(question)!.evidence)
      expect(rows.length, question.id).toBeLessThan(precisionFacts[question.moduleId].rows.length)
    }
  })

  it('agrupa los fallos por apartado, de más a menos', () => {
    const busiest = deepStudyContent.dql.sections.find((section) => questionIdsForSection('dql', section.id).length >= 3)!
    const ids = questionIdsForSection('dql', busiest.id).slice(0, 3)
    const other = allQuestions.find((question) => question.moduleId === 'security')!
    const groups = groupBySection([...ids.map((id) => questionsById[id]), other])
    expect(groups[0].questionIds.length).toBe(ids.length)
    expect(groups.reduce((sum, group) => sum + group.questionIds.length, 0)).toBe(ids.length + 1)
  })
})

describe('copia de seguridad del progreso', () => {
  const progress = JSON.stringify({ version: 3, attempts: { 'A-001': [{ score: 1 }], 'A-002': [{ score: 0 }, { score: 1 }], 'A-003': [] }, completedModules: [] })

  it('exporta solo las claves de la app y las restaura tal cual', () => {
    const source = new MemoryStorage()
    source.setItem('dynatrace-associate-progress-v3', progress)
    source.setItem('dynatrace-associate-served-v1', '["A-001"]')
    source.setItem('otra-app', 'x')
    const backup = parseBackup(JSON.stringify(collectBackup(source, new Date('2026-10-02T10:00:00Z'))))
    expect(Object.keys(backup.entries)).toEqual(['dynatrace-associate-progress-v3', 'dynatrace-associate-served-v1'])
    expect(summarizeBackup(backup)).toEqual({ answered: 2, attempts: 3 })

    const target = new MemoryStorage()
    target.setItem('dynatrace-associate-mastery-dql', '[true]')
    target.setItem('otra-app', 'y')
    applyBackup(target, backup)
    expect(target.keys()).toEqual(['dynatrace-associate-progress-v3', 'dynatrace-associate-served-v1', 'otra-app'])
    expect(target.getItem('dynatrace-associate-progress-v3')).toBe(progress)
    expect(target.getItem('otra-app')).toBe('y')
  })

  it('rechaza ficheros que no son una copia válida', () => {
    const valid = { app: 'dynatrace-associate-study-lab', version: 1, exportedAt: '2026-10-02T10:00:00Z', entries: { 'dynatrace-associate-progress-v3': progress } }
    expect(() => parseBackup('no es json')).toThrow(BackupError)
    expect(() => parseBackup(JSON.stringify({ ...valid, app: 'otra' }))).toThrow(BackupError)
    expect(() => parseBackup(JSON.stringify({ ...valid, version: 2 }))).toThrow(BackupError)
    expect(() => parseBackup(JSON.stringify({ ...valid, entries: { 'clave-ajena': 'x' } }))).toThrow(BackupError)
    expect(() => parseBackup(JSON.stringify({ ...valid, entries: { 'dynatrace-associate-progress-v3': '{roto' } }))).toThrow(BackupError)
    expect(parseBackup(JSON.stringify(valid)).entries).toEqual(valid.entries)
  })
})
