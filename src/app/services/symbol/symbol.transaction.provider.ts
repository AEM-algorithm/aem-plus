import { Injectable } from '@angular/core';
import {
  Account,
  Address,
  Deadline,
  NetworkType,
  PlainMessage,
  TransferTransaction,
  UInt64,
  NetworkConfiguration,
  TransactionFees,
  Transaction, NetworkCurrencies,
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
export class SymbolTransactionProvider {

  defaultFeesConfig: FeesConfig = {
    slow: 1,
    normal: 1.2,
    fast: 2,
  };

  constructor() {
  }

  getMaxFee(
    txsPayload: any,
    networkConfig: NetworkConfiguration,
    transactionFees: TransactionFees,
    networkCurrencies: NetworkCurrencies,
    epochAdjustment: number
  ): number {
    const networkType = this.networkType();
    const dummyAccount = Account.generateNewAccount(networkType);
    const recipientAddress = txsPayload.recipientAddress || dummyAccount.address.plain();

    const prepareTransaction: PrepareTransaction = {
      type: 'transfer',
      recipientAddress,
      messageText: txsPayload.message,
      mosaics: txsPayload.mosaics,
      fee: txsPayload.fee,
    };
    const txs: Transaction = this.prepareTransferTransaction(prepareTransaction, networkCurrencies, epochAdjustment);

    const txsWithFee = this.calculateMaxFee(txs, transactionFees, networkConfig, prepareTransaction.fee);
    return txsWithFee.maxFee.compact();
  }

  prepareTransferTransaction(
    transaction: PrepareTransaction,
    networkCurrencies: NetworkCurrencies,
    epochAdjustment: number
  ): Transaction {
    let txs: Transaction;
    switch (transaction.type) {
      case 'transfer':
        txs = this.createTransferTransaction(transaction, networkCurrencies, epochAdjustment);
        break;
      default:
        throw new Error('Not implemented');
    }
    return txs;
  }

  createTransferTransaction(
    transaction: PrepareTransaction,
    networkCurrencies: NetworkCurrencies,
    epochAdjustment: number
  ): TransferTransaction {
    const deadline = Deadline.create(epochAdjustment);
    const recipientAddress = Address.createFromRawAddress(transaction.recipientAddress);
    const mosaics = [networkCurrencies.currency.createAbsolute(transaction.mosaics[0].amount)];
    const networkType = this.networkType();
    const message = PlainMessage.create(transaction.messageText || '');
    const maxFee = UInt64.fromUint(transaction.fee);
    return TransferTransaction.create(
      deadline,
      recipientAddress,
      mosaics,
      message,
      networkType,
      maxFee
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

    const feeMulti = this.resolveFeeMultiplier(transactionFees, network, feeMultiplier) < transactionFees.minFeeMultiplier
      ? transactionFees.minFeeMultiplier
      : this.resolveFeeMultiplier(transactionFees, network, feeMultiplier, );

    if (!feeMulti) {
      return transaction;
    }

    return transaction.setMaxFee(feeMulti);
  }

  public resolveFeeMultiplier(transactionFees: TransactionFees, network: NetworkConfiguration, feeMultiplier: number, ): number | undefined {
    if (feeMultiplier === this.defaultFeesConfig.slow) {
      const fees = transactionFees.minFeeMultiplier + transactionFees.averageFeeMultiplier * 0.35;
      return fees || parseInt(network.chain.defaultDynamicFeeMultiplier);
    }
    if (feeMultiplier === this.defaultFeesConfig.normal) {
      const fees = transactionFees.minFeeMultiplier + transactionFees.averageFeeMultiplier * 0.65;
      return fees || parseInt(network.chain.defaultDynamicFeeMultiplier);
    }
    if (feeMultiplier === this.defaultFeesConfig.fast) {
      const fees =
        transactionFees.averageFeeMultiplier < transactionFees.minFeeMultiplier
          ? transactionFees.minFeeMultiplier
          : transactionFees.averageFeeMultiplier;
      return fees || parseInt(network.chain.defaultDynamicFeeMultiplier);
    }
    return undefined;
  }

  public resolveAmount = (rawAmount, divisibility) => rawAmount / Math.pow(10, divisibility);

  private networkType = () => environment.NETWORK_TYPE === 'TEST_NET' ? NetworkType.TEST_NET : NetworkType.MAIN_NET;

}
