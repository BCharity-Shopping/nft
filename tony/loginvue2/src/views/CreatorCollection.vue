<template>
  <div class="creator-collection">
    <div v-if='this.getWax==""'>
      <p>Please login to view this page</p>
      <Login/>
    </div>
    <div v-else>
      <ApolloQuery
        :query="require('../graphql/getCollection.gql')"
        :variables="{collection_name:$route.params.collection_name}"
        fetchPolicy="network-only"
        >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <div v-if="data.atomicassets_collections.length==0">
              <h1>Collection {{$route.params.collection_name}} doesn't exist</h1>
              <hr>
            </div>
            <div v-else>
              <div v-if="!edit">
                <h1>Collection: {{$route.params.collection_name}}</h1>
                <hr>
                <div id="collection-info">
                  <table id="table">
                    <tr>
                      <td><label for="image">Collection Image Hash</label></td>
                      <td><input id="image" :value="data.atomicassets_collections[0].data.img" disabled></td>
                    </tr>
                    <tr>
                      <td><label for="display_name">Display Name</label></td>
                      <td><input id="display_name" :value="data.atomicassets_collections[0].data.name" disabled></td>
                    </tr>
                    <tr>
                      <td><label for="website_url">Website URL</label></td>
                      <td><input id="website_url" :value="data.atomicassets_collections[0].data.url" disabled></td>
                    </tr>
                    <tr>
                      <td><label for="collection_description">Collection Description</label></td>
                      <td><input id="collection_description" :value="data.atomicassets_collections[0].data.description" disabled></td>
                    </tr>
                    <tr>
                      <td><label for="market_fee">Market Fee (0%-15%)</label></td>
                      <td><input type="number" max=15 min=0 id="market_fee" :value="data.atomicassets_collections[0].market_fee*100" disabled></td>
                    </tr>
                  </table>
                </div>
                <br>
                <div id="accounts-info">
                  <table>
                    <th>
                      <label>Authorized Accounts</label>
                    </th>
                    <tr v-for="acc in data.atomicassets_collections[0].authorized_accounts" :key="'a'+acc">
                      <input class="authorized_accounts" :value="acc" disabled>
                    </tr>
                  </table>
                  <table>
                    <th>
                      <label>Notify Accounts</label>
                    </th>
                    <tr v-for="acc in data.atomicassets_collections[0].notify_accounts" :key="'n'+acc">
                      <input class="notify_accounts" :value="acc" disabled>
                    </tr>
                  </table>
                </div>
                <br>
              </div>
              <div v-else>
                <EditCollection :collection="data.atomicassets_collections[0]" :edit="edit"/>
              </div>
            </div>
          </div>
          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
      <br>
      <b-button v-if="!edit" variant="warning" @click="editCollection" id="edit-button">Edit Collection</b-button>
      <b-button v-if="edit" variant="warning" @click="cancelEditCollection" id="cancel-edit-button">Cancel</b-button>
      <hr>
      <ApolloQuery
        :query="require('../graphql/getSchema.gql')"
        :variables="{collection_name:$route.params.collection_name}"
        fetchPolicy="network-only"
        >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <b-button variant="warning" :to="`/creator/collection/${$route.params.collection_name}/createschema`">Create New Schema</b-button>
            <hr>
            <div class="schemas">
              <div class="card" v-for="schema in data.atomicassets_schemas" :key="schema.schema_name">
                {{schema.schema_name}}
                <b-button :to="`/creator/collection/${$route.params.collection_name}/schema/${schema.schema_name}`" variant="info">View Schema</b-button>
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
import Login from '@/components/Login.vue'
import EditCollection from '@/components/EditCollection.vue'
export default {
  name: 'CreatorCollection',
  components: {
    Login,
    EditCollection,
  },
  data () {
    return {
      edit: false,
    }
  },
  methods: {
    editCollection() {
      this.edit = true
    },
    cancelEditCollection() {
      this.edit = false
    },
    updateCollection() {

    },
  },
  computed: {
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
    ]),
  },
}
</script>

<style scoped>
.creator-collection {
  margin-left: 20%;
  max-width: 60%;
  /*background-color: #eeeeee;*/
}

.schemas {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  margin-bottom : 10px;
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  /*background-color: #666699;*/
  box-shadow: 0px 0px 10px 1px #262626;
  margin-top: 10px;
  color: grey;
  border-radius: 15px;
}

#collection-info {
  text-align: left;
  display: flex;
  flex-direction: columns;
  justify-content: center;
}

#accounts-info {
  text-align: left;
  display: flex;
  flex-direction: columns;
  justify-content: space-evenly;
}
</style>