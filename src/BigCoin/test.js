const { Wallet } = require('./wallet');
const { Key } = require('./key');

key = new Key('F7F58654AC15C47E3FB5B320192C9E658AF53DC001F915D4D0383FFEA4FA50A3');
let ianWallet = new Wallet(key);
console.log(ianWallet.privateAddressU);
console.log(ianWallet.privateAddressC);
console.log(key.publicKey);
console.log(key.getPublicKeyX());
console.log(key.getPublicKeyY());