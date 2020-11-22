<template>
  <div class="profile">
  <div>
    <div v-if='this.getWax!=""'>
      <h2>{{ this.getWax.userAccount }}</h2>
      <a class="bloks-link" :href="bloksURL" target="_blank">View on Bloks</a>
      <b-tabs class="tab" v-model="tabIndex" content-class="profile-tabs">
        <b-tab @click="setInventoryTab" title="Inventory"><Inventory :account_name="account_name"/></b-tab>
        <b-tab @click="setSalesTab" title="Active Sales"><ActiveSales :account_name="account_name"/></b-tab>
        <b-tab title="Sold"></b-tab>
        <b-tab title="Bought"></b-tab>
        <b-tab title="Collections"></b-tab>
        <b-tab title="Watchlist"></b-tab>
        <b-tab title="Friends"></b-tab>
      </b-tabs>
    </div>
    <div v-else>
      <p>Please log in first</p>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Inventory from '@/components/Inventory.vue'
import ActiveSales from '@/components/ActiveSales.vue'

export default {
  name: 'Profile',
  props: ['account_name', 'tab'],
  components: {
    Inventory,
    ActiveSales
  },
  data () {
    return {
      tabIndex: 0,
      bloksBaseURL: "https://wax.bloks.io/account/",
    }
  },
  watch: {
    tab: function(val){
      //console.log(val)
      if(val == "inventory") {
        this.tabIndex = 0
      }
      else if(val == "listings") {
        this.tabIndex = 1
      }
    }
  },
  mounted () {
    if (this.getWax == "") {
      this.$router.push('/explorer/account/'+ this.account_name)
    }
    if(this.tab == "inventory") {
        this.tabIndex = 0
      }
      else if(this.tab == "listings") {
        this.tabIndex = 1
      }
  },
  methods: {
    setInventoryTab: function () {
      if(this.tab != "inventory") {
        this.$router.push('/profile/' + this.account_name + '/inventory')
      }
    },
    setSalesTab: function () {
      if(this.tab != "listings") {
        this.$router.push('/profile/' + this.account_name + '/listings')
      }
    },
  },
  computed: {
    ...mapGetters([
      'getWax'
    ]),
    bloksURL: function() {
      return this.bloksBaseURL + this.getWax.userAccount
    }
  },
}
</script>


<style scoped>
.profile {
  margin-left: 20%;
  max-width: 60%;
  color: grey;
  /*background-color: #eeeeee;*/
}

.bloks-link {
  color: orange;
}

.tab {
  font-size: 15px;
}
</style>