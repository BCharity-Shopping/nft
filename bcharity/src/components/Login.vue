<template>
  <div class="login-block">
    <div class="login-button" v-if='userAccount==""'>
      {{ wax }}
      <b-button @click="login">Login</b-button>
    </div>
    <div class="account-info" v-if='userAccount!=""'>
      <b-dropdown id="account-dropdown" :text="userAccount">
        <b-dropdown-item :to="{ name: 'Profile', params: { id:userAccount, tab:'inventory' }}">Inventory</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'Profile', params: { id:userAccount, tab:'sales' }}">My Sales</b-dropdown-item>
        <b-dropdown-item>Notify Me</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
      <ApolloMutation
        :mutation="gql => gql`
          mutation regmarket ($userName: String!, $marketName: String!) {
            regmarket (creator: $userName, marketplace_name: $marketName) {
              transactionid
            }
          }
        `"
        :variables="{
          userName, marketName
        }"
        :context="{
          wax
        }"
        >
        <template v-slot="{ mutate, loading, error }">
        <button :disabled="loading" @click="mutate()">Click me</button>
        <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>
      <b-button @click="registerMarket">registermarket</b-button>
    </div>
      <b-button @click="regmarket">regmarket</b-button>
      <b-button @click="announcesale">announcesale</b-button>
      <b-button @click="createoffer">createoffer</b-button>
      <p>{{ aid }}</p>
  </div>
</template>


<script>
import gql from 'graphql-tag';
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
      loginStatus: "User is not logged in",
      aid: 1099512463310n,
      marketName: "l5oaw.wam001"
    }
  },
  methods: {
    
    registerMarket() {
      console.log("ehe")
      this.$apollo.mutate({
        mutation: gql`
          mutation ($userName: String!, $marketName: String!) {
            regmarket (creator: $userName, marketplace_name: $marketName) {
              transactionid
            }
          }
        `,
        variables: {
          userName: "l5oaw.wam", marketName: "l5oaw.wam001"
        },/*
        regmarket: async () => {
          console.log("sade")
          try {
            this.result = await this.wax.api.transact({
              actions: [{
                account: 'atomicmarket',
                name: 'regmarket',
                authorization: [{
                  actor: this.wax.userAccount,
                  permission: 'active',
                }],
                data: {
                  creator: this.wax.userAccount,
                  marketplace_name: "l5oawtestmkt",
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30
            })
            console.log(this.result)
          }
          catch (e) {
            this.result = e
            console.log(e)
          }
        }*/
      })
    }
    ,
    async login() {
      try {
        console.log("logging in through WCW")
        console.log("wax: " + this.wax)
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
    async regmarket() {
      if(!this.wax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.wax.api.transact({
          actions: [{
            account: 'atomicmarket',
            name: 'regmarket',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              creator: this.wax.userAccount,
              marketplace_name: "l5oawtestmkt",
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
        console.log(this.result)
      }
      catch (e) {
        this.result = e
        console.log(e)
      }
    },
    async announcesale() {
      if(!this.wax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.wax.api.transact({
          actions: [{
            account: 'atomicmarket',
            name: 'announcesale',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              seller: this.wax.userAccount,
              asset_ids: [1099512463310n],
              listing_price: "10.00000000 WAX",
              settlement_symbol: "8,WAX",
              maker_marketplace: this.wax.userAccount,
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
        console.log(this.result)
      }
      catch (e) {
        this.result = e
        console.log(e)
      }
    },
    async createoffer() {
      if(!this.wax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.wax.api.transact({
          actions: [{
            account: 'atomicassets',
            name: 'createoffer',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              sender: this.wax.userAccount,
              recipient: "atomicmarket",
              sender_asset_ids: [1099512463310n],
              recipient_asset_ids: [],
              memo: "sale"
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
        console.log(this.result)
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