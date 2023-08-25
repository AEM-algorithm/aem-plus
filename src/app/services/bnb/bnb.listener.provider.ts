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

  private async listenReceiveConfirmedEvent(hash: string, address: string) {
    try {
      const pendingTx = await this.bnbProvider.getTransactionResponseByTxHash(hash);
      if (pendingTx.to.toLowerCase() === address.toLowerCase()) {
        this.subscription.unsubscribe((error, success) => {
          if (!error && success) {
            console.log('Unsubscribed from pending transactions');
          } else {
            console.error('Unsubscribe error:', error);
          }
        });

        const confirmedTx = await this.web3.eth.getTransactionReceipt(hash);
        console.log('Transaction confirmed:', confirmedTx);

        if (confirmedTx) {
          this.observeBNBEvent.next({
            type: 'confirmed',
            address: confirmedTx.to,
          });
        }
      }
    } catch (e) {
      console.error('listenReceiveConfirmedEvent', e);
    }
  }

  // public waitForTransaction(txs: any) {
  //   try {
  //     this.bnbProvider.waitForTransaction(txs.hash).then(() => {
  //       this.observeBNBEvent.next({
  //         type: 'confirmed',
  //         address: txs.from,
  //       });
  //     });
  //   } catch (e) {
  //     console.log('BNB', 'waitForTransaction', e);
  //   }
  // }
}
