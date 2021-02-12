import { Injectable } from '@angular/core';

import { Wallet } from '../models/wallet.model';
import { Transaction } from '../models/transaction.model';

import { wallets } from '../dummyData/wallets.data';
import { transactions } from '../dummyData/transaction.data';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  wallets: Wallet[] = wallets;
  transactionsData: Transaction[] = transactions;

  // constructor(private: ) {

  // }

  getWallet(id: string) {
    return { ...this.wallets.find((wallet) => wallet.walletId === id) };
  }

  getWalletTransaction(address: string) {
    return [...this.transactionsData.filter((trans) => trans.address === address)];
  }

  addWallet(name: string, address: string, type: string, privateKey: string) {
    const newWallet = new Wallet(
      //  hard code the userId/balance, add empty tokens/mnemonic,
      (Math.random() * 1000).toString(),
      'u1',
      name,
      type,
      address,
      [100, 0.0000003],
      false,
      [],
      privateKey,
      [],
      []
    );

    console.log(newWallet);

    return this.wallets.push(newWallet);
  }

  constructor() {}
}
