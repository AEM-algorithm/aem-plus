import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-export-complete',
  templateUrl: './export-complete.page.html',
  styleUrls: ['./export-complete.page.scss'],
})
export class ExportCompletePage implements OnInit {
  mapUrl = 'assets/icon/be-check.png';
  check = 'assets/icon/check.png';
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
  }
  async onCheck() {
    const t = await this.translate.get(['export_complete_modal.export_complete']).toPromise();
    this.alterCtrl
      .create({
        header: t['export_complete_modal.export_complete'],
        message: `<img src="${this.check}" >`,
        cssClass: 'transfer-complete',
      })
      .then((alterEl) => {
        alterEl.present();
        setTimeout(() => {
          this.alterCtrl.dismiss();
          this.router.navigateByUrl('/tabnav/export/export-invoice');
        }, 1000);
      });
  }
}
