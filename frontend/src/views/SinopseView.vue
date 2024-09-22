<script>
    import { defineComponent } from 'vue';

    import HeaderLogged from '@/components/HeaderLogged.vue';
    import Footer from '@/components/Footer.vue';
    import Sinopse from '@/components/Sinopse.vue';

    export default defineComponent({
        name: 'SinopseView',
        components: {
            HeaderLogged,
            Sinopse,
            Footer,
        },
  });
  
</script>

<template>
    <div>
        <HeaderLogged />
        <Sinopse />
        <Footer />

    </div>
</template>