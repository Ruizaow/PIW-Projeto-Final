<script>
export default{
  name: 'App',
}
</script>

<template>
  <Header/>

    <RouterLink to="/"></RouterLink>

    <RouterView />
    
  <Footer />
</template>

<style>
html, body {
  background-color: #8B8B8B; /* Altera a cor de fundo da página inteira */
  margin: 0;
  padding: 0;
}
</style>