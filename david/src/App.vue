<template>
  <div id="app">
    <h1>Fetch data with API</h1>
    <EmployeeList />
  </div>
</template>
<script>
  import EmployeeList from './components/employee'
  export default {
      name: "App",
      components: {
        EmployeeList
      }
    }
</script>

<style>
</style>
