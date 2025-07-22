import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/lendsqr-fe-test/',
  plugins: [
    react(),
    svgr(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Ensure proper module generation and MIME type compatibility
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Use IIFE format for better compatibility with hosting providers
        format: 'es',
        // Proper file naming to avoid MIME issues
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff2?|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'css';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        // Ensure proper module exports
        exports: 'auto',
      }
    },
    // Additional options to prevent MIME type issues
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Development server config
  server: {
    port: 3000,
    host: true,
    // Ensure proper MIME types in development
    middlewareMode: false
  },
  // Preview server config (for testing production build locally)
  preview: {
    port: 4173,
    host: true
  }
});
