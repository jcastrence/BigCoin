const EllipticCurve = require('elliptic').ec;
const Random = require('random-js').Random;
// Establish the secp256k1 elliptic curve
const EC = new EllipticCurve('secp256k1');

// Key Class generates a random private key / public key pair or generates a respective public key if
// a private key has been provided
// Keys are stored as hexadecimal strings
class Key {

    constructor(privateKey) {
        this.random = new Random();
        this.privateKey = privateKey === undefined ? this.generatePrivateKey() : privateKey;
        this.publicKey = this.calculatePublicKey();
    }

    // Generate a 256 bit hexadecimal value to serve as the private key
    generatePrivateKey() {
        // Generates 64 hexadecimal values then concatenates all 64 values
        let r = [];
        for (let i = 0; i < 64; i++) {
            r.push(this.random.integer(0, 15).toString(16));
        }
        return r.join('');
    }

    // Calculates the public key based on the randomly generated private key
    calculatePublicKey() {
        return EC.keyFromPrivate(this.privateKey).getPublic('hex').substring(2, 130);
    }

    getPublicKeyX() {
        return this.publicKey.substring(0, 64);
    }

    getPublicKeyY() {
        return this.publicKey.substring(64, 130);
    }

}

module.exports.Key = Key;