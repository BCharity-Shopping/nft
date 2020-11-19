<template>
  <div class="authorized-collections">
    <div class="card" v-for="col in colls" :key="col.collection_name">
      <img v-if="col.collection_image!=null" v-bind:src="ipfs + col.collection_image" width="80%">
      {{col.collection_name}}
      <div class="view-collection-button">
        <b-button :to="`/creator/collection/${col.collection_name}`" variant="info">View Collection</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
export default {
  name: 'AuthorizedCollections',
  components: {
  },
  data () {
    return {
      baseURL: "https://wax.api.atomicassets.io/atomicassets/v1/collections?page=1&limit=100&order=desc&sort=created",
      result: "",
      authorizedCollections: [],
      ipfs: "http://ipfs.io/ipfs/",
    }
  },
  computed: {
    ...mapGetters([
      'getWax'
    ]),
    url: function() {
      return this.baseURL + "&authorized_account=" + this.getWax.userAccount
    },
    colls: function() {
      let colArray = []
      if(this.result!="" && this.result.data.success==true) {
        this.result.data.data.forEach(collection => {
          let col = {"collection_name":collection.collection_name,"collection_image":collection.img}
          colArray.push(col)
        });
      }
      //console.log(colArray)
      return colArray
    }
  },
  methods: {
    printResult() {
      console.log(this.result.data.success)
    }
  },
  mounted () {
    //console.log("API URL: " + this.url)
    axios
      .get(this.url)
      .then(response => (this.result = response))
  },
}
</script>

<style scoped>
.authorized-collections {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  margin-bottom : 10px;
  width: 250px;
  height: 290px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-end;
  /*background-color: #666699;*/
  box-shadow: 0px 0px 10px 1px #262626;
  margin-top: 10px;
  color: grey;
  border-radius: 15px;
}

.view-collection-button {
  width: 100%;
  margin-bottom: 10px;
}
</style>