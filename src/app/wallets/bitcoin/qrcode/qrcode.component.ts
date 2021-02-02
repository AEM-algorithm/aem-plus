import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as kjua from 'kjua';

@Component({
  selector: 'bitcoin-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {
  // dummy data:
  wallet = {
    // type: 'BTC',
    type: 'NEM',
    name: 'My bitcoinWallet',
    address: 'kjsdflkasjdflasjdflasdfasdfasdfasdfasd',
  };

  qrCode: any;

  constructor(private modalCtrl: ModalController) {
    this.qrCode = { src: '' };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // generate the qr code:
    this._encodeQrCode(this.wallet.address);
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
