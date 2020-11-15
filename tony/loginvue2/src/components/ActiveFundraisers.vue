<template>
  <div class="active-events">
    <ApolloQuery
    :query="require('../graphql/getFundraisers.gql')"
    :variables="{maker_marketplace:market_place, state:state, limit:limit}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

          <div class="sales">
            <div v-for="event in data.atomicmarket_sales" :key="event.sale_id">
              <div v-if="event.
                  atomicassets_offer.
                  atomicassets_offers_assets.length==1">
                <div class="card">
                  <div class="asset-img" v-if="event.
                    atomicassets_offer.
                    atomicassets_offers_assets[0].
                    atomicassets_asset.
                    atomicassets_template!=null">
                    <div class="asset-img-2" v-if="event.
                      atomicassets_offer.
                      atomicassets_offers_assets[0].
                      atomicassets_asset.
                      atomicassets_template.
                      immutable_data.img!=null">
                      <img v-bind:src="ipfs + event.
                        atomicassets_offer.
                        atomicassets_offers_assets[0].
                        atomicassets_asset.
                        atomicassets_template.
                        immutable_data.img" width="100%" height="100%">
                    </div>
                  </div>
                  <div class="asset-img" v-else-if="event.
                    atomicassets_offer.
                    atomicassets_offers_assets[0].
                    atomicassets_asset.
                    immutable_data!=null">
                    <div class="asset-img-2" v-if="event.
                      atomicassets_offer.
                      atomicassets_offers_assets.
                      atomicassets_asset.
                      immutable_data.img!=null">
                      <img v-bind:src="ipfs + event.
                        atomicassets_offer.
                        atomicassets_offers_assets.
                        atomicassets_asset.
                        immutable_data.img" width="100%" height="100%">
                    </div>
                  </div>
                  <div class="mint-num" v-if="event.
                      atomicassets_offer.
                      atomicassets_offers_assets[0].
                      atomicassets_asset.
                      atomicassets_asset_mints!=null">
                    #{{event.
                      atomicassets_offer.
                      atomicassets_offers_assets[0].
                      atomicassets_asset.
                      atomicassets_asset_mints.template_mint}}
                  </div>
                  <div class="col-name">
                    {{event.collection_name}}
                  </div>
                  <div class="asset-name" v-if="event.
                    atomicassets_offer.
                    atomicassets_offers_assets[0].
                    atomicassets_asset.
                    atomicassets_template!=null">
                    {{event.
                    atomicassets_offer.
                    atomicassets_offers_assets[0].
                    atomicassets_asset.
                    atomicassets_template.
                    immutable_data.name}}
                  </div>
                  <div class="asset-name" v-else>
                    {{event.
                    atomicassets_offer.
                    atomicassets_offers_assets[0].
                    atomicassets_asset.
                    immutable_data.name}}
                  </div>
                  <div class="sale-price">
                  </div>
                  <DonationProgress :account_name="event.seller" :sale_id="event.sale_id" :listing_price="event.listing_price"/>
                  <b-button class="button-details" variant="info" :to="`/fundraisers/${event.sale_id}`">Details</b-button>
                </div>
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
export default {
  name: 'ActiveFundraisers',
  components: {
    DonationProgress
  },
  data () {
    return {
      limit: 10,
      market_place: "l5oaw.wam",
      state: 1,
      ipfs: "http://ipfs.io/ipfs/",
    }
  },
  computed: {
    listingPrice: function() {
      if(this.price!="") {
        return this.price
      }
      else {
        return 0
      }
    },
    seller2: function() {
      return this.seller1
    }
  },
}
</script>

<style scoped>
.card {
  margin-bottom : 10px;
  width: 250px;
  height: 360px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
  /*background-color: #666699;*/
  box-shadow: 0px 0px 10px 1px #262626;
  margin-top: 10px;
  color: grey;
  border-radius: 15px;
}

.sales {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.button-details {
  margin-top: 10px;
  width: 90px;
  height: 40px;
  border-width: 2px;
}

.detail-edit {
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.col-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.asset-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.sale-price {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.asset-img-2 {
  width: 100rem;
  max-width: 200px;
  height: 200px;
}

.asset-img {
  margin-top: 3%;
  width: 200px;
  height: 58%;
}

#cancel-button {
  background-color: red;
}

#confirm-button {
  background-color: orange;
}
</style>