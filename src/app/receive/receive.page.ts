import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as kjua from 'kjua';

import { Wallet } from '../services/models/wallet.model';
import { WalletsService } from '../services/wallets/wallets.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
  receiveWallet: Wallet;
  maxAmount: number;
  qrCode: any;

  // --- user input values:
  selectedType = 'AUD';
  enteredAmount: number;
  selectedTax: number = 10;
  recipientName: string;
  message: string;

  amountCrypto: number;
  amountAud: number;

  // dummy user's invoic info:
  user = {
    businessName: 'AEM Algorithm',
    address: '2208/ 5 Sutherland Street, Melbourne VIC 3000 03 0987 9872',
    ABN: '0939399923',
    email: 'test@email.com',
  };

  constructor(private route: ActivatedRoute, private walletsService: WalletsService) {
    this.qrCode = { src: '' };
    this.recipientName = '';
    this.message = '';
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.receiveWallet = this.walletsService.getWallet(params['walletId']);
    });
  }

  private _encodeQrCode(infoQR) {
    this.qrCode = kjua({
      size: 256,
      text: infoQR,
      fill: '#000',
      quiet: 0,
      ratio: 2,
    });
  }

  updateQR() {
    if (!this.receiveWallet) {
      return;
    }

    let infoQR = JSON.stringify({
      data: {
        address: this.receiveWallet.walletAddress.toString(),
        amountAud: this.amountAud,
        amountCrypto: this.amountCrypto,
        selectedTax: this.selectedTax, // default tax is set to 10%
        name: this.recipientName,
        msg: this.message,
        userInfo: this.user,
      },
    });

    console.log('update:', infoQR);

    this._encodeQrCode(infoQR);
  }

  ionViewWillEnter() {
    this.updateQR();
  }

  onEnterAmount(e: any) {
    this.enteredAmount = e.target.value;

    if (this.selectedType === 'AUD') {
      this.amountAud = this.enteredAmount;
      this.amountCrypto = this.enteredAmount / 5000; // mock the calculation
    } else {
      this.amountCrypto = this.enteredAmount;
      this.amountAud = this.enteredAmount * 5000;
    }
    this.updateQR();
  }

  onSelectType(e: any) {
    console.log('type select:', e);
    this.selectedType = e.detail.value;
    console.log('type select:', this.selectedType);
  }

  onSelectTax(e: any) {
    this.selectedTax = e.detail.value;
    this.updateQR();
  }

  onShare(f) {
    // console.log(f.value);
    // console.log(f.valid);
    this.updateQR();
  }
}
