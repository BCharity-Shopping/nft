<template>
  <div>
      <P>My Collections</p>
      
        <p>this is {{this.getWax}}</p>
          <p>fetch something:{{this.fetch}}</p>
          <div v-for="(item,index) in this.fetch" :key="item.collection_name">
                {{index}}: {{item.collection_name}}
              <button class="btn btn-primary" @click="$router.push({name:'collectionInfo',params:{collectionname:item.collection_name}})">Details</button>&nbsp;&nbsp;
          </div>
          <button @click="$router.push({path:'/NFT/creator'})">Create</button>
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
    updated(){
        console.log("fetch for"+this.getWax.userAccount);
        if(this.getWax!=null){
        this.isFiltering = true;
        axios.get('https://wax.api.atomicassets.io/atomicassets/v1/collections'
        ,{
          params:{
            authorized_account:this.getWax.userAccount,
            Accept: 'application/json'
            }
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
}
    

</script>