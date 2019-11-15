const Block = require('./block.js').Block;
const Transaction = require('./transaction.js').Transaction;
const { SHA256d, getDateTime } = require('./util/utils');

// Constants used to generate the genesis block
// This is the hash and timestamp of Bitcoin's genesis block
const GENESIS_TIMESTAMP = '2009-1-3 13:15:05';
const GENESIS_TRANSACTIONS = [];
const GENESIS_REWARD = 50;
const GENESIS_DIFFICULTY = 0;
const GENESIS_PREVIOUSHASH = 0;
const GENESIS_NONCE = 0;
const GENESIS_HASH = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
// Constant used to control the maximum amount of BigCoin that can be in circulation
const TOTAL_COINBASE = 21000000;

// The ledger keeps track of all BigCoin transactions that have ever happened
class Ledger {

    constructor() {
        this.blockChain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.currMiningReward = 50;
    }

    createGenesisBlock() {
        let genesisBlock = new Block(
            GENESIS_TIMESTAMP, GENESIS_TRANSACTIONS, GENESIS_REWARD, GENESIS_DIFFICULTY, GENESIS_PREVIOUSHASH
        );
        genesisBlock.nonce = GENESIS_NONCE;
        genesisBlock.hash = GENESIS_HASH;
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
                approvedTransactions.push(transaction);
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
        // Check to see if the mining reward needs to be halfed
        if ((this.blockChain.length) % (TOTAL_COINBASE / 100) == 0) {
            this.currMiningReward /= 2;
        }
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

module.exports.Ledger = Ledger;