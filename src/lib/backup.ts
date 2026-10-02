/**
 * Copia de seguridad del progreso.
 *
 * Todo lo que la app guarda vive en localStorage bajo claves que empiezan por `dynatrace-associate`
 * (intentos, preguntas servidas, prácticas, checklists de dominio, preferencias). Exportar = volcar esas
 * claves a un JSON; importar = validar el JSON y sustituir esas claves.
 */

import { PROGRESS_KEY } from './progress'

export const STORAGE_PREFIX = 'dynatrace-associate'
export const BACKUP_APP = 'dynatrace-associate-study-lab'
export const BACKUP_VERSION = 1

export type Backup = {
  app: typeof BACKUP_APP
  version: typeof BACKUP_VERSION
  exportedAt: string
  entries: Record<string, string>
}

type KeyValueStore = Pick<Storage, 'length' | 'key' | 'getItem' | 'setItem' | 'removeItem'>

const ownKeys = (storage: KeyValueStore): string[] => {
  const keys: string[] = []
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index)
    if (key && key.startsWith(STORAGE_PREFIX)) keys.push(key)
  }
  return keys.sort()
}

export const collectBackup = (storage: KeyValueStore, now: Date = new Date()): Backup => ({
  app: BACKUP_APP,
  version: BACKUP_VERSION,
  exportedAt: now.toISOString(),
  entries: Object.fromEntries(ownKeys(storage).map((key) => [key, storage.getItem(key) ?? ''])),
})

export const backupFileName = (backup: Backup): string => `dynatrace-study-progress-${backup.exportedAt.slice(0, 10)}.json`

export class BackupError extends Error {}

/** Valida el texto de un fichero de copia. Lanza BackupError con un mensaje en español si no es válido. */
export const parseBackup = (text: string): Backup => {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    throw new BackupError('El fichero no es un JSON válido.')
  }
  if (!raw || typeof raw !== 'object') throw new BackupError('El fichero no contiene una copia de progreso.')
  const candidate = raw as Partial<Backup>
  if (candidate.app !== BACKUP_APP) throw new BackupError('Este fichero no es una copia de progreso de esta app.')
  if (candidate.version !== BACKUP_VERSION) throw new BackupError(`Versión de copia no compatible (${String(candidate.version)}).`)
  if (typeof candidate.exportedAt !== 'string' || Number.isNaN(Date.parse(candidate.exportedAt))) throw new BackupError('La copia no tiene una fecha válida.')
  const entries = candidate.entries
  if (!entries || typeof entries !== 'object' || Array.isArray(entries)) throw new BackupError('La copia no contiene datos.')
  for (const [key, value] of Object.entries(entries)) {
    if (!key.startsWith(STORAGE_PREFIX)) throw new BackupError(`Clave no reconocida en la copia: ${key}`)
    if (typeof value !== 'string') throw new BackupError(`Valor no válido para ${key}.`)
  }
  const progress = entries[PROGRESS_KEY]
  if (progress !== undefined) {
    try {
      const parsed = JSON.parse(progress) as { attempts?: unknown }
      if (!parsed || typeof parsed.attempts !== 'object' || parsed.attempts === null) throw new Error('attempts')
    } catch {
      throw new BackupError('El progreso de la copia está dañado.')
    }
  }
  return candidate as Backup
}

/** Resumen legible de una copia: nº de preguntas respondidas e intentos. */
export const summarizeBackup = (backup: Backup): { answered: number; attempts: number } => {
  const progress = backup.entries[PROGRESS_KEY]
  if (!progress) return { answered: 0, attempts: 0 }
  const attempts = (JSON.parse(progress) as { attempts: Record<string, unknown[]> }).attempts
  const lists = Object.values(attempts).filter(Array.isArray)
  return { answered: lists.filter((list) => list.length > 0).length, attempts: lists.reduce((sum, list) => sum + list.length, 0) }
}

/**
 * Sustituye todo lo guardado por la app por el contenido de la copia. Si el navegador no admite la copia
 * (cuota llena), restaura lo que había y lanza BackupError.
 */
export const applyBackup = (storage: KeyValueStore, backup: Backup): void => {
  const previous = Object.fromEntries(ownKeys(storage).map((key) => [key, storage.getItem(key) ?? '']))
  for (const key of Object.keys(previous)) storage.removeItem(key)
  try {
    for (const [key, value] of Object.entries(backup.entries)) storage.setItem(key, value)
  } catch {
    for (const key of ownKeys(storage)) storage.removeItem(key)
    for (const [key, value] of Object.entries(previous)) {
      try {
        storage.setItem(key, value)
      } catch {
        /* sin espacio ni para lo anterior: se conserva lo que haya cabido */
      }
    }
    throw new BackupError('No hay espacio suficiente en este navegador para restaurar la copia. Se ha mantenido el progreso anterior.')
  }
}
