<template>
  <v-app>
    <v-main>
      <HeaderPage class="HeaderPage" v-if="userRole !== 'admin'"  />
      <HeaderPageAdmin class="HeaderPageAdmin" v-else  />

      <router-view class="router-view-container" />

      <template v-if="showFooter">
        <FooterPage />
      </template>

    </v-main>
  </v-app>
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import HeaderPageAdmin from '@/components/HeaderPageAdmin.vue';
import FooterPage from '@/components/FooterPage.vue';
import { mapState } from 'vuex';
// import store from './store';

export default {
  name: 'App',

  data() {
    return {
      showFooter: true,
    };
  },

  components: {
    HeaderPage,
    FooterPage,
    HeaderPageAdmin,
  },

  computed: {
    ...mapState(['userRole']),
  },

  watch: {
    $route(to) {
      this.showFooter = to.name !== 'MapPage';
    },
  },
};
</script>

<style>
@font-face {
  font-family: "BellotaText";
  src: local("BellotaText"), url(./fonts/BellotaText-Regular.ttf) format("truetype");
}

.HeaderPage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.HeaderPageAdmin {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.router-view-container {
  margin-top: 80px;
}
</style>