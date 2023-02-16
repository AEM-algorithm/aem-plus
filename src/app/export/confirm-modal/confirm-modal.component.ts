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

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private helperService: HelperFunService,
    private translate: TranslateService
  ) {}

  exportSuccess = false;

  ngOnInit() {
    this.fromDate = this.helperService.dateFormat(this.submitData.dateFrom);
    this.toDate = this.helperService.dateFormat(this.submitData.dateTo);
    // this.walletToPayType = this.submitData.paymentWallet.walletType;
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
