/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/mixins.scss"; @import "./src/styles/placeholders.scss";`,
      },
    },
  },

  build: {
    sourcemap: true,
  },
  plugins: [tsconfigPaths()],
  base: '',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
