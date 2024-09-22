<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { ref } from 'vue'
import { api } from '@/api';
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import { useUserStore } from '@/stores/userStore';

const login = ref('');
const password = ref('');
const loading = ref(false);
const error_message = ref('')
const router = useRouter();
const userStore = useUserStore();

const login_filled = ref(true);
const password_filled = ref(true);

const showEyeIcon = ref(false)  // variável mostrar ou não o ícone do olho
const showPassword = ref(false) // variável de controle para mostrar ou não a senha ao clicar no ícone do olho

function checkFields() {
    if(login.value === '')
        login_filled.value = false
    else
        login_filled.value = true

    if(password.value === '')
        password_filled.value = false
    else
        password_filled.value = true
}

function toggleEyeIcon() {
    showEyeIcon.value = true;
}
function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

async function authenticate() {
    try {
        if(login_filled.value && password_filled.value) {
            loading.value = true;
            
            const response = await api.post('/login', {
                login: login.value,
                password: password.value
            });
            
            const user = response.data.dados.usuário;
            const jwt = response.data.dados.chave;
            
            userStore.authenticaded(user, jwt);
            await router.push('/loggedHome');
        }
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

        <div class="login-container">
            <div class="login-box">
                
                <h1>Entre na sua conta</h1>

                <div v-if="error_message !== ''" class="alert-danger" role="alert">
                    {{ error_message }}
                </div>
                
                <form v-if="!loading" @submit.prevent="authenticate">
                    <label for="loginInput" class="form-label"> Login </label>
                    <input 
                        v-model="login"
                        type="text"
                        class="form-control"
                        id="loginInput"
                        placeholder="Digite seu email ou nome de usuário">
                    <div v-if="!login_filled" class="invalid-feedback">
                        O login é um campo obrigatório.
                    </div>
                    
                    <label for="passwordInput" class="form-label"> Senha </label>
                    <div class="password-field">
                        <input @input="toggleEyeIcon"
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            class="form-control"
                            id="passwordInput"
                            placeholder="Digite sua senha">
                        <span v-if="showEyeIcon" class="toggle-password" @click="togglePasswordVisibility">
                            <template v-if="showPassword">
                                <img src="@/assets/eye-svgrepo-com.svg" alt="Olho aberto" width="25" height="25">
                            </template>
                            <template v-else>
                                <img src="@/assets/eye-closed-svgrepo-com.svg" alt="Olho fechado" width="25" height="25">
                            </template>
                        </span>
                    </div>
                    <div v-if="!password_filled" class="invalid-feedback">
                        A senha é um campo obrigatório.
                    </div>

                    <div class="checkbox-container">
                        <input type="checkbox" id="Lembrar">
                        <label for="Lembrar" class="checkbox-label">Lembre de mim</label>
                    </div>

                    <input @click="checkFields" class="submit-button" type="submit" value="Entrar"/>
                
                </form>
                <p v-else class="alert-loading">
                    Esperando resposta do servidor.
                </p>

            </div>
        </div>

        <Footer />
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

.alert-danger {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
    padding-top: 93px;
    position: fixed;
}

.alert-loading {
    padding-top: 85px;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-style: medium;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    flex-direction: column;
    padding-top: 80px;
    
}

.login-box {
    display: flex;
    width: 800px;
    height: 500px;
    background: #767676;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.login-box h1 {
    font-family: "Pragati Narrow", sans-serif;
    font-size: 36px;
}

.login-box label {
    font-family: "Pragati Narrow", sans-serif;
    font-size: 24px;
}

.login-box input {
    width: 100%;
    height: 40px;
    background: #8B8B8B;
    border-radius: 50px;
    border: none;
    padding: 0 10px;
    margin-bottom: 35px;
}

.login-box .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 1px;
}

.login-box input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-left: 25px;
}

.login-box .checkbox-label {
    font-size: 16px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
    padding-bottom: 32px;
}

.login-box .submit-button {
    background: #DEB31B;
    border-radius: 19px;
    width: 219px;
    height: 49px;
    margin-left: 160px;
}

.submit-button {
    font-family: "Pragati Narrow", sans-serif;
    font-size: 32px;
    text-align: center;
    line-height: 49px;

    margin-right: 160px;

    cursor: pointer;
    transition: background 0.3s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.submit-button:hover {
    background: #D9A520;
}

.password-field {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 4px;
    top: 30%;
    transform: translateY(-50%);
    cursor: pointer;
}

.invalid-feedback {
    font-family: "Quicksand", sans-serif;
    font-style: medium;
    font-weight: 500;
    font-size: 13px;
    position: fixed;
    margin-left: 5px;
    margin-top: -30px;
}
</style>