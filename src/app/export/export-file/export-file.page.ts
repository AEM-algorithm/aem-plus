import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { Router } from '@angular/router';

import { ExportModalComponent } from '../export-modal/export-modal.component';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.page.html',
  styleUrls: ['./export-file.page.scss'],
})
export class ExportFilePage implements OnInit {
  lastImage = {
    name: '',
    url: '',
    data: '',
  };

  transactionExports;

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    this.transactionExports = state?.transactionExports;
  }

  async download() {
    const pinModal = await this.modalCtrl.create({
      component: ExportModalComponent,
      cssClass: 'height-twenty-modal',
      componentProps: {
        transactionExports: this.transactionExports
      }
    });
    await pinModal.present();
  }

}
