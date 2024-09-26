<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/api';
import type { User } from '@/types';
import { useRoute } from 'vue-router';

const user = ref({} as User);
const userExists = ref(true)
const username = ref('');

const friends = ref([] as User[]);
const id = ref<Number>(-1);

const route = useRoute();

async function loadUser(id: Number) {
    try {
        const res = await api.get(`/users/${id}`);
        user.value = res.data.dados;

        username.value = user.value.username;
    } catch(error) {
        userExists.value = false;
    }
}

async function loadFriends(id: Number) {
    try {
        const res = await api.get(`/users/${id}/friends`);
        friends.value = res.data.dados;
    } catch(error) {
        console.log("Erro ao carregar a lista de amigos do usuário.")
    }
}

function loadPicture(friend: User) {
    if(friend.profile_picture_Url !== "")
        return friend.profile_picture_Url;
    else
        return "https://as1.ftcdn.net/v2/jpg/02/99/61/74/1000_F_299617487_fPJ8v9Onthhzwnp4ftILrtSGKs1JCrbh.jpg"
}

onMounted(async () => {
    id.value = Number(route.params.id);

    if (id.value && id.value !== -1) {
        console.log("Carregando usuário com ID:", id.value);
        await loadUser(id.value);
        await loadFriends(id.value);
    } else {
        console.log("ID inválido ou não encontrado:", id.value);
    }
});
</script>

<template>
    <section v-if="userExists" class="amigos-section">
        <div v-if="friends.length > 0" class="amigo" v-for="friend in friends" :key="friend.id">
            <div>
                <RouterLink :to="`/user/${friend.id}/profile`">
                    <img :src="`${loadPicture(friend)}`" alt="Foto de Perfil" class="foto"/>
                </RouterLink>
            </div>
            <div class="nome">{{ friend.username }}</div>
        </div>
        <div v-else>
            <h1 style="font-size: 30px; margin-top: 60px;">
                O usuário <RouterLink :to="`/user/${id}/profile`" style="color: #0000EE">
                    {{ username }}
                </RouterLink> não possui amigos.
            </h1>
        </div>
    </section>
    <section v-else class="amigos-section">
        <h1 style="font-size: 30px; margin-top: 60px;">Usuário não encontrado.</h1>
    </section>
</template>

<style scoped>
.amigos-section {
    font-family: 'Quicksand', sans-serif;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 100px;
}
  
  .amigo {
    display: flex;
    align-items: center;
    background: #696868;
    border-radius: 42px;
    padding: 10px;
    gap: 10px;
    width: 372.93px;
    height: 118.80px;
  }
  
.amigo .foto {
    width: 63.96px;
    height: 63.96px;
    background: #d9d9d9;
    border-radius: 9999px;
}
  
.amigo .nome {
    font-size: 40px;
    font-family: 'Ranchers', sans-serif;
    font-weight: 400;
    word-wrap: break-word;
}
</style>