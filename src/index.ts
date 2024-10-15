import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import viteDevServer from './viteDevServer'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options
) => {
  return {
    name: 'unplugin-overlay-layout',
    enforce: 'pre',
    apply: 'serve',
    configureServer: viteDevServer,
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
          }
        ]
      }
    }
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
