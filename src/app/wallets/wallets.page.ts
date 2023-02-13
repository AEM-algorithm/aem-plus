// modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import _ from 'lodash';

// services
import { NotificationsProvider } from '../services/notifications/notifications.provider';
import { WalletProvider } from '../services/wallets/wallet.provider';
import { ExchangeProvider } from '../services/exchange/exchange.provider';
import { SymbolListenerProvider } from '@app/services/symbol/symbol.listener.provider';
import { NemListenerProvider } from '@app/services/nem/nem.listener.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';
import { Notification } from '@app/services/models/notification.model';
import { EthersProvider } from '@app/services/ethers/ethers.provider';
import { EthersListenerProvider } from '@app/services/ethers/ethers.listener.provider';

// components
import { SelectEthersNetworkModalComponent } from '@app/wallets/select-ethers-network-modal/select-ethers-network-modal.component';
import {DonationModalComponent} from '@app/donation-modal/donation-modal.component';

// enums
import { Coin, NotificationType, TransactionNotificationType, } from '@app/enums/enums';

// constants
import { ETHERS_NETWORKS } from '@app/constants/constants';

// environments
import {environment} from '@environments/environment';

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
  fiatSymbol: string;

  isObserver: boolean = false;

  ethersNetwork = ETHERS_NETWORKS;
  currentNetwork: string;

  isSelectETHNode = !environment.production;

  constructor(
    private wallet: WalletProvider,
    private notification: NotificationsProvider,
    private exchange: ExchangeProvider,
    private symbolListener: SymbolListenerProvider,
    private nemListener: NemListenerProvider,
    private toast: ToastProvider,
    private modalCtrl: ModalController,
    private ethers: EthersProvider,
    private ethersListener: EthersListenerProvider,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getEthersNetwork();
    this.initAllWallet();
    this.observeConfirmTxs();
  }

  ngOnDestroy() {
    this.symbolListener.observeSymbolEvent.unsubscribe();
    this.nemListener.observeNemEvent.unsubscribe();
    this.ethersListener.observeEthersEvent.unsubscribe();
  }

  ionViewWillEnter() {
    this.getEthersNetwork();
    if (this.isObserver) {
      this.observeSavedWalletOnChanged();
    }
    this.observeCurrencyOnChanged();
    this.isObserver = true;
  }

  async handleRefresh(event) {
    this.getSyncWalletData();
    event.target.complete();
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
            await this.updateNotification(wallet.walletAddress, Coin.SYMBOL);
            this.getSymbolWallets().then((symbolWallet) => {
              this.setSyncWalletData(symbolWallet);
              this.syncWalletBalance();
            });
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
            await this.updateNotification(wallet.walletAddress, Coin.NEM);
            this.getNemWallets().then((nemWallets) => {
              this.setSyncWalletData(nemWallets);
              this.syncWalletBalance();
            });
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + 'New confirmed transaction!'
            );
            break;
        }
      }
    });

    this.ethersListener.observeEthersEvent.subscribe(async (value) => {
      if (value) {
        const wallet = await this.wallet.getETHWalletByAddress(
          value.address
        );
        switch (value.type) {
          case 'unconfirmed':
            this.toast.showMessageWarning(
              wallet.walletName + ' ' + 'New unconfirmed transaction!'
            );
            break;
          case 'confirmed':
            await this.updateNotification(wallet.walletAddress, Coin.ETH);
            this.getETHWallets().then((ethWallets) => {
              this.setSyncWalletData(ethWallets);
              this.syncWalletBalance();
            });
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + 'New confirmed transaction!'
            );
            break;
        }
      }
    });
  }

  private async updateNotification(address: string, coin: Coin) {
    const notificationId = coin +
      '_' +
      TransactionNotificationType.CONFIRMED_TRANSACTION +
      '_' +
      this.notification.getWalletNotificationNums(address);
    const notification = new Notification(
      notificationId,
      NotificationType.TRANSACTION,
      `New ${coin} confirm transaction`,
      'Receive new confirmed transaction',
      new Date().getTime(),
      false,
      address
    );
    await this.notification.addNotifications(notification);
    await this.notification.getNotifications();
    this.notificationCounts = this.notification.getAllNotificationCounts();
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

    this.notificationCounts = this.notification.getAllNotificationCounts();

    const currency = await this.exchange.getFiatCurrency();
    this.fiatSymbol = currency.fiatSymbol;
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

  private async getEthersNetwork() {
    this.currentNetwork = await this.ethers.getNetwork();
  }

  private async changeETHNetwork(value: string) {
    this.setWalletLoading(true, Coin.ETH);
    await this.ethers.setNetwork(value);
    await this.ethers.setProvider();
    await this.getEthersNetwork();
    this.getETHWallets().then((ethWallet) => {
      this.setSyncWalletData(ethWallet);
    });
  }

  private setWalletLoading(isLoading: boolean, walletType: Coin) {
    this.wallets = this.wallets.map(wlt => ({
      ...wlt,
      isLoaded: isLoading ? wlt.walletType !== walletType : true,
    }));
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

  async handleDonationOnClick() {
    const modal = await this.modalCtrl
      .create({
        component: DonationModalComponent,
        componentProps: {},
        cssClass: 'center-medium-modal',
      });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data?.continue) {
      this.onHandleContinueDonation();
    }
  }

  onHandleContinueDonation() {
    this.router.navigate(['/tabnav', 'wallets', 'contribute-donation'], {
      relativeTo: this.route,
    });
  }
}
