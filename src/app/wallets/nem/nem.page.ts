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

  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.nemWallet = this.walletsService.getWallet(id);
    });
  }

  onHideChart(eventData: boolean) {
    this.isShowChart = eventData;
    console.log(this.isShowChart);
  }

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
