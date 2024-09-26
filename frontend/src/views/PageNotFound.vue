<script setup lang="ts">
    import MyFooter from '@/components/Footer.vue';

    import Footer from '@/components/Footer.vue';
</script>

<template>
    <div class="container">
        <h1 class="text_h1">ERRO 404: Página não encontrada! &#128542</h1>

        <h2 class="text_h2">Volte para a página inicial</h2>
        <RouterLink to="/" style="text-decoration: none; color: black;">
            <span class="button">clicando neste botão</span>
        </RouterLink>
    </div>

    <MyFooter />
</template>

<style scoped>
.container {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.text_h1 {
    text-align: center;
    font-family: "Quicksand", sans-serif;
    font-size: 48px;
    font-weight: 500;
    font-style: medium;

    color: white;
    margin-bottom: 220px;
}

.text_h2 {
    text-align: center;
    font-family: "Quicksand", sans-serif;
    font-size: 36px;
    font-weight: 500;
    font-style: medium;

    color: white;
    margin-bottom: 20px;
}

.button {
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    font-size: 32px;
    
    width: 600px;
    height: 60px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: #C2A404;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    cursor: pointer;
}

.button:hover {
    transition: 0.15s;
    background: #e6c300;
    height: 70px;
}
</style>