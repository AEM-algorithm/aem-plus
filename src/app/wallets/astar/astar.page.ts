
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

// Components & Constants
import { Coin } from '@app/enums/enums';
import { AstarProvider } from '@app/services/astar/astar.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { AstarWallet } from '@app/services/models/wallet.model';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import { Transaction } from 'src/app/services/models/transaction.model';


@Component({
  selector: 'app-astar',
  templateUrl: './astar.page.html',
  styleUrls: ['./astar.page.scss'],
})


export class AstarPage implements OnInit, OnDestroy {
  walletId: string;
  astarWallet: AstarWallet;
  segmentModel: string;
  exchangeRate: number = 0;
  selectedWalletAstar: AstarWallet;
  finalTrans: Transaction[];
  isLoading: boolean = false;
  isComponentActive: boolean = false;
  fiatSymbol: string;

  constructor(
    private walletProvider: WalletProvider,
    private route: ActivatedRoute,
    private exchange: ExchangeProvider,
    private astarProvider: AstarProvider,
    private helperFunService: HelperFunService
  ) {
    this.isComponentActive = true;
  }

  async ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      this.walletId = params.get('id');

      if (this.walletId) {
        await this.initAstarTransactions();
      }

      this.dismissLoading();
    });
  }

  async ngOnDestroy() {
    this.isComponentActive = false;
  }

  async initAstarTransactions() {
    this.astarWallet = await this.getSelectedWallet(this.walletId);
    console.log('astarWallet ', this.astarWallet)
    if (!this.astarWallet) {
      return;
    }

    this.exchangeRate = await this.exchange.getExchangeRate(Coin.ASTAR);

    const txs = await this.getTransactions(this.astarWallet.walletAddress);
    await this.setTransactions(txs);
    await this.updateTransferTxsFee(txs);
  }

  async getSelectedWallet(walletId): Promise<AstarWallet> {
    const wallet = await this.walletProvider.getAstarWalletById(walletId);
    if (this.isComponentActive) {
      return wallet;
    }
    return null;
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

  async getTransactions(address: string) {
    const allTxs = await this.astarProvider.getAllTransactionsFromAnAccount(
      address
    );
    return allTxs;
  }

  async setTransactions(astarTransaction: any[]): Promise<any> {
    if (!this.isComponentActive) {
      return;
    }

    const transactions = [];
    for (const txs of astarTransaction) {
      const formatEther = this.astarProvider.formatAstar(txs.value);
      const amount = this.astarProvider.formatValue(formatEther);
      const amountCurrency = this.exchange.round(this.exchangeRate * amount);
      const time = this.helperFunService.momentFormatDate(
        new Date(txs.timeStamp * 1000),
        'llll'
      );
      const incoming =
        txs.to &&
        this.astarWallet.walletAddress &&
        _.isEqual(this.astarWallet.walletAddress, txs.to);
      const isTransferTx = !!txs.to;
      if (!isTransferTx) continue;

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
        30793768392355,
        (10 * this.exchangeRate) / (1 + this.exchangeRate),
        '',
        Coin.ASTAR
      );
      if (this.isComponentActive) {
        transactions.push(transaction);
      }
    }
    if (this.isComponentActive) {
      this.finalTrans = transactions;
    }
  }

  private async updateTransferTxsFee(astarTransactions: any[]) {
    if (this.finalTrans.length > 0) {
      console.log('astarTransactions ', astarTransactions)
      for (let i = 0; i < astarTransactions.length; i++) {
        const txsRecipient =
          await this.astarProvider.getTransactionReceiptByTxHash(
            astarTransactions[i]?.hash
          );
        console.log('txsRecipient ', txsRecipient);
        const transactionFees = this.astarProvider.calculateFeeTransferTxs(
          astarTransactions[i]?.gasPrice,
          txsRecipient?.gasUsed
        );
        const feeCurrency = this.exchange.round(
          transactionFees * this.exchangeRate
        );
        this.finalTrans[i].feeCrypto = transactionFees;
        this.finalTrans[i].feeCurrency = feeCurrency;
      }
    }
  }
}