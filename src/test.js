const { Wallet } = require('./BigCoin/wallet');
const { Key } = require('./BigCoin/key');
const { sha256D } = require('./BigCoin/util/utils');

ianKey = new Key('F7F58654AC15C47E3FB5B320192C9E658AF53DC001F915D4D0383FFEA4FA50A3')
ianWallet = new Wallet(ianKey);
// console.log(ianWallet.key.publicKey);
console.log(ianWallet.privateAddressU);
console.log(ianWallet.privateAddressC);
console.log(ianWallet.publicAddressU);
console.log(ianWallet.publicAddressC);