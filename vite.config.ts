import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path'; // Removed because 'path' is not available in browser environments

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
