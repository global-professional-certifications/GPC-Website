import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const nonBlockingCss = {
  name: 'non-blocking-css',
  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
      '<link rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'" href="$1"><noscript><link rel="stylesheet" href="$1"></noscript>'
    );
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nonBlockingCss],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', '@fortawesome/react-fontawesome'],
          animations: ['framer-motion']
        }
      }
    }
  }
})
