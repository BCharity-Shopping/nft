<template>
  <div class="creator">
    <div v-if='this.getWax==""'>
      <p>Please login to view this page</p>
      <Login/>
    </div>
    <div v-else>
      <h1>Creator</h1>
      <hr>
      <b-button variant="warning" :to="`/creator/createcollection`">Create New Collection</b-button>
      <hr>
      <AuthorizedCollections/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
import AuthorizedCollections from '@/components/AuthorizedCollections.vue'
export default {
  name: 'Creator',
  components: {
    Login,
    AuthorizedCollections,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getWax'
    ]),
  },
}
</script>

<style scoped>
.creator {
  margin-left: 15%;
  max-width: 70%;
  /*background-color: #eeeeee;*/
}
</style>