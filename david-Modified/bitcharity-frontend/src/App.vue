<template>
   <div id="app">
    <Navbar />
     <router-view></router-view>
    <Login />
   </div>
</template>
<script>
  import Navbar from './components/Navbar'
  import Login from './components/Login'
  export default {
      name: "App",
      components: {
        Navbar,
        Login,
      },
      data(){
        return {
          wax:""
        }
      },
      methods: {
        setWax: function() {
          this.wax=this.$store.getters.getWax
        },
        clearWax: function(){
          this.wax=""
        }
      }
    }

</script>

<style>
</style>
