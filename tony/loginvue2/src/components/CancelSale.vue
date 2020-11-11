<template>
  <div>
    <b-button id="cancel-button" @click="cancelSale">Cancel Sale</b-button>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CancelSale',
  props: ['saleID'],
  methods: {
    async cancelSale() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicmarket',
            name: 'cancelsale',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              sale_id: [Number(this.saleID)],
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
        console.log(this.result)
        console.log(this.result.transaction_id)
      }
      catch (e) {
        this.result = e
        console.log(e)
      }
    },
  },
  computed: {
    ...mapGetters([
      'getWax'
    ])
  }
}
</script>


<style scoped>
#cancel-button{
  background-color: red;
  margin-top: 10px;
  box-shadow: 0px 0px 1px 1px #262626;
}
</style>