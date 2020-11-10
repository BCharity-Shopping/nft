<template>
    <div>
        <p>Create Collection</p>
        <p>{{getWax}}</p>
        <p>{{getWax.userAccount}}</p>
        <p>Collection Name:</p><input v-model="Collection_name" placeholder="Collection name"><br />
        <p>Display Name:</p><input v-model="Display_name" placeholder="Display name"><br />
        <p>WebUrl:</p><input v-model="WebURL" placeholder="Web URL"><br />
        <p>Collection Description:</p><input v-model="Collection_Description" placeholder="Collection Description"><br />
        <p>Authroized accounts:</p><input v-model="authorized_accounts" placeholder="authorized account "><br /><br />
        <p>Market Fee:</p><input v-model="market_fee" placeholder="market_fee"><br /><br />
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
            market_fee:"",
            format_data:[]
        }
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      dataValue: function(){
          var dataNestedValue=[
              {
                  "key":"name",
                  "value":[
                      "string",
                      this.Display_name
                  ]
              },
          ]
          if(this.WebURL!=null){
              dataNestedValue.push({
                  "key":"url",
                  "value":[
                      "string",
                      this.WebURL
                  ]
              })
          }
          if(this.Collection_Description!=null){
              dataNestedValue.push({
                  "key":"description",
                  "value":[
                      "string",
                      this.Collection_Description
                  ]
              })
          }
          return dataNestedValue
      }
      
    },
    methods:{
        async CreateCollection(){
            console.log(typeof this.dataValue);
            console.log(typeof this.Collection_name);
            console.log(typeof this.Collection_Description);
            console.log(typeof this.WebURL);
            console.log(typeof this.authorized_accounts);
            console.log(typeof this.market_fee)
            if(!this.getWax.api){
               return console.log("Need to login first")
           }
           try {
               this.result=await this.getWax.api.transact({
                   actions:[
                    {
                        account: 'atomicassets',
                        name: 'createcol',
                        authorization: [{
                            actor: this.getWax.userAccount,
                            permission:'active',
                            }],
                            data: {
                                author:this.getWax.userAccount,
                                collection_name:this.Collection_name,
                                allow_notify:true,
                                authorized_accounts:[this.authorized_accounts],
                                notify_accounts:[],
                                market_fee:this.market_fee,
                                data:this.dataValue
                                },
                            }
                      
                    ]},{
                   blocksBehind: 3,
                   expireSeconds: 70

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
