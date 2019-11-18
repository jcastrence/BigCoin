const { sha256D, sha256ripemd160 } = require('./util/utils');
const bs58 = require('bs58');

class Wallet {

    constructor(key) {
        this.key = key;
        this.privateAddressU = this.convertPrivateAddressU();
        this.privateAddressC = this.convertPrivateAddressC();
        this.publicAddressU = this.convertPublicAddressU();
        this.publicAddressC = this.convertPublicAddressC();
    }

    checksum(k) {
        return sha256D(k).substring(0, 8);
    }

    base58(k) {
        return bs58.encode(Buffer.from(k, 'hex'));
    }

    keyToAddress(k) {
        return this.base58(k + this.checksum(k));
    }

    convertPrivateAddressU() {
        let version = '80' + this.key.privateKey;
        return this.keyToAddress(version);
    }

    convertPrivateAddressC() {
        let version = '80' + this.key.privateKey + '01';
        return this.keyToAddress(version);
    }

    convertPublicAddressU() {
        let version = '00' + sha256ripemd160('04' + this.key.publicKey);
        return this.keyToAddress(version);
    }

    convertPublicAddressC() {
        let x = this.key.getPublicKeyX();
        let pre = parseInt(this.key.getPublicKeyY().substring(63, 64), 16) % 2 === 0 ? '02' : '03';
        let version = '00' + sha256ripemd160(pre + x);
        return this.keyToAddress(version);
    }

}

module.exports.Wallet = Wallet;