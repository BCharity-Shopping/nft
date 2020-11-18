<template>
  <div>
    <b-modal ref='success-modal' hide-footer title="Transaction Successful">
      <p>Transaction ID: <a class="bloks-link" :href="bloksURL" target="_blank">{{ this.shortTID }}</a></p>
      <b-button class="success-close-button" @click="hideSuccessModal">Close</b-button>
    </b-modal>

    <b-modal ref='failed-modal' hide-footer title="Transaction Failed">
      <p>{{ this.res }}</p>
      <b-button class="failed-close-button" @click="hideFailedModal">Close</b-button>
    </b-modal>

    <b-modal ref='signing-modal' hide-footer title="Creating Your Transaction">
      <b-spinner type="border" variant="secondary"></b-spinner>
      <p>Please confirm the transaction in your Wallet.</p>
    </b-modal>

  </div>
</template>

<script>
import { bus } from '../event-bus.js';
export default {
  name: "TransactionStatusModal",
  data () {
    return {
      transaction_id: "",
      result: "",
      bloksBaseURL: "https://wax.bloks.io/transaction/",
    }
  },
  computed: {
    tID: function() {
      return this.transaction_id
    },
    shortTID: function() {
      if(this.transaction_id.length>9){
        return this.transaction_id.substring(0,9)
      }
      return this.transaction_id
    },
    bloksURL: function() {
      return this.bloksBaseURL + this.transaction_id
    },
    res: function() {
      return this.result
    }
  },
  methods: {
    showSuccessModal(){
      this.$refs['success-modal'].show()
    },
    showFailedModal(){
      this.$refs['failed-modal'].show()
    },
    showSigningModal(){
      this.$refs['signing-modal'].show()
    },
    hideSuccessModal(){
      this.$refs['success-modal'].hide()
    },
    hideFailedModal(){
      this.$refs['failed-modal'].hide()
    },
    hideSigningModal(){
      this.$refs['signing-modal'].hide()
    },
  },
  created () {
    bus.$on('createSuccess', (data) => {
      this.transaction_id = data
      this.hideSigningModal()
      this.showSuccessModal()
      bus.$emit('updateHTML')
    }),
    bus.$on('createFailed', (data) => {
      this.result = data
      this.hideSigningModal()
      this.showFailedModal()
    }),
    bus.$on('signing', () => {
      this.showSigningModal()
    })
  },
  destroyed () {
    bus.$off('createSuccess', (data) => {
      this.transaction_id = data
      this.hideSigningModal()
      this.showSuccessModal()
      bus.$emit('updateHTML')
    }),
    bus.$off('createFailed', (data) => {
      this.result = data
      this.hideSigningModal()
      this.showFailedModal()
    }),
    bus.$off('signing', () => {
      this.showSigningModal()
    })
  }
}
</script>

<style scoped>
.success-close-button {
  background-color: chartreuse;
}

.failed-close-button {
  background-color: crimson;
}
</style>