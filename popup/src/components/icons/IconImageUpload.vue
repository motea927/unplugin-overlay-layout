<template>
  <IconContainer @click="handleClickImageUpload">
    <Icon :icon="`uil:image-upload`" />
  </IconContainer>
</template>

<script setup lang="ts">
import IconContainer from '@/components/icons/IconContainer.vue'

import { useFileSystemAccess } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const emit = defineEmits<{
  (e: 'uploadImage', base64: string): void
}>()

const { file, open } = useFileSystemAccess()

const transformFileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = reject

    fileReader.readAsDataURL(file)
  })

const handleClickImageUpload = async () => {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }
      }
    ],
    excludeAcceptAllOption: true,
    multiple: false
  }
  await open(pickerOpts)
  if (!file.value) return
  const base64 = await transformFileToBase64(file.value)
  emit('uploadImage', base64 as string)
}
</script>
