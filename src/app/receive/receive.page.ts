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
  amountTypesSel = [];
  selectedType = 'AUD';
  // inputAmount = 0.0;
  amount = 0.0;

  taxSelection = [
    {
      value: '0%',
    },
    {
      value: '10%',
    },
  ];

  selectedTax: number;
  recipientName: string;
  message: string;

  // dummy user's info:
  user = {
    businessName: 'AEM Algorithm',
    address: '2208/ 5 Sutherland Street, Melbourne VIC 3000 03 0987 9872',
    ABN: '0939399923',
    contact: '+61 5668939',
  };

  constructor(private route: ActivatedRoute, private walletsService: WalletsService) {
    this.qrCode = { src: '' };

    // this.amount = null;
    // this.selectedTax = 0;
    this.recipientName = '';
    this.message = '';
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.receiveWallet = this.walletsService.getWallet(params['walletId']);
    });
    this.maxAmount = this.receiveWallet.walletBalance[0];

    this.amountTypesSel = [
      {
        value: 'AUD',
      },
      {
        value: this.receiveWallet.walletType,
      },
    ];

    console.log(this.amountTypesSel);

    // ========= Q: the max director is not working on TD-form:
    // if (this.selectedType === 'AUD') {
    //   this.maxAmount = this.receiveWallet.walletBalance[0];
    // } else {
    //   this.maxAmount = this.receiveWallet.walletBalance[1];
    // }
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

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      this.receiveWallet = this.walletsService.getWallet(params['walletId']);
    });
    this.maxAmount = this.receiveWallet.walletBalance[0];
    console.log('will enter:', this.maxAmount);

    // this._encodeQrCode(this.receiveWallet.walletAddress);
    this.updateQR();
  }

  updateQR() {
    if (!this.receiveWallet) {
      return;
    }

    let infoQR = JSON.stringify({
      data: {
        address: this.receiveWallet.walletAddress.toString(),
        amount: this.amount,
        selectedTax: this.selectedTax,
        name: this.recipientName,
        msg: this.message,
        userInfo: this.user,
      },
    });

    console.log('update:', infoQR);

    this._encodeQrCode(infoQR);
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
    console.log(f.valid);
    // share the QR code image
    // console.log(this.qrCode);
  }
}

// Backend: change the QR code while user typing
//          in accordance with the user's input value
