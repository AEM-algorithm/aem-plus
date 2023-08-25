// Modules
import { Injectable } from '@angular/core';
import { entropyToMnemonic } from 'bip39';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { BNBWallet } from '../models/wallet.model';
import { WalletProvider } from '../wallets/wallet.provider';
import { environment } from '@environments/environment';
import {
  bscscanMainnet,
  bscscanTestnet,
  rpcMainNetEndpoints,
  rpcTestNetEndpoints,
} from '@app/constants/constants';
import * as moment from 'moment';
import { HelperFunService } from '../helper/helper-fun.service';
import { ExchangeProvider } from '../exchange/exchange.provider';
import { ExportTransactionModel } from '../models/export-transaction.model';
import { Coin } from '@app/enums/enums';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class BnbProvider {
  public readonly DEFAULT_ACCOUNT_PATH = `m/44'/60'/0'/0/0`;
  public readonly DEFAULT_DECIMAL = 18;
  public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';
  public availableRPCNodes = this.isMainNet
    ? rpcMainNetEndpoints
    : rpcTestNetEndpoints;
  public bscApiUrl = this.isMainNet ? bscscanMainnet : bscscanTestnet;
  public activeEndpointIndex: number = 0;
  private web3: any;

  constructor(
    private helperService: HelperFunService,
    private exchange: ExchangeProvider
  ) {
    this.monitorEndpoints();
    this.web3 = new Web3(this.availableRPCNodes[0]);
  }

  // Rpc nodes valid checking
  public async switchToNextEndpoint() {
    this.activeEndpointIndex =
      (this.activeEndpointIndex + 1) % this.availableRPCNodes.length;
  }

  public async isEndpointWorking() {
    try {
      await this.web3.eth.getBlockNumber();
      return true;
    } catch (error) {
      return false;
    }
  }

  public async monitorEndpoints() {
    while (true) {
      this.web3 = new Web3(this.availableRPCNodes[this.activeEndpointIndex]);
      if (await this.isEndpointWorking()) {
        break;
      } else {
        console.log('Current endpoint is not working. Switching...');
        await this.switchToNextEndpoint();
      }
    }
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
    return this.web3.utils.isAddress(address);
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

  /**
   * get all bnb transactions
   * @param address
   */
  public async getAllTransactionsFromAnAccount(address: string) {
    const bscParameters = new URLSearchParams({
      module: 'account',
      action: 'txlist',
      address: address,
    });

    const fecthBscApi = await fetch(`${this.bscApiUrl}?${bscParameters}`);
    const allBnbTransaction = await fecthBscApi.json();

    return allBnbTransaction.result;
  }

  /**
   * get transaction receipt
   * @param txHash
   * **/
  public async getTransactionReceiptByTxHash(txHash: string) {
    return this.web3.eth.getTransactionReceipt(txHash);
  }
  
  /**
   * calculate fee
   * @param gasPrice
   * @param gasUsed
   * **/
  public calculateFeeTransferTxs(gasPrice: number, gasUsed: number): number {
    const gPrice = this.formatBNB(gasPrice);
    const gUsed = this.formatBNB(gasUsed);
    const txFee = gPrice * gUsed;
    return txFee * Math.pow(10, 18);
  }

  /**
   * get pretty addres for copy
   * @param rawAddress
   * **/
  public prettyAddress(rawAddress: string) {
    return;
  }

  public async getExportTransactionByPeriod(
    wallet: any,
    fromDate: Date,
    toDate: Date
  ): Promise<any[]> {
    const allTxs: any = await this.getAllTransactionsFromAnAccount(
      wallet.walletAddress
    );
    const transactionByPeriod = allTxs.filter((value) => {
      const formatDate = moment(value.timeStamp * 1000).format('YYYY/MM/DD');
      const formatFrom = moment(fromDate).format('YYYY/MM/DD');
      const formatTo = moment(toDate).format('YYYY/MM/DD');
      return this.helperService.isInDateRange(
        new Date(formatDate),
        new Date(formatFrom),
        new Date(formatTo)
      );
    });
    const transactionExports: ExportTransactionModel[] = [];

    for (const txs of transactionByPeriod) {
      const date = moment(txs.timeStamp * 1000).format(
        'MM/DD/YYYY, HH:mm:ss A'
      );
      const isIncomingTxs = _.isEqual(txs.to, wallet.walletAddress);
      const formatBNB = this.formatBNB(txs.value);
      const txsAmount = this.formatValue(formatBNB);
      const convertedAmount = this.exchange.round(
        txsAmount * wallet.exchangeRate
      );
      const convertedCurrency = wallet.currency;
      const payer = txs.from;
      const message = '';

      const txsExportModel = new ExportTransactionModel(
        date,
        wallet.walletAddress,
        Coin.BNB,
        `${isIncomingTxs ? '+' : '-'}${txsAmount}`,
        `${isIncomingTxs ? '+' : '-'}${convertedAmount}`,
        convertedCurrency,
        payer,
        message
      );
      transactionExports.push(txsExportModel);
    }
    return transactionExports;
  }
}
