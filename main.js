const Ledger = require('./bigCoin.js').Ledger;

const publicLedger = new Ledger();
publicLedger.addBlock([{sender: 'Alice', receiver: 'Bob'}]);
publicLedger.addBlock([{sender: 'Eve', receiver: 'Mike'}]);
console.log(publicLedger.blockChain);