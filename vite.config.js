import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    // This points to where your compiled JS should go inside your theme
    outDir: 'qoria-theme/js', 
    minify: 'terser', // or 'esbuild' (default)
    cssMinify: true,
    terserOptions: {
      compress: {
        // Optional: Remove console logs and debuggers in production
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false, // Explicitly remove all comments, including legal ones
      },
    },
    lib: {
      entry: resolve(__dirname, 'custom-bootstrap.js'),
      name: 'CustomBootstrap',
      fileName: 'custom-bootstrap',
      formats: ['iife'] // IIFE is best for simple browser script tags
    },
    rollupOptions: {
      output: {
        // Keeps the filename predictable for HubSpot
        entryFileNames: `[name].js`, 
      }
    }
  }
});