import { Component, Input, OnInit } from '@angular/core';

import * as kjua from 'kjua';

import { ModalController } from '@ionic/angular';

import { Wallet } from 'src/app/services/models/wallet.model';

import { WALLET_ICON } from 'src/app/constants/constants';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  @Input() wallet: Wallet;

  qrCode: any;

  walletIcon = WALLET_ICON;

  constructor(private modalCtrl: ModalController) {
    this.qrCode = { src: '' };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // generate the qr code:
    this._encodeQrCode(this.wallet.walletAddress);
  }

  close() {
    this.modalCtrl.dismiss();
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
