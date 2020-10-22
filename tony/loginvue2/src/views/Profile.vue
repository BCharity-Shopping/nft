<template>
  <div class="profile">
    <h1>{{ id }} Profile Page</h1>
  <div>
    <b-tabs v-model="tabIndex" content-class="profile-tabs">
      <b-tab @click="setInventoryTab" title="Inventory">Inventory...</b-tab>
      <b-tab @click="setSalesTab" title="Active Sales">Sales...</b-tab>
    </b-tabs>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: ['id', 'tab'],
  data () {
    return {
      tabIndex: 0
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
    if(this.tab == "inventory") {
        this.tabIndex = 0
      }
      else if(this.tab == "sales") {
        this.tabIndex = 1
      }
  },
  methods: {
    setInventoryTab: function () {
        this.$router.push('/profile/' + this.id + '/inventory')
    },
    setSalesTab: function () {
        this.$router.push('/profile/' + this.id + '/sales')
    }
  }
}
</script>
