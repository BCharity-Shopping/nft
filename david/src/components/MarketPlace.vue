<template>
  <div class="main-block w-100">
    <div class="row">
        <div class="grid text-center px-0 MobileCardDesign">
          <div v-for="item in list" :key="item.asset_id">
            <div class="large-card">
              <div class="picture-wrapper">
                <b-card>
                  <b-card-img v-bind:src="'https://ipfs.io/ipfs/'+item.assets[0].data.img" style="height: 150px">
                  </b-card-img>
                </b-card>
                <b-card-text>
                  <p style="font-size: 15px">{{item.price.amount}}&nbsp;{{item.price.token_symbol}}</p><br>
                  <p>{{item.assets[0].name}}</p>
                </b-card-text>
              </div>
            </div>

          </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.truncate-with-css-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

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
    axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales').then((resp)=>{
          this.list=resp.data.data;
          console.log(resp)
        })
  }
}
</script>
