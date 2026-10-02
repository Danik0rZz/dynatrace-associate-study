import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: la app funciona igual en local y en GitHub Pages (https://<usuario>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // El contenido de estudio (guía + 1.175 preguntas) es texto: se descarga por bloque y solo cuando hace falta.
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Guía y ficha de precisión: un chunk por bloque, descargado al abrirlo (src/data/guide-loader.ts).
          const guide = id.match(/\/src\/data\/blocks\/([^/]+)\/(?:guide|precision)\.ts$/)
          if (guide) return `guide-${guide[1]}`
          // Preguntas: un chunk por bloque, descargado al empezar una sesión (src/data/question-loader.ts).
          const questions = id.match(/\/src\/data\/blocks\/([^/]+)\/questions\.ts$/)
          if (questions) return `questions-${questions[1]}`
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react'
          return undefined
        },
      },
    },
  },
})
