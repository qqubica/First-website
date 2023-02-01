import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistList from '@/components/ArtistList.vue'
import ArtistOnConcertList from "@/components/ArtistOnConcertList.vue";
import ConcertList from "@/components/ConcertList.vue";
import ArtistForm from "@/components/ArtistForm.vue";
import ConcertForm from "@/components/ConcertForm.vue";
import ArtistOnConcertForm from "@/components/ArtistOnConcertForm.vue";
import loginView from "@/views/LoginView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'login',
    component: loginView,
  },
  {
    path: '/artist',
    name: 'artist',
    component: ArtistList
  },
  {
    path:'/concert',
    name:'concert',
    component: ConcertList
  },
  {
    path:'/artistOnConcert',
    name:'artistOnConcert',
    component: ArtistOnConcertList
  },
  {
    path:'/artist/:mode/:id',
    name:'artistForm',
    component: ArtistForm,
    props: true
  },
  {
    path:'/artist/add',
    name:'artistFormEmpty',
    component: ArtistForm,
    props: false
  },
  {
    path:'/concert/:mode/:id',
    name:'concertForm',
    component: ConcertForm,
    props: true
  },
  {
    path:'/concert/add',
    name:'concertFormEmpty',
    component: ConcertForm,
    props: false
  },
  {
    path:'/artistOnConcert/:mode/:id',
    name:'artistOnConcertForm',
    component: ArtistOnConcertForm,
    props: true
  },
  {
    path:'/artistOnConcert/add',
    name:'artistOnConcertFormEmpty',
    component: ArtistOnConcertForm,
    props: false
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
