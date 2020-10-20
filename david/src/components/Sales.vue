<template>
  <div class="Sales">
    <router-link to="/MarketPlace">
      <div class="Breadcrumbs grey-color"><h2>Return to Market</h2></div>
    </router-link>
    <h1>your id is {{ id }}</h1>
    <p>{{list}}</p>
    <router-view></router-view>
  </div>
</template>

<script>
import router from '../router'
import axios from "axios";

export default {
  name: 'Page2',
  data () {
    return {
      id: 0,
      list:undefined
    }
  },

  mounted(){
    axios.post('https://wax.api.atomicassets.io/atomicmarket/v1/sales/'+this.id).then((resp)=>{
      this.list=resp.data.data;
      console.log(this.list)
    })
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

