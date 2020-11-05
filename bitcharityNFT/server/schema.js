const { gql } = require('apollo-server');

const typeDefs = gql` 
  type Query {
    atomicmarket_sales:[Atomicmarket_sales]
  }

  type Atomicmarket_sales {
      market_contract:String!
      assets_contract:String
      listing_symbol:String
      offer_id:ID
    }

  

  type atomicassets_template {
    Issued_supply:String!
    Template_id:String!
    immutable_data: String!
  }

  type atomicassets_asset_data {
    asset_id: String!
    collections_name: String!
    schema_name: String!
  }

  type atomicassets_asset {
    atomicassets_asset_data:[atomicassets_asset_data]!
    atomicassets_template:[atomicassets_template]!
  }
  
  type atomicassets_offers_assets {
    atomicassets_asset:[atomicassets_asset]
  }

  type atomicassets_offer {
    atomicassets_offers_assets:[atomicassets_offers_assets]
  }

  type atomicmarket_sale_mints {
    min_template_mint:Int!
  }

  type atomicmarket_token{
    token_precision:Int!
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