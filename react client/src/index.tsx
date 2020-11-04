import { ApolloClient, gql, NormalizedCacheObject }from '@apollo/client';
import { cache } from './cache';
  
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql'

});

client
  .mutate({
    mutation: gql`
      mutation someMutation {
        login
      }
    `
  })
  .then(result => console.log(result));
