import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { HelperFunService } from '@app/services/helper/helper-fun.service';

// TODO: NodeSelectionComponent for Bitcoin
import { BitcoinNodeSelectionComponent } from '../node-selection/bitcoint-node-selection/bitcoin-node-selection.component';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import {
  BitcoinProvider,
  BitcoinTransaction,
} from '@app/services/bitcoin/bitcoin.provider';
import { Coin } from '@app/enums/enums';

type tokenWallet = {
  walletName: string;
  walletType: string;
  walletBalance: number[];
  walletAddress: string;
};

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  bitcoinWallet: Wallet;
  transactions: Transaction[];
  selectedBitcoinToken: tokenWallet;
  walletId: string;

  finalTransactions: Transaction[];
  isTokenSelected = false;

  segmentModel: string;

  isLoading: boolean;

  bitcoinBalance = 0;
  currency = 0;
  exchangeRate = 0;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private wallet: WalletProvider,
    private walletsService: WalletsService,
    private bitcoin: BitcoinProvider,
    private crypto: ExchangeProvider,
    private router: Router,
    private helperFunService: HelperFunService
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.walletId = params.get('id');

      this.bitcoinWallet = await this.wallet.getWalletByWalletId(this.walletId);

      if (this.walletId && !state?.token) {
        await this.initBitcoinTxs();
      }

      if (state && state.token) {
        const token = state.token;
        await this.initBitcoinTxsToken(token);
      }
    });
  }

  private async initBitcoinTxs() {
    const rawAddress = this.bitcoinWallet.walletAddress;
    const network = this.bitcoin.getNetwork(rawAddress);
    this.exchangeRate = await this.crypto.getExchangeRate(Coin.BITCOIN);

    this.bitcoinBalance = await this.bitcoin.getBTCBalance(rawAddress, network);
    this.currency = this.bitcoinBalance * this.exchangeRate;
    this.setWalletBalance(this.currency, this.bitcoinBalance);

    await this.getTransactions(rawAddress, network);
  }

  /**
   * @param tokenId get related transactions of this token
   * @return promise with selected wallet
   */
  // TODO
  private async initBitcoinTxsToken(tokenId: string) {
    return null;
  }

  setWalletBalance(currency: number, BTC: number) {
    this.bitcoinWallet.walletBalance = [this.crypto.round(currency), BTC];
  }

  async getTransactions(rawAddress: string, network: string): Promise<any> {
    const allTxs: BitcoinTransaction[] = await this.bitcoin.getAllTransactionsFromAnAccount(
      rawAddress,
      network
    );
    const rate = 0.1;

    // const feeCrypto = RentalFee

    /**
     * TODO time, incoming, feeCrypto, feeCurrency, amount, confirmations,
     * amountCurrency, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs;
      if (true) {
        const transaction = {
          transId: NaN,
          time: this.helperFunService.momentFormatDate(
            new Date(transferTxs.time),
            'llll'
          ),
          incoming: transferTxs.incoming,
          address: transferTxs.sendingAddress,
          feeCrypto: transferTxs.fee,
          feeCurrency: transferTxs.fee * this.exchangeRate,
          amount: transferTxs.amount,
          hash: transferTxs.hash,
          confirmations: transferTxs.confirmations > 0 ? 1 : 0,
          amountCurrency: this.crypto.round(
            transferTxs.amount * this.exchangeRate
          ),
          businessName: 'AEM',
          receiver: transferTxs.receivingAddress,
          receiverAddress: transferTxs.receivingAddress,
          description: '',
          ABN: 30793768392355,
          tax: (10 * rate) / (1 + rate),
          type: Coin.BITCOIN,
        };
        transactions.push(transaction);

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
      component: BitcoinNodeSelectionComponent,
      componentProps: {
        walletId: this.walletId,
      },
    });
    return await modal.present();
  }
}
