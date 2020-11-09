import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from "./../components/Home.vue";

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path:'/MarketPlace',
      component: ()=>import("./../components/MarketPlace.vue")
    },
    {
      path: '/NFT',
      name: 'NFT',
      component: ()=>import("./../components/NFTPage.vue")
    },
    {
      path:'/NFT/creator',
      name: 'createNFT',
      component: ()=>import("./../components/CreateCollection.vue")
    },
    {
      path: '/login/',
      name: 'login',
      component: ()=>import("./../components/Login.vue")
    },
    {
      path: '/:id',
      name: 'salesDetail',
      component: ()=>import("./../components/Sales.vue")
    },
  ]
})

export default router
