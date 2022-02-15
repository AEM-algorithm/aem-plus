import { Transaction } from './transaction.model';
import { Token } from './token.model';
import { Coin } from 'src/app/enums/enums';
import { ISimpleWalletDTO } from 'symbol-sdk';
import { BitcoinSimpleWallet } from '../bitcoin/bitcoin.provider';
import { EthersSimpleWallet } from '@app/services/ethers/ethers.provider';

export class Wallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin | string,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public exchangeRate?: number,
    public walletPrettyAddress?: string,
    public currency?: string
  ) {}
}

export class NemWallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin | string,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public simpleWallet: string,
    public exchangeRate?: number,
    public walletPrettyAddress?: string,
    public currency?: string
  ) {}
}

export class SymbolWallet {
  constructor(
    public walletId: string,
    public userId: string,
    public walletName: string,
    public walletType: Coin | string,
    public walletAddress: string,
    public walletBalance: number[],
    public isMultisig: boolean,
    public tokens: Token[],
    public privateKey: string,
    public mnemonic: string,
    public transactions: Transaction[],
    public simpleWallet: ISimpleWalletDTO,
    public exchangeRate?: number,
    public walletPrettyAddress?: string,
    public currency?: string
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
    public currency?: string
  ) {}
}

export class ETHWallet {
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
    public simpleWallet: EthersSimpleWallet,
    public currency?: string
  ) {}
}
