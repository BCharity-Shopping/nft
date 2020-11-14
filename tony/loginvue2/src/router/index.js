import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:account_name/:tab?',
    name: 'Profile',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/explorer',
    name: 'Explorer',
    component: () => import('../views/Explorer.vue')
  },
  {
    path: '/explorer/asset/:asset_id',
    name: 'Asset',
    component: () => import('../views/Asset.vue')
  },
  {
    path: '/market/',
    name: 'Market',
    component: () => import('../views/Market.vue')
  },
  {
    path: '/market/sale/:sale_id',
    name: 'Sale',
    component: () => import('../views/Market.vue') //todo: add Sale.vue page
  },
  {
    path: '/trading',
    name: 'Trading',
    component: () => import('../views/Trading.vue')
  },
  {
    path: '/trading/new-offer',
    name: 'New-Offer',
    component: () => import('../views/New-Offer.vue')
  },
  {
    path: '/creator',
    name: 'Creator',
    component: () => import('../views/Creator.vue')
  },
  {
    path: '/fundraisers/',
    name: 'Discover',
    component: () => import('../views/Discover.vue')
  },
  {
    path: '/fundraisers/:fundraiser_id',
    name: 'Fundraiser',
    component: () => import('../views/Fundraiser.vue')
  },
]

const router = new VueRouter({
  routes 
})

export default router
