<template>
  <div class="login-block">
    <div class="login-button" v-if='userAccount==""'>
      <button @click="login">Login</button>
    </div>
    <div class="login-username" v-else>
      <p>{{ userName }}</p>
      <p>Active: {{ pubKeys[0] }}</p>
      <p>Owner: {{ pubKeys[1] }}</p>
      <button @click="transact">Transaction</button>
      <button @click="creatMarket">create market </button>
    </div>
    <div class="login-status">
      <p>Status: {{ loginStatus }}</p>
    </div>
  </div>
</template>

<script>
import * as waxjs from "@waxio/waxjs/dist"
import Eos from 'eosjs'
export default{
  config:{
    httpEndpoint:"https://chain.wax.io",
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'],
    broadcast: true,
    verbose:false,
    sign: true

  };
  name: 'App',
  data(){
    return {
      userAccount: "",
      pubKeys:"",
      wax: new waxjs.WaxJS('https://wax.greymass.com', null, null, false),
      result: "",
      userName: "",
      loginStatus: "User is not logged in"
    }
  },
  methods: {
    say() {
      alert(`Helo`)
    },
    async login() {
      try {
        console.log("logging in through WCW")
        this.userAccount = await this.wax.login()
        this.pubKeys = this.wax.pubKeys
        this.userName = this.wax.userAccount
        this.loginStatus = `User has approved dApp access`
      }
      catch (e) {
        this.loginStatus = `User denied dApp access`
      }
    },
    async transact() {
      try {
        this.result = await this.wax.api.transact(
            {
              actions: [{
                account: 'eosio',
                name: 'delegatebw',
                authorization: [{
                  actor: this.wax.userAccount,
                  permission: 'active'
                }],
                data: {
                  from: this.wax.userAccount,
                  receiver: this.wax.userAccount,
                  stake_net_quantity: '0.00000001 WAX',
                  stake_cpu_quantity: '0.00000000 WAX',
                  transfer: false,
                  memo: 'This is a WaxJS/Cloud Wallet Demo.'
                }
              }]
            },
            {
              blocksBehind: 3,
              expireSeconds: 30
            }
        )
        console.log("transact")
      }
      catch (e) {
        console.log(e)
      }
    },
    async creatMarket() {
      if(!this.wax.api){
        return console.log("login is required");
      }
      try {
        console.log(this.wax.userAccount);
        this.result = await this.wax.api.transact(
            {
              actions: [{
                account: "atomicmarket",
                name: 'regmarket',
                authorization: [{
                  actor: this.wax.userAccount,
                  permission: 'active'
                }],
                data: {
                  creator: "dt5qw.wam",
                  marketplace_name: "BCharity"
                }
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30
            })
            console.log(this.result);}
      catch (e) {
        console.log(e)
      }
    }
  }
}

</script>

<style scoped>

</style>