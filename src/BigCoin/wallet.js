const bs58 = require('bs58');
const { Key } = require('./key');
const { SHA256d } = require('./utils');
const SHA256 = require('crypto-js/sha256');

class Wallet {

    constructor(key) {
        this.key = key;
        this.privateAddressU = this.convertPrivateAddressU;
        this.privateAddressC = this.convertPrivateAddressC;
        
    }

    convertPrivateAddressU() {
        const version = k => '80' + k;
        const checksum = k => SHA256d(k).substring(0, 8);
        const base58 = k => bs58.encode(Buffer.from(k, 'hex'));
        return base58(version(this.key.privateKey) + checksum(version(this.key.privateKey)));
    }

    convertPrivateAddressC() {
        const version = k => '80' + k + '01';
        const checksum = k => SHA256d(k).substring(0, 8);
        const base58 = k => bs58.encode(Buffer.from(k, 'hex'));
        return base58(version(this.key.privateKey) + checksum(version(this.key.privateKey)));
    }


}

// console.log(parseInt('a1', 16));
// console.log(SHA256(0x804951F09FB949E886EDE756F7D7573AECE13C055D009A52F7B5314E48F82989D2, ).toString())
console.log(SHA256('4951F09FB949E886EDE756F7D7573AECE13C055D009A52F7B5314E48F82989D2').toString());
console.log(SHA256('00110001110010011100000110100111101100100111110011010100011010001000011111110111101000001111111011100011101100110101111101001011').toString());
// x = base58.encode(Buffer.from('805EA7E5115CBC2A1B2FACFB72F086CE9D34B9CDC5776AD0A259FAA302894CF1BE4ADBB64A', 'hex'));
// console.log(x);
// console.log(base58.decode(x).toString('hex'));


// pKey = 0x4951F09FB949E886EDE756F7D7573AECE13C055D009A52F7B5314E48F829890D2;
// myWallet = new Wallet(new Key(pKey));
// console.log(myWallet.key.privateKey);
// console.log(myWallet.key.publicKey);
// console.log(myWallet.convertPrivateAddressU());
// console.log(myWallet.convertPrivateAddressC());
