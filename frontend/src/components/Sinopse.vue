<template>  
      <div class="profile-container">
        <div class="film-box">
          <div class="film-info">
            <div class="film-title">
              Click <span class="year">(2005)</span>
            </div>
            <img class="film-image" src="https://via.placeholder.com/276x415" alt="Filme Click" />
          </div>
          <div class="film-details">
            <div class="synopsis">
              Sinopse:<br />
              Um arquiteto casado e com filhos está cada vez mais frustrado por 
              passar a maior parte de seu tempo trabalhando. Um dia, ele encontra um 
              inventor excêntrico que lhe dá um controle remoto universal, com capacidade 
              de acelerar o tempo. No início, ele usa o aparelho para acelerar qualquer momento 
              tedioso, mas se dá conta de que está acelerando o tempo demais e deixando de 
              viver preciosos momentos em família. Desesperado, ele procura o inventor para 
              ajudá-lo a reverter o que fez.
            </div>
            <div class="add-button" @click="addFilm">
              <span class="plus">+</span>
              <span>Adicionar Filme à lista</span>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    methods: {
      addFilm() {
        // Lógica para adicionar filme à lista
        alert("Filme adicionado à lista!");
      }
    }
  }
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 40px;
    width: 100%;
  }
  
  .film-box {
    width: 1200px; /* Largura do box do filme */
    background: #525151;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    gap: 20px;
  }
  
  .film-title {
    font-size: 50px;
    color: white; /* Cor do título */
    display: flex;
    align-items: baseline; /* Alinha o ano com o título */
    margin-bottom: 20px; /* Espaço abaixo do título */
  }
  
  .film-image {
    width: 276px;
    height: 415px;
  }
  
  .film-info {
    flex: 1; /* Permite que a sinopse ocupe o espaço restante */
    color: white; /* Cor da sinopse */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alinhamento à esquerda */
  }
  
  .synopsis {
    font-size: 32px;
    text-align: justify;
    line-height: 1.5;
    margin-top: 80px; /* Espaço acima da sinopse */
  }
  
  .year {
    font-size: 32px;
    margin-left: 10px; /* Espaço entre o título e o ano */
  }
  
  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 207px;
    height: 52px;
    background: #C2A404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    margin-top: 30px; /* Espaço acima do botão */
    margin-left: 600px;
    cursor: pointer;
  }
  
  .add-button span {
    font-size: 20px;
    font-weight: 400;
    margin-left: 10px;
  }
  </style>
  