import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import {
  Address,
  TransferTransaction,
  Transaction as SymbolTransaction,
} from 'symbol-sdk';

import { Transaction } from 'src/app/services/models/transaction.model';
import { SymbolWallet } from 'src/app/services/models/wallet.model';

import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';

import { Coin } from 'src/app/enums/enums';

type tokenWallet = {
  walletName: string;
  walletType: string;
  walletBalance: number[];
  walletAddress: string;
};

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.page.html',
  styleUrls: ['./symbol.page.scss'],
})
export class SymbolPage implements OnInit {
  symbolWallet: SymbolWallet;

  segmentModel: string;

  isTokenSelected = false;
  selectedSymbolToken: tokenWallet;
  finalTrans: Transaction[];

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private symbolProvider: SymbolProvider,
    private walletProvider: WalletProvider,
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.route.paramMap.subscribe(async (params) => {
      const walletId = params.get('id');
      this.symbolWallet = await this.walletProvider.getWalletByWalletId(walletId);

      const address: Address = Address.createFromRawAddress(this.symbolWallet.walletAddress);

      const xymBalance = await this.symbolProvider.getXYMBalance(address);

      const transactions = await this.getTransactions(address);

      // TODO: parse XYM to AUD.
      const AUD = 0;
      this.symbolWallet.walletBalance = [AUD, xymBalance];
      this.symbolWallet.walletType = Coin.SYMBOL;


      if (params.has('tokenId')) {
        // TODO
        this.isTokenSelected = true;
        const symbolToken = this.walletsService.getToken(this.symbolWallet, params.get('tokenId'));

        this.selectedSymbolToken = {
          walletName: symbolToken.name,
          walletType: Coin[this.symbolWallet.walletType],
          walletBalance: symbolToken.balance,
          walletAddress: this.symbolWallet.walletAddress,
        };

        //  no mock data for this view:
        this.finalTrans = this.walletsService.getTokenTransaction(this.symbolWallet, symbolToken.id);
      } else {
        this.isTokenSelected = false;
        this.finalTrans = transactions;
      }
    });
  }

  async getTransactions(address: Address): Promise<Transaction[]> {
    const allTxs: SymbolTransaction[] = await this.symbolProvider.getAllTransactionsFromAnAccount(
      address
    );

    const rate = 0.1;
    // const feeCrypto = RentalFee

    /**
     * TODO time, incoming, feeCrypto, feeAud, amount, confirmations,
     * amountAUD, businessName, receiver, ABN, tax
     */
    const transactions = allTxs.map((item: TransferTransaction) => {
      console.log(item);
      const parseTxs = {
        transId: item.transactionInfo.id,
        time: item.deadline.adjustedValue, // 10/02/2019
        incoming: false,
        address: item.signer.address.plain(),
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.23,
        hash: item.transactionInfo.hash,
        confirmations: 1,
        amountAUD: 10,
        businessName: 'AEM',
        receiver: item.recipientAddress.plain(),
        receiverAddress: item.recipientAddress.plain(),
        description: item.message.payload,
        ABN: 30793768392355,
        tax: (10 * rate) / (1 + rate),
        type: Coin.SYMBOL,
      };
      console.log(parseTxs);
      return parseTxs;
    });
    return transactions;
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
