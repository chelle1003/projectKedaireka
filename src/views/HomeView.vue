<template>
  <HomePage />
</template>

<script>
import { defineComponent } from 'vue';

import HomePage from '@/components/HomePage.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HomePage
  },
});
</script>
