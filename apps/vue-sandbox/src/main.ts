import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ComponentLibrary } from 'vue-library/dist/plugin'

const app = createApp(App).use(ComponentLibrary)
app.use(router)

app.mount('#app')
