const { DataSource } = require('apollo-datasource');
const waxjs = require('@waxio/waxjs/dist');
const { createApolloFetch } = require('apollo-fetch');



class salesAPI extends DataSource{
    constructor(){
        super();
    }

    async getSales(){
        var info;
        const fetch = await createApolloFetch({
            uri: 'https://wax.api.atomicassets.io/graphql',
          });
          fetch({
            query: `query atomicmarket_sales{
                    atomicmarket_sales{
                       market_contract
                       assets_contract
                       listing_symbol
                        offer_id
                    }
                }`
          }).then(res => {
                       
            info=res.data.atomicmarket_sales
            
            //console.log(this.getSales())
        })
        console.log(fetch());
          return fetch;
        }
    }

   
module.exports = salesAPI