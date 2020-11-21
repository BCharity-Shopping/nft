<template>
    <div>
        <h1>Create Template</h1>
        Maximum Supply(number)<input v-model="MaxSupply" placeholder="Max Supply"><br/>
        Asset can be burned:<input type="checkbox" v-model="Burned" v-bind:true-value=true v-bind:false-value=false>&nbsp;&nbsp;
        Asset can be Transfered: <input type="checkbox" v-model="Transfered" v-bind:true-value=true v-bind:false-value=false>
        <div v-for="(item) in attribute_table" :key="item.name">
            {{item.name}}:<td><input :id=item.type class="item-name" :name=item.name :placeholder=item.type></td>
        </div>
        <button class="button btn-primary" @click="CreateTemplate()">Create Template</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import gql from 'graphql-tag';

export default {
   
    name:'CreateTemplate',
    
    data(){
        return {
            collection_name:"",
            schema_name:"",
            MaxSupply:"",
            Burned:false,
            Transfered:false,
            immutable_data:[],
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
      this.schema_name=this.$route.params.schemaName;
    },
    computed:{
    ...mapGetters([
        'getWax'
      ]),
    },
    
    
    methods:{
        async CreateTemplate(){
            console.log("collection name is "+this.collection_name);
            console.log("schema name is "+this.schema_name);
            console.log("authorized creator is "+this.getWax.userAccount);
            console.log("burnable is "+this.Burned);
            console.log("collection name is "+this.collection_name);
            console.log("max supply is "+this.MaxSupply);
            console.log("Transferable is "+this.Transfered);

            this.immutable_data=[];
            var array=document.getElementsByClassName("item-name")
            console.log(array);
            for(var j=0;j<array.length;j++){
                if(array[j].placeholder=="image"){
                    array[j].placeholder="string"
                }
                if(array[j].value!=""){
                    this.immutable_data.push({"key":array[j].name,"value":[array[j].placeholder, array[j].value]})
                }
            }
            console.log(this.immutable_data);
            if(!this.getWax.api){
               return console.log("Need to login first")
            } 
            try {
               this.result=await this.getWax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'createtempl',
                    authorization: [{
                        actor: this.getWax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        authorized_creator:this.getWax.userAccount,
                        burnable:this.Burned,
                        collection_name:this.collection_name,
                        immutable_data:this.immutable_data,
                        max_supply:this.MaxSupply,
                        schema_name:this.schema_name,
                        transferable:this.Transfered,
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