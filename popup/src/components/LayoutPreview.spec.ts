import { shallowMount } from '@vue/test-utils'
import LayoutPreview from './LayoutPreview.vue'
import { describe, expect, it, beforeEach } from 'vitest'

beforeEach(() => {
  window._unpluginOverlayLayout = {}
})

const mountElement = (props?: { isDraggable?: boolean; imageUrl?: string; opacity?: number }) => {
  const defaultProps = {
    isDraggable: true,
    imageUrl: '',
    opacity: 100
  }
  return shallowMount(LayoutPreview, {
    props: {
      ...defaultProps,
      ...props
    }
  })
}

describe('LayoutPreview.vue', () => {
  it('global style config can work', () => {
    const style = 'width: 20px'
    window._unpluginOverlayLayout = {
      layoutPreview: {
        style
      }
    }

    const wrapper = mountElement()
    expect(wrapper.attributes('style')).toContain(style)
  })

  it('computes the style correctly', () => {
    const imageUrl = 'test.jpg'
    const wrapper = mountElement({
      imageUrl
    })
    const style = wrapper.attributes('style')
    expect(style).toContain('background-size: 100% auto;')
    expect(style).toContain(`background-image: url(${imageUrl});`)
  })

  it('when isDraggable is false, it should have pointer-event none', () => {
    const wrapper = mountElement({
      isDraggable: false
    })

    expect(wrapper.html()).toContain('pointer-events: none;')
  })

  it('when isDraggable is true, it should not have pointer-event none', () => {
    const wrapper = mountElement({
      isDraggable: true
    })

    expect(wrapper.html()).not.toContain('pointer-events: none;')
  })
})
