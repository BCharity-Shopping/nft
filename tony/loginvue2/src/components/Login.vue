<template>
  <div class="login-block">
    <div class="login-button" v-if='userAccount==""'>
      <b-button @click="login">Login</b-button>
    </div>
    <div class="account-info" v-if='userAccount!=""'>
      <b-dropdown id="account-dropdown" :text="userAccount">
        <b-dropdown-item :to="{ name: 'Profile', params: { id:userAccount, tab:'inventory' }}">Inventory</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Profile', params: { id:userAccount, tab:'sales' }}">My Sales</b-dropdown-item>
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
  data() {
    return {
      userAccount: "",
      pubKeys: "",
      wax: new waxjs.WaxJS('https://wax.greymass.com', null, null, false),
      result: "",
      userName: "",
      loginStatus: "User is not logged in"
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
      }
      catch (e) {
        console.log(e)
        this.loginStatus = `User denied dApp access`
      }
    },
    async transact() {
      if(!this.wax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.wax.api.transact({
          actions: [{
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              from: this.wax.userAccount,
              receiver: this.wax.userAccount,
              stake_net_quantity: '0.00000001 WAX',
              stake_cpu_quantity: '0.00000000 WAX',
              transfer: false,
              memo: 'This is a WaxJS/Cloud Wallet Demo.'
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
      }
      catch (e) {
        this.result = e
        console.log(e)
      }
    },
    logout() {
      this.userAccount = "",
      this.pubKeys = "",
      this.wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false),
      this.userName = "",
      this.loginStatus = "User is not logged in"
    }
  }
}
</script>


<style>
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