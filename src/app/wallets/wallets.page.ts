// modules
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';

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
import { DonationModalComponent } from '@app/donation-modal/donation-modal.component';

// enums
import {
  Coin,
  NotificationType,
  TransactionNotificationType,
} from '@app/enums/enums';

// constants
import { ETHERS_NETWORKS } from '@app/constants/constants';

// environments
import { environment } from '@environments/environment';
import { BnbListenerProvider } from '@app/services/bnb/bnb.listener.provider';

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
    private translate: TranslateService,
    private BnbListener: BnbListenerProvider
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
    console.log(this.wallets, 'no ne');
    // this.getSyncWalletData();
    // event.target.complete();
  }

  private async observeConfirmTxs() {
    const t = await this.translate
      .get([
        'wallets.new_confirmed_transaction',
        'wallets.new_unconfirmed_transaction',
      ])
      .toPromise();

    this.symbolListener.observeSymbolEvent.subscribe(async (value) => {
      if (value) {
        const wallet = await this.wallet.getSymbolWalletByRawAddress(
          value.address
        );
        switch (value.type) {
          case 'unconfirmed':
            this.toast.showMessageWarning(
              wallet.walletName + ' ' + t['wallets.new_unconfirmed_transaction']
            );
            break;
          case 'confirmed':
            await this.updateNotification(wallet.walletAddress, Coin.SYMBOL);
            this.getSymbolWallets().then((symbolWallet) => {
              this.setSyncWalletData(symbolWallet);
              this.syncWalletBalance();
            });
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + t['wallets.new_confirmed_transaction']
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
              wallet.walletName + ' ' + t['wallets.new_unconfirmed_transaction']
            );
            break;
          case 'confirmed':
            await this.updateNotification(wallet.walletAddress, Coin.NEM);
            this.getNemWallets().then((nemWallets) => {
              this.setSyncWalletData(nemWallets);
              this.syncWalletBalance();
            });
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + t['wallets.new_confirmed_transaction']
            );
            break;
        }
      }
    });

    this.BnbListener.observeBNBEvent.subscribe(async (value) => {
      if (value) {
        const wallet = await this.wallet.getBNBWalletByAddress(value.address);
        if (wallet === null) {
          this.toast.showMessageError(
            wallet.walletName + ' ' + 'transaction failed'
          );
        }
        switch (value.type) {
          case 'unconfirmed':
            this.toast.showMessageWarning(
              wallet.walletName + ' ' + t['wallets.new_unconfirmed_transaction']
            );
            break;
          case 'confirmed':
            await this.updateNotification(wallet.walletAddress, Coin.BNB);
            this.getBNBWallets().then((bnbWallet) => {
              this.setSyncWalletData(bnbWallet);
              this.syncWalletBalance();
            });
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + t['wallets.new_confirmed_transaction']
            );
            break;
        }
      }
    });

    this.ethersListener.observeEthersEvent.subscribe(async (value) => {
      if (value) {
        const wallet = await this.wallet.getETHWalletByAddress(value.address);
        switch (value.type) {
          case 'unconfirmed':
            this.toast.showMessageWarning(
              wallet.walletName + ' ' + t['wallets.new_unconfirmed_transaction']
            );
            break;
          case 'confirmed':
            await this.updateNotification(wallet.walletAddress, Coin.ETH);
            this.getETHWallets().then((ethWallets) => {
              this.setSyncWalletData(ethWallets);
              this.syncWalletBalance();
            });
            this.toast.showMessageSuccess(
              wallet.walletName + ' ' + t['wallets.new_confirmed_transaction']
            );
            break;
        }
      }
    });
  }

  public async updateNotification(address: string, coin: Coin) {
    const t = await this.translate
      .get([
        'wallets.new_confirm_transaction',
        'wallets.receive_new_confirmed_transaction',
      ])
      .toPromise();
    const notificationId =
      coin +
      '_' +
      TransactionNotificationType.CONFIRMED_TRANSACTION +
      '_' +
      this.notification.getWalletNotificationNums(address);
    const notification = new Notification(
      notificationId,
      NotificationType.TRANSACTION,
      `[${coin}] ` + t['wallets.new_confirm_transaction'],
      t['wallets.receive_new_confirmed_transaction'],
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
        this.initAllWallet(isCurrencyChanged);
      }
    }
    this.currency = currency;
  }

  private async initAllWallet(isCurrencyChanged?: boolean) {
    this.allBalanceInCurrency = 0;
    const allStorageWallet = await this.wallet.getAllWalletsData(true);

    this.wallets = [...this.wallets, ...allStorageWallet];
    this.getSyncWalletData(isCurrencyChanged);

    this.notificationCounts = this.notification.getAllNotificationCounts();

    const currency = await this.exchange.getFiatCurrency();
    this.fiatSymbol = currency.fiatSymbol;
  }

  private getSyncWalletData(isCurrencyChanged?: boolean) {
    this.getNemWallets(isCurrencyChanged).then((nemWallets) => {
      this.setSyncWalletData(nemWallets);
    });
    this.getSymbolWallets(isCurrencyChanged).then((symbolWallet) => {
      this.setSyncWalletData(symbolWallet);
    });
    this.getBitcoinWallets(isCurrencyChanged).then((bitcoinWallet) => {
      this.setSyncWalletData(bitcoinWallet);
    });
    this.getETHWallets(isCurrencyChanged).then((ethWallet) => {
      this.setSyncWalletData(ethWallet);
    });
    this.getBNBWallets(isCurrencyChanged).then((bnbWallet) => {
      this.setSyncWalletData(bnbWallet);
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

  async getNemWallets(isCurrencyChanged?: boolean): Promise<any[]> {
    return this.wallet.getNemWallets(false, isCurrencyChanged);
  }

  async getSymbolWallets(isCurrencyChanged?: boolean): Promise<any[]> {
    return await this.wallet.getSymbolWallets(false, isCurrencyChanged);
  }

  async getBitcoinWallets(isCurrencyChanged?: boolean): Promise<any[]> {
    return this.wallet.getBitcoinWallets(false, isCurrencyChanged);
  }

  async getETHWallets(isCurrencyChanged?: boolean): Promise<any[]> {
    return this.wallet.getETHWallets(false, isCurrencyChanged);
  }

  async getBNBWallets(isCurrencyChanged?: boolean): Promise<any[]> {
    return this.wallet.getBNBWallets(false, isCurrencyChanged);
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
    this.wallets = this.wallets.map((wlt) => ({
      ...wlt,
      isLoaded: isLoading ? wlt.walletType !== walletType : true,
    }));
  }

  async handleOpenNetworkOnClick() {
    const modal = await this.modalCtrl.create({
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
    const modal = await this.modalCtrl.create({
      component: DonationModalComponent,
      componentProps: {},
      cssClass: 'center-medium-modal',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
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
