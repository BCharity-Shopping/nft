<template>
    <div>
        <p>it is :{{collectionname}}</p>
        <ApolloQuery :query="require('../graphQL/collectionDetails.gql')" :variables="{collection_name:collectionname}">
            <template v-slot="{ result: { data } }">
                {{data}}
            </template>
            <button @click="$router.push({path:`/creator/${collectnname}/createSchema`})">CreatSchema</button><br /><br />
        </ApolloQuery> 
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            collectionname: ""
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
    mounted(){
      this.wax = this.$store.getters.getWax
    },
    methods:{
      
    }
}
</script>