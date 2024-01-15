<template>
  <IconContainer
    v-for="icon in icons"
    :key="icon.name"
    @click="handleClickOperation(icon.offset)"
    :class="icon.className"
  >
    <Icon :icon="icon.name" />
    <p v-if="icon.offset > 0" class="text-[12px]">{{ props.opacity }} %</p>
  </IconContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconContainer from '@/components/icons/IconContainer.vue'
import { Icon } from '@iconify/vue'

type IconData = {
  offset: number
  name: string
  className: string[] | string
}

const props = defineProps<{ opacity: number }>()

const emit = defineEmits<{
  (e: 'operation', offset: number): void
}>()

const icons = computed<Array<IconData>>(() => {
  const disabledClassName = ['opacity-50', 'cursor-not-allowed']

  return [
    {
      offset: 10,
      name: 'mdi:eye-plus-outline',
      className: props.opacity >= 100 ? disabledClassName : ''
    },
    {
      offset: -10,
      name: 'mdi:eye-minus-outline',
      className: props.opacity <= 0 ? disabledClassName : ''
    }
  ]
})

const handleClickOperation = (offset: number) => {
  if (offset > 0 && props.opacity === 100) return
  if (offset < 0 && props.opacity === 0) return
  emit('operation', offset)
}
</script>
