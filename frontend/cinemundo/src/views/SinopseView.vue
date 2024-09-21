<script>
    import { defineComponent } from 'vue';

    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Sinopse from '@/components/Sinopse.vue';

    export default defineComponent({
        name: 'SinopseView',
        components: {
            Header,
            Sinopse,
            Footer,
        },
  });
  
</script>

<template>
    <div>
        <Header />
        <Sinopse />
        <Footer />

    </div>
</template>
