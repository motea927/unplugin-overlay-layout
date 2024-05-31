import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ViteDevServer } from 'vite'
import sirv from 'sirv'

export default function configureServer(server: ViteDevServer) {
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
}
