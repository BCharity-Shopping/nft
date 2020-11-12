<template>
    <div>
        <p>{{getWax}}</p>
        <p>Create Schema</p>
        <p>Schema_name</p>
        <input v-model="Schema_name" placeholder="Schema name">
        <p>Attribute Name</p><br />
        <p>name</p><br />
        <p>img</p>
        <p>Attribute Type</p><br />
        <p>text</p><br />
        <p>img</p>
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
            countFirstboxInputID:0,
            countSecondboxInputID:0,
            Schema_name:"",
            schemaformat:[{
                "name":"name",
                "type":"string"
              },
              {
                  "name":"img",
                  "type":"image"
              }]
        }
    },
    watch:{

    },
    computed: {
      ...mapGetters([
        'getWax'
      ]),
      collectionName:function(){
          return this.collectionname
      },
      schemaFormat:function(){
         return this.schemaformat;
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
         setFilename: function(event, row) {
                    var file = event.target.files[0];
                    row.file = file
        },
        async CreateSchema(){
           for(var key in this.rows){
               this.schemaformat.push({"name":this.rows[key].name,"type":this.rows[key].type})
           }
           console.log(this.schemaformat);

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
                        collection_name:this.collectionName,
                        schema_format:this.schemaformat,
                        schema_name:this.Schema_name
                    },
                }]
               },{
                   blocksBehind: 3,
                   expireSeconds: 30
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