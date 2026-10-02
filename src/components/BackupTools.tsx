import { exportProgress, importProgress } from '../app/backup-actions'

/** Botones Exportar / Importar del progreso. Se usan en la barra lateral y, en móvil, en Inicio. */
export function BackupTools({ className = 'data-tools', onDone }: { className?: string; onDone?: () => void }) {
  return <div className={className}>
    <p className="sidebar-label">Tu progreso</p>
    <div className="data-tools-row">
      <button type="button" className="data-tool" onClick={() => { exportProgress(); onDone?.() }} title="Descargar una copia de tu progreso (JSON)" aria-label="Exportar progreso"><span aria-hidden="true">⤓</span><span className="data-tool-label">Exportar</span></button>
      <label className="data-tool" title="Restaurar el progreso desde una copia"><span aria-hidden="true">⤒</span><span className="data-tool-label">Importar</span><input type="file" accept="application/json,.json" className="sr-only" aria-label="Importar progreso desde un fichero" onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; if (file) { onDone?.(); void importProgress(file) } }} /></label>
    </div>
  </div>
}
