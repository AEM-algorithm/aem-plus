import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from '../../services/models/token.model';

import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { Transaction } from 'src/app/services/models/transaction.model';

import { ConfirmTransactionModalComponent } from './confirm-transaction-modal/confirm-transaction-modal.component';
import { SelectAddressModalComponent } from './select-address-modal/select-address-modal.component';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  isTokenSelected = false; // determine select a walllet or token
  selectedWallet: Wallet;
  selectedToken: Token;

  cryptoBanlance: number;
  audBanlance: number;

  transformedWalletData: {};

  selectedType = 'AUD';
  //  --- form & form inputs:
  sendForm: FormGroup;
  amountAud: number;
  amountCrypto: number;
  receiverName: string;
  //  --- others:
  tax: number;
  ABNNum: number;
  businessName: string;

  // --- fee adjustment:
  suggestedFeeAud: number = 0.0;
  maxFeeAud: number;
  minFeeAud: number;
  isTooLow = false;
  isTooHigh = false;
  selectedFeeAud: number;
  selectedFeeCrypto: number;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private walletsService: WalletsService
  ) {}

  private formInit() {
    this.sendForm = new FormGroup({
      receiverAddress: new FormControl(null, Validators.required),
      amountType: new FormControl(this.selectedType, Validators.required),
      amount: new FormControl(null, Validators.required),
      fee: new FormControl(this.suggestedFeeAud, Validators.required),
      description: new FormControl(null), // optional
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.selectedWallet = this.walletsService.getWallet(params.get('walletId'));

      console.log('selected wallet:', this.selectedWallet);
      this.cryptoBanlance = this.selectedWallet.walletBalance[1];
      this.audBanlance = this.selectedWallet.walletBalance[0];
      this.transformedWalletData = this.selectedWallet;

      if (params.has('tokenId')) {
        this.isTokenSelected = true;
        this.selectedToken = this.walletsService.getToken(this.selectedWallet, params.get('tokenId'));
        this.cryptoBanlance = this.selectedToken.balance[1];
        this.audBanlance = this.selectedToken.balance[0];
      }
    });

    this.formInit();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
  }

  onEnterAmount(e: any) {
    // --- get the amount based on selected type:
    const enteredAmount = e.target.value;
    if (this.selectedType === 'AUD') {
      this.amountAud = enteredAmount;
      this.amountCrypto = enteredAmount / 5000; // mock the calculation
    } else {
      this.amountCrypto = enteredAmount;
      this.amountAud = enteredAmount * 5000; // mock the calculation
    }
    //  --- mock the tax calculation:
    this.tax = (this.amountAud * 0.1) / (1 + 0.1);
    // ----- mock calculate the fee & set the fee selection range:
    this.suggestedFeeAud = +(this.amountAud * 0.05).toFixed(2);
    this.maxFeeAud = +(this.suggestedFeeAud * 2).toFixed(2);
    this.minFeeAud = +(this.suggestedFeeAud * 0.01).toFixed(2);
  }

  onSelectFee(e: any) {
    console.log('fee:', e.target.value);
    const selectedVal = e.target.value;
    this.selectedFeeAud = e.target.value;

    // show the warning when reach a certain point
    if (selectedVal < this.suggestedFeeAud * 0.02) {
      this.isTooLow = true;
    } else if (selectedVal > this.suggestedFeeAud * 1.8) {
      this.isTooHigh = true;
    } else {
      this.isTooLow = false;
      this.isTooHigh = false;
    }
    this.selectedFeeAud = e.target.value;
    this.selectedFeeCrypto = +(this.selectedFeeAud * 0.02).toFixed(8); // mock the convertion
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
  onEditFee() {
    console.log('editing fee...');
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
      feeAud: this.selectedFeeAud,
      amount: this.amountCrypto,
      hash: 'jsdfkljasdfasdfasdfasdfarfdadsfdf', //hard code
      confirmations: 9, //hard code
      amountAUD: this.amountAud,
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
