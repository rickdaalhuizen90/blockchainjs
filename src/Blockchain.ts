import {IBlock, Block} from './Block';

interface IBlockchain {
  chain: IBlock[]
}

class Blockchain implements IBlockchain {
    chain: IBlock[]

    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis(): IBlock {
        return new Block(0, 660787200, [{message: 'Hello World!'}])
    }

    latestBlock(): IBlock {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock: IBlock): void {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    }

    checkValid(): boolean {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

export default Blockchain;