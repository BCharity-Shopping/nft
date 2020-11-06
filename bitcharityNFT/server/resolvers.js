module.exports = {
    Query: {
      atomicmarket_sales: (_,__,{ dataSources })=>
        dataSources.salesAPI.getSales()
    },
    Mutation: {
      registermarket: (_,args,{ dataSources })=>
        dataSources.actionAPI.regmarket(args.creator,args.market_place_name)
      ,
      login: (_,args,{ dataSources })=>
        dataSources.actionAPI.login(args.login)
    }
}  