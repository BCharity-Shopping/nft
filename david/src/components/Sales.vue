<template>
  <div class="Sales">
    <router-link to="/MarketPlace">
      <div class="Breadcrumbs grey-color"><h2>Return to Market</h2></div>
    </router-link>
    <h1>Sale:#{{ id }}</h1>
    <h1>{{ Sales }}</h1>
    <p>{{exchangePriceUSD}}</p>
    <router-view></router-view>
  </div>
</template>

<script>
import router from '../router';
import axios from "axios";
import gql from 'graphql-tag';

// Create the apollo client

export default {
    name: 'sales',
    apollo:{
      Sales: gql`query sales {
                                atomicmarket_sales :{
                                seller
                                sale_id state
                                settlement_symbol
                                }
                            }`
    },
    data() {
      return {
        id: 0,
        Sales: undefined,
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
      }
    },
  }
</script>

<style scoped>
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

