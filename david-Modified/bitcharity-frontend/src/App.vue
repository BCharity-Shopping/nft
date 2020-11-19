<template>
  <div id="app">
     <div id="nav">
      <router-link to="/MarketPlace">Market Place</router-link> |
      
      <router-link to="/NFT">NFT</router-link> |
      <router-link to="/trading">trading</router-link> |
      <router-link to="/MarketPlace">Market</router-link> |
      <router-link to="/trading">Trading</router-link> |
      <router-link to="/creator">Create Cause</router-link> |
      <router-link to="/fundraisers">Campaigns</router-link> |
      <div v-if='this.getWax==""'>
            <Login/>
      </div>
      <div v-else>
          <AccountDropdown/>
      </div>
      </div>
          <router-view/>
      </div>
      
</template>
<script>
  import { mapGetters } from 'vuex'
  import Login from '@/components/Login.vue'
  import AccountDropdown from '@/components/AccountDropdown.vue'
  export default {
      name: "App",
      components: {
        Login,
        AccountDropdown
      },
      data(){
        return {
          wax:""
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
</style>
