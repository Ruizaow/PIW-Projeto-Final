<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue';

import { ref, onMounted } from 'vue';
import { api } from '@/api';
import { AxiosError } from 'axios';
import type { User } from '@/types';
import { useUserStore } from '@/stores/userStore';
import { useRoute, useRouter } from 'vue-router';

const user = ref({} as User);

const id = ref<Number>(-1);

async function loadUser(id: Number) {
    try {
        const res = await api.get(`/users/${id}`);
        user.value = res.data.dados;

        name.value = user.value.name
        username.value = user.value.username
        email.value = user.value.email

    } catch(error) {
        if(error instanceof AxiosError) {
            error_message.value = error.response?.data.erro.mensagem;
        }
    }
}

const amigos = [
    'Nome 1',
    'Nome 2',
    'Nome 3',
    'Nome 4',
    'Nome 5',
    'Nome 6',
    'Nome 7',
    'Nome 8',
    'Nome 9',
    'Nome 10',
    'Nome 11',
    'Nome 12'
]

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
    <div>
        <HeaderLogged />
        
        <section class="amigos-section">
            <div class="amigo" v-for="(amigo, index) in amigos" :key="index">
                <div class="foto"></div>
                <div class="nome">{{ amigo }}</div>
            </div>
        </section>

        <Footer />
    </div>
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
    font-size: 50px;
    font-family: 'Ranchers', sans-serif;
    font-weight: 400;
    word-wrap: break-word;
}

/*.botao{
    padding-bottom: 30px;
    padding-top: 40px;
    margin-left: 1122px;
}

.add-botão{
    width: 219px;
    height: 48.69px;
    background: #DEB31B;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    font-size: 22px;
    font-family: "Pragati Narrow", sans-serif;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
}*/
</style>