<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">BitCharity</a>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="MarketPlace">Market Place</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import Vue from 'vue'
  import { BootstrapVue,IconsPlugin } from 'bootstrap-vue'
  Vue.use(BootstrapVue)
  Vue.use(IconsPlugin)
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min.js'
  export default {
    name:"Navbar",
  }
</script>
