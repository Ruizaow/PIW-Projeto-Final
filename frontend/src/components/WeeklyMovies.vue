<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/api'
import { RouterLink } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore'
import type { ApplicationError, Movie } from '@/types'

const movies = ref([] as Movie[]);
const exception = ref<ApplicationError>()

const movieStore = useMovieStore()

async function loadMovies() {
    try {
        const res = await api.get('/films')
        movies.value = res.data.dados
    } catch(error) {
        exception.value = error as Error
    }
}

function loadPoster(movie_id: number) {
    try {
        return movies.value[movie_id - 1].poster.imageUrl
    } catch(error) {
        return "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg"
    }
}

loadMovies();
</script>

<template>
    <div class="section">
        <h2 class="title">Populares da semana</h2>
        <div class="poster-grid">
            <div class="shape path arrow">
                <svg width="32" height="64" viewBox="10 451 50 63">
                    <path d="M59,451 L17,482.941 L59,514"/>
                </svg>
            </div>
            <RouterLink to="/film">
                <div class="poster"> <img :src="`${loadPoster(5)}`" alt="Planeta dos Macacos: O Reinado"> </div>
            </RouterLink>
            <RouterLink to="/film">
                <div class="poster"> <img :src="`${loadPoster(6)}`" alt="Meu Amigo Totoro"> </div>
            </RouterLink>
            <RouterLink to="/film">
                <div class="poster"> <img :src="`${loadPoster(7)}`" alt="De Volta Para o Futuro"> </div>
            </RouterLink>
            <RouterLink to="/film">
                <div class="poster"> <img :src="`${loadPoster(8)}`" alt="Duna: Parte Dois"> </div>
            </RouterLink>
            <div class="shape path arrow">
                <svg width="32" height="64" viewBox="1135 774 49 65">
                    <path d="M1135,836.984 L1177.707,805.995 L1136.415,774"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
.section {
    margin: 70px;
}

.title {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    font-size: 24px;

    display: flex;
    justify-content: center;

    margin-right: calc(671.25px + 40px);
    margin-bottom: 20px;
}

.poster-grid {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.poster {
    width: 224px;
    height: 340px;
}

.poster img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
}
</style>