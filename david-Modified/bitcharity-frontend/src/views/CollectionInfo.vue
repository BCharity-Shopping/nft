<template>
    <div>
        <p>it is :{{collectionname}}</p>
        <div v-if='this.getWax==""'>
            <Login/>
        </div>
        <div v-else>
            <ApolloQuery :query="require('../graphQL/collectionDetails.gql')" :variables="{collection_name:collectionname}">
                <template v-slot="{ result: { data } }">
                    <div class="edit-collection">
                        <label for="display_name">Display Name</label>
                        <input id="display_name" :value=data.atomicassets_collections[0].collection_name disabled>
                        <br>
                        <label for="market_fee">Market Fee (0%-15%)</label>
                        <input type="number" max=15 min=0 id="market_fee" :value="data.atomicassets_collections[0].market_fee*100" disabled>
                        <br>
                        <label for="collection_description">Collection Description</label>
                        <input id="collection_description" :value="data.atomicassets_collections[0].data.description" disabled>
                        <br>
                        <label for="website_url">Website URL</label>
                        <input id="website_url" :value="data.atomicassets_collections[0].data.url" disabled>
                        <br>
                        <label>authorized_accounts</label>
                        <div v-for="acc in data.atomicassets_collections[0].authorized_accounts" :key="'a'+acc" :id="'authorized-'+acc">
                            <input class="authorized_accounts" :id="'authorized-account-'+acc" :value="acc">
                            <b-button @click="removeExistAuthAcc(acc)" variant="danger" disabled>-</b-button>
                        </div>
                        <div v-for="aacc in auth_acc" :key="'a'+aacc.index" :id="'authorized-'+aacc.index">
                            <input :id="'authorized-account-'+aacc.index">
                            <b-button @click="removeAuthorizedAccount(aacc.index)" variant="danger" disabled>-</b-button>
                        </div>
                        <label>Notify Accounts</label>
                        <br>
                        <div v-for="acc in data.atomicassets_collections[0].notify_accounts" :key="'n'+acc">
                            <div>
                                <input class="notify_accounts" :value="acc" disabled>
                            </div>
                        </div>
                    </div>
                </template>
                
                
                <button @click="$router.push({path:`/creator/${collectnname}/createSchema`})">CreatSchema</button><br /><br />
                <b-button v-if="edit" variant="warning" @click="updateCollection" id="update-button">Update Collection</b-button>

            
            
            
            
            </ApolloQuery> 
            <ApolloQuery :query="require('../graphQL/collectionSchema.gql')" :variables="{collection_name:collectionname}">
                <template v-slot="{ result: { data } }">
                    {{data.atomicassets_schemas}}
                    <div v-for="(item,index) in data.atomicassets_schemas" :key="item.schema_name">
                        {{index}}: {{item.schema_name}}
                        <button class="btn btn-primary" @click="$router.push({path:`/creator/${collectnname}/schema/${item.schema_name}`})">Schema Info</button>&nbsp;&nbsp;
                    </div>
                </template>
            </ApolloQuery> 
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { Login } from '@/components/Login.vue'
//import editCollection from '@/components/EditCollection.vue'
export default {
    components:{
        Login,
        //editCollection
    },
    data(){
        return {
            edit:false,
            collectionname: "",
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


    }
    
}
</script>