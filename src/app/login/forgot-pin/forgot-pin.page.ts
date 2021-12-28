import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NavController, ModalController } from '@ionic/angular';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';

import { validateMnemonic } from 'bip39';
import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { PinProvider } from '@app/services/pin/pin.provider';
@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.page.html',
  styleUrls: ['./forgot-pin.page.scss'],
})
export class ForgotPinPage implements OnInit {
  private mnemonic;

  constructor(
    private navCtrl: NavController,
    private translate: TranslateService,
    private alertProvider: AlertProvider,
    private wallet: WalletProvider,
    private modalController: ModalController,
    private pin: PinProvider,
  ) {
    this.mnemonic = '';
  }

  ngOnInit() { }



  getMnemonic() {
    return this.mnemonic;
  }

  validateMnemonic() {
    return validateMnemonic(this.mnemonic);
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  async handleResetPinClick() {
    const isCorrectMnemonic = await this.pin.checkMnemonic(this.mnemonic);
    if (isCorrectMnemonic) {
      const res = await this.translate.get(['CREATE_SECURITY', 'CONFIRM_SECURITY'], {}).toPromise();
      const pin1Modal = await this.modalController.create({
        component: PinModalComponent,
        cssClass: 'pinModal',
        componentProps: {
          title: res['CREATE_SECURITY']
        }
      });

      await pin1Modal.present();

      pin1Modal.onDidDismiss().then(async data1 => {
        if (data1.data.pin) {
          const pin2Modal = await this.modalController.create({
            component: PinModalComponent,
            cssClass: 'pinModal',
            componentProps: {
              title: res['CONFIRM_SECURITY']
            }
          });
          await pin2Modal.present();

          pin2Modal.onDidDismiss().then(data2 => {
            if (data1.data.pin === data2.data.pin) {
              this.wallet.removeAccountData();        // TODO: Change me: use update instead of purge wallets
              this.wallet.generateWalletsFromMnemonic(this.mnemonic, data2.data.pin);
              this.pin.saveUserPinData(data2.data.pin, this.mnemonic);
              this.onDismiss();
            } else {
              this.alertProvider.showPasswordDoNotMatch();
            }
          });
        } else {
          this.alertProvider.showInvalidPasswordAlert();
        }
      });
    } else {
      this.alertProvider.showMnemonicDoNotMatch()
    }
  }
}
