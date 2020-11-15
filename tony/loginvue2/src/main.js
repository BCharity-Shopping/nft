import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export const bus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: createProvider(),

  apollo: {

  },

  store: store,
  render: h => h(App)
}).$mount('#app')
