<template>
  <div class="create-asset">
    <h1>Mint Asset</h1>
    <input v-model="asset_owner" placeholder="Account Name">
    <input v-model="copies" placeholder="Number between 1-10">
    <ApolloQuery
    :query="require('../graphql/getSchema.gql')"
    :variables="{schema_name:$route.params.schema_name, collection_name:$route.params.collection_name}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-for="format in data.atomicassets_schemas[0].format" :key="format.name">
            <label :for=format.name >{{format.name}}</label>
            <input :id=format.name class="format-name" :name=format.name :placeholder=format.type>
            <br>
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <b-button @click="createCause">Create Cause</b-button>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../main.js';
export default {
  name: 'CreateAsset',
  data () {
    return {
      asset_owner: "",
      copies: 0,
      immutable_data: [],
    }
  },
  methods: {
    createCause() {
      let array = document.getElementsByClassName("format-name")
      for(let i=0;i<array.length;i++){
        let key = array[i].id
        let value
        if(array[i].placeholder=="image") {
          value = ["string",array[i].value]
        }
        else {
          value = [array[i].placeholder,array[i].value]
        }
        if(array[i].value != "") {
          this.immutable_data.push({"key":key,"value":value})
        }
      }
      this.cancelSale()
    },
    async cancelSale() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicassets',
            name: 'mintasset',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              authorized_minter: this.getWax.userAccount,
              collection_name: this.$route.params.collection_name,
              schema_name: this.$route.params.schema_name,
              template_id: -1,
              new_asset_owner: this.asset_owner,
              immutable_data: this.immutable_data,
              mutable_data: [],
              tokens_to_back: [],
            },
          }]
        }, {
          blocksBehind: this.getBlocksBehind,
          expireSeconds: this.getExpireSeconds
        })
        bus.$emit('createSuccess',this.result.transaction_id)
      }
      catch (e) {
        bus.$emit('createFailed',e)
      }
    },
  },
  computed: {
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
    ])
  }
}
</script>
