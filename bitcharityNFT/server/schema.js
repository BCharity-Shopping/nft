const { gql } = require('apollo-server');

const typeDefs = gql`
  type collections {
    author: String!
    collection_name: String!
    allow_notify: String!
    authorized_account: String!
    notify_accounts: String
    market_fee: float!
    data: String!
  }
  type Mutation {
    createcol(author:String, collection_name:String,allow_notify:String, authorized_account:String, notify_accounts:String, market_fee:String,data:String):collections
  }
  
  type schema {
    authorized_creator: String!,
    collection_name: String,
    schema_name: String!,
    schema_format: String
  }
  type Mutation {
    createschema(authorized_creator: String, collections_name:String, schema_name:String, schema_format: String)
  }

  type Mutation {
    mintasset(authorized_minter: String, collection_name: String, schema_name: String, template_id: String, new_asset_owner: String, immutable_data: String, mutable_data: String, token_to_back: String):String
  }
  
  `;

module.exports = typeDefs;