import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  exportForm: FormGroup;

  constructor(private alterCtrl: AlertController) {}

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
    // console.log(this.exportForm.get('dateTo').value);
    this.alterCtrl
      .create({
        header: 'Confirm your In-App purchase',
        message: 'Do you want to unlock export function for two selected wallets?',
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
              console.log('confirm the purchase of wallet export function');
            },
          },
        ],
      })
      .then((alterEl) => {
        alterEl.present();
      });
  }
}
