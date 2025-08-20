import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'index.js',
        format: 'iife',
        name: 'ChromeStartoid'
      }
    },
    target: 'es2015',
    minify: false,
    sourcemap: true,
    copyPublicDir: true
  },
  publicDir: 'public',
  define: {
    global: 'globalThis'
  },
  server: {
    hmr: true
  }
});