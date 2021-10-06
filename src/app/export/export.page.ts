import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Coin } from '../enums/enums';

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

  type: string; // selected export wallet type
  purchaseFee: number = 12; // unlock export fee: hardcode now
  wallets: Wallet[]; // wallets of the selected type that the user has
  walletsToExport: Wallet[]; // selected wallets from walllets

  exportFormData: {
    dateFrom: Date;
    dateTo: Date;
    walletType: string;
    walletsExport: Wallet[];
    exportFee: number;
  };

  walletsToExportSelected = false;

  // TODO: after add in app purchase
  //       set it to true, if user unlock the export function
  //       change the confirm modal info without the purchase fee
  isExportUnlocked = false; // -------  needs to store server-side under this user.
  // isExportUnlocked = true; // testing

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {}

  ngOnInit() {
    this.wallets = this.walletsService.getSameTypeWallets('BTC');

    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
      walletType: new FormControl('BTC', [Validators.required]),
      walletsExport: new FormControl(null, [Validators.required]), // can selecet multiple wallet
    });
  }

  onSelectType(e: any) {
    const type = e.detail.value;
    //  ---- get the selected type wallets of this users possessed
    this.wallets = this.walletsService.getSameTypeWallets(type);
    //  ---- empty the walletExport every time user select the type
    this.exportForm.get('walletsExport').setValue(null);
  }

  onSelectExportWallets(e: any) {
    this.walletsToExport = e.detail.value;
    this.walletsToExportSelected = true;
  }

  onSubmit() {
    const type = this.exportForm.get('walletType').value;

    this.exportFormData = {
      dateFrom: new Date(this.exportForm.get('dateFrom').value),
      dateTo: new Date(this.exportForm.get('dateTo').value),
      walletType: type,
      walletsExport: this.walletsToExport,
      exportFee: this.purchaseFee,
    };

    // ---- if the user didn't unlock export function show this alter window
    if (!this.isExportUnlocked) {
      this.alterCtrl
        .create({
          header: 'Confirm your In-App purchase',
          message: `info about the export fee??????`,
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
                // -------  TODO: show the in-app purchase first (3rd package) instead of this loading
                this.loadingCtrl
                  .create({
                    message: 'purchasing, unlock the export',
                    spinner: 'circles',
                    duration: 2000,
                  })
                  .then((loadingEl) => {
                    loadingEl.present();
                    this.isExportUnlocked = true;
                  });
              },
            },
          ],
        })
        .then((alterEl) => {
          alterEl.present();
        });
    } else {
      //  ----- if the user purchased the export producte:
      //          show the export info confirm modal
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
    }
    // console.log('after submit:', this.exportForm.value);
    // this.exportForm.reset(); // after the export transaction made then reset the form???
  }

  exportExcel() {
    console.log('export as pdf.....');
    // this.exportForm.reset();
  }

  exportCSV() {
    console.log('export as csv.....');
    // this.exportForm.reset();
  }
}
