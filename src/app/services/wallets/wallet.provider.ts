import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from "bip39";
import createHash from "create-hash";
import CryptoJS from "crypto-js";
import * as wif from 'wif';

import { NemProvider } from "../nem/nem.provider";
import { SymbolProvider } from "../symbol/symbol.provider";
import { BitcoinProvider, BitcoinSimpleWallet } from "../bitcoin/bitcoin.provider";
import { WalletsService } from "./wallets.service";
import { NemWallet, SymbolWallet, BitcoinWallet } from "../models/wallet.model";
import { Coin, WalletDataType } from "src/app/enums/enums";
import { Token } from "../models/token.model";
import { Transaction } from "../models/transaction.model";
import { CryptoProvider } from '../crypto/crypto.provider';

import { Wallet } from "src/app/services/models/wallet.model"
import { SimpleWallet as NemSimpleWallet } from 'nem-library';
import { SimpleWallet as SymbolSimpleWallet } from "symbol-sdk";
@Injectable({ providedIn: "root" })
export class WalletProvider {

  private allWallet: any[];

  wif;
  constructor(
    private storage: Storage,
    private nem: NemProvider,
    private symbol: SymbolProvider,
    private bitcoin: BitcoinProvider,
    private wallets: WalletsService,
    private cryptoProvider: CryptoProvider,
  ) {
    this.wif = wif;
  }

  public setAllWallet(allWallet: any[]) {
    this.allWallet = allWallet;
  }

  public async getAllWallets() {
    if (this.allWallet) {
      return this.allWallet;
    }
    const allWallet = await this.getAllWalletsData();
    this.setAllWallet(allWallet);
    return this.allWallet;
  }

  /**
   * Check if pin is valid TODO: Substitute it with a hash of the hash of the pin or slt
   * @param pin
   */
  public async isValidPin(pin: string) {
    const mnemonic = await this.getMnemonic(pin);
    if (mnemonic) return true;

    const pinHash = createHash("sha256").update(pin).digest("hex");

    const nemWallets = await this.getNemWallets(true);
    if (nemWallets) {
      try {
        const nemSimpleWallet = NemSimpleWallet.readFromWLT(nemWallets[0].simpleWallet)
        this.nem.passwordToPrivateKey(pinHash, nemSimpleWallet);
        return true;
      } catch (e) { }
    }

    const symbolWallets = await this.getSymbolWallets(true);
    if (symbolWallets) {
      try {
        const symbolSimpleWallet = SymbolSimpleWallet.createFromDTO(symbolWallets[0].simpleWallet)
        this.symbol.passwordToPrivateKey(pinHash, symbolSimpleWallet);
        return true;
      } catch (e) { }
    }

    const bitcoinWallet = await this.getBitcoinWallets(true);
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
   * Return decrypted data of given wallet
   * @param wallet
   * @param pin
   * @param getData
   */
  public decryptWallet(wallet: any, pin: string, getData: WalletDataType): Promise<Wallet | null> {
    if (!pin) return null;
    const pinHash = createHash("sha256").update(pin).digest("hex");

    switch (getData) {
      case WalletDataType.MNEMONIC:
        if (!validateMnemonic(wallet.mnemonic)) {
          try {
            const decryptedEntropyMnemonic = WalletProvider.decrypt(wallet.mnemonic, pinHash);
            const mnemonic = entropyToMnemonic(decryptedEntropyMnemonic);
            if (validateMnemonic(mnemonic)) {
              wallet.mnemonic = mnemonic.split(" ");
              return wallet;
            } else return null;
          } catch (e) {
            console.log(e);
            return null;
          }
        }
        break;
      case WalletDataType.PRIVATE_KEY:
        if (wallet.privateKey.length !== 64) {
          let validPin = false;
          switch (wallet.walletType) {
            case Coin.NEM:
              try {
                const nemSimpleWallet = NemSimpleWallet.readFromWLT(wallet.simpleWallet);
                wallet.privateKey = this.nem.passwordToPrivateKey(pinHash, nemSimpleWallet);
                validPin = true;
              } catch (e) {
                console.log(e);
              }
              break;
            case Coin.SYMBOL:
              try {
                const symbolSimpleWallet = SymbolSimpleWallet.createFromDTO(wallet.simpleWallet);
                wallet.privateKey = this.symbol.passwordToPrivateKey(pinHash, symbolSimpleWallet);
                validPin = true;
              } catch (e) {
                console.log(e);
              }
              break;
            case Coin.BITCOIN:
              try {
                const WIFWalletHex = this.bitcoin.passwordToPrivateKeyHex(pinHash, wallet.simpleWallet);
                const privateKeyArray = this.wif.decode(WIFWalletHex).privateKey;
                wallet.privateKey = this.toHexString(privateKeyArray).toUpperCase();
                validPin = true;
              } catch (e) {
                console.log(e);
              }
              break;
            default:
              break;
          }
          return validPin ? wallet : null;
        }
        break;
      default:
        break;
    }
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
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with selected wallet
   */
  public async getAllWalletsData(isCheckOnly: boolean = false) {
    const nemWallets = await this.getNemWallets(isCheckOnly);
    const symbolWallets = await this.getSymbolWallets(isCheckOnly);
    const bitcoinWallets = await this.getBitcoinWallets(isCheckOnly);
    return [...nemWallets, ...symbolWallets, ...bitcoinWallets];
  }

  public async getWalletByWalletId(walletId): Promise<any> {
    const wallets = await this.getAllWalletsData(true);
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
    pinHash: string,
    coin: Coin,
    walletName: string = `Default ${coin} Wallet `,
    isMultisig: boolean = false,
    walletBalance: [number, number] = [0, 0],
    tokens: Token[] = [],
    transaction: Transaction[] = [],
  ) {
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
          isUseMnemonic ? WalletProvider.encrypt(entropyMnemonicKey, pinHash) : "",
          transaction,
          nemWallet.writeWLTFile()
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
          symbolWallet.encryptedPrivateKey,
          isUseMnemonic ? WalletProvider.encrypt(entropyMnemonic, pinHash) : "",
          transaction,
          symbolWallet.toDTO()
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
          bitcoinWallet.encryptedWIF,
          isUseMnemonic ? WalletProvider.encrypt(entropyMnemonicKey, pinHash) : "",
          transaction,
          bitcoinWallet
        );
        savedWallets.push(newBitcoinWallet);
        break;
      default:
    };
    this.storage.set(`${coin}Wallets`, savedWallets);
    this.wallets = null;
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
      const reducer = (previousValue, currentValue) => this.parseWalletBalance(this.parseNumber(previousValue)) + this.parseWalletBalance(this.parseNumber(currentValue));
      return this.cryptoProvider.round(wallets.reduce(reducer));
    } catch (e) {
      console.log('wallet.provider', 'getWalletBalance', 'error', e);
      return 0;
    }
  }

  public async updateWalletName(id: string, newName: string, walletType: Coin) {
    const updatedWallets = [
      ...this.allWallet.map((wallet) => (wallet.walletId === id ? { ...wallet, walletName: newName } : { ...wallet })),
    ];
    this.allWallet = updatedWallets;
    this.storage.set(`${walletType}Wallets`, updatedWallets);
  }

  public async deleteWallet(id: string, walletType: Coin) {
    let savedWallets = await this.getWallets(walletType);
    const newWallets = savedWallets.filter((wallet) => wallet.walletId !== id);
    this.storage.set(`${walletType}Wallets`, newWallets);
    this.wallets = null;
  }

  parseWalletBalance = (value) => typeof value === 'object' ? value.walletBalance[0] : value;

  parseNumber = (value) => typeof value === 'string' ? parseInt(value) : value;

  private toHexString(byteArray: number[]) {
    return byteArray.reduce((output, elem) =>
      (output + ('0' + elem.toString(16)).slice(-2)),
      '');
  }
}
