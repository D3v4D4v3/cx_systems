import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/frontend/',
  build: {
    outDir: path.resolve(__dirname, '../public/frontend'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      // En desarrollo, /api va al backend Laravel. Laragon suele usar .test (cx_systems.test).
      // Si tu backend es otro (ej. http://localhost), cámbialo aquí.
      '/api': {
        target: 'http://cx_systems.test',
        changeOrigin: true,
      },
    },
  },
})