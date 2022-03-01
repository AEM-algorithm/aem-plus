import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import _ from 'lodash';

import { NotificationsProvider } from '../services/notifications/notifications.provider';
import { WalletProvider } from '../services/wallets/wallet.provider';
import { ExchangeProvider } from '../services/exchange/exchange.provider';
import { SymbolListenerProvider } from '@app/services/symbol/symbol.listener.provider';
import { NemListenerProvider } from '@app/services/nem/nem.listener.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';
import { Notification } from '@app/services/models/notification.model';
import { SelectEthersNetworkModalComponent } from '@app/wallets/select-ethers-network-modal/select-ethers-network-modal.component';
import { EthersProvider } from '@app/services/ethers/ethers.provider';

import {
  Coin,
  NotificationType,
  TransactionNotificationType,
} from '@app/enums/enums';
import { ETHERS_NETWORKS } from '@app/constants/constants';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit, OnDestroy {
  wallets: any[] = [];
  allBalanceInCurrency: number;
  notificationCounts: number;
  currency: string;

  isObserver: boolean = false;

  ethersNetwork: any;
  currentNetwork: string;

  constructor(
    private wallet: WalletProvider,
    private notification: NotificationsProvider,
    private exchange: ExchangeProvider,
    private symbolListener: SymbolListenerProvider,
    private nemListener: NemListenerProvider,
    private toast: ToastProvider,
    private modalCtrl: ModalController,
    private ethers: EthersProvider,
  ) {}

  ngOnInit() {
    this.initAllWallet();
    this.observeConfirmTxs();
    this.initNetwork();
  }

  ngOnDestroy() {
    this.symbolListener.observeSymbolEvent.unsubscribe();
    this.nemListener.observeNemEvent.unsubscribe();
  }

  ionViewWillEnter() {
    if (this.isObserver) {
      this.observeSavedWalletOnChanged();
    }
    this.observeCurrencyOnChanged();
    this.isObserver = true;
  }

  private observeConfirmTxs() {
    this.symbolListener.observeSymbolEvent.subscribe(async (value) => {
      if (value) {
        const wallet = await this.wallet.getSymbolWalletByRawAddress(
          value.address
        );
        switch (value.type) {
          case 'unconfirmed':
            this.toast.showMessageWarning(
              wallet.walletName + ' ' + 'New unconfirmed transaction!'
            );
            break;
          case 'confirmed':
            this.getSymbolWallets().then((symbolWallet) => {
              this.setSyncWalletData(symbolWallet);
              this.syncWalletBalance();
            });
            const notificationId =
              Coin.SYMBOL.toString() +
              '_' +
              TransactionNotificationType.CONFIRMED_TRANSACTION +
              '_' +
              this.notification.getWalletNotificationNums(wallet.address);
            const message = 'Receive new confirmed transaction';
            const symbolNotification = new Notification(
              notificationId,
              NotificationType.TRANSACTION,
              'New Symbol confirmtransaction',
              message,
              new Date().getTime(),
              false,
              wallet.walletAddress
            );
            await this.notification.addNotifications(symbolNotification);
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + 'New confirmed transaction!'
            );
            break;
        }
      }
    });

    this.nemListener.observeNemEvent.subscribe(async (value) => {
      if (value) {
        const wallet = await this.wallet.getNemWalletByRawAddress(
          value.address
        );
        switch (value.type) {
          case 'unconfirmed':
            this.toast.showMessageWarning(
              wallet.walletName + ' ' + 'New unconfirmed transaction!'
            );
            break;
          case 'confirmed':
            this.getNemWallets().then((nemWallets) => {
              this.setSyncWalletData(nemWallets);
              this.syncWalletBalance();
            });
            const notificationId =
              Coin.NEM.toString() +
              '_' +
              TransactionNotificationType.CONFIRMED_TRANSACTION +
              '_' +
              this.notification.getWalletNotificationNums(wallet.address);
            const message = 'Receive new confirmed transaction';
            const nemNotification = new Notification(
              notificationId,
              NotificationType.TRANSACTION,
              'New NEM confirmtransaction',
              message,
              new Date().getTime(),
              false,
              wallet.address
            );
            this.notification.addNotifications(nemNotification);
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + 'New confirmed transaction!'
            );
            break;
        }
      }
    });
  }

  private async observeSavedWalletOnChanged() {
    const savedWallets = await this.wallet.getAllWallets();
    if (this.wallets.length > 0) {
      const shouldReload = _.differenceWith(
        this.wallets,
        savedWallets,
        _.isEqual
      );
      if (shouldReload.length > 0) {
        this.wallets = [];
        this.initAllWallet();
      }
    }
  }

  private async observeCurrencyOnChanged() {
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

  private async initAllWallet() {
    this.allBalanceInCurrency = 0;
    const allStorageWallet = await this.wallet.getAllWalletsData(true);
    this.wallets = [...this.wallets, ...allStorageWallet];
    this.getSyncWalletData();

    this.notificationCounts = await this.notification.getAllNotificationCounts();
  }

  private getSyncWalletData() {
    this.getNemWallets().then((nemWallets) => {
      this.setSyncWalletData(nemWallets);
    });
    this.getSymbolWallets().then((symbolWallet) => {
      this.setSyncWalletData(symbolWallet);
    });
    this.getBitcoinWallets().then((bitcoinWallet) => {
      this.setSyncWalletData(bitcoinWallet);
    });
    this.getETHWallets().then((ethWallet) => {
      this.setSyncWalletData(ethWallet);
    });
  }

  setSyncWalletData(syncWallets) {
    this.wallets = this.wallets.map((wallet: any) => {
      for (const syncWallet of syncWallets) {
        if (syncWallet.walletId === wallet.walletId) {
          return { ...wallet, ...syncWallet, isLoaded: true };
        }
      }
      return wallet;
    });
    this.syncCacheWallet(this.wallets);
    this.syncWalletBalance();
  }

  private syncCacheWallet(wallet: any[]) {
    this.wallet.setAllWallet(wallet);
  }

  private async syncWalletBalance() {
    this.allBalanceInCurrency = this.wallet.getWalletBalance(this.wallets);
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

  async getETHWallets(): Promise<any[]> {
    const ethWallets = await this.wallet.getETHWallets(false);
    return Promise.resolve(ethWallets);
  }

  private async initNetwork() {
    this.ethersNetwork = ETHERS_NETWORKS;
    this.currentNetwork = await this.ethers.getNetwork();
  }

  private async changeETHNetwork(value: string) {
    await this.ethers.setNetwork(value);
    await this.ethers.setProvider();
    await this.initNetwork();
    this.getETHWallets().then((ethWallet) => {
      this.setSyncWalletData(ethWallet);
    });
  }

  async handleOpenNetworkOnClick() {
    const modal = await this.modalCtrl
      .create({
        component: SelectEthersNetworkModalComponent,
        componentProps: {},
        cssClass: 'height-sixty-modal',
      });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data) {
      await this.changeETHNetwork(result.data);
    }
  }
}
