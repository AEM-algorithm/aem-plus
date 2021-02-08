import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Wallet } from 'src/app/services/models/wallet.model';
import { QrCodeComponent } from '../../sharedComponents/qr-code/qr-code.component';

@Component({
  selector: 'app-bitcoin-balance',
  templateUrl: './bitcoin-balance.component.html',
  styleUrls: ['./bitcoin-balance.component.scss'],
})
export class BitcoinBalanceComponent implements OnInit {
  @Input() wallet: Wallet;

  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  showQRcode() {
    this.modalCtrl
      .create({
        component: QrCodeComponent,
        componentProps: {
          wallet: this.wallet,
        },
      })
      .then((modalEl) => modalEl.present());
  }
}
