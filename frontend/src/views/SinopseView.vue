<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue';
import Footer from '@/components/Footer.vue';

import { ref, onMounted } from 'vue';
import { api } from '@/api';
import { AxiosError } from 'axios';
import { isApplicationError } from '@/composables/useApplicationError';
import type { ApplicationError } from '@/types'
import type { Movie } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';

const exception = ref<ApplicationError>()
const movies = ref([] as Movie[])
const success = ref(false)

const movie = ref({
    poster: {
        imageUrl: ""
    }
} as Movie);

const id = ref<Number>(-1);
const title = ref('');
const releaseDate = ref('');
const synopsis = ref('');
const poster = ref('');

const error_message = ref('')

const route = useRoute();
const router = useRouter();

const deleteRequested = ref(false)

async function loadMovie(id: Number) {
    try {
        const res = await api.get(`/films/${id}`);
        movie.value = res.data.dados;

        title.value = movie.value.title //
        releaseDate.value = JSON.stringify(movie.value.releaseDate) //
        synopsis.value = movie.value.synopsis //

    } catch(error) {
        if(error instanceof AxiosError) {
            error_message.value = error.response?.data.erro.mensagem;
        }
    }
}

function loadPoster() { //
    if(movie.value.poster.imageUrl !== "")
        return movie.value.poster.imageUrl;
    else
        return "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg"
}

async function removeMovie(movie_id: Number) {
    try {
        const res = await api.delete(`/films/${movie_id}`, {
            headers: {
               // Authorization: `Bearer ${movieStore.jwt}`
            }
        });
        const removeMovie = res.data.dados;

        const indexToRemove = movies.value.findIndex(movie => removeMovie.id === movie.id);
        
        if(indexToRemove !== -1) {
            movies.value.splice(indexToRemove, 1);
            success.value = true;
            router.push('/films');
        } else {
            console.error('Erro: Filme não encontrado na lista.');
        }
    } catch (error) {
        // Se o erro for do Axios e tiver uma resposta do servidor
        if (error instanceof AxiosError) {
            console.error('Erro ao remover o filme:', error.response?.data);
        } else {
            console.error('Erro inesperado:', error);
        }
    } finally {
        toggleModal();
    }
}

function toggleModal() {
    deleteRequested.value = !deleteRequested.value
}

onMounted(async () => {
    id.value = Number(route.params.id);

    if(id.value && id.value !== -1) {
        console.log("Carregando usuário com ID:", id.value);
        await loadMovie(id.value);
    } else {
        console.log("ID inválido ou não encontrado:", id.value);
    }
});
</script>

<template>
    <div>
        <HeaderLogged />
        
        <div class="profile-container">
            <div class="film-box">
                <div class="film-info">
                    <div class="film-title">
                        {{ title }}
                        <span class="year">{{ releaseDate }}</span>
                    </div>
                    <img class="film-image" :src="`${loadPoster()}`" alt="Poster" />
                </div>
                <div class="film-details">
                    <div class="synopsis">
                        Sinopse:<br />
                        {{ synopsis }}
                    </div>


                <div class="button-container" >
                    <div class="add-button" @click="">
                        <span class="plus">+</span>
                        <span>Adicionar Filme à Lista</span>
                    </div>

                    <form>
                        <!-- Botão para remover o filme -->
                        <div class="add-button">
                            <input class="button" @click.prevent="removeMovie(id)" type="button" value="Remover Filme"/>
                        </div>
                    </form>

                </div>
                </div>
            </div>
        </div>
      
        <Footer />

    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
  
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 40px;
    width: 100%;
}
  
.film-box {
    width: 1200px; /* Largura do box do filme */
    background: #525151;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    gap: 20px;
}
  
.film-title {
    display: flex;
    font-size: 24px;
    align-items: baseline; /* Alinha o ano com o título */
    color: white; /* Cor do título */
    margin-bottom: 20px; /* Espaço abaixo do título */
}

.year {
    font-size: 24px;
    margin-left: 10px; /* Espaço entre o título e o ano */
}
  
.film-image {
    width: 276px;
    height: 415px;
}
  
.film-info {
    flex: 1; /* Permite que a sinopse ocupe o espaço restante */
    color: white; /* Cor da sinopse */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinhamento à esquerda */
    font-family: "Quicksand", sans-serif; 
}
  
.synopsis {
    font-family: "Quicksand", sans-serif; 
    font-size: 32px;
    text-align: justify;
    line-height: 1.5;
    margin-top: 80px; /* Espaço acima da sinopse */
}
  
.button-container {
    display: flex;
    justify-content: center; /* Centraliza os botões horizontalmente */
    gap: 50px; /* Espaço entre os botões */
    margin-top: 30px; /* Espaço acima da linha dos botões */
    margin-left: 350px;
}

.add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 207px;
    height: 52px;
    background: #C2A404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
}

.add-button span {
    font-size: 15px;
    font-weight: 600;
    margin-left: 10px;
    font-family: "Quicksand", sans-serif;
    text-align: center;
}

.button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 207px;
    height: 52px;
    background: #C2A404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    cursor: pointer;
    font-family: "Quicksand", sans-serif; 
    font-weight: 600;
    border: none;
}
</style>