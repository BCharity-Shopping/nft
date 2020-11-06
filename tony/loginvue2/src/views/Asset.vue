<template>
  <div class="asset">
    <h1>Asset Page of {{ $route.params.asset_id }}</h1>
    <ApolloQuery
    :query="require('../graphql/getAsset.gql')"
    :variables="{ asset_id: $route.params.asset_id}"
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
              <div class="mint-num">
                {{asset.atomicassets_asset_mints.template_mint}}
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
              <div class="owner-name">
                {{asset.owner}}
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
  data () {
    return {
      aid: 1099512463310,
      ipfs: "http://ipfs.io/ipfs/",
    }
  }
}
</script>