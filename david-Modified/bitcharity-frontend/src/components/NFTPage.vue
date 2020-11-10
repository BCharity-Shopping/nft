<template>
  <div>
      <P>My Collections</p>
      <v-if>
        <p>this is {{getWax.userAccount}}</p>
      </v-if>
      
        <ApolloQuery :query="require('../graphQL/collectionsinfo.gql')" :variables="{author:'kdoaw.wam'}">
          <template v-slot="{ result: { data } }">
            <p>{{ data }}</p>
            <div v-for="(item, index) in data.atomicassets_collections" :key="item.collection_name">
              {{ index}}: {{item.collection_name}}
              <button class="btn btn-primary" @click="jump(item.collection_name)">View Collections</button>&nbsp;&nbsp;
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