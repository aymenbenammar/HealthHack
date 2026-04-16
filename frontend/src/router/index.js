import { createRouter, createWebHistory } from 'vue-router'
import HealthHackPage from '../pages/HealthHackPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HealthHackPage }
    ]
})