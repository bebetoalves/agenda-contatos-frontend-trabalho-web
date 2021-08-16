<template>
  <ModalGenerico @confirm="confirmar" @cancel="cancelar">
    <template v-slot:title> Apagar Contato </template>
    <p class="text-gray-500 my-3">Você tem certeza que deseja apagar este contato?</p>
  </ModalGenerico>
</template>

<script>
import { useToast } from 'vue-toastification'
import ModalGenerico from '../ModalGenerico.vue'
import axios from 'axios'

export default {
  components: {
    ModalGenerico,
  },
  props: {
    contato: {
      default: null,
      type: Object,
    },
  },
  emits: ['atualiza-contatos'],
  setup(props, { emit }) {
    const toast = useToast()

    function confirmar(fecharModal) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + `/apagar/${props.contato.id}`)
        .then(() => {
          toast.success('Contato apagado com sucesso!')

          emit('atualiza-contatos', true)
        })
        .catch(() => toast.error('Houve um erro ao apagar o contato!'))

      fecharModal()
    }

    function cancelar(fecharModal) {
      fecharModal()
    }

    return {
      confirmar,
      cancelar,
    }
  },
}
</script>

<style></style>
