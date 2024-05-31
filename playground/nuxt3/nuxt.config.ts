import OverlayLayout from '../../src/nuxt'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      OverlayLayout,
      {
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
      }
    ]
  ]
})
