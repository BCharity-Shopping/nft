<template>
  <div>
    <h1>MarketPlace</h1>
    <table border="1px">
      <tr>
        <th>asset_id</th>
        <th>name</th>
        <th>schema</th>
        <th>minted_at_time</th>
      </tr>
      <tr v-for="item in list" v-bind:key="item.asset_id">
        <td>{{item.asset_id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.schema}}</td>
        <td>{{item.minted_at_time}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:"EmployeeList",
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
