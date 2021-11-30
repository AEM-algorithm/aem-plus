import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { WalletsService } from 'src/app/services/wallets/wallets.service';
import { PinProvider } from '@app/services/pin/pin.provider';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { AlertProvider } from '@app/services/alert/alert.provider';

@Component({
  selector: 'app-confirm-transaction-modal',
  templateUrl: './confirm-transaction-modal.component.html',
  styleUrls: ['./confirm-transaction-modal.component.scss'],
})
export class ConfirmTransactionModalComponent implements OnInit {
  @Input() transactionData;
  @Input() walletType;
  @Input() walletId;

  date: string;
  constructor(
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private pin: PinProvider,
    private wallet: WalletProvider,
    private alertProvider: AlertProvider,
  ) {}

  ngOnInit() {
    this.date = new Date(this.transactionData.time).toDateString();
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

    // this.loadingCtrl
    //   .create({
    //     message: 'transaction is processing',
    //     duration: 200,
    //     spinner: 'circles',
    //   })
    //   .then((loadingEl) => {
    //     loadingEl.present();
    //     // try {
    //     //   this.walletsService.sendTransaction(this.transactionData, this.walletId);
    //     // } catch (err) {
    //     //   // catch any error from backend
    //     //   console.log(err);
    //     // }
    //   });

    // this.close();
    // this.router.navigateByUrl('/tabnav/wallets');
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
