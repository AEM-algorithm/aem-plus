import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  btcWallet: Wallet;
  transactions: Transaction[];

  segmentModel: string;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    // -----  get the wallet info:
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.btcWallet = this.walletsService.getWallet(id);
    });
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
