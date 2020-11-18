<template>
  <div class="create-schema">
    <h1>Create Schema</h1>
    <label>Schema Name</label>
    <input v-model="schema_name" placeholder="12 Characters Max">
    <br>
    <label>name</label>
    <label>string</label>
    <br>
    <label>img</label>
    <label>image</label>
    <br>
    <div v-for="attr in attrs" :key="attr.index">
      <input :id="'attribute-name-'+attr.index" placeholder="New Attribute Name">
      <select :id="'attribute-type-'+attr.index" name="datatype">
        <option value="int8">int8</option>
        <option value="int16">int16</option>
        <option value="int32">int32</option>
        <option value="int64">int64</option>
        <option value="uint8">int8</option>
        <option value="uint16">uint16</option>
        <option value="uint32">uint32</option>
        <option value="uint64" selected>uint64</option>
        <option value="fixed8">fixed8</option>
        <option value="fixed16">fixed16</option>
        <option value="fixed32">fixed32</option>
        <option value="fixed64">fixed64</option>
        <option value="float">float</option>
        <option value="double">double</option>
        <option value="string">string</option>
        <option value="ipfs">ipfs</option>
        <option value="bool">bool</option>
        <option value="byte">byte</option>
        <option value="image">image</option>
      </select>
      <b-button :id="'attribute-remove-'+attr.index" @click="removeAttribute(attr.index)" variant="danger">-</b-button>
    </div>
    <b-button @click="addAttribute">Add New Attribute</b-button>
    <b-button @click="createSchema" variant="warning">Create Schema</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../event-bus.js';
export default {
  name: 'CreateSchema',
  data () {
    return {
      schema_name: "",
      attrs: [],
      attributes: [],
      index: 0,
      schema_format: []
    }
  },
  mounted () {
    this.schema_name = ""
    this.index = 0
    this.attributes = []
    this.schema_format = []
  },
  methods: {
    removeAttribute(index) {
      for(let i = 0; i<this.attrs.length; i++) {
        if(this.attrs[i].index == index) {
          let input = document.getElementById("attribute-name-"+i)
          input.remove()
          let select = document.getElementById("attribute-type-"+i)
          select.remove()
          let button = document.getElementById("attribute-remove-"+i)
          button.remove()
        }
      }
    },
    createSchema() {
      this.schema_format = []
      this.schema_format.push({"name":"name", "type":"string"})
      this.schema_format.push({"name":"img", "type":"string"})
      for(let i = 0; i<this.index; i++) {
        let name = document.getElementById("attribute-name-"+i)
        let type = document.getElementById("attribute-type-"+i)
        if(name!=null && type!=null) {
          //console.log(name.value)
          //console.log(type.value)
          this.schema_format.push({"name":name.value,"type":type.value})
        }
      }
      this.createschema()
    },
    addAttribute() {
      this.attrs.push({index: this.index})
      this.index++
    },
    async createschema() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicassets',
            name: 'createschema',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              authorized_creator: this.getWax.userAccount,
              collection_name: this.$route.params.collection_name,
              schema_name: this.schema_name,
              schema_format: this.schema_format
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
