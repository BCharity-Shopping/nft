import * as waxjs from '@waxio/waxjs/dist';
import React, {useState} from 'react';

import {ToastAndroid, Text, View, Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);

async function login() {
  var isAutoLoginAvailable = await wax.isAutoLoginAvailable();
  // var userAccount = wax.userAccount;
  // var pubKeys = wax.pubKeys;
  console.log('wax', isAutoLoginAvailable);
  try {
    const userAccount = await wax.login();

    const pubKeys = wax.pubKeys;
    console.log('test', userAccount);
  } catch (e) {
    console.log('error1', e);
  }
  // try {
  //   const result = await wax.api.transact(
  //     {
  //       actions: [
  //         {
  //           account: 'eosio',
  //           name: 'delegatebw',
  //           authorization: [
  //             {
  //               actor: this.wax.userAccount,
  //               permission: 'active',
  //             },
  //           ],
  //           data: {
  //             from: this.wax.userAccount,
  //             receiver: this.wax.userAccount,
  //             stake_net_quantity: '0.00000001 WAX',
  //             stake_cpu_quantity: '0.00000000 WAX',
  //             transfer: false,
  //             memo: 'This is a WaxJS/Cloud Wallet Demo.',
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       blocksBehind: 3,
  //       expireSeconds: 30,
  //     },
  //   );
  // } catch (e) {
  //   console.log('error', e);
  // }
}

export default login;
