<template>
    <div>
        Schema:{{this.schema_name}}
        collectionname:{{this.collection_name}}<br/>
        <input v-model="AssetOwner" placeholder="Account Name"><br/>
        <input v-model="NumberOfCopies" placeholder="Number between 1-10"><br/>
        <input v-model="Template" placeholder="Template"><br/>
         <ApolloQuery :query="require('../graphQL/schemaImmuntableMutableData.gql')" :variables="{schema_name:this.schema_name}">
            <template v-slot="{ result: { data } }">
                {{data.atomicassets_schemas[0].format}}
                <div v-for="(item) in data.atomicassets_schemas[0].format" :key="item.name">
                    <input type="text" value="{{item.name}}">:{{item.type}}
                </div>
            </template>
        </ApolloQuery>
        <b-button @click="CreateAssets">Create Collection</b-button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CreateAssetsBox from '.components/'
export default {
    components:{
        CreateAssetsBox
    },
    data(){
        return {
            collectionname: "",
            AssetOwner:"",
            NumberOfCopies:"",
            Template:"",
            schema_format:[]
        }
    },
    created() {
      this.schema_name=this.$route.params.schemaname;
      this.collection_name = this.$route.params.collectionname;
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      collectnname:function(){
          return this.collectionname
      }
    },
    method:{
        async CreateAssets(){
              for(var key in this.rows){
               this.schema_format.push({"name":this.rows[key].name,"type":this.rows[key].type})
           }
            console.log("it is "+this.collectionName);
            if(!this.getWax.api){
               return console.log("Need to login first")
           }
           try {
               this.result=await this.getWax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'createschema',
                    authorization: [{
                        actor: this.getWax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        authorized_minter:this.getWax.userAccount,
                        collection_name:this.collection_name,
                        immutable_data:[],
                        mutable_data:[],
                        schema_format:this.schema_name,
                        new_asset_owner:this.AssetOwner,
                        schema_name:this.Schema_name,
                        template_id:-1,
                        token_to_back:[

                        ]
                    },
                }]
               },{
                   blocksBehind: 3,
                   expireSeconds: 30
               });
           }
           catch(e){
               this.result=e
               console.log(e)
           } 
        }
    }
    
}
</script>