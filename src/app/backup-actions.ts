import { applyBackup, backupFileName, BackupError, collectBackup, parseBackup, summarizeBackup } from '../lib/backup'
import { alertDialog, confirmDialog } from '../lib/dialogs'

/** Descarga un JSON con todo lo que la app guarda en este navegador. */
export const exportProgress = (): void => {
  try {
    const backup = collectBackup(window.localStorage)
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = backupFileName(backup)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch {
    void alertDialog({ title: 'No se ha podido exportar', message: 'No se ha podido exportar el progreso en este navegador.' })
  }
}

/** Restaura una copia tras confirmar con el usuario y recarga la app. */
export const importProgress = async (file: Pick<File, 'text'>, reload: () => void = () => window.location.reload()): Promise<void> => {
  try {
    const backup = parseBackup(await file.text())
    const { answered, attempts } = summarizeBackup(backup)
    const date = new Date(backup.exportedAt).toLocaleString('es-ES')
    const accepted = await confirmDialog({
      title: '¿Restaurar esta copia?',
      message: `Se sustituirá el progreso de este navegador por la copia del ${date} (${answered} preguntas respondidas, ${attempts} intentos).`,
      confirmLabel: 'Restaurar copia',
    })
    if (!accepted) return
    applyBackup(window.localStorage, backup)
    reload()
  } catch (error) {
    await alertDialog({ title: 'No se ha podido importar', message: error instanceof BackupError ? error.message : 'No se ha podido leer el fichero.' })
  }
}
