<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue';
import Footer from '@/components/Footer.vue';

import { ref } from 'vue'
import { api } from '@/api'
import type { Movie } from '@/types'
// import { useMovieStore } from '@/stores/MovieStore';

// Definindo variáveis reativas
const movies = ref([] as Movie[]) // Armazena a lista de filmes
const success = ref(false) // Indica se a operação foi bem-sucedida

const deleteRequested = ref(false) // Controla a exibição do modal de confirmação de exclusão
const movieToRemove = ref<Movie>() // Armazena o filme que será removido

async function loadMovies() {
    try {
        const res = await api.get('/films');
        movies.value = res.data.dados
            
    } catch(error) {
        console.log("Erro ao carregar os filmes.");     
    }
}

function loadPoster(movie: Movie) {
    return movie.poster.imageUrl
}

loadMovies()
</script>

<template>
    <HeaderLogged/>
    
    <div class="filmes-section">
        <h2>Filmes</h2>
        <div class="button-container">
            <div class="button" @click=" ">+ Adicionar Filme</div>
            <router-link to="/cadfilm" class="button" @click="">+ Cadastrar Filme</router-link>
        </div>

        <!-- Grade de posters de filmes -->
        <div class="movies-grid">
            <div v-for="movie in movies" :key="movie.id" class="movie-poster">
                <RouterLink :to="`/film/${movie.id}`" style="cursor: pointer">
                    <img :src="`${loadPoster(movie)}`"/>
                </RouterLink>
            </div>
        </div>
    </div>

    <Footer/>
</template>

<style scoped>
    /* Estilos do componente, você pode manter os estilos que você já tem */
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
        width: 100%; /* A imagem vai ocupar toda a largura do div pai */
        max-width: 200px; /* Limita o tamanho máximo do poster */
        border-radius: 10px;
}

    .filme {
        width: 146px;
        height: 219px;
    }

    .button-container {
        display: flex;
        margin-top: 5px;
        margin-bottom: 20px;
        margin-left: 952px;
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