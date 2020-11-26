<template>
  <div class="login-button">
    <b-button @click="login">Login</b-button>
  </div>
</template>


<script>
import * as waxjs from "@waxio/waxjs/dist"
export default {
  name: 'Login',
  data() {
    return {
      wax: ""
    }
  },
  methods: {
    
  },
}
</script>