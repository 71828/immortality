import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia({ devtools: false })
import 'element-plus/dist/index.css'
import './style.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'

const app = createApp(App)



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
