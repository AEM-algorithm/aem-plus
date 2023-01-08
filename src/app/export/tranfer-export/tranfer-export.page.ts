import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';

import { ExportTransactionModel } from '@app/services/models/export-transaction.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tranfer-export',
  templateUrl: './tranfer-export.page.html',
  styleUrls: ['./tranfer-export.page.scss'],
})
export class TranferExportPage implements OnInit {
  mapUrl = 'assets/icon/be-check.png';
  check = 'assets/icon/check.png';

  private exportTransactions: ExportTransactionModel[];

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.onCheck();

    const state = this.router.getCurrentNavigation().extras.state;
    if (state?.exportTransactions) {
      this.exportTransactions = state.exportTransactions;
    }
  }
  async onCheck() {
    const t = await this.translate.get(['transfer_export.transfer_complete']).toPromise();
    this.alterCtrl
      .create({
        header: t['transfer_export.transfer_complete'],
        message: `<img src="${this.mapUrl}" >`,
        cssClass: 'transfer-complete',
      })
      .then((alterEl) => {
        alterEl.present();
        setTimeout(() => {
          this.alterCtrl.dismiss();
          this.onContinue();
        }, 1000);
      });
  }
  async onContinue() {
    const t = await this.translate.get(['transfer_export.transfer_complete']).toPromise();
    this.alterCtrl
      .create({
        header: t['transfer_export.transfer_complete'],
        message: `<img src="${this.check}" >`,
        cssClass: 'transfer-complete',
      })
      .then((alterEl) => {
        alterEl.present();
        setTimeout(() => {
          this.alterCtrl.dismiss();
          this.router.navigateByUrl('/tabnav/export/export-file', {
            state: {
              exportTransactions: this.exportTransactions,
            },
          });
        }, 1000);
      });
  }
}
