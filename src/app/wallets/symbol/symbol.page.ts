import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Transaction } from 'src/app/services/models/transaction.model';
import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';

import { Coin } from 'src/app/enums/enums';
// TODO: remove
import { w1Transctions } from '../../services/dummyData/transactions/w1transaction.data';

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
  symbolWallet: Wallet;
  transactions: Transaction[];

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
      // this.symbolWallet = this.walletsService.getWallet(params.get('id'));
      const walletId = params.get('id');
      this.symbolWallet = await this.walletProvider.getWalletByWalletId(walletId);

      if (params.has('tokenId')) {
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
        this.finalTrans = this.symbolWallet.transactions;
      }

      // TODO: dummy transaction
      this.finalTrans = w1Transctions;
    });
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
