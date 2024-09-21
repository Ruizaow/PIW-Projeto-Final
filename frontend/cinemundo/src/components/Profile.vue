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
              <div class="button" @click="editProfile">Editar Perfil</div>
              <div class="button" @click="accessList">Acessar Lista</div>
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
        name: "Seu Nome Aqui",
        username: "Username",
        email: "email@example.com",
      };
    },
    methods: {
      editProfile() {
        // Lógica para editar o perfil
        console.log("Editar Perfil clicado");
      },
      accessList() {
        // Lógica para acessar a lista
        console.log("Acessar Lista clicado");
      },
    },
  };
  </script>
  
  <style scoped>
  /* ---------- FONTES DE TEXTO DA PÁGINA ---------- */
  .ranchers-regular {
    font-family: "Ranchers", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  .pragati-narrow-regular {
    font-family: "Pragati Narrow", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  .pragati-narrow-bold {
    font-family: "Pragati Narrow", sans-serif;
    font-weight: 700;
    font-style: normal;
  }
  
  .quicksand-medium {
    font-family: "Quicksand", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: medium;
  }
  
  /* ---------- FORMATO DO BODY/PÁGINA ---------- */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
 
  .menu-item {
    font-family: "Pragati Narrow", sans-serif;
    font-size: 25px;
    color: black;
    text-decoration: none;
  }
  
  .menu-rectangle {
    display: flex;
    justify-content: end;
    padding-right: 15px;
    align-items: center;
    width: 239px;
    height: 40px;
    background: #a1a5b1;
    border-radius: 75px;
  }
  
  .menu-rectangle img {
    width: 35px;
    align-items: end;
  }
  
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
    align-items: center;
    gap: 10px;
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
    gap: 20px;
    margin-top: 30px;
    padding-left: 220px;
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
    transition: background 0.3s;
  }
  
  .button:hover {
    background: #b29903;
  }
  </style>
  