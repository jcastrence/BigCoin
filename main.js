const Ledger = require('./bigCoin.js').Ledger;
const Transaction = require('./bigCoin.js').Transaction;

const publicLedger = new Ledger();
t1 = new Transaction('Alice', 'Bob', 5);
t2 = new Transaction('Eve', 'Mike', 7);
publicLedger.addTransactions([t1, t2]);
publicLedger.addBlock();
console.log(publicLedger.blockChain);