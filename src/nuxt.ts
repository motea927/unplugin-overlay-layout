import { defineNuxtModule } from '@nuxt/kit'

import type { Options } from './types'
import '@nuxt/schema'

export interface ModuleOptions extends Options {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'unplugin-overlay-layout',
    configKey: 'OverlayLayout'
  },
  defaults: {
    // ...default options
  },
  async setup(options, nuxt) {
    // Disable in test mode
    if (
      process.env.TEST ||
      process.env.NODE_ENV === 'test' ||
      nuxt.options.test
    ) {
      return
    }

    if (!nuxt.options.dev) {
      return
    }

    const viteDevServer = await (await import('./viteDevServer')).default
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
