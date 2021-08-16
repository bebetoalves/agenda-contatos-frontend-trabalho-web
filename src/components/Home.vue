<template>
  <div class="bg-gradient-to-b from-fuchsia-blue-50 via-white to-white">
    <div class="w-3/5 mx-auto min-h-screen py-10">
      <div id="header" class="flex justify-between py-5 align-middle">
        <div class="text-fuchsia-blue-500 font-display font-bold text-3xl">Agenda de Contatos</div>
        <button
          @click="mostrarModalAdicionar = !mostrarModalAdicionar"
          class="bg-fuchsia-blue-500 hover:bg-fuchsia-blue-400 shadow rounded text-xs uppercase font-medium text-white px-4 py-3"
        >
          Adicionar Contato
        </button>
      </div>

      <div id="tabela" class="flex flex-col py-12">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-fuchsia-blue-500">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nome</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Endereço</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">E-mail</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Telefone</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Data de Criação</th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <template v-if="contatos.length === 0">
                    <td class="px-6 py-6 whitespace-nowrap" colspan="6">
                      <div class="text-xl font-display font-medium text-gray-400 text-center">Não há contatos registrados!</div>
                    </td>
                  </template>

                  <template v-else>
                    <tr v-for="contato in contatos" :key="contato.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-800 font-display">
                          {{ contato.nome }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-800 font-display">
                          {{ contato.endereco }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-800 font-display">
                          {{ contato.email }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="text-sm text-gray-800 font-display">
                          {{ contato.telefone }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div class="text-sm text-gray-800 font-display">
                          {{ formatarData(contato.createdAt) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="abrirModalEditar(contato)" class="bg-java-500 hover:bg-java-400 p-1 text-white rounded mr-2">
                          <PencilIcon class="h-4 w-4" />
                        </button>

                        <button @click="abrirModalApagar(contato)" class="bg-red-400 hover:bg-red-300 p-1 text-white rounded">
                          <TrashIcon class="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <ModalApagarContato @atualiza-contatos="atualizarContatos" v-model="mostrarModalApagar" :contato="contatoSelecionado" />
    <ModalAdicionarContato @atualiza-contatos="atualizarContatos" v-model="mostrarModalAdicionar" />
    <ModalEditarContato @atualiza-contatos="atualizarContatos" v-model="mostrarModalEditar" :contato="contatoSelecionado" />
  </teleport>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline'
import ModalApagarContato from './Modais/ApagarContato.vue'
import ModalAdicionarContato from './Modais/AdicionarContato.vue'
import ModalEditarContato from './Modais/EditarContato.vue'

export default {
  components: {
    PencilIcon,
    TrashIcon,
    ModalApagarContato,
    ModalAdicionarContato,
    ModalEditarContato,
  },
  setup() {
    const contatos = ref([])
    const contatoSelecionado = ref({})
    const mostrarModalApagar = ref(false)
    const mostrarModalAdicionar = ref(false)
    const mostrarModalEditar = ref(false)
    const toast = useToast()

    function formatarData(data) {
      return moment(data).format('DD/MM/YYYY - HH:mm:ss')
    }

    function atualizarContatos() {
      axios
        .get(import.meta.env.VITE_BACKEND_URL)
        .then((response) => (contatos.value = response.data))
        .catch(() => toast.error('Houve um problema ao recuperar os contatos!'))

      contatoSelecionado.value = {}
    }

    function abrirModalApagar(contato) {
      mostrarModalApagar.value = !mostrarModalApagar.value
      contatoSelecionado.value = contato
    }

    function abrirModalEditar(contato) {
      mostrarModalEditar.value = !mostrarModalEditar.value
      contatoSelecionado.value = contato
    }

    atualizarContatos()

    return {
      contatos,
      contatoSelecionado,
      mostrarModalApagar,
      mostrarModalAdicionar,
      mostrarModalEditar,
      atualizarContatos,
      abrirModalApagar,
      abrirModalEditar,
      formatarData,
    }
  },
}
</script>

<style></style>
