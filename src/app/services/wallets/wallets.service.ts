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

  /**
   * get wallet by id:
   */
  getWallet(id: string) {
    return this.wallets.find((wallet) => wallet.walletId === id);
  }

  /**
   * Get wallet by address:
   */
  getWalletByAddress(address: string) {
    return this.wallets.find((wallet) => wallet.walletAddress === address);
  }

  /**
   * Get a wallet's token by token index (use case: navigate to token/ wallet page)
   */
  getTokenByIndex(wallet: Wallet, index: number) {
    return wallet.tokens[index];
  }

  /**
   * Get a wallet token by token id
   */
  getToken(wallet: Wallet, tokenId: string) {
    return wallet.tokens.find((token) => token.id === tokenId);
  }

  /**
   * Generate the token's transaction from the wallet's all transaction by tokenid
   */
  getTokenTransaction(wallet: Wallet, tokenId: string) {
    return wallet.transactions.filter((tran) => tran.tokenId === tokenId);
  }

  /**
   * Get user's a certain type of wallets
   */
  getSameTypeWallets(type: string) {
    return this.wallets.filter((wallet) => wallet.walletType === type);
  }

  /**
   * Add a wallet by private key (with user's input info)
   */
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

  // TODO on add wallet page.
  addWalletByMnemonic(name: string, address: string, type: string, mnemonic: string[]) {
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
      '',
      mnemonic,
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
