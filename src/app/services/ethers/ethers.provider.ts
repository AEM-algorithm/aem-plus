import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { BigNumber, ethers, Transaction as ETHTransaction } from 'ethers';

import { HelperFunService } from '@app/services/helper/helper-fun.service';
import { WalletProvider } from '@app/services/wallets/wallet.provider';
import { ETHWallet } from '@app/services/models/wallet.model';

import { environment } from '@environments/environment';

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

@Injectable({ providedIn: 'root' })
export class EthersProvider {
  public readonly DEFAULT_ACCOUNT_PATH = `m/44'/60'/0'/0/0`;
  public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';

  public provider: ethers.providers.BaseProvider;
  public network: string;

  constructor(
    private storage: Storage,
    public http: HttpClient,
    private helperService: HelperFunService
  ) {
    this.network = this.getNetwork();
    this.provider = ethers.getDefaultProvider(this.network);
  }

  public getNetwork(): string {
    // TODO handle return custom network.
    return environment.ETH_NODE_DEFAULT;
  }

  public createMnemonicWallet(
    mnemonic: string,
  ): ethers.Wallet {
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
    throw new Error('Not implemented');
  }

  private parseInnerTx(
    transactionsInfo: any[],
    walletAddress: string
  ) {
    throw new Error('Not implemented');
  }

  public async calculateFee(): Promise<{ low: number, medium: number, high: number }> {
    // TODO: calculate dynamic max priority Fee.
    const gasLimit = 21000;
    const maxPriorityFee = {
      low: 1.409999992,
      medium: 1.5,
      high: 2,
    };
    return {
      low: gasLimit * maxPriorityFee.low,
      medium: gasLimit * maxPriorityFee.medium,
      high: gasLimit * maxPriorityFee.high,
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

  public async prepareTransferTransaction(
    senderAddress: string,
    receiverAddress: string,
    amount: number,
    nonce: number,
    gasLimit: number,
  ): Promise<PrepareTransferTransaction> {
    const gasPrice = await this.provider.getGasPrice();
    return {
      from: senderAddress,
      to: receiverAddress,
      value: ethers.utils.parseEther(amount.toString()),
      nonce,
      gasLimit: ethers.utils.hexlify(Math.round(gasLimit) || 21000), // 100 gwei
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

  public formatValue(value: number): number {
    const divisibilityFormat = Math.pow(10, 8);
    return Math.round(value * divisibilityFormat) / divisibilityFormat;
  }
}

