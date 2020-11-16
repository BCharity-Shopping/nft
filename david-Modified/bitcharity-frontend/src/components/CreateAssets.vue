<template>
    <div>
        <p>name is</p>
        <p>{{collection_name}}</p>
        <input v-model="AssetOwner" placeholder="Account Name"><br/>
        <input v-model="NumberOfCopies" placeholder="Number between 1-10"><br/>
        <input v-model="Template" placeholder="Template"><br/>
        {{ attribute_table}}
        {{input_value}}
         <div v-for="(item,index) in attribute_table" :key="index">
            {{item.name}}:<td><input v-model="item.swe" :key="index"></td>
        </div>
        <button @click="addFind()">
            New Find
        </button>
        <button class="button btn-primary" @click="CreateAssets()">Add Schema</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import gql from 'graphql-tag';

export default {
   
    data(){
        return {
            input_value:[],
            schema_name:"",
            AssetOwner:"",
            NumberOfCopies:"",
            Template:"",
            attribute_table:this.data,
        }
    },
    apollo:{
        attribute_table: {
            query: gql`query collectionSchema($schema_name: String){
                    atomicassets_schemas_aggregate(where: {schema_name: {_eq: $schema_name}}) {
                        nodes {
                            format
                        }
                    }
                }`,
                variables(){
                        return {
                            schema_name: this.schema_name
                        }
                }, 
                update: data => data.atomicassets_schemas_aggregate.nodes[0].format,

            }
                  

    },
    beforeMount() {
      this.collection_name = this.$route.params.collectname;
      this.schema_name=this.$route.params.schemaName
      console.log("collection name is" + this.collection_name);
      console.log("the schema name is"+this.schema_name);
    },
    updated(){
        console.log("this is modified"+this.data);
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
    },
    methods:{
        addFind() {
            this.input_value.push({ value:"" });
        },
        async CreateAssets(){
            console.log("it is the data"+this.modified);
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
    },
}

</script>