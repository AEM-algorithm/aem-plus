import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
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
    private fingerprintAIO: FingerprintAIO,
    private toast: ToastProvider,
    private storage: Storage,
    private pin: PinProvider,
    private alertProvider: AlertProvider,
    public wallet: WalletProvider,
  ) {}

  public async getBiometryType(isShowError = true): Promise<string | null> {
    const biometryType = await this.biometryAvailable(isShowError);
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

  public async verifyFingerprint(msg?: string, isShowError = true): Promise<boolean>  {
    if (this.isSupportPlatform()) {
      const available = await this.isBiometryAvailable(isShowError);
      if (available) {

        // support for ios platform
        if (this.platform.is('ios')) {
          try {
            await this.touchID.verifyFingerprint(msg || '');
            return true;
          }catch (e) {
            if (isShowError) {
              if (e?.code !== -128) {
                this.toast.showCatchError(e.localizedDescription || e);
              }
            }
          }
        }

        // support for android platform
        if (this.platform.is('android')) {
          try {
            await this.fingerprintAIO.show({});
            return true;
          }catch (e) {
            if (isShowError) {
              if (e.code !== this.fingerprintAIO.BIOMETRIC_DISMISSED){
                this.toast.showCatchError(e.message || e);
              }
            }
          }
        }
      }
    } else {
      if (isShowError) {
        this.toast.showCatchError('platform not supported');
      }
    }
    return false;
  }

  private async isBiometryAvailable(isShowError = true) {
    const biometryType = await this.biometryAvailable(isShowError);
    if (biometryType) {
      return true;
    }
    return false;
  }

  public async biometryAvailable(isShowError = false): Promise<'face' | 'touch' | 'fingerprint' | null> {
    if (this.isSupportPlatform()) {
      let available;
      // support for ios platform
      if (this.platform.is('ios')) {
        try {
          available = await this.touchID.isAvailable();
          return available;
        }catch (e) {
          if (isShowError) {
            this.toast.showCatchError(e.localizedDescription || e);
          }
        }
      }
      // support for android platform
      if (this.platform.is('android')) {
        try {
          available = await this.fingerprintAIO.isAvailable();
          if (available) {
            return 'fingerprint';
          }
        } catch (e) {
          if (isShowError) {
            if (e.code === this.fingerprintAIO.BIOMETRIC_NOT_ENROLLED) {
              this.toast.showCatchError('Biometric not enrolled');
            } else {
              this.toast.showCatchError(e);
            }
          }
        }
      }
    } else {
      if (isShowError) {
        this.toast.showCatchError('platform not supported');
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
