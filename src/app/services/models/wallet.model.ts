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
  ) {}
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
  ) {}
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
  ) {}
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
  ) {}
}
