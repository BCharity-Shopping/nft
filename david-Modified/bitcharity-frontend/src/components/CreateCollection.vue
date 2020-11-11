<template>
    <div>
        <p>Create Collection</p>
        <p>{{getWax}}</p>
        <input v-model="Collection_name" placeholder="Collection name">
        <input v-model="Display_name" placeholder="Display name">
        <input v-model="WebURL" placeholder="Web URL">
        <input v-model="Collection_Description" placeholder="Collection Description">
        <input v-model="market_fee" placeholder="market fee">
        <input v-model="authorized_accounts" placeholder="authorized account ">
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
            authorized_accounts:[this.$store.getters.getWax.userAccount],
            notified_accounts:[],
            market_fee:""
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
       async CreateCollection(){
            if(!this.getWax.api){
               return console.log("Need to login first")
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
                        notify_accounts:this.notified_accounts,
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
