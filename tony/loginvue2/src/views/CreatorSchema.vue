<template>
  <div class="creator-schema">
    <div v-if='this.getWax==""'>
      <Login/>
    </div>
    <div v-else>
      <h1>Schema: {{$route.params.schema_name}}</h1>
      <b-button variant="info" :to="`/creator/collection/${$route.params.collection_name}/schema/${$route.params.schema_name}/createAsset`">Mint New Asset</b-button>
      <b-button variant="info" :to="`/creator/collection/${$route.params.collection_name}/schema/${$route.params.schema_name}/createTemplate`">Create New Template</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
export default {
  name: 'CreatorSchema',
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
