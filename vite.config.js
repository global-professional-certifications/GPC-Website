import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const nonBlockingCss = {
  name: 'non-blocking-css',
  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
      '<link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
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
    cssMinify: 'lightningcss',
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'vendor-react-dom';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('framer-motion') || id.includes('motion')) return 'vendor-animations';
            if (id.includes('@sanity') || id.includes('sanity')) return 'vendor-cms';
          }
        }
      }
    }
  }
})
