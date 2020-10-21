<template>
  <div class="login-block">
    <div class="buttons" v-if='userAccount==""'>
      <button @click="login">Login</button>
    </div>
    <div class="account-info" v-if='userAccount!=""'>
      <b-dropdown id="account-dropdown" :text="userAccount">
        <b-dropdown-item to="/profile">Inventory</b-dropdown-item>
        <b-dropdown-item>My Sales</b-dropdown-item>
        <b-dropdown-item>Notify Me</b-dropdown-item>
        <b-dropdown-item>Logout</b-dropdown-item>
      </b-dropdown>
      <p>Active: {{ pubKeys[0] }}</p>
      <p>Owner: {{ pubKeys[1] }}</p>
    </div>
    <div class="login-status">
      <p>Status: {{ loginStatus }}</p>
      <p>Result: {{ result }}</p>
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
</style>