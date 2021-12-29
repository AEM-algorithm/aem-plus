import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import { Wallet } from '@app/services/models/wallet.model';
import { WalletsService } from '@app/services/wallets/wallets.service';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { LoadingProvider } from '@app/services/loading/loading.provider';
import { ToastProvider } from '@app/services/toast/toast.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { NemProvider } from '@app/services/nem/nem.provider';
import { BitcoinProvider } from '@app/services/bitcoin/bitcoin.provider';
import { TransactionExportModel } from '@app/services/models/transaction-export.model';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import * as moment from 'moment';
import { Coin } from '@app/enums/enums';
import { SUPPORTED_COINS } from '@app/constants/constants';

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
  isShowChooseFrom = 'Choose a date';
  isShowChooseTo = 'Choose a date';
  coinValue: Coin;
  coinSelect: Coin;
  walletTypeChoose = false;
  walletValue;
  wallet;
  type: string; // selected export wallet type
  purchaseFee = 12; // unlock export fee: hardcode now
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
    private nem: NemProvider,
    private bitcoin: BitcoinProvider,
  ) {}

  async ionViewWillEnter() {
    await this.loading.presentLoading();
    const allWallet = await this.walletProvider.getAllWalletsData(true);
    this.arrayWalletType = allWallet.map((value, index) => {
      return {
        walletType: value.walletType,
        walletTypeName: SUPPORTED_COINS.filter(coin => coin.id == value.walletType)[0].name,
        wallet: [
          {
            id: index,
            walletName: value.walletName,
            walletAddress: value.walletAddress,
            isSelect: false,
          },
        ],
        ...value,
      };
    });
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
      if (params?.id) {
        this.valueFrom = moment(new Date(params.from)).format();
        this.valueTo = moment(new Date(params.to)).format();
        this.isShowChooseFrom = params.from;
        this.isShowChooseTo = params.to;

        this.coinValue = Coin[params.wallet_type];
        this.coinSelect = params.wallet_type.toUpperCase();

        this.walletValue = params.wallet;
        this.valueWallet = params.wallet_address;

        this.wallet = this.arrayWalletType.filter(
          (value) => value.walletType === this.coinSelect.toUpperCase()
        );
        this.wallet = this.wallet[0];
        this.onSubmit();
      }
    });
    await this.loading.dismissLoading();
  }

  async ionViewWillLeave() {
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

  onWalletType() {
    this.isShowWalletType = !this.isShowWalletType;
  }

  onWalletSelect() {
    if (!this.coinValue) {
      return this.toast.showErrorSelectWalletType();
    }
    this.isShowWallet = !this.isShowWallet;
  }

  chooseWallet(wallet) {
    const walletType = wallet.walletType;
    this.arrayWalletType.forEach((element) => {
      if (element.walletType === walletType) {
        element.wallet[0].isSelect = true;
      }
    });
    const walletTypes = this.arrayWalletType.filter(
      (value) => value.walletType === walletType
    );
    this.walletValue = walletTypes
      .map((value) => {
        return value.wallet[0].walletName;
      })
      .join(',');
    this.onWalletSelect();
    this.onSubmit();
  }

  chooseWalletDeactive(id, walletType) {
    this.arrayWalletType.forEach((element) => {
      if (element.walletType === walletType) {
        element.wallet[0].isSelect = false;
      }
    });
    const walletTypes = this.arrayWalletType.filter(
      (wallet) => wallet.walletType === walletType
    );
    this.walletValue = walletTypes
      .map((value) => {
        return value.wallet[0].walletName;
      })
      .join(', ');
    this.onWalletSelect();
    this.onSubmit();
  }

  chooseCoin(wallet) {
    if (this.coinSelect) {
      this.walletValue = null;
    }
    this.coinSelect = wallet.walletType;
    this.wallet = wallet;
    this.coinValue = wallet.walletTypeName;
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

  async getTransactionExports(): Promise<TransactionExportModel[]> {
    await this.loading.presentLoading();
    let transactionExports: TransactionExportModel[] = [];

    switch (this.coinSelect) {
      case Coin.SYMBOL:
        transactionExports = await this.symbol.getExportTransactionByPeriod(
          this.wallet,
          new Date(this.valueFrom),
          new Date(this.valueTo)
        );
        break;
      case Coin.NEM:
        transactionExports = await this.nem.getExportTransactionByPeriod(
          this.wallet,
          new Date(this.valueFrom),
          new Date(this.valueTo)
        );
        break;
      case Coin.BITCOIN:
        transactionExports = await this.bitcoin.getExportTransactionByPeriod(
          this.wallet,
          new Date(this.valueFrom),
          new Date(this.valueTo),
        );
        break;
    }
    await this.loading.dismissLoading();
    return transactionExports;
  }

  async onContinue() {
    const transactionExports = await this.getTransactionExports();

    if (transactionExports.length > 0) {
      const queryParams = {
        from: this.valueFrom,
        to: this.valueTo,
        wallet_type: this.coinSelect,
        wallet: this.walletValue,
        wallet_address: this.wallet.walletAddress,
      };

      this.router.navigate(['/tabnav', 'export', 'confirm-export'], {
        queryParams,
        state: {
          transactionExports,
        },
      });
    }
    else {
      this.toast.showErrorSelectPeriodTransaction();
    }
  }
  onHistory() {
    this.router.navigateByUrl('/tabnav/export/export-history');
  }
}
