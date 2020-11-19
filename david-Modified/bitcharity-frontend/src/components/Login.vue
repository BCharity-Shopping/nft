<template>
  <div class="login-button">
    <b-button @click="login">Login</b-button>
  </div>
</template>


<script>
import * as waxjs from "@waxio/waxjs/dist"
export default {
  name: 'Login',
  data() {
    return {
      wax: ""
    }
  },
  methods: {
    async login() {
      this.wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
      console.log("logging in through WCW")
      try {
        this.userAccount = await this.wax.login()
        this.$store.commit('storeWax', this.wax)
      }
      catch (e) {
        console.log(e)
      }
    },
  },
}
</script>