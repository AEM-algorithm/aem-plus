import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import {
  Address,
  Transaction as SymbolTransaction,
  TransactionType,
  TransferTransaction,
  Mosaic,
  MosaicInfo,
  MosaicNames,
  MosaicId,
} from 'symbol-sdk';

import { Transaction } from 'src/app/services/models/transaction.model';
import { SymbolWallet } from 'src/app/services/models/wallet.model';
import { SelectWalletModalComponent } from 'src/app/wallets/select-wallet-modal/select-wallet-modal.component';

import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { LoadingProvider } from 'src/app/services/loading/loading.provider';

import { SymbolNodeSelectionComponent } from '../node-selection/symbol-node-selection/symbol-node-selection.component';

import { Coin } from 'src/app/enums/enums';

import { TimeHelpers } from 'src/utils/TimeHelpers';

type SymbolTokenType = {
  mosaic: Mosaic,
  info: MosaicInfo,
  namespaceNames: MosaicNames,
};

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.page.html',
  styleUrls: ['./symbol.page.scss'],
})
export class SymbolPage implements OnInit, OnDestroy {
  symbolWallet: SymbolWallet;

  segmentModel: string;

  finalTrans: Transaction[];

  isLoading: boolean;

  xymBalance = 0;
  currency = 0;
  exchangeRate = 0;
  walletId: string;

  token: SymbolTokenType;
  selectedWallet: SymbolWallet;

  isComponentActive: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private symbolProvider: SymbolProvider,
    private walletProvider: WalletProvider,
    private exchange: ExchangeProvider,
    private router: Router,
    private loading: LoadingProvider,
  ) {
    this.isComponentActive = true;
  }

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe((params) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.walletId = params.get('id');

      if (this.walletId && !state?.token) {
        this.initSymbolTxs();
      }

      if (state && state.token) {
        this.token = state.token as SymbolTokenType;
        this.initSymbolTokensTxs(this.token);
      }

      this.setSelectedWallet(this.walletId);
    });
  }

  ngOnDestroy() {
    this.isComponentActive = false;
  }

  async initSymbolTxs() {
    this.symbolWallet = await this.getSelectedWallet(this.walletId);
    if (!this.symbolWallet) {
      return;
    }

    const rawAddress = this.symbolWallet.walletAddress;

    this.getTransactions(rawAddress);

    this.setWalletBalance(this.currency, this.xymBalance);
    this.xymBalance = await this.symbolProvider.getXYMBalance(rawAddress);
    this.exchangeRate = await this.exchange.getExchangeRate(Coin.SYMBOL);
    this.currency = this.xymBalance * this.exchangeRate;
    this.setWalletBalance(this.currency, this.xymBalance);

    this.symbolWallet.walletType = Coin.SYMBOL;
  }

  async initSymbolTokensTxs(token: SymbolTokenType) {
    this.symbolWallet = await this.getSelectedWallet(this.walletId);
    if (!this.symbolWallet) {
      return;
    }
    const rawAddress = this.symbolWallet.walletAddress;

    const mosaicId = token.mosaic.id as MosaicId;

    this.symbolWallet.walletType = 'token units';

    this.setWalletBalance(this.currency, this.xymBalance);
    this.xymBalance = this.balanceFormat(
      token.mosaic.amount.compact(),
      token.info.divisibility
    );
    this.currency = -1;
    this.setWalletBalance(this.currency, this.xymBalance);

    await this.getTokenTransactions(mosaicId, rawAddress);
  }

  async setSelectedWallet(walletId) {
    const selectedWallet = await this.getSelectedWallet(walletId);
    if (this.isComponentActive) {
      this.selectedWallet = selectedWallet;
    }
  }

  async getSelectedWallet(walletId): Promise<SymbolWallet> {
    const wallet = await this.walletProvider.getSymbolWalletById(walletId);
    if (this.isComponentActive) {
      return wallet;
    }
    return null;
  }

  setWalletBalance(currency: number, XYM: number) {
    this.symbolWallet.walletBalance = [this.exchange.round(currency), XYM];
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address: Address = Address.createFromRawAddress(rawAddress);
    const allTxs: SymbolTransaction[] = await this.symbolProvider.getAllTransactionsFromAnAccount(
      address
    );
    await this.setTransactions(allTxs, this.symbolProvider.symbolMosaicId, address);
    this.dismissLoading();
  }

  async getTokenTransactions(mosaicId: MosaicId, rawAddress: string): Promise<any> {
    const address: Address = Address.createFromRawAddress(rawAddress);
    const allTokenTxs: SymbolTransaction[] = await this.symbolProvider.getAllTransactionsFromMosaicId(mosaicId);
    await this.setTransactions(allTokenTxs, mosaicId.id.toHex(), address);
    this.dismissLoading();
  }

  async setTransactions(symbolTransactions: SymbolTransaction[], mosaicIdHex: string, address: Address): Promise<any> {
    if (!this.isComponentActive) {
      return;
    }

    const epochAdjustment = await this.symbolProvider.getEpochAdjustment();

    /**
     * TODO feecurrency, confirmations, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of symbolTransactions) {
      const transferTxs = txs as TransferTransaction;
      if (transferTxs.type === TransactionType.TRANSFER && this.symbolProvider.isHasMosaic(transferTxs, mosaicIdHex)) {
        const txsTime = TimeHelpers.getTransactionDate(transferTxs.deadline, 2, epochAdjustment, 'llll');

        const amountTxs = await this.symbolProvider.getAmountTxs(transferTxs, mosaicIdHex);
        const xymPaidFee = await this.symbolProvider.getXYMPaidFee(transferTxs, mosaicIdHex);

        const isIncoming = this.symbolProvider.isIncomingTxs(transferTxs, address);
        const amountCurrency = this.token ? - 1 : this.exchange.round(amountTxs * this.exchangeRate);
        const type = this.token ? '' : Coin.SYMBOL;

        const transaction = new Transaction(
          transferTxs.transactionInfo.id,
          txsTime,
          isIncoming,
          transferTxs.signer.address.plain(),
          xymPaidFee,
          this.exchange.round(xymPaidFee * this.exchangeRate),
          amountTxs,
          transferTxs.transactionInfo.hash,
          1,
          amountCurrency,
          'AEM',
          transferTxs.recipientAddress.plain(),
          transferTxs.recipientAddress.plain(),
          transferTxs.message.payload,
          30793768392355,
          (10 * this.exchangeRate) / (1 + this.exchangeRate),
          '',
          type,
        );

        if (this.isComponentActive) {
          transactions.push(transaction);

          this.finalTrans = transactions;
        }
      }
    }
  }

  balanceFormat(amount: number, divisibility: number): number {
    const mathPow = Math.pow(
      10, divisibility
    );
    return amount / mathPow;
  }

  namespaceFormat(namespace: MosaicNames): string {
    return this.symbolProvider.namespaceFormat(namespace);
  }

  showLoading() {
    if (!this.isLoading) {
      this.isLoading = true;
    }
  }

  dismissLoading() {
    if (this.isLoading) {
      this.isLoading = false;
    }
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: SymbolNodeSelectionComponent,
      componentProps: {
        walletId: this.walletId,
      }
    });
    return await modal.present();
  }

  // ----   Select wallet or tokens modal:
  private async openSelectWalletModal() {
    if (!this.selectedWallet) {
      await this.loading.presentLoading();
      await this.setSelectedWallet(this.walletId);
      await this.loading.dismissLoading();
    }
    if (this.selectedWallet) {
      this.modalCtrl
        .create({
          component: SelectWalletModalComponent,
          componentProps: {
            selectedWallet: this.selectedWallet,
            mode: 'wallet',
          },
          cssClass: 'height-sixty-modal',
        })
        .then((modal) => {
          modal.present();
        });
    }
  }
}
