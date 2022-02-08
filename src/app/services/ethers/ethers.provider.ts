import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { HelperFunService } from '@app/services/helper/helper-fun.service';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class EthersProvider {
  public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';

  public btcApis;

  constructor(
    private storage: Storage,
    public http: HttpClient,
    private helperService: HelperFunService
  ) {
  }

  public createMnemonicWallet(
    mnemonic: string,
    password: string
  ) {
    throw new Error('Not implemented');
  }

  public createPrivateKeyWallet(
    privateKey: string,
    password: string
  ) {
    throw new Error('Not implemented');
  }

  public createMultisigWallet(
    privateKey: string,
    cosignaturesPublicKey: string[],
    password: string
  ) {
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

  public async getBTCBalance(
    rawAddress: string,
    network: string
  ): Promise<number> {
    throw new Error('Not implemented');
  }

  public isValidAddress(address, network?: string): boolean {
    throw new Error('Not implemented');
  }

  public isValidPublicKey(publicKey: string): string {
    throw new Error('Not implemented');
  }

  public getNetwork(rawAddress: string): string {
    throw new Error('Not implemented');
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

  public async getAllTransactionsFromAnAccount(
    rawAddress: string,
    network: string
  ) {
    throw new Error('Not implemented');
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
