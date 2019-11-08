const Ledger = require('./bigCoin.js').Ledger;
const Transaction = require('./bigCoin.js').Transaction;

const publicLedger = new Ledger();
t1 = new Transaction('Alice', 'Bob', 5);
t2 = new Transaction('Eve', 'Charles', 7);
publicLedger.addTransactions([t1, t2]);
publicLedger.addBlock('MikeMiner');
t3 = new Transaction('Bob', 'Charles', 10);
publicLedger.addTransactions([t3]);
publicLedger.addBlock('MikeMiner');
console.log(publicLedger.blockChain);
console.log(publicLedger.blockChain[1]);
console.log(publicLedger.blockChain[2]);