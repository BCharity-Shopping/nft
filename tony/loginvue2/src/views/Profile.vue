<template>
  <div class="profile">
  <div>
    <div v-if='wax!=""'>
    <h2>{{ wax.userAccount }}</h2>
    <b-tabs class="tab" v-model="tabIndex" content-class="profile-tabs">
      <b-tab @click="setInventoryTab" title="Inventory"><Inventory :account_name="account_name"/></b-tab>
      <b-tab @click="setSalesTab" title="Active Sales"><ActiveSales :account_name="account_name"/></b-tab>
    </b-tabs>
    </div>
    <div v-else>
      <p>Please log in first</p>
    </div>
  </div>
  </div>
</template>

<script>
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
      wax: "",
    }
  },
  watch: {
    tab: function(val){
      //console.log(val)
      if(val == "inventory") {
        this.tabIndex = 0
      }
      else if(val == "sales") {
        this.tabIndex = 1
      }
    }
  },
  mounted () {
    this.wax = this.$store.getters.getWax
    if (this.wax == "") {
      this.$router.push('/explorer/account/'+ this.account_name)
    }
    if(this.tab == "inventory") {
        this.tabIndex = 0
      }
      else if(this.tab == "sales") {
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
      if(this.tab != "sales") {
        this.$router.push('/profile/' + this.account_name + '/sales')
      }
    }
  },
}
</script>


<style scoped>
.profile {
  margin-left: 15%;
  justify-content: center;
  align-content: center;
  max-width: 70%;
}
</style>