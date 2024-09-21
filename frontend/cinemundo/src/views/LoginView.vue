<script>
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
    name: 'LoginView',
    components: {
        Header,
        Footer
    }
});
</script>

<template>
    <div class="background-container">
        <div class="background-image">
            <img src="@/assets/Martin-Scorsese.png" alt="Martin-Scorsese">
        </div>
        <div class="overlay"></div>
        
        <Header />

        <div class="login-container">
        <div class="login-box">
            <h1>Login</h1>
            <label>
            E-mail
            <input type="text" placeholder="Digite seu e-mail ou Username">
            </label>

            <label>
            Password
            <input type="password" placeholder="Digite sua senha">
            </label>

            <div class="checkbox-container">
            <input type="checkbox" id="Lembrar">
            <label for="age-confirmation" class="checkbox-label">Lembre de Mim</label>
            </div>
            <router-link to="/LoggedHome"><button class="submit-button">Entrar</button></router-link>
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

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    flex-direction: column;
    padding-top: 80px;
}

.login-box {
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

.login-box h1 {
    font-size: 36px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
}

.login-box label {
    font-size: 24px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.login-box input {
    width: 100%;
    height: 38px;
    background: #8B8B8B;
    border-radius: 50px;
    border: none;
    padding: 0 10px;
    margin-bottom: 10px;
}

.login-box .checkbox-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.login-box input[type="checkbox"] {
    width: 20px;
    height: 20px;
}

.login-box .checkbox-label {
    font-size: 16px;
    color: black;
    font-family: "Pragati Narrow", sans-serif;
}

.login-box .submit-button {
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

.login-box .submit-button:hover {
    background: #D9A520;
}
</style>