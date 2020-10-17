<template>
  <div id="app">
    <Login/>
  </div>
</template>
<script>

import Login from "./components/Login";

export default {
  name: "App",
  components: { Login }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-top: 20px;
}
</style>
