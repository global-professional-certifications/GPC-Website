import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group React and core UI libraries together to prevent context issues
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('@material-tailwind') ||
              id.includes('framer-motion') ||
              id.includes('motion') ||
              id.includes('@heroicons')
            ) {
              return 'vendor-core';
            }
            if (id.includes('sanity')) {
              return 'vendor-sanity';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  }
})
