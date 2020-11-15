<template>
  <div id="edit-sale">
    <b-button id="edit-button" variant="warning" @click="showModal">Edit</b-button>
    <b-modal ref='edit-sale-modal' hide-footer title="Manage Sale">
      <div class="d-block">
      </div>
      <CancelSale :saleID="saleID"/>
      <hr>
      <EditSalePrice :listingPrice="this.listingPrice" :saleID="this.saleID" :assetID="this.assetID" :collectionFee="this.collectionFee"/>
    </b-modal>
  </div>
</template>

<script>
import { bus } from '../main.js';
import CancelSale from '@/components/CancelSale.vue'
import EditSalePrice from '@/components/EditSalePrice.vue'
export default {
  name: 'EditSaleModal',
  props: ['listingPrice', 'saleID', 'assetID', 'collectionFee'],
  components: {
    CancelSale,
    EditSalePrice,
  },
  methods: {
    showModal() {
      this.$refs['edit-sale-modal'].show()
    },
    hideModal() {
      this.$refs['edit-sale-modal'].hide()
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
#edit-button {
  margin-top: 10px;
  width: 90px;
  height: 40px;
}
</style>