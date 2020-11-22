<template>
  <div class="create-template">
    <h1>Create New Template</h1>
    <hr>
    <label for="max-supply">Max Supply</label>
    <input id="max-supply" placeholder="Infinite">
    <br>
    <input id="transferable" type="checkbox" name="Assets Can Be Transferred" checked>
    <label>Assets Can Be Transferred</label>
    <br>
    <input id="burnable" type="checkbox" name="Assets Can Be Burned" checked>
    <label>Assets Can Be Burned</label>
    <ApolloQuery
    :query="require('../graphql/getSchema.gql')"
    :variables="{schema_name:$route.params.schema_name, collection_name:$route.params.collection_name}"
    fetchPolicy="network-only"
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
      <br>
      <b-button @click="createTemplate" variant="success">Create Template</b-button>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../event-bus.js';
export default {
  name: 'CreateTemplate',
  data () {
    return {
      transferable: "true",
      burnable: "true",
      max_supply: 0,
      immutable_data: [],
    }
  },
  methods: {
    createTemplate() {
      this.immutable_data = []
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

      let maxSupply = document.getElementById("max-supply").value
      if(maxSupply=="") {
        this.max_supply = 0
      }
      else {
        let ms = Number(maxSupply)
        if(isNaN(ms) || !Number.isInteger(ms)) {
          window.alert("Enter a number for Max Supply")
        }
        else {
          this.max_supply = ms
        }
      }
      this.transferable = document.getElementById("transferable").checked
      this.burnable = document.getElementById("burnable").checked

      this.createtempl()
    },
    async createtempl() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicassets',
            name: 'createtempl',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              authorized_creator: this.getWax.userAccount,
              collection_name: this.$route.params.collection_name,
              schema_name: this.$route.params.schema_name,
              transferable: this.transferable,
              burnable: this.burnable,
              max_supply: this.max_supply,
              immutable_data: this.immutable_data,
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

<style scoped>
.create-template {
  margin-left: 20%;
  max-width: 60%;
  /*background-color: #eeeeee;*/
}
</style>