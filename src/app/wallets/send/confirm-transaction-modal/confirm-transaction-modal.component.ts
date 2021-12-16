import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';

import { PinProvider } from '@app/services/pin/pin.provider';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { AlertProvider } from '@app/services/alert/alert.provider';

@Component({
  selector: 'app-confirm-transaction-modal',
  templateUrl: './confirm-transaction-modal.component.html',
  styleUrls: ['./confirm-transaction-modal.component.scss'],
})
export class ConfirmTransactionModalComponent implements OnInit {
  @Input() transactionInfo;
  @Input() walletType;
  @Input() walletId;

  date: string;
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private pin: PinProvider,
    private wallet: WalletProvider,
    private alertProvider: AlertProvider,
  ) {}

  ngOnInit() {
    this.date = new Date().toDateString();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async confirm() {
    const pin = await this.checkPin();
    if (!pin) {
      return;
    }
    this.modalCtrl.dismiss({pin});
  }

  async checkPin(): Promise<string | null> {
    const pin = await this.pin.showEnterPin();
    if (!pin) {
      return null;
    }

    const isValidPin = await this.wallet.isValidPin(pin);
    if (!isValidPin) {
      this.alertProvider.showInvalidPasswordAlert();
      return null;
    }

    return pin;
  }
}
