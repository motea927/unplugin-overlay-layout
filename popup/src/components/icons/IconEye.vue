<template>
  <IconContainer @click="emit('clickEye')">
    <Icon :icon="props.isOpen ? 'iconamoon:eye-off' : 'iconamoon:eye'" />
  </IconContainer>
</template>

<script setup lang="ts">
import IconContainer from '@/components/icons/IconContainer.vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{ isOpen: boolean }>()

const emit = defineEmits<{
  (e: 'clickEye'): void
}>()
</script>
