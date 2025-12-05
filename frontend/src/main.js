import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router'

import { Icon } from "@iconify/vue";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


const app = createApp(App) 
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right'
})
app.use(router)
app.use(pinia) 
app.component('Icon', Icon) 
app.mount('#app')