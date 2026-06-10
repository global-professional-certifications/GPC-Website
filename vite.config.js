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
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Order matters: react-router paths also contain "react", so match
            // it before the generic React grouping below.
            if (id.includes('react-router')) return 'vendor-router';
            // Keep React core + react-dom + scheduler in ONE chunk so react-dom
            // never initializes before React exists (fixes "Cannot set
            // properties of undefined (setting 'Children')"). Slash-bounded so
            // we don't sweep in react-icons / react-fontawesome / etc.
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/')
            ) return 'vendor-react';
            // NOTE: Do NOT hand-split @sanity and motion into separate chunks.
            // They are interdependent (@sanity/ui depends on motion), so
            // splitting them produced a circular chunk dependency
            // (vendor-cms <-> vendor-animations) that broke runtime module
            // initialization and rendered a blank page in production. The
            // path-substring matching was also non-portable across package
            // managers (npm vs pnpm), so it built fine locally but failed on
            // Vercel. Let Rollup chunk these automatically — its splitting is
            // import-graph-aware and will not create entry cycles.
          }
        }
      }
    }
  }
})
