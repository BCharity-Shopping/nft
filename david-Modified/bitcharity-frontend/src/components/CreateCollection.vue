<template>
    <div>
        <h1>Create Collection</h1>
        
        Collection Name(Mandatory): <input v-model="Collection_name" placeholder="Collection name">
        Display Name(Mandatory): <input v-model="Display_name" placeholder="Display name">
        WebURL: <input v-model="WebURL" placeholder="Web URL"><br>
        Collection_Description: <input v-model="Collection_Description" placeholder="Collection Description">
        Market Fee: <input v-model="market_fee" placeholder="market fee">
        <br>
        <label>Authorized Accounts</label>
        <input :value="getWax.userAccount" disabled>
        <br>
        <div v-for="aacc in auth_acc" :key="'a'+aacc.index" :id="'authorized-'+aacc.index">
            <input :id="'authorized-account-'+aacc.index">
            <b-button :id="'authorized-remove-'+aacc.index" @click="removeAuthorizedAccount(aacc.index)" variant="danger">-</b-button>
        </div>&nbsp;<br><b-button @click="addAuthorizedAccount" variant="primary">+</b-button><br>
         <br>
        <br>
            <label>Notify Accounts</label>
        <br>

         <div v-for="nacc in noti_acc" :key="'n'+nacc.index" :id="'notify-'+nacc.index">
            <input :id="'notify-account-'+nacc.index">
            <b-button :id="'notify-remove-'+nacc.index" @click="removeNotifyAccount(nacc.index)" variant="danger">-</b-button>
        </div>
        <b-button @click="addNotifyAccount" variant="primary">+</b-button>
        <br>
        <br>
        <b-button @click="CreateCollection">Create Collection</b-button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name:'CreateCollection',
    props:['wax','assetID'],
    data(){
        return{
            Collection_name:"",
            Display_name:"",
            WebURL:"",
            Collection_Description:"",
            authorized_accounts:[],
            auth_index:0,
            market_fee:"",
            auth_acc:[],
            notify_accounts: [],
            noti_acc: [],
            noti_index: 0,
        }
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      data:function(){
          var dataElement=[
              {
                  "key":"name",
                  "value":[
                      "string",
                      this.Display_name
                  ]
              }
            ];
            if(this.WebURL!=""){
                dataElement.push({
                    "key":"url",
                    "value":[
                        "string",
                        this.WebURL
                    ]

                })
            }
            if(this.Collection_Description!=""){
                dataElement.push({
                    "key":"description",
                    "value":[
                        "string",
                        this.Collection_Description
                    ]
                })
            }
            return dataElement;
        }
    },
    methods:{
         removeAuthorizedAccount(index) {
            for(let i = 0; i<this.auth_acc.length; i++) {
                if(this.auth_acc[i].index == index) {
                    let div = document.getElementById("authorized-"+i)
                    div.remove()
                }
            }
        },
        addAuthorizedAccount() {
            this.auth_acc.push({index: this.auth_index})
            this.auth_index++
        },
        addNotifyAccount() {
            this.noti_acc.push({index: this.noti_index})
            this.noti_index++
        },
        removeNotifyAccount(index) {
        for(let i = 0; i<this.noti_acc.length; i++) {
            if(this.noti_acc[i].index == index) {
            let div = document.getElementById("notify-"+i)
            div.remove()
            }
            }
        },
       async CreateCollection(){
            if(!this.getWax.api){
               return console.log("Need to login first")
            }
            this.authorized_accounts=[this.getWax.userAccount]
            for(let i=0;i<this.auth_index; i++){
                let acc=document.getElementById("authorized-account-"+i);
                if(acc!=null && acc.value!="") {
                    this.authorized_accounts.push(acc.value);
                }
            }
            this.notify_accounts=[]
            for(let i = 0; i<this.noti_index; i++) {
                let acc = document.getElementById("notify-account-"+i)
                if(acc!=null && acc.value!="") {
                    this.notify_accounts.push(acc.value)
                    console.log(acc.value)
                }
            }
           try {
               this.result=await this.getWax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'createcol',
                    authorization: [{
                        actor: this.getWax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        allow_notify:true,
                        author:this.getWax.userAccount,
                        authorized_accounts:this.authorized_accounts,
                        collection_name:this.Collection_name,
                        data:this.data,
                        market_fee:this.market_fee,
                        notify_accounts:this.notify_accounts,
                    },
                   }]
               },{
                   blocksBehind: 3,
                   expireSeconds: 30
               });
           }
           catch(e){
               this.result=e
               console.log(e)
           }       
       }
    }
}
    
</script>
