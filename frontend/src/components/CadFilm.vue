<script setup lang="ts">
import { ref } from 'vue';
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

const loading = ref(false);

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

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
            console.error(error.response?.data.erro.mensagem);
    
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="profile-container">
        <div class="profile-box">
            <form v-if="!loading" class="profile-info" @submit.prevent="addMovie">
                <label>
                    Titulo:
                    <input v-model="movie.title" type="text"/>
                </label>
                <label>
                    Ano de Laçamento:
                    <input v-model="movie.releaseDate" type="text"/>
                </label>
                <label class="sinopse">
                    Sinopse:
                    <textarea v-model="movie.synopsis"></textarea>
                </label>

                <label>
                    URL Poster:
                    <input v-model="movie.poster.imageUrl" type="text"/>
                </label>
  
                <div class="profile-actions">
                    <input class="button" type="submit" value="Cadastrar Filme"/>
                </div>
            </form>
            <p v-else class="alert-loading">
                Esperando resposta do servidor.
            </p>
        </div>
    </div>
</template>
  
<style scoped>
.alert-loading {
    padding-top: 85px;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
}

/* ---------- SEÇÃO DE PERFIL ---------- */
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding-top: 80px;
    
}

.profile-box {
    width: 1200px; /* Aumenta a largura do perfil */
    display: flex;
    align-items: center;
    gap: 80px; /* Aumenta o espaço entre a imagem e o conteúdo */
    padding-left: 50px;
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
