<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a class="navbar-brand">BitCharity</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link to="/MarketPlace">Market Place</router-link> 
            <li class="nav-item">
              <router-link to="/trading">trading</router-link> 
            </li>
             <li class="nav-item">
              <router-link to="/NFT">NFT Creator</router-link> 
            </li>
            <li class="nav-item">
            <div v-if='this.getWax==""'>
                  <Login/>
            </div>
            <div v-else>
                <AccountDropdown/>
            </div>
          </li>
          </ul>
        </div>
      </nav>
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
.navbar-nav > li{
  padding-left:30px;
  padding-right:30px;
}
.li{
  color:white;
}
body {
  background-color: azure;
}
</style>
