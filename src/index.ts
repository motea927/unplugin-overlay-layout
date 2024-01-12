import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import type { ViteDevServer } from 'vite'
import sirv from 'sirv'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const unpluginFactory: UnpluginFactory<
  Options | undefined
> = options => {
  return {
    name: 'unplugin-overlay-layout',
    enforce: 'pre',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const DIR_DIST =
        typeof __dirname !== 'undefined'
          ? __dirname
          : dirname(fileURLToPath(import.meta.url))
      const DIR_CLIENT = resolve(DIR_DIST, './overlay-layout/')

      server.middlewares.use(
        `/__OVERLAY_LAYOUT__`,
        sirv(DIR_CLIENT, {
          single: true,
          dev: true
        })
      )
    },
    transformIndexHtml(html: string) {
      const injectInlineScript = html.replace(
        '</head>',
        `
          <script type="text/javascript">
            window._unpluginOverlayLayout = {};
            window._unpluginOverlayLayout = ${JSON.stringify(options)};
          </script>
        </head>
        `
      )
      return {
        html: injectInlineScript,
        tags: [
          {
            tag: 'script',
            injectTo: 'head',
            attrs: {
              type: 'module',
              src: '/__OVERLAY_LAYOUT__/overlay-layout.js'
            }
          },
          {
            tag: 'link',
            injectTo: 'head',
            attrs: {
              rel: 'stylesheet',
              href: '/__OVERLAY_LAYOUT__/overlay-layout.css'
            }
          }
        ]
      }
    }
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
