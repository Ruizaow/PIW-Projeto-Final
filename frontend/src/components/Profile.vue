<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/api';
import { AxiosError } from 'axios';
import type { User } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';

const user = ref({} as User);

const id = ref<Number>(-1);
const name = ref('');
const username = ref('');
const email = ref('');

const error_message = ref('');
const friendRequest = ref(false);

const route = useRoute();

const userStore = useUserStore();

async function addFriend(user_id: Number, friend_id: Number) {
    try {
        const res = await api.post(`/users/${user_id}/friends/${friend_id}`, {}, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        
        user.value.friends = res.data.dados.friends;

        console.log("Amigo adicionado com sucesso");
        
    } catch(error) {
        if(error instanceof AxiosError) {
            error_message.value = error.response?.data.erro.mensagem;
        }
    }
}

function toggleModal() {
    friendRequest.value = !friendRequest.value;
}

async function loadUser(id: Number) {
    try {
        const res = await api.get(`/users/${id}`);
        user.value = res.data.dados;

        name.value = user.value.name;
        username.value = user.value.username;
        email.value = user.value.email;

    } catch(error) {
        if(error instanceof AxiosError) {
            error_message.value = error.response?.data.erro.mensagem;
        }
    }
}

function loadPicture() {
    if(user.value.profile_picture_Url !== "")
        return user.value.profile_picture_Url;
    else
        return "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg"
}

onMounted(async () => {
    id.value = Number(route.params.id);

    if (id.value && id.value !== -1) {
        console.log("Carregando usuário com ID:", id.value);
        await loadUser(id.value);
    } else {
        console.log("ID inválido ou não encontrado:", id.value);
    }
});
</script>

<template>
    <div class="profile-container">
        <div class="profile-box">

            <div v-if="error_message !== ''" class="alert-danger" role="alert">
                {{ error_message }}
            </div>
            
            <img :src="`${loadPicture()}`" alt="Foto de Perfil" />
    
            <div class="profile-info">
                <label>
                    <strong>Nome completo:</strong>
                    {{ name }}
                </label>
                <label>
                    <strong>Nome de usuário:</strong>
                    {{ username }}
                </label>
                <label>
                    <strong>Email:</strong>
                    {{ email }}
                </label>
    
                <div class="profile-actions">
                    <div v-if="userStore.userData.id > 0">
                        <RouterLink
                            v-if="userStore.userData.id === id"
                            :to="`/users/${id}`"
                            class="button">Editar Perfil
                        </RouterLink>
                        <div
                            v-else
                            @click="toggleModal()"
                            class="button">Adicionar como amigo
                        </div>
                    </div>

                    <RouterLink :to="`/user/${id}/friends`" class="button">Lista de amigos</RouterLink>
                    <RouterLink :to="`/user/${id}/films`" class="button">Lista de filmes</RouterLink>
                    
                    <form
                        v-if="userStore.userData.id === id"
                        @click="userStore.logout()">
                        <RouterLink to="/" class="button">Logout</RouterLink>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal" v-if="friendRequest">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">ADICIONAR AMIGO</h5>
                    </div>
                    <div class="modal-body">
                        <p>Deseja adicionar este usuário como amigo?</p>
                    </div>
                    <div class="modal-footer">
                        <button @click="addFriend(userStore.userData.id, id)" type="button" class="modal-button">Sim</button>
                        <button @click="friendRequest=false" type="button" class="modal-button" style="margin-left: 10px">Não</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.alert-danger {
    background-color: #c98383;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    top: 200px;
    position: fixed;
}

.profile-container {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding-top: 80px;
}

.profile-box {
    width: 1200px;
    display: flex;
    align-items: center;
    gap: 80px;
    padding-left: 50px;
}

.profile-box img {
    width: 300px;
    height: 300px;
    border-radius: 9999px;
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    padding-top: 100px;
    
}

.profile-info label {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-family: "Quicksand", sans-serif; 
}

.profile-info input {
    width: 100%;
    height: 50px;
    background: #3e3d3d;
    border-radius: 50px;
    border: none;
    padding: 0 15px;
    color: rgb(3, 3, 3);
}

.profile-actions {
    display: flex;
    gap: 8px;
    margin-top: 30px;
    padding-left: 20px;
}

.button {
    width: 200px;
    height: 50px;
    background: #c2a404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 22px;
    font-family: "Quicksand", sans-serif; 
    font-weight: 600;
    color: black;
    text-decoration: none;

    transition: background 0.3s;
}

.button:hover {
    background: #b29903;
}

.modal {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;

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