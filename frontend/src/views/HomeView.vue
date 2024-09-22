<script>
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue';
import FraseSection from '@/components/FraseSection.vue';
import WeeklyMovies from '@/components/WeeklyMovies.vue';
import CommentSection from '@/components/CommentsSection.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Header,
        FraseSection,
        WeeklyMovies,
        CommentSection,
        Footer
    }
})
</script>

<template>
    <div class="background-container">
        <div class="background-image">
            <img src="@/assets/Martin-Scorsese.png" alt="Martin-Scorsese">
        </div>
        <div class="overlay"></div>

        <Header />
        <FraseSection />
        <WeeklyMovies />
        <CommentSection />
        <Footer />
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