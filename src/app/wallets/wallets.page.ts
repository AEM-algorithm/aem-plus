import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../services/notifications/notifications.service';
import { WalletProvider } from '../services/wallets/wallet.provider';
import { ExchangeProvider } from '../services/exchange/exchange.provider';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit {
  wallets: any[] = [];
  allBalanceInAud: number;
  notificationCounts: number;
  currency: string;

  constructor(
    private wallet: WalletProvider,
    private notificationService: NotificationsService,
    private exchange: ExchangeProvider,
  ) { }

  ngOnInit() {
    this.initAllWallet();
  }

  ionViewWillEnter() {
    this.observeCurrencyOnChanged();
  }

  async observeCurrencyOnChanged() {
    const currency = await this.exchange.getCurrency();
    if (this.currency) {
      const isCurrencyChanged = currency !== this.currency;
      if (isCurrencyChanged) {
        this.wallets = [];
        this.initAllWallet();
      }
    }
    this.currency = currency;
  }

  async initAllWallet() {
    this.allBalanceInAud = 0;
    const allStorageWallet = await this.wallet.getAllWalletsData(true);
    this.wallets = [...this.wallets, ...allStorageWallet];
    this.getSyncWalletData();

    this.notificationCounts = await this.notificationService.getAllNotificationCounts();
  }

  getSyncWalletData() {
    this.getNemWallets().then(nemWallets => {
      this.setSyncWalletData(nemWallets);
    });
    this.getSymbolWallets().then(symbolWallet => {
      this.setSyncWalletData(symbolWallet);
    });
    this.getBitcoinWallets().then(bitcoinWallet => {
      this.setSyncWalletData(bitcoinWallet);
    });
  }

  setSyncWalletData(syncWallets) {
    this.wallets = this.wallets.map((wallet: any) => {
      for (const syncWallet of syncWallets) {
        if (syncWallet.walletId === wallet.walletId) {
          return {...wallet, ...syncWallet, isLoaded: true};
        }
      }
      return wallet;
    });
    this.syncCacheWallet(this.wallets);
    this.syncWalletBalance();
  }

  syncCacheWallet(wallet: any[]) {
    this.wallet.setAllWallet(wallet);
  }

  async syncWalletBalance() {
    this.allBalanceInAud = this.wallet.getWalletBalance(this.wallets);
  }

  async getNemWallets(): Promise<any[]> {
    const nemWallets = await this.wallet.getNemWallets(false);
    return Promise.resolve(nemWallets);
  }

  async getSymbolWallets(): Promise<any[]> {
    const symbolWallets = await this.wallet.getSymbolWallets(false);
    return Promise.resolve(symbolWallets);
  }
  async getBitcoinWallets(): Promise<any[]> {
    const bitcoinWallets = await this.wallet.getBitcoinWallets(false);
    return Promise.resolve(bitcoinWallets);
  }
}
