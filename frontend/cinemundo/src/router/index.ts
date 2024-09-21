import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Loggedhome from '@/views/Loggedhome.vue'
import ProfileView from '@/views/ProfileView.vue'
import MovieView from '@/views/MovieView.vue'
import FriendView from '@/views/FriendView.vue'
import SinopseView from '@/views/SinopseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login',component: LoginView },
    { path: '/register', name: 'register', component: RegisterView},
    { path: '/loggedHome', name: 'Logged', component: Loggedhome},
    { path: '/profile', name: 'Profile', component: ProfileView},
    { path: '/movie', name: 'Movie', component: MovieView},
    { path: '/friend', name: 'friend', component: FriendView},
    { path: '/sinopse', name: 'sinopse', component: SinopseView},

    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue')}

  ]
})

export default router;