import hashlib
sha256 = hashlib.sha256
ripemd160 = hashlib.new('ripemd160')

# Turns a hexadecimal value represented as a string into its respective byte representation
# i.e. 'FF' -> b'\xff'
# Not case sensitive
def hexstring_to_byte(hexstring):
    return bytes([int(hexstring[i:i+2], 16) for i in range(0, len(hexstring), 2)])

# Perform a double sha256 hashing on a hexadecimal string
def sha256D(hexstring):
    return sha256(hexstring_to_byte(sha256(hexstring_to_byte(hexstring)).hexdigest())).hexdigest()

# Perform a sha256 hashing then a ripemd160 hashing on a hexadecimal string
def sha256ripemd160(hexstring):
    ripemd160.update(hexstring_to_byte(sha256(hexstring_to_byte(hexstring)).hexdigest()))
    return ripemd160.hexdigest()