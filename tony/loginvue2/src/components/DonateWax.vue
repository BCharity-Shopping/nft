<template>
  <div>
    <input v-model=donationAmount placeholder="Amount">
    WAX
    <b-button id="donate-button" variant="warning" @click="inputCheck">Donate</b-button>
    <hr>
    quantity: {{this.quantity}} WAX
    isNaN? {{isNaN(this.quantity)}}
  </div>
</template>


<script>
import * as waxjs from "@waxio/waxjs/dist"
import { bus } from '../event-bus.js';
import { mapGetters } from 'vuex'
export default {
  name: 'DonateWax',
  props: ['recipient','fundraiserID'],
  data () {
    return {
      donationAmount: ""
    }
  },
  computed: {
    quantity: function() {
      if(Number(this.donationAmount)<=0) {
        return "0.00000000"
      }
      else {
        var d = this.donationAmount
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
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
    ])
  },
  methods: {
    async inputCheck() {
      if(!(isNaN(this.quantity)) && !(isNaN(parseFloat(this.quantity)))) {
        if(this.getWax=="") {
          await this.login()
          await this.transfer()
        }
        else {
          await this.transfer()
        }
      }
      else {
        window.alert("Donation amount has to be a number")
      }
    },
    async transfer() {
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
              memo: "donation to fundraiser #" + this.fundraiserID,
              quantity: this.quantity + " WAX",
              to: this.recipient
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
}
</script>


<style scoped>
#cancel-button{
  margin-top: 10px;
}
</style>