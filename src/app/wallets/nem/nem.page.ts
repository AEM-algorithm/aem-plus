import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { NemWallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';

import { Coin } from 'src/app/enums/enums';

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

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');

      // this.nemWallet = this.walletsService.getWallet(id);
      const nemWallets = await this.walletProvider.getNemWallets();
      this.nemWallet = nemWallets.find((item) => id === item.walletId);

      if (params.has('tokenId')) {
        this.isTokenSelected = true;

        this.selectedNemToken = {
          walletName: this.nemWallet.walletName,
          walletType: Coin[this.nemWallet.walletType],
          walletBalance: this.nemWallet.walletBalance,
          walletAddress: this.nemWallet.walletAddress,
        };

        // TODO check get final transactions
        // this.finalTransactions = this.walletsService.getTokenTransaction(this.nemWallet, nemToken.id);
        this.finalTransactions = this.nemWallet.transactions;
      } else {
        this.isTokenSelected = false;
        this.finalTransactions = this.nemWallet.transactions;
      }
    });
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
