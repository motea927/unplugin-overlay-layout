<template>
  <main class="fixed right-0 top-1/2 transform -translate-y-1/2 z-[999]">
    <div class="flex flex-col p-2 divide-y shadow-xl rounded-xl">
      <Component
        v-for="icon in icons"
        :is="icon"
        class="p-2"
        :is-open="state.isOpen"
        @click-eye="state.isOpen = !state.isOpen"
      />
    </div>

    <Teleport to="body">
      <LayoutPreview v-if="state.isOpen" class="fixed inset-0 z-[990]" />
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'

import IconEye from '@/components/icons/IconEye.vue'
import IconSetting from '@/components/icons/IconSetting.vue'

import LayoutPreview from '@/components/LayoutPreview.vue'

const icons = [IconEye, IconSetting]

const state = useStorage(
  'unplugin-overlay-layout',
  {
    isOpen: true,
    layoutPreview: {
      style: ''
    }
  },
  sessionStorage
)
</script>
