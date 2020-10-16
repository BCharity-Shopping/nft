<template>
  <div>
    <b-card-group deck>
      <div v-for="item in list" :key="item.asset_id">
      <b-card :title="item.name" v-bind:img-src="'https://ipfs.io/ipfs/'+item.data.img" class="picture scaleDownImg">
        <b-card-text>
         {{item.asset_id}}<br />
          {{item.owner}}
        </b-card-text>
        <b-button variant="outline-primary">Info</b-button>
        <b-button variant="outline-primary">button</b-button>
      </b-card>
      </div>
    </b-card-group>
  </div>
</template>
<style scoped>
.picture {
  width: 130px;
  height: 156px;
  overflow: hidden;
  display: table-cell;
  vertical-align: middle;

}

.scaleDownImg{
  object-fit: cover;
}
</style>

<script>
import Vue from 'vue'
import { BootstrapVue,IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name:"marketplace",
  data(){
    return {list:undefined}
  },
  mounted(){
    axios.get('https://wax.api.atomicassets.io/atomicassets/v1/assets').then((resp)=>{
          this.list=resp.data.data;
          console.log(resp)
        })
  }
}
</script>
