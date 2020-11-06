<template>
  <div>
      <input v-model="sale_id" placeholder="Sale ID">
      <input v-model="asset_id" placeholder="Asset ID">
      <input v-model="price" placeholder="Listing Price">
      <b-button @click="createSale">Create Sale</b-button>
  </div>
</template>


<script>
export default {
  name: 'CreateSale',
  props: ['wax','saleID', 'assetID'],
  data() {
    return {
      sale_id: "",

      asset_id: "",
      price: "",
      settlement_symbol: "8,WAX",
      maker_marketplace: "l5oaw.wam",

      sender: this.wax.userAccount,
      recipient: "atomicmarket",
      recipient_asset_ids: [],
      memo: "sale"
    }
  },
  computed: {
    listing_price: function () {
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
  },
  methods: {
    async createSale() {
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
          },
          {
            account: 'atomicmarket',
            name: 'announcesale',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              seller: this.wax.userAccount,
              asset_ids: [Number(this.asset_id)],
              listing_price: this.listing_price + " WAX",
              settlement_symbol: this.settlement_symbol,
              maker_marketplace: this.maker_marketplace,
            },
          },
          {
            account: 'atomicassets',
            name: 'createoffer',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active',
            }],
            data: {
              sender: this.wax.userAccount,
              recipient: this.recipient,
              sender_asset_ids: [Number(this.asset_id)],
              recipient_asset_ids: this.recipient_asset_ids,
              memo: this.memo
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