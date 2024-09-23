<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/api'
import { RouterLink } from 'vue-router';
import type { ApplicationError, Movie } from '@/types'

const movies = ref([] as Movie[]);
const exception = ref<ApplicationError>()

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
    <div class="container">
        <h2 class="title">Comentários populares da semana</h2>
        <div class="comment-section">
            <div class="comment-item">
                <div class="poster"> <img :src="`${loadPoster(9)}`" alt="O Poderos Chefão"> </div>
                <div class="comment">
                    <div class="comment-header">
                        <div class="author-picture"></div>
                        <div class="author-review">
                            <div class="author-comment">Juca Sincerão</div>
                            <div class="rating">
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                            </div>
                        </div>
                    </div>
                    <div class="comment-content">
                        Além de romantizar a vida mafiosa, potencialmente glorificando criminosos, o
                        filme apresenta um ritmo lento e uma duração excessiva que podem testam muito
                        a paciência do espectador. Além disso, as personagens femininas são subdesenvolvidas,
                        e o filme perpetua constantemente estereótipos negativos sobre ítalo-americanos.
                    </div>
                </div>
            </div>


            <div class="comment-item">
                <div class="poster"> <img :src="`${loadPoster(6)}`" alt="A Viagem de Chihiro"> </div>
                <div class="comment">
                    <div class="comment-header">
                        <div class="author-picture"></div>
                        <div class="author-review">
                            <div class="author-comment">Gerald</div>
                            <div class="rating">
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                                <img src="@/assets/star.png" alt="star"/>
                            </div>
                        </div>
                    </div>
                    <div class="comment-content">
                        Uma obra-prima animada que combina uma narrativa rica e simbólica com visuais deslumbrantes.
                        A jornada de crescimento e autodescoberta de Chihiro em um mundo espiritual reflete críticas
                        ao consumismo e à degradação ambiental. Com personagens memoráveis e uma trilha sonora evocativa,
                        o filme encanta e ressoa com públicos de todas as idades.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 5px;
}

.title{
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;

    margin-right: 560px;
    font-size: 24px;
}

.comment-section {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;

    display: flex;

    padding-left: 2px;
    padding-bottom: 50px;

    width: 968px;
    gap: 20px;
}

.comment-item {
    background-color: #f1f1f1;
    border-radius: 8px;

    display: flex;
    padding: 15px;
    gap: 10px;
}

.poster img {
    background-color: #b1b2b5;
    border: 1px solid black;
    border-radius: 12px;

    width: 119px;
    height: 179px;
    
    text-align: center;
}

.comment {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 15px;
    
    flex: 1;
}

.comment-header {
    display: flex;
}

.author-picture {
    width: 47px;
    height: 47px;
    background-color: #b1b2b5;
    border-radius: 50%;
}

.author-review {
    margin-left: 10px;
    margin-bottom: 20px;
}

.author-comment {
    font-size: 20px;
}

.comment-content {
    font-size: 16px;
    text-align: justify;
    margin-bottom: 45px;
}

.rating {
    display: flex;
    gap: 5px;
}

.rating img {
    width: 16px;
    height: 15px;
    filter: opacity(0.5) drop-shadow(0 0 0 #846F00);
}
</style>
