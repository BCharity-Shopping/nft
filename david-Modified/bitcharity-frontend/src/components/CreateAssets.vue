<template>
    <div>
        <p>name is</p>
        <p>{{collection_name}}</p>
        <input v-model="AssetOwner" placeholder="Account Name"><br/>
        <input v-model="NumberOfCopies" placeholder="Number between 1-10"><br/>
        <input v-model="Template" placeholder="Template"><br/>
        {{ attribute_table }}
         <div v-for="(item) in attribute_table" :key="item.name">
            {{item.name}}:<td><input :id=item.type class="item-name" :name=item.name :placeholder=item.type></td>
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
    computed: {
      ...mapGetters([
        'getWax'
      ]),
    },
    methods:{
        async CreateAssets(){
            var array=document.getElementsByClassName("item-name")
            console.log(array);
            //console.log(this.immutable_data);
            for(var j=0;j<array.length;j++){
                    console.log("this is a array"+array[j].placeholder);
                    console.log(array[j].name)
                    console.log("this is a array"+array[j].value);
                     if(array[j].value!=""){
                        this.immutable_data.push({"key":array[j].name,"value":[array[j].placeholder, array[j].value]})
                     }
                 }
            console.log("this is "+this.immutable_data);
            //console.log("this is a array"+array[j].value);
            //         console.log(this.immutable_data[j].value[0]);
            //         this.immutable_data.push({"key":this.attribute_table[i].name,"value":[this.attribute_table[i].type,array[j].value]})

                    
            //     }
            // }
            console.log(this.immutable_data);
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