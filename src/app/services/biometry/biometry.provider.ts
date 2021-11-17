import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { Storage } from '@ionic/storage';

import { ToastProvider } from '@app/services/toast/toast.provider';
import { PinProvider } from '@app/services/pin/pin.provider';
import { AlertProvider } from '@app/services/alert/alert.provider';
import { WalletProvider } from '@app/services/wallets/wallet.provider';

@Injectable({ providedIn: 'root' })
export class BiometryProvider {

  constructor(
    private platform: Platform,
    private touchID: TouchID,
    private toast: ToastProvider,
    private storage: Storage,
    private pin: PinProvider,
    private alertProvider: AlertProvider,
    public wallet: WalletProvider,
  ) {}

  public async getBiometryType(): Promise<string | null> {
    const biometryType = await this.biometryAvailable();
    if (biometryType) {
      return  biometryType[0].toUpperCase() + biometryType.slice(1);
    }
    return null;
  }

  public async checkEnableBiometry(isToggle: boolean): Promise<boolean> {
    if (isToggle === true) {
      // CHECK PIN.
      const isValidPin = await this.checkValidPin();
      if (isValidPin) {

        // CHECK BIOMETRY IS AVAILABLE.
        const isBiometryAvailable = await this.isBiometryAvailable();
        if (isBiometryAvailable) {

          // CHECK VERIFY IS VALID.
          return await this.verifyFingerprint();
        }
        return false;
      }
      return false;
    }
    return false;
  }

  public async setIsEnableBiometry(isEnable: boolean): Promise<any> {
    return await this.storage.set('enableBiometry', isEnable);
  }

  public async getIsEnableBiometry(): Promise<boolean> {
    const isEnableBiometry = await this.storage.get('enableBiometry');
    if (isEnableBiometry) {
      return true;
    }
    return false;
  }

  public async verifyFingerprint(msg?: string): Promise<boolean>  {
    if (this.isSupportPlatform()) {
      const available = await this.isBiometryAvailable();
      if (available) {
        try {
          await this.touchID.verifyFingerprint(msg || '');
          return true;
        }catch (e) {
          this.toast.showCatchError(e.localizedDescription);
        }
      }
    } else {
      this.toast.showCatchError('platform is not supported');
    }
    return false;
  }

  private async isBiometryAvailable() {
    const biometryType = await this.biometryAvailable(true);
    if (biometryType) {
      return true;
    }
    return false;
  }

  public async biometryAvailable(isShowError = false): Promise<'face' | 'touch' | null> {
    if (this.isSupportPlatform()) {
      let available;
      try {
        available = await this.touchID.isAvailable();
        return available;
      }catch (e) {
        if (isShowError) {
          this.toast.showCatchError(e.localizedDescription);
        }
      }
    } else {
      if (isShowError) {
        this.toast.showCatchError('platform is not supported');
      }
    }
    return null;
  }

  public isSupportPlatform(): boolean {
    return this.platform.is('cordova');
  }

  private async checkValidPin() {
    const pin = await this.pin.showEnterPin();
    if (pin) {
      const valid = await this.wallet.isValidPin(pin);
      if (valid) {
        return true;
      }
      this.alertProvider.showInvalidPasswordAlert();
      return false;
    }
    return false;
  }
}
