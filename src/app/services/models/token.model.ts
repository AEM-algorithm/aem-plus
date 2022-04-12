import { ErcTokenTypes } from "../ethers/ethersTokens.provider";

export class Token {
  id: string;
  name: string;
  balance: number[];
  tokenType: ErcTokenTypes | null;
  constructor(id: string, name: string, balance: number[], tokenType?:  ErcTokenTypes | null;) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.tokenType = tokenType;
  }
}
