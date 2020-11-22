<template>
  <div>
    Fully support this cause by donating the fundraiser goal amount.
    <br>
    <br>
    <b-button id="buy-button" variant="warning" @click="inputCheck">Donate Full Amount</b-button>
  </div>
</template>


<script>
import * as waxjs from "@waxio/waxjs/dist"
import { bus } from '../event-bus.js';
import { mapGetters } from 'vuex'
export default {
  name: 'DonateFullAmount',
  props: ['saleID','salePrice'],
  methods: {
    async inputCheck() {
      if(this.getWax=="") {
        await this.login()
        await this.purchaseSale()
      }
      else {
        await this.purchaseSale()
      }
    },
    async purchaseSale() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              from: this.getWax.userAccount,
              to: "atomicmarket",
              quantity: this.quantity + " WAX",
              memo: "deposit"
            },
          },{
            account: 'atomicmarket',
            name: 'purchasesale',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              buyer: this.getWax.userAccount,
              sale_id: Number(this.saleID),
              intended_delphi_median: 0,
              taker_marketplace: this.getTakerMarketplace
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
    async login() {
      var wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
      console.log("logging in through WCW")
      try {
        this.userAccount = await wax.login()
        this.$store.commit('storeWax', wax)
      }
      catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
      'getTakerMarketplace',
    ]),
    quantity: function() {
      if(Number(this.salePrice)<=0) {
        return "0.00000000"
      }
      else {
        var d = String(this.salePrice/100000000)
        if(d.includes('.')){
          var decimals = d.split('.')[1].length
          if(decimals>8) {
            return +(Number(d).toFixed(8))
          }
          else {
            for (var i=0; i<(8-decimals); i++) {
              d = d + "0"
            }
            return d
          }
        }
        else {
          return d + ".00000000"
        }
      }
    },
  }
}
</script>


<style scoped>
#cancel-button{
  margin-top: 10px;
}
</style>