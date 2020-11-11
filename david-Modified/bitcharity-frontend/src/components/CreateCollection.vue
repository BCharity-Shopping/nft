<template>
    <div>
        <p>Create Collection</p>
        <p>{{wax}}</p>
        <input v-model="Collection_name" placeholder="Collection name">
        <input v-model="Display_name" placeholder="Display name">
        <input v-model="WebURL" placeholder="Web URL">
        <input v-model="Collection_Description" placeholder="Collection Description">
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
            if(this.description!=null){
                dataElement.push({
                    "key":"description",
                    "value":[
                        "string",
                        this.description
                    ]
                })
            }
            return dataElement;
        }
    },
    methods:{
       async CreateCollection(){
            if(!this.wax.api){
               return console.log("Need to login first")
           }
           try {
               this.result=await this.wax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'createcol',
                    authorization: [{
                        actor: this.wax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        allow_notify:1,
                        author:this.wax.userAccount,
                        authorized_accounts:[this.authorized_accounts],
                        collection_name:this.Collection_name,
                        data:this.data,
                        market_fee:this.market_fee,
                        notified_accounts:this.notified_accounts,
                        Collection_Description:this.Collection_Description
                    },
                   }]
               },
               {
                   blockBehind: 3,
                   expireSecond: 30
               })
               console.log(this.result);
               console.log("THIS AUTHOR IS "+this.author);
           }
           catch(e){
               this.result=e
               console.log(e)
           }       
       }
    }
}
    
</script>
