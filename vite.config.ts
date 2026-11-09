import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router') ||
            id.includes('/scheduler/')
          ) {
            return 'react-core'
          }
          return
        },
      },
    },
  },
})
