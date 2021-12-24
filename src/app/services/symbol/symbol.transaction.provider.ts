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
  Transaction,
  NetworkCurrencies,
  MosaicId,
  TransactionType,
  MultisigAccountModificationTransaction,
  AggregateTransaction,
  HashLockTransaction,
  Mosaic,
  RepositoryFactoryHttp,
  TransactionService,
  SignedTransaction,
} from 'symbol-sdk';

import { SymbolProvider } from '@app/services/symbol/symbol.provider';
import { SymbolListenerProvider } from '@app/services/symbol/symbol.listener.provider';

import { environment } from '@environments/environment';

export interface FeesConfig {
  slow: number;
  normal: number;
  fast: number;
}

export interface PrepareTransaction {
  type: TransactionType;
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

  constructor(
    private symbol: SymbolProvider,
    private symbolListener: SymbolListenerProvider,
  ) {
  }

  public getMaxFee(
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
      type: TransactionType.TRANSFER,
      recipientAddress,
      messageText: txsPayload.message,
      mosaics: txsPayload.mosaics,
      fee: txsPayload.fee,
    };
    const txs: Transaction = this.prepareTransferTransaction(prepareTransaction, networkCurrencies, epochAdjustment);

    const txsWithFee = this.calculateMaxFee(txs, transactionFees, networkConfig, prepareTransaction.fee);
    return txsWithFee.maxFee.compact();
  }

  public prepareTransferTransaction(
    transaction: PrepareTransaction,
    networkCurrencies: NetworkCurrencies,
    epochAdjustment: number
  ): Transaction {
    let txs: Transaction;
    switch (transaction.type) {
      case TransactionType.TRANSFER:
        txs = this.createTransferTransaction(transaction, networkCurrencies, epochAdjustment);
        break;
      default:
        throw new Error('Not implemented');
    }
    return txs;
  }

  // TODO HVH
  public prepareMultisigTransaction(
    epochAdjustment: number,
    cosignatoryAddresses: Address[],
    privateKey: string,
    networkGenerationHash: string,
    networkCurrencyDivisibility: number,
    networkType: NetworkType,
  ): {
    signedHashLockTransaction: SignedTransaction,
    signedTransaction: SignedTransaction
  } {
    const account = this.getAccountFromPrivateKey(networkType, privateKey);

    // Prepare multisigAccountModificationTransaction
    const multisigAccountModificationTransaction = MultisigAccountModificationTransaction.create(
      Deadline.create(epochAdjustment),
      1,
      1,
      cosignatoryAddresses,
      [],
      networkType,
    );

    // Prepare AggregateTransaction
    const aggregateTransaction = AggregateTransaction.createBonded(
      Deadline.create(epochAdjustment),
      [multisigAccountModificationTransaction.toAggregate(account.publicAccount)],
      networkType,
      [],
      UInt64.fromUint(2000000), // TODO: calculate Fee
    );
    // ---> Sign Aggregate Bonded Txs
    const signedTransaction = account.sign(
      aggregateTransaction,
      networkGenerationHash,
    );

    // Prepare hashLockTransaction
    const hashLockTransaction = HashLockTransaction.create(
      Deadline.create(epochAdjustment),
      new Mosaic(
        new MosaicId(this.symbol.symbolMosaicId),
        UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility)),
      ),
      UInt64.fromUint(480),
      signedTransaction,
      networkType,
      UInt64.fromUint(2000000), // TODO: calculate Fee
    );
    // ---> sign hashLockTxs
    const signedHashLockTransaction = account.sign(
      hashLockTransaction,
      networkGenerationHash,
    );

    return {
      signedHashLockTransaction,
      signedTransaction,
    };
  }

  public async announceHashLockAggregateBonded(
    signedHashLockTransaction: SignedTransaction,
    signedTransaction: SignedTransaction,
  ): Promise<AggregateTransaction> {
    const websocketUrl = this.symbolListener.getWSUrl(this.symbol.node);
    const repositoryFactory = new RepositoryFactoryHttp(this.symbol.node, {
      websocketInjected: WebSocket,
      websocketUrl,
    });
    const listener = repositoryFactory.createListener();
    const transactionHttp = repositoryFactory.createTransactionRepository();
    const receiptHttp = repositoryFactory.createReceiptRepository();
    const transactionService = new TransactionService(transactionHttp, receiptHttp);

    await listener.open();
    try {
      const announceHashLockAggregateBonded = await transactionService.announceHashLockAggregateBonded(
        signedHashLockTransaction,
        signedTransaction,
        listener,
      ).toPromise();
      listener.close();
      return announceHashLockAggregateBonded;
    }catch (e) {
      listener.close();
      throw Error(e);
    }
  }

  private getAccountFromPrivateKey(networkType: NetworkType, privateKey: string): Account {
    return Account.createFromPrivateKey(privateKey, networkType);
  }

  private createTransferTransaction(
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

  public calculateMaxFee(
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

  private resolveFeeMultiplier(transactionFees: TransactionFees, network: NetworkConfiguration, feeMultiplier: number, ): number | undefined {
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
