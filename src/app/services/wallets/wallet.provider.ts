import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from "bip39";
import createHash from "create-hash";
import CryptoJS from "crypto-js";

import { SimpleWallet, Wallet } from "nem-library";
import {
  Address as SymbolAddress,
  NetworkType,
  SimpleWallet as SymbolSimpleWallet,
} from "symbol-sdk";

import { NemProvider } from "../nem/nem.provider";
import { SymbolProvider } from "../symbol/symbol.provider";
import { BitcoinProvider, BitcoinSimpleWallet } from "../bitcoin/bitcoin.provider";
import { WalletsService } from "./wallets.service";
import { NemWallet, SymbolWallet, BitcoinWallet } from "../models/wallet.model";
import { Coin } from "src/app/enums/enums";
import { Token } from "../models/token.model";
import { Transaction } from "../models/transaction.model";

@Injectable({ providedIn: "root" })
export class WalletProvider {
  constructor(
    private storage: Storage,
    private nem: NemProvider,
    private symbol: SymbolProvider,
    private bitcoin: BitcoinProvider,
    private wallets: WalletsService
  ) { }

  /**
   * Check if pin is valid TODO: Substitute it with a hash of the hash of the pin or slt
   * @param pin
   */
  public async isValidPin(pin: string) {
    const mnemonic = await this.getMnemonic(pin);
    if (mnemonic) return true;

    const pinHash = createHash("sha256").update(pin).digest("hex");

    const nemWallets = await this.getNemWallets();
    if (nemWallets) {
      try {
        await this.nem.passwordToPrivateKey(pinHash, nemWallets[0].simpleWallet);
        return true;
      } catch (e) { }
    }

    const symbolWallets = await this.getSymbolWallets();
    if (symbolWallets) {
      try {
        await this.symbol.passwordToPrivateKey(pinHash, symbolWallets[0].simpleWallet);
        return true;
      } catch (e) { }
    }

    const bitcoinWallet = await this.getBitcoinWallets();
    if (bitcoinWallet) {
      try {
        await this.bitcoin.passwordToPrivateKey(pinHash, bitcoinWallet[0].simpleWallet);
        return true;
      } catch (e) { }
    }

    return false;
  }

  /**
   * Check if mnemonic exists
   * @return Promise with stored wallet
   */
  public checkMnemonic(): Promise<boolean> {
    return this.storage.get("mnemonics").then((data) => {
      return !!data;
    });
  }

  /**
   * Return mnemonic by a given pin
   * @param pin
   */
  public getMnemonic(pin: string): Promise<string | null> {
    const pinHash = createHash("sha256").update(pin).digest("hex");

    return this.storage.get("mnemonics").then((encryptedMnemonic) => {
      try {
        const decryptedEntropyMnemonic = WalletProvider.decrypt(
          encryptedMnemonic[0],
          pinHash
        );
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
  public async generateWalletsFromMnemonic(mnemonic: any, pin: string) {
    const entropyMnemonic = mnemonicToEntropy(mnemonic);
    const pinHash = createHash("sha256").update(pin).digest("hex");

    //Save nem wallet
    this.addWallet(true, entropyMnemonic, pinHash, Coin.NEM);

    //Save symbol wallet
    this.addWallet(true, mnemonic, pinHash, Coin.SYMBOL);

    //Save bitcoin wallet
    this.addWallet(true, entropyMnemonic, pinHash, Coin.BITCOIN);

    //Save mnemonic
    const mnemonicEncrypted = WalletProvider.encrypt(entropyMnemonic, pinHash);
    let savedEncryptedMnemonic = await this.storage.get("mnemonics") || [];
    savedEncryptedMnemonic.push(mnemonicEncrypted);
    this.storage.set("mnemonics", savedEncryptedMnemonic);
  }

  /**
   * Generate Nem Wallet by a given private key
   * @param privateKey
   * @param pin
   * @param coin
   * @param isMultisig
   * @param walletName
   */
  public async generateWalletFromPrivateKey(
    privateKey,
    pin,
    coin: Coin,
    walletName: string = `Default ${coin} Wallet `,
    isMultisig: boolean = false,
  ) {
    try {
      return await this.addWallet(false, privateKey, pin, coin, walletName, isMultisig);
    } catch (error) {
      return false
    }

  }

  /**
   * Generate Symbol Wallet by a given private key
   * @param privateKey
   * @param pin
   */
  public generateSymbolWalletFromPrivateKey(privateKey, pin) {
    this.addWallet(false, privateKey, pin, Coin.SYMBOL);
  }

  /**
   * Generate Bitcoin Wallet by a given private key
   * @param privateKey
   * @param pin
   */
  public generateBitcoinWalletFromPrivateKey(privateKey, pin) {
    this.addWallet(false, privateKey, pin, Coin.BITCOIN);
  }

  /**
   * Removes all account data from storage
   */
  public async removeAccountData() {
    this.storage.remove("mnemonics");
    this.storage.remove("nemWallets");
    this.storage.remove("symbolWallets");
    this.storage.remove("bitcoinWallets");
  }

  /**
   * Transform pin to password
   * @param pin
   * @return string
   */
  public getPasswordHashFromPin(pin: string): string {
    return createHash("sha256").update(pin).digest("hex");
  }

  /**
   * Retrieves all wallets
   * @return promise with selected wallet
   */
  public async getAllWallets() {
    const nemWallets = await this.getNemWallets();
    const symbolWallets = await this.getSymbolWallets();
    const bitcoinWallets = await this.getBitcoinWallets();
    return [...nemWallets, ...symbolWallets, ...bitcoinWallets];
  }

  public async getWalletByWalletId(walletId): Promise<any> {
    const wallets = await this.getAllWallets();
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  /**
   * Retrieves NEM wallets
   * @return promise with NEM wallet
   */
  public getNemWallets(): Promise<NemWallet[] | null> {
    return this.getWallet(Coin.NEM);
  }

  /**
   * Retrieves Symbol wallet
   * @return promise with selected wallet
   */
  public async getSymbolWallets(): Promise<SymbolWallet[] | null> {
    const symbolWallets = await this.getWallet(Coin.SYMBOL);
    const xymWallets = [];

    if (symbolWallets && symbolWallets.length > 0) {
      for (const wallet of symbolWallets) {
        const XYMBalance = await this.symbol.getXYMBalance(wallet.walletAddress);

        // TODO: XYM -> AUD
        const AUD = 0;
        wallet.walletBalance = [AUD, XYMBalance];

        xymWallets.push(wallet);
      }
    }
    return xymWallets;
  }

  /**
   * Retrieves selected wallet
   * @return promise with selected wallet
   */
  public getBitcoinWallets(): Promise<BitcoinWallet[] | null> {
    return this.getWallet(Coin.BITCOIN);
  }

  /**
   * Get wallets
  */
  private getWallet(coin: Coin): Promise<any> {
    return this.storage.get(`${coin}Wallets`).then();
  }

  /**
   * Add wallet from mnemonic to storage
   */
  private async addWallet(
    isUseMnemonic: boolean,
    entropyMnemonicKey: string,
    pin: string,
    coin: Coin,
    walletName: string = `Default ${coin} Wallet `,
    isMultisig: boolean = false,
    walletBalance: [number, number] = [0, 0],
    tokens: Token[] = [],
    transaction: Transaction[] = [],
  ) {
    try {
      const pinHash = createHash("sha256").update(pin).digest("hex");
      let savedWallets = await this.storage.get(`${coin}Wallets`) || [];
      const walletIndex = savedWallets.length;
      switch (coin) {
        case Coin.NEM:
          const nemWallet = isUseMnemonic ?
            this.nem.createMnemonicWallet(coin, entropyMnemonicKey, pinHash) : this.nem.createPrivateKeyWallet(coin, entropyMnemonicKey, pinHash);
          const newNemWallet = new NemWallet(
            `${coin}_${walletIndex}`,
            "",
            walletName + walletIndex,
            coin,
            nemWallet.address.plain(),
            walletBalance,
            isMultisig,
            tokens,
            JSON.stringify(nemWallet.encryptedPrivateKey),
            isUseMnemonic ? JSON.stringify(entropyMnemonicKey) : "",
            transaction,
            nemWallet
          );
          savedWallets.push(newNemWallet);
          break;
        case Coin.SYMBOL:
          const entropyMnemonic = mnemonicToEntropy(entropyMnemonicKey);
          const symbolWallet = isUseMnemonic ?
            this.symbol.createMnemonicWallet(coin, entropyMnemonicKey, pinHash) : this.symbol.createPrivateKeyWallet(coin, entropyMnemonicKey, pinHash);
          const newSymbolWallet = new SymbolWallet(
            `${coin}_${walletIndex}`,
            "",
            walletName + walletIndex,
            coin,
            symbolWallet.address.plain(),
            walletBalance,
            isMultisig,
            tokens,
            JSON.stringify(symbolWallet.encryptedPrivateKey),
            isUseMnemonic ? JSON.stringify(entropyMnemonic) : "",
            transaction,
            symbolWallet
          );
          savedWallets.push(newSymbolWallet);
          break;
        case Coin.BITCOIN:
          const bitcoinWallet = isUseMnemonic ?
            this.bitcoin.createMnemonicWallet(entropyMnemonicKey, pinHash) : this.bitcoin.createPrivateKeyWallet(entropyMnemonicKey, pinHash);
          const newBitcoinWallet = new BitcoinWallet(
            `${coin}_${walletIndex}`,
            "",
            walletName + walletIndex,
            coin,
            bitcoinWallet.address,
            walletBalance,
            isMultisig,
            tokens,
            JSON.stringify(bitcoinWallet.encryptedWIF),
            isUseMnemonic ? JSON.stringify(entropyMnemonicKey) : "",
            transaction,
            bitcoinWallet
          );
          savedWallets.push(newBitcoinWallet);
          break;
        default:
      };
      this.storage.set(`${coin}Wallets`, savedWallets);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Update saved NEM wallet
   */
  public async updateWallet(wallet: any, coin: Coin): Promise<boolean> {
    const savedWallets = this.getWallet(coin);
    try {
      (await savedWallets).map((savedWallet) => savedWallet.walletAddress === wallet.walletAddress ? wallet : savedWallet);
      return true;
    } catch {
      return false;
    }
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
