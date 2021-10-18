import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { BitcoinProvider } from 'src/app/services/bitcoin/bitcoin.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { PrivateKey, Address, Transaction as BitcoinTransaction, TransferTransaction,TransactionType} from 'bitcore-lib';

import { Coin } from 'src/app/enums/enums';

import { TimeHelpers } from 'src/utils/TimeHelpers';

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
  btcWallet: Wallet;
  transactions: Transaction[];
  finalTrans: Transaction[];
  isLoading: boolean;

  segmentModel: string;


  isTokenSelected = false;
  selectedBitcoinToken: tokenWallet;


  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private bitcoinProvider: BitcoinProvider,
    private walletProvider: WalletProvider
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';
    this.showLoading();
    // -----  get the wallet info:
    this.route.params.subscribe(async (params) => {
      console.log(params)
      const id = params['id'];
      this.btcWallet = await this.walletProvider.getWalletByWalletId(id);
      console.log(this.btcWallet)
      const rawAddress = this.btcWallet.walletAddress;

      const btcBalance = await this.bitcoinProvider.getBTCBalance(rawAddress);
      console.log('Q balance');
      console.log(btcBalance);
      await this.getTransactions(rawAddress);

      // TODO: parse BTC to AUD.
      const AUD = 0;
      this.btcWallet.walletBalance = [AUD, btcBalance];
      this.btcWallet.walletType = Coin.BITCOIN;

      console.log(rawAddress)
      console.log('QQQQQ')

      if (params['tokenId']) {
        // TODO
        this.isTokenSelected = true;
        const bitcoinToken = this.walletsService.getToken(this.btcWallet, params.get('tokenId'));
        console.log('test');
        console.log(bitcoinToken);
        this.selectedBitcoinToken = {
          walletName: bitcoinToken.name,
          walletType: Coin[this.btcWallet.walletType],
          walletBalance: bitcoinToken.balance,
          walletAddress: this.btcWallet.walletAddress,
        };

        //  no mock data for this view:
        this.finalTrans = this.walletsService.getTokenTransaction(this.btcWallet, bitcoinToken.id);
      } else {
        this.isTokenSelected = false;
      }
    });
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address: Address = Address.fromString(rawAddress);
    const allTxs: BitcoinTransaction[] = await this.bitcoinProvider.getAllTransactionsFromAnAccount(
      address
    );
    const rate = 0.1;
    this.finalTrans = allTxs; 
    console.log('QQQQQQQQQ');
    console.log(allTxs);
    // const feeCrypto = RentalFee

    /**
     * TODO time, incoming, feeCrypto, feeAud, amount, confirmations,
     * amountAUD, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs as TransferTransaction;
      console.log('transferTxs', transferTxs);
      if (transferTxs.type === TransactionType.TRANSFER) {

        const parsedTxs = {
          transId: transferTxs.transactionInfo.id,
          time: 0,
          incoming: 0,
          address: transferTxs.signer.address.plain(),
          feeCrypto: 0,
          feeAud: 0,
          amount: 100,
          hash: transferTxs.transactionInfo.hash,
          confirmations: 1,
          amountAUD: 0,
          businessName: 'AEM',
          receiver: transferTxs.recipientAddress.plain(),
          receiverAddress: transferTxs.recipientAddress.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355,
          tax: 1,
          type: Coin.BITCOIN,
        };
        transactions.push(parsedTxs);

        this.finalTrans = transactions;
      }
    }

    this.dismissLoading();
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
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
}
