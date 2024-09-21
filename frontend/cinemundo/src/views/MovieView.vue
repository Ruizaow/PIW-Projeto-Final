<script>
    import { defineComponent } from 'vue';

    import HeaderLogged from '@/components/HeaderLogged.vue';
    import Footer from '@/components/Footer.vue';

    export default defineComponent({
        name: 'MovieView',
        components: {
            HeaderLogged,
            Footer,
    },
  });
</script>

<template>
    <Header/>
    
    <div class="filmes-section">
        <h2>Filmes</h2>
        <div class="button-container">
            <!--<div class="button"><span>+</span><span> Adicionar Filme</span></div>
            <div class="button"><span>+</span><span> Cadastrar Filme</span></div>-->
            <div class="button" @click="addmovie">+ Adicionar Filme</div>
            <div class="button" @click="cadramovie">+ Cadastrar Filme</div>
        </div>
        <div class="filmes-grid">
            <img v-for="i in 12" :key="i" class="filme" :src="`https://via.placeholder.com/146x219`" :alt="`Filme ${i}`" />
        </div>
    </div>

    <Footer/>
</template>



<style scoped>
    /* Estilos do componente, você pode manter os estilos que você já tem */
    .filmes-section {
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .filmes-section h2 {
        font-family: "Pragati Narrow", sans-serif;
        font-size: 38px;
        text-align: start;
        padding-left: 238px;
    }

    .filmes-grid {
        display: grid;
        grid-template-columns: repeat(6, 160px);
        column-gap: 4px;
        row-gap: 15px;
        justify-items: center;
        justify-content: center;
        max-width: 100%;
    }

    .filme {
        width: 146px;
        height: 219px;
    }

    .button-container {
        display: flex;
        margin-top: 5px;
        margin-bottom: 20px;
        padding-left: 850px;
        gap: 20px;
    }

    .button {
        width: 180px;
        height: 45px;
        background: #c2a404;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-family: "Pragati Narrow", sans-serif;
        font-weight: 300;
    }
</style>