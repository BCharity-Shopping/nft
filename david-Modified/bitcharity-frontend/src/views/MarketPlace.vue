<template>
  <div class="main-block w-100">
    <div class="row">
        <div class="grid text-center px-0 MobileCardDesign">
          <div v-for="item in list" :key="item.asset_id">
            <div class="large-card">
              <div class="picture-wrapper">
                <b-card>
                  <div v-if="containsCharacter(item.assets[0].data.img)==true">
                    <b-card-img v-bind:src="item.assets[0].data.img" style="height: 150px">
                    </b-card-img>
                  </div>
                  <div v-else>
                  <b-card-img v-bind:src="'https://ipfs.io/ipfs/'+item.assets[0].data.img" style="height: 150px">
                  </b-card-img>
                  </div>
                </b-card>
                <b-card-text>
                  <p>{{item.assets[0].template_mint}}</p>
                  <p>{{item.assets[0].collection.collection_name}}</p>
                  <p>{{ waxPriceFormat(item.price.amount,item.price.token_precision) }}.00{{item.price.token_symbol}}&nbsp;&nbsp;(${{wasPriceUSDollarConversion(item.price.amount,item.price.token_precision, exchangePriceUSD)}})</p>
                  <p style="white-space: nowrap;overflow: hidden; text-overflow:ellipsis">{{item.assets[0].name}}</p>
                  <button class="btn btn-primary" @click="jump(item.sale_id)">Details</button>&nbsp;&nbsp;
                  <button class="btn btn-primary" @click="purchase(item)">Buy</button>
                </b-card-text>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 1rem;
}
.main-block {
  padding: 35px 49px 33.5px 51px;
}

.large-card {
  width: 180px;
  border-radius: 20px;
  box-shadow: 0 3px 20px rgba(0,0,0,.4);
  display: inline-block;
  height: fit-content;
  margin: 15px 10px;
  padding: 0;
  position: relative;
  text-align: left;
  text-align: initial;

}

.large-card .content-wrapper {
  background-color: #1a203c;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  position: relative;
}


.large-card .picture-wrapper {
  padding: 20px 10px;
  border-top-left-radius: 40px;
  border-top-right-radius:40px;
  position: relative;
}


*, :after, :before {
  box-sizing: border-box;
}

</style>

<script>
import Vue from 'vue'
import { BootstrapVue,IconsPlugin } from 'bootstrap-vue'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { mapGetters } from 'vuex';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  name:"marketplace",
  components:{
  },
  data(){
    return {
      list:undefined,
      exchangePriceUSD:undefined,
    }
  },
  mounted(){
    axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales').then((resp)=>{
          this.list=resp.data.data;
          console.log(this.list)
    })
    axios.get('https://api.coingecko.com/api/v3/coins/wax?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
        .then((resp)=>{
          this.exchangePriceUSD=resp.data.market_data.current_price.usd
        })
  },

  methods: {
    containsCharacter:function(x) {
      if (x.includes("https")) {
        return true;
      } else {
        return false;
      }
    },
    jump:function (x){
      this.$emit('sistersaid','Mom said do your home work')
      this.$router.push({path:x})

    },
    waxPriceFormat:function(waxPrice,token_precision){
      var PriceSplit=waxPrice.substring(0,waxPrice.length-token_precision)
      return PriceSplit;
    },
    wasPriceUSDollarConversion:function(waxPrice,token_precision,exchangeRate){
      var PriceSplit=parseInt(waxPrice.substring(0,waxPrice.length-token_precision));
      console.log(exchangeRate);
      var usDollar=(PriceSplit*exchangeRate).toFixed(2);
      return usDollar;
    },
    async purchase(item){
      if(item.taker_marketplace==null){
        item.taker_marketplace=""
      }
      console.log(item);
      console.log(this.getWax.userAccount);
      console.log(item.market_contract);
      console.log(item.sale_id);
      console.log(item.taker_marketplace);
      console.log("memo : deposit");
      console.log("precision is "+item.price.token_precision);
      var newPrice = Number.parseFloat(this.waxPriceFormat(item.price.amount,item.price.token_precision)).toFixed(item.price.token_precision)+" WAX";
      console.log(newPrice);

       if(!this.getWax.api){
               return console.log("Need to login first")
           }
           try {
               this.result=await this.getWax.api.transact({
                   actions:[{
                    account: "eosio.token",
                    name: "transfer",
                    authorization: [{
                        actor: this.getWax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        from:this.getWax.userAccount,
                        memo:'deposit',
                        quantity:newPrice,
                        to:'atomicmarket',
                       },},{
                        account: 'atomicmarket',
                        name: 'purchasesale',
                        authorization: [{
                          actor: this.getWax.userAccount,
                          permission:'active',
                        }],
                        data: {
                          buyer:this.getWax.userAccount,
                          intended_delphi_median:0,
                          sale_id:item.sale_id,
                          taker_marketplace:item.taker_marketplace,
                      },
                    }]
                   
                   
               },{
                   blocksBehind: 3,
                   expireSeconds: 30
               });
           }
           catch(e){
               this.result=e
               console.log(e)
           }  

    }
  },
  computed:{
    ...mapGetters([
        'getWax'
      ]),
    },
  watch: {
    '$route' () {
      this.$router.go(0);
    }
  },




}
</script>
