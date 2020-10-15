<template>
  <div>
    <h1>Employee List</h1>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:"EmployeeList",

  mounted(){
    axios.get('http://dummy.restapiexample.com/api/v1/employees').then((resp)=>{
          console.log(resp)
        })
  }
}
</script>
