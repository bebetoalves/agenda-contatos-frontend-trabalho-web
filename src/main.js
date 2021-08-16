import { createApp } from 'vue'
import Toast from 'vue-toastification'
import Maska from 'maska'
import App from './App.vue'
import route from './router'
import './assets/style.css'
import 'vue-toastification/dist/index.css'

createApp(App).use(route).use(Toast, { timeout: 2500 }).use(Maska).mount('#app')
