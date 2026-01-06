# -Minimal-Blockchain-Implementation-JS-
 Block Structure
 
Each block in the chain contains the following properties:
- index: Position of the block in the chain.
- 
- timestamp: When the block was created.
- 
- data: Transaction or payload stored in the block.
- 
- previousHash: Hash of the preceding block, ensuring linkage.
- 
- nonce: A number used in mining to vary the hash output.
- 
- hash: The SHA-256 hash of the block’s contents.
- 
 Validation Logic (Tampering Detection)

The blockchain includes a method isChainValid() to verify integrity:
- Hash Recalculation:
- 
For each block, the stored hash is compared against a freshly recalculated hash.

- If they differ, it means the block’s data has been tampered with.
- 
- Previous Hash Link Check:
- 
Each block’s previousHash must match the actual hash of the block before it.

- If not, the chain has been broken or altered.
- 
Together, these checks ensure that any modification to block data or order invalidates the chain.

