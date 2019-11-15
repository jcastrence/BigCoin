const { spawnSync } = require('child_process');
const SHA256 = require('crypto-js/sha256');
// Utility functions that will be used by the Ledger class

// Double SHA256 prevents against length extension attacks by hashing twice
let SHA256d = (x) => SHA256(SHA256(x)).toString();
// Gets the current time and date and converts into datetime format
let getDateTime = () => {
    let today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        + ` ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}.${today.getMilliseconds()}`;
}

function sha256D(key) {
    return spawnSync('python3', ['get_hash.py'],
        {
            cwd: 'src/BigCoin/util',
            input:JSON.stringify(['sha256D', key])
        }
    ).stdout.toString();
}

function sha256ripemd160(key) {
    return spawnSync('python3', ['get_hash.py'],
        {
            cwd: 'src/BigCoin/util',
            input:JSON.stringify(['sha256ripemd160', key])
        }
    ).stdout.toString();
}

module.exports.SHA256d = SHA256d;
module.exports.getDateTime = getDateTime;
module.exports.sha256D = sha256D;
module.exports.sha256ripemd160 = sha256ripemd160;