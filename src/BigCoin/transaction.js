// Transaction class is used to document transactions
class Transaction {
    constructor(sendAddress, receiveAddress, amount, fromCoinbase = false) {
        this.sendAddress = sendAddress;
        this.receiveAddress = receiveAddress;
        this.amount = amount;
        this.fromCoinbase = fromCoinbase;
    }
}

module.exports.Transaction = Transaction;