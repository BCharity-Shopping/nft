<template>
  
  <div>
    <div v-if='this.getWax==="" || this.getWax===undefined'>
      <Login/>
    </div>
    <div v-else>
      <h1>My Collections</h1>
      <p>All NFTs live within collections. They’re like groups for NFTs that are of a similar theme.</p>
        <p>this is {{this.getWax}}</p>
          <!--<p>fetch something:{{this.fetch}}</p>-->
          <div v-for="(item,index) in this.fetch" :key="item.collection_name">
                {{index}}: {{item.collection_name}}
              <button class="btn btn-primary" @click="$router.push({name:'collectionInfo',params:{collectionname:item.collection_name}})">Details</button>&nbsp;&nbsp;
          </div>
          <button @click="$router.push({path:'/NFT/creator'})">Create Collection</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';
export default {
    name:'NFTPage',
    components:{

    },
    data(){
      return{
        wax:"",
        state:"",
        fetch:"",
      }
    },
     computed: {
      ...mapGetters([
        'getWax'
      ]),
    },
    mounted(){
          console.log("fetch for"+this.getWax.userAccount);
          this.isFiltering = true;
          axios.get('https://wax.api.atomicassets.io/atomicassets/v1/collections'
          ,{
            params:{
              authorized_account:this.getWax.userAccount,
              Accept: 'application/json'}
                  }
            )
            .then((resp)=>{
                this.fetch=resp.data.data;
                console.log(this.fetch);
                }
              ).catch(error => console.log(error))
          
              return this.fetch;
        }
}
    

</script>