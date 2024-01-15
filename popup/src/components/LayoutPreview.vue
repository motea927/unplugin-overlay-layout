<template>
  <div ref="el" :style="mergedStyle" class="z-[990] bg-no-repeat bg-center"></div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed, ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const props = defineProps<{
  isDraggable: boolean
  imageUrl: string
  opacity: number
}>()

const defaultStyle = computed<StyleValue>(() => {
  return {
    backgroundSize: '100% auto',
    backgroundImage: `url(${props.imageUrl})`
  }
})

const userStyle = window._unpluginOverlayLayout?.layoutPreview?.style || {}

const el = ref<HTMLElement | null>(null)
const { style: dragStyle } = useDraggable(el)

const controlStyle = computed<StyleValue[]>(() => {
  const pointerEventsStyle = props.isDraggable ? '' : 'pointer-events: none;'
  const commonControlStyle = [pointerEventsStyle, { opacity: `${props.opacity}%` }]

  // init value, do not change style
  if (dragStyle.value === 'left:0px;top:0px;') {
    return [...commonControlStyle]
  }

  return [
    dragStyle.value,
    {
      position: 'fixed',
      margin: 'unset'
    },
    ...commonControlStyle
  ]
})

const mergedStyle = computed<StyleValue>(() => {
  return [defaultStyle.value, userStyle, ...controlStyle.value]
})
</script>
