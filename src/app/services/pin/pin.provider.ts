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
import { BitcoinProvider, BitcoinSimpleWallet } from '../bitcoin/bitcoin.provider';
import { AppPasswordRepositoryService } from '@services/repository/app-password-repository/app-password-repository.service';
import { ToastProvider } from '@app/services/toast/toast.provider';
import {BitcoinWallet, NemWallet, SymbolWallet } from '../models/wallet.model';
import { SimpleWallet as NemSimpleWallet, Password as NemPassword } from 'nem-library';
import { SimpleWallet as  SymbolSimpleWallet, Password as SymbolPassword } from 'symbol-sdk';
import { NemProvider } from '../nem/nem.provider';
import { SymbolProvider } from '../symbol/symbol.provider';

import * as wif from 'wif';
@Injectable({ providedIn: 'root' })
export class PinProvider {
  wif;

  constructor(
    private nem: NemProvider,
    private symbol: SymbolProvider,
    private bitcoin: BitcoinProvider,
    private modalCtrl: ModalController,
    private alertProvider: AlertProvider,
    private translate: TranslateService,
    private wallet: WalletProvider,
    private appPasswordRepository: AppPasswordRepositoryService,
    private storage: Storage,
    private toast: ToastProvider,
  ) {
    this.wif = wif;
  }

  public async showEnterPin(isVerifyBiometry = false, isShowForgotPin = true, options?: { title: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_SECURITY'], {}).toPromise();
    const pinModal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title : res['ENTER_SECURITY'],
        isVerifyBiometry,
        isShowForgotPin
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

  public async showDoublePinCheck(isShowForgotPin = true, options?: { title1: string, title2: string }): Promise<string | null> {
    const res = await this.translate.get(['ENTER_NEW_SECURITY', 'CONFIRM_NEW_SECURITY'], {}).toPromise();
    const pin1Modal = await this.modalCtrl.create({
      component: PinModalComponent,
      componentProps: {
        title: options ? options.title1 : res['ENTER_NEW_SECURITY'],
        isShowForgotPin: isShowForgotPin,
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
          const nemWallets = await this.wallet.getNemWallets(true);
          const symbolWallets = await this.wallet.getSymbolWallets(true);
          const bitcoinWallets = await this.wallet.getBitcoinWallets(true);
          const pinHash = createHash('sha256').update(pin).digest('hex');
          const newPinHash = createHash('sha256').update(newPin).digest('hex');
          const newEncryptedMnemonics = this.newPinMnemmonics(mnemonics, newPinHash);
          const newPinNemWallets = this.newPinNemWallets(nemWallets, newPinHash, pinHash);
          const newPinSymbolWallets = this.newPinSymbolWallets(symbolWallets, newPinHash, pinHash);
          const newPinBitcoinWallets = this.newPinBitcoinWallets(bitcoinWallets, newPinHash, pinHash);
          try {
            await this.saveUserPinData(newPin, mnemonics[0]);
            await this.storage.set('mnemonics', newEncryptedMnemonics);
            await this.storage.set("XEMWallets", newPinNemWallets);
            await this.storage.set("XYMWallets", newPinSymbolWallets);
            await this.storage.set("BTCWallets", newPinBitcoinWallets);
            this.toast.showChangePinSuccess();
          } catch (e) {
            // TODO: Reset to unchange value
            this.toast.showChangePinFailed();
          }
        }
      } else {
        this.alertProvider.showIncorrectPassword();
      }
    }
  }

  private newPinMnemmonics(mnemonics: string[], newPassword: string, oldPassword?: string) {
    return mnemonics.map((mnemonic) => {
      const decryptedMnemonic = oldPassword ? WalletProvider.decrypt(mnemonic, oldPassword) : mnemonic;
      const entropyMnemonic = oldPassword ? decryptedMnemonic : mnemonicToEntropy(decryptedMnemonic);
      const mnemonicEncrypted = WalletProvider.encrypt(entropyMnemonic, newPassword);
      return mnemonicEncrypted;
    });
  }

  private newPinNemWallets(nemWallets: NemWallet[], newPassword: string, oldPassword: string) {
    return nemWallets.map((nemWallet) => {
      if (nemWallet.mnemonic) {
        nemWallet.mnemonic = this.newPinMnemmonics([nemWallet.mnemonic], newPassword, oldPassword)[0];
      }
      const nemSimpleWallet = NemSimpleWallet.readFromWLT(nemWallet.simpleWallet);
      const password = new NemPassword(oldPassword);
      const nemPrivateKey = nemSimpleWallet.unlockPrivateKey(password);
      const newNemSimpleWallet = this.nem.createPrivateKeyWallet('nemWallet', nemPrivateKey, newPassword)
      nemWallet.simpleWallet = newNemSimpleWallet.writeWLTFile();
      nemWallet.privateKey = JSON.stringify(newNemSimpleWallet.encryptedPrivateKey);
      return nemWallet;
    });
  }

  private newPinSymbolWallets(symbolWallets: SymbolWallet[], password: string, oldPassword: string) {
    return symbolWallets.map((symbolWallet) => {
      if (symbolWallet.mnemonic) {
        symbolWallet.mnemonic = this.newPinMnemmonics([symbolWallet.mnemonic], password, oldPassword)[0].toString();
      }
      const symbolSimpleWallet = SymbolSimpleWallet.createFromDTO(symbolWallet.simpleWallet);
      const symbolPassword = new SymbolPassword(oldPassword);
      const symbolPrivateKey = symbolSimpleWallet.open(symbolPassword).privateKey;
      const newSymbolSimpleWallet = this.symbol.createPrivateKeyWallet('symbolWallet', symbolPrivateKey, password);
      symbolWallet.simpleWallet = newSymbolSimpleWallet.toDTO();
      symbolWallet.privateKey = newSymbolSimpleWallet.encryptedPrivateKey;
      return symbolWallet;
    });
  }

  private newPinBitcoinWallets(bitcoinWallets: BitcoinWallet[], password: string, oldPassword: string) {
    return bitcoinWallets.map((bitcoinWallet) => {
      if (bitcoinWallet.mnemonic) {
        bitcoinWallet.mnemonic = this.newPinMnemmonics([bitcoinWallet.mnemonic], password, oldPassword)[0].toString();
      }
      const WIFWalletHex = this.bitcoin.passwordToPrivateKeyHex(oldPassword, bitcoinWallet.simpleWallet);
      const privateKeyArray = this.wif.decode(WIFWalletHex).privateKey;
      const bitcoinPrivateKey = this.toHexString(privateKeyArray).toUpperCase();
      const newBitcoinSimpleWallet = this.bitcoin.createPrivateKeyWallet(bitcoinPrivateKey, password, false);
      bitcoinWallet.simpleWallet = newBitcoinSimpleWallet;
      bitcoinWallet.privateKey = newBitcoinSimpleWallet.encryptedWIF;
      return bitcoinWallet;
    })
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

  private toHexString(byteArray: number[]) {
    return byteArray.reduce((output, elem) =>
      (output + ('0' + elem.toString(16)).slice(-2)),
      '');
  }
}
