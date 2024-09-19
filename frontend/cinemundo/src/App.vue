<template>
  <div id="app">
    <header class="header">
      <nav class="logo-title">
        <a class="logo" href="#">
          <img src="@/assets/CineMundo-Logo.png" alt="CineMundo Logo" />
        </a>
        <a class="cine-mundo" href="#">CineMundo</a>
      </nav>

      <nav class="menu">
        <a href="#" class="menu-item">Perfil</a>
        <a href="#" class="menu-item">Filmes</a>
        <a href="#" class="menu-item">Amigos</a>
        <div class="menu-rectangle">
          <input type="text" placeholder="Buscar..." class="search-input" />
          <img src="@/assets/Lupa.png" alt="Buscar" />
        </div>
      </nav>
    </header>

    <div>
      <PopularMovies />
      <WeeklyMovies />
      <CommentsSection />
      <Footer />
    </div>
    <RouterView></RouterView>
  </div>
</template>


<script>
import PopularMovies from './components/PopularMovies.vue';
import WeeklyMovies from './components/WeeklyMovies.vue';
import CommentsSection from './components/CommentsSection.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    PopularMovies,
    WeeklyMovies,
    CommentsSection,
    Footer,
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  min-height: 100vh; /* Garantir que o app ocupe toda a altura da tela */
  background: #a1a5b1;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 20px;
  background: #f8c821;
}

.logo-title {
  display: flex;
  align-items: center;
  padding-left: 60px;
}

.cine-mundo {
  padding-left: 21px;
  padding-top: 15px;
  font-family: 'Ranchers', sans-serif;
  font-size: 40px;
  color: black;
}

.menu {
  padding-top: 15px;
  padding-left: 40px;
  display: flex;
  gap: 30px;
}

.menu-item {
  font-family: 'Pragati Narrow', sans-serif;
  font-size: 25px;
  color: black;
  text-decoration: none;
}

.menu-rectangle {
  display: flex;
  justify-content: flex-end;
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
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  padding: 5px;
  color: #030303;
}

</style>