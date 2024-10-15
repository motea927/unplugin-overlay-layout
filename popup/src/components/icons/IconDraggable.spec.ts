import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon } from '@iconify/vue'
import IconDraggable from './IconDraggable.vue'

const mountElement = (props?: { isDraggable?: boolean }) => {
  const defaultProps = {
    isDraggable: true
  }

  return mount(IconDraggable, {
    props: {
      ...defaultProps,
      ...props
    }
  })
}
describe('IconDraggable.vue', () => {
  it('applies the correct class when isDraggable is true', () => {
    const wrapper = mountElement({
      isDraggable: true
    })

    const icon = wrapper.findComponent(Icon)

    expect(icon.classes()).toContain('text-green-900')
    expect(icon.classes()).not.toContain('opacity-20')
  })

  it('applies the correct class when isDraggable is false', () => {
    const wrapper = mountElement({
      isDraggable: false
    })
    const icon = wrapper.findComponent(Icon)
    expect(icon.classes()).toContain('opacity-20')
    expect(icon.classes()).not.toContain('text-green-900')
  })

  it('emits the clickDrag event when clicked', async () => {
    const wrapper = mountElement({
      isDraggable: true
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clickDrag')
  })
})
