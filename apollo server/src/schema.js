const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here

  type Account {
    accountname: String
    pubkeys: [String]
  }

  type Query {
    account: Account
  }
  type Mutation {
    login: String
    regmarket(
      creator: String!, 
      marketplace_name: String!): String
  }





`;

module.exports = typeDefs;