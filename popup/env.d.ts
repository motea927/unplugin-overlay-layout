/// <reference types="vite/client" />

import type { Options } from '../src/types'
export declare global {
  interface Window {
    _unpluginOverlayLayout: Options
  }
}
