import type { StudyChapter } from './types'

/** Apartados numerados por su orden («1. …», «2. …»): la guía se escribe sin números. */
export const numberChapter = (chapter: StudyChapter): StudyChapter => ({
  ...chapter,
  sections: chapter.sections.map((section, index) => ({ ...section, title: `${index + 1}. ${section.title}` })),
})
