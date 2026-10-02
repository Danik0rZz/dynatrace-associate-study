import { useSyncExternalStore } from 'react'
import { dismissStorageError, storageErrorSnapshot, subscribeStorageError } from '../lib/safe-storage'

/** Aviso no bloqueante cuando el navegador no deja guardar el progreso. */
export function StorageWarning() {
  const failed = useSyncExternalStore(subscribeStorageError, storageErrorSnapshot, () => false)
  if (!failed) return null
  return <div className="storage-warning" role="status"><p><strong>No se ha podido guardar en este navegador</strong> (almacenamiento lleno o bloqueado). Puedes seguir estudiando: el progreso se mantiene mientras no cierres la pestaña.</p><button type="button" className="text-button" onClick={dismissStorageError}>Entendido</button></div>
}
