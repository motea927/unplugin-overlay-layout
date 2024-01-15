# unplugin-overlay-layout

Transform your development workflow with an immersive layout design experience! This Vite plugin revolutionizes your process by seamlessly overlaying different layout images onto your webpage, providing an instant and dynamic preview for efficient design slicing.

![image](https://raw.githubusercontent.com/motea927/mt-v-safe-html/master/assets/demo.gif)

## 💪 Motivation

In modern web design, static layout images (`jpg` or `png`) occasionally present a challenge. While CSS overlays are a common solution, they can be cumbersome. Our motivation for creating this plugin is to provide a non-intrusive, development-focused alternative. Unlike permanent CSS overlays, our tool operates solely during development, allowing seamless layout image integration onto your webpage. Enjoy efficient design slicing without compromising your project's styles. Elevate your development experience with this Vite Plugin!

## 🚀 Features

- ⚡ Non-Intrusive: Functions exclusively during development and does not get bundled into the project.
- 🎨 Live Overlay for Effortless Design Slicing: Easily overlay different layout images onto your webpage using a floating panel for a real-time preview and simplified design slicing.
- 🚅 Perfect for Traditional Workflows: Ideal for older design approaches with a single layout image, eliminating the need for constant switching or refreshing. Instantly view the final layout overlaid on your browser.
- 🛠 Integrated with Vite: Seamlessly integrates into your Vite development workflow with minimal configuration overhead.

## Install

```bash
# npm
npm i -D unplugin-overlay-layout

# yarn
yarn add -D unplugin-overlay-layout

# pnpm
pnpm add -D unplugin-overlay-layout
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import OverlayLayout from 'unplugin-overlay-layout/vite'

export default defineConfig({
  plugins: [
    OverlayLayout({
      /* options */
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
```

Example: [`playground/`](./playground/)

<br></details>

## Configuration

Options: [`Options/`](./src/types.ts)

```ts
OverlayLayout({
  layoutPreview?: {
    style: '',
    imageUrl: ''
    opacity: 50
  }
})
```
