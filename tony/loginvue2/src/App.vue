<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/explorer">Explorer</router-link>  |
      <router-link to="/market">Market</router-link>  |
      <router-link to="/trading">Trading</router-link>  |
      <router-link to="/creator">Creator</router-link>  |
      <Login v-on:logged-in="setWax" v-on:logged-out="clearWax"/>
    </div>
    <router-view/>
    <div v-if='wax!=""'>
      <RegisterMarket :wax="wax"/>
      <CreateSale :wax="wax"/>
      <CancelSale :wax="wax"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

import RegisterMarket from '@/components/RegisterMarket.vue'
import CreateSale from '@/components/CreateSale.vue'
import CancelSale from '@/components/CancelSale.vue'

export default {
  name: 'Home',
  components: {
    Login,
    RegisterMarket,
    CreateSale,
    CancelSale,
  },
  data () {
    return {
      wax: ""
    }
  },
  methods: {
    setWax: function (waxObj) {
      this.wax = waxObj
    },
    clearWax: function () {
      this.wax = ""
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
