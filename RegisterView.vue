<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { ref, onMounted } from 'vue'
import { api } from '@/api'
import { AxiosError } from 'axios'
import type { User, Role } from '@/types'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'

const user = ref({
    role: {
        name: ""
    }
} as User);

const showEyeIcon = ref(false)
const showPassword = ref(false)

const loading = ref(false);
const register_filled = ref(true);
const password_filled = ref(true);

const router = useRouter();

const error_message = ref('');

function toggleEyeIcon() {
    showEyeIcon.value = true;
}
function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}


async function createUser() {
    try {
        loading.value = true

        const res = await api.post(`/users/`, {
            name: user.value.name,
            username: user.value.username,
            email: user.value.email,
            password: user.value.password,
            role: "Usuário padrão",
            profile_picture_Url: ""
        },
        );
        user.value = res.data.dados;

        router.push('/login');


        //console.log(user.value);

        /*if(userStore.userData)
            userStore.authenticaded(user.value, userStore.jwt);

        userUpdated.value = true*/

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;

    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="background-container">
        <div class="background-image">
            <img src="@/assets/Martin-Scorsese.png" alt="Martin-Scorsese">
        </div>
        <div class="overlay"></div>

        <Header />
        
        <div class="registration-container">
            <div class="registration-box">

                <div v-if="error_message !== ''" class="alert-danger" role="alert">
                    {{ error_message }}
                </div>


                <form v-if="!loading" class="profile-info" @submit.prevent="createUser">
                    <h1>Cadastro</h1>
                    <label>
                        Nome
                        <input  v-model="user.name" 
                        type="text" 
                        placeholder="Digite seu Nome">  
                        <div v-if="!register_filled" class="invalid-feedback">
                        — email ou nome de usuário — é um campo obrigatório.
                        </div>  
                    </label>

                    
                    <label>
                        Email
                        <input  v-model="user.email" 
                        type="text" 
                        placeholder="Digite seu email">
                        <div v-if="!register_filled" class="invalid-feedback">
                        email — é um campo obrigatório.
                        </div> 
                    </label>
                    <label>
                        Nome de usuário
                        <input v-model="user.username" 
                        type="text" 
                        placeholder="Digite seu nome de usuário">
                        <div v-if="!register_filled" class="invalid-feedback">
                        nome de usuário — é um campo obrigatório.
                        </div>
                    </label>
                    <label>
                        Senha
                        <div class="password-field">
                            <input v-model="user.password" @input="toggleEyeIcon"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="Digite sua senha">
                            <span v-if="showEyeIcon" class="toggle-password" @click="togglePasswordVisibility">
                                <template v-if="showPassword">
                                    <img src="@/assets/eye-svgrepo-com.svg" alt="Olho aberto" width="25" height="25">
                                </template>
                                <template v-else>
                                    <img src="@/assets/eye-closed-svgrepo-com.svg" alt="Olho fechado" width="25" height="25">
                                </template>
                            </span>
                            <div v-if="!password_filled" class="invalid-feedback">
                                A senha é um campo obrigatório.
                            </div>
                        </div>
                    </label>
                    <div class="checkbox-container">
                        <input type="checkbox" id="age-confirmation">
                        <label for="age-confirmation" class="checkbox-label">Você confirma ter mais de 16 anos e aceita os Termos de Uso</label>
                    </div>
                    <input class="submit-button" type="submit" value="Cadastre-se"/>

                </form>
                <p v-else class="alert-loading">
                Esperando resposta do servidor.
                </p>

            </div>

            <Footer />

        </div>
    </div>
</template>

<style scoped>
.background-container {
    position: relative;
    z-index: 1;
}

.background-image {
    position: absolute;
    width: 100vw;
    z-index: -1;
    opacity: 0.8;
}

.background-image img {
    width: 100%;
}

.overlay {
    position: absolute;
    width: 100vw;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(100, 100, 100, 0.6), rgb(100, 100, 100), rgb(100, 100, 100));
    z-index: -1;
    opacity: 1;
}

.registration-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    flex-direction: column;
    padding-top: 50px;
}

.registration-box {
    display: flex;
    width: 500px;
    background: #767676;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.registration-box h1 {
    font-size: 36px;
    color: black;
    font-family: "Quicksand", sans-serif; 
}

.registration-box label {
    font-size: 24px;
    color: black;
    font-family: "Quicksand", sans-serif; 
    width: 100%;
    display: flex;
    flex-direction: column;
}

.registration-box input {
    width: 100%;
    height: 38px;
    background: #8B8B8B;
    border-radius: 50px;
    border: none;
    padding: 0 10px;
    margin-bottom: 10px;
}

.registration-box .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.registration-box input[type="checkbox"] {
    width: 20px;
    height: 20px;
}

.registration-box .checkbox-label {
    font-size: 16px;
    color: black;
    font-family: "Quicksand", sans-serif; 
}

.registration-box .submit-button {
    width: 219px;
    height: 48.69px;
    background: #DEB31B;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 19px;
    color: black;
    font-size: 32px;
    font-family: "Quicksand", sans-serif; 
    text-align: center;
    line-height: 48.69px;
    cursor: pointer;
    border: none;
    transition: background 0.3s;

    margin-top: 30px;

    margin-left: 130px;


}

.registration-box .submit-button:hover {
    background: #D9A520;
}

.password-field {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 0;
    top: 55%;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>

