<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue'
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
const roles = ref([] as Role[]);
const id = ref<Number>(-1);

const error_message = ref('');
const showEyeIcon = ref(false);
const showPassword = ref(false);
const loading = ref(true);
const userUpdated = ref(false);

const editionMode = ref(false);
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

function toggleEdit() {
    editionMode.value = !editionMode.value;
}

function toggleEyeIcon() {
    showEyeIcon.value = true;
}
function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

async function updateUser() {
    try {
        loading.value = true
        const res = await api.put(`/users/${user.value.id}`, {
            name: user.value.name,
            username: user.value.username,
            email: user.value.email,
            password: user.value.password,
            role: user.value.role.name,
            profile_picture_Url: user.value.profile_picture_Url
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        user.value = res.data.dados;

        userUpdated.value = true

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;

    } finally {
        loading.value = false;
    }
}

async function addUser() {
    try {
        loading.value = true
        const res = await api.post(`/users/`, {
            name: user.value.name,
            username: user.value.username,
            email: user.value.email,
            password: user.value.password,
            role: user.value.role.name,
            profile_picture_Url: user.value.profile_picture_Url
        }, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        user.value = res.data.dados;
        userUpdated.value = true;
        router.push('/users');

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;

    } finally {
        loading.value = false;
    }
}

async function loadUser(id: Number) {
    try {
        const res = await api.get(`/users/${id}`);
        user.value = res.data.dados;

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;

    } finally {
        loading.value = false;
    }
}

async function loadRoles() {
    try {
        const res = await api.get(`/roles`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        })
        roles.value = res.data.dados;

    } catch(error) {
        if(error instanceof AxiosError)
            error_message.value = error.response?.data.erro.mensagem;

    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    id.value = Number(route.params.id);

    if(id.value && id.value != -1)
        await loadUser(id.value);
    else
        editionMode.value = true;

    loadRoles();
})
</script>

<template>
    <HeaderLogged />

    <div class="add-edit">
        <h2></h2><p></p>

        <div v-if="userUpdated" class="alert-success">
            Usuário atualizado com sucesso!
        </div>

        <div v-if="error_message !== ''" class="alert-danger">
            {{ error_message }}
            <button @click="error_message = ''" type="button" class="btn-close">&times;</button>
        </div>

        <form @submit.prevent="id ? updateUser() : addUser()">
            <div class="card">
                <h3 class="card-header">Informações do usuário</h3>

                <a v-if="id" 
                    @click="toggleEdit" 
                    :class="['btn-toggle-edit', editionMode ? 'edit-enabled' : 'edit-disabled']">
                    <template v-if="editionMode">
                        &#128274; Desabilitar edição
                    </template>
                    <template v-else>
                        &#128275; Habilitar edição
                    </template>
                </a>
                
                <label for="name" class="form-label">Nome completo:</label>
                <input
                    v-model="user.name"
                    type="text"
                    id="name"
                    class="form-control"
                    :disabled="!editionMode"/>
                
                <label for="username" class="form-label">Nome de usuário:</label>
                <input
                    v-model="user.username"
                    type="text"
                    id="username"
                    class="form-control"
                    :disabled="!editionMode"/>
                
                <label for="email" class="form-label">Email:</label>
                <input
                    type="email"
                    v-model="user.email"
                    id="email"
                    class="form-control"
                    :disabled="!editionMode"/>
                
                <label for="password" class="form-label">Senha:</label>
                <div class="password-field">
                    <input @input="toggleEyeIcon"
                        v-model="user.password"
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        class="form-control"
                        :disabled="!editionMode"/>
                    <span v-if="showEyeIcon" class="toggle-password" @click="togglePasswordVisibility">
                        <template v-if="showPassword">
                            <img src="@/assets/eye-svgrepo-com.svg" alt="Olho aberto" width="25" height="25">
                        </template>
                        <template v-else>
                            <img src="@/assets/eye-closed-svgrepo-com.svg" alt="Olho fechado" width="25" height="25">
                        </template>
                    </span>
                </div>
                
                <div v-if="userStore.userData.role.name === 'Administrador'">
                    <label for="role" class="form-label">Papel de usuário:</label>
                    <select
                        v-model="user.role.name"
                        id="role"
                        class="form-select"
                        :disabled="!editionMode">
                        <option
                            v-for="role in roles"
                            :key="role.name"
                            :selected="user && user.role.name == role.name"
                            :value="role.name">
                                {{ role.name }}
                        </option>
                    </select>
                </div>

                <label for="profilePicture" class="form-label">URL foto de perfil:</label>
                <input
                    v-model="user.profile_picture_Url"
                    type="text"
                    id="profilePicture"
                    class="form-control"
                    :disabled="!editionMode"
                    style="margin-bottom: 50px;"/>
            </div>

            <div class="submit-button">
                <input v-if="editionMode && id" type="submit" class="btn-primary" value="Atualizar"/>
                <input v-else-if="!id" type="submit" class="btn-secondary" value="Adicionar"/>
            </div>
        </form>
    </div>

    <Footer />
</template>

<style scoped>
.add-edit {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
}

.alert-success {
    color: green;
    background-color: #d4edda;
    padding: 1rem;
    border: 1px solid #c3e6cb;
    border-radius: 0.25rem;
    width: 1120px;
}

.alert-danger {
    color: red;
    background-color: #f8d7da;
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 0.25rem;
    width: 1120px;
}

.btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
}

.password-field {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 290px;
    top: 58%;
    transform: translateY(-50%);
    cursor: pointer;
}

.card {
    width: 1120px;      /* se alter esse valor, altere também o valor de "margin-left" em .form-label */
    text-align: center;

    background-color: #b9b9b9;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    
    padding: 1rem;
}

.card-header {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.btn-toggle-edit {
    border: 1px solid #6c757d;
    padding: 0.25rem 0.5rem;
    background-color: #ccc;
    cursor: pointer;
}

.edit-enabled {
    background-color: white;
    border-color: white;
}
.edit-disabled {
    background-color: #d1d2d4;
    border-color: #d1d2d4;
}

.form-label {
    display: block;
    font-weight: bold;
    text-align: left;
    margin-left: 273px;
    margin-top: 15px;
    margin-bottom: 0.5rem;
}

.form-control {
    width: 50%;
    padding: 0.5rem;
    border: 1px solid #cccccc;
    border-radius: 0.25rem;
}

.form-select {
    width: 51.5%;
    padding: 0.5rem;
    border: 1px solid #cccccc;
    border-radius: 0.25rem;
}

.btn-toggle-edit:disabled,
.form-control:disabled, 
.form-select:disabled {
    background-color: #e9ecef;
    opacity: 0.5;
}

.submit-button {
    text-align: center;
    margin-top: 1rem;
}

button, input[type="submit"] {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-size: 18px;
    
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-primary {
    border: 1px solid #007bff;
    background-color: #007bff;
    color: white;
}

.btn-secondary {
    border: 1px solid #6c757d;
    background-color: #6c757d;
    color: white;
}
</style>
