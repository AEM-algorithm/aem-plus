import {Injectable} from '@angular/core';
import { Address, IListener, RepositoryFactoryHttp, TransactionService } from 'symbol-sdk';
import { BehaviorSubject } from 'rxjs/Rx';

import { ToastProvider } from '@app/services/toast/toast.provider';

export interface SymbolEvent {
  type: string;
  address: string;
}

@Injectable({providedIn: 'root'})
export class SymbolListenerProvider {
  private transactionService: TransactionService;
  private repositoryFactory: RepositoryFactoryHttp;
  private listener: IListener;

  public observeSymbolEvent: BehaviorSubject<SymbolEvent> = new BehaviorSubject(null);

  constructor(
    private toast: ToastProvider,
  ) {
  }

  getWSUrl(node: string) {
    if (node.includes('https')) {
      const url = node.replace('https', '');
      return 'wss' + url + '/ws';
    }
    if (node.includes('http')) {
      const url = node.replace('http', '');
      return 'ws' + url + '/ws';
    }
    return node;
  }

  public setNetwork = (node: string) => {
    try {
      if (this.listener) {
        this.listener.close();
      }
      const websocketUrl = this.getWSUrl(node);
      this.repositoryFactory = new RepositoryFactoryHttp(node, {
        websocketInjected: WebSocket,
        websocketUrl,
      });
      this.transactionService = new TransactionService(
        this.repositoryFactory.createTransactionRepository(),
        this.repositoryFactory.createReceiptRepository()
      );
      this.listener = this.repositoryFactory.createListener();
    }catch (e) {
      console.log('SymbolListenerProvider setNetwork error', e);
    }
  }

  public listen = (rawAddress: string) => {
    console.log('start listen ' + rawAddress);
    if (this.listener) {
      this.listener.close();
    }
    this.listener = this.repositoryFactory.createListener();
    const address = Address.createFromRawAddress(rawAddress);
    this.listener
      .open(async (event: { client: string, code: any, reason: any }) => {
        if (event && event.code !== 1005) {
          await this.retryNTimes(this.listener, 3, 5000);
        } else {
          // this.showMessage('ws_connection_failed', 'danger');
          console.log('The wallet cannot monitor the activities of your account on the Symbol chain. Please try selecting a different node.');
        }
      })
      .then(() => {
        console.log('Listening ' + address.pretty());

        this.listener
          .confirmed(address, undefined)
          .subscribe(() => {
            this.observeSymbolEvent.next({
              type: 'confirmed',
              address: rawAddress,
            });
          });

        this.listener
          .unconfirmedAdded(address, undefined)
          .subscribe(() => {
            this.observeSymbolEvent.next({
              type: 'unconfirmed',
              address: rawAddress,
            });
          });

        this.listener.status(address).subscribe(error => {
          this.toast.showMessageError(error.code);
        });

      }).catch((e) => {
      console.log('listen error', e);
    });
  }

  // TODO: handle event announceHashLockAggregateBonded
  listenHashLockAggregateBonded(signedHashLockTransaction, signedTransaction) {
    const listener = this.repositoryFactory.createListener();
    this.transactionService
      .announceHashLockAggregateBonded(
        signedHashLockTransaction,
        signedTransaction,
        listener,
      )
      .subscribe(
        (x) => console.log('announceHashLockAggregateBonded', x),
        (err) => console.log('announceHashLockAggregateBonded err', err),
        () => listener.close(),
      );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  private async retryNTimes(listener: IListener, trials: number, interval: number) {
    if (trials < 1) {
      throw new Error('could not connect');
    }
    let attemptCount = 0;
    while (!listener.isOpen()) {
      try {
        return await listener.open();
      } catch (error) {
        if (++attemptCount >= trials) {
          throw error;
        }
      }
      await this.sleep(interval);
    }
  }
}
