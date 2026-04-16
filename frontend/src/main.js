import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'          // globales CSS

createApp(App).use(router).mount('#app')