const SHA256d = require('./utils').SHA256d;
const EllipticCurve = require('elliptic').ec;
const EC = new EllipticCurve('secp256k1');
// Transaction class is used to document transactions
class Transaction {

    constructor(sendAddress, receiveAddress, amount, fromCoinbase = false) {
        this.sendAddress = sendAddress;
        this.receiveAddress = receiveAddress;
        this.amount = amount;
        this.fromCoinbase = fromCoinbase;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256d(this.sendAddress + this.receiveAddress + this.amount + this.fromCoinbase);
    }

    

}

module.exports.Transaction = Transaction;