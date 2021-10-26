import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import {
  Address as SymbolAddress,
  Mosaic as SymbolMosaic,
  MosaicInfo as SymbolMosaicInfo,
  MosaicNames as SymbolMosaicNames,
} from 'symbol-sdk';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models//token.model';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { CryptoProvider } from 'src/app/services/crypto/crypto.provider';

import { WALLET_ICON } from 'src/app/constants/constants';
import { Coin } from 'src/app/enums/enums';

// TODO add more type
type BalanceType = {
  mosaic: SymbolMosaic,
  info: SymbolMosaicInfo,
  namespaceNames: SymbolMosaicNames,
};

type ModeType = 'send' | 'receive' | 'wallet';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-modal.component.html',
  styleUrls: ['./select-wallet-modal.component.scss'],
})
export class SelectWalletModalComponent implements OnInit {
  @Input() mode: ModeType;
  @Input() selectedWallet: Wallet;

  walletIcon = WALLET_ICON;
  balances: BalanceType[];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private symbol: SymbolProvider,
    private crypto: CryptoProvider,
  ) {}

  ngOnInit() {
  }

  setTokens(tokens: Token[]) {
    this.selectedWallet.tokens = tokens;
  }

  ionViewWillEnter() {
    this.initializeTokens();
  }

  async initializeTokens() {
    this.balances = await this.getBalance();
    const tokens = this.getToken(this.balances);
    this.setTokens(tokens);
  }

  async getBalance(): Promise<BalanceType[]> {
    let balance: BalanceType[] = [];
    switch (this.selectedWallet.walletType) {
      case Coin.SYMBOL:
        const address: SymbolAddress = this.symbol.getAddress(this.selectedWallet.walletAddress);
        balance = await this.symbol.getSymbolTokens(address);
        break;
      case Coin.NEM:
        // TODO
        break;
      case Coin.BITCOIN:
        // TODO
        break;
      default:
        break;
    }
    return balance;
  }

  getToken(balances: BalanceType[]) {
    return balances.map(({mosaic, info, namespaceNames}: BalanceType) => new Token(
      mosaic.id.id.toHex(),
      this.namespaceFormat(namespaceNames),
      [
        this.crypto.round(this.balanceFormat(mosaic.amount.compact(), info.divisibility)  * this.selectedWallet.exchangeRate),
        this.balanceFormat(mosaic.amount.compact(), info.divisibility)
      ],
    ));
  }

  namespaceFormat(namespace: SymbolMosaicNames): any {
    if (namespace.names.length > 0) {
      return namespace.names.map(_ => _.name).join(':');
    }
    return 'Token';
  }

  balanceFormat(amount: number, divisibility: number): number {
    const mathPow = Math.pow(
      10, divisibility
    );
    return amount / mathPow;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private navToWallet() {
    let walletPage;
    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        break;
      case Coin.BITCOIN:
        // TODO:
        break;
    }

    if (walletPage) {
      this.router.navigate(['/tabnav', 'wallets', walletPage, this.selectedWallet.walletId]);
    }

    this.modalCtrl.dismiss();
  }

  private navToToken(index) {
    let walletPage;

    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        break;
      case Coin.BITCOIN:
        // TODO:
        break;
    }

    const token = this.getTokenByIndex(index);
    console.log('select-wallet-modal.component', 'token', token, 'walletPage', walletPage);
    if (walletPage && token) {
      this.router.navigate(
        ['/tabnav', 'wallets', walletPage, this.selectedWallet.walletId, 'token', token.mosaic.id.toHex()],
        {
          queryParams: token
        });
    }

    this.modalCtrl.dismiss();
  }

  // onSelect() {
  //   // TODO passing this wallet's address to send & receive:
  //   if (this.mode === 'send') {
  //     this.router.navigate(['/', 'send', 'main']);
  //   } else if (this.mode === 'receive') {
  //     this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
  //   } else {
  //     this.navToWallet();
  //   }

  //   this.closeModal();
  // }

  onSelectWallet() {
    console.log('hvh', ' select-wallet-modal', 'onSelectWallet()', 'mode: ', this.mode, 'wallet:', this.selectedWallet);

    switch (this.mode) {
      case 'send':
        this.router.navigate(['/tabnav', 'wallets', 'send', this.selectedWallet.walletId]);
        break;
      case 'receive':
        this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
        break;
      case 'wallet':
        this.navToWallet();
        break;
      default:
        break;
    }

    this.close();
  }

  onSelectToken(index) {
    console.log('hvh', ' select-wallet-modal', 'onSelectToekn()');

    switch (this.mode) {
      case 'send':
        const selectedToken = this.selectedWallet.tokens[index];
        console.log('onSelectToken', 'selectedToken', selectedToken);
        this.router.navigate(['/tabnav', 'wallets', 'send', this.selectedWallet.walletId, 'token', selectedToken.id]);
        break;
      case 'receive':
        this.router.navigate(['/', 'receive', this.selectedWallet.walletId]);
        break;
      case 'wallet':
        this.navToToken(index);
        break;
      default:
        break;
    }

    this.close();
  }

  getTokenByIndex(index): BalanceType {
    const token = this.selectedWallet.tokens[index];
    if (this.balances.length > 0) {
      return this.balances.find((balance) => token.id === balance.mosaic.id.id.toHex());
    }
    return;
  }
}
