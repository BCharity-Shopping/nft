<template>
    <div>
        Schema:{{this.schema_name}}
        collectionname:{{this.collection_name}}
         <ApolloQuery :query="require('../graphQL/schemaDetails.gql')" :variables="{schema_name:this.schema_name}">
            <template v-slot="{ result: { data } }">
                {{data.atomicassets_schemas_aggregate.nodes[0].format}}
                <div v-for="(item) in data.atomicassets_schemas_aggregate.nodes[0].format" :key="item.name">
                    {{item.name}}:{{item.type}}
                </div>
            </template>
        </ApolloQuery> 
        <button class="btn btn-primary" @click="$router.push({path:`/creator/${collectnname}/schema/${schema_name}/CreateAsset`})">Details</button>&nbsp;&nbsp;
    </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            schema_name: "",
            collectionname:""
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
