import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
// import { Moment } from 'moment';
import * as moment from "moment";
@Component({
  selector: 'app-confirm-export',
  templateUrl: './confirm-export.page.html',
  styleUrls: ['./confirm-export.page.scss'],
})
export class ConfirmExportPage implements OnInit {
  dateFrom;
  dateTo;
  walletType;
  wallet;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private moment: Moment,
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(async (params) => {
    //   console.log(params)
    // })
    this.route.queryParams
      // .filter(params => params.order)
      .subscribe(params => {
        console.log((params)); // { order: "popular" }
        this.dateFrom = params.from;
        this.dateFrom = moment(this.dateFrom).format('MM/DD/YYYY');
        this.dateTo = params.to;
        this.dateTo = moment(this.dateTo).format('MM/DD/YYYY');
        this.walletType = params.wallet_type;
        this.wallet = params.wallet;
        // this.order = params.order;
        // console.log(this.order); // popular
      }
      );
  }
  onContinue() {
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
                .then((loadingEl) => {
                  loadingEl.present();
                  // this.isExportUnlocked = true;
                  setTimeout(() => {
                    this.router.navigateByUrl('/tabnav/export/tranfer-export');
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
