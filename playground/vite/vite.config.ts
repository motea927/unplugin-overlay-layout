import { defineConfig } from 'vite'

import OverlayLayout from '../../src/vite'

export default defineConfig({
  plugins: [
    OverlayLayout({
      layoutPreview: {
        style: {
          position: 'absolute',
          margin: 'auto',
          inset: '0',
          width: '13.34rem',
          height: '7.5rem'
        },
        imageUrl: 'https://picsum.photos/200/300'
      }
    })
  ]
})
