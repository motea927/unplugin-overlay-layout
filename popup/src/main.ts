import { createApp, h } from 'vue'
import type { Component } from 'vue'

import App from './App.vue'

import styles from './index.css?inline'

function createDevToolsContainer(App: Component) {
  // Plugin root div
  const CONTAINER_ID = '__vue-overlay-layout__'
  const el = document.createElement('div')
  el.setAttribute('id', CONTAINER_ID)
  el.setAttribute('data-v-inspector-ignore', 'true')

  // Use Shadow DOM to avoid CSS conflicts
  const shadowRoot = el.attachShadow({ mode: 'open' })
  const styleEl = document.createElement('style')
  styleEl.textContent = styles
  shadowRoot.appendChild(styleEl)

  const contentEl = document.createElement('div')
  contentEl.setAttribute('id', 'shadow-root-content')
  shadowRoot.appendChild(contentEl)

  document.getElementsByTagName('body')[0].appendChild(el)

  const app = createApp({
    render: () => h(App),
    devtools: {
      hide: true
    }
  })
  app.mount(contentEl)
}

createDevToolsContainer(App)
