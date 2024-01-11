<template>
  <button @click="$emit('clickEye')">
    <Icon :icon="props.isOpen ? 'iconamoon:eye-off' : 'iconamoon:eye'" />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{ isOpen: boolean }>()
</script>

<style scoped></style>
