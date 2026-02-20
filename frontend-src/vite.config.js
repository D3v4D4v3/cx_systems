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
      '/api': {
        target: 'http://cx_systems.test',
        changeOrigin: true,
      },
    },
  },
})