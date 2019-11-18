const { Wallet } = require('./BigCoin/wallet');
const { Key } = require('./BigCoin/key');
const { sha256D } = require('./BigCoin/util/utils');

key = '7CDD7B081E239B1236D7F4A2F7545D738077ED72558DA9FCFC6F51D882268118';
PAU = '5JmH6Roqpw97rZ7mejs9frRf1HyNkGVSA3Be4MKez6MMNeWDNht';
PAC = 'L1QS2xVkWZxqFikt5aCMGV9pkHupyyNW2tdxZnhLezcpvY22kUpg';
ianKey = new Key();
ianWallet = new Wallet({privateAddress: PAC});
// console.log(ianWallet.key.publicKey);
console.log(ianWallet.privateAddressU);
console.log(ianWallet.privateAddressC);
console.log(ianWallet.publicAddressU);
console.log(ianWallet.publicAddressC);