import { defineNuxtModule } from '@nuxt/kit'

import type { Options } from './types'
import '@nuxt/schema'
import viteDevServer from './viteDevServer'

export interface ModuleOptions extends Options {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'unplugin-overlay-layout',
    configKey: 'OverlayLayout'
  },
  defaults: {
    // ...default options
  },
  setup(options, nuxt) {
    nuxt.hook('vite:serverCreated', viteDevServer)

    nuxt.options.app.head.script ||= []
    nuxt.options.app.head.link ||= []

    nuxt.options.app.head.script.push(
      ...[
        {
          innerHTML: `
        window._unpluginOverlayLayout = {};
        window._unpluginOverlayLayout = ${JSON.stringify(options)};
      `
        },
        {
          src: '/__OVERLAY_LAYOUT__/overlay-layout.js',
          defer: true
        }
      ]
    )

    nuxt.options.app.head.link.push(
      ...[{ rel: 'stylesheet', href: '/__OVERLAY_LAYOUT__/overlay-layout.css' }]
    )
  }
})
