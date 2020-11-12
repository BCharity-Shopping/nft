<template>
  <div class="trading">
    <div v-if='this.getWax==""'>
      <p>Please login to view this page</p>
      <Login/>
    </div>
    <div v-else>
      <h1>Trading</h1>
      <div class="trading-page">
        <div class="menu-items">
          <div class="button-group">
            <b-button class="button-align-left">Inventory</b-button>
            <b-button class="button-align-left">AtomicBridge</b-button>
          </div>
          <hr class="hr">
          <div class="button-group">
            <b-button class="button-align-center" @click="gotoNewOffer">New Trade Offer</b-button>
            <b-button class="button-align-left">Active Sent Offers</b-button>
            <b-button class="button-align-left">Active Received Offers</b-button>
            <b-button class="button-align-left">Active Dapp Offers</b-button>
            <b-button class="button-align-left">Invalid Offers</b-button>
            <b-button class="button-align-left">Offer History</b-button>
          </div>
          <hr class="hr">
          <div class="button-group">
            <b-button class="button-align-center">Transfer</b-button>
            <b-button class="button-align-left">Transfer History</b-button>
          </div>
          <hr class="hr">
          <div class="button-group">
            <b-button class="button-align-center">Create Link</b-button>
            <b-button class="button-align-left">Shared Links</b-button>
            <b-button class="button-align-left">Link History</b-button>
          </div>
        </div>
        <Inventory class="inventory" :account_name="this.getWax.userAccount"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
import Inventory from '@/components/Inventory.vue'
export default {
  name: 'Trading',
  components: {
    Login,
    Inventory,
  },
  computed: {
    ...mapGetters([
      'getWax'
    ]),
  },
  methods: {
    gotoNewOffer() {
      this.$router.push('/trading/new-offer')
    }
  }
}
</script>

<style scoped>
.trading-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15%;
  max-width: 70%;
}

.menu-items {
  width: 25%;
  min-width: 300px;
  max-height: 100%;
  background-color: #ebebeb;
  
}

.button-group {
  display: flex;
  flex-direction: column;
}

.inventory {
  max-width: 70%;
  min-width: 300px;
  background-color: #ebebeb;
}

.hr {
  background-color: grey;
  height: 2px;
  border-radius: 1px;
}

.button-align-left {
  text-align: left;
  background-color: transparent;
  border-color: transparent;
  color: grey;
}

.button-align-center {
  background-color: orange;
  border-color: orange
}
</style>