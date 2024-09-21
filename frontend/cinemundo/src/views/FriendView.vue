<script>
    import { defineComponent } from 'vue';

    import HeaderLogged from '@/components/HeaderLogged.vue';
    import Footer from '@/components/Footer.vue';
    import Friend from '@/components/Friend.vue';

    export default defineComponent({
        name: 'FriendView',
        components: {
            HeaderLogged,
            Friend,
            Footer,
        },
  });
  
</script>

<template>
    <div>
        <Header />
        <Friend />
        <Footer />

    </div>
</template>