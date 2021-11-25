import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import * as CryptoJS from 'crypto-js';
import createHash from 'create-hash';
import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from 'bip39';

import { WalletProvider } from '../wallets/wallet.provider';
import { PinModalComponent } from 'src/app/pin-modal/pin-modal.component';
import { AppPin } from '@app/shared/models/app-password';
import { AlertProvider } from 'src/app/services/alert/alert.provider';
import { AppPasswordRepositoryService } from '@services/repository/app-password-repository/app-password-repository.service';
import { ToastProvider } from '@app/services/toast/toast.provider';

@Injectable({ providedIn: 'root' })
export class PinProvider {

  constructor(
    private modalCtrl: ModalController,
    private alertProvider: AlertProvider,
    private translate: TranslateService,
    private wallet: WalletProvider,
    private appPasswordRepository: AppPasswordRepositoryService,
    private storage: Storage,
    private toast: ToastProvider,
  ) {
  }

  public async showEnterPin(isVerifyBiometry = false, options?: { title: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_SECURITY'], {}).toPromise();
    const pinModal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title : res['ENTER_SECURITY'],
        isVerifyBiometry
      }
    });

    await pinModal.present();

    const data = await pinModal.onDidDismiss();
    return data.data ? data.data['pin'] : null;
  }
  public async showEnterPinAddAddress(options?: { title: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_SECURITY'], {}).toPromise();
    const pinModal = await this.modalCtrl.create({
      component: PinModalComponent,
      // cssClass: 'height-sixty-modal',
      componentProps: {
        title: options ? options.title : res['ENTER_SECURITY']
      }
    });

    await pinModal.present();

    const data = await pinModal.onDidDismiss();
    return data.data ? data.data['pin'] : null;
  }

  public async showDoublePinCheck(options?: { title1: string, title2: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_NEW_SECURITY', 'CONFIRM_NEW_SECURITY'], {}).toPromise();
    const pin1Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title1 : res['ENTER_NEW_SECURITY']
      }
    });

    pin1Modal.present();

    const data1 = await pin1Modal.onDidDismiss();

    if (!data1.data || !data1.data['pin']) {
      return null;
    }

    const pin2Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title2 : res['CONFIRM_NEW_SECURITY']
      }
    });

    pin2Modal.present();

    const data2 = await pin2Modal.onDidDismiss();
    if (!data2.data || !data2.data['pin']) {
      return null;
    }
    if (data1.data['pin'] !== data2.data['pin']) {
      this.alertProvider.showPasswordDoNotMatch();
      return null;
    }
    return data1.data['pin'];
  }

  public async changePin() {
    const pin = await this.showEnterPin();
    if (pin) {
      const mnemonics = await this.wallet.getMnemonics(pin);
      if (mnemonics) {
        const newPin = await this.showDoublePinCheck();
        if (newPin) {
          const mnemonicsDecrypted = mnemonics.map((mnemonic) => {
            const entropyMnemonic = mnemonicToEntropy(mnemonic);
            const newPinHash = createHash('sha256').update(newPin).digest('hex');
            const mnemonicEncrypted = WalletProvider.encrypt(entropyMnemonic, newPinHash);
            return mnemonicEncrypted;
          });
          await this.storage.set('mnemonics', mnemonicsDecrypted);
          this.toast.showChangePinSuccess();
        }
      } else {
        this.alertProvider.showIncorrectPassword();
      }
    }
  }

  public async saveUserPinData(pin: string, mnemonic: string) {
    const appPassword: AppPin = this.createAppPasswordModel(pin, mnemonic);
    await this.saveAppPasswordModel(appPassword);
  }

  private createAppPasswordModel(pin: string, mnemonic: string): AppPin {
    const encryptedPin: string = PinProvider.encrypt(pin, mnemonic);
    return new AppPin(encryptedPin);
  }

  private saveAppPasswordModel(appPassword: AppPin) {
    return this.appPasswordRepository.savePassword(appPassword, 'pin');
  }

  public async checkMnemonic(verifingMnemonic: string): Promise<boolean> {
    const savedHashPin: AppPin = await this.appPasswordRepository.getPassword('pin');
    const decryptPin: string = PinProvider.decrypt(savedHashPin.encryptedPin, verifingMnemonic);
    return !!this.wallet.getMnemonics(decryptPin);
  }

  /**
   * Util to encrypt a string
   * @param message
   * @param password
   */
  public static encrypt(message: string, password: string) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 2048,
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return salt.toString() + iv.toString() + encrypted.toString();
  }

  /**
   * Util to decrypt a string
   * @param encryptedMessage
   * @param password
   */
  public static decrypt(encryptedMessage: string, password: string) {
    const salt = CryptoJS.enc.Hex.parse(encryptedMessage.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(encryptedMessage.substr(32, 32));
    const encrypted = encryptedMessage.substring(64);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 2048,
    });

    return CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8);
  }
}
