import ApolloServer from 'apollo-server';
import gql from 'apollo-server'

const typeDefs = gql







const resolvers = {
    Query: {
        books: () => books,
    },
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:{
        settings: {
            'editor.theme': 'light',
        },
    }});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});