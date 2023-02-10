// modules
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Address as NemAddress } from 'nem-library';

// services
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { NemProvider } from '@app/services/nem/nem.provider';
import {ExchangeProvider} from '@app/services/exchange/exchange.provider';

// constants
import { WALLET_ICON } from '@app/constants/constants';
import { Coin } from 'src/app/enums/enums';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-listing-modal.component.html',
  styleUrls: ['./select-wallet-listing-modal.component.scss'],
})
export class SelectWalletListingModalComponent implements OnInit {

  wallets: any[];
  walletIcon;
  fiatSymbol: string;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private walletProvider: WalletProvider,
    private symbolProvider: SymbolProvider,
    private nemProvider: NemProvider,
    private loadingCtrl: LoadingController,
    private exchange: ExchangeProvider,
  ) {}

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
    this.walletIcon = WALLET_ICON;
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
      this.close();
      await this.router.navigate(
        ['/tabnav', 'wallets', 'receive', wallet.walletId],
        {
          state: { selectMosaic: balance[0] },
        }
      );
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
