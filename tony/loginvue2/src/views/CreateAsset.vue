<template>
  <div class="create-asset">
     <h1>Mint Asset</h1>
     <ApolloQuery
    :query="require('../graphql/getSchema.gql')"
    :variables="{schema_name:$route.params.schema_name, collection_name:$route.params.collection_name}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-for="format in data.atomicassets_schemas[0].format" :key="format.name">
              <label :for=format.name >{{format.name}}</label>
              <input :id=format.name class="format-name" :name=format.name :placeholder=format.type>
            <br>
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
      <b-button @click="createCause">Create Cause</b-button>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: 'CreateAsset',
  data () {
    return {
      immutable_data: []
    }
  },
  methods: {
    createCause() {
      var array = document.getElementsByClassName("format-name")
      for(var i=0;i<array.length;i++){
        console.log(array[i].value)
        console.log(array[i].id)
      }
    }
  }
}
</script>
