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
            <h1>Fundraiser #{{ $route.params.fundraiser_id }} doesn't exist</h1>
            <hr>
          </div>
          <div v-else>
            <h1>Fundraiser #{{ $route.params.fundraiser_id }}</h1>
            <hr>
            <div class="show-fundraiser">
              <div class="images">
                <div class="asset-img" v-if="data.atomicmarket_sales[0].
                  atomicassets_offer.
                  atomicassets_offers_assets[0].
                  atomicassets_asset.
                  atomicassets_template!=null
                  && data.atomicmarket_sales[0].
                  atomicassets_offer.
                  atomicassets_offers_assets[0].
                  atomicassets_asset.
                  atomicassets_template.
                  immutable_data.img!=null">
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
                  immutable_data!=null
                  && data.atomicmarket_sales[0].
                  atomicassets_offer.
                  atomicassets_offers_assets[0].
                  atomicassets_asset.
                  immutable_data.img!=null">
                  <div class="asset-img-2" v-if="data.atomicmarket_sales[0].
                    atomicassets_offer.
                    atomicassets_offers_assets[0].
                    atomicassets_asset.
                    immutable_data.img!=null">
                    <img v-bind:src="ipfs + data.atomicmarket_sales[0].
                      atomicassets_offer.
                      atomicassets_offers_assets[0].
                      atomicassets_asset.
                      immutable_data.img" width="100%" height="100%">
                  </div>
                </div>
                <div class="asset-img" v-else/>
              </div>

              <div class="info">
                <div class="asset-name" v-if="data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template!=null">
                  Asset Name: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.atomicassets_template.immutable_data.name}}
                </div>
                <div class="asset-name" v-else>
                  Asset Name: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.immutable_data.name}}
                </div>
                <div class="asset-id">
                  Asset ID: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.asset_id}}
                </div>
                <div class="owner">
                  Owner: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.owner}}
                </div>
                <div class="collection-name">
                  Collection Name: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.collection_name}}
                </div>
                <div class="schema-name">
                  Schema Name: {{data.atomicmarket_sales[0].atomicassets_offer.atomicassets_offers_assets[0].atomicassets_asset.schema_name}}
                </div>
                <DonationProgress :account_name="data.atomicmarket_sales[0].seller" :sale_id="data.atomicmarket_sales[0].sale_id" :listing_price="data.atomicmarket_sales[0].listing_price"/>
                <DonateWax :recipient="data.atomicmarket_sales[0].seller" :fundraiserID="$route.params.fundraiser_id"/>
                <DonateFullAmount :saleID="$route.params.fundraiser_id" :salePrice="data.atomicmarket_sales[0].listing_price"/>
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
export default {
  name: 'Fundraiser',
  components: {
    DonateWax,
    DonationProgress,
    DonateFullAmount,
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

.show-fundraiser {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.images {
  justify-items: center;
  width: 400px;
  height: 400px;
  background-color: #d6d6d6;
  border-radius: 15px;
}

.asset-img {
  width: 80%;
  height: 80%
}

.asset-img2 {
  width: 100%;
  height: 100%
}

.info {
  width: 60%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>