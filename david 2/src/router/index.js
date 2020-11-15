import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "./../components/Home.vue";
import LoginPage from "./../components/Login.vue";
import saleDetailPage from "./../components/Sales.vue";
import MarketPlace from "./../components/MarketPlace.vue";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage,
        },
        {
            path:'/MarketPlace',
            component: MarketPlace
        },
        {
            path: '/login/',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/:id',
            name: 'salesDetail',
            component: saleDetailPage,
        }

        ]
})
