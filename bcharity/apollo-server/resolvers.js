import GraphQLJSON from 'graphql-type-json'

import * as waxjs from "@waxio/waxjs/dist"



export default {
  JSON: GraphQLJSON,

  

  Query: {
    hello: (root, { name }) => `Hellow1 ${name || 'Worldw'}!`,

  },

  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', { mySub: message })
      return message
    },
    regmarket: async (obj, args, context) => {
      console.log("context: " + context)
      const userAccount= ""
      const     pubKeys= ""
      const     wax= new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
      const     result= ""
      const     userName= ""
      //const     loginStatus= "User is not logged in"
      const     aid= 1099512463310n
      const     marketName= "l5oaw.wam001"
      
      async function login() {
        try {
          console.log("wax: " + wax)
          console.log("logging in through WCW")
          userAccount = await wax.login()
          console.log("userAccount" + userAccount)
          pubKeys = wax.pubKeys
          console.log(pubKeys)
          userName = wax.userAccount
          //this.loginStatus = `User has approved dApp access`
        }
        catch (e) {
          console.log(e)
          //this.loginStatus = `User denied dApp access`
        }
      }
      async function regmarket() {
        if(!this.wax.api) {
          return console.log("Need to Login first")
        }
        try {
          this.result = await this.wax.api.transact({
            actions: [{
              account: 'atomicmarket',
              name: 'regmarket',
              authorization: [{
                actor: this.wax.userAccount,
                permission: 'active',
              }],
              data: {
                creator: this.wax.userAccount,
                marketplace_name: "l5oawtestmkt",
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
      }
      await login()
      console.log(userName)
      await regmarket()
      return "dqijoiwq"
    }
  },

  Subscription: {
    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey'),
    },

  },
}
