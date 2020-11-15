<template>
   <div id="app">
    <Navbar />
     <router-view></router-view>
     <Login />
   </div>
</template>
<script>
  import Navbar from './components/Navbar.vue'
  import Login from './components/Login'
  export default {
      name: "App",
      components: {
        Navbar,
        Login
      }
    }

</script>

<style>
</style>
