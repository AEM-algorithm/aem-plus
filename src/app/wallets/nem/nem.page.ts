import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';

interface tokenWallet {
  walletName: string;
  walletType: string;
  walletBalance: number[];
  walletAddress: string;
}

@Component({
  selector: 'app-nem',
  templateUrl: './nem.page.html',
  styleUrls: ['./nem.page.scss'],
})
export class NemPage implements OnInit {
  isShowChart = false;

  nemWallet: Wallet;
  selectedNemToken: tokenWallet; // re-structure the token data (add more info)

  finalTransactions: Transaction[];
  isTokenSelected = false;

  segmentModel: string;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.nemWallet = this.walletsService.getWallet(id);

      if (params.has('tokenId')) {
        this.isTokenSelected = true;

        const nemToken = this.walletsService.getToken(this.nemWallet, params.get('tokenId'));

        console.log('nem token page:', nemToken);

        this.selectedNemToken = {
          walletName: nemToken.name,
          walletType: this.nemWallet.walletType,
          walletBalance: nemToken.balance,
          walletAddress: this.nemWallet.walletAddress,
        };

        this.finalTransactions = this.walletsService.getTokenTransaction(this.nemWallet, nemToken.id);
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
