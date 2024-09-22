<template>
    <div class="profile-container">
        <div class="profile-box">
            <img :src="profilePicture" alt="Foto de Perfil" />
  
            <div class="profile-info">
                <label>
                    Titulo:
                    <input v-model="name" type="text"/>
                </label>
                <label>
                    Ano de Laçamento:
                    <input v-model="ano" type="text"/>
                </label>
                <label class="sinopse">
                    Sinopse:
                    <textarea v-model="sinopse"></textarea>
                </label>
  
                <div class="profile-actions">
                    <div class="button" @click="cadFilm">Cadastrar Filme</div><!--SÓ A PROPRIA PESSOA VAI PODER ALTERAR-->
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            profilePicture: "https://via.placeholder.com/300x300",
            name: "Titulo do Filme",
            ano: "Ano de Lançamento",
            sinopse: "Coloque a Sinopse Aqui",
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
    height: 400px; 
    padding-top: 110px;
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

.sinopse input {
    width: 100%;
    height: 100px; /* Aumenta a altura dos inputs */
    background: #3e3d3d;
    border-radius: 30px;
    border: none;
    padding: 0 15px;
    color: rgb(3, 3, 3);
}

.sinopse textarea {
    width: 100%;
    height: 100px; /* Aumenta a altura do textarea */
    background: #3e3d3d;
    border-radius: 30px;
    border: none;
    padding: 15px; /* Ajusta o padding para o textarea */
    color: rgb(3, 3, 3);
    resize: none; /* Remove a opção de redimensionar o textarea */
    font-size: 16px;
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
