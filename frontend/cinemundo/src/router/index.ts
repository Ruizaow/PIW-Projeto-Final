import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Loggedhome from '@/views/Loggedhome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', name: 'home', component: HomeView }, //OS COMPONETES QUE SERÃO RENDERIZAODA
    { path: '/login', name: 'login',component: LoginView },
    { path: '/register', name: 'registro', component: RegisterView},
    { path: '/LoggerdHome', name: 'Logged', component: Loggedhome},

    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue')}

  ]
})

export default router;
