<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue';
import MyHeader from '@/components/Header.vue';
import MyFooter from '@/components/Footer.vue';

import { ref } from 'vue';
import { api } from '@/api';
import { AxiosError } from 'axios';
import type { Movie } from '@/types';
import { useUserStore } from '@/stores/userStore';

const movies = ref([] as Movie[]);
const error_message = ref('');

const userStore = useUserStore();

async function loadMovies() {
    try {
        const res = await api.get('/films');
        movies.value = res.data.dados;
            
    } catch(error) {
        if(error instanceof AxiosError) {
            error_message.value = error.response?.data.erro.mensagem;
        }
    }
}

function isValidUrl(poster: string) {
  try {
    const validUrl = new URL(poster);
  } catch(error) {
    return false;  
  }

  return true;
}

function loadPoster(movie: Movie) {
    if(isValidUrl(movie.poster.imageUrl))
        return movie.poster.imageUrl
    else
        return "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg";
}

loadMovies()
</script>

<template>
    <div v-if="userStore.userData.id > 0">
        <HeaderLogged/>

        <div v-if="error_message !== ''" class="alert-danger" role="alert">
            {{ error_message }}
        </div>
        
        <div class="filmes-section">
            <h2>Filmes</h2>
            <div v-if="userStore.role === 'Administrador'" class="button-container">
                <RouterLink to="/films/entry/new" class="button" @click="">+ Cadastrar Filme</RouterLink>
            </div>

            <!-- Grade de posters de filmes -->
            <div class="movies-grid">
                <div v-for="movie in movies" :key="movie.id" class="movie-poster">
                    <RouterLink :to="`/films/${movie.id}`" style="cursor: pointer">
                        <img :src="`${loadPoster(movie)}`"/>
                    </RouterLink>
                </div>
            </div>
        </div>

        <MyFooter/>
    </div>

    <div v-else>
        <div class="background-container">
            <div class="background-image">
                <img src="@/assets/Martin-Scorsese.png" alt="Martin-Scorsese">
            </div>
            <div class="overlay"></div>
            
            <MyHeader />

            <div v-if="error_message !== ''" class="alert-danger" role="alert">
                {{ error_message }}
            </div>
            
            <div class="filmes-section">
                <h2>Filmes</h2>
                <div v-if="userStore.role === 'Administrador'" class="button-container">
                    <RouterLink to="/films/entry/new" class="button" @click="">+ Cadastrar Filme</RouterLink>
                </div>

                <!-- Grade de posters de filmes -->
                <div class="movies-grid">
                    <div v-for="movie in movies" :key="movie.id" class="movie-poster">
                        <RouterLink :to="`/films/${movie.id}`" style="cursor: pointer">
                            <img :src="`${loadPoster(movie)}`"/>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <MyFooter/>
        </div>
    </div>
</template>

<style scoped>
.background-container {
    position: relative;
    z-index: 1;
}

.background-image {
    position: absolute;
    width: 100vw;
    z-index: -1;
    opacity: 0.8;
}

.background-image img {
    width: 100%;
}

.overlay {
    position: absolute;
    width: 100vw;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(100, 100, 100, 0.6), rgb(100, 100, 100), rgb(100, 100, 100));
    z-index: -1;
    opacity: 1;
}

.alert-danger {
    background-color: #c98383;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    top: 200px;
    position: fixed;
}


.filmes-section {
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.filmes-section h2 {
    font-family: "Pragati Narrow", sans-serif;
    font-size: 38px;
    text-align: start;
    padding-left: 238px;
}

.movies-grid {
    display: grid;
    grid-template-columns: repeat(6, 160px);
    column-gap: 10px;
    row-gap: 15px;
    justify-items: center;
    justify-content: center;
    max-width: 100%;
}

.movie-poster img {
    width: 100%;
    max-width: 200px;
    max-height: 400px;
    border-radius: 10px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 20px;
    gap: 20px;
}

.button {
    width: 180px;
    height: 45px;
    background: #c2a404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-family: "Pragati Narrow", sans-serif;
    font-weight: 300;

    text-decoration: none;
    color: black;
}
</style>