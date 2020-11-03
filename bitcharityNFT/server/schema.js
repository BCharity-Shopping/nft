const { gql } = require('apollo-server');

const typeDefs = gql` 
  type Query {
    Collections:collections
  }

  type collections {
      author: String!
      collection_name: String!
      allow_notify: String!
      authorized_account: String!
      notify_accounts: String
      market_fee: Float!
      data: String!
  }
  type Mutation {
    createcol(author:String, collection_name:String,allow_notify:String, authorized_account:String, notify_accounts:String, market_fee:String,data:String):collections
    createschema(authorized_creator: String, collections_name:String, schema_name:String, schema_format: String):String

  }
  type schema {
    authorized_creator: String!,
    collection_name: String,
    schema_name: String!,
    schema_format: String
  }
 
`;

module.exports = typeDefs;