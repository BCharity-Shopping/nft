module.exports = {
    Query: {
        account: (_, __, { dataSources }) =>
            dataSources.WCWAPI.getUser()
    },
    Mutation: {
        login: async(_, __, { dataSources }) =>
            dataSources.WCWAPI.loginUser(),
        regmarket: async(_, args, { dataSources }) =>
            dataSources.WCWAPI.registerMarket(
                args.creator,
                args.marketplace_name
            ),
    }
};