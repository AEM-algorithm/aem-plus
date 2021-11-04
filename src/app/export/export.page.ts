import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { Wallet } from '@app/services/models/wallet.model';
import { WalletsService } from '@app/services/wallets/wallets.service';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { TransactionExportModel } from '@app/services/models/transaction-export.model';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  exportForm: FormGroup;
  isShowWalletType = false;
  isShowWallet = false;
  isShowBtn = false;
  coinValue;
  coinSelect;
  walletTypeChoose = false;
  walletValue;
  wallet;
  type: string; // selected export wallet type
  purchaseFee: number = 12; // unlock export fee: hardcode now
  wallets: Wallet[]; // wallets of the selected type that the user has
  walletsToExport: Wallet[]; // selected wallets from walllets
  valueFrom;
  valueTo;
  valueWallet;
  exportFormData: {
    dateFrom: Date;
    dateTo: Date;
    exportFee: number;
  };

  arrayWallet = [
    { id: 1, wallet: 'My wallet 1 (BTC)', isSelect: false },
    { id: 2, wallet: 'My wallet 2 (BTC)', isSelect: false },
    { id: 3, wallet: 'My wallet 3 (NEM)', isSelect: false },
    { id: 4, wallet: 'My wallet 4 (ETH)', isSelect: false },
  ];
  arrayWalletType = [];

  walletsToExportSelected = false;

  // TODO: after add in app purchase
  //       set it to true, if user unlock the export function
  //       change the confirm modal info without the purchase fee
  isExportUnlocked = false; // -------  needs to store server-side under this user.

  constructor(
    private alterCtrl: AlertController,
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private walletProvider: WalletProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private symbol: SymbolProvider,
  ) { }

  async ionViewWillEnter() {
    await this.loading.presentLoading();
    const allWallet = await this.walletProvider.getAllWallets();
    this.arrayWalletType = allWallet.map((value, index) => {
      return {
        walletType: value.walletType,
        wallet: [{
          id: index,
          walletName: value.walletName,
          walletAddress: value.walletAddress,
          isSelect: false
        }],
        ...value,
      };
    });
    await this.loading.dismissLoading();
  }

  async ionViewWillLeave(){
    this.arrayWalletType = [];
  }

  async ngOnInit() {
    this.arrayWalletType = [];
    this.exportForm = new FormGroup({
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
    });
  }

  onSelectExportWallets(e: any) {
    this.walletsToExport = e.detail.value;
    this.walletsToExportSelected = true;
  }

  onSubmit() {
    if (this.checkValidate()) {
      this.isShowBtn = true;
    }
  }

  onSubmit_() {
    const type = this.exportForm.get('walletType').value;

    this.exportFormData = {
      dateFrom: new Date(this.exportForm.get('dateFrom').value),
      dateTo: new Date(this.exportForm.get('dateTo').value),
      // walletType: type,
      // walletsExport: this.walletsToExport,
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
    this.isShowWalletType =  !this.isShowWalletType;
  }

  onWalletSelect() {
    if (!this.coinValue) {
      return this.toast.showErrorSelectWalletType();
    }
    this.isShowWallet = !this.isShowWallet;
  }

  chooseWallet(wallet) {
    const walletType = wallet.walletType;
    this.arrayWalletType.forEach(element => {
      if (element.walletType === walletType) {
        element.wallet[0].isSelect = true;
      }
    });
    const walletTypes = this.arrayWalletType.filter(value => value.walletType === walletType);
    this.walletValue = walletTypes.map((value) => {
      return value.wallet[0].walletName;
    }).join(',');
    this.onWalletSelect();
    this.onSubmit();
  }

  chooseWalletDeactive(id, walletType) {
    this.arrayWalletType.forEach(element => {
      if (element.walletType === walletType) {
        element.wallet[0].isSelect = false;
      }
    });
    const walletTypes = this.arrayWalletType.filter(wallet => wallet.walletType === walletType);
    this.walletValue = walletTypes.map((value) => {
      return value.wallet[0].walletName;
    }).join(', ');
    this.onWalletSelect();
    this.onSubmit();
  }

  chooseCoin(wallet) {
    this.coinSelect = wallet.walletType;
    this.wallet = wallet;
    switch (this.coinSelect) {
      case 'BTC':
        this.coinValue = 'bitcoin';
        break;
      case 'NEM':
        this.coinValue = 'nem';
        break;
      case 'XYM':
        this.coinValue = 'xym';
        break;
      case 'ETH':
        this.coinValue = 'ethereum';
        break;

      default:
        break;
    }
    this.walletTypeChoose = true;
    this.onWalletType();
    this.onSubmit();
  }

  checkValidate() {
    if (this.valueFrom && this.valueTo && this.coinValue && this.walletValue) {
      return true;
    }
    return false;
  }

  updateMyDateFrom($event) {
    this.valueFrom = $event;
    this.onSubmit();
  }

  updateMyDateTo($event) {
    this.valueTo = $event;
    this.onSubmit();
  }

  async getTransactionExports(): Promise<TransactionExportModel[]>{
    await this.loading.presentLoading();
    const transactionExports: TransactionExportModel[] = await this.symbol.getExportTransactionByPeriod(
      this.wallet,
      new Date(this.valueFrom),
      new Date(this.valueTo)
    );
    await this.loading.dismissLoading();
    return transactionExports;
  }

  async onContinue() {
    let transactionExports = [];
    switch (this.coinSelect) {
      case 'XYM':
        transactionExports = await this.getTransactionExports();
        break;
      // TODO
    }
    if (transactionExports.length > 0) {
      const queryParams = {
        from: this.valueFrom,
        to: this.valueTo,
        wallet_type: this.coinValue,
        wallet: this.walletValue,
        wallet_address: this.wallet.walletAddress
      };
      this.router.navigate(['/tabnav', 'export', 'confirm-export'],
        {
          queryParams,
          state: {
            transactionExports,
          }
        },
      );
    } else {
      this.toast.showErrorSelectPeriodTransaction();
    }
  }
  onHistory() {
    this.router.navigateByUrl('/tabnav/export/export-history');
  }
}
