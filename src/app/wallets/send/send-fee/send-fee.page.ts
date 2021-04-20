import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmTransactionModalComponent } from '../confirm-transaction-modal/confirm-transaction-modal.component';

@Component({
  selector: 'app-send-fee',
  templateUrl: './send-fee.page.html',
  styleUrls: ['./send-fee.page.scss'],
})
export class SendFeePage implements OnInit {
  fee: number;
  feeTooLow: boolean;
  feeTooHigh: boolean;

  constructor(private confirmModalController: ModalController) {
    this.fee = 13;
  }

  ngOnInit() {}

  async showConfirmPopup() {
    this.confirmModalController
      .create({
        component: ConfirmTransactionModalComponent,
        cssClass: 'send-confirm-modal',
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
