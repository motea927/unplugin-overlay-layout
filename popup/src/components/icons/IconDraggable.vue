<template>
  <IconContainer @click="emit('clickDrag')">
    <Icon
      :icon="`fluent:drag-20-regular`"
      :class="[props.isDraggable ? 'text-green-600' : 'opacity-20']"
    />
  </IconContainer>
</template>

<script setup lang="ts">
import IconContainer from '@/components/icons/IconContainer.vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  isDraggable: boolean
}>()

const emit = defineEmits<{
  (e: 'clickDrag'): void
}>()
</script>
