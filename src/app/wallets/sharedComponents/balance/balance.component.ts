import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Wallet } from 'src/app/services/models/wallet.model';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  @Input() wallet: Wallet;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private clipboard: Clipboard,
    private toastCtrl: ToastController
  ) {}

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

  onCopyAddress(address: string) {
    this.clipboard.copy(address);
    this.toastCtrl
      .create({
        message: 'Address is copied!',
        duration: 3000,
        position: 'top',
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }
}
