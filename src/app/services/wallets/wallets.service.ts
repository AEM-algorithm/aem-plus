import { Injectable } from '@angular/core';
import { Wallet } from '../models/wallet.model';

import { wallets } from '../dummyData/wallets.data';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  //  =====  Mock wallets data =====
  // private _wallets: Wallet[] = [
  wallets: Wallet[] = wallets;
  // get wallets() {
  //   return [...this._wallets];
  // }

  getWallet(id: string) {
    return { ...this.wallets.find((wallet) => wallet.walletId === id) };
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
      []
    );

    console.log(newWallet);

    return this.wallets.push(newWallet);
  }

  constructor() {}
}
