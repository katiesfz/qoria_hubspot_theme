import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Check for an environment variable to control minification
  const isMinifyBuild = process.env.MINIFY_CSS === 'true';

  return {
    build: {
      // Set the root of the output directory to your theme folder
      outDir: 'hubspot/q-theme',
      // Empty the output directory on each build
      emptyOutDir: false, // Set to false to avoid deleting files between builds
      minify: 'terser',
      cssMinify: isMinifyBuild,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        input: {
          'js/custom-bootstrap': resolve(__dirname, 'src/bootstrap/js/custom-bootstrap.js'),
          'css/qoria-theme': resolve(__dirname, 'src/bootstrap/scss/qoria-theme.scss'),
        },
        output: {
          entryFileNames: `[name].js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.includes('qoria-theme')) {
              return isMinifyBuild
                ? 'css/qoria-theme.min.css'
                : 'css/qoria-theme.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin'
          ]
        }
      }
    }
  };
});
