import { Injectable } from '@angular/core';
import {
  Account,
  Address,
  Deadline,
  Mosaic,
  NetworkType,
  PlainMessage,
  TransferTransaction,
  UInt64,
  NetworkConfiguration,
  TransactionFees,
  Transaction
} from 'symbol-sdk';

import { environment } from '@environments/environment';

export interface FeesConfig {
  slow: number;
  normal: number;
  fast: number;
}

export interface PrepareTransaction {
  type: string;
  recipientAddress: string;
  mosaics: any[];
  messageText: string;
  fee: number;
}

@Injectable({ providedIn: 'root' })
export class SymbolFeeProvider {

  defaultFeesConfig: FeesConfig = {
    slow: 1,
    normal: 1.2,
    fast: 2,
  };

  constructor(
  ) {
  }

  resolveAmount = (rawAmount, divisibility) => {
    return rawAmount / Math.pow(10, divisibility);
  }

  async getMaxFee(txsPayload: any, networkConfig: NetworkConfiguration, transactionFees: TransactionFees): Promise<number> {
    const networkType = environment.NETWORK_TYPE === 'TEST_NET' ? NetworkType.TEST_NET : NetworkType.MAIN_NET;
    const dummyAccount = Account.generateNewAccount(networkType);
    const recipientAddress = txsPayload.recipientAddress || dummyAccount.address.plain();

    const prepareTransaction: PrepareTransaction = {
      type: 'transfer',
      recipientAddress,
      messageText: txsPayload.message,
      mosaics: txsPayload.mosaics,
      fee: txsPayload.fee,
    };

    const txs: Transaction = await this.prepareTransferTransaction(prepareTransaction, networkConfig);
    const txsWithFee = this.calculateMaxFee(txs, transactionFees, networkConfig, prepareTransaction.fee);
    return txsWithFee.maxFee.compact();
  }

  async prepareTransferTransaction(transaction: PrepareTransaction, networkConfig: NetworkConfiguration): Promise<Transaction> {
    let transactionObj: Transaction;
    switch (transaction.type) {
      case 'transfer':
        transactionObj = await this.createTransferTransaction(transaction, networkConfig);
        break;
      default:
        throw new Error('Not implemented');
    }
    return transactionObj;
  }

  async createTransferTransaction(transaction: PrepareTransaction, networkConfig: NetworkConfiguration): Promise<TransferTransaction> {
    const networkType = environment.NETWORK_TYPE === 'TEST_NET' ? NetworkType.TEST_NET : NetworkType.MAIN_NET;
    const recipientAddress = Address.createFromRawAddress(transaction.recipientAddress);
    const mosaics = [new Mosaic(transaction.mosaics[0].id, UInt64.fromUint(transaction.mosaics[0].amount))];
    const message = PlainMessage.create(transaction.messageText);

    return TransferTransaction.create(
      Deadline.create(parseInt(networkConfig.network.epochAdjustment)),
      recipientAddress,
      mosaics,
      message,
      networkType,
      UInt64.fromUint(transaction.fee)
    );
  }

  calculateMaxFee(
    transaction: Transaction,
    transactionFees: TransactionFees,
    network: NetworkConfiguration,
    feeMultiplier?: number,
  ) {
    if (!feeMultiplier) {
      return transaction;
    }

    const feeMulti = this.resolveFeeMultiplier(transactionFees, feeMultiplier, network) < transactionFees.minFeeMultiplier
      ? transactionFees.minFeeMultiplier
      : this.resolveFeeMultiplier(transactionFees, feeMultiplier, network);

    if (!feeMulti) {
      return transaction;
    }

    return transaction.setMaxFee(feeMulti);
  }

  resolveFeeMultiplier(transactionFees: TransactionFees, feeMultiplier: number, network: NetworkConfiguration): number | undefined {
    if (feeMultiplier === this.defaultFeesConfig.slow) {
      const fees =
        transactionFees.lowestFeeMultiplier < transactionFees.minFeeMultiplier
          ? transactionFees.minFeeMultiplier
          : transactionFees.lowestFeeMultiplier;
      return fees || parseInt(network.chain.defaultDynamicFeeMultiplier);
    }
    if (feeMultiplier === this.defaultFeesConfig.normal) {
      const fees =
        transactionFees.medianFeeMultiplier < transactionFees.minFeeMultiplier
          ? transactionFees.minFeeMultiplier
          : transactionFees.medianFeeMultiplier;
      return fees || parseInt(network.chain.defaultDynamicFeeMultiplier);
    }
    if (feeMultiplier === this.defaultFeesConfig.fast) {
      const fees =
        transactionFees.highestFeeMultiplier < transactionFees.minFeeMultiplier
          ? transactionFees.minFeeMultiplier
          : transactionFees.highestFeeMultiplier;
      return fees || parseInt(network.chain.defaultDynamicFeeMultiplier);
    }
    return undefined;
  }
}
