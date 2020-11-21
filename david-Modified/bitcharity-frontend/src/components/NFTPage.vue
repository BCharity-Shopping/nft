<template>
  
  <div>
    <div v-if='this.getWax==="" || this.getWax===undefined'>
      <Login/>
    </div>
    <div v-else>
      <h1>My Collections</h1>
      <p>All NFTs live within collections. They’re like groups for NFTs that are of a similar theme.</p>
          <div class="main-block w-100">
            <div class="row">
              <div class="grid text-center px-0 MobileCardDesign">
            <!--<p>fetch something:{{this.fetch}}</p>-->
              <b-card>
                  <button @click="$router.push({path:'/NFT/creator'})" type="button" class="btn btn-primary btn-lg">Create Collection</button>
              </b-card>
                  <div v-for="(item) in this.fetch" :key="item.collection_name">
                        <div class="large-card">
                          <div class="picture-wrapper">
                            <b-card>
                                <b-card-img v-bind:src="'https://ipfs.io/ipfs/'+item.img" style="height: 150px"></b-card-img>
                            </b-card>
                            <b-card-text>
                              <p>{{item.collection_name}}</p>
                              <button class="btn btn-primary" @click="$router.push({name:'collectionInfo',params:{collectionname:item.collection_name}})">View Collection</button>&nbsp;&nbsp;
                            </b-card-text>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
          </div>
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
<style scoped>
  .grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 1rem;
}
.main-block {
  padding: 35px 49px 33.5px 51px;
}


.large-card {
  width: 180px;
  border-radius: 20px;
  box-shadow: 0 3px 20px rgba(0,0,0,.4);
  display: inline-block;
  height: fit-content;
  margin: 15px 10px;
  padding: 0;
  position: relative;
  text-align: left;
  text-align: initial;

}

.large-card .content-wrapper {
  background-color: #1a203c;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  position: relative;
}


.large-card .picture-wrapper {
  padding: 20px 10px;
  border-top-left-radius: 40px;
  border-top-right-radius:40px;
  position: relative;
}


*, :after, :before {
  box-sizing: border-box;
}
</style>