<template>
    <div>
        <h1>Create Asset</h1>
        Account Name:<input v-model="AssetOwner" placeholder="Account Name"><br/>
        Number of Copies(Number):<input v-model="NumberOfCopies" placeholder="Number between 1-10"><br/>
        <div class="grid-item">
            <ApolloQuery :query="require('../graphQL/atomicasset_templates.gql')" :variables="{schema_name:this.schema_name,collection_name:this.collection_name}">
                <template v-slot="{ result: { loading, error, data } }">
                    <div v-if="loading" class="loading apollo">Loading...</div>
                    <div v-else-if="error" class="error apollo">An error occurred</div>
                    <div v-else-if="data" class="result apollo">
                        <select id="template" v-model="use_Template" >
                            <option value="No Template" selected>No Template</option>
                            <option v-for="template in data.atomicassets_templates" :key="template.template_id" :value="template.template_id">
                                #{{template.template_id}} - ({{template.issued_supply}}/{{template.max_supply}}) {{template.immutable_data.name}}
                            </option>
                        </select>
                        
                        <div v-if="use_Template=='No Template'">
                            <div v-for="format in data.atomicassets_schemas[0].format" :key="format.name">
                                <label :for="format.name">{{format.name}}</label>
                                <input :id="format.name" class="format-name" :name="format.name" :placeholder="format.type"> 
                                <br/>
                            </div>
                        </div>
                        
                        <div v-else>
                            <div v-for="format in data.atomicassets_schemas[0].format" :key="format.name">
                                <div v-for="template in data.atomicassets_templates" :key="template.template_id">
                                    <label v-if="template.template_id==use_Template" :for="format.name">{{format.name}}</label>
                                    <input v-if="template.template_id==use_Template && template.immutable_data[format.name]!=null" :id="format.name" :placeholder="template.immutable_data[format.name]" disabled>
                                    <input v-else-if="template.template_id==use_Template" class="format-name" :id="format.name" :placeholder="format.type">
                                </div>
                            </div>
                            <br>
                        </div>
                    </div>
                </template>
            </ApolloQuery>
        </div>
        <button class="button btn-primary" @click="CreateAssets()">Create Asset</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import gql from 'graphql-tag';

export default {
   
    data(){
        return {
            immutable_data:[],
            schema_name:"",
            AssetOwner:"",
            NumberOfCopies:"",
            use_Template:"No Template",
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
    mounted(){
        this.asset_owner=""
        this.copies=""
        this.immutable_data=[]
        this.user_template="No Template"
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
    },
    methods:{
        async CreateAssets(){
            if(this.use_Template!="No Template") {
                this.template_id = this.useTemplate
            }
            this.immutable_data=[];
            var array=document.getElementsByClassName("format-name")
            console.log(array);
            for(var j=0;j<array.length;j++){
                    if(array[j].placeholder=="image"){
                        array[j].placeholder="string"
                        console.log(array[j].value);
                    }
                    if(array[j].value!=""){
                        this.immutable_data.push({"key":array[j].id,"value":[array[j].placeholder, array[j].value]})
                    }
            }
            if(!this.getWax.api){
               return console.log("Need to login first")
           } 
           try {
               this.result=await this.getWax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'mintasset',
                    authorization: [{
                        actor: this.getWax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        authorized_minter:this.getWax.userAccount,
                        collection_name:this.collection_name,
                        immutable_data:this.immutable_data,
                        mutable_data:[],
                        new_asset_owner:this.AssetOwner,
                        schema_name:this.schema_name,
                        template_id:-1,
                        tokens_to_back:[
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
<style scoped>
    .large-card {
        width: 180px;
        border-radius: 20px;
        box-shadow: 0 3px 20px rgba(0,0,0,.4);
        display: inline-block;
        height: fit-content;
        margin: 15px 10px;
        padding: 0;
        position: relative;
        text-align: left;
        text-align: initial;
    }
</style>