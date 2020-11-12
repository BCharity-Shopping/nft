<template>
  <div class="new-offer">
    <div v-if='this.getWax==""'>
      <p>Please login to view this page</p>
      <Login/>
    </div>
    <div v-else>
      <h1>New Offer</h1>
      <b-button variant="warning">Send Trade Offer</b-button>
      <div class="sender">
        <TradeOffer :account_name="this.getWax.userAccount"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
import TradeOffer from '@/components/TradeOffer.vue'
export default {
  name: 'New-Offer',
  components: {
    TradeOffer,
    Login,
  },
  computed: {
    ...mapGetters([
      'getWax'
    ])
  }
}
</script>

<style scoped>
.new-offer {
  margin-left: 15%;
  background-color: rgb(255, 243, 227);
  max-width: 70%;
}

.sender {
  max-width: 45%;
  background-color: rgb(230, 254, 255);
}
</style>