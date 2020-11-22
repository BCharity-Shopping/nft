<template>
  <div class="create-asset">
    <h1>Mint Asset</h1>
    <hr>
    <label for="asset_owner">Asset Owner</label>
    <input v-model="asset_owner" id="asset_owner" placeholder="Account Name">
    <br>
    <label for="copies">Number Of Copies</label>
    <input v-model="copies" id="copies" placeholder="Number between 1-10">
    <ApolloQuery
    :query="require('../graphql/getSchemaTemplate.gql')"
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
          <select id="template" v-model="use_template">
              <option value="No Template" selected>No Template</option>
              <option v-for="template in data.atomicassets_templates" :key="template.template_id" :value="template.template_id">#{{template.template_id}} - ({{template.issued_supply}}/{{template.max_supply}}) {{template.immutable_data.name}}</option>
          </select>
          <div v-if="use_template=='No Template'">
            <div v-for="format in data.atomicassets_schemas[0].format" :key="format.name">
              <label :for="format.name">{{format.name}}</label>
              <input :id="format.name" class="format-name" :name="format.name" :placeholder="format.type">
              <br>
            </div>
          </div>
          <div v-else>
            <div v-for="format in data.atomicassets_schemas[0].format" :key="format.name">
              <div v-for="template in data.atomicassets_templates" :key="template.template_id">
                <label v-if="template.template_id==use_template" :for="format.name">{{format.name}}</label>
                <input v-if="template.template_id==use_template && template.immutable_data[format.name]!=null" :id="format.name" :placeholder="template.immutable_data[format.name]" disabled>
                <input v-else-if="template.template_id==use_template" class="format-name" :id="format.name" :placeholder="format.type">
              </div>
            </div>
            <br>
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <br>
      <b-button @click="createCause" variant="success">Create Cause</b-button>
    </ApolloQuery>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../event-bus.js';
export default {
  name: 'CreateAsset',
  data () {
    return {
      asset_owner: "",
      copies: "",
      immutable_data: [],
      use_template: "No Template",
      template_id: -1,
    }
  },
  mounted () {
    this.asset_owner = ""
    this.copies = ""
    this.immutable_data = []
    this.use_template = "No Template"
    this.template_id = -1
  },
  methods: {
    createCause() {
      if(this.use_template!="No Template") {
        this.template_id = this.use_template
      }
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

      let c = Number(this.copies)
      if(isNaN(c) || !Number.isInteger(c)) {
        window.alert("Number Of Copies between 1-10")
      }
      else if(c <= 0 || c > 10) {
        window.alert("Number Of Copies between 1-10")
      }
      else {
        this.mintasset()
      }
    },
    async mintasset() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: this.actions
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
    ]),
    action: function() {
      return {
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
          template_id: this.template_id,
          new_asset_owner: this.asset_owner,
          immutable_data: this.immutable_data,
          mutable_data: [],
          tokens_to_back: [],
        },
      }
    },
    actions: function() {
      let array = []
      for(let i = 0; i<this.copies; i++) {
        array.push(this.action)
      }
      return array
    }
  }
}
</script>

<style scoped>
.create-asset {
  margin-left: 20%;
  max-width: 60%;
  /*background-color: #eeeeee;*/
}
</style>