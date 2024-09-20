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
    Footer,
  },

})
</script>

<template>
  <div>
    <Header />
    <FraseSection />
    <WeeklyMovies />
    <CommentSection />
    <Footer />
  </div>
</template>

