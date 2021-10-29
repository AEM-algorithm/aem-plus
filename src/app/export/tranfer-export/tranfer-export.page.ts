import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tranfer-export',
  templateUrl: './tranfer-export.page.html',
  styleUrls: ['./tranfer-export.page.scss'],
})
export class TranferExportPage implements OnInit {
  mapUrl = 'assets/icon/be-check.png';
  check = 'assets/icon/check.png';
  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.onCheck();
   
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
          this.router.navigateByUrl('/tabnav/export/export-file');
        }, 1000);
      });
    }
}
