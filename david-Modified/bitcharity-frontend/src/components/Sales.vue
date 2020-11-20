<template>
  <div class="Sales">
      <router-link to="/MarketPlace">
        <div class="Breadcrumbs grey-color"><h2>Return to Market</h2></div>
      </router-link>
      <h1>Sale:#{{ id }}</h1>
    <div class="main-block w-100">
      <div class="row">
        <div class="grid text-center px-0 MobileCardDesign">
            <div class="picture-wrapper">
              <ApolloQuery :query="require('../graphQL/saleinfo.gql')" :variables="{id}">
                  <template v-slot="{ result: { data } }">
                    <div v-if="data">
                      <b-card class="large-card">
                        <p>Listing_Price:{{data.atomicmarket_sales[0].listing_price}}</p><p>{{data.atomicmarket_sales[0].listing_symbol}}</p>
                        <p>Seller: {{data.atomicmarket_sales[0].seller}}</p>
                        <p>OfferId:{{data.atomicmarket_sales[0].offer_id}}</p>
                        <p>Maximum Mint:{{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template.issued_supply}}</p>
                        <p>Collection Name: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_asset_data.collection_name}}</p>
                        <p>Schema Name: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_asset_data.schema_name}}</p>
                        <p>Template ID: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template.template_id}}</p>
                      </b-card>
                    </div>
                  </template>
                </ApolloQuery>

            </div>
        </div>
      </div>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
import router from '../router';
import axios from 'axios';
// Create the apollo client

export default {
    name: 'sales',
    data() {
      return {
        id: 0,
        exchangePriceUSD: undefined,
      };
    },
    async mounted() {
      axios.get('https://api.coingecko.com/api/v3/coins/wax?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
          .then((resp) => {
            this.exchangePriceUSD = resp.data.market_data.current_price.usd
          })
    },
    created() {
      this.id = this.$route.params.id;
    },
    methods: {
      navigate() {
        router.go(-1);
      },
    },
  }
</script>

<style>
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>