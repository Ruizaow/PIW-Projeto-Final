<template>
  <div class="container">
    <div class="main-content">
      <!-- Seu conteúdo principal aqui -->
    </div>
    <footer class="footer">
      <div class="footer-content">
        <span class="copy">Copyright (c) 2003 CineMundo All Rights Reserved</span><br />
        <span>TV data from </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 45vh;
}

.main-content {
  flex-grow: 1;
}

.footer {
  width: 100vw; /* Mudando para 100vw para ocupar toda a largura da viewport */
  height: 100px;
  background-color: #deb31b;
  display: flex;
  align-items: center;
  padding-left: 100px; /* Adicionando padding aqui */
  box-sizing: border-box; /* Inclui o padding na largura total */
  position: relative; /* Fixa o rodapé na parte inferior */
  bottom: 0; /* Fixa na parte inferior da tela */
  left: 0; /* Garante que começa na borda esquerda */
}

.footer-content {
  font-size: 20px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
}

.footer a {
  text-decoration: underline;
  color: black;
}
</style>
