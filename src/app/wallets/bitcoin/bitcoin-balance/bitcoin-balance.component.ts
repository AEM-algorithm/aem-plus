import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrcodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-bitcoin-balance',
  templateUrl: './bitcoin-balance.component.html',
  styleUrls: ['./bitcoin-balance.component.scss'],
})
export class BitcoinBalanceComponent implements OnInit {
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  showQRcode() {
    this.modalCtrl
      .create({
        component: QrcodeComponent,
      })
      .then((modalEl) => modalEl.present());
  }
}
