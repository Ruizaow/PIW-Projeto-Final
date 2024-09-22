<script>
export default {
    data() {
        return {
            profilePicture: "https://via.placeholder.com/300x300",
            name: "Seu Nome Aqui",
            username: "Username",
            email: "email@example.com",
        };
    },
    methods: {
        editProfile() {
            console.log("Editar Perfil clicado");//SÓ A PROPRIA PESSOA VAI PODER ALTERAR
        },
        accessList() {
            console.log("Acessar Lista clicado"); 
        },
        addFriend() {
            console.log("Adicionar Amigo"); 
        },
        addFriend() {
            console.log("logout"); //VAI APARECER PARA OUTRAS PESSOAS
        },
        
    },
};
</script>

<template>
    <div class="profile-container">
        <div class="profile-box">
            <img :src="profilePicture" alt="Foto de Perfil" />
  
            <div class="profile-info">
                <label>
                    Nome:
                    <input v-model="name" type="text"/>
                </label>
                <label>
                    Username:
                    <input v-model="username" type="text"/>
                </label>
                <label>
                    Email:
                    <input v-model="email" type="text"/>
                </label>
  
                <div class="profile-actions">
                    <div class="button" @click="editProfile">Editar Perfil</div><!--SÓ A PROPRIA PESSOA VAI PODER ALTERAR-->
                    <div class="button" @click="accessList">Acessar Lista</div><!--OUTRAS PESSOAS VÃO ACESSAR A SUA LISTA-->
                    <div class="button" @click="addFriend">Adicionar Amigo</div><!--VAI APARECER PARA OUTRAS PESSOAS-->

                    <form v-if="!loading" @submit.prevent="logout">
                        <router-link to="/"class="button" @click="Logout">Logout</router-link><!--VAI APARECER PARA O USUÁRIO--> 
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
/* ---------- SEÇÃO DE PERFIL ---------- */
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding-top: 80px;
}

.profile-box {
    width: 1200px; /* Aumenta a largura do perfil */
    display: flex;
    align-items: center;
    gap: 80px; /* Aumenta o espaço entre a imagem e o conteúdo */
    padding-left: 50px;
}

.profile-box img {
    width: 300px; /* Aumenta o tamanho da imagem do perfil */
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
    flex-direction: column; /* Coloca o texto em cima do input */
    font-size: 24px;
    font-family: "Pragati Narrow", sans-serif;
}

.profile-info input {
    width: 100%;
    height: 50px; /* Aumenta a altura dos inputs */
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
    width: 200px; /* Aumenta os botões */
    height: 50px;
    background: #c2a404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 22px;
    font-family: "Pragati Narrow", sans-serif;
    font-weight: 600;
    color: black;
    text-decoration: none;

    transition: background 0.3s;
}

.button:hover {
    background: #b29903;
}
</style>
