import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

// TODO: NodeSelectionComponent for Bitcoin
import { BitcoinNodeSelectionComponent } from '../node-selection/bitcoint-node-selection/bitcoin-node-selection.component';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { BitcoinProvider, BitcoinTransaction } from '@app/services/bitcoin/bitcoin.provider';

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

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private wallet: WalletProvider,
    private walletsService: WalletsService,
    private bitcoin: BitcoinProvider,
  ) { }

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      this.walletId = params.get('id');
      this.bitcoinWallet = await this.wallet.getWalletByWalletId(this.walletId);
      const rawAddress = this.bitcoinWallet.walletAddress;

      const nemBalance = await this.bitcoin.getBTCBalance(rawAddress);
      await this.getTransactions(rawAddress);

      // const exchangeRate = await this.crypto.getExchangeRate('XEM', 'AUD');
      // const AUD = this.crypto.round(nemBalance * exchangeRate);
      // this.nemWallet.walletBalance = [AUD, nemBalance];

      // if (params.has('tokenId')) {
      //   this.isTokenSelected = true;
      //   const nemToken = this.walletsService.getToken(this.nemWallet, params.get('tokenId'));

      //   this.selectedNemToken = {
      //     walletName: this.nemWallet.walletName,
      //     walletType: Coin[this.nemWallet.walletType],
      //     walletBalance: this.nemWallet.walletBalance,
      //     walletAddress: this.nemWallet.walletAddress,
      //   };
      //   //   console.log('if')
      //   //   // TODO check get final transactions
      //   this.finalTransactions = this.walletsService.getTokenTransaction(this.nemWallet, nemToken.id);
      // }
      // else {
      //   console.log('else')
      //   this.isTokenSelected = false;
      // }
    });
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const allTxs: BitcoinTransaction[] = await this.bitcoin.getAllTransactionsFromAnAccount(
      rawAddress
    );
    const rate = 0.1;

    // const feeCrypto = RentalFee

    /**
     * TODO time, incoming, feeCrypto, feeAud, amount, confirmations,
     * amountAUD, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs;
      console.log(transferTxs);

      // if (transferTxs == TransactionTypes.TRANSFER) {
      //   const isIncoming = !(transferTxs.recipient && transferTxs.recipient.equals(transferTxs.signer.address));

      //   const parsedTxs = {
      //     transId: transferTxs.getTransactionInfo().id,
      //     time: transferTxs.timeWindow.timeStamp.toString(),
      //     incoming: isIncoming,
      //     address: transferTxs.signer.address.plain(),
      //     feeCrypto: 0.25,
      //     feeAud: 2,
      //     amount: transferTxs.xem().amount,
      //     hash: transferTxs.getTransactionInfo().hash,
      //     confirmations: 1,
      //     amountAUD: 0,
      //     businessName: 'AEM',
      //     receiver: `${transferTxs.recipient.plain().substring(0, 10)}...`,
      //     receiverAddress: transferTxs.recipient.plain(),
      //     description: transferTxs.message.payload,
      //     ABN: 30793768392355,
      //     tax: (10 * rate) / (1 + rate),
      //     type: Coin.NEM,
      //   };
      //   transactions.push(parsedTxs);

      //   this.finalTransactions = transactions;
      //   this.dismissLoading();
      // }
    }
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
      }
    });
    return await modal.present();
  }
}
