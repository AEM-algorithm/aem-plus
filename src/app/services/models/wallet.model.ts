import { Transaction } from './transaction.model';
import { Token } from './token.model';
import { Coin } from 'src/app/enums/enums';
import { SimpleWallet as NemSimpleWallet } from 'nem-library';
import { SimpleWallet as SymbolSimpleWallet } from 'symbol-sdk';
import { BitcoinSimpleWallet } from '../bitcoin/bitcoin.provider';
export class Wallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public exchangeRate?: number,
    public walletPrettyAddress?: string,
  ) {
    // this.walletId = walletId;
    // this.userId = userId;
    // this.walletName = walletName;
    // this.walletType = walletType;
    // this.walletAddress = walletAddress;
    // this.isMultisig = isMultisig;
    // this.tokens = tokens;
    // this.privateKey = privateKey;
    // this.mnemonic = mnemonic;
    // this.transactions = transactions;
    // this.exchangeRate = exchangeRate;
    // this.walletPrettyAddress = walletPrettyAddress;
  }
}

export class NemWallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public simpleWallet: NemSimpleWallet,
    public exchangeRate?: number,
    public walletPrettyAddress?: string,
  ) { }
}

export class SymbolWallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public simpleWallet: SymbolSimpleWallet,
    public exchangeRate?: number,
    public walletPrettyAddress?: string,
  ) { }
}

export class BitcoinWallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public simpleWallet: BitcoinSimpleWallet,
  ) { }
}
