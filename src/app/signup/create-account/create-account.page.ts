import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { generateMnemonic } from 'bip39';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';
import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { AlertProvider } from 'src/app/services/alert/alert.provider';

import { PinProvider } from '@app/services/pin/pin.provider';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  mnemonic;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: Storage,
    private wallet: WalletProvider,
    public alertProvider: AlertProvider,
    private translate: TranslateService,
    private pin: PinProvider,
  ) {
    this.mnemonic = '';
    this.onGenerateMnemonic();
  }

  ngOnInit() { }

  onGenerateMnemonic() {
    this.mnemonic = generateMnemonic();
  }

  onContinue() {
    // 1. open the pin modal
    this.modalCtrl
      .create({
        component: PinModalComponent,
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  /**
   * Saves mnemonic
   */
  public async saveMnemonic() {
    const res = await this.translate.get(['CREATE_SECURITY', 'CONFIRM_SECURITY'], {}).toPromise();
    let pin1Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      cssClass: 'pinModal',
      componentProps: {
        title: res['CREATE_SECURITY']
      }
    });

    pin1Modal.onDidDismiss().then(async data1 => {
      console.log(data1);
      if (data1.data['pin']) {
        let pin2Modal = await this.modalCtrl.create({
          component: PinModalComponent,
          componentProps: {
            title: res['CONFIRM_SECURITY']
          }
        });
        pin2Modal.onDidDismiss().then(data2 => {
          if (data1.data['pin'] === data2.data['pin']) {
            this.wallet.generateWalletsFromMnemonic(this.mnemonic, data2.data['pin']);
            this.navCtrl.navigateRoot('/login');
            // Save PIN for further use
            this.pin.saveUserPinData(data2.data['pin'], this.mnemonic);
          } else {
            this.alertProvider.showPasswordDoNotMatch();
          }
        });
        pin2Modal.present();
      } else {
        this.alertProvider.showInvalidPasswordAlert();
      }
    });

    pin1Modal.present();
  }
}
