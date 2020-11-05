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
            console.log(info.market_contract);
            //console.log(this.getSales())
            return  {
                    market_contract: info.market_contract,
                    ssets_contract: info.assets_contract,
                    listing_symbol: info.listing_symbol,
                    offer_id: info.offer_id
                }
            }
          );
        
    }

    getAllInfo(){
        return {
            market_contract: 'atomicmarket',
                assets_contract: 'atomicassets',
                listing_symbol: 'WAX',
                offer_id: 466093
        }
    }
}
module.exports = salesAPI