import sys, json
from hash import sha256D
from hash import sha256ripemd160

def main():
    input = json.loads(sys.stdin.readline())
    if input[0] == 'sha256D':
        print(sha256D(input[1]))
    elif input[0] == 'sha256ripemd160':
        print(sha256ripemd160(input[1]))

if __name__ == '__main__':
    main()