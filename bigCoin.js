const SHA256 = require('crypto-js/sha256');

// Double SHA256 prevents against length extension attacks by hashing twice
let SHA256d = (x) => SHA256(SHA256(x).toString()).toString();
// Gets the current time and date and converts into datetime format
let getDateTime = () => {
    let today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        + ` ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()}`;
}

// Constants used to generate the genesis block
// This is the hash and timestamp of Bitcoin's genesis block
const GENESISHASH = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
const GENESISTIMESTAMP = '2009-1-3 13:15:05';
const GENESISREWARD = 50;

// The ledger keeps track of all BigCoin transactions that have ever happened
class Ledger {

    constructor() {
        this.blockChain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.coinbase = 21000000;
        this.currMiningReward = 50;
    }

    createGenesisBlock() {
        let genesisBlock = new Block(GENESISTIMESTAMP, [], GENESISREWARD, 0, 0);
        genesisBlock.hash = GENESISHASH;
        return genesisBlock;
    }

    getLastBlock() {
        return this.blockChain[this.blockChain.length - 1];
    }

    mineBlock(minerAddress) {
        // Create a transaction where the miner will get rewarded from the coinbase if the block is
        // successfully mined
        let minerRewards = new Transaction("coinbase", minerAddress, this.currMiningReward, true);
        let approvedTransactions = [];
        // Check all currently pending transactions
        this.pendingTransactions.forEach((transaction) => {
            if (this.checkTransaction(transaction))
                approvedTransactions.push(transaction)
        });
        // Add approved transactions to the new block
        this.blockChain.push(
            this.mineBlockHelper(
                new Block(
                    getDateTime(), [minerRewards, ...approvedTransactions], this.currMiningReward,
                    this.difficulty, this.getLastBlock().getHash()
                )
            )
        );
        // Clear the list of pending transactions
        this.pendingTransactions = [];
        // Reduce the amount of coins in the coinbase by the mining reward
        this.coinbase -= this.currMiningReward;
    }

    mineBlockHelper(unminedBlock) {
        while(unminedBlock.getHash().substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            unminedBlock.recalculateHash();
        }
        return unminedBlock;
    }

    requestTransaction(sendAddress, receiveAddress, amount) {
        this.pendingTransactions.push(new Transaction(sendAddress, receiveAddress, amount));
    }

    checkTransaction(transaction) {
        if (this.getBalance(transaction.sendAddress) < transaction.amount)
            return false;
        return true;
    }

    getBalance(address) {
        let balance = 0;
        let i = 0;
        this.blockChain.forEach((block) => {
            block.transactions.forEach((transaction) => {
                if (address === transaction.receiveAddress) {
                    balance += transaction.amount;
                }
                else if (address === transaction.sendAddress) {
                    balance -= transaction.amount;
                }
            });
        });
        return balance;
    }

}

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

// Transaction class is used to document transactions
class Transaction {
    constructor(sendAddress, receiveAddress, amount, fromCoinbase = false) {
        this.sendAddress = sendAddress;
        this.receiveAddress = receiveAddress;
        this.amount = amount;
        this.fromCoinbase = fromCoinbase;
    }
}

module.exports.Ledger = Ledger;