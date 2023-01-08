import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service';
import {TranslateService} from '@ngx-translate/core';

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
    private helperService: HelperFunService,
    private translate: TranslateService
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
    const t = await this.translate.get(['confirm_export_modal.export_message']).toPromise();
    this.loadingCtrl
      .create({
        message: t['confirm_export_modal.export_message'],
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
