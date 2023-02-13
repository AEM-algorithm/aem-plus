// modules
import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import {Router} from '@angular/router';

// provider
import {WalletProvider} from '@app/services/wallets/wallet.provider';
import {SymbolProvider} from '@app/services/symbol/symbol.provider';
import {NemProvider} from '@app/services/nem/nem.provider';
import {ExchangeProvider} from '@app/services/exchange/exchange.provider';

// enums
import {Coin} from '@app/enums/enums';

// models
import {Address as NemAddress} from 'nem-library/dist/src/models/account/Address';

// constants
import {WALLET_ICON} from '@app/constants/constants';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  wallets: any[];
  walletIcon;
  fiatSymbol: string;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private modalController: ModalController,
    private router: Router,
    private walletProvider: WalletProvider,
    private symbolProvider: SymbolProvider,
    private nemProvider: NemProvider,
    private loadingCtrl: LoadingController,
    private exchange: ExchangeProvider,
  ) { }

  async getBalance(walletType: Coin, walletAddress: string) {
    let balance: any[] = [];
    switch (walletType) {
      case Coin.SYMBOL:
        const symbolAddress = this.symbolProvider.getAddress(walletAddress);
        balance = await this.symbolProvider.getSymbolTokens(symbolAddress);
        break;
      case Coin.NEM:
        const nemAddress = new NemAddress(walletAddress);
        balance = await this.nemProvider.getBalance(nemAddress);
        break;
      case Coin.BITCOIN:
        break;
      default:
        break;
    }
    return balance;
  }

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    this.walletIcon = WALLET_ICON;
    this.onInit();
  }

  async onInit() {
    this.getAllWallet();

    const currency = await this.exchange.getFiatCurrency();
    this.fiatSymbol = currency.fiatSymbol;
  }

  async getAllWallet() {
    this.wallets = await this.walletProvider.getAllWallets();
  }

  async handleWalletOnClick(wallet: any) {
    if (wallet) {
      const loading = await this.loadingCtrl.create({
        message: null,
        spinner: 'circular',
      });
      await loading.present();
      const balance = await this.getBalance(wallet.walletType, wallet.walletAddress);
      await loading.dismiss();

      await this.router.navigate(
        ['/tabnav', 'receive', 'receive', wallet.walletId],
        {
          state: { selectMosaic: balance[0] },
        }
      );
    }
  }

  handleBackOnClick() {
    this.navCtrl.back();
  }

  async handleRefresh(event) {
    await this.onInit();
    event.target.complete();
  }

}
