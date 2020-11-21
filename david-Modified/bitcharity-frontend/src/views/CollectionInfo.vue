<template>
    <div>
        <h1>Collection :{{collectionname}}</h1>
        <p>All NFTs live within collections. They’re like groups for NFTs that are of a similar theme.</p>
        <div v-if='this.getWax==""'>
            <Login />
        </div>
        <div v-else>
            <ApolloQuery :query="require('../graphQL/collectionDetails.gql')" :variables="{collection_name:collectionname}" fetchPolicy="network-only">
                <template v-slot="{ result: { data } }">
                        <div v-if="!edit">
                            <div class="container-fluid">
                                <b-card>
                                    <div class="edit-collection">
                                        <div class="grid-container">
                                            <div class="grid-item">
                                                <label for="display_name">Display Name</label>
                                                <input id="display_name" :value=data.atomicassets_collections[0].collection_name disabled>
                                            </div>
                                            <div class="grid-item">
                                                <label for="market_fee">Market Fee (0%-15%)</label>
                                                <input type="number" max=15 min=0 id="market_fee" :value="data.atomicassets_collections[0].market_fee*100" disabled>
                                            </div>
                                            <br>
                                            <div class="grid-item">
                                                <label for="collection_description">Collection Description</label>
                                                <input id="collection_description" :value="data.atomicassets_collections[0].data.description" disabled>
                                            </div>
                                            <div class="grid-item">
                                                <label for="website_url">Website URL</label>
                                                <input id="website_url" :value="data.atomicassets_collections[0].data.url" disabled>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                </b-card>
                            </div>
                            <br>
                            <br>
                            <div id="accountParent">
                                <b-card id="authorizedaccount">
                                        <label>authorized_accounts</label>
                                        <div v-for="acc in data.atomicassets_collections[0].authorized_accounts" :key="'a'+acc" :id="'authorized-'+acc">
                                            <input class="authorized_accounts" :id="'authorized-account-'+acc" :value="acc">
                                            <b-button @click="removeExistAuthAcc(acc)" variant="danger" disabled>-</b-button><br>
                                        </div>
                                        <br/>
                                        <div v-for="aacc in auth_acc" :key="'a'+aacc.index" :id="'authorized-'+aacc.index">
                                            <input :id="'authorized-account-'+aacc.index">
                                            <b-button @click="removeAuthorizedAccount(aacc.index)" variant="danger" disabled>-</b-button>
                                        </div>
                                </b-card> 
                                <br/>
                                <b-card id="notifyaccounts">         
                                    <label>Notify Accounts</label>
                                    <div v-for="acc in data.atomicassets_collections[0].notify_accounts" :key="'n'+acc">
                                        <div>
                                            <input class="notify_accounts" :value="acc" disabled>
                                        </div>
                                    </div>
                                </b-card>
                            </div>
                    </div>
                        <b-button v-if="!edit" variant="warning" @click="editCollection" id="edit-button">Edit Collection</b-button>
                    <div v-else>
                        <editCollection :collection="data.atomicassets_collections[0]" :edit="edit"/>
                    </div>

                </template>
                <b-button v-if="edit" variant="warning" @click="cancelEditCollection" id="edit-button">Cancel Collection</b-button>

                <button class="btn btn-primary" @click="$router.push({path:`/creator/${collectnname}/createSchema`})">CreatSchema</button><br /><br />

            </ApolloQuery> 
            
            <ApolloQuery :query="require('../graphQL/collectionSchema.gql')" :variables="{collection_name:collectionname}" fetchPolicy="network-only">
                <template v-slot="{ result: { data } }">
                    <h2>Schema:</h2>
                    <b-card class="grid-container" id="accountParent">
                        <div class="grid-item">
                            <div v-for="(item) in data.atomicassets_schemas" :key="item.schema_name">
                                Schema Name: {{item.schema_name}}
                                <button class="btn btn-primary" @click="$router.push({path:`/creator/${collectnname}/schema/${item.schema_name}`})">Schema Info</button><br>
                            </div>
                        </div>
                    </b-card>
                </template>
            </ApolloQuery> 
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import editCollection from '@/components/EditCollection.vue'
export default {
    components:{
        editCollection
    },
    data(){
        return {
            edit:false,
            collectionname: "",
            noti_acc: [],
            auth_acc:[],

        }
    },
    created() {
      
      this.collectionname = this.$route.params.collectionname;
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      collectnname:function(){
          return this.collectionname
      }
    },
    methods:{
        editCollection() {
            this.edit = true
        },
        cancelEditCollection() {
            this.edit = false
        },
        updateCollection(){

        },

    }
    
}
</script>
<style scoped>
   div.container-fluid {
       text-align:right;
   }
   div.grid-container {
       display: grid;
       grid-template-columns:auto auto auto;
       padding: 2px;
       align-content: column;
   }
   #accountParent{
       display:flex;
       flex-direction:row;
       margin:14px;
       justify-content: space-between;
      
   }
   #authorizedaccount {
        width:50%;
       height:500px

   }
   #notifyaccounts {
       width:50%;
   }
</style>
