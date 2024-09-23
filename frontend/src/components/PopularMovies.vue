<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/api'
import { RouterLink } from 'vue-router';
import { AxiosError } from 'axios'
import type { Movie } from '@/types'

const movies = ref([] as Movie[]);
const error_message = ref('');

async function loadMovies() {
    try {
        const res = await api.get('/films')
        movies.value = res.data.dados
    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;
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
        <h2 class="title">Populares entre amigos</h2>
        <div class="poster-grid">
            <div class="shape path arrow">
                <svg width="32" height="64" viewBox="10 451 50 63">
                    <path d="M59,451 L17,482.941 L59,514"/>
                </svg>
            </div>
            <!--<div class="poster"> <img :src="`${loadPoster(5)}`" alt="Planeta dos Macacos: O Reinado"> </div>-->
            <RouterLink :to="`/films/${10}`">
                <div class="poster"><img :src="`${loadPoster(10)}`" alt="O Poderos Chefinho"></div>
            </RouterLink>
            <RouterLink :to="`/films/${8}`">
                <div class="poster"><img :src="`${loadPoster(8)}`" alt="Duna Part 02"></div>
            </RouterLink>
            <RouterLink :to="`/films/${3}`">
                <div class="poster"><img :src="`${loadPoster(3)}`" alt="Tubarão"></div>
            </RouterLink>
            <RouterLink :to="`/films/${12}`">
                <div class="poster"><img :src="`${loadPoster(12)}`" alt="Silvio"></div>
            </RouterLink>

            <div class="shape path arrow">
                <svg width="32" height="64" viewBox="1135 774 48.405 63.928">
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

    margin-right: calc(650px + 40px);
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
    border-radius: 12px;
    background-color: #b1b2b5;
    border: 1px solid black;
    text-align: center;
}

.poster img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
}
</style>
