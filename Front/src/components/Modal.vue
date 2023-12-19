<template>
  <div class="modal__activator" @click="toggleModalStatus">
    <slot name="trigger"></slot>
  </div>

  <Teleport to="body">
    <div class="modal">
      <Transition>
        <div v-if="modalOpened" class="modal__wrapper">
          <div ref="target" class="modal__content">
            <slot name="modal" :close="toggleModalStatus"> </slot>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    closeOnClickOutside?: boolean
  }>(),
  {
    closeOnClickOutside: true
  }
)

const modalOpened = ref<boolean>()
const target = ref<HTMLElement | null>(null)

const toggleModalStatus = () => {
  modalOpened.value = !modalOpened.value
}

onClickOutside(target, () => {
  if (props.closeOnClickOutside) {
    modalOpened.value = false
  }
})

defineExpose({
  toggleModalStatus
})
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal {
  &__wrapper {
    background-color: rgba(35, 35, 35, 0.4);
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl);
    background-color: var(--color-background-white);
    border-radius: 10px;
    max-width: 100%;
  }
}
</style>
