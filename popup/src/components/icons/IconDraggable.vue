<template>
  <button @click="$emit('clickDrag')">
    <Icon
      :icon="`fluent:drag-20-regular`"
      :class="[props.isDraggable ? 'text-green-600' : 'opacity-20']"
    />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  isDraggable: boolean
}>()
</script>
