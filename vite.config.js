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
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('@material-tailwind') || id.includes('@heroicons') || id.includes('framer-motion')) {
              return 'vendor-ui';
            }
            if (id.includes('sanity')) {
              return 'vendor-sanity';
            }
            return 'vendor-others';
          }
        }
      }
    }
  }
})
