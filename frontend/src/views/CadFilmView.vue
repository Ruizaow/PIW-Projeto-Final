<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue';
import Footer from '@/components/Footer.vue';

import { ref, onMounted } from 'vue';
import { api } from '@/api';
import { AxiosError } from 'axios';
import type { Movie } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router'

const movie = ref({
    poster: {
        imageUrl: ""
    }
} as Movie);
const id = ref<Number>(-1);

const loading = ref(false);
const error_message = ref('');

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

async function updateMovie(movie_id: Number) {
    try {
        const res = await api.put(`/films/${movie_id}`, {
            title: movie.value.title,
            releaseDate: movie.value.releaseDate,
            synopsis: movie.value.synopsis,
            poster: movie.value.poster.imageUrl,
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        movie.value = res.data.dados;

        router.push(`/films/${movie_id}`);
        
    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;

    } finally {
        loading.value = false;
    }
}

async function addMovie() {
    try {
        loading.value = true

        const res = await api.post(`/films/`, {
            title: movie.value.title,
            releaseDate: movie.value.releaseDate,
            synopsis: movie.value.synopsis,
            poster: movie.value.poster.imageUrl,
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        movie.value = res.data.dados;
        
        router.push('/films');

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;
    
    } finally {
        loading.value = false
    }
}

async function loadMovie(id: Number) {
    try {
        const res = await api.get(`/films/${id}`);
        movie.value = res.data.dados;

    } catch(error) {
        if(error instanceof AxiosError)
            console.error(error.response?.data.erro.mensagem);

    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    id.value = Number(route.params.id);

    if(id.value && id.value != -1)
        await loadMovie(id.value);
})
</script>

<template>
    <HeaderLogged />

    <div class="profile-container">
        <div v-if="error_message !== ''" class="alert-danger">
            {{ error_message }}
            <button @click="error_message = ''" type="button" class="btn-close">&times;</button>
        </div>

        <p v-if="loading" class="alert-loading">
            Esperando resposta do servidor.
        </p>

        <div class="profile-box">
            <form class="profile-info" @submit.prevent="id ? updateMovie(id) : addMovie()">
                <label>
                    Titulo:
                    <input style="color: #dddddd" v-model="movie.title" type="text"/>
                </label>
                <label>
                    Ano de Laçamento:
                    <input style="color: #dddddd" v-model="movie.releaseDate" type="text"/>
                </label>
                <label class="sinopse">
                    Sinopse:
                    <textarea style="color: #dddddd" v-model="movie.synopsis"></textarea>
                </label>

                <label>
                    URL Pôster:
                    <input style="color: #dddddd" v-model="movie.poster.imageUrl" type="text"/>
                </label>
  
                <div class="profile-actions">
                    <input v-if="id" class="button" type="submit" value="Editar Filme"/>
                    <input v-else class="button" type="submit" value="Cadastrar Filme"/>
                </div>
            </form>
        </div>
    </div>

    <Footer />
</template>

<style scoped>
.alert-danger {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    margin-bottom: 10px;

    color: red;
    background-color: #f8d7da;
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 0.25rem;
    width: 1200px;
    margin-left: 29px;
}

.btn-close {
    position: absolute;
    background: none;
    border: none;
    font-size: 18px;
    margin-top: -1px;
    margin-left: 1070px;
    cursor: pointer;
}

.alert-loading {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    margin-bottom: 10px;
}

/* ---------- SEÇÃO DE PERFIL ---------- */
.profile-container {
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
}

.profile-box {
    display: flex;
    align-items: center;

    width: 1200px;
    margin-top: -80px;
}

.profile-box img {
    width: 300px; /* Aumenta o tamanho da imagem do perfil */
    height: 400px; 
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    padding-top: 100px;
}

.profile-info label, textarea {
    display: flex;
    flex-direction: column; /* Coloca o texto em cima do input */
    font-size: 24px;
    font-family: "Pragati Narrow", sans-serif;
}

.profile-info input {
    width: 100%;
    height: 50px; /* Aumenta a altura dos inputs */
    background: #3e3d3d;
    border-radius: 50px;
    border: none;
    padding: 0 15px;
    color: rgb(3, 3, 3);
}

.sinopse input {
    width: 100%;
    height: 100px; /* Aumenta a altura dos inputs */
    background: #3e3d3d;
    border-radius: 30px;
    border: none;
    padding: 0 15px;
    color: rgb(3, 3, 3);
}

.sinopse textarea {
    width: 100%;
    height: 100px; /* Aumenta a altura do textarea */
    background: #3e3d3d;
    border-radius: 30px;
    border: none;
    padding: 15px; /* Ajusta o padding para o textarea */
    color: rgb(3, 3, 3);
    resize: none; /* Remove a opção de redimensionar o textarea */
    font-size: 15px;
}

.profile-actions {
    display: flex;
    gap: 8px;
    margin-top: 30px;
}

.profile-box .button {
    background: #c2a404;
    width: 200px; /* Aumenta os botões */
    height: 50px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: background 0.3s;
    
    text-align: center;
}

.button {
    border-radius: 30px;
    cursor: pointer;
    font-size: 22px;
    font-family: "Pragati Narrow", sans-serif;
    font-weight: 600;
    color: black;
    text-decoration: none;
    transition: background 0.3s;
}

.button:hover {
    background: #b29903;
}
</style>