import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BnbProvider } from './bnb.provider';

export interface BNBEvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class BnbListenerProvider {
  public observeBNBEvent: BehaviorSubject<BNBEvent> = new BehaviorSubject(null);
  constructor(private bnbProvider: BnbProvider) {}

  public async waitForTransaction(txs: any) {
    try {
      const transactionReceipt =
        await this.bnbProvider.getTransactionReceiptByTxHash(
          txs.transactionHash
        );
      if (transactionReceipt) {
        this.observeBNBEvent.next({
          type: 'confirmed',
          address: txs.from,
        });
      } else {
        this.observeBNBEvent.next({
          type: 'unconfirmed',
          address: txs.from,
        });
      }
    } catch (e) {
      console.log('BNB', 'waitForTransaction', e);
    }
  }
}
