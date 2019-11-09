const SHA256d = require('./utils').utils.SHA256d;

// Each Block object is composed of a header and a list of transactions
class Block {
    
    constructor(timestamp, transactions, reward, difficulty, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.reward = reward;
        this.difficulty = difficulty;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    getHeader() {
        return this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce;
    }

    getHash() {
        return this.hash;
    }

    calculateHash() {
        return (SHA256d(this.getHeader()));
    }

    recalculateHash() {
        this.nonce++;
        this.hash = this.calculateHash();
    }

}

module.exports.Block = Block;