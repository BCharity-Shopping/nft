<template>
    <div>
        Schema:{{this.schema_name}}
        collectionname:{{this.collection_name}}
         <ApolloQuery :query="require('../graphQL/schemaDetails.gql')" :variables="{schema_name:this.schema_name}">
            <template v-slot="{ result: { data } }">
                {{data}}
            <div v-for="(item) in data.atomicassets_schemas_aggregate.nodes[0].format" :key="item.name">
                            {{item.name}}:{{item.type}}
            </div>
            </template>
            </ApolloQuery> 
        <button class="btn btn-primary" @click="$router.push({path:`/creator/${collection_name}/schema/${schema_name}/CreateAssets`})">Asset Info</button>&nbsp;&nbsp;
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
