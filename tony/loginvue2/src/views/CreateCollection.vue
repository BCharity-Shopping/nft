<template>
  <div class="create-collection">
    <h1>Create Collection</h1>
    <hr>
    <label for="collection_name">Collection Name (12 Characters, 1-5 & a-z)</label>
    <input v-model="collection_name" id="collection_name">
    <br>
    <label for="image">Collection Image Hash</label>
    <input v-model="image" id="image">
    <br>
    <label for="display_name">Display Name</label>
    <input v-model="display_name" id="display_name">
    <br>
    <label for="website_url">Website URL</label>
    <input v-model="website_url" id="website_url">
    <br>
    <label for="collection_description">Collection Description</label>
    <input v-model="collection_description" id="collection_description">
    <br>
    <label for="market_fee">Market Fee (0%-15%)</label>
    <input v-model="mkt_fee" type="number" max=15 min=0 id="market_fee">
    <br>
    <br>
    <label>Authorized Accounts</label>
    <br>
    <input :value="getWax.userAccount" disabled>
    <br>
    <div v-for="aacc in auth_acc" :key="'a'+aacc.index" :id="'authorized-'+aacc.index">
      <input :id="'authorized-account-'+aacc.index">
      <b-button :id="'authorized-remove-'+aacc.index" @click="removeAuthorizedAccount(aacc.index)" variant="danger">-</b-button>
    </div>
    <b-button @click="addAuthorizedAccount" variant="primary">+</b-button>
    <br>
    <br>
    <label>Notify Accounts</label>
    <br>
    <div v-for="nacc in noti_acc" :key="'n'+nacc.index" :id="'notify-'+nacc.index">
      <input :id="'notify-account-'+nacc.index">
      <b-button :id="'notify-remove-'+nacc.index" @click="removeNotifyAccount(nacc.index)" variant="danger">-</b-button>
    </div>
    <b-button @click="addNotifyAccount" variant="primary">+</b-button>
    <hr>
    <b-button @click="createCollection" variant="success">Create Collection</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../event-bus.js';
export default {
  name: 'CreateCollection',
  data () {
    return {
      collection_name: "",
      image: "",
      display_name: "",
      website_url: "",
      collection_description: "",
      market_fee: 0,
      mkt_fee: 5,
      authorized_accounts: [],
      auth_acc: [],
      auth_index: 0,
      notify_accounts: [],
      noti_acc: [],
      noti_index: 0,
      data: [],
    }
  },
  mounted () {
    this.collection_name = ""
    this.image = ""
    this.display_name = ""
    this.website_url = ""
    this.collection_description = ""
    this.market_fee = 0
    this.mkt_fee = 5
    this.authorized_accounts = []
    this.auth_acc = []
    this.auth_index = 0
    this.notify_accounts = []
    this.noti_acc = []
    this.noti_index = 0
    this.data = []
  },
  methods: {
    removeAuthorizedAccount(index) {
      for(let i = 0; i<this.auth_acc.length; i++) {
        if(this.auth_acc[i].index == index) {
          let div = document.getElementById("authorized-"+i)
          div.remove()
        }
      }
    },
    removeNotifyAccount(index) {
      for(let i = 0; i<this.noti_acc.length; i++) {
        if(this.noti_acc[i].index == index) {
          let div = document.getElementById("notify-"+i)
          div.remove()
        }
      }
    },
    createCollection() {
      this.data = []

      if(this.display_name!="") {
        let nameValue = ["string",this.display_name]
        this.data.push({"key":"name","value":nameValue})
      }
      if(this.collection_description!="") {
        let descriptionValue = ["string",this.collection_description]
        this.data.push({"key":"description","value":descriptionValue})
      }
      if(this.website_url!="") {
        let urlValue = ["string",this.website_url]
        this.data.push({"key":"url","value":urlValue})
      }
      if(this.image != "") {
        let imageValue = ["string",this.image]
        this.data.push({"key":"img","value":imageValue})
      }
      
      this.authorized_accounts = [this.getWax.userAccount]
      for(let i = 0; i<this.auth_index; i++) {
        let acc = document.getElementById("authorized-account-"+i)
        if(acc!=null && acc.value!="") {
          this.authorized_accounts.push(acc.value)
        }
      }

      this.notify_accounts = []
      for(let i = 0; i<this.auth_index; i++) {
        let acc = document.getElementById("notify-account-"+i)
        if(acc!=null && acc.value!="") {
          this.notify_accounts.push(acc.value)
        }
      }

      this.market_fee = this.mkt_fee/100
      this.createcol()
    },
    addAuthorizedAccount() {
      this.auth_acc.push({index: this.auth_index})
      this.auth_index++
    },
    addNotifyAccount() {
      this.noti_acc.push({index: this.noti_index})
      this.noti_index++
    },
    async createcol() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: [{
            account: 'atomicassets',
            name: 'createcol',
            authorization: [{
              actor: this.getWax.userAccount,
              permission: 'active',
            }],
            data: {
              author: this.getWax.userAccount,
              collection_name: this.collection_name,
              allow_notify: true,
              authorized_accounts: this.authorized_accounts,
              notify_accounts: this.notify_accounts,
              market_fee: this.market_fee,
              data: this.data
            },
          }]
        }, {
          blocksBehind: this.getBlocksBehind,
          expireSeconds: this.getExpireSeconds
        })
        bus.$emit('createSuccess',this.result.transaction_id)
      }
      catch (e) {
        bus.$emit('createFailed',e)
      }
    },
  },
  computed: {
    ...mapGetters([
      'getWax',
      'getBlocksBehind',
      'getExpireSeconds',
    ])
  }
}
</script>

<style scoped>
.create-collection {
  width: 70%;
  margin-left: 15%;
  background-color: #eeeeee;
}
</style>