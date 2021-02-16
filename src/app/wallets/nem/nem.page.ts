import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Wallet } from 'src/app/services/models/wallet.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
@Component({
  selector: 'app-nem',
  templateUrl: './nem.page.html',
  styleUrls: ['./nem.page.scss'],
})
export class NemPage implements OnInit {
  isShowChart = false;
  nemWallet: Wallet;

  segmentModel: string;

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.segmentModel = 'transaction';

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.nemWallet = this.walletsService.getWallet(id);
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
