import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Icon } from '@iconify/vue'
import IconEye from './IconEye.vue'

const mountElement = (props?: { isOpen?: boolean }) => {
  const defaultProps = {
    isOpen: true
  }

  return mount(IconEye, {
    props: {
      ...defaultProps,
      ...props
    }
  })
}
describe('IconEye.vue', () => {
  it('render eye-off icon when isOpen', () => {
    const wrapper = mountElement({
      isOpen: true
    })

    const icon = wrapper.findComponent(Icon)
    expect(icon.vm.$attrs.icon).toBe('iconamoon:eye-off')
  })

  it('render eye-open icon when is not open', () => {
    const wrapper = mountElement({
      isOpen: false
    })

    const icon = wrapper.findComponent(Icon)
    expect(icon.vm.$attrs.icon).toBe('iconamoon:eye')
  })

  it('emits the clickEye event when clicked', async () => {
    const wrapper = mountElement()
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('clickEye')
  })
})
