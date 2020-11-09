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
          
          
        var info = await fetch({
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
        var infoObj = {};
            for ( var index in info ) {
                if ( info[index].Status == "Valid" ) { 
                     infoObj[index] = info[index]; 
                } 
            }
            console.log(infoObj);
        return {
            market_contract:infoObj.market_contract,
            assets_contract:infoObj.assets_contract,
            listing_symbol:infoObj.listing_symbol,
            offer_id:infoObj.offer_id
        }
        
        //console.log(info);
          //console.log(typeof fetch);
          //fetch();
        }
    }

   
module.exports = salesAPI