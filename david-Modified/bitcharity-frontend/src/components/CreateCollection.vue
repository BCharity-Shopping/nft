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
                        author:this.wax.userAccount,
                        collection_name:this.Collection_name,
                        authorized_accounts:this.authorized_accounts,
                        notified_accounts:this.notified_accounts,
                        market_fee:this.market_fee,
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
