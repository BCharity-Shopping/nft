<template>
  <div>
    <ApolloQuery
    :query="require('../graphql/getAccountInventory.gql')"
    :variables="{owner}"
    fetchPolicy="network-only"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

          <div class="inventory">
            <div v-for="asset in data.atomicassets_assets" :key="asset.asset_id">
              <div class="card">
                <div class="asset-img" v-if="asset.atomicassets_template!=null && asset.atomicassets_template.immutable_data.img!=null">
                  <div class="asset-img-2" v-if="asset.atomicassets_template.immutable_data.img!=null">
                    <img v-bind:src="ipfs + asset.atomicassets_template.immutable_data.img" width="100%" height="100%">
                  </div>
                </div>
                <div class="asset-img" v-else-if="asset.immutable_data!=null && asset.immutable_data.img!=null">
                  <div class="asset-img-2" v-if="asset.immutable_data.img!=null">
                    <img v-bind:src="ipfs + asset.immutable_data.img" width="100%" height="100%">
                  </div>
                </div>
                <div class="asset-img" v-else/>
                <div class="mint-num" v-if="asset.atomicassets_asset_mints!=null">
                  #{{asset.atomicassets_asset_mints.template_mint}}
                </div>
                <div class="col-name">
                  {{asset.collection_name}}
                </div>
                <div class="asset-name" v-if="asset.atomicassets_template!=null">
                  {{asset.atomicassets_template.immutable_data.name}}
                </div>
                <div class="asset-name" v-else-if="asset.immutable_data.name!=null">
                  {{asset.immutable_data.name}}
                </div>
                <div class="asset-name" v-else>
                  #{{asset.asset_id}}
                </div>
                <div class="owner-name">
                  {{asset.owner}}
                </div>
                <b-button class="button-details" variant="info" :to="`/explorer/asset/${asset.asset_id}`">Details</b-button>
                <b-dropdown class="button-more" text="More">
                  <b-dropdown-item>Transfer</b-dropdown-item>
                  <b-dropdown-item>Create Link</b-dropdown-item>
                  <b-dropdown-item>New Trade</b-dropdown-item>
                  <b-dropdown-item>Back Token</b-dropdown-item>
                  <b-dropdown-item>Burn</b-dropdown-item>
                </b-dropdown>
                <ApolloQuery
                  :query="require('../graphql/getAssetBySale.gql')"
                  :variables="{asset_id:asset.asset_id, state:state1}"
                  fetchPolicy="network-only"
                  >
                    <template v-slot="{ result: { loading, error, data } }">
                      <!-- Loading -->
                      <div v-if="loading" class="loading apollo">Loading...</div>

                      <!-- Error -->
                      <div v-else-if="error" class="error apollo">An error occurred</div>

                      <!-- Result -->
                      <div v-else-if="data" class="result apollo">

                        <div class="sales">
                          <div v-if="data.atomicmarket_sales.length== 0">
                            <CreateSaleModal :assetID="asset.asset_id" :collectionFee="asset.atomicassets_collection.market_fee"/>
                          </div>
                          <div v-else>
                            <CancelSale :saleID="data.atomicmarket_sales[0].sale_id"/>
                          </div>
                        </div>
                      </div>
                    </template>
                </ApolloQuery>
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
import CreateSaleModal from '@/components/CreateSaleModal.vue'
import CancelSale from '@/components/CancelSale.vue'

export default {
  name: 'Inventory',
  props: ['account_name'],
  components: {
    CreateSaleModal,
    CancelSale,
  },
  data () {
    return {
      limit: 10,
      owner: this.account_name,
      ipfs: "http://ipfs.io/ipfs/",
      state1: 1
    }
  },
}
</script>

<style scoped>
.card {
  margin-bottom : 10px;
  width: 250px;
  height: 400px;
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

.inventory {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.button-details {
  margin-top: 3%;
  width: 40%;
  height: 10%;
  border-width: 2px;
}

.button-more {
  margin-top: 3%;
  width: 40%;
  height: 10%;
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

.owner-name {
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
  height: 53%;
}

</style>