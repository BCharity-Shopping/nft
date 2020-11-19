import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from "../views/Home.vue";

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'Home',
      component: HomePage,
    },
    {
      path: '/profile/:account_name/:tab?',
      name: 'Profile',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
    },
    {
      path:'/MarketPlace',
      name:'MarketPlace',
      component: ()=>import("../views/MarketPlace.vue")
    },
    {
      path: '/trading',
      name: 'Trading',
      component: () => import('../views/Trading.vue')
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
      path:'/creator/:collectionname',
      name: "collectionInfo",
      component: ()=>import("./../components/CollectionInfo.vue")
    },
    {
      path:'/creator/:collectionname/createSchema',
      name:"createSchema",
      component: ()=>import("./../components/CreateSchema.vue")
    },
    {
      path:'/creator/:collectionname/schema/:schemaname',
      name:"schemaInfo",
      component: ()=>import("./../components/SchemaInfo.vue")
    },
    {
      path:'/creator/:collectname/schema/:schemaName/CreateTemplate',
      name:"templateInfo",
      component: ()=>import("./../components/CreateTemplate.vue")
    },
    {
      path:'/creator/:collectname/schema/:schemaName/CreateAssets',
      name:"CreateAsset",
      component: ()=>import("./../components/CreateAssets.vue")
    },
    {
      path: '/trading/new-offer',
      name: 'New-Offer',
      component: () => import('../views/new-offer.vue')
    },
    {
      path: '/login/',
      name: 'login',
      component: ()=>import("./../components/Login.vue")
    },
    {
      path: '/MarketPlace/:id',
      name: 'salesDetail',
      component: ()=>import("./../components/Sales.vue")
    },
    {
      path: '/fundraisers',
      name: 'Fundraisers',
      component: () => import('../views/Fundraisers.vue')
    },
    {
      path: '/fundraisers/:fundraiser_id',
      name: 'Fundraiser',
      component: () => import('../views/Fundraiser.vue')
    },
  ]
})

export default router
