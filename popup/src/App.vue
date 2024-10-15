<template>
  <main class="fixed right-2 top-1/2 transform -translate-y-1/2 z-[999]">
    <div class="flex flex-col p-2 bg-white divide-y shadow-xl rounded-[12px]">
      <IconEye :isOpen="state.isOpen" @click-eye="state.isOpen = !state.isOpen" />

      <IconDraggable
        @clickDrag="state.isDraggable = !state.isDraggable"
        :is-draggable="state.isDraggable"
      />

      <IconImageUpload
        @upload-image="(base64: string) => (state.layoutPreview.imageUrl = base64)"
      />

      <IconOpacity :opacity="state.layoutPreview.opacity" @operation="handleClickOperation" />
    </div>

    <Teleport to="body">
      <LayoutPreview
        v-show="state.isOpen"
        :is-draggable="state.isDraggable"
        :image-url="state.layoutPreview.imageUrl"
        :opacity="state.layoutPreview.opacity"
        :user-style="state.layoutPreview.style"
      />
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue'

import IconEye from '@/components/icons/IconEye.vue'
import IconDraggable from '@/components/icons/IconDraggable.vue'
import IconImageUpload from '@/components/icons/IconImageUpload.vue'
import IconOpacity from '@/components/icons/IconOpacity.vue'
import LayoutPreview from '@/components/LayoutPreview.vue'

import { deepEqual } from '@/utils'

const getDefaultLayoutPreview = () => {
  return {
    style: window._unpluginOverlayLayout.layoutPreview?.style || '',
    imageUrl: window._unpluginOverlayLayout.layoutPreview?.imageUrl || '',
    opacity: window._unpluginOverlayLayout.layoutPreview?.opacity || 50
  }
}

const state = useStorage(
  'unplugin-overlay-layout',
  {
    cache: window._unpluginOverlayLayout,
    isOpen: true,
    isDraggable: false,
    layoutPreview: getDefaultLayoutPreview()
  },
  sessionStorage,
  { mergeDefaults: true }
)

onMounted(() => {
  const isEqual = deepEqual(state.value.cache, window._unpluginOverlayLayout)
  if (isEqual) return

  // force update
  state.value.cache = window._unpluginOverlayLayout
  state.value.layoutPreview = getDefaultLayoutPreview()
})

const handleClickOperation = (offset: number) => {
  if (offset > 0) {
    state.value.layoutPreview.opacity = Math.min(100, state.value.layoutPreview.opacity + offset)
  } else {
    state.value.layoutPreview.opacity = Math.max(0, state.value.layoutPreview.opacity + offset)
  }
}
</script>
