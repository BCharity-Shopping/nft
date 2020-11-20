<template>
  <div class="creator-schema">
    <div v-if='this.getWax==""'>
      <Login/>
    </div>
    <div v-else>
      <ApolloQuery
        :query="require('../graphql/getSchemaAssetTemplate.gql')"
        :variables="{collection_name:$route.params.collection_name, schema_name:$route.params.schema_name}"
        fetchPolicy="network-only"
        >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <div v-if="data.atomicassets_schemas.length==0">
              <h1>Schema {{$route.params.schema_name}} doesn't exist for Collection {{$route.params.collection_name}}</h1>
              <hr>
            </div>
            <div v-else>
              <h1>Schema: {{$route.params.schema_name}}</h1>
              <hr>
              <div v-for="attribute in data.atomicassets_schemas[0].format" :key="attribute.name">
                <input :value="attribute.name" disabled>
                <select disabled>
                  <option>{{attribute.type}}</option>
                </select>
              </div>
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
              <b-button @click="addAttribute" variant="primary">Add New Attribute +</b-button>
              <hr>
              <b-button @click="saveChanges" variant="warning">Save Changes</b-button>
              <hr>
              <b-button variant="success" :to="`/creator/collection/${$route.params.collection_name}/schema/${$route.params.schema_name}/createasset`">Mint New Asset</b-button>
              <hr>
              <h3>Assets</h3>
              <div class="cards">
                <div class="card" v-for="asset in data.atomicassets_assets" :key="asset.asset_id">
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
                  <div class="owner-name">
                    {{asset.owner}}
                  </div>
                </div>
              </div>
              <hr>
              <b-button variant="success" :to="`/creator/collection/${$route.params.collection_name}/schema/${$route.params.schema_name}/createtemplate`">Create New Template</b-button>
              <hr>
              <h3>Templates</h3>
              <div class="cards">
                <div class="template" v-for="template in data.atomicassets_templates" :key="template.template_id">
                  <div class="template-img" v-if="template.immutable_data!=null">
                    <div class="template-img-2" v-if="template.immutable_data.img!=null">
                      <img v-bind:src="ipfs + template.immutable_data.img" width="100%" height="100%">
                    </div>
                  </div>
                  <div>
                  {{template.collection_name}}
                  </div>
                  <div>
                  {{template.template_id}}
                  </div>
                  <div>
                  {{template.immutable_data.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
     
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../event-bus.js';
import Login from '@/components/Login.vue'
export default {
  name: 'CreatorSchema',
  components: {
    Login,
  },
  data () {
    return {
      attrs: [],
      attributes: [],
      index: 0,
      ipfs: "http://ipfs.io/ipfs/",
    }
  },
  methods: {
    addAttribute() {
      this.attrs.push({index: this.index})
      this.index++
    },
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
    saveChanges() {
      this.schema_format = []
      for(let i = 0; i<this.index; i++) {
        let name = document.getElementById("attribute-name-"+i)
        let type = document.getElementById("attribute-type-"+i)
        if(name!=null && type!=null) {
          //console.log(name.value)
          //console.log(type.value)
          this.schema_format.push({"name":name.value,"type":type.value})
        }
      }
      if(this.schema_format.length>0) {
        this.extendschema()
      }
      else {
        window.alert("No attributes added to Schema")
      }
    },
    async extendschema() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicassets',
            name: 'extendschema',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              authorized_editor: this.getWax.userAccount,
              collection_name: this.$route.params.collection_name,
              schema_name: this.$route.params.schema_name,
              schema_format_extension: this.schema_format
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
.creator-schema {
  width: 70%;
  margin-left: 15%;
  background-color: #eeeeee;
}

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.template {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom : 10px;
  width: 230px;
  height: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 1px #262626;
  margin-top: 10px;
  color: grey;
  border-radius: 15px;
}

.template-img-2 {
  width: 100rem;
  max-width: 150px;
  height: 100%;
}

.template-img {
  width: 150px;
  height: 150px;
}

.card {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom : 10px;
  width: 210px;
  height: 240px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  /*background-color: #666699;*/
  box-shadow: 0px 0px 10px 1px #262626;
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
</style>