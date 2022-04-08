import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { BigNumber, ethers, Transaction as ETHTransaction } from 'ethers';
import { entropyToMnemonic } from 'bip39';
import moment from 'moment';
import _ from 'lodash';

import { HelperFunService } from '@app/services/helper/helper-fun.service';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { ETHWallet } from '@app/services/models/wallet.model';
import { ExportTransactionModel } from '@app/services/models/export-transaction.model';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';
import { IErcTokenBalance, EthersTokensProvider, ErcTokenTypes } from '@app/services/ethers/ethersTokens.provider';

import { environment } from '@environments/environment';
import { Coin } from '@app/enums/enums';

import { ERC20_ABI_SEND } from '@app/constants/constants';

export interface EthersSimpleWallet {
  address: string;
}

export interface PrepareTransferTransaction {
  from: string;
  to: string;
  value: BigNumber;
  nonce: number;
  gasLimit: string;
  gasPrice: string;
}

export interface PrepareErcTransaction extends PrepareTransferTransaction {
  contractAddress: string,
}

@Injectable({ providedIn: 'root' })
export class EthersProvider {
  public readonly DEFAULT_ACCOUNT_PATH = `m/44'/60'/0'/0/0`;
  public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';

  public provider: ethers.providers.BaseProvider;
  public network: string;

  constructor(
    private storage: Storage,
    public http: HttpClient,
    private helperService: HelperFunService,
    private exchange: ExchangeProvider,
    private ethersTokensProvider: EthersTokensProvider,
  ) {
    this.setProvider();
  }

  public async setProvider() {
    this.network = await this.getNetwork();
    this.provider = ethers.getDefaultProvider(this.network);
  }

  public async getNetwork(): Promise<string> {
    if (this.network) {
      return this.network;
    }
    const store = await this.storage.get('EthersNetwork');
    if (store) {
      return store;
    }
    return environment.ETH_NODE_DEFAULT;
  }

  public async setNetwork(value: string) {
    this.network = value;
    await this.storage.set('EthersNetwork', value);
  }

  public createMnemonicWallet(
    entropyMnemonic: string,
  ): ethers.Wallet {
    const mnemonic = entropyToMnemonic(entropyMnemonic);
    return ethers.Wallet.fromMnemonic(mnemonic, this.DEFAULT_ACCOUNT_PATH);
  }

  public createPrivateKeyWallet(
    privateKey: string,
  ): ethers.Wallet {
    return new ethers.Wallet(privateKey);
  }

  public createMultisigWallet(
    privateKey: string,
    cosignaturesPublicKey: string[],
  ): ethers.Wallet {
    throw new Error('Not implemented');
  }

  public passwordToPrivateKey(
    hashPassword: string,
    wallet: ETHWallet
  ) {
    return WalletProvider.decrypt(wallet.privateKey, hashPassword);
  }

  public passwordToPrivateKeyHex(
    password: string,
    wallet
  ) {
    throw new Error('Not implemented');
  }

  public generateAddressQRText(address): string {
    throw new Error('Not implemented');
  }

  public generateInvoiceQRText(
    address,
    amount: number,
    message: string
  ): string {
    throw new Error('Not implemented');
  }

  public async getETHBalance(
    address: string,
  ): Promise<number> {
    const balance = await this.provider.getBalance(address);
    const formatEther = this.formatEther(balance);
    return this.formatValue(formatEther);
  }

  public async getErc20Balance(address: string): Promise<IErcTokenBalance[]> {
    const result = await this.ethersTokensProvider.getErcTokenBalance(address, this.network, ErcTokenTypes.ERC20);
    return result;
  }

  public async getNftBalance(address: string): Promise<IErcTokenBalance[]> {
    const result = await this.ethersTokensProvider.getErcTokenBalance(address, this.network, ErcTokenTypes.NFT);
    return result;
  }

  // public async getErc20Transactions(address: string): Promise<number> {
  //   return await this.ethersTokensProvider.getErc20TokenBalance(address, this.network);
  // }

  public formatEther(value): number {
    if (value) {
      return parseFloat(ethers.utils.formatEther(value));
    }
    return value;
  }

  public async getTransactionResponseByTxHash(txHash): Promise<ethers.providers.TransactionResponse> {
    return  this.provider.getTransaction(txHash);
  }

  public async getTransactionRecipientByTxHash(txHash): Promise<ethers.providers.TransactionReceipt> {
    return this.provider.getTransactionReceipt(txHash);
  }

  public calculateFeeTransferTxs(gasPrice: ethers.BigNumber, gasUsed: ethers.BigNumber): number {
    const gPrice = ethers.utils.formatEther(gasPrice);
    const gUsed = ethers.utils.formatEther(gasUsed);
    const txFee = parseFloat(gPrice) * parseFloat(gUsed);
    return txFee * Math.pow(10, 18);
  }

  public isValidAddress(address): boolean {
    return ethers.utils.isAddress(address);
  }

  public isValidPublicKey(publicKey: string): string {
    throw new Error('Not implemented');
  }

  public async getAllTransactionsFromAnAccount(address: string): Promise<ETHTransaction[]> {
    const provider = new ethers.providers.EtherscanProvider(this.network);
    const history = await provider.getHistory(address);
    return history.reverse();
  }

  public async getExportTransactionByPeriod(
    wallet: any,
    fromDate: Date,
    toDate: Date
  ): Promise<any[]> {
    const allTxs: any = await this.getAllTransactionsFromAnAccount(wallet.walletAddress);
    const transactionByPeriod = allTxs.filter((value) => {
      const formatDate = moment(value.timestamp * 1000).format('YYYY/MM/DD');
      const formatFrom = moment(fromDate).format('YYYY/MM/DD');
      const formatTo = moment(toDate).format('YYYY/MM/DD');
      return this.helperService.isInDateRange(new Date(formatDate), new Date(formatFrom), new Date(formatTo));
    });
    const transactionExports: ExportTransactionModel[] = [];
    for (const txs of transactionByPeriod) {
      const date = moment(txs.timestamp * 1000).format('MM/DD/YYYY, HH:mm:ss A');
      const isIncomingTxs = _.isEqual(txs.to, wallet.walletAddress);
      const formatEther = this.formatEther(txs.value);
      const txsAmount = this.formatValue(formatEther);
      const convertedAmount = this.exchange.round(txsAmount * wallet.exchangeRate);
      const convertedCurrency = wallet.currency;
      const payer = txs.from;
      const message = '';

      const txsExportModel = new ExportTransactionModel(
        date,
        wallet.walletAddress,
        Coin.ETH,
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

  private parseInnerTx(
    transactionsInfo: any[],
    walletAddress: string
  ) {
    throw new Error('Not implemented');
  }

  public async estimateGas(to: string, value: string): Promise<BigNumber> {
    const estimateGas = await this.provider.estimateGas({
      to,
      value: ethers.utils.parseUnits(value, 'ether')
    });
    return estimateGas;
  }

  public async gasPrice(): Promise<BigNumber> {
    const gasPrice = await this.provider.getGasPrice();
    return gasPrice;
  }

  public async calculateFee(gasPrice: BigNumber, gasLimit: BigNumber): Promise<{ low: number, medium: number, high: number }> {
    // TODO: calculate dynamic max priority Fee.
    const transactionFee = gasPrice.toNumber() * gasLimit.toNumber();
    const formatTxsFee = parseFloat(ethers.utils.formatEther(transactionFee));
    return {
      low: formatTxsFee,
      medium: formatTxsFee,
      high: formatTxsFee,
    };
  }

  private getMedianTxFee(feeUnit: any): any {
    throw new Error('Not implemented');
  }

  public isValidPrivateKey(privateKey: string): boolean {
    let isValid = false;
    try {
      const wlt = new ethers.Wallet(privateKey);
      if (wlt) {
        isValid = true;
      }
    }catch (e) {}
    return isValid;
  }

  public async getTransactionCount(address: string): Promise<number> {
    const txCount = await this.provider.getTransactionCount(address, 'latest');
    return txCount;
  }

  public async getBlock(): Promise<ethers.providers.Block> {
    const block = await this.provider.getBlock('latest');
    return block;
  }

  public prepareTransferTransaction(
    senderAddress: string,
    receiverAddress: string,
    amount: number,
    nonce: number,
    gasLimit: number,
    gasPrice: BigNumber,
  ): PrepareTransferTransaction {
    return {
      from: senderAddress,
      to: receiverAddress,
      value: ethers.utils.parseEther(amount.toString()),
      nonce,
      gasLimit: ethers.utils.hexlify(gasLimit),
      gasPrice: ethers.utils.hexlify(gasPrice),
    } as PrepareTransferTransaction;
  }

  public async sendTransaction(
    wallet: ethers.Wallet,
    transferTransaction: PrepareTransferTransaction
  ): Promise<ethers.providers.TransactionRequest> {
    const walletSigner = wallet.connect(this.provider);
    const sendTransaction = await walletSigner.sendTransaction(transferTransaction);
    return sendTransaction;
  }

  public prepareErcTransaction(
    contractAddress: string,
    senderAddress: string,
    receiverAddress: string,
    amount: number,
    nonce: number,
    gasLimit: number,
    gasPrice: BigNumber,
  ): PrepareErcTransaction {
    const transferTransaction = this.prepareTransferTransaction(senderAddress, receiverAddress, amount, nonce, gasLimit, gasPrice);
    return {...transferTransaction, contractAddress: contractAddress} as PrepareErcTransaction;
  }

  public async sendErcTransaction(
    wallet: ethers.Wallet,
    ercTransaction: PrepareErcTransaction,
  ) {
    const walletSigner = wallet.connect(this.provider);
    const contract = new ethers.Contract(
      ercTransaction.contractAddress,
      ERC20_ABI_SEND,
      walletSigner
    );
    const sendTransaction = await contract.transfer(ercTransaction.to, ercTransaction.value);
    return sendTransaction
  }

  public formatValue(value: number): number {
    const divisibilityFormat = Math.pow(10, 8);
    return Math.round(value * divisibilityFormat) / divisibilityFormat;
  }
}

