import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import {
  Address as SymbolAddress,
  Mosaic as SymbolMosaic,
  MosaicInfo as SymbolMosaicInfo,
  MosaicNames as SymbolMosaicNames,
} from 'symbol-sdk';
import { Address as NemAddress, MosaicTransferable, } from 'nem-library';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models/token.model';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { NemProvider } from 'src/app/services/nem/nem.provider';

import { WALLET_ICON } from 'src/app/constants/constants';
import { Coin } from 'src/app/enums/enums';

// TODO add more type
type SymbolBalanceType = {
  mosaic: SymbolMosaic,
  info: SymbolMosaicInfo,
  namespaceNames: SymbolMosaicNames,
};

type ModeType = 'send' | 'receive' | 'wallet';
type BalanceType = SymbolBalanceType | MosaicTransferable;

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
  isLoading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private symbol: SymbolProvider,
    private exchange: ExchangeProvider,
    private nem: NemProvider,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.setLoading(true);
    await this.initializeTokens();
    this.setLoading(false);
  }

  setTokens(tokens: Token[]) {
    this.selectedWallet.tokens = tokens;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
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
        const symbolAddress: SymbolAddress = this.symbol.getAddress(this.selectedWallet.walletAddress);
        balance = await this.symbol.getSymbolTokens(symbolAddress);
        break;
      case Coin.NEM:
        const nemAddress: NemAddress = new NemAddress(this.selectedWallet.walletAddress);
        balance = await this.nem.getBalance(nemAddress);
        break;
      case Coin.BITCOIN:
        // TODO
        break;
      default:
        break;
    }
    return balance;
  }

  getToken(balances: BalanceType[]): Token[] {
    if (balances && balances.length > 0) {
      switch (this.selectedWallet.walletType) {
        case Coin.SYMBOL:
          const symbolTokens = balances.map(({ mosaic, info, namespaceNames }: SymbolBalanceType) => new Token(
            mosaic.id.id.toHex(),
            this.namespaceFormat(namespaceNames) ? this.namespaceFormat(namespaceNames) : mosaic.id.id.toHex(),
            [
              -1,
              this.balanceFormat(mosaic.amount.compact(), info.divisibility)
            ],
          ));
          return symbolTokens.filter((value) => value.id !== this.symbol.symbolMosaicId);
        case Coin.NEM:
          const defaultNemMosaicId = 'nem:xem';
          const nemTokens = balances.map((value: MosaicTransferable) => new Token(
            value.mosaicId.description(),
            value.mosaicId.description(),
            [-1, value.amount]
          ));
          return nemTokens.filter((value) => value.id !== defaultNemMosaicId);
        case Coin.BITCOIN:
          // TODO
          return [];
      }
    }
    return [];
  }

  namespaceFormat(namespace: SymbolMosaicNames): string {
    if (namespace.names.length > 0) {
      return namespace.names.map(_ => _.name).join(':');
    }
    return null;
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
        walletPage = 'bitcoin';
        break;
    }

    if (walletPage) {
      this.router.navigate(['/tabnav', 'wallets', walletPage, this.selectedWallet.walletId]);
    }

    this.modalCtrl.dismiss();
  }

  private navToToken(index) {
    let walletPage;
    let token;

    const selectedToken = this.selectedWallet.tokens[index];

    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        token = this.getWalletToken(selectedToken) as MosaicTransferable;
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        token = this.getWalletToken(selectedToken) as SymbolBalanceType;
        break;
      case Coin.BITCOIN:
        walletPage = 'bitcoin';
        break;
    }

    if (walletPage && token) {
      this.router.navigate(
        ['/tabnav', 'wallets', walletPage, this.selectedWallet.walletId, 'token', selectedToken.id],
        {
          state: {
            token
          }
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
    switch (this.mode) {
      case 'send':
        const selectedToken = this.selectedWallet.tokens[index];
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

  getWalletToken(token): BalanceType {
    if (this.balances && this.balances.length > 0) {
      switch (this.selectedWallet.walletType) {
        case Coin.SYMBOL:
          return this.balances.find((balance: SymbolBalanceType) => token.id === balance.mosaic.id.id.toHex());
        case Coin.NEM:
          return this.balances.find((balance: MosaicTransferable) => token.id === balance.mosaicId.description());
          return;
        case Coin.BITCOIN:
          // TODO
          return;
      }
    }
    return;
  }
}
