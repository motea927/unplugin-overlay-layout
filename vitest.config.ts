import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/popup/src/'
    }
  },
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
