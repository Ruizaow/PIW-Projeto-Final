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

<template>
  <div id="app">
    <header>
      <nav class="logo-title">
        <a href="#" class="logo"><img src="@/assets/CineMundo-Logo.png" alt="CineMundo Logo" /></a>
        <a href="#" class="cine-mundo">CineMundo</a>
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
      <PopularMovies/>
      <WeeklyMovies/>
      <CommentsSection/>
      <Footer/>
    </div>
    <RouterView></RouterView>

    <footer class="footer">
      <div class="footer-content">
        <span>Copyright (c) 2003 CineMundo All Rights Reserved</span><br />
        <span>TV data from <a href="#">TMDB</a></span>
      </div>
    </footer>
  </div>
</template>

<style>
html, body {
  background-color: #8B8B8B; /* Altera a cor de fundo da página inteira */
}
</style>

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
  width: 100%;

  padding-top: 10px;
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
  padding: 5px;

  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  color: #030303;
}

</style>