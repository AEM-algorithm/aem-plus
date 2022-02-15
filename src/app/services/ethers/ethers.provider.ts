import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { ethers, Transaction as ETHTransaction } from 'ethers';

import { HelperFunService } from '@app/services/helper/helper-fun.service';

import { environment } from '@environments/environment';

export interface EthersSimpleWallet {
  address: string;
}

@Injectable({ providedIn: 'root' })
export class EthersProvider {
  public readonly DEFAULT_ACCOUNT_PATH = `m/44'/60'/0'/0/0`;
  public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';

  public readonly ETHER_SCAN_MAIN_NET = {
    homestead: 'homestead',
  };
  public readonly ETHER_SCAN_TEST_NET = {
    ropsten: 'ropsten',
    rinkeby: 'rinkeby',
    goerli: 'goerli',
    kovan: 'kovan',
  };

  public provider: ethers.providers.JsonRpcProvider;

  constructor(
    private storage: Storage,
    public http: HttpClient,
    private helperService: HelperFunService
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(environment.ETH_NODE_DEFAULT);
  }

  public createMnemonicWallet(
    mnemonic: string,
  ): ethers.Wallet {
    return ethers.Wallet.fromMnemonic(mnemonic, this.DEFAULT_ACCOUNT_PATH);
  }

  public createPrivateKeyWallet(
    privateKey: string,
  ): ethers.Wallet {
    throw new Error('Not implemented');
  }

  public createMultisigWallet(
    privateKey: string,
    cosignaturesPublicKey: string[],
  ): ethers.Wallet {
    throw new Error('Not implemented');
  }

  public passwordToPrivateKey(
    password: string,
    wallet
  ) {
    throw new Error('Not implemented');
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
    return this.formatEther(balance);
  }

  public formatEther(value): number {
    if (value) {
      return parseFloat(ethers.utils.formatEther(value));
    }
    return value;
  }

  public isValidAddress(address): boolean {
    return ethers.utils.isAddress(address);
  }

  public isValidPublicKey(publicKey: string): string {
    throw new Error('Not implemented');
  }

  public getNetwork(): string {
    if (this.isMainNet) {
      return this.ETHER_SCAN_MAIN_NET.homestead;
    }
    return this.ETHER_SCAN_TEST_NET.ropsten;
  }

  public async sendTransaction(
    recipientAddress: string,
    amount: number,
    fee: number,
    wallet,
    password: string
  ) {
    throw new Error('Not implemented');
  }

  public async getAllTransactionsFromAnAccount(address: string): Promise<ETHTransaction[]> {
    const network = this.getNetwork();
    const provider = new ethers.providers.EtherscanProvider(network);
    const history = await provider.getHistory(address);
    return history;
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

  public async calculateFee(): Promise<any> {
    throw new Error('Not implemented');
  }

  private getMedianTxFee(feeUnit: any): any {
    throw new Error('Not implemented');
  }

  public isValidPrivateKey(privateKey: string): boolean {
    throw new Error('Not implemented');
  }
}
