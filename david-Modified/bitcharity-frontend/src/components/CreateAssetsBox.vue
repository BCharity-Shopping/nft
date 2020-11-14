<template>
    <div>
        Schema:{{this.schema_name}}
        collectionname:{{this.collection_name}}<br/>
        <input v-model="AssetOwner" placeholder="Account Name"><br/>
        <input v-model="NumberOfCopies" placeholder="Number between 1-10"><br/>
        <input v-model="Template" placeholder="Template"><br/>
         <!--<ApolloQuery :query="require('../graphQL/schemaImmuntableMutableData.gql')" :variables="{schema_name:this.schema_name}">
            <template v-slot="{ result: { data } }">
                {{data.atomicassets_schemas[0].format}}
                <div v-for="(item) in data.atomicassets_schemas[0].format" :key="item.name">
                    <input type="text" value="{{item.name}}">:{{item.type}}
                </div>
            </template>
        </ApolloQuery>-->
        <b-button @click="CreateAssets">Create Collection</b-button>
    </div>
</template>