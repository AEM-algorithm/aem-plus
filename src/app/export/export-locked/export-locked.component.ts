import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// component:
import { PurchaseModelComponent } from './purchase-model/purchase-model.component';
@Component({
  selector: 'app-export-locked',
  templateUrl: './export-locked.component.html',
  styleUrls: ['./export-locked.component.scss'],
})
export class ExportLockedComponent implements OnInit {
  price = 2.99;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openPurchaseModal() {
    const modal = await this.modalCtrl.create({
      component: PurchaseModelComponent,
      cssClass: 'purchase-modal-component-css',
      componentProps: {
        price: this.price,
        // isPurchased: Boolean,
      },
      swipeToClose: true,
    });
    return await modal.present();
  }
}
