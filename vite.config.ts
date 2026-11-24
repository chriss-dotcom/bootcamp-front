import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dummyjson/auth/': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (ruta) => ruta.replace(/^\/dummyjson/, ''),
      },
    },
  },
})
