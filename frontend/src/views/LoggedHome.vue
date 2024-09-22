<script>
import { defineComponent } from 'vue';

import HeaderLogged from '@/components/HeaderLogged.vue';
import PopularMovies from '@/components/PopularMovies.vue';
import WeeklyMovies from '@/components/WeeklyMovies.vue';
import CommentSection from '@/components/CommentsSection.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
    name: 'loggedHome',
    components: {
        HeaderLogged,
        PopularMovies,
        WeeklyMovies,
        CommentSection,
        Footer,
    },
})
</script>

<template>
    <div>
        <HeaderLogged/>
        <PopularMovies />
        <FraseSection />
        <WeeklyMovies />
        <CommentSection />
        <Footer />
    </div>
</template>