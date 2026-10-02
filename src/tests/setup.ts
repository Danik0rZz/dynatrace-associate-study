import { beforeEach } from 'vitest'

// La ruta vive en la URL (#/…) y jsdom la conserva entre tests: cada test empieza sin hash, es decir, en inicio.
beforeEach(() => {
  window.history.replaceState(null, '', window.location.pathname)
})
