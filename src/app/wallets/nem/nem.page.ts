import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Transaction as NemTransaction, TransferTransaction, Wallet, Address, TransactionTypes } from 'nem-library';

import { NemWallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';


// import { w1Transctions } from '../../transactions/w1transaction.data';
import { w1Transctions } from '../../services/dummyData/transactions/w1transaction.data';
import { NodeSelectionComponent } from '../node-selection/node-selection.component';

import { Coin } from 'src/app/enums/enums';
import { NemProvider } from 'src/app/services/nem/nem.provider';

type tokenWallet = {
  walletName: string;
  walletType: string;
  walletBalance: number[];
  walletAddress: string;
};

@Component({
  selector: 'app-nem',
  templateUrl: './nem.page.html',
  styleUrls: ['./nem.page.scss'],
})
export class NemPage implements OnInit {
  isShowChart = false;

  nemWallet: NemWallet;
  selectedNemToken: tokenWallet; // re-structure the token data (add more info)

  finalTransactions: Transaction[];
  isTokenSelected = false;

  segmentModel: string;

  isLoading: boolean;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
    private nem: NemProvider,
  ) { }

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.showLoading();

    this.route.paramMap.subscribe(async (params) => {
      const walletId = params.get('id');
      this.nemWallet = await this.walletProvider.getWalletByWalletId(walletId);
      const rawAddress = this.nemWallet.walletAddress

      const nemBalance = await this.nem.getXEMBalance(rawAddress);
      await this.getTransactions(rawAddress);

      const AUD = 0;
      this.nemWallet.walletBalance = [AUD, nemBalance];

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        const nemToken = this.walletsService.getToken(this.nemWallet, params.get('tokenId'));

        this.selectedNemToken = {
          walletName: this.nemWallet.walletName,
          walletType: Coin[this.nemWallet.walletType],
          walletBalance: this.nemWallet.walletBalance,
          walletAddress: this.nemWallet.walletAddress,
        };
        //   console.log('if')
        //   // TODO check get final transactions
        this.finalTransactions = this.walletsService.getTokenTransaction(this.nemWallet, nemToken.id);
      }
      else {
        console.log('else')
        this.isTokenSelected = false;
      }
    });
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address = new Address(rawAddress);

    const allTxs: NemTransaction[] = await this.nem.getAllTransactionsFromAnAccount(
      address
    );
    const rate = 0.1;

    // const feeCrypto = RentalFee

    /**
     * TODO time, incoming, feeCrypto, feeAud, amount, confirmations,
     * amountAUD, businessName, receiver, ABN, tax
     */

    const transactions = [];
    for (const txs of allTxs) {
      const transferTxs = txs as TransferTransaction;
      if (transferTxs.type == TransactionTypes.TRANSFER) {
        const isIncoming = !(transferTxs.recipient && transferTxs.recipient.equals(transferTxs.signer.address));

        const parsedTxs = {
          transId: transferTxs.getTransactionInfo().id,
          time: transferTxs.timeWindow.timeStamp.toString(),
          incoming: isIncoming,
          address: transferTxs.signer.address.plain(),
          feeCrypto: 0.25,
          feeAud: 2,
          amount: transferTxs.xem().amount,
          hash: transferTxs.getTransactionInfo().hash,
          confirmations: 1,
          amountAUD: 0,
          businessName: 'AEM',
          receiver: `${transferTxs.recipient.plain().substring(0, 10)}...`,
          receiverAddress: transferTxs.recipient.plain(),
          description: transferTxs.message.payload,
          ABN: 30793768392355,
          tax: (10 * rate) / (1 + rate),
          type: Coin.NEM,
        };
        transactions.push(parsedTxs);

        this.finalTransactions = transactions;
        this.dismissLoading();
      }
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
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
