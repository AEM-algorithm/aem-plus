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

  //  the fee & payment wallet's type
  feeCrypto: number;
  feeAud: number;
  type: string;

  exportFormData: {
    fromDate: Date;
    toDate: Date;
    walletType: string;
    walletsExport: Wallet[];
    paymentWallet: Wallet;
    cryptoFee: number;
    localFee: number;
  };

  wallets: Wallet[]; // selected type wallets
  paymentWallets: Wallet[];

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private walletsService: WalletsService
  ) {}

  ionViewWillEnter() {
    this.paymentWallets = this.walletsService.getWallets();
  }

  ngOnInit() {
    this.paymentWallets = this.walletsService.getWallets();
    this.wallets = this.walletsService.getSameTypeWallets('BTC');

    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
      walletType: new FormControl('BTC', [Validators.required]),
      walletsExport: new FormControl(null, [Validators.required]), // can selecet multiple wallet
      paymentWallet: new FormControl(null, [Validators.required]),
    });
  }

  onSelectType(e: any) {
    console.log(e);

    const type = e.detail.value;
    this.wallets = this.walletsService.getSameTypeWallets(type);
    console.log('on select type:', this.wallets);
  }

  onCalFee(e: any) {
    const walletId = e.detail.value;

    this.type = this.walletsService.getWallet(walletId).walletType;
    // after select the number of wallet, calculate the fee;
    this.feeAud = 12;
    this.feeCrypto = 0.12;
  }

  onSubmit() {
    const type = this.exportForm.get('walletType').value;

    const walletsToExport = this.exportForm
      .get('walletsExport')
      .value.map((walletId) => this.walletsService.getWallet(walletId));

    const walletToPay = this.walletsService.getWallet(this.exportForm.get('paymentWallet').value);

    this.exportFormData = {
      fromDate: new Date(this.exportForm.get('dateFrom').value),
      toDate: new Date(this.exportForm.get('dateTo').value),
      walletType: type,
      walletsExport: walletsToExport,
      paymentWallet: walletToPay,
      cryptoFee: this.feeCrypto,
      localFee: this.feeAud,
    };

    this.alterCtrl
      .create({
        header: 'Confirm your In-App purchase',
        message: `Do you want to unlock export function for ${type} type wallets?`,
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
                  cssClass: 'center-small-modal',
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
