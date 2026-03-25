import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('lucide-react')) {
            return 'icons'
          }

          if (id.includes('/three/')) {
            return 'three'
          }

          if (
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei')
          ) {
            return 'r3f'
          }

          return undefined
        },
      },
    },
  },
})
