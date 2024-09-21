<script>
    import { defineComponent } from 'vue';

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Friend from '@/components/Friend.vue';

    export default defineComponent({
        name: 'FriendView',
        components: {
            Header,
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
