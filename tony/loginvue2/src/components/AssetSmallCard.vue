<template>
  <div>
    <ApolloQuery
    :query="require('../graphql/getAsset.gql')"
    :variables="{asset_id:asset_id}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-if="data.atomicassets_assets.length==1">
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
                <div v-if="asset.atomicassets_asset_mints!=null">
                  <p class="mint-num">#{{asset.atomicassets_asset_mints.template_mint}}</p>
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
                <ApolloQuery
                  :query="require('../graphql/getAssetBySale.gql')"
                  :variables="{asset_id:asset.asset_id, state:state1}"
                  >
                    <template v-slot="{ result: { loading, error, data } }">
                      <!-- Loading -->
                      <div v-if="loading" class="loading apollo">Loading...</div>

                      <!-- Error -->
                      <div v-else-if="error" class="error apollo">An error occurred</div>

                      <!-- Result -->
                      <div v-else-if="data" class="result apollo">
                        <div class="on-sale" v-if="data.atomicmarket_sales.length!=0">
                          On Sale
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
export default {
  name: 'AssetSmallCard',
  props: ['asset_id'],
  data () {
    return {
      ipfs: "http://ipfs.io/ipfs/",
      state1: 1
    }
  },
}
</script>

<style scoped>
.card {
  margin-bottom : 10px;
  width: 200px;
  height: 240px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  /*background-color: #666699;*/
  /*box-shadow: 0px 0px 10px 1px #262626;*/
  margin-top: 10px;
  color: grey;
  border-radius: 15px;
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
  max-width: 150px;
  height: 100%;
}

.asset-img {
  margin-top: 5%;
  margin-left: 5%;
  width: 150px;
  height: 150px;
}

.mint-num {
  margin-top: 5px;
  margin-left: 1px;
}

.on-sale {
  text-align: center;
  width: 100%;
  margin-left: 10px;
  color: white;
  background-color: green;
}
</style>