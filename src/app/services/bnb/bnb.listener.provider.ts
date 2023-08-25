import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BnbProvider } from './bnb.provider';
import Web3 from 'web3';

export interface BNBEvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class BnbListenerProvider {
  private web3: any;
  public observeBNBEvent: BehaviorSubject<BNBEvent> = new BehaviorSubject(null);
  private subscription: any;
  constructor(private bnbProvider: BnbProvider) {
    this.web3 = new Web3(bnbProvider.availableRPCNodes[0]);
  }

  public listen(address: string) {
    this.subscription = this.web3.eth.subscribe(
      'pendingTransactions',
      (error, txHash) => {
        if (!error) {
          console.log(`Pending transaction hash: ${txHash}`);
          this.listenReceiveConfirmedEvent(txHash, address);
        } else {
          console.error(error);
        }
      }
    );
  }

  public async listenReceiveConfirmedEvent(hash: string, address: string) {
    try {
      const pendingTx = await this.bnbProvider.getTransactionReceiptByTxHash(
        hash
      );
      if (pendingTx?.to === address) {
        const confirmedTx = await pendingTx.wait();
        this.observeBNBEvent.next({
          type: 'confirmed',
          address: confirmedTx.to,
        });
      } else {
        this.observeBNBEvent.next({
          type: 'confirmed',
          address: address,
        });
      }
    } catch (e) {
      console.error('listenReceiveConfirmedEvent', e);
    }
  }
}
