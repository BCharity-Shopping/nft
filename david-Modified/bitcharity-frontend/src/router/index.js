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
      name:'MarketPlace',
      component: ()=>import("./../components/MarketPlace.vue")
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
