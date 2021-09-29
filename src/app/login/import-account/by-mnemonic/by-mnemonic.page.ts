import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
import { NavController, ModalController } from '@ionic/angular';

import { validateMnemonic } from 'bip39';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

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
  ) {
    this.mnemonic = '';
  }

  ngOnInit() {
    this.checkMnemonicAlreadyExists();
  }

  checkMnemonicAlreadyExists() {
    this.storage.get('mnemonic').then(mnemonic => {
      if (mnemonic) {
        // TODO: mnemonic already exists
        // this.navCtrl.navigateRoot('/...');
      }
    });
  }

  getMnemonic() {
    return this.mnemonic;
  }

  validateMnemonic() {
    return validateMnemonic(this.mnemonic);
  }

  async handleImportClick() {
    const pin1Modal = await this.modalController.create({
      component: PinModalComponent,
      componentProps: {
        title: 'Create Security Code'
      }
    });
    //
    pin1Modal.onDidDismiss().then(async data1 => {
      if (data1.data.pin) {
        const pin2Modal = await this.modalController.create({
          component: PinModalComponent,
          componentProps: {
            title: 'Confirm Security Code'
          }
        });
        pin2Modal.onDidDismiss().then(data2 => {
          if (data1.data.pin === data2.data.pin) {
            // TODO: generateWalletsFromMnemonic && navigate to main wallet screen
            // this.wallet.generateWalletsFromMnemonic(this.mnemonic, data2.data['pin']);
            // this.navCtrl.navigateRoot('/...');
            alert(' TODO: generateWalletsFromMnemonic && navigate to main wallet screen');
          } else {
            this.alertProvider.showPasswordDoNotMatch();
          }
        });
        await pin2Modal.present();
      } else {
        this.alertProvider.showInvalidPasswordAlert();
      }
    });

    await pin1Modal.present();
  }

}
