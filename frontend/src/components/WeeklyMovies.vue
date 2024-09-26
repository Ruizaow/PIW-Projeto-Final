<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/api';
import { RouterLink } from 'vue-router';;
import type { Movie } from '@/types';

const movies = ref([] as Movie[]);
const id_values = ref<number[]>([]);

async function loadMovies() {
    const res = await api.get('/films');
    movies.value = res.data.dados;

    id_values.value = getRandomNumbers(movies.value.length);
}

function loadPoster(id: number) {
    return movies.value[id]?.poster?.imageUrl || "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg";
}

function getRandomNumbers(limit: number): number[] {
    const numbers = Array.from({ length: limit }, (_, i) => i + 1);

    const elementsToReturn = numbers.length < 4 ? numbers.length : 4;
    
    const shuffled = numbers.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, elementsToReturn);
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
            
            <div v-for="id in id_values" :key="id" class="poster">
                <RouterLink v-if="movies[id - 1]" :to="`/films/${id}`">
                    <img :src="`${loadPoster(id - 1)}`" :alt="`${movies[id - 1].title}`">
                </RouterLink>
            </div>

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