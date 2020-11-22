<template>
  <div class="fundraiser">
    <ApolloQuery
    :query="require('../graphql/getFundraiser.gql')"
    :variables="{fundraiser_id:$route.params.fundraiser_id}"
    fetchPolicy="network-only"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-if="data.atomicmarket_sales.length==0">
            <h1>Campaign #{{ $route.params.fundraiser_id }} doesn't exist</h1>
            <hr>
          </div>
          <div v-else>
            <h1 class="asset-name" v-if="data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template!=null">
              {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template.immutable_data.name}}
            </h1>
            <h1 class="asset-name" v-else>
              {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.immutable_data.name}}
            </h1>
            <hr>
            <div class="show-fundraiser">
              <div class="images">
                <ImageDisplay :data="data"/>
              </div>

              <div class="info" scroll="no">
                <DonationProgress :account_name="data.atomicmarket_sales[0].seller" :sale_id="data.atomicmarket_sales[0].sale_id" :listing_price="data.atomicmarket_sales[0].listing_price"/>
                <DonateWax :recipient="data.atomicmarket_sales[0].seller" :fundraiserID="$route.params.fundraiser_id"/>
                <DonateFullAmount :saleID="$route.params.fundraiser_id" :salePrice="data.atomicmarket_sales[0].listing_price"/>
              </div>
              <div class="immutable-data">
                Immutable Attributes
                <AttributeData :immutable_data="data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.immutable_data"/>
                <AttributeData v-if="data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template!=null" 
                  :immutable_data="data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template.immutable_data"/>
              </div>
              <div class="mutable-data">
                Updates
                <AttributeData :immutable_data="data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.mutable_data"/>
              </div>
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
import DonationProgress from '@/components/DonationProgress.vue'
import DonateWax from '@/components/DonateWax.vue'
import DonateFullAmount from '@/components/DonateFullAmount.vue'
import AttributeData from '@/components/AttributeData.vue'
import ImageDisplay from '@/components/ImageDisplay.vue'
export default {
  name: 'Donation',
  components: {
    DonateWax,
    DonationProgress,
    DonateFullAmount,
    AttributeData,
    ImageDisplay,
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
  margin-left: 20%;
  max-width: 60%;
  color: grey;
}

.show-fundraiser {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.images {
  align-items: center;
  width: 60%;
  height: 500px;
  min-width: 600px;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px 1px #aaa9a9;
  margin-top: 15px;
  margin-bottom: 15px;
}

.info {
  padding: 20px;
  width: 30%;
  min-width: 400px;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px 1px #aaa9a9;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 15px;
}

.immutable-data {
  padding: 10px;
  width: 60%;
  min-width: 500px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px 1px #aaa9a9;
  margin-top: 15px;
  margin-bottom: 15px;
}

.mutable-data {
  padding: 10px;
  width: 60%;
  min-width: 500px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px 1px #aaa9a9;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>