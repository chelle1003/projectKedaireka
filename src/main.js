import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import ApexCharts from 'vue3-apexcharts';
import {initializeApp} from "firebase/app";
import store from './store';

const firebaseConfig = {
  apiKey: "AIzaSyDJ_KahgSN90N--1h15EWncvTsc57fMwI4",
  authDomain: "kedaireka-a9d57.firebaseapp.com",
  projectId: "kedaireka-a9d57",
  storageBucket: "kedaireka-a9d57.appspot.com",
  messagingSenderId: "1063190454842",
  appId: "1:1063190454842:web:3a3dde6d3aaeb041790b03"
};

initializeApp(firebaseConfig);

loadFonts()

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(ApexCharts)
  .mount('#app')

