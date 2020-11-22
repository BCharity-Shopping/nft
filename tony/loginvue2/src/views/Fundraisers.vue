<template>
  <div class="discover">
    <h1>Browse Campaigns</h1>
    <ActiveFundraisers/>
  </div>
</template>

<script>
import ActiveFundraisers from '@/components/ActiveFundraisers.vue'
export default {
  name: 'Fundraisers',
  components: {
    ActiveFundraisers,
  },
}
</script>

<style scoped>
.discover {
  margin-left: 20%;
  max-width: 60%;
  /*background-color: wheat;*/
}
</style>