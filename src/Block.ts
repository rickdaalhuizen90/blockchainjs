import sha256 from 'crypto-js/sha256';

interface IData {
  message: string
}

interface IBlock {
  uid: number
  timestamp: number
  data: IData[];
  previousHash: string
  hash: string
  calculateHash(): string
}

class Block implements IBlock {
    uid: number;
    timestamp: number;
    data: IData[];
    previousHash: string;
    hash: string;

    constructor(uid: number, timestamp: number, data: IData[]) {
        this.uid = uid;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return sha256(this.uid + this.timestamp.toString() + this.data + this.previousHash).toString();
    }

    mineBlock(difficulty: number): void {
      // @todo
      console.log(difficulty)
    }
}

export {
  IBlock,
  Block
}

export default Block;
