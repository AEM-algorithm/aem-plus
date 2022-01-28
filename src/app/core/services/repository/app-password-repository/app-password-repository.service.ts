import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { Mcrypto } from '@models/crypto/mcrypto';
import { AppPin } from '@app/shared/models/app-password';

@Injectable({
  providedIn: 'root',
})
export class AppPasswordRepositoryService {
  constructor(private storage: Storage) {}

  savePassword(password: AppPin, key: string): Promise<AppPin> {
    return this.storage.set(key, Base64.encode(JSON.stringify(password)));
  }

  getPassword(key: string): Promise<AppPin> {
    return this.storage.get(key).then((data) => {
      console.log('getPassword', data);
      return data !== undefined && data !== null
        ? JSON.parse(Base64.decode(data))
        : undefined;
    });
  }

  encryptionWithPrivateKey(passphrase: string, privateKey: string) {
    const mCrypto = new Mcrypto();
    privateKey = privateKey.substr(0, 64);
    const encrypted = mCrypto.encryptString(passphrase, privateKey);
    return encrypted.toString();
  }

  decrypWithPrivateKey(passphraseEncrypted: string, privateKey: string) {
    const mCrypto = new Mcrypto();
    privateKey = privateKey.substr(0, 64);
    return mCrypto.decryptString(passphraseEncrypted, privateKey);
  }
}
