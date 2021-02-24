import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController) {}

  exportSuccess = false;

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async showLoading() {
    this.loadingCtrl
      .create({
        message: 'Please wait for transfer complete',
        spinner: 'circular',
        cssClass: 'transfer-loading',
        // duration: 2000,
      })
      .then((loadEl) => {
        loadEl.present();
        // fake the request:
        setTimeout(() => {
          loadEl.dismiss();
          // TODO: the different format files:
          //       then the social sharing
        }, 2000);
      });
  }

  confirm() {
    // console.log('confirm....');
    this.close();
    this.showLoading();
  }
}
