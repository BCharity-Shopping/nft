<template>
  <div class="fundraiser">
     <h1>Fundraiser #{{ $route.params.fundraiser_id }}</h1>
     <ApolloQuery
    :query="require('../graphql/getFundraiser.gql')"
    :variables="{fundraiser_id:$route.params.fundraiser_id}"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

          {{data.atomicmarket_sales[0]}}
          <DonateWax :recipient="data.atomicmarket_sales[0].seller" :fundraiserID="$route.params.fundraiser_id"/>

        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import DonateWax from '@/components/DonateWax.vue'
export default {
  name: 'Fundraiser',
  components: {
    DonateWax,
  }
}
</script>
