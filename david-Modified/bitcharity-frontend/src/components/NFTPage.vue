<template>
  <div>
      <P>My Collections</p>
      
        <p>this is {{getWax}}</p>
        <div v-if='this.getWax!=""'>
          <p>fetch is {{AuthorizedCollectionOnCurrentAccount()}}</p>
          <p>fetch something:{{this.fetch}}</p>
        </div>
<!--      <div v-if='this.getWax!=""'>
        <ApolloQuery :query="require('../graphQL/collectionsinfo.gql')" :variables="{owner:'kdoaw.wam'}">
          <template v-slot="{ result: { data } }">
            <div v-for="(item,index) in data.atomicassets_assets" :key="item.collection_name">
              {{index}}: {{item.collection_name}}
             <button class="btn btn-primary" @click="$router.push({name:'collectionInfo',params:{collectionname:item.collection_name}})">Details</button>&nbsp;&nbsp;
            </div>
          </template>
          </ApolloQuery> -->
          <button @click="$router.push({path:'/NFT/creator'})">Create</button>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
    name:'NFT Assets',
    components:{

    },
    data(){
      return{
        wax:"",
        state:"",
        fetch:"",
      }
    },
    created(){
          },
     computed: {
      ...mapGetters([
        'getWax'
      ]),
    },
    methods:{
     async AuthorizedCollectionOnCurrentAccount(){
        console.log("fetch for"+this.getWax.userAccount);
        await axios.get('https://wax.api.atomicassets.io/atomicassets/v1/collections'
        ,{
          params:{
            authorized_account:this.getWax.userAccount}
            }
            )
          .then((resp)=>{
              this.fetch=resp.data.data;
              console.log(this.fetch);
              }
            )
            return this.fetch;
          },
        }
    }

</script>