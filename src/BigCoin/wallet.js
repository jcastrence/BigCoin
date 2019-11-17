const bs58 = require('bs58');
const { Key } = require('./key');
const { sha256D, sha256ripemd160 } = require('./util/utils');

class Wallet {

    constructor(key) {
        this.key = key;
        this.privateAddressU = this.convertPrivateAddressU();
        this.privateAddressC = this.convertPrivateAddressC();

    }

    convertPrivateAddressU() {
        const version = k => '80' + k;
        const checksum = k => sha256D(k).substring(0, 8);
        const base58 = k => bs58.encode(Buffer.from(k, 'hex'));
        return base58(version(this.key.privateKey) + checksum(version(this.key.privateKey)));
    }

    convertPrivateAddressC() {
        const version = k => '80' + k + '01';
        const checksum = k => sha256D(k).substring(0, 8);
        const base58 = k => bs58.encode(Buffer.from(k, 'hex'));
        return base58(version(this.key.privateKey) + checksum(version(this.key.privateKey)));
    }

    convertPublicAddressU() {
        const version = k => '04' + k;
        const checksum = k => sha256D( '00' + sha256ripemd160(k)).substring(0, 8);
    }

    convertPublicAddressU() {

    }

}

module.exports.Wallet = Wallet;