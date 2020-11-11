<template>
  <div id="list-sale">
    <b-button id="listing-button" @click="showModal">List on Market</b-button>

    <b-modal ref='list-sale-modal' hide-footer title="Create Listing">
      <div class="d-block">
      </div>
      <CreateSale v-on="{ startSigning:signing, createSaleSuccess:success, createSaleFailed:failed}" :assetID="this.assetID" :collectionFee="this.collectionFee"/>
    </b-modal>

    <b-modal ref='success-modal' hide-footer title="Transaction Successful">
      <div class="d-block">
      </div>
      <p>Transaction ID:</p>
      <a class="bloks-link" :href="bloksURL" target="_blank">{{ this.shortTID }}</a>
      <b-button class="success-close-button" @click="closeSuccessModal">Close</b-button>
    </b-modal>

    <b-modal ref='failed-modal' hide-footer title="Transaction Failed">
      <div class="d-block">
      </div>
      <p>{{ this.result }}</p>
      <b-button class="failed-close-button" @click="closeFailedModal">Close</b-button>
    </b-modal>

    <b-modal ref='signing-modal' hide-footer title="Creating Your Transaction">
      <div class="d-block">
      </div>
      <p>Please confirm the transaction in your Wallet.</p>
    </b-modal>

  </div>
</template>

<script>
import CreateSale from '@/components/CreateSale.vue'
export default {
  name: 'CreateSaleModal',
  props: ['assetID', 'collectionFee'],
  components: {
    CreateSale,
  },
  data () {
    return {
      tID: "",
      res: "",
      bloksBaseURL: "https://wax.bloks.io/transaction/"
    }
  },
  methods: {
    showModal() {
      this.$refs['list-sale-modal'].show()
    },
    success(transaction_id) {
      console.log("success method")
      this.tID = transaction_id
      this.$refs['list-sale-modal'].hide()
      this.$refs['success-modal'].show()
    },
    failed(result) {
      console.log("failed method")
      this.res = result
      this.$refs['list-sale-modal'].hide()
      this.$refs['failed-modal'].show()
    },
    closeSuccessModal(){
      console.log("closeSuccessModal method")
      this.$refs['success-modal'].hide()
    },
    closeFailedModal(){
      console.log("closeFailedModal method")
      this.$refs['failed-modal'].hide()
    },
    signing(){
      this.$refs['list-sale-modal'].hide()
    }
  },
  computed: {
    transactionID: function() {
      return this.tID
    },
    result: function() {
      return this.res
    },
    bloksURL: function() {
      return this.bloksBaseURL + this.transactionID
    },
    shortTID: function() {
      return this.transactionID.substring(0,9)
    }
  }
}
</script>

<style scoped>
#listing-button {
  background-color: #2eb82e;
  box-shadow: 0px 0px 1px 1px #262626;
  margin-top: 10px;
  height: 40px;
}

.success-close-button {
  background-color: chartreuse;
}

.failed-close-button {
  background-color: crimson;
}
</style>