<template>
  <div class="login-block">
    <div class="login-button" v-if='userAccount==""'>
      <b-button @click="login">Login</b-button>
    </div>
    <div class="account-info" v-if='userAccount!=""'>
      <b-dropdown id="account-dropdown" :text="userAccount">
        <b-dropdown-item :to="{ name: 'Profile', params: { account_name:userAccount, tab:'inventory' }}">Inventory</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Profile', params: { account_name:userAccount, tab:'sales' }}">My Sales</b-dropdown-item>
        <b-dropdown-item>Notify Me</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>


<script>
import * as waxjs from "@waxio/waxjs/dist"
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      userAccount: "",
      pubKeys: "",
      wax: new waxjs.WaxJS('https://wax.greymass.com', null, null, false),
      result: "",
      userName: "",
      loginStatus: "User is not logged in",
      aid: 1099512463310n,
      marketName: "l5oaw.wam001"
    }
  },
  methods: {
    async login() {
      try {
        console.log("logging in through WCW")
        this.userAccount = await this.wax.login()
        this.pubKeys = this.wax.pubKeys
        this.userName = this.wax.userAccount
        this.loginStatus = `User has approved dApp access`
        this.$store.commit('storeWax', this.wax)
        this.$emit('logged-in')
      }
      catch (e) {
        console.log(e)
        this.loginStatus = `User denied dApp access`
      }
    },
    logout() {
      this.userAccount = "",
      this.pubKeys = "",
      this.wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false),
      this.userName = "",
      this.loginStatus = "User is not logged in"
      this.$store.commit('clearWax')
      this.$emit('logged-out')
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
.login-block {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login-button{
  font-weight: bold;
  color: #2c3e50;
}
</style>