<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/api';
import { AxiosError } from 'axios';
import type { Movie } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';

const movies = ref([] as Movie[])
const movieExists = ref(true)

const userStore = useUserStore();

const movie = ref({
    poster: {
        imageUrl: ""
    }
} as Movie);

const id = ref<Number>(-1);
const title = ref('');
const releaseDate = ref('');
const synopsis = ref('');

const deleteRequested = ref(false)

const error_message = ref('')

const route = useRoute();
const router = useRouter();

async function loadMovie(id: Number) {
    try {
        const res = await api.get(`/films/${id}`);
        movie.value = res.data.dados;

        title.value = movie.value.title;
        releaseDate.value = JSON.stringify(movie.value.releaseDate);
        synopsis.value = movie.value.synopsis;

    } catch(error) {
        movieExists.value = false;
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

function loadPoster() {
    if(isValidUrl(movie.value.poster.imageUrl))
        return movie.value.poster.imageUrl
    else
        return "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg";
}

async function removeMovie(id: Number) {
    try {
        const res = await api.delete(`/films/${id}`, {
            headers: {
               Authorization: `Bearer ${userStore.jwt}`
            }
        });
        const removedMovie: Movie = res.data.dados;
        const indexToRemove = movies.value.findIndex(m => removedMovie.id === m.id);
        movies.value.splice(indexToRemove, 1);
        router.push('/films');

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;
    
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
        console.log("Carregando filme com ID:", id.value);
        await loadMovie(id.value);
    } else {
        console.log("ID inválido ou não encontrado:", id.value);
    }
});
</script>

<template>
    <div class="profile-container">
        <div v-if="movieExists" class="film-box">
            <div class="film-info">
                <div class="film-title">
                    {{ title }}
                    <span class="year">({{ releaseDate }})</span>
                </div>
                <img class="film-image" :src="`${loadPoster()}`" alt="Poster" />
            </div>
            <div class="film-details">
                <div class="synopsis">
                    Sinopse:<br />
                    {{ synopsis }}
                </div>
            </div>

            <div v-if="userStore.userData.id > 0" class="button-container">
                <!-- Botão para editar o filme (Disponível apenas para administrador logados) -->
                <div v-if="userStore.role === 'Administrador'">
                    <RouterLink :to="`/films/entry/${id}`" style="text-decoration: none">
                        <input class="button" @click="toggleModal" type="button" value="Editar Filme"/>
                    </RouterLink>
                </div>

                <!-- Botão para remover o filme (Disponível apenas para administrador logados) -->
                <div v-if="userStore.role === 'Administrador'">
                    <input class="button" @click="toggleModal" type="button" value="Remover Filme"/>
                </div>

                <!-- Botão para remover o filme (Disponível apenas para usuários (padrões ou administradores) logados) -->
                <div v-if="userStore.role === 'Administrador'" @click="">
                    <span class="button">+ Adicionar Filme à Lista</span>
                </div>
                <div v-else style="margin-left: 90px;" @click="">
                    <span class="button">+ Adicionar Filme à Lista</span>
                </div>
            </div>
        </div>
        <div v-else class="film-box">
            <div class="film-info">
                <div class="film-title">
                    <span class="year"></span>
                </div>
                <img class="film-image" :src="`${loadPoster()}`" alt="Poster" />
            </div>
            <div class="film-details">
                <div class="synopsis">
                    <h2 style="font-weight: 500; margin-right: 587px;">Filme não encontrado.</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" v-if="deleteRequested">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">REMOVER USUÁRIO</h5>
                </div>
                <div class="modal-body">
                    <p>O filme <strong>{{ title }}</strong> de <strong>id {{ id }}</strong> será removido. Você tem certeza que deseja realizar esta operação?</p>
                </div>
                <div class="modal-footer">
                    <button @click="removeMovie(id)" type="button" class="modal-button">Sim</button>
                    <button @click="deleteRequested=false" type="button" class="modal-button" style="margin-left: 10px">Não</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-container {
    font-family: "Quicksand", sans-serif;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    width: 100%;
}
  
.film-box {
    width: 1200px; /* Largura do box do filme */
    font-size: 20px;
    background: #525151;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: row; /* Itens lado a lado */
    gap: 20px;
}
  
.film-info {
    flex: 2; /* Controle de tamanho da sinopse */
    color: #dcdcdc;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Começa com o texto */
    gap: 10px;
}
  
.film-image {
    width: 276px;
    height: 415px;
}
  
.synopsis {
    font-size: 20px;
    color: #dcdcdc;
    text-align: justify;
    line-height: 1.5;
    margin-bottom: 30px; /* Espaço abaixo da sinopse */
}

.button-container {
    display: flex;
    position: absolute;
    gap: 10px;
    margin-top: 400px;
    margin-left: 560px;
}

.button {
    font-family: "Quicksand", sans-serif;
    font-weight: 600;
    font-size: 16px;
    
    width: 207px;
    height: 52px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: #C2A404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    cursor: pointer;
    border: none;
}

.modal {
    font-family: "Quicksand", sans-serif;
    font-weight: 400;
    
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    background: white;
    border-radius: 8px;
}

.modal-header, .modal-footer {
    padding: 30px;
}

.modal-title {
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.modal-body {
    padding: 15px 15px 0px 15px;
}

.modal-footer {
    margin-bottom: 10px;
}

.modal-button {
    width: 60px;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-size: 16px;
}
</style>