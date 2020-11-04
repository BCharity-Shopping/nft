require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const WCWAPI = require('./datasources/wcw');


const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        WCWAPI: new WCWAPI()
    })
});

server.listen().then(({ url }) => {  
    console.log(`🚀 Server ready at ${url}`);
});