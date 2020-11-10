<template>
  <div>
    <ApolloQuery
    :query="require('../graphql/getAccountInventory.gql')"
    :variables="{owner}"
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
                <div class="owner-name">
                  {{asset.owner}}
                </div>
                <b-button class="button-details" :to="`/explorer/asset/${asset.asset_id}`">Details</b-button>
                <b-dropdown class="button-more" text="More">
                  <b-dropdown-item>Transfer</b-dropdown-item>
                  <b-dropdown-item>Create Link</b-dropdown-item>
                  <b-dropdown-item>New Trade</b-dropdown-item>
                  <b-dropdown-item>Back Token</b-dropdown-item>
                  <b-dropdown-item>Burn</b-dropdown-item>
                </b-dropdown>
                <b-button class="button-list">List on Market</b-button>
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
import gql from 'graphql-tag';

export default {
  name: 'Inventory',
  props: ['account_name'],
  data () {
    return {
      limit: 10,
      owner: this.account_name,
      ipfs: "http://ipfs.io/ipfs/"
    }
  },
  apollo: {
    atomicassets_assets: gql`
      query {
        atomicassets_assets (where: {owner: {_eq: "l5oaw.wam"}}){
          asset_id
          atomicassets_template {
            immutable_data
            max_supply
            issued_supply
            burnable
            transferable
          }
          owner
          template_id
          schema_name
          collection_name
          atomicassets_assets_backed_tokens {
            token_symbol
            amount
          }
        }
      }
    `
  }
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
  background-color: white;
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
}

.button-more {
  margin-top: 3%;
  width: 40%;
  height: 10%;
}

.button-list {
  margin-top: 3%;
  width: 90%;
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
  width: 80%;
  height: 50%;
}

</style>