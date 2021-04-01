import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() submitData;

  fromDate: string;
  toDate: string;
  // walletToPayType: string;
  audAmount: number;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private helperService: HelperFunService
  ) {}

  exportSuccess = false;

  ngOnInit() {
    // console.log(this.submitData);
    this.fromDate = this.helperService.dateFormat(this.submitData.dateFrom);
    this.toDate = this.helperService.dateFormat(this.submitData.dateTo);
    // this.walletToPayType = this.submitData.paymentWallet.walletType;

    //=====TODO: convert the cryptocurrency value to aud value. backend??
    this.audAmount = 2.22;
  }

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
