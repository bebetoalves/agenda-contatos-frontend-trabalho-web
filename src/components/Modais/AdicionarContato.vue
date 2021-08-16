<template>
  <ModalGenerico @confirm="confirmar" @cancel="cancelar">
    <template v-slot:title> Adicionar Contato </template>
    <p class="text-gray-500 mt-2 mb-5">Para adicionar um novo contato à sua agenda, por favor preencher o formulário corretamente!</p>
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
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import ModalGenerico from '../ModalGenerico.vue'

export default {
  components: {
    ModalGenerico,
  },
  emits: ['atualiza-contatos'],
  setup(props, { emit }) {
    const toast = useToast()

    const form = reactive({
      nome: null,
      endereco: null,
      email: null,
      telefone: null,
    })

    function confirmar(fecharModal) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + `/adicionar`, { ...form })
        .then(() => {
          emit('atualiza-contatos', true)

          form.nome = null
          form.endereco = null
          form.email = null
          form.telefone = null

          toast.success('Contato adicionado com sucesso!')
        })
        .catch(() => toast.error('Houve um erro ao adicionar o contato!'))

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
