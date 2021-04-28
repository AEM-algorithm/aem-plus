import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { Wallet } from 'src/app/services/models/wallet.model';
import { UtilsService } from 'src/app/services/helper/utils.service';
import { QrCodeComponent } from '../qr-code/qr-code.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  @Input() wallet: Wallet;

  constructor(
    private modalCtrl: ModalController,
    private clipboard: Clipboard,
    private ultisService: UtilsService // private toastCtrl: ToastController
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
    this.ultisService.showAddressCopyMessage();
  }
}
