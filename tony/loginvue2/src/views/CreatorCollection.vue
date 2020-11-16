<template>
  <div class="creator-collection">
    <div v-if='this.getWax==""'>
      <Login/>
    </div>
    <div v-else>
      <h1>Collection: {{$route.params.collection_name}}</h1>
      <b-button variant="info" :to="`/creator/collection/${$route.params.collection_name}/schema/series1`">series1</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
export default {
  name: 'CreatorCollection',
  components: {
    Login,
  },
  computed: {
    ...mapGetters([
      'getWax'
    ])
  }
}
</script>
