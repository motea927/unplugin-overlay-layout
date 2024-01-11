import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [Inspect(), Unplugin(), VueDevTools()]
})
