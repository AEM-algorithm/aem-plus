import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { WalletProvider } from 'src/app/services/wallets/wallet.provider';
import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { PinProvider } from '@app/services/pin/pin.provider';

import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';

type PassphraseType = {
  value: string
  index: number,
};


@Component({
  selector: 'app-verify-create-account',
  templateUrl: './verify-create-account.page.html',
  styleUrls: ['./verify-create-account.page.scss'],
})
export class VerifyCreateAccountPage implements OnInit {
  mnemonic: string;
  passphrase: PassphraseType[];
  passphraseSelected: PassphraseType[] = [];
  isValidPassphraseWords: boolean = false;
  isValidPassphrase: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private storage: Storage,
    private wallet: WalletProvider,
    public alertProvider: AlertProvider,
    private translate: TranslateService,
    private pin: PinProvider,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mnemonic = params['mnemonic'];
      this.setMnemonic(mnemonic);
      this.setPassphrase(mnemonic);
    });
  }

  setMnemonic(mnemonic: string) {
    this.mnemonic = mnemonic;
    console.log(this.mnemonic);
  }

  setPassphrase(mnemonic: string) {
    const passphrase = this.getPassphraseWords(mnemonic);
    const sortPassPhrase = passphrase.sort((a, b) => a.localeCompare(b));
    this.passphrase = sortPassPhrase.map((value, index) => ({value, index}));
  }

  passphraseOnClick(selectedValue: PassphraseType) {
    this.passphraseSelected = [...this.passphraseSelected, selectedValue];
    this.passphrase = this.passphrase.filter((value) => value !== selectedValue);

    this.isValidPassphraseWords = this.checkIsValidPassphraseWords();
    this.isValidPassphrase = this.checkIsValidPassphrase();
  }

  passphraseSelectedOnClick(selectedValue: PassphraseType) {
    this.passphraseSelected = this.passphraseSelected.filter((value) => value !== selectedValue);
    this.passphrase = [...this.passphrase, selectedValue];
    this.passphrase = this.passphrase.sort((a, b) => a.index - b.index );

    this.isValidPassphraseWords = this.checkIsValidPassphraseWords();
    this.isValidPassphrase = this.checkIsValidPassphrase();
  }

  getPassphraseSelected() {
    const passphraseSelected = this.passphraseSelected.map((passphrase) => passphrase.value);
    return passphraseSelected.join(' ');
  }

  checkIsValidPassphrase(): boolean {
    return this.mnemonic !== this.getPassphraseSelected();
  }

  checkIsValidPassphraseWords(): boolean {
    const mnemonicWords = this.getPassphraseWords(this.mnemonic);
    if (this.passphraseSelected.length) {
      const passphraseIndex = this.passphraseSelected.length - 1;
      const mnemonicWordsAtIndex = mnemonicWords.filter((value, index) => index <= passphraseIndex);
      const mnemonicWordsSelected = this.passphraseSelected.map((passphrase) => passphrase.value);
      return  mnemonicWordsAtIndex.join(' ') === mnemonicWordsSelected.join(' ');
    }
    return false;
  }

  getPassphraseWords(mnemonic: string): string[] {
    return mnemonic.split(' ');
  }

  public async saveMnemonic() {
    const res = await this.translate.get(['CREATE_SECURITY', 'CONFIRM_SECURITY'], {}).toPromise();
    const pin1Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      cssClass: 'pinModal',
      componentProps: {
        title: res['CREATE_SECURITY']
      }
    });

    pin1Modal.onDidDismiss().then(async data1 => {
      console.log(data1);
      if (data1.data['pin']) {
        const pin2Modal = await this.modalCtrl.create({
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
