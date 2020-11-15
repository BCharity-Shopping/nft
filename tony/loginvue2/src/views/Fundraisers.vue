<template>
  <div class="discover">
    <h1>Browse Fundraisers</h1>
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
  margin-left: 15%;
  max-width: 70%;
  background-color: wheat;
}
</style>