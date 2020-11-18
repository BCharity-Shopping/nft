<template>
  <div id="list-sale">
    <b-button id="listing-button" variant="success" @click="showModal">List on Market</b-button>

    <b-modal ref='list-sale-modal' hide-footer title="Create Listing">
      <div class="d-block">
      </div>
      <CreateSale :assetID="this.assetID" :collectionFee="this.collectionFee"/>
    </b-modal>

  </div>
</template>

<script>
import { bus } from '../event-bus.js';
import CreateSale from '@/components/CreateSale.vue'
export default {
  name: 'CreateSaleModal',
  props: ['assetID', 'collectionFee'],
  components: {
    CreateSale,
  },
  methods: {
    showModal() {
        this.$refs['list-sale-modal'].show()
    },
    hideModal() {
      if(this.$refs['list-sale-modal']!=null)
        this.$refs['list-sale-modal'].hide()
    }
  },
  created () {
    bus.$on('signing', () => {
      this.hideModal()
    })
  },
  destroyed () {
    bus.$off('signing', () => {
      this.hideModal()
    })
  }
}
</script>

<style scoped>
#listing-button {
  margin-top: 10px;
  height: 40px;
}
</style>
