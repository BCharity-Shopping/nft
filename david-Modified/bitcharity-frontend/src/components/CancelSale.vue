<template>
  <div>
    <b-button id="cancel-button" variant="danger" @click="cancelSale">Cancel Sale</b-button>
  </div>
</template>


<script>
import { bus } from '../event-bus.js';
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
        bus.$emit('signing')
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
          blocksBehind: this.getBlocksBehind,
          expireSeconds: this.getExpireSeconds
        })
        //console.log(this.result)
        //console.log(this.result.transaction_id)
        bus.$emit('createSuccess',this.result.transaction_id)
      }
      catch (e) {
        this.result = e
        //console.log(e)
        bus.$emit('createFailed',this.result)
      }
    },
  },
  computed: {
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
    ])
  }
}
</script>


<style scoped>
#cancel-button{
  margin-top: 10px;
}
</style>
