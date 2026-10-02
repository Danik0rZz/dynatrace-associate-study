import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: la app funciona igual en local y en GitHub Pages (https://<usuario>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // El contenido de estudio (guía + 1.175 preguntas) es texto y pesa ~2,5 MB sin comprimir (~0,6 MB gzip):
    // va en su propio fichero para que el navegador lo guarde en caché aparte del código.
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('/src/data/blocks/')) return 'content'
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react'
          return undefined
        },
      },
    },
  },
})
