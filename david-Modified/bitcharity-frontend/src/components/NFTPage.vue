<template>
  <div>
      <P>My Collections</p>
      
        <p>this is {{getWax}}</p>
      <div v-if='this.getWax!=""'>
        <ApolloQuery :query="require('../graphQL/collectionsinfo.gql')" :variables="{owner:'kdoaw.wam'}">
          <template v-slot="{ result: { data } }">
            <div v-for="(item,index) in data.atomicassets_assets" :key="item.collection_name">
              {{index}}: {{item.collection_name}}
             <button class="btn btn-primary" @click="$router.push({name:'collectionInfo',params:{collectionname:item.collection_name}})">Details</button>&nbsp;&nbsp;
            </div>
          </template>
          </ApolloQuery> 
          <button @click="$router.push({path:'/NFT/creator'})">Create</button>
      </div>
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