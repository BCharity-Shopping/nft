<template>
  <div class="new-offer">
    <div v-if='this.getWax==""'>
      <p>Please login to view this page</p>
      <Login/>
    </div>
    <div v-else>
      <h1>New Offer</h1> 
      <b-button variant="warning" @click="sendOffer">send Trade Offer</b-button>
      <input v-model="recipient" placeholder="Recepient">
      <div class="offers">
        <div class="sender">
          <TradeOffer ref="TradeOffer" :key="this.getWax.userAccount" :account_name="this.getWax.userAccount" role="sender"/>
        </div>
        <div class="recipient">
          <TradeOffer ref="TradeOffer" :key="this.recipient" :account_name="this.recipient" role="recipient"/>
        </div>
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
  data () {
    return {
      recipient: "",
      selectedAssets:[]
    }
  },
  computed: {
    ...mapGetters([
      'getWax'
    ])
  },
  methods: {
    sendOffer:function(){
      this.selectedAssets=this.$refs.TradeOffer.click();
      console.log(this.selectedAssets);
      this.recipient=this.selectedAssets[this.selectedAssets.length-1].accountName;
      console.log("it is choosed "+this.recipient);
      this.selectedAssets.pop(this.selectedAssets[1]);
      console.log(this.selectedAssets);

    }
  }
}
</script>

<style scoped>
.new-offer {
  margin-left: 15%;
  background-color: rgb(255, 243, 227);
  max-width: 70%;
}
.offers {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.sender {
  max-width: 45%;
  min-width: 45%;
  background-color: rgb(230, 254, 255);
}
.recipient {
  max-width: 45%;
  min-width: 45%;
  background-color: rgb(230, 254, 255);
}
</style>