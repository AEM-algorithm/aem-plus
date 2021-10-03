import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from 'bip39';
import createHash from 'create-hash';
import CryptoJS from 'crypto-js';

import { SimpleWallet } from 'nem-library';
// import { Address, NetworkType, SimpleWallet as SymbolSimpleWallet } from 'symbol-sdk';

import { NemProvider } from '../nem/nem.provider';
// import { SymbolProvider } from '../symbol/symbol.provider';
// import { BitcoinProvider, BitcoinWallet } from '../bitcoin/bitcoin.provider';
@Injectable({ providedIn: 'root' })
export class WalletProvider {
  constructor(private storage: Storage) { }

  /**
   * Check if mnemonic exists
   * @return Promise with stored wallet
   */
  public checkMnemonic(): Promise<boolean> {
    return this.storage.get('mnemonic').then(data => {
      console.log("check mnemonic", data);
      return !!data;
    });
  }

  /**
   * Return mnemonic by a given pin
   * @param pin
   */
  public getMnemonic(pin: string): Promise<string | null> {
    const pinHash = createHash('sha256').update(pin).digest('hex');

    return this.storage.get('mnemonic').then(encryptedMnemonic => {
      try {
        const decryptedEntropyMnemonic = WalletProvider.decrypt(encryptedMnemonic, pinHash);
        const mnemonic = entropyToMnemonic(decryptedEntropyMnemonic);
        if (validateMnemonic(mnemonic)) {
          return mnemonic;
        }
        return null;
      } catch (e) {
        return null;
      }
    });
  }

  /**
   * Set mnemonic
   * @return Promise with stored wallet
   */
  public generateWalletsFromMnemonic(mnemonic: any, pin: string) {
    const entropyMnemonic = mnemonicToEntropy(mnemonic);
    const pinHash = createHash('sha256').update(pin).digest('hex');

    // //Save nem wallet
    // const nemWallet = this.nem.createMnemonicWallet('nem', entropyMnemonic, pinHash);
    // this.storage.set('nemWallet', JSON.stringify(nemWallet.writeWLTFile()));

    // //Save symbol wallet
    // const symbolWallet = this.symbol.createMnemonicWallet('symbol', entropyMnemonic, pinHash);
    // this.storage.set('symbolWallet', JSON.stringify(symbolWallet));

    // //Save bitcoin wallet
    // const bitcoinWallet = this.bitcoin.createMnemonicWallet(entropyMnemonic, pinHash);
    // this.storage.set('bitcoinWallet', JSON.stringify(bitcoinWallet));

    //Save mnemonic
    const mnemonicEncrypted = WalletProvider.encrypt(entropyMnemonic, pinHash);
    this.storage.set('mnemonic', mnemonicEncrypted);
  }

  /**
   * Generate Nem Wallet by a given private key
   * @param privateKey
   * @param pin
   */
  // public generateNemWalletFromPrivateKey(privateKey, pin) {
  //   const pinHash = createHash('sha256').update(pin).digest('hex');
  //   const nemWallet = this.nem.createPrivateKeyWallet('nem', privateKey, pinHash);
  //   this.storage.set('nemWallet', JSON.stringify(nemWallet.writeWLTFile()));
  // }

  /**
   * Generate Symbol Wallet by a given private key
   * @param privateKey
   * @param pin
   */
  // public generateSymbolWalletFromPrivateKey(privateKey, pin) {
  //     const pinHash = createHash('sha256').update(pin).digest('hex');
  //     const bitcoinWallet = this.symbol.createPrivateKeyWallet('symbol', privateKey, pinHash);
  //     this.storage.set('symbolWallet', JSON.stringify(bitcoinWallet));
  // }

  /**
   * Generate Bitcoin Wallet by a given private key
   * @param privateKey
   * @param pin
   */
  // public generateBitcoinWalletFromPrivateKey(privateKey, pin) {
  //   const pinHash = createHash('sha256').update(pin).digest('hex');
  //   const bitcoinWallet = this.bitcoin.createPrivateKeyWallet(privateKey, pinHash);
  //   this.storage.set('bitcoinWallet', JSON.stringify(bitcoinWallet));
  // }

  /**
   * Removes all account data from storage
   */
  public async removeAccountData() {
    this.storage.remove('mnemonic');
    this.storage.remove('nemWallet');
    this.storage.remove('symbolWallet');
    this.storage.remove('bitcoinWallet');
  }

  /**
   * Transform pin to password
   * @param pin
   * @return string
   */
  public getPasswordHashFromPin(pin: string): string {
    return createHash('sha256').update(pin).digest('hex');
  }

  // /**
  //  * Retrieves selected wallet
  //  * @return promise with selected wallet
  //  */
  // public getNemWallet(): Promise<SimpleWallet | null> {
  //   return this.storage.get('nemWallet').then(data => {
  //     let result = null;
  //     if (data) {
  //       result = SimpleWallet.readFromWLT(JSON.parse(data));
  //     }
  //     return result;
  //   });
  // }

  // /**
  //  * Retrieves selected wallet
  //  * @return promise with selected wallet
  //  */
  // public getSymbolWallet(): Promise<SymbolSimpleWallet | null> {
  //   return this.storage.get('symbolWallet').then(data => {
  //     let result = null;
  //     if (data) {
  //       data = JSON.parse(data);
  //       result = new SymbolSimpleWallet(
  //         data.name,
  //         Address.createFromRawAddress(data.address.address),
  //         data.encryptedPrivateKey)
  //     }
  //     return result;
  //   });
  // }

  // /**
  //  * Retrieves selected wallet
  //  * @return promise with selected wallet
  //  */
  // public getBitcoinWallet(): Promise<BitcoinWallet | null> {
  //   return this.storage.get('bitcoinWallet').then(data => {
  //     if (data) {
  //       data = JSON.parse(data);
  //     }
  //     return data;
  //   });
  // }

  /**
   * Util to encrypt a string
   * @param message
   * @param password
   */
  public static encrypt(message: string, password: string) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 2048
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC

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
      iterations: 2048
    });

    return CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC

    }).toString(CryptoJS.enc.Utf8);
  }
}