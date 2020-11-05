<template>
  <div>
      <input v-model="creator" placeholder="Creator">
      <input v-model="marketplace_name" placeholder="Market Place Name">
      <b-button @click="regmarket">Register Market</b-button>
  </div>
</template>


<script>
export default {
  name: 'RegisterMarket',
  props: ['wax'],
  data() {
    return {
      creator: "",
      marketplace_name: ""
    }
  },
  methods: {
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
              creator: this.creator,
              marketplace_name: this.marketplace_name,
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