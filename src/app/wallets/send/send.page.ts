import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address as SymbolAddress, Mosaic as SymbolMosaic, UInt64 as SymbolUInt64 } from 'symbol-sdk';

import { ModalController, Platform } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models/token.model';
import { Transaction } from 'src/app/services/models/transaction.model';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { SymbolProvider } from '@app/services/symbol/symbol.provider';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

import { WALLET_ICON } from 'src/app/constants/constants';

const defaultFeesConfig = {
  free: 0,
  slow: 1,
  normal: 1.2,
  fast: 2,
};

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
  audBalance: number;
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

  walletIcon = WALLET_ICON;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private walletProvider: WalletProvider,
    private platform: Platform,
    private symbol: SymbolProvider,
    private router: Router,
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

  private formInit() {
    this.sendForm = new FormGroup({
      receiverAddress: new FormControl(null, Validators.required),
      amountType: new FormControl(this.selectedType, Validators.required),
      amount: new FormControl(null, Validators.required),
      fee: new FormControl(this.suggestedFeeCurrency, Validators.required),
      description: new FormControl(null), // optional
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const walletId = params.get('walletId');
      const state = this.router.getCurrentNavigation().extras.state;
      this.selectedMosaic = state?.selectMosaic;

      this.selectedWallet = await this.walletProvider.getWalletByWalletId(walletId, false);

      // this.selectedWallet = this.walletsService.getWallet(params.get('walletId'));

      this.cryptoBalance = this.selectedWallet.walletBalance[1];
      this.audBalance = this.selectedWallet.walletBalance[0];
      this.transformedWalletData = this.selectedWallet;
      this.selectedType = this.selectedWallet.currency;

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
        this.cryptoBalance = this.selectedToken.balance[1];
        this.audBalance = this.selectedToken.balance[0];
      }
    });

    this.formInit();
  }

  closeModal() {
    this.modalCtrl.dismiss();
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
    // --- get the amount based on selected type:
    const enteredAmount = e?.target?.value;
    if (enteredAmount) {
      this.amount = enteredAmount;
    }
    if (this.amount === null || this.amount === undefined || isNaN(this.amount)) {
      return;
    }

    if (this.selectedType === this.selectedWallet.currency) {
      // if (enteredAmount > this.audBalance) {
      //   this.isAmountValid = false;
      //   this.amountErr = `Avalibal balance is not larger than ${this.audBalance}`;
      //   return;
      // }
      this.checkAmountValidation(this.amount, this.audBalance);
      this.amountCurrency = this.amount;
      this.amountCrypto = this.amount / this.selectedWallet.exchangeRate; // mock the calculation
    } else {
      // if (enteredAmount > this.cryptoBalance) {
      //   this.isAmountValid = false;
      //   this.amountErr = `Avalibal balance is not larger than ${this.cryptoBalance}`;
      //   return;
      // }
      this.checkAmountValidation(this.amount, this.cryptoBalance);
      // this.isAmountValid = true;
      this.amountCrypto = this.amount;
      this.amountCurrency = this.amount * this.selectedWallet.exchangeRate;
    }
    //  --- mock the tax calculation:
    this.tax = (this.amountCurrency * 0.1) / (1 + 0.1); // TODO
    // ----- mock calculate the fee & set the fee selection range:
    this.suggestedFeeCurrency = +(this.amountCurrency * 0.05).toFixed(2); // TODO
    this.maxFeeCurrency = +(this.suggestedFeeCurrency * 2).toFixed(2); // TODO
    this.minFeeCurrency = +(this.suggestedFeeCurrency * 0.01).toFixed(2); // TODO
  }

  // private prepareTransaction(recipient: SymbolAddress) {
  //   const transferTransaction = this.symbol.prepareMosaicTransaction(recipient, [
  //     new SymbolMosaic(
  //       this.selectedMosaic.mosaic.id,
  //       SymbolUInt64.fromUint(this.amount * Math.pow(10, this.selectedMosaic.info.divisibility))
  //     )
  //   ], this.sendForm.value.description);
  //   const fee = transferTransaction.maxFee.compact();
  //   console.log(fee);
  //   return transferTransaction;
  // }

  async updateMaxFee() {
    setTimeout(async () => {
      const defaultMaxFees = await Promise.all([
        ...Object.keys({...defaultFeesConfig, current: defaultFeesConfig.normal})
          .map(async key =>
            [
              key,
              this.resolveAmount(this.prepareTransaction(defaultFeesConfig[key]), 6)
            ]
          )
      ]);

      console.log(defaultMaxFees);
    });
  }

  private prepareTransaction = (fee?) => {
    const mosaic = this.selectedMosaic.mosaic;
    mosaic.amount = this.amountCrypto * Math.pow(10, mosaic.divisibility);

    return {
      recipientAddress: this.sendForm.value.receiverAddress,
      mosaics: [mosaic],
      message: this.sendForm.value.description,
      fee: fee || this.selectedFeeCrypto,
    };
  }

  resolveAmount = (rawAmount, divisibility) => {
    return rawAmount / Math.pow(10, divisibility);
  }

  onSelectFee(e: any) {
    const selectedVal = e.target.value;
    this.selectedFeeCurrency = e.target.value;

    // show the warning when reach a certain point
    if (selectedVal < this.suggestedFeeCurrency * 0.02) {
      this.isTooLow = true;
    } else if (selectedVal > this.suggestedFeeCurrency * 1.7) {
      this.isTooHigh = true;
    } else {
      this.isTooLow = false;
      this.isTooHigh = false;
    }
    this.selectedFeeCurrency = e.target.value;
    this.selectedFeeCrypto = +(this.selectedFeeCurrency * 0.02).toFixed(8); // mock the convertion
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
    // Validate the entered address
    const enteredAddress = e.target.value;
    if (enteredAddress.length > 12) {
    }
  }

  onEditFee() {
    console.log('editing fee...');
  }

  onDescriptionChange(e) {
    this.updateMaxFee();
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
}
