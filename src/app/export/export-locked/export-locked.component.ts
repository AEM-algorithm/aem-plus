import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

// component:
import { PurchaseModelComponent } from './purchase-model/purchase-model.component';
@Component({
  selector: 'app-export-locked',
  templateUrl: './export-locked.component.html',
  styleUrls: ['./export-locked.component.scss'],
})
export class ExportLockedComponent implements OnInit {
  price = 2.99;

  @Output() unlockExport = new EventEmitter<string>();

  unlock: string;

  constructor(private modalCtrl: ModalController, private lodingCtrl: LoadingController) {}

  ngOnInit() {}

  onPurchasing(unlock: string) {
    this.modalCtrl
      .create({
        component: PurchaseModelComponent,
        cssClass: 'purchase-modal-component-css',
        componentProps: {
          price: this.price,
          unlock: this.unlock,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultDate) => {
        if (resultDate.role === 'confirm') {
          this.lodingCtrl.create({ message: 'Purchase completed.' }).then((loadingEl) => {
            loadingEl.present();
            setTimeout(() => {
              this.unlockExport.emit(unlock);
              loadingEl.dismiss();
            }, 1000);
          });
        }
      });
  }
}
