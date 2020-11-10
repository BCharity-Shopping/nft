<template>
    <div>
        <p>Create Schema</p>
        <p>Schema_name</p>
        <input v-model="Schema_name" placeholder="Schema name">
        <p>Attribute Name</p><br />
        <p>name</p><br />
        <p>img</p>
        <p>Attribute Type</p><br />
        <p>text</p><br />
        <p>img</p>
        <b-button @click="CreateSchema">Create Schema</b-button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'CreateCollection',
    props:['wax','assetID'],
    data(){
        return{
            Schema_name:""
        }
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      collectnname:function(){
          return this.collectionname
      }
    },
    methods:{
       async CreateSchema(){
            if(!this.wax.api){
               return console.log("Need to login first")
           }
           try {
               this.result=await this.wax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'createschema',
                    authorization: [{
                        actor: this.wax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        authorized_creator:this.wax.userAccount,
                        collection_name:this.collectionname,
                        Schema_name:this.Schema_name
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