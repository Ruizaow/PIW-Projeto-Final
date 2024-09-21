<script>
import { defineComponent } from 'vue';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Profile from '@/components/Profile.vue';

export default defineComponent({
  name: 'ProfileView',
  components: {
    Header,
    Profile,
    Footer,
  },

});

</script>

<template>
  <div>
    <Header />
    <Profile />
    <Footer />
  </div>
</template>

