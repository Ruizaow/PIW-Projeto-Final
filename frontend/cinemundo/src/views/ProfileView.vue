<script>
    import { defineComponent } from 'vue';

    import HeaderLogged from '@/components/HeaderLogged.vue';
    import Footer from '@/components/Footer.vue';
    import Profile from '@/components/Profile.vue';

    export default defineComponent({
        name: 'ProfileView',
        components: {
        HeaderLogged,
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