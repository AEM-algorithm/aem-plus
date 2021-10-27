import { Component, OnInit } from '@angular/core';
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

import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { CryptoProvider } from 'src/app/services/crypto/crypto.provider';

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
export class SymbolPage implements OnInit {
  symbolWallet: SymbolWallet;

  segmentModel: string;

  finalTrans: Transaction[];

  isLoading: boolean;

  xymBalance = 0;
  AUD = 0;
  exchangeRate = 0;
  walletId: string;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private symbolProvider: SymbolProvider,
    private walletProvider: WalletProvider,
    private cryptoProvider: CryptoProvider,
    private router: Router,
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.walletId = params.get('id');

      if (this.walletId && !state?.token) {
        await this.initSymbolTxs();
      }

      if (state && state.token) {
        const token = state.token as SymbolTokenType;
        await this.initSymbolTokensTxs(token);
      }
    });
  }

  async initSymbolTxs() {
    this.symbolWallet = await this.walletProvider.getWalletByWalletId(this.walletId);
    const rawAddress = this.symbolWallet.walletAddress;

    this.setWalletBalance(this.AUD, this.xymBalance);
    this.xymBalance = await this.symbolProvider.getXYMBalance(rawAddress);
    this.exchangeRate = await this.cryptoProvider.getExchangeRate(Coin.SYMBOL , 'AUD');
    this.AUD = this.xymBalance * this.exchangeRate;
    this.setWalletBalance(this.AUD, this.xymBalance);

    this.symbolWallet.walletType = Coin.SYMBOL;
    await this.getTransactions(rawAddress);
  }

  async initSymbolTokensTxs(token: SymbolTokenType) {
    console.log('queryParams', token);

    this.symbolWallet = await this.walletProvider.getWalletByWalletId(this.walletId);
    const rawAddress = this.symbolWallet.walletAddress;
    const mosaicId = token.mosaic.id as MosaicId;

    this.symbolWallet.walletType = Coin.SYMBOL;
    this.symbolWallet.walletName = this.namespaceFormat(token.namespaceNames)
      ? this.namespaceFormat(token.namespaceNames)
      : mosaicId.toHex();

    this.setWalletBalance(this.AUD, this.xymBalance);
    this.xymBalance = this.balanceFormat(
      token.mosaic.amount.compact(),
      token.info.divisibility
    );
    this.exchangeRate = await this.cryptoProvider.getExchangeRate(Coin.SYMBOL , 'AUD');
    this.AUD = this.xymBalance * this.exchangeRate;
    this.setWalletBalance(this.AUD, this.xymBalance);

    await this.getTokenTransactions(mosaicId, rawAddress);
  }

  setWalletBalance(AUD: number, XYM: number) {
    this.symbolWallet.walletBalance = [this.cryptoProvider.round(AUD), XYM];
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address: Address = Address.createFromRawAddress(rawAddress);

    const allTxs: SymbolTransaction[] = await this.symbolProvider.getAllTransactionsFromAnAccount(
      address
    );

    const epochAdjustment = await this.symbolProvider.getEpochAdjustment();

    const rate = 0.1;
    // const feeCrypto = RentalFee

    /**
     * TODO feeAud, confirmations, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs as TransferTransaction;
      if (transferTxs.type === TransactionType.TRANSFER) {
        const txsTime = TimeHelpers.getTransactionDate(transferTxs.deadline, 2, epochAdjustment, 'llll');

        const amountTxs = await this.symbolProvider.getAmountTxs(transferTxs, this.symbolProvider.symbolMosaicId);
        const xymPaidFee = await this.symbolProvider.getXYMPaidFee(transferTxs, this.symbolProvider.symbolMosaicId);

        const isIncoming = this.symbolProvider.isIncomingTxs(transferTxs, address);

        const parsedTxs = {
          transId: transferTxs.transactionInfo.id,
          time: txsTime,
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: xymPaidFee,
          feeAud: this.cryptoProvider.round(xymPaidFee * this.exchangeRate), // TODO
          amount: amountTxs,
          hash: transferTxs.transactionInfo.hash,
          confirmations: 1, // TODO
          amountAUD: this.cryptoProvider.round(amountTxs * this.exchangeRate), // TODO
          businessName: 'AEM', // TODO
          receiver: transferTxs.recipientAddress.plain(), // TODO
          receiverAddress: transferTxs.recipientAddress.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355, // TODO
          tax: (10 * this.exchangeRate) / (1 + this.exchangeRate), // TODO
          type: Coin.SYMBOL,
        };
        transactions.push(parsedTxs);

        this.finalTrans = transactions;
      }
    }

    this.dismissLoading();
  }

  async getTokenTransactions(mosaicId: MosaicId, rawAddress: string): Promise<any> {
    const address: Address = Address.createFromRawAddress(rawAddress);

    const allTokenTxs: SymbolTransaction[] = await this.symbolProvider.getAllTransactionsFromMosaicId(mosaicId);

    const epochAdjustment = await this.symbolProvider.getEpochAdjustment();

    /**
     * TODO feeAud, confirmations, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of allTokenTxs) {
      const transferTxs = txs as TransferTransaction;
      console.log('transferTxs', transferTxs);
      if (transferTxs.type === TransactionType.TRANSFER) {
        const txsTime = TimeHelpers.getTransactionDate(transferTxs.deadline, 2, epochAdjustment, 'llll');

        const amountTxs = await this.symbolProvider.getAmountTxs(transferTxs, mosaicId.id.toHex());
        const xymPaidFee = await this.symbolProvider.getXYMPaidFee(transferTxs, mosaicId.id.toHex());

        const isIncoming = this.symbolProvider.isIncomingTxs(transferTxs, address);

        const parsedTxs = {
          transId: transferTxs.transactionInfo.id,
          time: txsTime,
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: xymPaidFee,
          feeAud: this.cryptoProvider.round(xymPaidFee * this.exchangeRate), // TODO
          amount: amountTxs,
          hash: transferTxs.transactionInfo.hash,
          confirmations: 1, // TODO
          amountAUD: this.cryptoProvider.round(amountTxs * this.exchangeRate), // TODO
          businessName: 'AEM', // TODO
          receiver: transferTxs.recipientAddress.plain(), // TODO
          receiverAddress: transferTxs.recipientAddress.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355, // TODO
          tax: (10 * this.exchangeRate) / (1 + this.exchangeRate), // TODO
          type: Coin.SYMBOL,
        };
        transactions.push(parsedTxs);

        this.finalTrans = transactions;
      }
    }

    this.dismissLoading();
  }

  balanceFormat(amount: number, divisibility: number): number {
    const mathPow = Math.pow(
      10, divisibility
    );
    return amount / mathPow;
  }

  namespaceFormat(namespace: MosaicNames): string {
    if (namespace.names.length > 0) {
      return namespace.names.map(_ => _.name).join(':');
    }
    return null;
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
}
