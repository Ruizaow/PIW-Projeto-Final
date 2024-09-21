<template>
    <div id="app">
      <header>
        <nav class="logo-title">
          <a href="#" class="logo">
            <img src="@/assets/CineMundo-Logo.png" alt="CineMundo Logo" /></a>
          <a href="#" class="cine-mundo">CineMundo</a>
        </nav>
        <nav class="menu">
          <router-link to="/login" class="menu-item">Login</router-link> <!-- Aqui redireciona para Login -->
  
          <a href="#" class="menu-item">Filmes</a>
  
          <a href="#" class="menu-item">Lista</a>
          
          <div class="menu-rectangle">
            <input type="text" placeholder="Buscar..." class="search-input" />
            <img src="@/assets/Lupa.png" alt="Buscar" />
          </div>
        </nav>
      </header>
    </div>
  </template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
}

header {
  width: 100vw;

  padding-top: 20px;
  padding-bottom: 20px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8c821;
}

.logo-title {
  padding-left: 60px;
}

.cine-mundo {
  padding-left: 21px;
  font-family: 'Ranchers', sans-serif;
  font-size: 40px;
  font-weight: 800;
  color: black;
}

.menu {
  display: flex;
  gap: 30px;
  align-items: center;
  padding-left: 600px;
}

.menu-item {
  font-family: 'Pragati Narrow', sans-serif;
  font-size: 25px;
  color: black;
  text-decoration: none;
}

.menu-rectangle {
  display: flex;

  height: 40px;
  background: #a1a5b1;
  
  border-radius: 75px;
  width: 239px;
}

.menu-rectangle img {
  padding-top: 2px;

  height: 35px;
  margin-right: 15px;
}

.search-input {
  padding: 5px;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  color: #030303;
}

</style>