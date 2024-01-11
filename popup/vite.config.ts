import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import fse from 'fs-extra'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    {
      name: 'vite-plugin-copy-bundle',
      apply: 'build',
      enforce: 'post',
      closeBundle() {
        // copy
        const clientFile = resolve(__dirname, './dist')
        fse.copySync(clientFile, resolve(__dirname, '../src/overlay-layout/'))
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': process.env
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'devtoolsOverlay',
      fileName: () => 'overlay-layout.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'overlay-layout.[ext]',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
