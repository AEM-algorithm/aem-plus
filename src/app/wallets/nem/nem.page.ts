import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import {
  Transaction as NemTransaction,
  TransferTransaction,
  Address,
  TransactionTypes,
  MosaicTransferable,
  Mosaic,
} from 'nem-library';

import { NemWallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { NemProvider } from 'src/app/services/nem/nem.provider';
import { CryptoProvider } from 'src/app/services/crypto/crypto.provider';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';

import { NemNodeSelectionComponent } from '../node-selection/nem-node-selection/nem-node-selection.component';

import { Coin } from 'src/app/enums/enums';

@Component({
  selector: 'app-nem',
  templateUrl: './nem.page.html',
  styleUrls: ['./nem.page.scss'],
})
export class NemPage implements OnInit {
  isShowChart = false;

  nemWallet: NemWallet;
  walletId: string;

  finalTransactions: Transaction[];

  segmentModel: string;

  isLoading: boolean;

  nemBalance = 0;
  AUD = 0;
  exchangeRate = 0;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
    private nem: NemProvider,
    private crypto: CryptoProvider,
    private router: Router,
    private helperFunService: HelperFunService
  ) { }

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.walletId = params.get('id');

      this.nemWallet = await this.walletProvider.getWalletByWalletId(this.walletId);

      if (this.walletId && !state?.token) {
        await this.initNemTxs();
      }

      if (state && state.token) {
        const token = state.token as MosaicTransferable;
        await this.initNemTxsToken(token);
      }
    });
  }

  async initNemTxs() {
    this.setWalletBalance(this.AUD, this.nemBalance);
    this.nemBalance = await this.nem.getXEMBalance(this.nemWallet.walletAddress);
    this.exchangeRate = await this.crypto.getExchangeRate('XEM', 'AUD');
    this.AUD = this.nemBalance * this.exchangeRate;
    this.setWalletBalance(this.AUD, this.nemBalance);

    await this.getTransactions(this.nemWallet.walletAddress);
  }

  async initNemTxsToken(token: MosaicTransferable) {
    this.nemWallet.walletName = token.mosaicId.description();

    this.setWalletBalance(this.AUD, this.nemBalance);
    this.nemBalance = token.amount;
    this.exchangeRate = await this.crypto.getExchangeRate('XEM', 'AUD');
    this.AUD = this.nemBalance * this.exchangeRate;
    this.setWalletBalance(this.AUD, this.nemBalance);

    await this.getTransactionsToken(this.nemWallet.walletAddress, token);
  }

  setWalletBalance(AUD: number, XEM: number) {
    this.nemWallet.walletBalance = [this.crypto.round(AUD), XEM];
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address = new Address(rawAddress);

    const allTxs: NemTransaction[] = await this.nem.getAllTransactionsFromAnAccount(
      address
    );

    /**
     * TODO feeCrypto, feeAud, confirmations, amountAUD, receiver, receiverAddress,
     * ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs as TransferTransaction;
      if (transferTxs.type === TransactionTypes.TRANSFER) {
        const isIncoming = transferTxs.recipient && address && transferTxs.recipient.equals(address);

        const parsedTxs = {
          transId: transferTxs.getTransactionInfo().id,
          time: this.helperFunService.momentFormatDate(new Date(transferTxs.timeWindow.timeStamp.toString()), 'llll'),
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: 0.25,
          feeAud: 2,
          amount: transferTxs.xem().amount,
          hash: transferTxs.getTransactionInfo().hash,
          confirmations: 1,
          amountAUD: this.crypto.round(transferTxs.xem().amount * this.exchangeRate),
          businessName: 'AEM',
          receiver: transferTxs.recipient.plain(),
          receiverAddress: transferTxs.recipient.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355,
          tax: 0,
          type: Coin.NEM,
        };
        transactions.push(parsedTxs);

        this.finalTransactions = transactions;
      }
    }

    this.dismissLoading();
  }

  async getTransactionsToken(rawAddress: string, token: MosaicTransferable): Promise<any> {
    const address = new Address(rawAddress);
    const allTxsToken = await this.nem.getAllTransactionsTokenFromMosaicId(address, token.mosaicId);
    console.log('allTxToken: ', allTxsToken);
    /**
     * TODO feeCrypto, feeAud, confirmations, amountAUD, receiver, receiverAddress,
     * ABN, tax
     */

    const transactions = [];
    for (const txs of allTxsToken) {
      const transferTxs = txs as any;
      if (transferTxs.type === TransactionTypes.TRANSFER) {
        const mosaicDefinition: MosaicTransferable = await this.nem.getMosaicsDefinitionByMosaicId(
          transferTxs._mosaics as Mosaic[],
          token.mosaicId
        );
        console.log('mosaicDefinitions', mosaicDefinition);

        const isIncoming = transferTxs.recipient && address && transferTxs.recipient.equals(address);

        const parsedTxs = {
          transId: transferTxs.getTransactionInfo().id,
          time: this.helperFunService.momentFormatDate(new Date(transferTxs.timeWindow.timeStamp.toString()), 'llll'),
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: 0.25, // TODO
          feeAud: 2, // TODO
          amount: mosaicDefinition?.amount,
          hash: transferTxs.getTransactionInfo().hash,
          confirmations: 1, // TODO
          // amountAUD: this.crypto.round(xem.amount * this.exchangeRate),
          amountAUD: 0, // TODO
          businessName: 'AEM',
          receiver: transferTxs.recipient.plain(), // TODO
          receiverAddress: transferTxs.recipient.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355, // TODO
          tax: (10 * 0.1) / (1 + 0.1), // TODO
          type: '',
        };
        transactions.push(parsedTxs);

        this.finalTransactions = transactions;
      }
    }

    this.dismissLoading();
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
      component: NemNodeSelectionComponent,
      componentProps: {
        walletId: this.walletId,
      }
    });
    return await modal.present();
  }
}
