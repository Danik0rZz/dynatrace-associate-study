import { beforeEach } from 'vitest'
import { questionIndex } from '../data/question-catalog'
import { loadQuestions } from '../data/question-loader'
import { resetDialogs } from '../lib/dialogs'

const allIds = questionIndex.map((entry) => entry.id)

// La ruta vive en la URL (#/…) y jsdom la conserva entre tests: cada test empieza sin hash, es decir, en inicio.
// Los diálogos son un estado global del módulo: ninguno pasa de un test a otro.
// El texto de las preguntas se carga por bloque: cada test empieza con todo descargado (como tras la primera sesión),
// salvo los de carga diferida (lazy-questions.test.tsx), que vacían la caché en su propio beforeEach.
beforeEach(async () => {
  window.history.replaceState(null, '', window.location.pathname)
  resetDialogs()
  await loadQuestions(allIds)
})
