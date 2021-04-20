import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmTransactionModalComponent } from '../confirm-transaction-modal/confirm-transaction-modal.component';

@Component({
  selector: 'app-fee-adjust-modal',
  templateUrl: './fee-adjust-modal.component.html',
  styleUrls: ['./fee-adjust-modal.component.scss'],
})
export class FeeAdjustModalComponent implements OnInit {
  fee: number;
  feeTooLow: boolean;
  feeTooHigh: boolean;

  constructor(private modalCtrl: ModalController) {
    this.fee = 13;
  }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async showConfirmPopup() {
    this.modalCtrl
      .create({
        component: ConfirmTransactionModalComponent,
        cssClass: 'height-ninty-modal',
        // presentingElement: this.modalCtrl.getTop(),
      })
      .then((modalElement) => {
        modalElement.present();
      });
  }

  feeChange() {
    this.feeTooLow = this.fee < 3 ? true : false;
    this.feeTooHigh = this.fee > 17 ? true : false;
  }
}
