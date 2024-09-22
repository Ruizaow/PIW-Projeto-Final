import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import Loggedhome from '@/views/Loggedhome.vue'
import ProfileView from '@/views/ProfileView.vue'
import MovieView from '@/views/MovieView.vue'
import FriendView from '@/views/FriendView.vue'
import SinopseView from '@/views/SinopseView.vue'
import CadFilmView from '@/views/CadFilmView.vue'
import CrudUsers from '@/views/CrudUsers.vue'
import AddEditUser from '@/views/AddEditUser.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login',component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/loggedHome', name: 'loggedHome', component: Loggedhome },
    { path: '/profile', name: 'Profile', component: ProfileView },
    { path: '/films', name: 'Movie', component: MovieView },
    { path: '/cadfilm', name: 'cadastro', component: CadFilmView },
    { path: '/friend', name: 'friend', component: FriendView },
    { path: '/film', name: 'sinopse', component: SinopseView },
    { path: '/users', name: 'users', component: CrudUsers },
    { path: '/users/:id', name: 'addEditUser', component: AddEditUser }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;