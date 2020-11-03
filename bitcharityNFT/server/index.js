const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  playground: {
    settings: {
      'editor.theme': 'light',
    }
  }
 });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});