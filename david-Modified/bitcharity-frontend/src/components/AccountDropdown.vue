<template>
  <div class="dropdown">
    <b-dropdown class="account-dropdown" :text="this.getWax.userAccount">
      <b-dropdown-item :to="{ name: 'Profile', params: { account_name:this.getWax.userAccount, tab:'inventory' }}">Inventory</b-dropdown-item>
      <b-dropdown-item :to="{ name: 'Profile', params: { account_name:this.getWax.userAccount, tab:'listings' }}">My Sales</b-dropdown-item>
      <b-dropdown-item>Notify Me</b-dropdown-item>
      <b-dropdown-item @click="logout">Logout</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountDropdown',
  computed: {
    ...mapGetters([
      'getWax'
    ])
  },
  methods: {
    logout() {
      this.$store.commit('clearWax')
      if(this.$router.currentRoute.path!='/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
</style>
