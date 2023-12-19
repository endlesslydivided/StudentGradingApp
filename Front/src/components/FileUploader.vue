<template>
  <div class="imageupload__wrapper">
    <h2 class="imageupload__title">Upload file</h2>
    <input
      id="imageupload"
      ref="fileupload"
      accept=".xlsx, .xls, .csv"
      type="file"
      placeholder="Upload file"
      class="imageupload__file"
      @change="onFileUpload($event)"
    />
    <label
      id="drop_zone"
      for="imageupload"
      class="imageupload__label"
      @drop="dropHandler($event)"
      @dragover="dragOverHandler($event)"
    >
      <span class="imageupload__icon">
        <UploadIcon />
      </span>
      <span class="imageupload__placeholder"> Choose a .csv file, or drag it here. </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import UploadIcon from '@/assets/icons/UploadIcon.vue'

import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const emit = defineEmits<{
  (e: 'handleFileUpload', value: File): void
}>()

const fileupload = ref<HTMLInputElement | null>(null)

const onFileUpload = async ($event: Event): Promise<void> => {
  const target = $event.target as HTMLInputElement
  if (target && target.files) {
    emit('handleFileUpload', target.files[0])
  }
}

const dropHandler = (ev: DragEvent): void => {
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    ;[...ev.dataTransfer.items].forEach(async (item) => {
      if (item.kind === 'file' && item.type === 'text/csv') {
        const file = item.getAsFile() as File
        emit('handleFileUpload', file)
      } else if (item.kind === 'file' && item.type !== 'text/csv') {
        toast.error('Incorrect file type!')
      }
    })
  }
}

const dragOverHandler = (ev: DragEvent): void => {
  ev.preventDefault()
}
</script>

<style scoped lang="scss">
.imageupload {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;

  &__icon {
    width: var(--space-xl);
    height: var(--space-xl);
  }

  &__file {
    display: none;
  }

  &__input {
    width: 100%;
    margin-bottom: var(--space-s);
  }

  &__label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-width: 300px;
    max-height: 300px;
    padding: var(--space-xl);
    border: 1px dashed var(--color-blue-regular);
    text-align: center;
    font-size: var(--font-size-s);
    color: var(--color-font-secondary);
    margin-bottom: var(--space-xs);
    overflow: hidden;
    cursor: pointer;
    background: var(--color-blue-lightest);
    gap: var(--space-s);
  }

  &__placeholder {
    display: flex;
    line-height: 1.5;
  }

  &__title {
    margin-bottom: var(--space-s);
    color: var(--color-font-primary);
    font-weight: 600;
  }

  &__submit {
    margin-top: var(--space-s);
  }
}

@media only screen and (max-width: 992px) {
  .imageupload {
    &__wrapper {
      margin-bottom: var(--space-xl);
      max-width: 100%;
    }

    &__label {
      min-width: auto;
    }
  }
}
</style>
