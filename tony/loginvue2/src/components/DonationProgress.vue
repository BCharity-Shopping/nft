<template>
  <div>
    <b-progress :value="donationTotal" :max="listingPrice"></b-progress>
    <b>{{donationTotal}}</b> WAX raised of {{listing_price/100000000}} WAX Goal
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'DonationProgress',
  props: ['account_name','sale_id','listing_price'],
  data () {
    return {
      baseMemo: "donation to fundraiser #",
      result: "",
      baseURL: "https://wax.pink.gg/v2/history/get_actions?",
      a: 5,
      b: 10,
    }
  },
  mounted () {
    //console.log("API URL: " + this.url)
    axios
      .get(this.url)
      .then(response => (this.result = response))
  },
  computed: {
    url: function() {
      return this.baseURL + "account=" + this.account_name + "&act.name=transfer&act.account=eosio.token"
    },
    donationTotal: function() {
      if(this.result=="") {
        return 0
      }
      else {
        let actions = this.result.data.actions
        let total = 0
        for(var i = 0; i<actions.length; i++) {
          if(this.memo == actions[i].act.data.memo) {
            total = total + Number(actions[i].act.data.amount)
          }
        }
        return total
      }
    },
    memo: function() {
      return this.baseMemo + this.sale_id
    },
    listingPrice: function() {
      return this.listing_price/100000000
    }
  }
}
</script>