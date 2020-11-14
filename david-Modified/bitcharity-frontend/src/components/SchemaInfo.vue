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
                <CreateAsset v-bind:data=data />
            </template>
            </ApolloQuery> 
        <button class="btn btn-primary" @click="$router.push({path:`/creator/${collectname}/schema/${schema_name}/CreateAsset`})">Details</button>&nbsp;&nbsp;
    </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
    name:'SchemaInfo',
   
    data(){
        return {
            schema_name: "",
            collection_name:""
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
    }
}
</script> 
