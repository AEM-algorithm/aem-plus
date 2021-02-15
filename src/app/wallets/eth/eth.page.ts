import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/services/models/transaction.model';
import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { NodeSelectionComponent } from '../node-selection/node-selection.component';

@Component({
  selector: 'app-eth',
  templateUrl: './eth.page.html',
  styleUrls: ['./eth.page.scss'],
})
export class EthPage implements OnInit {
  ethWallet: Wallet;
  transactions: Transaction[];

  segmentModel: string;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  ngOnInit() {
    this.segmentModel = 'chart';

    // -----  get the wallet info:
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.ethWallet = this.walletsService.getWallet(id);
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
