import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import _ from 'lodash';

import { Transaction as ETHTransaction } from 'ethers';

import { Transaction } from 'src/app/services/models/transaction.model';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { EthersProvider } from '@app/services/ethers/ethers.provider';
import { HelperFunService } from '@app/services/helper/helper-fun.service';

import { ETHWallet } from 'src/app/services/models/wallet.model';

import { Coin } from '@app/enums/enums';

@Component({
  selector: 'app-eth',
  templateUrl: './eth.page.html',
  styleUrls: ['./eth.page.scss'],
})
export class EthPage implements OnInit, OnDestroy {
  ethWallet: ETHWallet;

  segmentModel: string;

  finalTrans: Transaction[];

  isLoading: boolean;

  ethBalance = 0;
  currency = 0;
  exchangeRate = 0;
  walletId: string;

  selectedWallet: ETHWallet;

  isComponentActive: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private ethersProvider: EthersProvider,
    private walletProvider: WalletProvider,
    private exchange: ExchangeProvider,
    private router: Router,
    private loading: LoadingProvider,
    private helperFunService: HelperFunService,
  ) {
    this.isComponentActive = true;
  }

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      // TODO: get state.
      // const state = this.router.getCurrentNavigation().extras.state;
      this.walletId = params.get('id');

      if (this.walletId) {
        await this.initETHTransactions();
      }

      this.dismissLoading();
    });
  }

  ngOnDestroy() {
    this.isComponentActive = false;
  }

  async initETHTransactions() {
    this.ethWallet = await this.getSelectedWallet(this.walletId);
    if (!this.ethWallet) {
      return;
    }

    this.exchangeRate = await this.exchange.getExchangeRate(Coin.ETH);

    const txs = await this.getTransactions(this.ethWallet.walletAddress);
    await this.setTransactions(txs);
    await this.updateTransferTxsFee(txs);
  }

  async getSelectedWallet(walletId): Promise<ETHWallet> {
    const wallet = await this.walletProvider.getETHWalletById(walletId);
    if (this.isComponentActive) {
      return wallet;
    }
    return null;
  }

  async getTransactions(address: string): Promise<ETHTransaction[]> {
    const allTxs = await this.ethersProvider.getAllTransactionsFromAnAccount(address);
    return allTxs;
  }

  async setTransactions(ethTransactions: any[]): Promise<any> {
    if (!this.isComponentActive) {
      return;
    }

    const transactions = [];
    for (const txs of ethTransactions) {
      const amount = this.ethersProvider.formatEther(txs.value);
      const amountCurrency = this.exchange.round(this.exchangeRate * amount);
      const time = this.helperFunService.momentFormatDate(
        new Date(txs.timestamp * 1000), 'llll'
      );

      const incoming = txs.to && this.ethWallet.walletAddress && _.isEqual(this.ethWallet.walletAddress, txs.to);

      const transaction = new Transaction(
        txs.transactionIndex,
        time,
        incoming,
        txs.from,
        null,
        null,
        amount,
        txs.hash,
        1,
        amountCurrency,
        'AEM',
        txs.to,
        txs.to,
        null,
        30793768392355, // TODO
        (10 * this.exchangeRate) / (1 + this.exchangeRate), // TODO
        '',
        Coin.ETH,
      );
      if (this.isComponentActive) {
        transactions.push(transaction);
      }
    }
    if (this.isComponentActive) {
      this.finalTrans = transactions;
    }
  }

  private async updateTransferTxsFee(ethTransactions: any[]) {
    if (this.finalTrans.length > 0) {
      for (let i = 0; i < ethTransactions.length; i++) {
        const txsRecipient = await this.ethersProvider.getTransactionRecipientByTxHash(ethTransactions[i].hash);
        const transactionFees = this.ethersProvider.calculateFeeTransferTxs(ethTransactions[i].gasPrice, txsRecipient.gasUsed);
        const feeCurrency = this.exchange.round(transactionFees * this.exchangeRate);
        this.finalTrans[i].feeCrypto = transactionFees;
        this.finalTrans[i].feeCurrency = feeCurrency;
      }
    }
  }

  private showLoading() {
    if (!this.isLoading) {
      this.isLoading = true;
    }
  }

  private dismissLoading() {
    if (this.isLoading) {
      this.isLoading = false;
    }
  }

  async openNodeSelectionModal() {
    // TODO: NodeSelectionComponent for ETH
    // const modal = await this.modalCtrl.create({
    //   component: NodeSelectionComponent,
    // });
    // return await modal.present();
  }
}
