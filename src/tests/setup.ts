import { beforeEach } from 'vitest'
import { resetDialogs } from '../lib/dialogs'

// La ruta vive en la URL (#/…) y jsdom la conserva entre tests: cada test empieza sin hash, es decir, en inicio.
// Los diálogos son un estado global del módulo: ninguno pasa de un test a otro.
beforeEach(() => {
  window.history.replaceState(null, '', window.location.pathname)
  resetDialogs()
})
