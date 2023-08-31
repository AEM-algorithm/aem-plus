// Modules
import _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// Components & Constants
import { Coin } from '@app/enums/enums';
import { BnbProvider } from '@app/services/bnb/bnb.provider';
import { BNBWallet } from '@app/services/models/wallet.model';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { Transaction } from 'src/app/services/models/transaction.model';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';

@Component({
  selector: 'app-bnb',
  templateUrl: './bnb.page.html',
  styleUrls: ['./bnb.page.scss'],
})
export class BNBPage implements OnInit, OnDestroy {
  walletId: string;
  bnbWallet: BNBWallet;
  segmentModel: string;
  exchangeRate: number = 0;
  selectedWallet: BNBWallet;
  finalTrans: Transaction[];
  isLoading: boolean = false;
  isComponentActive: boolean = false;
  fiatSymbol: string;

  constructor(
    private walletProvider: WalletProvider,
    private route: ActivatedRoute,
    private exchange: ExchangeProvider,
    private bnbProvider: BnbProvider,
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
        await this.initBNBTransactions();
      }

      this.dismissLoading();
    });
  }

  async ngOnDestroy() {
    this.isComponentActive = false;
  }

  async initBNBTransactions() {
    this.bnbWallet = await this.getSelectedWallet(this.walletId);
    if (!this.bnbWallet) {
      return;
    }

    this.exchangeRate = await this.exchange.getExchangeRate(Coin.BNB);

    const txs = await this.getTransactions(this.bnbWallet.walletAddress);
    await this.setTransactions(txs);
    await this.updateTransferTxsFee(txs);
  }

  async getSelectedWallet(walletId): Promise<BNBWallet> {
    const wallet = await this.walletProvider.getBNBWalletById(walletId);
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
    const allTxs = await this.bnbProvider.getAllTransactionsFromAnAccount(
      address
    );
    return allTxs;
  }

  async setTransactions(bnbTransaction: any[]): Promise<any> {
    if (!this.isComponentActive) {
      return;
    }

    const transactions = [];
    for (const txs of bnbTransaction) {
      const formatEther = this.bnbProvider.formatBNB(txs.value);
      const amount = this.bnbProvider.formatValue(formatEther);
      const amountCurrency = this.exchange.round(this.exchangeRate * amount);
      const time = this.helperFunService.momentFormatDate(
        new Date(txs.timeStamp * 1000),
        'llll'
      );
      const incoming =
        txs.to &&
        this.bnbWallet.walletAddress &&
        _.isEqual(this.bnbWallet.walletAddress, txs.to);
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
        Coin.BNB
      );
      if (this.isComponentActive) {
        transactions.push(transaction);
      }
    }
    if (this.isComponentActive) {
      this.finalTrans = transactions;
    }
  }

  private async updateTransferTxsFee(bnbTransactions: any[]) {
    if (this.finalTrans.length > 0) {
      for (let i = 0; i < bnbTransactions.length; i++) {
        const txsRecipient =
          await this.bnbProvider.getTransactionReceiptByTxHash(
            bnbTransactions[i].hash
          );
        const transactionFees = this.bnbProvider.calculateFeeTransferTxs(
          bnbTransactions[i].gasPrice,
          txsRecipient.gasUsed
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
