import { Transaction } from './transaction.model';
import { Token } from './token.model';

export class Wallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: string,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string[],
    public transactions: Transaction[]
  ) {}
}
