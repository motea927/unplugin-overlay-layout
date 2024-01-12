import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    // Inspect(),
    Unplugin({
      layoutPreview: {
        style: {
          position: 'absolute',
          margin: 'auto',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          width: '13.34rem',
          height: '7.5rem',
          backgroundImage: 'url(https://picsum.photos/200/300)'
        }
      }
    })
    // VueDevTools()
  ]
})
