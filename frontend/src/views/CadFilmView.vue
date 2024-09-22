<script>
    import { defineComponent } from 'vue';

    import HeaderLogged from '@/components/HeaderLogged.vue';
    import Footer from '@/components/Footer.vue';
    import CadFilm from '@/components/CadFilm.vue';

    export default defineComponent({
        name: 'CadFilmView',
        components: {
        HeaderLogged,
        CadFilm,
        Footer,
    },
});
</script>

<template>
    <div>
        <HeaderLogged />
        <CadFilm />
        <Footer />
    </div>
</template>