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
  qrCode: any;

  // dummy user's info:
  user = {
    businessName: 'AEM Algorithm',
    address: '2208/ 5 Sutherland Street, Melbourne VIC 3000 03 0987 9872',
  };

  constructor(private route: ActivatedRoute, private walletsService: WalletsService) {
    this.qrCode = { src: '' };
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.receiveWallet = this.walletsService.getWallet(params['walletId']);
    });
  }

  ionViewWillEnter() {
    this._encodeQrCode(this.receiveWallet.walletAddress);
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
}

// Backend: change the QR code while user typing
//          in accordance with the user's input value
