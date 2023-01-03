import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { SelectWalletModalComponent } from 'src/app/wallets/select-wallet-modal/select-wallet-modal.component';
import { LoadingProvider } from 'src/app/services/loading/loading.provider';

import { NemNodeSelectionComponent } from '../node-selection/nem-node-selection/nem-node-selection.component';

import { Coin } from 'src/app/enums/enums';

@Component({
  selector: 'app-nem',
  templateUrl: './nem.page.html',
  styleUrls: ['./nem.page.scss'],
})
export class NemPage implements OnInit, OnDestroy {
  isShowChart = false;

  nemWallet: NemWallet;
  walletId: string;

  finalTransactions: Transaction[];

  segmentModel: string;

  isLoading: boolean;

  nemBalance = 0;
  currency = 0;
  exchangeRate = 0;

  token: MosaicTransferable;
  selectedWallet: NemWallet;

  isComponentActive: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
    private nem: NemProvider,
    private exchange: ExchangeProvider,
    private router: Router,
    private helperFunService: HelperFunService,
    private loading: LoadingProvider
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
        this.initNemTxs();
      }

      if (state && state.token) {
        this.token = state.token as MosaicTransferable;
        this.initNemTxsToken(this.token);
      }
    });

    this.setSelectedWallet(this.walletId);
  }

  ngOnDestroy() {
    this.isComponentActive = false;
  }

  async initNemTxs() {
    this.nemWallet = await this.getSelectedWallet(this.walletId);
    if (!this.nemWallet) {
      return;
    }

    this.setWalletBalance(this.currency, this.nemBalance);
    this.exchangeRate = await this.exchange.getExchangeRate(Coin.NEM);

    this.getTransactions(this.nemWallet.walletAddress);

    this.nemBalance = await this.nem.getXEMBalance(
      this.nemWallet.walletAddress
    );
    this.currency = this.nemBalance * this.exchangeRate;
    this.setWalletBalance(this.currency, this.nemBalance);
  }

  async initNemTxsToken(token: MosaicTransferable) {
    this.nemWallet = await this.getSelectedWallet(this.walletId);
    if (!this.nemWallet) {
      return;
    }

    this.setWalletBalance(this.currency, this.nemBalance);
    this.nemWallet.walletType = 'token units';
    this.nemBalance = token.amount;
    this.currency = -1;
    this.setWalletBalance(this.currency, this.nemBalance);

    await this.getTransactionsToken(this.nemWallet.walletAddress, token);
  }

  async setSelectedWallet(walletId) {
    const selectedWallet = await this.getSelectedWallet(walletId);
    if (this.isComponentActive) {
      this.selectedWallet = selectedWallet;
    }
  }

  async getSelectedWallet(walletId) {
    const wallet = await this.walletProvider.getNemWalletById(walletId);
    if (this.isComponentActive) {
      return wallet;
    }
    return null;
  }

  setWalletBalance(currency: number, XEM: number) {
    this.nemWallet.walletBalance = [this.exchange.round(currency), XEM];
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address = new Address(rawAddress);

    const allTxs: NemTransaction[] = await this.nem.getAllTransactionsFromAnAccount(
      address
    );

    /**
     * TODO feeCrypto, feecurrency, confirmations, amountCurrency, receiver, receiverAddress,
     * ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs as TransferTransaction;
      if (transferTxs.type === TransactionTypes.TRANSFER) {
        const isIncoming =
          transferTxs.recipient &&
          address &&
          transferTxs.recipient.equals(address);

        const parsedTxs = {
          transId: transferTxs.getTransactionInfo().id,
          time: this.helperFunService.momentFormatDate(
            new Date(transferTxs.timeWindow.timeStamp.toString()),
            'llll'
          ),
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: 0.25,
          feeCurrency: 2,
          amount: transferTxs.xem().amount,
          hash: transferTxs.getTransactionInfo().hash,
          confirmations: 1,
          amountCurrency: this.exchange.round(
            transferTxs.xem().amount * this.exchangeRate
          ),
          businessName: 'AEM',
          receiver: transferTxs.recipient.plain(),
          receiverAddress: transferTxs.recipient.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355,
          tax: 0,
          type: Coin.NEM,
        };

        if (this.isComponentActive) {
          transactions.push(parsedTxs);

          this.finalTransactions = transactions;
        }
      }
    }

    this.dismissLoading();
  }

  async getTransactionsToken(
    rawAddress: string,
    token: MosaicTransferable
  ): Promise<any> {
    const address = new Address(rawAddress);
    const allTxsToken = await this.nem.getAllTransactionsTokenFromMosaicId(
      address,
      token.mosaicId
    );
    console.log('allTxToken: ', allTxsToken);
    /**
     * TODO feeCrypto, feecurrency, confirmations, amountCurrency, receiver, receiverAddress,
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

        const isIncoming =
          transferTxs.recipient &&
          address &&
          transferTxs.recipient.equals(address);

        const parsedTxs = {
          transId: transferTxs.getTransactionInfo().id,
          time: this.helperFunService.momentFormatDate(
            new Date(transferTxs.timeWindow.timeStamp.toString()),
            'llll'
          ),
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: 0.25, // TODO
          feeCurrency: 2, // TODO
          amount: mosaicDefinition?.amount,
          hash: transferTxs.getTransactionInfo().hash,
          confirmations: 1, // TODO
          amountCurrency: -1,
          businessName: 'AEM',
          receiver: transferTxs.recipient.plain(), // TODO
          receiverAddress: transferTxs.recipient.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355, // TODO
          tax: (10 * 0.1) / (1 + 0.1), // TODO
          type: '',
        };

        if (this.isComponentActive) {
          transactions.push(parsedTxs);

          this.finalTransactions = transactions;
        }
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
      },
    });
    return await modal.present();
  }

  async openSelectWalletModal() {
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
