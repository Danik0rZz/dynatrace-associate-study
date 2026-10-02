/** Normaliza para buscar sin distinguir acentos ni mayúsculas: NFD, sin diacríticos y en minúsculas. */
export const normalizeForSearch = (text: string): string => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** `true` si `text` contiene `query`, sin distinguir acentos ni mayúsculas. Una consulta vacía coincide con todo. */
export const matchesSearch = (text: string, query: string): boolean => normalizeForSearch(text).includes(normalizeForSearch(query.trim()))
