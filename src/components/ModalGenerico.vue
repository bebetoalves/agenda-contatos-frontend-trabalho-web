<template>
  <VueFinalModal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
    :transition="{
      'enter-active-class': 'transition duration-200 ease-in-out transform',
      'enter-from-class': 'translate-y-full',
      'enter-to-class': 'translate-y-0',
      'leave-active-class': 'transition duration-200 ease-in-out transform',
      'leave-to-class': 'translate-y-full',
      'leave-from-class': 'translate-y-0',
    }"
  >
    <div class="p-4">
      <span class="mr-8 font-display text-lg leading-6 font-medium text-gray-900">
        <slot name="title"></slot>
      </span>
      <div class="flex-grow overflow-y-auto">
        <slot :params="params"></slot>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button type="button" class="botao-confirmar" @click="$emit('confirm', close)">Confirmar</button>
      <button type="button" class="botao-cancelar" @click="$emit('cancel', close)">Cancelar</button>
    </div>
    <button class="absolute top-0 right-0 mt-2 mr-2" @click="close">
      <XIcon class="w-4 h-4" />
    </button>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import { XIcon } from '@heroicons/vue/outline'

export default {
  inheritAttrs: false,
  emits: ['cancel', 'confirm'],
  components: {
    VueFinalModal,
    XIcon,
  },
}
</script>

<style scoped>
.botao-cancelar {
  @apply mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
}

.botao-confirmar {
  @apply w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-fuchsia-blue-500 text-base font-medium text-white hover:bg-fuchsia-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-blue-500 sm:ml-3 sm:w-auto sm:text-sm;
}
</style>
