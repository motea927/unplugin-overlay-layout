import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'
import type { ViteDevServer } from 'vite'

import type { Options } from './types'
import '@nuxt/schema'
import sirv from 'sirv'
import viteDevServer from './viteDevServer'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

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
