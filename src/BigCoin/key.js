const EllipticCurve = require('elliptic').ec;
const Random = require('random-js').Random;
const { SHA256d } = require('./utils');
// Establish the secp256k1 elliptic curve
const EC = new EllipticCurve('secp256k1');

class Key {
    constructor(seed) {
        this.seed = seed === undefined ? null : seed;
        this.random = new Random();
        this.privateKey = this.generatePrivateKey();
        this.publicKey = this.calculatePublicKey();
        this.privateAddressU;
        this.publicAddressU;
        this.privateAddressC;
        this.privateAddressU;
    }

    // Generate a 256 bit hexadecimal value to serve as the private key
    generatePrivateKey() {
        // Generates a double hash of the seed using SHA256
        if (this.seed !== null) {
            return SHA256d(this.seed);
        }
        // Generates 64 hexadecimal values then concatenates all 64 values
        else {
            let r = [];
            for (let i = 0; i < 64; i++) {
                r.push(this.random.integer(0, 15).toString(16));
            }
            return r.join('');
        }
    }

    // Calculates the public key based on the randomly generated private key
    calculatePublicKey() {
        return EC.keyFromPrivate(this.privateKey).getPublic('hex');
    }

    

}

console.log(new Key('zz'));