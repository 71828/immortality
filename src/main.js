import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

const pinia = createPinia()
import 'element-plus/dist/index.css'
import './style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
