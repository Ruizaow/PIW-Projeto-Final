<template>
    <div class="frase">
        <h1>Suas Aventuras Cinematográficas: Explore novos<br>
        mundos, acompanhe seus filmes favoritos e <br>
        compartilhe suas emoções na tela</h1>
        <RouterLink to="/register" class="menu-item"><button class="btn-cadastre-se">Cadastre-se</button></RouterLink>
    </div>
</template>
  
<style scoped>
.frase {
  text-align: center;
}

.frase h1 {
  font-family: "M PLUS Rounded 1c", sans-serif;
  font-weight: 700;
  font-size: 32px;

  word-wrap: break-word;
  margin-bottom: 20px;
  margin-top: 500px;
}

.btn-cadastre-se {
  font-family: 'Pragati Narrow', sans-serif;
  font-weight: 700;
  font-size: 26px;

  width: 220px;
  height: 48px;

  background-color: #c2a404;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  border-radius: 25px;
  border: none;

  cursor: pointer;
}
</style>