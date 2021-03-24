import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from '../../services/models/token.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
import { Transaction } from 'src/app/services/models/transaction.model';

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
  selectedNemToken: tokenWallet;

  // finalWallet : finalWallet;
  finalTransactions: Transaction[];

  // ---- the final wallet/token object
  isTokenSelected = false;

  segmentModel: string;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    // this.route.params.subscribe((params) => {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.nemWallet = this.walletsService.getWallet(id);

      // if (!params.has('tokenId')) {
      // this.isTokenSelected = false;
      // this.finalTransactions = this.nemWallet.transactions;
      // return;
      // }

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        // console.log('nem token page wallet id:', params.get('id'));
        // console.log('nem token page token id:', params.get('tokenId'));
        const tokenId = params.get('tokenId');

        // const nemToken = this.nemWallet

        const nemToken = this.walletsService.getToken(this.nemWallet, tokenId);

        console.log('nem token page:', nemToken);

        // this.finalWallet = {
        this.selectedNemToken = {
          // walletName: this.nemWallet.walletName,
          walletName: nemToken.name,
          walletType: this.nemWallet.walletType,
          walletBalance: nemToken.balance,
          walletAddress: this.nemWallet.walletAddress,
        };
        // console.log('nem token page re-structured token:', this.selectedNemToken);

        this.tokenTransactions = [];
        console.log('token page:', this.tokenTransactions);
      } else {
        this.isTokenSelected = false;
        this.finalTransactions = this.nemWallet.transactions;
        // console.log('wallet page:', this.finalTransactions);
      }
    });
  }

  viewChanged(ev: any) {
    console.log(ev);
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
