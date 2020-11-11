<template>
  <div :key="aqKey">
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
                      <div class="asset">
                        <div v-for="asset in data.atomicassets_assets" :key="asset.asset_id">
                          <div class="card">
                            <div class="asset-img" v-if="asset.atomicassets_template!=null">
                              <div class="asset-img-2" v-if="asset.atomicassets_template.immutable_data.img!=null">
                                <img v-bind:src="ipfs + asset.atomicassets_template.immutable_data.img" width="100%" height="100%">
                              </div>
                            </div>
                            <div class="asset-img" v-else-if="asset.immutable_data!=null">
                              <div class="asset-img-2" v-if="asset.immutable_data.img!=null">
                                <img v-bind:src="ipfs + asset.immutable_data.img" width="100%" height="100%">
                              </div>
                            </div>
                            <div class="mint-num" v-if="asset.atomicassets_asset_mints!=null">
                              #{{asset.atomicassets_asset_mints.template_mint}}
                            </div>
                            <div class="col-name">
                              {{asset.collection_name}}
                            </div>
                            <div class="asset-name" v-if="asset.atomicassets_template!=null">
                              {{asset.atomicassets_template.immutable_data.name}}
                            </div>
                            <div class="asset-name" v-else>
                              {{asset.immutable_data.name}}
                            </div>
                            <div class="sale-price">
                              {{sale.listing_price/100000000}} WAX
                            </div>
                            <div class="detail-edit">
                            <b-button class="button-details" :to="`/market/sale/${sale.sale_id}`">Details</b-button>
                            <EditSaleModal 
                              :listingPrice="sale.listing_price/(Math.pow(10,sale.atomicmarket_token.token_precision))" 
                              :saleID="sale.sale_id" 
                              :assetID="sale.atomicassets_offer.atomicassets_offers_assets[0].asset_id" 
                              :collectionFee="sale.collection_fee"/>
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
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    
  </div>
</template>

<script>
import EditSaleModal from '@/components/EditSaleModal.vue'

export default {
  name: 'ActiveSales',
  props: ['account_name'],
  components: {
    EditSaleModal,
  },
  data () {
    return {
      limit: 10,
      seller1: this.account_name,
      state1: 1,
      ipfs: "http://ipfs.io/ipfs/",
      saleID: "",
      price: "",
      tokenPrecision: "",
      assetID: "",
      collectionFee: "",
      aqKey: 0,
    }
  },
  methods: {
    reload() {
      this.aqKey += 1
      console.log("edit reload")
    }
  },
  computed: {
    listingPrice: function () {
      if(this.price!="") {
        return this.price
      }
      else {
        return 0
      }
    }
  }
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
  background-color: #ff8000;
  box-shadow: 0px 0px 1px 1px #262626;
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
  width: 100;
  height: 60%;
}

#cancel-button {
  background-color: red;
}

#confirm-button {
  background-color: orange;
}

</style>