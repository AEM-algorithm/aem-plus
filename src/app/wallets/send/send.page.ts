import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalController, Platform } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models/token.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import {FeesConfig, SymbolFeeProvider } from '@app/services/symbol/symbol.fee.provider';
import {LoadingProvider} from '@app/services/loading/loading.provider';
import {ToastProvider} from '@app/services/toast/toast.provider';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

import { WALLET_ICON } from 'src/app/constants/constants';

import {
  NetworkConfiguration as SymbolNetworkConfiguration,
  TransactionFees as SymbolTransactionFees,
  Address as SymbolAddress,
} from 'symbol-sdk';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  isTokenSelected = false; // determine select a walllet or its token
  selectedWallet: Wallet;
  selectedToken: Token;

  cryptoBalance: number;
  currencyBalance: number;
  selectedMosaic: any;

  transformedWalletData: {};

  selectedType;
  //  --- form & form inputs:
  sendForm: FormGroup;
  amountCurrency: number;
  amountCrypto: number;
  amount: number;
  receiverName: string;

  // ---- form error handling:
  isAmountValid = true;
  amountErr: string;

  //  --- others:
  tax: number;
  ABNNum: number;
  businessName: string;

  // --- fee adjustment:
  suggestedFeeCurrency: number = 0.0;
  maxFeeCurrency: number;
  minFeeCurrency: number;
  isTooLow = false;
  isTooHigh = false;
  selectedFeeCurrency: number;
  selectedFeeCrypto: number;
  rangeValue: number;

  walletIcon = WALLET_ICON;

  networkConfig: SymbolNetworkConfiguration;
  transactionFees: SymbolTransactionFees;

  rangeFees = {
    1: this.minFeeCurrency,
    2: this.suggestedFeeCurrency,
    3: this.maxFeeCurrency,
  };

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private walletProvider: WalletProvider,
    private platform: Platform,
    private symbol: SymbolProvider,
    private router: Router,
    private symbolFee: SymbolFeeProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
  ) {
    this.selectedWallet = new Wallet(
      '',
      '',
      '',
      null,
      '',
      [],
      null,
      [],
      '',
      '',
      [],
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const walletId = params.get('walletId');
      const state = this.router.getCurrentNavigation().extras.state;
      this.selectedMosaic = state?.selectMosaic;

      this.selectedWallet = await this.walletProvider.getWalletByWalletId(walletId, false);

      this.cryptoBalance = this.selectedWallet.walletBalance[1];
      this.currencyBalance = this.selectedWallet.walletBalance[0];
      this.transformedWalletData = this.selectedWallet;
      this.selectedType = this.selectedWallet.currency;

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
        this.cryptoBalance = this.selectedToken.balance[1];
        this.currencyBalance = this.selectedToken.balance[0];
      }
    });

    this.formInit();
    this.symbolInit();
  }

  private formInit() {
    this.sendForm = new FormGroup({
      receiverAddress: new FormControl(null, Validators.required),
      amountType: new FormControl(this.selectedType, Validators.required),
      amount: new FormControl(null, Validators.required),
      fee: new FormControl(this.suggestedFeeCurrency, Validators.required),
      description: new FormControl(null), // optional
    });
  }

  private async symbolInit() {
    await this.loading.presentLoading();
    this.networkConfig = await this.symbol.getNetworkConfig();
    this.transactionFees = await this.symbol.getTransactionFees();
    await this.loading.dismissLoading();
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
    this.onEnterAmount({});
  }

  private checkAmountValidation(enteredAmount: number, maxAmount: number) {
    if (enteredAmount > maxAmount) {
      this.isAmountValid = false;
      this.amountErr = `Available balance is not larger than ${maxAmount}`;
      return;
    }
    this.isAmountValid = true;
  }

  onEnterAmount(e: any) {
    const enteredAmount = e?.target?.value || '';
    this.amount = enteredAmount;

    if (this.selectedType === this.selectedWallet.currency) {
      this.checkAmountValidation(this.amount, this.currencyBalance);
      this.amountCurrency = this.amount;
      this.amountCrypto = this.amount / this.selectedWallet.exchangeRate; // mock the calculation
    } else {
      this.checkAmountValidation(this.amount, this.cryptoBalance);
      this.amountCrypto = this.amount;
      this.amountCurrency = this.amount * this.selectedWallet.exchangeRate;
    }

    // TODO: calculate tax.
    this.tax = (this.amountCurrency * 0.1) / (1 + 0.1);

    this.updateFee();
  }

  showAddressList() {
    this.modalCtrl
      .create({
        component: SelectAddressModalComponent,
        cssClass: 'height-eightyfive-modal',
        componentProps: {
          selectedWalletType: this.selectedWallet.walletType,
        },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((modalData) => {
        if (modalData.role === 'confirm') {
          // get the data from the "select address modal"
          this.sendForm.get('receiverAddress').setValue(modalData.data.address);
          this.receiverName = modalData.data.holderName;
          this.ABNNum = modalData.data.ABNNum;
          this.businessName = modalData.data.businessName;
        }
      });
  }

  onEnterAddress(e: any) {
  }

  onEditFee() {
    console.log('editing fee...');
  }

  onDescriptionChange(e) {
    this.updateFee();
    console.log(this.sendForm);
  }

  isFormValid() {
    const receiverAddress = this.sendForm.value.receiverAddress;
    if (!receiverAddress) {
      return false;
    }
    if (!SymbolAddress.isValidRawAddress(receiverAddress)) {
      return false;
    }
    return true;
  }

  async updateFee() {
    if (!this.isFormValid()) {
      return;
    }

    const fees = await this.updateMaxFee();
    console.log(fees); // TODO remove log.

    this.suggestedFeeCurrency = fees.normal;
    this.maxFeeCurrency = fees.fast;
    this.minFeeCurrency = fees.slow;

    this.updateSelectFee(this.rangeValue);
  }

  onSelectFee(e: any) {
    this.updateSelectFee(e.target.value);
  }

  updateSelectFee(range) {
    setTimeout(() => {
      this.rangeValue = range ? range : 2;

      this.selectedFeeCrypto = this.rangeFees[range];
      this.selectedFeeCurrency = this.rangeFees[range] * this.selectedWallet.exchangeRate;
    }, 300);
  }

  async updateMaxFee(): Promise<FeesConfig> {
    const maxFees = await Promise.all(
      Object.keys(this.symbolFee.defaultFeesConfig).map(async (key) => {
        const txs = this.prepareTransaction(this.symbolFee.defaultFeesConfig[key]);
        const amount = await this.symbolFee.getMaxFee(txs, this.networkConfig, this.transactionFees);
        return [key, this.symbolFee.resolveAmount(amount, 6)];
      })
    );
    return this.fromEntries(maxFees);
  }

  prepareTransaction = (fee) => {
    this.selectedMosaic.mosaic.amount = this.amountCrypto * Math.pow(10, this.selectedMosaic.info.divisibility);
    return {
      recipientAddress: this.sendForm.value.receiverAddress,
      mosaics: [this.selectedMosaic.mosaic],
      message: this.sendForm.value.description,
      fee,
    };
  }

  fromEntries(entries) {
    return entries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
  }

  onSend() {
    const tokenId = this.isTokenSelected ? this.selectedToken.id : null;

    // 1. re-structure the form data to a transaction object:
    const transId = Math.random().toFixed(8);
    const newTransaction: Transaction = {
      transId: transId,
      time: new Date().getTime(),
      incoming: false,
      address: this.selectedWallet.walletAddress,
      feeCrypto: this.selectedFeeCrypto,
      feeAud: this.selectedFeeCurrency,
      amount: this.amountCrypto,
      hash: 'jsdfkljasdfasdfasdfasdfarfdadsfdf', //hard code
      confirmations: 9, //hard code
      amountAUD: this.amountCurrency,
      businessName: this.businessName,
      receiver: this.receiverName,
      receiverAddress: this.sendForm.value.receiverAddress,
      description: this.sendForm.value.description,
      ABN: this.ABNNum,
      tax: this.tax,
      tokenId: tokenId,
    };

    // 2. open the comfirm alter window:
    this.modalCtrl
      .create({
        component: ConfirmTransactionModalComponent,
        componentProps: {
          transactionData: newTransaction,
          walletType: this.selectedWallet.walletType,
          walletId: this.selectedWallet.walletId,
        },
        cssClass: 'send-confirm-modal ',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
