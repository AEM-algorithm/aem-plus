import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from 'bip39';
import createHash from 'create-hash';
import CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class WalletProvider {
    constructor(private storage: Storage) { }

    /**
     * Check if mnemonic exists
     * @return Promise with stored wallet
     */
     public checkMnemonic(): Promise<boolean> {
        return this.storage.get('mnemonic').then(data => {
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

        // //Save catapult wallet
        // const catapultWallet = this.catapult.createMnemonicWallet('catapult', entropyMnemonic, pinHash);
        // this.storage.set('catapultWallet', JSON.stringify(catapultWallet));

        // //Save bitcoin wallet
        // const bitcoinWallet = this.bitcoin.createMnemonicWallet(entropyMnemonic, pinHash);
        // this.storage.set('bitcoinWallet', JSON.stringify(bitcoinWallet));

        //Save mnemonic
        const mnemonicEncrypted = WalletProvider.encrypt(entropyMnemonic, pinHash);
        this.storage.set('mnemonic', mnemonicEncrypted);
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