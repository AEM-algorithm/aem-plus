import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from "bip39";
import createHash from "create-hash";
import CryptoJS from "crypto-js";

import { Address, SimpleWallet, Wallet } from "nem-library";
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
import { CryptoProvider } from '../crypto/crypto.provider';

@Injectable({ providedIn: "root" })
export class WalletProvider {
  constructor(
    private storage: Storage,
    private nem: NemProvider,
    private symbol: SymbolProvider,
    private bitcoin: BitcoinProvider,
    private wallets: WalletsService,
    private cryptoProvider: CryptoProvider,
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
    * Check if mnemonic is correct with the saved one
    * @param mnemonic
    */
  public async isCorrectMnemonic(mnemonic: string): Promise<boolean> {
    const nemWallet = this.nem.createMnemonicWallet('nem', mnemonic, '');
    const savedNemWallets: NemWallet[] = await this.getWallets(Coin.NEM) || [];
    if (nemWallet.address.plain() === savedNemWallets[0].walletAddress) {
      return true;
    }
    const symbolWallet = this.symbol.createMnemonicWallet('symbol', mnemonic, '');
    const savedSymbolWallets: SymbolWallet[] = await this.getWallets(Coin.SYMBOL) || [];
    if (symbolWallet.address.plain() === savedSymbolWallets[0].walletAddress) {
      return true;
    }
    const bitcoinWallet = this.bitcoin.createMnemonicWallet(mnemonic, '');
    const savedBitcoinWallets: BitcoinWallet = await this.getWallets(Coin.BITCOIN) || [];
    if (bitcoinWallet.address === savedBitcoinWallets[0].walletAddress) {
      return true;
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
    if (!pin) return null;
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
   */
  public generateNemWalletFromPrivateKey(privateKey, pin) {
    this.addWallet(false, privateKey, pin, Coin.NEM);
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
    this.storage.remove("NEMWallets");
    this.storage.remove("XYMWallets");
    this.storage.remove("BTCWallets");
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
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with NEM wallet
   */
  public async getNemWallets(isCheckOnly: boolean = false): Promise<NemWallet[] | null> {

    const nemWallets = await this.getWallets(Coin.NEM);
    if (isCheckOnly) return nemWallets;
    const xemWallets = [];

    if (nemWallets && nemWallets.length > 0) {
      for (const wallet of nemWallets) {
        await this.nem.setNodeNEMWallet(wallet.walletId);
        const XEMBalance = await this.nem.getXEMBalance(wallet.walletAddress);
        const exchangeRate = await this.cryptoProvider.getExchangeRate('XEM', 'AUD');
        const AUD = this.cryptoProvider.round(XEMBalance * exchangeRate);
        wallet.walletBalance = [AUD, XEMBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = this.nem.prettyAddress(wallet.walletAddress);
        xemWallets.push(wallet);
      }
    }
    return xemWallets;
  }

  /**
   * Retrieves Symbol wallet
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with selected wallet
   */
  public async getSymbolWallets(isCheckOnly: boolean = false): Promise<SymbolWallet[] | null> {
    const symbolWallets = await this.getWallets(Coin.SYMBOL);
    if (isCheckOnly) return symbolWallets;
    const xymWallets = [];

    if (symbolWallets && symbolWallets.length > 0) {
      for (const wallet of symbolWallets) {
        await this.symbol.setNodeSymbolWallet(wallet.walletId);
        const XYMBalance = await this.symbol.getXYMBalance(wallet.walletAddress);
        const exchangeRate = await this.cryptoProvider.getExchangeRate('XYM', 'AUD');
        const AUD = this.cryptoProvider.round(XYMBalance * exchangeRate);
        wallet.walletBalance = [AUD, XYMBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = this.symbol.prettyAddress(wallet.walletAddress);
        xymWallets.push(wallet);
      }
    }
    return xymWallets;
  }

  /**
   * Retrieves Bitcoin wallet
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with Bitcoin wallets
   */
  public async getBitcoinWallets(isCheckOnly: boolean = false): Promise<BitcoinWallet[] | null> {
    const bitcoinWallets = await this.getWallets(Coin.BITCOIN);
    if (isCheckOnly) return bitcoinWallets;
    const btcWallets = [];

    if (bitcoinWallets && bitcoinWallets.length > 0) {
      for (const wallet of bitcoinWallets) {
        const network = this.bitcoin.getNetwork(wallet.walletAddress);
        const BTCBalance = await this.bitcoin.getBTCBalance(wallet.walletAddress, network);
        const exchangeRate = await this.cryptoProvider.getExchangeRate('BTC', 'AUD');
        const AUD = this.cryptoProvider.round(BTCBalance * exchangeRate);
        wallet.walletBalance = [AUD, BTCBalance];
        wallet.exchangeRate = exchangeRate;
        btcWallets.push(wallet);
      }
    }
    return btcWallets;
  }

  /**
   * Get wallets
  */
  private getWallets(coin: Coin): Promise<any> {
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
  }

  /**
   * Update saved NEM wallet
   */
  public async updateNemWallet(wallet: NemWallet) {
    const savedWallets = this.getNemWallets();
    (await savedWallets).map((savedWallet) => savedWallet.walletAddress === wallet.walletAddress ? wallet : savedWallet);
  }

  /**
   * Update saved Symbol wallet
   */
  public async updateSymbolWallet(wallet: SymbolWallet) {
    const savedWallets = this.getSymbolWallets();
    (await savedWallets).map((savedWallet) => savedWallet.walletAddress === wallet.walletAddress ? wallet : savedWallet);
  }

  /**
   * Update saved NEM wallet
   */
  public async updateBitcoinWallet(wallet: BitcoinWallet) {
    const savedWallets = this.getBitcoinWallets();
    (await savedWallets).map((savedWallet) => savedWallet.walletAddress === wallet.walletAddress ? wallet : savedWallet);
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

 public getWalletBalance(wallets) {
    try {
      const reducer = (previousValue, currentValue) => this.parseWalletBalance(this.parseNumber(previousValue)) +  this.parseWalletBalance(this.parseNumber(currentValue));
      return this.cryptoProvider.round(wallets.reduce(reducer));
    }catch (e) {
      console.log('wallet.provider', 'getWalletBalance', 'error', e);
      return 0;
    }
  }

  parseWalletBalance = (value) => typeof value === 'object' ? value.walletBalance[0] : value;

  parseNumber = (value) => typeof value === 'string' ? parseInt(value) : value;

}
