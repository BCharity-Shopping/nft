<template>
    <div>
        <h1>Schema:{{this.schema_name}}</h1>
        <p>Schema defines which kind of attribute the assets will have. You can add attribute later</p>
         <ApolloQuery :query="require('../graphQL/schemaDetails.gql')" :variables="{schema_name:this.schema_name}">
            <template v-slot="{ result: { data } }">
            <div class="container">
                <table>
                    <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Type</th>
                    </tr>
                    <tr v-for="(item) in data.atomicassets_schemas_aggregate.nodes[0].format" :key="item.name" id="accountParent">
                        <td><b-card>{{item.name}}</b-card></td>
                        <td><b-card>{{item.type}}</b-card></td>
                    </tr>
                </table>
            </div>
            </template>
            </ApolloQuery> 
        <button class="btn btn-primary" @click="$router.push({path:`/creator/${collection_name}/schema/${schema_name}/CreateAssets`})">Mint Asset</button>&nbsp;&nbsp;
        <button class="btn btn-primary" @click="$router.push({path:`/creator/${collection_name}/schema/${schema_name}/CreateTemplate`})">Create Template</button>&nbsp;&nbsp;
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:'SchemaInfo',
    
    data(){
        return {
            schema_name: "",
            collection_name:"",
        }
    },
    created() {
        this.schema_name=this.$route.params.schemaname;
        console.log(this.schema_name);
        this.collection_name = this.$route.params.collectionname;
        console.log(this.collection_name);
      },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      schemanames:function(){
          return this.schema_name
      },
      collectionnames:function(){
          return this.collectionname
      }
    }
}
</script> 
<style scoped>
     div.container-fluid {
       text-align:right;
     }
     .container {
        display: flex;
        flex-wrap: wrap;
    }
    div.grid-item{
        align-content: column;
        display: inline;
    }
    #accountParent{
       flex-direction:column;
       margin:14px;
       justify-content: space-between;
      
   }
</style>
