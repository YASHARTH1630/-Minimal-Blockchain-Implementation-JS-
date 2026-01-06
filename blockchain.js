const crypto = require("crypto");

class Block { //describing each block
    constructor(index, timestamp, data, previousHash, nonce) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash("sha256") //it help to convert all the thing integrate with block in Hash
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce) //taking the data
            .digest("hex"); //to make readable hash and end will return hash
    }
    mineBlock(difficulty) {
        // Mining means finding a hash that starts with 'difficulty' number of zeros.
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            // Keep changing nonce until condition is met.

            this.hash = this.calculateHash();
            // Recalculate hash with new nonce.
        }
        console.log("Block mined: " + this.hash);
        //  Show the successful hash once found.
    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; //chain will be in array
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Recalculate the hash and compare
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if previousHash matches the actual hash of the previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let t_18 = new Blockchain();
t_18.addBlock(new Block(1, "10/07/2017", { amount: 4 }));
t_18.addBlock(new Block(2, "10/07/2017", { amount: 10 }));
t_18.addBlock(new Block(3, "10/07/2017", { amount: 20 }));
if (t_18.isChainValid()) {
    console.log("successful");
} else {
    console.log("not a BlockChain");
}

console.log(JSON.stringify(t_18, null, 4)); //null for no  filter
