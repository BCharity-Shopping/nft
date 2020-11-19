<template>
  <div class="fundraiser">
     <h1>Fundraiser #{{ $route.params.fundraiser_id }}</h1>
     <ApolloQuery
    :query="require('../graphQL/getFundraiser.gql')"
    :variables="{fundraiser_id:$route.params.fundraiser_id}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div class="images">
            <div class="asset-img" v-if="data.atomicmarket_sales[0].
              atomicassets_offer.
              atomicassets_offers_assets[0].
              atomicassets_asset.
              atomicassets_template!=null">
              <div class="asset-img-2" v-if="data.atomicmarket_sales[0].
                atomicassets_offer.
                atomicassets_offers_assets[0].
                atomicassets_asset.
                atomicassets_template.
                immutable_data.img!=null">
                <img v-bind:src="ipfs + data.atomicmarket_sales[0].
                  atomicassets_offer.
                  atomicassets_offers_assets[0].
                  atomicassets_asset.
                  atomicassets_template.
                  immutable_data.img" width="100%" height="100%">
              </div>
            </div>
            <div class="asset-img" v-else-if="data.atomicmarket_sales[0].
              atomicassets_offer.
              atomicassets_offers_assets[0].
              atomicassets_asset.
              immutable_data!=null">
              <div class="asset-img-2" v-if="data.atomicmarket_sales[0].
                atomicassets_offer.
                atomicassets_offers_assets.
                atomicassets_asset.
                immutable_data.img!=null">
                <img v-bind:src="ipfs + data.atomicmarket_sales[0].
                  atomicassets_offer.
                  atomicassets_offers_assets.
                  atomicassets_asset.
                  immutable_data.img" width="100%" height="100%">
              </div>
            </div>
          </div>

          <div class="info">
            {{data.atomicmarket_sales[0]}}
            <DonationProgress :account_name="data.atomicmarket_sales[0].seller" :sale_id="data.atomicmarket_sales[0].sale_id" :listing_price="data.atomicmarket_sales[0].listing_price"/>
            <DonateWax :recipient="data.atomicmarket_sales[0].seller" :fundraiserID="$route.params.fundraiser_id"/>
          </div>
          
          

        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import DonationProgress from '@/components/DonationProgress.vue'
import DonateWax from '@/components/DonateWax.vue'
export default {
  name: 'Fundraiser',
  components: {
    DonateWax,
    DonationProgress,
  },
  data () {
    return {
      ipfs: "http://ipfs.io/ipfs/",
    }
  },
}
</script>

<style scoped>
.fundraiser {
  margin-left: 15%;
  max-width: 70%;
  color: grey;
  background-color: #fafafa;
}
.result {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.images {
  width: 35%;
  height: 500px;
  background-color: #d6d6d6;
  border-radius: 15px;
}
.info {
  width: 60%;
  height: 500px;
}
</style>