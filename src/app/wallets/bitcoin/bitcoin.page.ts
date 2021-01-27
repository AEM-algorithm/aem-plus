import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { NodeSelectionComponent } from '../node-selection/node-selection.component';
@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.page.html',
  styleUrls: ['./bitcoin.page.scss'],
})
export class BitcoinPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openNodeSelectionModal() {
    const modal = await this.modalCtrl.create({
      component: NodeSelectionComponent,
    });
    return await modal.present();
  }
}
