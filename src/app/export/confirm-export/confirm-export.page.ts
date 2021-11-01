import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
  walletAddress;
  wallet;
  imageUrl;
  objectHistory;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private moment: Moment,
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(async (params) => {
    //   console.log(params)
    // })
    this.route.queryParams
      // .filter(params => params.order)
      .subscribe(params => {
        this.dateFrom = params.from;
        this.dateFrom = moment(this.dateFrom).format('MM/DD/YYYY');
        this.dateTo = params.to;
        this.dateTo = moment(this.dateTo).format('MM/DD/YYYY');
        this.walletType = params.wallet_type;
        this.walletAddress = params.wallet_address;
        this.imageUrl = this.onGetUrlImageWallet(this.walletType);
        this.wallet = params.wallet;

      }
      );
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
                    'from': this.dateFrom,
                    'to': this.dateTo,
                    'wallet_type': this.walletType,
                    'wallet': this.wallet,
                    'wallet_address': this.walletAddress,
                    'isSelect':false,
                    'time_export': moment().format('h:mm MM/DD/YYY')
                  }
                  let arrHistory = [];
                  let value = await this.storage.get("export-history").then((data) => {
                    return data
                  });
                  if (value) {
                    value.push(this.objectHistory);
                    this.storage.set('export-history', value);
                  }
                  else{
                    arrHistory.push(this.objectHistory);
                    this.storage.set('export-history', arrHistory);
                  }
                 
                  loadingEl.present();

                
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
  onGetUrlImageWallet(wallet) {
    let image;
    switch (wallet) {
      case 'bitcoin':
        image = 'assets/img/Bitcoin_50px.png'
        break;
      case 'nem':
        image = 'assets/img/nem-icon.png'
        break;
      case 'xym':
        image = 'assets/img/symbol-icon1.png'
        break;

      default:
        break;
    }
    return image;
  }
}
