import GraphQLJSON from 'graphql-type-json'

import * as waxjs from "@waxio/waxjs/dist"

export default {
  JSON: GraphQLJSON,

  

  Query: {
    hello: (root, { name }) => `Hellow ${name || 'Worldw'}!`,

  },

  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', { mySub: message })
      return message
    },
    regmarket: async (obj, args, context) => {
      console.log(args.creator + args.marketplace_name)
      const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
      await wax.login()
      console.log(wax.userAccount)
      if(!this.wax.api) {
        return console.log("Need to Login first")
      }
      try {
        this.result = await this.wax.api.transact({
          actions: [{
            account: 'atomicmarket',
            name: 'regmarket',
            authorization: [{
              actor: wax.userAccount,
              permission: 'active',
            }],
            data: {
              creator: args.creator,
              marketplace_name: args.marketplace_name,
            },
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30
        })
        console.log(this.result)
      }
      catch (e) {
        this.result = e
        console.log(e)
      }
      return "result"
    },
  },

  Subscription: {
    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey'),
    },

  },
}
