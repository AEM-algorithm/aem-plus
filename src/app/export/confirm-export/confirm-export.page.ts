import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { WALLET_ICON } from '@app/constants/constants';
@Component({
  selector: 'app-confirm-export',
  templateUrl: './confirm-export.page.html',
  styleUrls: ['./confirm-export.page.scss'],
})
export class ConfirmExportPage implements OnInit {
  dateFrom;
  dateTo;
  walletType;
  walletAddress;
  wallet;
  objectHistory;

  walletIcon = WALLET_ICON;
  transactionExports;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dateFrom = params.from;
      this.dateFrom = moment(this.dateFrom).format('MM/DD/YYYY');
      this.dateTo = params.to;
      this.dateTo = moment(this.dateTo).format('MM/DD/YYYY');
      this.walletType = params.wallet_type;
      this.walletAddress = params.wallet_address;
      this.wallet = params.wallet;
    });

    const state = this.router.getCurrentNavigation().extras.state;
    if (state?.transactionExports) {
      this.transactionExports = state.transactionExports;
    }
  }
  async onContinue() {
    this.alterCtrl
      .create({
        header: 'Confirm your In-App',
        message: `Do you want to unlock export function for two selected wallets?`,
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
                .then(async (loadingEl) => {

                  this.objectHistory = {
                    id: new Date().getTime(),
                    from: this.dateFrom,
                    to: this.dateTo,
                    wallet_type: this.walletType,
                    wallet: this.wallet,
                    wallet_address: this.walletAddress,
                    isSelect: false,
                    time_export: moment().format('HH:mm MM/DD/YYYY')
                  };
                  const data = await this.storage.get('export-history');
                  if (data && data.length > 0) {
                    await this.storage.set('export-history', [...data, this.objectHistory]);
                  } else {
                    await this.storage.set('export-history', [this.objectHistory]);
                  }

                  await loadingEl.present();
                  setTimeout(() => {
                    this.router.navigateByUrl('/tabnav/export/tranfer-export', {
                      state: {
                        transactionExports: this.transactionExports,
                      }
                    });
                  }, 2000);


                });
            },
          },
        ],
      })
      .then((alterEl) => {
        alterEl.present();
      });

  }
}
