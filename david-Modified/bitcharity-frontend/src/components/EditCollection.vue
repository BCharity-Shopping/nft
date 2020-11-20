<template>
  <div class="edit-collection">
    <h1>Collection: {{$route.params.collection_name}}</h1>
    <hr>
    <label for="image">Collection Image Hash</label>
    <input id="image" :value="collection.data.img">
    <br>
    <label for="display_name">Display Name</label>
    <input id="display_name" :value="collection.data.name">
    <br>
    <label for="website_url">Website URL</label>
    <input id="website_url" :value="collection.data.url">
    <br>
    <label for="collection_description">Collection Description</label>
    <input id="collection_description" :value="collection.data.description">
    <br>
    <label for="market_fee">Market Fee (0%-15%)</label>
    <input type="number" max=15 min=0 id="market_fee" :value="collection.market_fee*100">
    <br>
    <br>

    <label>Authorized Accounts</label>
    <br>
    <!--loop through each account in the collection's authorized accounts-->
    <div v-for="acc in collection.authorized_accounts" :key="'a'+acc" :id="'authorized-'+acc">
      <input class="authorized_accounts" :id="'authorized-account-'+acc" :value="acc">
      <b-button @click="removeExistAuthAcc(acc)" variant="danger">-</b-button>
    </div>
    <!--loop through auth_acc array and create a div for every added element-->
    <div v-for="aacc in auth_acc" :key="'a'+aacc.index" :id="'authorized-'+aacc.index">
      <input :id="'authorized-account-'+aacc.index">
      <b-button @click="removeAuthorizedAccount(aacc.index)" variant="danger">-</b-button>
    </div>
    <b-button @click="addAuthorizedAccount" variant="primary">+</b-button>

    <br>
    <br>

    <label>Notify Accounts</label>
    <br>
    <!--loop through each account in the collection's notify accounts-->
    <div v-for="acc in collection.notify_accounts" :key="'n'+acc" :id="'notify-'+acc">
      <input class="notify_accounts" :id="'notify-account-'+acc" :value="acc">
      <b-button @click="removeExistNotiAcc(acc)" variant="danger">-</b-button>
    </div>
    <!--loop through noti_acc array and create a div for every added element-->
    <div v-for="nacc in noti_acc" :key="'n'+nacc.index" :id="'notify-'+nacc.index">
      <input :id="'notify-account-'+nacc.index">
      <b-button @click="removeNotifyAccount(nacc.index)" variant="danger">-</b-button>
    </div>
    <b-button @click="addNotifyAccount" variant="primary">+</b-button>

    <hr>
    <b-button v-if="edit" variant="warning" @click="updateCollection" id="update-button">Update Collection</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../event-bus.js';
export default {
  name: 'CreatorCollection',
  props: ['collection','edit'],
  components: {
  },
  data () {
    return {
      image: "",
      display_name: "",
      website_url: "",
      collection_description: "",
      market_fee: 0,
      authorized_accounts: [],
      auth_acc: [],
      auth_index: 0,
      notify_accounts: [],
      noti_acc: [],
      noti_index: 0,
      data: [],
      actions: [],
      add_auth: [],
      rem_auth: [],
      add_noti: [],
      rem_noti: [],
    }
  },
  mounted () {
    this.image = ""
    this.display_name = ""
    this.website_url = ""
    this.collection_description = ""
    this.market_fee = 0
    this.authorized_accounts = []
    this.auth_acc = []
    this.auth_index = 0
    this.notify_accounts = []
    this.noti_acc = []
    this.noti_index = 0
    this.data = []
    this.actions = []
    this.add_auth = []
    this.rem_auth = []
    this.add_noti = []
    this.rem_noti = []
  },
  methods: {
    addAuthorizedAccount() {
      this.auth_acc.push({index: this.auth_index})
      this.auth_index++
    },
    addNotifyAccount() {
      this.noti_acc.push({index: this.noti_index})
      this.noti_index++
    },
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
    removeExistAuthAcc(acc) {
      document.getElementById("authorized-"+acc).remove()
    },
    removeExistNotiAcc(acc) {
      document.getElementById("notify-"+acc).remove()
    },
    updateCollection() {
      this.actions = []
      /**
       * Handles setcoldata action
       * Get the 4 fields' value: image, display name, website url, and collection description
       * and add them to setcoldata action
       */
      this.data = []
      this.image = document.getElementById("image").value
      if(this.image!="") {
        let imageValue = ["string",this.image]
        this.data.push({"key":"img","value":imageValue})
      }
      this.display_name = document.getElementById("display_name").value
      if(this.display_name!="") {
        let nameValue = ["string",this.display_name]
        this.data.push({"key":"name","value":nameValue})
      }
      this.website_url = document.getElementById("website_url").value
      if(this.website_url!="") {
        let urlValue = ["string",this.website_url]
        this.data.push({"key":"url","value":urlValue})
      }
      this.collection_description = document.getElementById("collection_description").value
      if(this.collection_description!="") {
        let descriptionValue = ["string",this.collection_description]
        this.data.push({"key":"description","value":descriptionValue})
      }
      this.actions.push({
        account: 'atomicassets',
        name: 'setcoldata',
        authorization: [{
          actor: this.getWax.userAccount,
          permission: 'active',
        }],
        data: {
          collection_name: this.$route.params.collection_name,
          data: this.data
        },
      })
      /**
       * Sets up new authorized accounts list that will be used in comparison
       * with the old authorized accounts list from the prop
       */
      this.authorized_accounts = []
      for(let i = 0; i<this.collection.authorized_accounts.length; i++) {
        let aa = document.getElementById("authorized-account-"+this.collection.authorized_accounts[i])
        if(aa!=null && aa.value!="" && !this.authorized_accounts.includes(aa.value)) {
          this.authorized_accounts.push(aa.value)
        }
      }
      for(let i = 0; i<this.auth_index; i++) {
        let aa = document.getElementById("authorized-account-"+i)
        if(aa!=null && aa.value!="" && !this.authorized_accounts.includes(aa.value)) {
          this.authorized_accounts.push(aa.value)
        }
      }
      console.log("old list: " + this.collection.authorized_accounts)
      console.log("new list: " + this.authorized_accounts)
      /**
       * Handles addcolauth action
       */
      this.add_auth = []
      this.authorized_accounts.forEach(acc => {
        if(!this.collection.authorized_accounts.includes(acc)) {
          this.add_auth.push(acc)
        }
      });
      this.add_auth.forEach(acc => {
        this.actions.push({
        account: 'atomicassets',
        name: 'addcolauth',
        authorization: [{
          actor: this.getWax.userAccount,
          permission: 'active',
        }],
        data: {
          collection_name: this.$route.params.collection_name,
          account_to_add: acc
        },
      })
      });
      console.log("add auth: " + this.add_auth)
      /**
       * Handles remocolauth action
       */
      this.rem_auth = []
      this.collection.authorized_accounts.forEach(acc => {
        if(!this.authorized_accounts.includes(acc)) {
          this.rem_auth.push(acc)
        }
      });
      this.rem_auth.forEach(acc => {
        this.actions.push({
        account: 'atomicassets',
        name: 'remcolauth',
        authorization: [{
          actor: this.getWax.userAccount,
          permission: 'active',
        }],
        data: {
          collection_name: this.$route.params.collection_name,
          account_to_remove: acc
        },
      })
      });
      console.log("rem auth: " + this.rem_auth)
      /**
       * Sets up new authorized accounts list that will be used in comparison
       * with the old authorized accounts list from the prop
       */
      this.notify_accounts = []
      for(let i = 0; i<this.collection.notify_accounts.length; i++) {
        let aa = document.getElementById("notify-account-"+this.collection.notify_accounts[i])
        if(aa!=null && aa.value!="" && !this.notify_accounts.includes(aa.value)) {
          this.notify_accounts.push(aa.value)
        }
      }
      for(let i = 0; i<this.noti_index; i++) {
        let aa = document.getElementById("notify-account-"+i)
        if(aa!=null && aa.value!="" && !this.notify_accounts.includes(aa.value)) {
          this.notify_accounts.push(aa.value)
        }
      }
      console.log("old list: " + this.collection.notify_accounts)
      console.log("new list: " + this.notify_accounts)
      /**
       * Handles addnotifyacc action
       */
      this.add_noti = []
      this.notify_accounts.forEach(acc => {
        if(!this.collection.notify_accounts.includes(acc)) {
          this.add_noti.push(acc)
        }
      });
      this.add_noti.forEach(acc => {
        this.actions.push({
        account: 'atomicassets',
        name: 'addnotifyacc',
        authorization: [{
          actor: this.getWax.userAccount,
          permission: 'active',
        }],
        data: {
          collection_name: this.$route.params.collection_name,
          account_to_add: acc
        },
      })
      });
      console.log("add noti: " + this.add_noti)
      /**
       * Handles remnotifyacc action
       */
      this.rem_noti = []
      this.collection.notify_accounts.forEach(acc => {
        if(!this.notify_accounts.includes(acc)) {
          this.rem_noti.push(acc)
        }
      });
      this.rem_noti.forEach(acc => {
        this.actions.push({
        account: 'atomicassets',
        name: 'remnotifyacc',
        authorization: [{
          actor: this.getWax.userAccount,
          permission: 'active',
        }],
        data: {
          collection_name: this.$route.params.collection_name,
          account_to_remove: acc
        },
      })
      });
      console.log("rem auth: " + this.rem_noti)
      this.setcoldata()
    },
    async setcoldata() {
      if(!this.getWax.api) {
        return console.log("Need to Login first")
      }
      try {
        bus.$emit('signing')
        this.result = await this.getWax.api.transact({
          actions: this.actions
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