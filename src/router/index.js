import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/TentangPage',
    name: 'TentangPage',
    component: () => import('../components/TentangPage.vue')
  },
  {
    path: '/MapPage',
    name: 'MapPage',
    component: () => import('../components/MapPage.vue')
  },
  {
    path:'/KalkulatorPage4',
    name:'KalkulatorPage4',
    component: () => import('../components/KalkulatorPage4.vue')
  },
  {
    path:'/KalkulatorPage',
    name:'KalkulatorPage',
    component: () => import('../components/KalkulatorPage.vue')
  },
  {
    path: '/BantuanPage',
    name: 'BantuanPage',
    component: () => import('../components/BantuanPage.vue')
  },
  {
    path: '/TambahData',
    name: 'TambahData',
    component: () => import('../components/TambahData.vue')
  },
  {
    path: '/HalamanLogin',
    name: 'HalamanLogin',
    component: () => import('../components/HalamanLogin.vue')
  },
  {
    path: '/DataKarbon',
    name: 'DataKarbon',
    component: () => import('../components/DataKarbon.vue')
  },
  {
    path: '/TambahDevice',
    name: 'TambahDevice',
    component: () => import('../components/TambahDevice.vue')
  },
  {
    path: '/DataDevice',
    name: 'DataDevice',
    component: () => import('../components/DataDevice.vue')
  },
  {
    path: '/Beranda',
    name: 'HomePage',
    component: () => import('../components/HomePage.vue')
  },
  {
    path:'/KalkulatorPageLoading',
    name:'KalkulatorPageLoading',
    component: () => import('../components/KalkulatorPageLoading.vue')
  },
  {
    path:'/GrafikTren',
    name:'GrafikTren',
    component: () => import('../components/TrenPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router