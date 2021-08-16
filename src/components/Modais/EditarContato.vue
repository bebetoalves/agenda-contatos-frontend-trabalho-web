<template>
  <ModalGenerico @confirm="confirmar" @cancel="cancelar">
    <template v-slot:title> Editar Contato </template>
    <p class="text-gray-500 mt-2 mb-5">Para editar as informações do contato, preencha corretamente o formulário abaixo!</p>
    <form action="" class="flex flex-col space-y-5">
      <label class="block">
        <span class="text-gray-700">Nome</span>
        <input
          v-model="form.nome"
          type="text"
          name="nome"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>

      <label class="block">
        <span class="text-gray-700">Endereço</span>
        <input
          v-model="form.endereco"
          type="text"
          name="endereco"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>

      <label class="block">
        <span class="text-gray-700">E-mail</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>

      <label class="block">
        <span class="text-gray-700">Telefone</span>
        <input
          v-model="form.telefone"
          v-maska="['(##) # ####-####', '(##) ####-####']"
          type="text"
          name="telefone"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </label>
    </form>
  </ModalGenerico>
</template>

<script>
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import ModalGenerico from '../ModalGenerico.vue'

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

    const form = ref({
      nome: null,
      endereco: null,
      email: null,
      telefone: null,
    })

    watch(
      () => props.contato,
      (novoContato, contatoAntigo) => {
        form.value = { ...novoContato }
      }
    )

    function confirmar(fecharModal) {
      axios
        .patch(import.meta.env.VITE_BACKEND_URL + `/atualizar/${form.value.id}`, {
          nome: form.value.nome,
          endereco: form.value.endereco,
          email: form.value.email,
          telefone: form.value.telefone,
        })
        .then(() => {
          emit('atualiza-contatos', true)

          toast.success('Contato atualizado com sucesso!')
        })
        .catch(() => toast.error('Houve um erro ao editar o contato!'))

      fecharModal()
    }

    function cancelar(fecharModal) {
      fecharModal()
    }

    return {
      form,
      confirmar,
      cancelar,
    }
  },
}
</script>

<style></style>
