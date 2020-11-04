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

  type Data {
    seller: String
  }


  type Actions {
    account: String
    name: String
    authorization: [Authorization]
    data: Data
  }

  type Authorization {
    actor: String
    permission: String
  }
  type Mutation {
    login(login:String):String
    createcol(author:String, collection_name:String,allow_notify:String, authorized_account:String, notify_accounts:String, market_fee:String,data:String):collections
    createschema(authorized_creator: String, collections_name:String, schema_name:String, schema_format: String):String
    registermarket(creator:String,market_place_name: String):String
  }
  type schema {
    authorized_creator: String!,
    collection_name: String,
    schema_name: String!,
    schema_format: String
  }


`;

module.exports = typeDefs;