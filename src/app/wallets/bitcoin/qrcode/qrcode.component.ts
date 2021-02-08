import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as kjua from 'kjua';
import { Wallet } from 'src/app/services/models/wallet.model';

@Component({
  selector: 'bitcoin-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QrcodeComponent implements OnInit {
  @Input() wallet: Wallet;

  // dummy data:
  // wallet = {
  //   // type: 'BTC',
  //   type: 'NEM',
  //   name: 'My bitcoinWallet',
  //   address: 'kjsdflkasjdflasjdflasdfasdfasdfasdfasd',
  // };

  qrCode: any;

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
