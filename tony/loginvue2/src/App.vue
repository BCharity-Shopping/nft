<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">BCause</router-link> |
      <router-link to="/trading">Listing</router-link> |
      <router-link to="/creator">Create Campaign</router-link> |
      <router-link to="/fundraisers">Campaigns</router-link> |
      <div v-if='this.getWax==""'>
        <Login/>
      </div>
      <div v-else>
        <AccountDropdown/>
      </div>
    </div>
    <hr>
    <router-view/>
    <!--
    <div v-if='this.getWax==""'>
      <p>Not Logged In</p>
    </div>
    <div v-else>
      <p>Logged In To {{this.getWax.userAccount}}</p>
    </div>
    -->
    <TransactionStateModal/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// @ is an alias to /src
import Login from '@/components/Login.vue'
import AccountDropdown from '@/components/AccountDropdown.vue'
import TransactionStateModal from '@/components/TransactionStateModal.vue'

export default {
  name: 'Home',
  components: {
    Login,
    AccountDropdown,
    TransactionStateModal,
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
  /*background-color: #3d3d5c;*/
  color: grey;
  text-align: center;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #b3b4c5;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: green;
}

html {
  /*background-color: #3d3d5c;*/
}
</style>
