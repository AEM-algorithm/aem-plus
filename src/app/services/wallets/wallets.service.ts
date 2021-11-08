import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Wallet } from '../models/wallet.model';
import { wallets } from '../dummyData/wallets.data';
import { Transaction } from '../models/transaction.model';
import { Coin } from 'src/app/enums/enums';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  private wallets: Wallet[] = wallets;
  private nemWallets: Wallet[] = wallets;

  constructor(
    private storage: Storage
  ) {
  }


  /**
   * Get wallets
  */
  private getWallets(coin: Coin): Promise<any> {
    return this.storage.get(`${coin}Wallets`).then();
  }

  async getAllBalanceAud() {
    let balance = 0;
    this.wallets.forEach((wallet) => {
      balance += wallet.walletBalance[0];
    });

    return balance;
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
    return this.wallets.filter((wallet) => wallet.walletType === Coin[type]);
  }

  /**
   * Add a wallet
   */
  public addWallet(name: string = "Default Wallet", address: string, type: Coin, encryptedMnemonic?: string, encryptedPrivateKey?: string) {
    const newWallet = new Wallet(
      (Math.random() * 1000).toString(),
      "Default Wallet",
      name,
      type,
      address,
      [100, 0.00003],
      false,
      [],
      encryptedPrivateKey,
      encryptedMnemonic,
      []
    );

    console.log(newWallet);

    return this.wallets.push(newWallet);
  }

  // TODO on add wallet page.
  addWalletByMnemonic(name: string, address: string, type: string, mnemonic: string) {
    const newWallet = new Wallet(
      //  hard code the userId/balance, add empty tokens/mnemonic/transaction,
      (Math.random() * 1000).toString(),
      'u1',
      name,
      Coin.NEM,
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

  public async updateWalletName(id: string, newName: string, walletType: Coin) {
    let savedWallets = await this.getWallets(walletType);
    let updatedWallets: Wallet[];

    savedWallets = [
      ...savedWallets.map((wallet) => (wallet.walletId === id ? { ...wallet, walletName: newName } : { ...wallet })),
    ];
    this.storage.set(`${walletType}Wallets`, updatedWallets);
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

  createWallet

  // add trsansaction to the wallet
  sendTransaction(transaction: Transaction, walletId: string) {
    const wallet = this.getWallet(walletId);
    wallet.transactions.push(transaction);
  }
}
