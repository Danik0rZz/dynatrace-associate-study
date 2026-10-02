/**
 * Alias de apartados: cuando un apartado de la guía se fusiona con otro, su id antiguo apunta aquí al superviviente.
 * Así siguen funcionando los enlaces guardados (#/<bloque>/guia/<id>, #/quiz/medida?apartado=<id>) y los filtros
 * guardados del quiz a medida, que llegan con el id antiguo.
 *
 * Reglas (las comprueba src/tests/section-aliases.test.tsx):
 * - el superviviente existe en su bloque;
 * - el id antiguo ya no existe como apartado;
 * - sin cadenas: un superviviente no puede ser a su vez un alias.
 *
 * Solo se aplica a ids que llegan de fuera (URL o almacenamiento), nunca a los datos internos (preguntas, guía).
 */
export const sectionAliases: Record<string, Record<string, string>> = {}

/** El id superviviente de un apartado, o el mismo id si no es un alias. */
export const canonicalSection = (moduleId: string, sectionId: string): string =>
  sectionAliases[moduleId]?.[sectionId] ?? sectionId
