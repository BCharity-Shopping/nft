const { DataSource } = require('apollo-datasource');
const waxjs = require('@waxio/waxjs/dist');

class actionAPI extends DataSource {
    constructor(){
        super();
    }

    async login(){
      var wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
      await wax.login();
    }


    async regmarket(creator,market_place_name){
        var wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
        wax.login();
        console.log(wax.userAccount);
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
        return this.result
      }
    }
module.exports = actionAPI