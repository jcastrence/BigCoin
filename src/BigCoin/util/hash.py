import hashlib
sha256 = hashlib.sha256
ripemd160 = hashlib.new('ripemd160')

# Turns a hexadecimal value represented as a string into its respective byte representation
# i.e. 'FF' -> b'\xff'
# Not case sensitive
def hexstringToByte(hexstring):
    return bytes([int(hexstring[i:i+2], 16) for i in range(0, len(hexstring), 2)])

# Perform a double sha256 hashing on a hexadecimal string
def sha256D(hexstring):
    return sha256(hexstringToByte(sha256(hexstringToByte(hexstring)).hexdigest())).hexdigest()

# Perform a sha256 hashing then a ripemd160 hashing on a hexadecimal string
def sha256ripemd160(hexstring):
    ripemd160.update(hexstringToByte(sha256(hexstringToByte(hexstring)).hexdigest()))
    return ripemd160.hexdigest()

string = "80F7F58654AC15C47E3FB5B320192C9E658AF53DC001F915D4D0383FFEA4FA50A3"
print(hexstringToByte(string))