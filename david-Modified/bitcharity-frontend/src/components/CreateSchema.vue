<template>
    <div>
        <h1>Create Schema:{{collectionname}}</h1>
        <p>Schemas define which kind of attributes the assets will have. You can add attributes later.</p>
        Schema_name<input v-model="Schema_name" placeholder="Schema name, 12 character at max">
        <div class="large-card">
            <div class="grid-container">
                <b-card>
                    <div class="grid-item">Attribute Name</div>
                </b-card>
                <b-card>
                    <div class="grid-item">name</div>
                </b-card>
                <b-card>
                    <div class="grid-item">img</div>
                </b-card>
                <b-card>
                    <div class="grid-item">Attribute Type</div>
                </b-card>
                <b-card>
                    <div class=grid-item>text</div>
                </b-card>
                <b-card>
                    <div class=grid-item>img</div>
                </b-card>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <tbody>
                        <td><strong>Attribute_name</strong></td>
                        <td><strong>Attribute_type</strong></td>
                    
                            <tr v-for="(row, index) in rows" :key=row.index>
                                <td><input type="text" v-model="row.name"></td>
                                <td><input type="text" v-model="row.type"></td>
                                <td>
                                    <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
                                </td>
                            </tr>
                    </tbody>
                </tr>
            </thead>
        </table>
        <div>
            <button class="button btn-primary" @click="addRow">Add row</button>
            <button class="button btn-primary" @click="CreateSchema()">Add Schema</button>
        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props:['wax','assetID'],
    data(){
        return{
            rows:[],
            title:"",
            collectionname:"",
            countFirstboxInputID:0,
            countSecondboxInputID:0,
            Schema_name:"",
            schema_format:[
                {
                    "name":"name",
                    "type":"string"
                },
                {
                    "name":"img",
                    "type":"image"
                }
            ]
        }
    },
    created(){
        this.collectionname=this.$route.params.collectionname
    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      collectionName:function(){
          return this.collectionname
      },
      schemaFormat:function(){
         return this.schema_format;
      }
    },
    methods:{
        signalChange:function(evt){
            console.log("this is changed")
            this.$emit("change", evt)
        },
        addRow: function(){
            var elem = document.createElement('tr');
                    this.rows.push({
                        name: "",
                        type: "",
                    });
                    console.log(this.rows)
                    return elem;
        },
        removeElement: function(index) {
                    this.rows.splice(index, 1);
        },
        async CreateSchema(){
            this.schema_format=[
                {
                    "name":"name",
                    "type":"string"
                },
                {
                    "name":"img",
                    "type":"image"
                }
            ]
            for(var key in this.rows){
               this.schema_format.push({"name":this.rows[key].name,"type":this.rows[key].type})
           }
            console.log("it is "+this.collectionName);
           if(!this.getWax.api){
               return console.log("Need to login first")
           }
           try {
               this.result=await this.getWax.api.transact({
                   actions:[{
                    account: 'atomicassets',
                    name: 'createschema',
                    authorization: [{
                        actor: this.getWax.userAccount,
                        permission:'active',
                    }],
                    data: {
                        authorized_creator:this.getWax.userAccount,
                        collection_name:this.collectionname,
                        schema_format:this.schemaFormat,
                        schema_name:this.Schema_name,
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
<style lang="scoped">
</style>