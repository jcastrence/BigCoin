const SHA256 = require('crypto-js/sha256');

// Double SHA256 prevents against length extension attacks by hashing twice.
let SHA256d = (x) => SHA256(SHA256(x).toString()).toString();
// Gets the current time and date and converts into datetime format.
let getDateTime = () => {
    let today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        + ` ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()}`;
}

// Constants used to generate the genesis block. This is the hash and timestamp of Bitcoin's genesis block.
const GENESISHASH = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
const GENESISTIMESTAMP = '2009-1-3 13:15:05';

// The ledger keeps track of all BigCoin transactions that have ever happened.
class Ledger {

    constructor() {
        this.blockChain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.reward = 50;
    }

    createGenesisBlock() {
        let genesisBlock = new Block(GENESISTIMESTAMP, [], 0, 0);
        genesisBlock.hash = GENESISHASH;
        return genesisBlock;
    }

    getLastBlock() {
        return this.blockChain[this.blockChain.length - 1];
    }

    addBlock() {
        this.blockChain.push(
            this.mineBlock(
                new Block(getDateTime(), this.pendingTransactions, this.difficulty, this.getLastBlock().getHash())
            )
        );
        this.pendingTransactions = [];
    }

    mineBlock(unminedBlock) {
        while(unminedBlock.getHash().substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            unminedBlock.recalculateHash();
        }
        return unminedBlock;
    }

    addTransactions(pendingTransactions) {
        this.pendingTransactions.push(...pendingTransactions);
    }

}

// Each Block object is composed of a header and a list of transactions.
class Block {
    
    constructor(timestamp, transactions, difficulty, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
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

// Transaction class is used to document transactions.
class Transaction {
    constructor(sendAddress, receiveAddress, amount) {
        this.sendAddress = sendAddress;
        this.receiveAddress = receiveAddress;
        this.amount = amount;
    }
}

module.exports.Ledger = Ledger;
module.exports.Transaction = Transaction;