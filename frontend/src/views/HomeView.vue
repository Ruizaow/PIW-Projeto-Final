<script setup lang="ts">
import MyHeader from '@/components/Header.vue';
import FraseSection from '@/components/FraseSection.vue';
import WeeklyMovies from '@/components/WeeklyMovies.vue';
import CommentSection from '@/components/CommentsSection.vue';
import MyFooter from '@/components/Footer.vue';
import HeaderLogged from '@/components/HeaderLogged.vue';
import PopularMovies from '@/components/PopularMovies.vue';

import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>

<template>
    <!-- Se usuário estiver logado, carrega a home com login -->
    <div v-if="userStore.userData.id > 0">
        <HeaderLogged/>
        <PopularMovies />
        <WeeklyMovies />
        <CommentSection />
        <MyFooter />
    </div>

    <!-- Se usuário não estiver logado, carrega a home sem login -->
    <div v-else>
        <div class="background-container">
            <div class="background-image">
                <img src="@/assets/Martin-Scorsese.png" alt="Martin-Scorsese">
            </div>
            <div class="overlay"></div>

            <MyHeader />
            <FraseSection />
            <WeeklyMovies />
            <CommentSection />
            <MyFooter />
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
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(100, 100, 100), rgb(100, 100, 100), rgb(100, 100, 100));
    z-index: -1;
    opacity: 1;
}
</style>