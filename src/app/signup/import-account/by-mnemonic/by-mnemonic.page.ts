import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage';
import { NavController, ModalController } from '@ionic/angular';

import { validateMnemonic } from 'bip39';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';
import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { PinProvider } from '@app/services/pin/pin.provider';

@Component({
  selector: 'app-by-mnemonic',
  templateUrl: './by-mnemonic.page.html',
  styleUrls: ['./by-mnemonic.page.scss'],
})
export class ByMnemonicPage implements OnInit {
  mnemonic;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private modalController: ModalController,
    private alertProvider: AlertProvider,
    private wallet: WalletProvider,
    private translate: TranslateService,
    private pin: PinProvider
  ) {
    this.mnemonic = '';
  }

  ngOnInit() {
    this.checkMnemonicAlreadyExists();
  }

  checkMnemonicAlreadyExists() {
    this.storage.get('mnemonic').then((mnemonic) => {
      if (mnemonic) {
        this.navCtrl.navigateRoot('login');
      }
    });
  }

  getMnemonic() {
    return this.mnemonic.trim().toLowerCase();
  }

  validateMnemonic() {
    const mnemonic = this.getMnemonic();
    return validateMnemonic(mnemonic);
  }

  async handleImportClick() {
    const res = await this.translate
      .get(['CREATE_SECURITY', 'CONFIRM_SECURITY'], {})
      .toPromise();
    const pin1Modal = await this.modalController.create({
      component: PinModalComponent,
      cssClass: 'pinModal',
      componentProps: {
        title: res['CREATE_SECURITY'],
        isShowForgotPin: false,
      },
    });

    await pin1Modal.present();

    pin1Modal.onDidDismiss().then(async (data1) => {
      if (data1.data.pin) {
        const pin2Modal = await this.modalController.create({
          component: PinModalComponent,
          cssClass: 'pinModal',
          componentProps: {
            title: res['CONFIRM_SECURITY'],
          },
        });
        await pin2Modal.present();

        pin2Modal.onDidDismiss().then((data2) => {
          if (data1.data.pin === data2.data.pin) {
            const mnemonic = this.getMnemonic();
            this.wallet.generateWalletsFromMnemonic(
              mnemonic,
              data2.data.pin
            );
            this.pin.saveUserPinData(data1.data.pin, mnemonic);
            this.navCtrl.navigateRoot('/login');
          } else {
            this.alertProvider.showPasswordDoNotMatch();
          }
        });
      } else {
        this.alertProvider.showInvalidPasswordAlert();
      }
    });
  }
}
