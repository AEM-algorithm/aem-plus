import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-confirm-fee',
  templateUrl: './confirm-fee.page.html',
  styleUrls: ['./confirm-fee.page.scss'],
})
export class ConfirmFeePage implements OnInit {

  constructor(
    private confirmModalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async showConfirmPopup() {

    this.confirmModalController
      .create({
        component: ConfirmModalComponent,
        cssClass: 'send-confirm-modal',
      })
      .then((modalElement) => {
        modalElement.present();
      });
  }

}
