const Ledger = require('./bigCoin/ledger.js').Ledger;

const publicLedger = new Ledger();
// MikeMiner mines the first block, and is rewarded 50 BigCoins
publicLedger.mineBlock('MikeMiner');
// MikeMiner sends 10 BigCoins to Alice and 10 BigCoins to Bob
// These transactions are broadcast to the BigCoin ledger
publicLedger.requestTransaction('MikeMiner', 'Alice', 10);
publicLedger.requestTransaction('MikeMiner', 'Bob', 10);
// MikeMiner mines the second block
publicLedger.mineBlock('MikeMiner');
// Bob sends 5 BigCoins to Charles
// This transaction is broadcast to the BigCoin ledger
publicLedger.requestTransaction('Bob', 'Charles', 5);
// Eve tries to send 5 BigCoins to Bob even though her balance is 0
publicLedger.requestTransaction('Eve', 'Bob', 5);
// Bob mines the third Block
publicLedger.mineBlock('Bob');


// Let's look at the blockchain so far...
console.log("Genesis Block:\n");
console.log(publicLedger.blockChain[0]);
console.log("\nBlock 1:\n");
console.log(publicLedger.blockChain[1]);
console.log("\nBlock 2:\n");
console.log(publicLedger.blockChain[2]);
console.log("\nBlock 3:\n");
console.log(publicLedger.blockChain[3]);
console.log("\nBalances:");
console.log(`MikeMiner: ${publicLedger.getBalance('MikeMiner')}`);
console.log(`Alice: ${publicLedger.getBalance('Alice')}`);
console.log(`Bob: ${publicLedger.getBalance('Bob')}`);
console.log(`Charles: ${publicLedger.getBalance('Charles')}`);
console.log(`Eve: ${publicLedger.getBalance('Eve')}`);

