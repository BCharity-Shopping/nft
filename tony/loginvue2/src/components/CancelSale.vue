<template>
  <div>
      <input v-model="sale_id" placeholder="Sale ID">
      <b-button @click="cancelSale">Cancel Sale</b-button>
  </div>
</template>


<script>
export default {
  name: 'CancelSale',
  props: ['wax','saleID'],
  data() {
    return {
      sale_id: ""
    }
  },
  methods: {
    async cancelSale() {
      if(!this.wax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.wax.api.transact({
          actions: [{
            account: 'atomicmarket',
            name: 'cancelsale',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              sale_id: [Number(this.sale_id)],
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