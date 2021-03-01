import { Injectable } from '@angular/core';

import { Wallet } from '../models/wallet.model';
import { wallets } from '../dummyData/wallets.data';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  wallets: Wallet[] = wallets;

  constructor() {}

  getWallets() {
    return this.wallets;
  }

  getWallet(id: string) {
    return this.wallets.find((wallet) => wallet.walletId === id);
  }

  addWallet(name: string, address: string, type: string, privateKey: string) {
    const newWallet = new Wallet(
      //  hard code the userId/balance, add empty tokens/mnemonic/transaction,
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

  updateWalletName(id: string, newName: string) {
    let updatedWallets: Wallet[];

    updatedWallets = [
      ...this.wallets.map((wallet) => (wallet.walletId === id ? { ...wallet, walletName: newName } : { ...wallet })),
    ];

    console.log('service:', this.wallets);
    this.wallets = updatedWallets;
  }

  deleteWallet(id: string) {
    const newWallets = this.wallets.filter((wallet) => wallet.walletId !== id);
    // console.log('new wallets:', newWallets);
    this.wallets = [...newWallets];
  }

  filterWallets(searchStr: string) {
    return searchStr && searchStr.trim() !== ''
      ? this.wallets.filter((wallet) => {
          return (
            wallet.walletName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
            wallet.walletAddress.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
          );
        })
      : this.wallets;
  }
}
