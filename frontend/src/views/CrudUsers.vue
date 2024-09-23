<script setup lang="ts">
import HeaderLogged from '@/components/HeaderLogged.vue'
import Footer from '@/components/Footer.vue';

import { ref } from 'vue'
import { api } from '@/api'
import { isAxiosError } from 'axios';
import { isApplicationError } from '@/composables/useApplicationError';
import type { ApplicationError, User } from '@/types'
import { useUserStore } from '@/stores/userStore';

const users = ref([] as User[])
const exception = ref<ApplicationError>()
const loading = ref(true)
const success = ref(false)

const deleteRequested = ref(false)
const userToRemove = ref<User>()

const userStore = useUserStore()

async function loadUsers() {
    try {
        const res = await api.get('/users');
        users.value = res.data.dados;
    
    } catch(error) {
        exception.value = error as Error;
        
    } finally {
        loading.value = false;
    }
}

async function removeUser() {
    try {
        const res = await api.delete(`/users/${userToRemove.value?.id}`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        const removedUser: User = res.data.dados;
        const indexToRemove = users.value.findIndex(u => removedUser.id == u.id);
        users.value.splice(indexToRemove, 1);
        success.value = true;

    } catch(error) {
        if(isAxiosError(error) && isApplicationError(error.response?.data))
            exception.value = error.response?.data;
        
    } finally {
        toggleModal();
    }
}

function askToDelete(id: number) {
    const index = users.value.findIndex(u => u.id === id)
    userToRemove.value = users.value[index]
    toggleModal()
}

function toggleModal() {
    deleteRequested.value = !deleteRequested.value
}

loadUsers()
</script>

<template>
    <HeaderLogged />

    <div class="crud">
        <div v-if="exception" class="alert-danger">
            {{ exception.message }}
            <button @click="exception=undefined" type="button" class="btn-close" aria-label="Close">X</button>
        </div>

        <div v-if="success" class="alert-success">
            O usuário foi removido com sucesso!
            <button @click="success=false" type="button" class="btn-close" aria-label="Close">X</button>
        </div>

        <div>
            <RouterLink to="/users/new" class="btn-add">
                <span class="icon">+</span> Novo
            </RouterLink>
        </div>

        <div v-if="loading" class="spinner-container">
            <div class="spinner"></div>
            <span>Loading...</span>
        </div>
        <table v-else class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role.name }}</td>
                    <td>
                        <RouterLink class="btn-edit" :to="`/users/${user.id}`">Editar</RouterLink>
                        <button @click="askToDelete(user.id)" class="btn-delete">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal" v-if="deleteRequested">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">REMOVER USUÁRIO</h5>
                    </div>
                    <div class="modal-body">
                        <p>O usuário <strong>{{ userToRemove?.name }}</strong> de <strong>id {{ userToRemove?.id }}</strong> será removido. Você tem certeza que deseja realizar esta operação?</p>
                    </div>
                    <div class="modal-footer">
                        <button @click="removeUser" type="button" class="modal-button">Sim</button>
                        <button @click="deleteRequested=false" type="button" class="modal-button" style="margin-left: 10px">Não</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer />
</template>

<style scoped>
.crud {
    margin-top: 50px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 500; /* Normalmente não precisa do font-style: medium */
    font-style: normal; /* 'medium' não é um valor válido para font-style, substitua por 'normal' */
    
}

.alert-danger, .alert-success {
    padding: 10px;
    margin-bottom: 30px;
    border-radius: 5px;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.btn-close {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
}

.btn-add {
    background-color: #28a745;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    text-decoration: none;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 50px;
}

.btn-edit{
    background-color: #17a2b8;
    padding-top: 15px;
    padding-bottom: 14px;
    padding-right: 15px;
    padding-left: 15px;
    text-decoration: none;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 50px;
}

.btn-delete {
    background-color: #dc3545;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 15px;
    padding-left: 15px;
    margin-left: 5px;
    text-decoration: none;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.table {
    width: 95%;
    border-collapse: collapse;
    border-radius: 80px;
    margin-top: 20px;
    margin-left: 45px;

}

.table th, .table td {
    
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.table th {
    
    background-color: rgb(216, 216, 216);
}

.table tbody {
    
    background-color: #f2f2f2;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.spinner {
    width: 30px;
    height: 30px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.modal {
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