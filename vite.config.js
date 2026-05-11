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
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react-router') || id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-animations';
            }
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'vendor-icons-base';
            }
            if (id.includes('@fortawesome')) {
              return 'vendor-icons-fa';
            }
            if (id.includes('@sanity') || id.includes('sanity') || id.includes('styled-components')) {
              return 'vendor-cms';
            }
            if (id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'vendor-sliders';
            }
            if (id.includes('dompurify') || id.includes('react-markdown') || id.includes('remark')) {
              return 'vendor-content';
            }
            return 'vendor-utils';
          }
        }
      }
    }
  }
})
