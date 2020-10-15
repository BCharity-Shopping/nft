<template>
  <button onclick="login()">Login</button>
</template>
<script>

export default {
  name: 'App',
  methods: {
    say() {
        alert(`Helo`)
    }
  }
}
//import * as waxjs from "@waxio/waxjs/dist";
//const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
// eslint-disable-next-line no-unused-vars
async function login() {
  console.log("test login");
} 

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
