import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AstarProvider } from './astar.provider';

export interface ASTAREvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class AstarListenerProvider {
  public observeASTAREvent: BehaviorSubject<ASTAREvent> = new BehaviorSubject(null);
  constructor(private astarProvider: AstarProvider) { }

  public async waitForTransaction(txs: any) {
    try {
      const transactionReceipt =
        await this.astarProvider.getTransactionReceiptByTxHash(
          txs.transactionHash
        );
      if (transactionReceipt) {
        this.observeASTAREvent.next({
          type: 'confirmed',
          address: txs.from,
        });
      } else {
        this.observeASTAREvent.next({
          type: 'unconfirmed',
          address: txs.from,
        });
      }
    } catch (e) {
    }
  }
}
