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
            info=res.data
            return this.getallInfo(info)
          });
        
    }

    async getallInfo(info){
        return {
            market_contract:info.market_contract,
            assets_contract:info.assets_contract,
            listing_symbol:info.listing_symbol,
            offer_id:info.offer_id
        }
    }
}
module.exports = salesAPI