<template>
  <div>
    <p>{{ account_name }} Active Sales</p>
    <ApolloQuery
    :query="require('../graphql/getAccountSales.gql')"
    :variables="{seller:seller1, state:state1}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

          <div class="sales">
            <div v-for="sale in data.atomicmarket_sales" :key="sale.sale_id">
              <p>Sale #{{ sale.sale_id }}</p>
              <p>State #{{ sale.state }}</p>
              <p>Asset #{{ sale.atomicassets_offer.atomicassets_offers_assets[0].asset_id }}</p>
              <ApolloQuery
                :query="require('../graphql/getAsset.gql')"
                :variables="{asset_id:sale.atomicassets_offer.atomicassets_offers_assets[0].asset_id }"
                >
                  <template v-slot="{ result: { loading, error, data } }">
                    <!-- Loading -->
                    <div v-if="loading" class="loading apollo">Loading...</div>

                    <!-- Error -->
                    <div v-else-if="error" class="error apollo">An error occurred</div>

                    <!-- Result -->
                    <div v-else-if="data" class="result apollo">
                      {{ data }}
                      <div class="asset">
                        <div v-for="asset in data.atomicassets_assets" :key="asset.asset_id">
                          <p>{{ asset.asset_id }}</p>
                          <p>{{ asset.owner }}</p>
                        </div>
                      </div>
                    </div>
                    <!-- No result -->
                    <div v-else class="no-result apollo">No result :(</div>
                  </template>
                </ApolloQuery>
            </div>
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>

export default {
  name: 'ActiveSales',
  props: ['account_name'],
  data () {
    return {
      limit: 10,
      seller1: this.account_name,
      state1: 1,
      ipfs: "http://ipfs.io/ipfs/",
      aid: 762451
    }
  },
  
}
</script>

<style scoped>


</style>