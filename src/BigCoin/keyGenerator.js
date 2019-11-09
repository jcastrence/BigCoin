const EllipticCurve = require('elliptic').ec;

const ellipticCurve = EllipticCurve('secp256k1');
const key = ellipticCurve.genKeyPair();
console.log(key.getPrivate('hex'));
console.log(key.getPublic('hex'));