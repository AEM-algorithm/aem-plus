// Modules
import { Injectable } from '@angular/core';
import { entropyToMnemonic } from 'bip39';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { BNBWallet } from '../models/wallet.model';
import { WalletProvider } from '../wallets/wallet.provider';

@Injectable({ providedIn: 'root' })
export class BnbProvider {
  web3: any;
  public readonly DEFAULT_ACCOUNT_PATH = `m/44'/60'/0'/0/0`;
  public readonly DEFAULT_DECIMAL = 18;

  constructor() {
    this.web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
  }

  // Validation Section
  /**
   * Check if private key is valid
   * @param privateKey
   */
  public isValidPrivateKey = (privateKey: string) => {
    let isValid = false;
    const addressInfo = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    if (addressInfo.address) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  /**
   * Check if address is valid
   * @param address
   */
  public isValidAddress(address: string): boolean {
    return ethers.utils.isAddress(address);
  }

  // Function Handle
  /**
   * Get Bnb address from private key phrase
   * @param privateKey
   */
  public getBnbAddressFromPrivateKey = (privateKey: string) => {
    return this.web3.eth.accounts.privateKeyToAccount(privateKey);
  };

  /**
   * Create simple wallet by a given mnemonic
   * @param walletName
   * @param mnemonic
   * @param password
   */
  public createMnemonicWallet(entropyMnemonic: string): ethers.Wallet {
    const mnemonic = entropyToMnemonic(entropyMnemonic);
    return ethers.Wallet.fromMnemonic(mnemonic, this.DEFAULT_ACCOUNT_PATH);
  }

  /**
   * Create wallet's private key
   * @param privateKey
   */
  public createPrivateKeyWallet(privateKey: string): ethers.Wallet {
    return new ethers.Wallet(privateKey);
  }

  /**
   * Create wallet's private key
   * @param privateKey
   */
  public passwordToPrivateKey(hashPassword: string, wallet: BNBWallet) {
    return WalletProvider.decrypt(wallet.privateKey, hashPassword);
  }

  /**
   * Get BNB wallet balance
   * @param address
   */
  public async getBNBBalance(address: string) {
    const balance = await this.web3.eth.getBalance(address);
    const formatBNB = this.formatBNB(balance);
    return this.formatValue(formatBNB);
  }

  /**
   * format BNB
   * @param value
   */
  public formatBNB(value: any): number {
    if (value) {
      return parseFloat(ethers.utils.formatEther(value));
    }
    return value;
  }

  /**
   * format value
   * @param value
   */
  public formatValue(value: number): number {
    const divisibilityFormat = Math.pow(10, 8);
    return Math.round(value * divisibilityFormat) / divisibilityFormat;
  }

  /**
   * Get gas price
   * @param value
   */
  public async gasPrice(): Promise<any> {
    const gasPrice = await this.web3.eth.getGasPrice();
    return gasPrice;
  }

  /**
   * Get gas fee
   * @param to
   * @param value
   */
  public async estimateGas(to: string, value: string): Promise<any> {
    try {
      const gasEstimate = await this.web3.eth.estimateGas({
        to,
        value: this.web3.utils.toWei(value, 'ether'),
      });
      return gasEstimate;
    } catch (e) {
      throw new Error('Can not estimate gas');
    }
  }

  /**
   * Get gas fee
   * @param to
   * @param value
   */
  public async sendTransaction(
    privateKey: string,
    senderAddress: string,
    receiverAddress: string,
    amount: string,
    gasFee: string,
    gasPrice: string
  ) {
    const transactionObject = {
      from: senderAddress,
      to: receiverAddress,
      value: amount,
      gas: gasFee,
      gasPrice: gasPrice,
      nonce: await this.web3.eth.getTransactionCount(senderAddress),
    };

    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transactionObject,
      privateKey
    );

    const sendTxs = this.web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    return sendTxs;
  }
}
