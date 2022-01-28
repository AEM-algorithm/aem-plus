import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import { Router } from '@angular/router';

import { ExportModalComponent } from '../export-modal/export-modal.component';
import { ExportTransactionModel } from '@app/services/models/export-transaction.model';

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

  private exportTransactions: ExportTransactionModel[];

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state?.exportTransactions) {
      this.exportTransactions = state.exportTransactions;
    }
  }

  async download() {
    const pinModal = await this.modalCtrl.create({
      component: ExportModalComponent,
      cssClass: 'height-twenty-modal',
      componentProps: {
        exportTransactions: this.exportTransactions,
      },
    });
    await pinModal.present();
  }
}
