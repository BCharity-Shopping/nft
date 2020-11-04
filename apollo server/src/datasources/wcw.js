const { DataSource } = require('apollo-datasource');

const waxjs = require('@waxio/waxjs/dist');
var wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);
var result = ""



class WCWAPI extends DataSource {
  constructor() {
    super();
  }

  

  async loginUser() {
    //const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false)
    console.log(wax)
    try {
    await wax.loginViaWindow()
    }
    catch (e) {
        console.log(e)
    }
    return wax.userAccount
  }

  getUser() {
    if(!wax.api) {
      return {
        accountname: "AccountName",
        pubkeys: ["key 1", "key 2"]
      }
    }
    else {
      return {
        accountname: wax.userAccount,
        pubkeys: wax.pubKeys
      }
    }
    
    
  }

  async registerMarket(userAccount, pubKeys, creator, marketplace_name) {
    /*wax = new waxjs.WaxJS('https://wax.greymass.com', "l5oaw.wam", ["EOS6PTe6oLPDTXdYBLMh7zd2AkbUMSwjiHw5mFW7FXFGYCSMX4GKj", "EOS7DaLBULzPXKmV6V7aJrawgn2rwmK82o33k3KiAc8GBCWuM6qBd"], false)
    if(!this.wax.api) {
      return console.log("Need to Login first")
    }
    try {
      result = await wax.api.transact({
        actions: [{
          account: 'atomicmarket',
          name: 'regmarket',
          authorization: [{
            actor: this.userAccount,
            permission: 'active',
          }],
          data: {
            creator: this.creator,
            marketplace_name: this.marketplace_name,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      })
      console.log(result)
    }
    catch (e) {
      this.result = e
      console.log(e)
    }*/
    return userAccount + pubKeys + creator + marketplace_name
  }

}

module.exports = WCWAPI;
