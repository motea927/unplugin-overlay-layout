<template>
  <div ref="el" :style="[style, ...computedDragStyle]" class="z-[990]"></div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed, ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const props = defineProps<{
  isDraggable: boolean
}>()

const style = window._unpluginOverlayLayout?.layoutPreview?.style || {}

const el = ref<HTMLElement | null>(null)
const { style: dragStyle } = useDraggable(el)

const computedDragStyle = computed<StyleValue>(() => {
  const pointerEventsStyle = props.isDraggable ? '' : 'pointer-events: none;'

  // init value, do not change style
  if (dragStyle.value === 'left:0px;top:0px;') {
    return [pointerEventsStyle]
  }

  return [
    dragStyle.value,
    {
      position: 'fixed',
      margin: 'unset'
    },
    pointerEventsStyle
  ]
})
</script>
