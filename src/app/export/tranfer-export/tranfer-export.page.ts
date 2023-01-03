import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';

import { ExportTransactionModel } from '@app/services/models/export-transaction.model';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onCheck();

    const state = this.router.getCurrentNavigation().extras.state;
    if (state?.exportTransactions) {
      this.exportTransactions = state.exportTransactions;
    }
  }
  onCheck() {
    this.alterCtrl
      .create({
        header: 'Transfer complete',
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
  onContinue() {
    this.alterCtrl
      .create({
        header: 'Transfer complete',
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
