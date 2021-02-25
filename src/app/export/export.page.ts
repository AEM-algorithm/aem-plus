import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';

import { Wallet } from '../services/models/wallet.model';
import { WalletsService } from '../services/wallets/wallets.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  exportForm: FormGroup;

  exportFormData: {
    fromDate: Date;
    toDate: Date;
    walletsExport: Wallet[];
    paymentWallet: Wallet;
    fee: number;
  };

  wallets: Wallet[];

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private walletsService: WalletsService
  ) {}

  ionViewWillEnter() {
    this.wallets = [...this.walletsService.getWallets()];
  }

  ngOnInit() {
    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
      walletsExport: new FormControl(null, [Validators.required]), // can selecet multiple wallet
      paymentWallet: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    // console.log(this.exportForm);
    // console.log(this.exportForm.get('dateTo'));

    // ----- get the selected export wallets & the selected wallet to make the payment:
    // const walletsToExport = this.exportForm.get('walletsExport');
    const walletsToExport = this.exportForm
      .get('walletsExport')
      .value.map((walletId) => this.walletsService.getWallet(walletId));

    // console.log('walletsToExport:', walletsToExport);

    const walletToPay = this.walletsService.getWallet(this.exportForm.get('paymentWallet').value);

    // ======= ? Question: the fee is calculated by backend??? or it has a fixed fee.
    const calculatedFee = 12;

    this.exportFormData = {
      fromDate: new Date(this.exportForm.get('dateFrom').value),
      toDate: new Date(this.exportForm.get('dateTo').value),
      walletsExport: walletsToExport,
      paymentWallet: walletToPay,
      fee: calculatedFee,
    };

    this.alterCtrl
      .create({
        header: 'Confirm your In-App purchase',
        message: `Do you want to unlock export function for ${walletsToExport.length} selected wallets?`,
        cssClass: 'purchase-alter',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Buy',
            role: 'confirm',
            handler: () => {
              // console.log('confirm the purchase of wallet export function');
              // TODO: show the in-app purchase first (3rd package)
              //        then show the following confirmation modal:
              this.modalCtrl
                .create({
                  component: ConfirmModalComponent,
                  componentProps: {
                    submitData: this.exportFormData,
                  },
                  cssClass: 'export-confirm-modal',
                })
                .then((modalEl) => {
                  modalEl.present();
                });
            },
          },
        ],
      })
      .then((alterEl) => {
        alterEl.present();
      });

    // this.exportForm.reset(); // after the export transaction made then reset the form???
  }
}
