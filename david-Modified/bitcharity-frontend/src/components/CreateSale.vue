<template>
  <div>
    <p class="heading">Listing Price</p>
    <input v-model="price" placeholder="Amount of Wax">
    <p class="heading">Fee Summary</p>
    <p>Collection Fee: {{ this.collectionFee * 100 }}%</p>
    <p>Maker Marketplace Fee: {{ this.makerMarketPlaceFee * 100 }}%</p>
    <p>Taker Marketplace Fee: {{ this.takerMarketPlaceFee * 100 }}%</p>
    <p>You will receive {{ this.amount }} WAX</p>
    <b-button id="confirm-button" variant="success" @click="emptyCheck">Confirm</b-button>
  </div>
</template>


<script>
import { bus } from '../event-bus.js';
import { mapGetters } from 'vuex'
export default {
  name: 'CreateSale',
  props: ['assetID', 'collectionFee'],
  data() {
    return {
      price: "",
      settlement_symbol: "8,WAX",
      maker_marketplace: "l5oaw.wam",
      recipient: "atomicmarket",
      recipient_asset_ids: [],
      memo: "sale",
      makerMarketPlaceFee: 0.01,
      takerMarketPlaceFee: 0.01
    }
  },
  computed: {
    listing_price: function () {
      if(this.price!=""){
        var p = this.price
        if(p.includes('.')){
          var decimals = p.split('.')[1].length
          for(var i=0; i<(8-decimals); i++){
            p = p + "0"
          }
        }
        else {
          p = p + ".00000000"
        }
        return p
      }
      else {
        return 0.00000000
      }
    },
    amount: function() {
      //console.log("price: " + this.price)
      if(this.price!=""){
        return (Number(this.price) * (1 - Number(this.collectionFee) - Number(this.makerMarketPlaceFee) - Number(this.takerMarketPlaceFee)))
      }
      else {
        return 0.00000000
      }
    },
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
    ])
  },
  methods: {
    emptyCheck() {
      if(this.price!=""){
        this.createSale()
      }
      else {
        window.alert("Please enter the listing price")
      }
    },
    async createSale() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicmarket',
            name: 'announcesale',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              seller: this.getWax.userAccount,
              asset_ids: [Number(this.assetID)],
              listing_price: this.listing_price + " WAX",
              settlement_symbol: this.settlement_symbol,
              maker_marketplace: this.maker_marketplace,
            },
          },
          {
            account: 'atomicassets',
            name: 'createoffer',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              sender: this.getWax.userAccount,
              recipient: this.recipient,
              sender_asset_ids: [Number(this.assetID)],
              recipient_asset_ids: this.recipient_asset_ids,
              memo: this.memo
            },
          }]
        }, {
          blocksBehind: this.getBlocksBehind,
          expireSeconds: this.getExpireSeconds
        })
        //console.log(this.result)
        bus.$emit('createSuccess',this.result.transaction_id)
      }
      catch (e) {
        this.result = e
        //console.log(e)
        bus.$emit('createFailed',this.result)
      }
    },
  },
}
</script>


<style scoped>
.heading {
  padding-top: 20px;
  font-size: 20px;
}
</style>
