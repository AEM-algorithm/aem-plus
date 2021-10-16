import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { BitcoinProvider } from 'src/app/services/bitcoin/bitcoin.provider';
import { Coin } from 'src/app/enums/enums';
import { TimeHelpers } from 'src/utils/TimeHelpers';
import {
  Address,
  Transaction as BitcoinTransaction,
  TransactionType,
  TransferTransaction,
} from 'bitcore-lib';

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

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private bitcoinProvider: BitcoinProvider,
    private walletProvider: WalletProvider
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    // -----  get the wallet info:
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.btcWallet = this.walletsService.getWallet(id);
      const rawAddress = this.btcWallet.walletAddress;

      const btcBalance = await this.bitcoinProvider.getBTCBalance(rawAddress);

      await this.getTransactions(rawAddress);

      // TODO: parse XYM to AUD.
      const AUD = 0;
      this.btcWallet.walletBalance = [AUD, btcBalance];
      this.btcWallet.walletType = Coin.BITCOIN;

    });
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }

  async getTransactions(rawAddress: string): Promise<any> {
    const address: Address = Address.createFromRawAddress(rawAddress);
    const allTxs: BitcoinTransaction[] = await this.bitcoinProvider.getAllTransactionsFromAnAccount(
      address
    );

  }
}
