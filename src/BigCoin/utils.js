const SHA256 = require('crypto-js/sha256');
// Utility functions that will be used by the Ledger class

// Double SHA256 prevents against length extension attacks by hashing twice
let SHA256d = (x) => SHA256(SHA256(x).toString()).toString();
// Gets the current time and date and converts into datetime format
let getDateTime = () => {
    let today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        + ` ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()}`;
}

module.exports.SHA256d = SHA256d;
module.exports.getDateTime = getDateTime;