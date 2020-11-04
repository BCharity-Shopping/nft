//import ApolloServer from 'apollo-server';
//import typeDefs from 'schema';
//import resolvers from './resolvers';
const { ApolloServer }=require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const actionAPI = require('./datasources/action');


const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  playground: {
    settings: {
      'editor.theme': 'light',
    }
  },
  dataSources: () => ({
  
    actionAPI: new actionAPI()

  })
 });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});