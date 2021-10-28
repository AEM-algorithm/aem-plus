import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Coin } from '../enums/enums';

import { Wallet } from '../services/models/wallet.model';
import { WalletsService } from '../services/wallets/wallets.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  exportForm: FormGroup;
  isShowWalletType = false;
  isShowWallet = false;
  isShowFrom = false;
  isShowbtn = false;
  coinValue = 'Choose a wallet type';
  walletValue = 'Choose wallets'
  type: string; // selected export wallet type
  purchaseFee: number = 12; // unlock export fee: hardcode now
  wallets: Wallet[]; // wallets of the selected type that the user has
  walletsToExport: Wallet[]; // selected wallets from walllets
  valuefrom;
  valueto;
  valueType;
  valueWallet;
  exportFormData: {
    dateFrom: Date;
    dateTo: Date;
    walletType: string;
    walletsExport: Wallet[];
    exportFee: number;
  };

  arrayWallet = [
    { id: 1, wallet: 'My wallet 1 (BTC)', isSelect: false },
    { id: 2, wallet: 'My wallet 2 (BTC)', isSelect: false },
    { id: 3, wallet: 'My wallet 3 (NEM)', isSelect: false },
    { id: 4, wallet: 'My wallet 4 (ETH)', isSelect: false },
    ];
  arrayWalletType = ['BTC', 'NEM', 'ETH'];

  walletsToExportSelected = false;

  // TODO: after add in app purchase
  //       set it to true, if user unlock the export function
  //       change the confirm modal info without the purchase fee
  isExportUnlocked = false; // -------  needs to store server-side under this user.
  datepipe: any;
  // isExportUnlocked = true; // testing

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ionViewWillEnter() { }

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
  onSubmit(){
   if( this.checkValidate()){
    this.isShowbtn = true;
   }
  }

  onSubmit_() {
    const type = this.exportForm.get('walletType').value;
    console.log
    console.log('from ' + new Date(this.exportForm.get('dateFrom').value));
    console.log('to ' + new Date(this.exportForm.get('dateTo').value));
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

  onWalletType() {
    if (this.isShowWalletType) {
      this.isShowWalletType = false
    }
    else {
      this.isShowWalletType = true
    }
  }
  onWalletSelect() {
    if (this.isShowWallet) {
      this.isShowWallet = false
    }
    else {
      this.isShowWallet = true
    }
  }
  chooseWallet(id) {
    this.arrayWallet.forEach(element => {
      if(element.id == id){
        element.isSelect = true;
      }
    });
    let a = this.arrayWallet.filter(wallet => wallet.isSelect == true);
    this.walletValue = a.map(function(elem){
      return elem.wallet;
    }).join(",");
    this.onWalletSelect();
    this.onSubmit();
  }
  chooseWalletDeactive(id) {
    this.arrayWallet.forEach(element => {
      if(element.id == id){
        element.isSelect = false;
      }
    });
    let a = this.arrayWallet.filter(wallet => wallet.isSelect == true);
    this.walletValue = a.map(function(elem){
      return elem.wallet;
    }).join(", ");
    this.onWalletSelect();
    this.onSubmit();
  }
  chooseCoin(cur) {
    switch (cur) {
      case 'BTC':
        this.coinValue = 'bitcoin'
        break;
      case 'NEM':
        this.coinValue = 'nem'
        break;
      case 'ETH':
        this.coinValue = 'ethereum'
        break;

      default:
        break;
    }
    this.onWalletType();
    this.onSubmit();
  }
  checkValidate(){
    if(!this.valuefrom){
      return false
    }
    if(!this.valueto){
      return false
    }
    if(this.coinValue == 'Choose a wallet type'){
      return false
    }
    if(this.walletValue == 'Choose wallets'){
      return false
    }
    return true
  }
  updateMyDateFrom($event){
    this.valuefrom = $event;
    this.onSubmit();
  }
  updateMyDateTo($event){
    this.valueto = $event;
    this.onSubmit();
  }

  onContinue(){
    // this.router.navigateByUrl('/tabnav/export-invoice/confirm-export');
    let json = {
      'from':this.valuefrom,
      'to':this.valueto,
      'wallet_type':this.coinValue,
      'wallet':this.walletValue  
    }
    this.router.navigate(['/tabnav', 'export','confirm-export'], { queryParams: json });
  }
}
