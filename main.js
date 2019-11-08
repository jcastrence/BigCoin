const Ledger = require('./bigCoin.js').Ledger;

const publicLedger = new Ledger();
publicLedger.addBlock([{sender: 'Alice', receiver: 'Bob'}]);
publicLedger.addBlock([{sender: 'Eve', receiver: 'Mike'}]);
console.log(publicLedger.blockChain);
let newTransactions = [1, 2, 3]
publicLedger.addPendingTransactions(newTransactions)
publicLedger.addPendingTransactions([4, 5, 6, 7])
console.log(publicLedger.pendingTransactions)