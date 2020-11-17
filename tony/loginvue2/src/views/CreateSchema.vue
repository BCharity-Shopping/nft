<template>
  <div class="create-schema">
    <h1>Create Schema</h1>
    <input v-model="schema_name" placeholder="12 Characters Max">
    <br>
    <label>name</label>
    <label>string</label>
    <br>
    <label>img</label>
    <label>image</label>
    <br>
    <form>
      <label>somedata</label>
      <select name="datatype">
        <option value="double">double</option>
        <option value="string">string</option>
        <option value="bool">bool</option>
        <option value="image">image</option>
      </select>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../main.js';
export default {
  name: 'CreateSchema',
  data () {
    return {
      schema_name: "",
      attributes: [],
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
