<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/explorer">Explorer</router-link>  |
      <router-link to="/market">Market</router-link>  |
      <router-link to="/trading">Trading</router-link>  |
      <router-link to="/creator">Creator</router-link>  |
      <div v-if='this.getWax==""'>
        <Login/>
      </div>
      <div v-else>
        <AccountDropdown/>
      </div>
    </div>
    <router-view/>
    <!--
    <div v-if='this.getWax==""'>
      <p>Not Logged In</p>
    </div>
    <div v-else>
      <p>Logged In To {{this.getWax.userAccount}}</p>
    </div>
    -->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
import AccountDropdown from '@/components/AccountDropdown.vue'

export default {
  name: 'Home',
  components: {
    Login,
    AccountDropdown,
  },
  data () {
    return {
      wax: ""
    }
  },
  computed: {
    ...mapGetters([
      'getWax'
    ])
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
