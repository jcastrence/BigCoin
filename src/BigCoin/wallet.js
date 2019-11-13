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
