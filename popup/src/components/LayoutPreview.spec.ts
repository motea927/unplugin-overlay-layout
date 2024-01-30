import { shallowMount } from '@vue/test-utils'
import LayoutPreview from './LayoutPreview.vue'
import { describe, expect, it, beforeEach } from 'vitest'

beforeEach(() => {
  window._unpluginOverlayLayout = {}
})

const mountElement = (props?: {
  isDraggable?: boolean
  imageUrl?: string
  opacity?: number
  userStyle?: string
}) => {
  const defaultProps = {
    isDraggable: true,
    imageUrl: '',
    opacity: 100,
    userStyle: ''
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
    const userStyle = 'width: 20px'

    const wrapper = mountElement({
      userStyle
    })
    expect(wrapper.attributes('style')).toContain(userStyle)
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
