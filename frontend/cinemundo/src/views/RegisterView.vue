<script>
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
    name: 'RegisterView',
    components: {
        Header,
        Footer,
    },
});
</script>

<template>
    <div class="background-container">
        <div class="background-image">
            <img src="@/assets/Martin-Scorsese.png" alt="Martin-Scorsese">
        </div>
        <div class="overlay"></div>

        <Header />
        
        <div class="registration-container">
            <div class="registration-box">
                <h1>Cadastro</h1>
                <label>
                E-mail
                <input type="text" placeholder="Digite seu e-mail">
                </label>
                <label>
                Username
                <input type="text" placeholder="Digite seu username">
                </label>
                <label>
                Password
                <input type="password" placeholder="Digite sua senha">
                </label>
                <div class="checkbox-container">
                <input type="checkbox" id="age-confirmation">
                <label for="age-confirmation" class="checkbox-label">Você confirma ter mais de 16 anos e que possivelmente estará vendendo sua alma e aceita os Termos de Uso</label>
                </div>
                <button class="submit-button">Cadastre-se</button>
            </div>

            <Footer />

        </div>
    </div>
</template>

<style scoped>
.background-container {
    position: relative;
    z-index: 1;
}

.background-image {
    position: absolute;
    width: 100vw;
    z-index: -1;
    opacity: 0.8;
}

.background-image img {
    width: 100%;
}

.overlay {
    position: absolute;
    width: 100vw;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(100, 100, 100, 0.6), rgb(100, 100, 100), rgb(100, 100, 100));
    z-index: -1;
    opacity: 1;
}

.registration-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    flex-direction: column;
    padding-top: 50px;
}

.registration-box {
    display: flex;
    width: 500px;
    background: #767676;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.registration-box h1 {
    font-size: 36px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
}

.registration-box label {
    font-size: 24px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.registration-box input {
    width: 100%;
    height: 38px;
    background: #8B8B8B;
    border-radius: 50px;
    border: none;
    padding: 0 10px;
    margin-bottom: 10px;
}

.registration-box .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.registration-box input[type="checkbox"] {
    width: 20px;
    height: 20px;
}

.registration-box .checkbox-label {
    font-size: 16px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
}

.registration-box .submit-button {
    width: 219px;
    height: 48.69px;
    background: #DEB31B;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 19px;
    color: black;
    font-size: 36px;
    font-family: "Pragati Narrow", sans-serif;
    text-align: center;
    line-height: 48.69px;
    cursor: pointer;
    border: none;
    transition: background 0.3s;
}

.registration-box .submit-button:hover {
    background: #D9A520;
}
</style>

