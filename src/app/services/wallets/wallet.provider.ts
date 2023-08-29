import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { entropyToMnemonic, mnemonicToEntropy, validateMnemonic } from 'bip39';
import createHash from 'create-hash';
import CryptoJS from 'crypto-js';
import * as wif from 'wif';

import { EthersListenerProvider } from '@app/services/ethers/ethers.listener.provider';
import {
  EthersProvider,
  EthersSimpleWallet,
} from '@app/services/ethers/ethers.provider';
import { NemListenerProvider } from '@app/services/nem/nem.listener.provider';
import { SymbolListenerProvider } from '@app/services/symbol/symbol.listener.provider';
import { Coin, WalletDataType } from 'src/app/enums/enums';
import {
  BitcoinProvider
} from '../bitcoin/bitcoin.provider';
import { ExchangeProvider } from '../exchange/exchange.provider';
import { Token } from '../models/token.model';
import { Transaction } from '../models/transaction.model';
import {
  BNBWallet,
  BitcoinWallet,
  ETHWallet,
  NemWallet,
  SymbolWallet,
} from '../models/wallet.model';
import { NemProvider } from '../nem/nem.provider';
import { SymbolProvider } from '../symbol/symbol.provider';
import { WalletsService } from './wallets.service';

import {
  Address as NemAddress,
  SimpleWallet as NemSimpleWallet,
} from 'nem-library';
import { Wallet } from 'src/app/services/models/wallet.model';
import { SimpleWallet as SymbolSimpleWallet } from 'symbol-sdk';
import { BnbProvider } from '../bnb/bnb.provider';

@Injectable({ providedIn: 'root' })
export class WalletProvider {
  private allWallet: any[];

  wif;
  constructor(
    private storage: Storage,
    private nem: NemProvider,
    private nemListener: NemListenerProvider,
    private symbol: SymbolProvider,
    private symbolListener: SymbolListenerProvider,
    private bitcoin: BitcoinProvider,
    private wallets: WalletsService,
    private exchange: ExchangeProvider,
    private ethers: EthersProvider,
    private ethersListener: EthersListenerProvider,
    private bnb: BnbProvider
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
   * Check if pin is valid
   * @param pin
   * @return A promise for PIN validation in boolean value
   */
  public async isValidPin(pin: string): Promise<boolean> {
    if (!pin) return false;
    const mnemonic = await this.getMnemonics(pin);
    if (mnemonic) return true;

    const pinHash = createHash('sha256').update(pin).digest('hex');

    const nemWallets = await this.getNemWallets(true);
    if (nemWallets) {
      try {
        const nemSimpleWallet = NemSimpleWallet.readFromWLT(
          nemWallets[0].simpleWallet
        );
        this.nem.passwordToPrivateKey(pinHash, nemSimpleWallet);
        return true;
      } catch (e) {}
    }

    const symbolWallets = await this.getSymbolWallets(true);
    if (symbolWallets) {
      try {
        const symbolSimpleWallet = SymbolSimpleWallet.createFromDTO(
          symbolWallets[0].simpleWallet
        );
        this.symbol.passwordToPrivateKey(pinHash, symbolSimpleWallet);
        return true;
      } catch (e) {}
    }

    const bitcoinWallet = await this.getBitcoinWallets(true);
    if (bitcoinWallet) {
      try {
        await this.bitcoin.passwordToPrivateKey(
          pinHash,
          bitcoinWallet[0].simpleWallet
        );
        return true;
      } catch (e) {}
    }

    const ethWallet = await this.getETHWallets(true);
    if (ethWallet) {
      try {
        const ptk = await this.ethers.passwordToPrivateKey(
          pinHash,
          ethWallet[0]
        );
        const wlt = this.ethers.createPrivateKeyWallet(ptk);
        if (wlt) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    }

    const bnbWallet = await this.getBNBWallets(true);
    if (bnbWallet) {
      try {
        const ptk = await this.bnb.passwordToPrivateKey(pinHash, bnbWallet[0]);
        const wlt = this.bnb.createPrivateKeyWallet(ptk);
        if (wlt) {
          return true;
        }
      } catch (e) {
        console.log(e);
      }
    }

    return false;
  }

  /**
   * Check if mnemonic is correct with the saved one
   * @param mnemonic
   */
  public async isCorrectMnemonic(mnemonic: string): Promise<boolean> {
    const nemWallet = this.nem.createMnemonicWallet('nem', mnemonic, '');
    const savedNemWallets: NemWallet[] =
      (await this.getWallets(Coin.NEM)) || [];
    if (nemWallet.address.plain() === savedNemWallets[0].walletAddress) {
      return true;
    }
    const symbolWallet = this.symbol.createMnemonicWallet(
      'symbol',
      mnemonic,
      ''
    );
    const savedSymbolWallets: SymbolWallet[] =
      (await this.getWallets(Coin.SYMBOL)) || [];
    if (symbolWallet.address.plain() === savedSymbolWallets[0].walletAddress) {
      return true;
    }
    const bitcoinWallet = this.bitcoin.createMnemonicWallet(mnemonic, '');
    const savedBitcoinWallets: BitcoinWallet =
      (await this.getWallets(Coin.BITCOIN)) || [];
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
    return this.storage.get('mnemonics').then((data) => {
      return !!data;
    });
  }

  /**
   * Return mnemonic by a given pin
   * @param pin
   */
  public async getMnemonics(pin: string): Promise<string[] | null> {
    if (!pin) {
      return null;
    }
    const pinHash = createHash('sha256').update(pin).digest('hex');
    const encryptedMnemonics = await this.storage.get('mnemonics');
    if (!encryptedMnemonics) return null;
    const mnemonics: string[] = [];
    for (const encryptedMnemonic of encryptedMnemonics) {
      try {
        const decryptedEntropyMnemonic = WalletProvider.decrypt(
          encryptedMnemonic,
          pinHash
        );
        const mnemonic = entropyToMnemonic(decryptedEntropyMnemonic);
        if (validateMnemonic(mnemonic)) {
          mnemonics.push(mnemonic);
        }
      } catch (e) {}
    }
    if (mnemonics.length > 0) {
      return mnemonics;
    }
    return null;
  }

  /**
   * Return decrypted data of given wallet
   * @param wallet
   * @param pin
   * @param getData
   */
  public decryptWallet(
    wallet: any,
    pin: string,
    getData: WalletDataType
  ): Promise<Wallet | null> {
    if (!pin) return null;
    const pinHash = createHash('sha256').update(pin).digest('hex');

    switch (getData) {
      case WalletDataType.MNEMONIC:
        if (!validateMnemonic(wallet.mnemonic)) {
          try {
            const decryptedEntropyMnemonic = WalletProvider.decrypt(
              wallet.mnemonic,
              pinHash
            );
            const mnemonic = entropyToMnemonic(decryptedEntropyMnemonic);
            if (validateMnemonic(mnemonic)) {
              wallet.mnemonic = mnemonic.split(' ');
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
          if (wallet.walletType === Coin.BITCOIN && wallet.isMultisig) {
            return wallet;
          }
          switch (wallet.walletType) {
            case Coin.NEM:
              try {
                const nemSimpleWallet = NemSimpleWallet.readFromWLT(
                  wallet.simpleWallet
                );
                wallet.privateKey = this.nem.passwordToPrivateKey(
                  pinHash,
                  nemSimpleWallet
                );
                validPin = true;
              } catch (e) {
                console.log(e);
              }
              break;
            case Coin.SYMBOL:
              try {
                const symbolSimpleWallet = SymbolSimpleWallet.createFromDTO(
                  wallet.simpleWallet
                );
                wallet.privateKey = this.symbol.passwordToPrivateKey(
                  pinHash,
                  symbolSimpleWallet
                );
                validPin = true;
              } catch (e) {
                console.log(e);
              }
              break;
            case Coin.BITCOIN:
              try {
                const WIFWalletHex = this.bitcoin.passwordToPrivateKeyHex(
                  pinHash,
                  wallet.simpleWallet
                );
                const privateKeyArray =
                  this.wif.decode(WIFWalletHex).privateKey;
                wallet.privateKey =
                  this.toHexString(privateKeyArray).toUpperCase();
                validPin = true;
              } catch (e) {
                console.log(e);
              }
              break;
            case Coin.ETH:
              try {
                const privateKey = this.ethers.passwordToPrivateKey(
                  pinHash,
                  wallet
                );
                if (privateKey) {
                  wallet.privateKey = privateKey;
                  validPin = true;
                }
              } catch (e) {
                console.log(e);
              }
              break;
            case Coin.BNB:
              try {
                const privateKey = this.bnb.passwordToPrivateKey(
                  pinHash,
                  wallet
                );
                if (privateKey) {
                  wallet.privateKey = privateKey;
                  validPin = true;
                }
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
    return wallet;
  }

  /**
   * Set mnemonic
   * @return Promise with stored wallet
   */
  public async generateWalletsFromMnemonic(mnemonic: any, pin: string) {
    const entropyMnemonic = mnemonicToEntropy(mnemonic);
    const pinHash = createHash('sha256').update(pin).digest('hex');

    //Save nem wallet
    this.addWallet(true, entropyMnemonic, pinHash, Coin.NEM);

    //Save symbol wallet
    this.addWallet(true, mnemonic, pinHash, Coin.SYMBOL);

    //Save bitcoin wallet
    this.addWallet(true, entropyMnemonic, pinHash, Coin.BITCOIN);

    //Save ETH wallet
    this.addWallet(true, entropyMnemonic, pinHash, Coin.ETH);

    //Save BNB wallet
    this.addWallet(true, entropyMnemonic, pinHash, Coin.BNB);

    //Save mnemonic
    const mnemonicEncrypted = WalletProvider.encrypt(entropyMnemonic, pinHash);
    let savedEncryptedMnemonic = (await this.storage.get('mnemonics')) || [];
    savedEncryptedMnemonic.push(mnemonicEncrypted);
    this.storage.set('mnemonics', savedEncryptedMnemonic);
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
    cosignaturePublicKeys?: string[]
  ) {
    try {
      const pinHash = createHash('sha256').update(pin).digest('hex');
      return await this.addWallet(
        false,
        privateKey,
        pinHash,
        coin,
        walletName,
        isMultisig,
        cosignaturePublicKeys
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * Removes all account data from storage
   */
  public async removeAccountData() {
    this.storage.remove('mnemonics');
    this.storage.remove('XEMWallets');
    this.storage.remove('XYMWallets');
    this.storage.remove('BTCWallets');
    this.storage.remove('ETHWallets');
    this.storage.remove('BNBWallets');
  }

  /**
   * Transform pin to password
   * @param pin
   * @return string
   */
  public getPasswordHashFromPin(pin: string): string {
    return createHash('sha256').update(pin).digest('hex');
  }

  /**
   * Retrieves all wallets
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with selected wallet
   */
  public async getAllWalletsData(
    isCheckOnly: boolean = false,
    walletType?: Coin
  ) {
    let nemWallets: NemWallet[] = [];
    let symbolWallets: SymbolWallet[] = [];
    let bitcoinWallets: BitcoinWallet[] = [];
    let ethWallet: ETHWallet[] = [];
    let bnbWallet: BNBWallet[] = [];

    switch (walletType) {
      case Coin.NEM:
        nemWallets = await this.getNemWallets(isCheckOnly);
        break;
      case Coin.SYMBOL:
        symbolWallets = await this.getSymbolWallets(isCheckOnly);
        break;
      case Coin.BITCOIN:
        bitcoinWallets = await this.getBitcoinWallets(isCheckOnly);
        break;
      case Coin.ETH:
        ethWallet = await this.getETHWallets(isCheckOnly);
        break;
      case Coin.BNB:
        bnbWallet = await this.getBNBWallets(isCheckOnly);
        break;
      default:
        nemWallets = await this.getNemWallets(isCheckOnly);
        symbolWallets = await this.getSymbolWallets(isCheckOnly);
        bitcoinWallets = await this.getBitcoinWallets(isCheckOnly);
        ethWallet = await this.getETHWallets(isCheckOnly);
        bnbWallet = await this.getBNBWallets(isCheckOnly);
        break;
    }

    return [
      ...nemWallets,
      ...symbolWallets,
      ...bitcoinWallets,
      ...ethWallet,
      ...bnbWallet,
    ];
  }

  public async getWalletByWalletId(
    walletId: string,
    isCheckOnly: boolean = true,
    reload: boolean = false
  ): Promise<any> {
    const walletType = walletId.split('_')[0] as Coin;
    let wallets = this.allWallet;
    if ((Array.isArray(wallets) && wallets.length === 0) || reload) {
      wallets = await this.getAllWalletsData(isCheckOnly, walletType);
    }
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  /**
   * Retrieves NEM wallets
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with NEM wallet
   */
  public async getNemWallets(
    isCheckOnly: boolean = false,
    isCurrencyChanged?: boolean
  ): Promise<NemWallet[] | null> {
    const nemWallets = await this.getWallets(Coin.NEM);
    if (isCheckOnly) return nemWallets || [];
    const xemWallets = [];

    if (nemWallets && nemWallets.length > 0) {
      for (const wallet of nemWallets) {
        await this.nem.setNodeNEMWallet(wallet.walletId);
        const XEMBalance = await this.nem.getXEMBalance(wallet.walletAddress);
        const exchangeRate = await this.exchange.getExchangeRate(
          Coin.NEM,
          isCurrencyChanged
        );
        const currency = await this.exchange.getCurrency();
        const currencyBalance = this.exchange.round(XEMBalance * exchangeRate);
        wallet.currency = currency;
        wallet.walletBalance = [currencyBalance, XEMBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = this.nem.prettyAddress(
          wallet.walletAddress
        );
        xemWallets.push(wallet);
        this.nemListener.listen(wallet.walletAddress);
      }
    }
    return xemWallets;
  }

  public async getNemWalletById(walletId): Promise<any> {
    const wallets = await this.getNemWallets();
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  public async getNemWalletByRawAddress(rawAddress): Promise<any> {
    const wallets = await this.getNemWallets(true);
    return wallets.find((wallet) => wallet.walletAddress === rawAddress);
  }

  public async getETHWalletByAddress(address): Promise<any> {
    const wallets = await this.getETHWallets(true);
    return wallets.find((wallet) => wallet.walletAddress === address);
  }

  public async getBNBWalletByAddress(address: string): Promise<any> {
    const wallets = await this.getBNBWallets(true);
    return wallets.find(
      (wallet) =>
        wallet.walletAddress.toLocaleLowerCase() === address.toLocaleLowerCase()
    );
  }

  /**
   * Retrieves Symbol wallet
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with selected wallet
   */
  public async getSymbolWallets(
    isCheckOnly: boolean = false,
    isCurrencyChanged?: boolean
  ): Promise<SymbolWallet[] | null> {
    const symbolWallets = await this.getWallets(Coin.SYMBOL);
    if (isCheckOnly) return symbolWallets || [];
    const xymWallets = [];

    if (symbolWallets && symbolWallets.length > 0) {
      for (const wallet of symbolWallets) {
        await this.symbol.setNodeSymbolWallet(wallet.walletId);
        const XYMBalance = await this.symbol.getXYMBalance(
          wallet.walletAddress
        );
        const exchangeRate = await this.exchange.getExchangeRate(
          Coin.SYMBOL,
          isCurrencyChanged
        );
        const currency = await this.exchange.getCurrency();
        const currencyBalance = this.exchange.round(XYMBalance * exchangeRate);
        wallet.currency = currency;
        wallet.walletBalance = [currencyBalance, XYMBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = this.symbol.prettyAddress(
          wallet.walletAddress
        );
        xymWallets.push(wallet);
        this.symbolListener.listen(wallet.walletAddress);
      }
    }
    return xymWallets;
  }

  public async getSymbolWalletById(walletId): Promise<any> {
    const wallets = await this.getSymbolWallets();
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  public async getSymbolWalletByRawAddress(rawAddress): Promise<any> {
    const wallets = await this.getSymbolWallets(true);
    return wallets.find((wallet) => wallet.walletAddress === rawAddress);
  }

  /**
   * Retrieves Bitcoin wallet
   * @param isCheckOnly get save wallets only, false by default
   * @return promise with Bitcoin wallets
   */
  public async getBitcoinWallets(
    isCheckOnly: boolean = false,
    isCurrencyChanged?: boolean
  ): Promise<BitcoinWallet[] | null> {
    const bitcoinWallets = await this.getWallets(Coin.BITCOIN);
    if (isCheckOnly) return bitcoinWallets || [];
    const btcWallets = [];

    if (bitcoinWallets && bitcoinWallets.length > 0) {
      for (const wallet of bitcoinWallets) {
        const network = this.bitcoin.getNetwork(wallet.walletAddress);
        const BTCBalance = await this.bitcoin.getBTCBalance(
          wallet.walletAddress,
          network
        );
        const exchangeRate = await this.exchange.getExchangeRate(
          Coin.BITCOIN,
          isCurrencyChanged
        );
        const currency = await this.exchange.getCurrency();
        const currencyBalance = this.exchange.round(BTCBalance * exchangeRate);
        wallet.currency = currency;
        wallet.walletBalance = [currencyBalance, BTCBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = wallet.walletAddress;
        btcWallets.push(wallet);
      }
    }
    return btcWallets;
  }

  public async getBitcoinWalletById(walletId): Promise<any> {
    const wallets = await this.getBitcoinWallets();
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  public async getETHWallets(
    isCheckOnly: boolean = false,
    isCurrencyChanged?: boolean
  ): Promise<ETHWallet[] | null> {
    const ethereumWallets = await this.getWallets(Coin.ETH);
    if (isCheckOnly) {
      return ethereumWallets || [];
    }
    const ethWallets = [];

    if (ethereumWallets && ethereumWallets.length > 0) {
      for (const wallet of ethereumWallets) {
        const ETHBalance = await this.ethers.getETHBalance(
          wallet.walletAddress
        );
        const exchangeRate = await this.exchange.getExchangeRate(
          Coin.ETH,
          isCurrencyChanged
        );
        const currency = await this.exchange.getCurrency();
        const currencyBalance = this.exchange.round(ETHBalance * exchangeRate);
        wallet.currency = currency;
        wallet.walletBalance = [currencyBalance, ETHBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = wallet.walletAddress;
        ethWallets.push(wallet);
        // TODO check listener ETH transfer txn
        // this.ethersListener.listen(wallet.walletAddress);
      }
    }
    return ethWallets;
  }

  public async getBNBWallets(
    isCheckOnly: boolean = false,
    isCurrencyChanged?: boolean
  ): Promise<BNBWallet[] | null> {
    const binanceWallet = await this.getWallets(Coin.BNB);
    if (isCheckOnly) {
      return binanceWallet || [];
    }
    const bnbWallets = [];

    if (binanceWallet && binanceWallet.length > 0) {
      for (const wallet of binanceWallet) {
        const BNBBalance = await this.bnb.getBNBBalance(wallet.walletAddress);
        const exchangeRate = await this.exchange.getExchangeRate(
          Coin.BNB,
          isCurrencyChanged
        );
        const currency = await this.exchange.getCurrency();

        const currencyBalance = this.exchange.round(BNBBalance * exchangeRate);
        wallet.currency = currency;
        wallet.walletBalance = [currencyBalance, BNBBalance];
        wallet.exchangeRate = exchangeRate;
        wallet.walletPrettyAddress = wallet.walletAddress;
        bnbWallets.push(wallet);
      }
    }
    return bnbWallets;
  }

  public async getETHWalletById(walletId: any): Promise<any> {
    const wallets = await this.getETHWallets();
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  public async getBNBWalletById(walletId: any): Promise<any> {
    const wallets = await this.getBNBWallets();
    return wallets.find((wallet) => wallet.walletId === walletId);
  }

  /**
   * Get wallets
   */
  private getWallets(coin: Coin | string): Promise<any> {
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
    cosignaturePublicKeys?: string[],
    walletBalance: [number, number] = [0, 0],
    tokens: Token[] = [],
    transaction: Transaction[] = []
  ) {
    try {
      let savedWallets = (await this.storage.get(`${coin}Wallets`)) || [];
      const walletIndex = savedWallets.length;

      switch (coin) {
        case Coin.NEM:
          const nemWallet = isUseMnemonic
            ? this.nem.createMnemonicWallet(coin, entropyMnemonicKey, pinHash)
            : this.nem.createPrivateKeyWallet(
                coin,
                entropyMnemonicKey,
                pinHash
              );
          const newNemWallet = new NemWallet(
            `${coin}_${walletIndex}`,
            '',
            walletName + ' - ' + walletIndex,
            coin,
            nemWallet.address.plain(),
            walletBalance,
            isMultisig,
            tokens,
            JSON.stringify(nemWallet.encryptedPrivateKey),
            isUseMnemonic
              ? WalletProvider.encrypt(entropyMnemonicKey, pinHash)
              : '',
            transaction,
            nemWallet.writeWLTFile()
          );
          savedWallets.push(newNemWallet);
          break;
        case Coin.SYMBOL:
          const entropyMnemonic = isUseMnemonic
            ? mnemonicToEntropy(entropyMnemonicKey)
            : '';
          const symbolWallet = isUseMnemonic
            ? this.symbol.createMnemonicWallet(
                coin,
                entropyMnemonicKey,
                pinHash
              )
            : this.symbol.createPrivateKeyWallet(
                coin,
                entropyMnemonicKey,
                pinHash
              );
          const newSymbolWallet = new SymbolWallet(
            `${coin}_${walletIndex}`,
            '',
            walletName + ' - ' + walletIndex,
            coin,
            symbolWallet.address.plain(),
            walletBalance,
            isMultisig,
            tokens,
            symbolWallet.encryptedPrivateKey,
            isUseMnemonic
              ? WalletProvider.encrypt(entropyMnemonic, pinHash)
              : '',
            transaction,
            symbolWallet.toDTO()
          );
          savedWallets.push(newSymbolWallet);
          break;
        case Coin.BITCOIN:
          const bitcoinWallet = isUseMnemonic
            ? this.bitcoin.createMnemonicWallet(entropyMnemonicKey, pinHash)
            : !isMultisig
            ? this.bitcoin.createPrivateKeyWallet(entropyMnemonicKey, pinHash)
            : this.bitcoin.createMultisigWallet(
                entropyMnemonicKey,
                cosignaturePublicKeys,
                pinHash
              );
          const newBitcoinWallet = new BitcoinWallet(
            `${coin}_${walletIndex}`,
            '',
            walletName + ' - ' + walletIndex,
            coin,
            bitcoinWallet.address,
            walletBalance,
            isMultisig,
            tokens,
            bitcoinWallet.encryptedWIF,
            isUseMnemonic
              ? WalletProvider.encrypt(entropyMnemonicKey, pinHash)
              : '',
            transaction,
            bitcoinWallet
          );
          savedWallets.push(newBitcoinWallet);
          break;
        case Coin.ETH:
          const ethWallet = isUseMnemonic
            ? this.ethers.createMnemonicWallet(entropyMnemonicKey)
            : !isMultisig
            ? this.ethers.createPrivateKeyWallet(entropyMnemonicKey)
            : this.ethers.createMultisigWallet(
                entropyMnemonicKey,
                cosignaturePublicKeys
              );
          const ethSimpleWallet: EthersSimpleWallet = {
            address: ethWallet.address,
          };
          const newETHWallet = new ETHWallet(
            `${coin}_${walletIndex}`,
            '',
            walletName + ' - ' + walletIndex,
            coin,
            ethWallet.address,
            walletBalance,
            isMultisig,
            tokens,
            WalletProvider.encrypt(ethWallet.privateKey, pinHash),
            isUseMnemonic
              ? WalletProvider.encrypt(entropyMnemonicKey, pinHash)
              : '',
            transaction,
            ethSimpleWallet
          );
          savedWallets.push(newETHWallet);
          break;
        case Coin.BNB:
          const bnbWallet = isUseMnemonic
            ? this.bnb.createMnemonicWallet(entropyMnemonicKey)
            : !isMultisig
            ? this.bnb.createPrivateKeyWallet(entropyMnemonicKey)
            : null;
          const bnbSimpleWallet: EthersSimpleWallet = {
            address: bnbWallet.address,
          };
          const newBNBWallet = new BNBWallet(
            `${coin}_${walletIndex}`,
            '',
            walletName + ' - ' + walletIndex,
            coin,
            bnbWallet.address,
            walletBalance,
            isMultisig,
            tokens,
            WalletProvider.encrypt(bnbWallet.privateKey, pinHash),
            isUseMnemonic
              ? WalletProvider.encrypt(entropyMnemonicKey, pinHash)
              : '',
            transaction,
            bnbSimpleWallet
          );
          savedWallets.push(newBNBWallet);
          break;
        default:
      }
      this.storage.set(`${coin}Wallets`, savedWallets);
      this.allWallet = null;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Update saved NEM wallet
   */
  public async updateNemWallet(wallet: NemWallet) {
    const savedWallets = this.getNemWallets();
    (await savedWallets).map((savedWallet) =>
      savedWallet.walletAddress === wallet.walletAddress ? wallet : savedWallet
    );
  }

  /**
   * Update saved Symbol wallet
   */
  public async updateSymbolWallet(wallet: SymbolWallet) {
    const savedWallets = this.getSymbolWallets();
    (await savedWallets).map((savedWallet) =>
      savedWallet.walletAddress === wallet.walletAddress ? wallet : savedWallet
    );
  }

  public checkValidAddress(checkAddress: string, walletType: Coin): boolean {
    if (!checkAddress) return false;
    const condition = {
      [Coin.SYMBOL]: () => this.symbol.isValidAddress(checkAddress),
      [Coin.NEM]: () => this.nem.isValidRawAddress(checkAddress),
      [Coin.BITCOIN]: () => this.bitcoin.isValidAddress(checkAddress),
      [Coin.ETH]: () => this.ethers.isValidAddress(checkAddress),
      [Coin.BNB]: () => this.bnb.isValidAddress(checkAddress),
    };
    return condition[walletType] ? condition[walletType]() : false;
  }

  public async checkAccountNetworkData(
    checkAddress: string,
    walletType: Coin
  ): Promise<any> {
    if (!checkAddress) return null;
    let result: any;
    switch (walletType) {
      case Coin.SYMBOL:
        // result = this.symbol.isValidAddress(checkAddress);
        break;
      case Coin.NEM:
        const address = new NemAddress(checkAddress);
        result = await this.nem.getAccountData(address);
        break;
      case Coin.BITCOIN:
        // result = this.bitcoin.isValidAddress(checkAddress);
        break;
      default:
        result = null;
        break;
    }
    return result;
  }

  /**
   * Filter wallets
   * @param searchStr key string to search in wallet name and wallet address
   * @return found wallets match search string
   */

  public filterWallets(searchStr: string) {
    return searchStr && searchStr.trim() !== ''
      ? this.allWallet.filter((wallet) => {
          return (
            wallet.walletName.toLowerCase().indexOf(searchStr.toLowerCase()) >
              -1 ||
            wallet.walletAddress
              .toLowerCase()
              .indexOf(searchStr.toLowerCase()) > -1
          );
        })
      : this.allWallet;
  }

  /**
   * Update saved NEM wallet
   */
  public async updateWallet(wallet: any, coin: Coin): Promise<boolean> {
    const savedWallets = this.getWallets(coin);
    try {
      (await savedWallets).map((savedWallet) =>
        savedWallet.walletAddress === wallet.walletAddress
          ? wallet
          : savedWallet
      );
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

  public getWalletBalance(wallets) {
    let balance = 0;
    try {
      if (wallets.length > 0) {
        wallets.forEach((value) => {
          const walletBalance = value.walletBalance[0];
          balance += walletBalance;
        });
      }
      return this.exchange.round(balance);
    } catch (e) {
      console.log('wallet.provider', 'getWalletBalance', 'error', e);
      return balance;
    }
  }

  public async updateWalletName(
    id: string,
    newName: string,
    walletType: Coin | string
  ) {
    const updatedWallets = [
      ...this.allWallet.map((wallet) =>
        wallet.walletId === id
          ? { ...wallet, walletName: newName }
          : { ...wallet }
      ),
    ];
    this.allWallet = updatedWallets;
    const updatedSavedWallet = updatedWallets.filter(
      (updatedWallet) => updatedWallet.walletType === walletType
    );
    this.storage.set(`${walletType}Wallets`, updatedSavedWallet);
  }

  public async deleteWallet(id: string, walletType: Coin | string) {
    let savedWallets = await this.getWallets(walletType);
    const newWallets = savedWallets.filter((wallet) => wallet.walletId !== id);
    this.storage.set(`${walletType}Wallets`, newWallets);
    this.allWallet = null;
  }

  private toHexString(byteArray: number[]) {
    return byteArray.reduce(
      (output, elem) => output + ('0' + elem.toString(16)).slice(-2),
      ''
    );
  }

  public getWalletTypeByRawAddress(rawAddress): string {
    if (this.symbol.isValidAddress(rawAddress)) {
      return Coin.SYMBOL;
    }
    if (this.nem.isValidRawAddress(rawAddress)) {
      return Coin.NEM;
    }
    if (this.bitcoin.isValidAddress(rawAddress)) {
      return Coin.BITCOIN;
    }
    return null;
  }
}
