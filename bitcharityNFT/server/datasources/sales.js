const { DataSource } = require('apollo-datasource');
const waxjs = require('@waxio/waxjs/dist');
const { createApolloFetch } = require('apollo-fetch');



class salesAPI extends DataSource{
    constructor(){
        super();
    }

    async getSales(){
        //var info;
        const fetch = await createApolloFetch({
            uri: 'https://wax.api.atomicassets.io/graphql',
          });
          
          
        var info=await fetch({
            query: `query atomicmarket_sales{
                    atomicmarket_sales{
                       market_contract
                       assets_contract
                       listing_symbol
                        offer_id
                    }
                }`
          }).then(res => {
            //console.log(res.data);
            return res.data.atomicmarket_sales;
        })
        //var info=fetch;
        console.log(info);
        return {
            
            market_contract:info[0].market_contract,
            assets_contract:info[0].assets_contract,
            listing_symbol:info[0].listing_symbol,
            offer_id:info[0].offer_id
        }
        
        //console.log(info);
          //console.log(typeof fetch);
          //fetch();
        }
    }

   
module.exports = salesAPI