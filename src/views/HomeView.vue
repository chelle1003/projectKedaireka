<template>
  <HeaderPage />
  <!-- <TentangPage /> -->
  <FooterPage />
</template>

<script>
import { defineComponent } from 'vue';

// Components
// import HelloWorld from '../components/HelloWorld.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import FooterPage from '@/components/FooterPage.vue';
// import TentangPage from '@/components/TentangPage.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HeaderPage,
    FooterPage,
    // TentangPage
  },
});
</script>
