<template>
  <div>
    <p>Inventory {{id}}</p>
    <ApolloQuery
    :query="require('../graphql/getInventory.gql')"
    :variables="{owner}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-for="asset in data.atomicassets_assets" :key="asset.asset_id">
            ID: {{asset.asset_id}}
            Owner: {{asset.owner}}
            Collection Name: {{asset.collection_name}}
            Schema Name: {{asset.schema_name}}
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
  props: ['id'],
  data () {
    return {
      limit: 10,
      owner: this.id
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

<style>

</style>