import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function isHeavy3DChunk(file: string) {
  return (
    file.startsWith('assets/three-') ||
    file.startsWith('assets/r3f-') ||
    file.startsWith('assets/SceneHeroCanvas-')
  )
}

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter((dep) => !isHeavy3DChunk(dep))
      },
    },
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
