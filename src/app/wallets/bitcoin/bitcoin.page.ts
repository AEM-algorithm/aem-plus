import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ServerSelectionComponent } from '../server-selection/server-selection.component';
import { NodeSelectionComponent } from '../node-selection/node-selection.component';
@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  // segmentModel: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // this.segmentModel = 'balance';
  }

  // segmentChanged(ev: any) {
  //   console.log('Segment changed', ev);
  // }

  // two node selection designs:
  // 1. reference from old version
  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }

  // 2. reference from NEM
  async openServerSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: ServerSelectionComponent,
    });
    return await modal.present();
  }
}
