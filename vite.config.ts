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
      '@const': path.resolve(__dirname, './src/const'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@api': path.resolve(__dirname, './src/api'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/main.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
