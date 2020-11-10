<template>
  <div>
      <P>My Collections</p>
      <v-if>
        <p>this is {{getWax.userAccount}}</p>
      </v-if>
      <ApolloQuery :query="require('../graphQL/collectionsinfo.gql')" :variables="{owner:getWax.userAccount}">
        <template v-slot="{ result: { data } }">
          <div v-for="(item, index) in data.atomicassets_assets" :key="item.collection_name">
            {{ index}}: {{item.collection_name}}
          </div>
        </template>
        </ApolloQuery> 
        <button @click="$router.push({path:'/NFT/creator'})">Create</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'NFT Assets',
    components:{

    },
    computed: {
      ...mapGetters([
        'getWax'
      ])
    },
    data(){
      return{
        wax:"",
        state:""
      }
    },
    mounted(){
      this.wax = this.$store.getters.getWax
    },
}
</script>