import {Injectable} from '@angular/core';
import { Address, IListener, RepositoryFactoryHttp } from 'symbol-sdk';
import { BehaviorSubject } from 'rxjs/Rx';

import { ToastProvider } from '@app/services/toast/toast.provider';

@Injectable({providedIn: 'root'})
export class SymbolListenerProvider {
  private repositoryFactory: RepositoryFactoryHttp;
  private listener: IListener;

  public isConfirm: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private toast: ToastProvider,
  ) {
  }

  public setNetwork = (node: string) => {
    try {
      if (this.listener) {
        this.listener.close();
      }
      const url = node.includes('https') ? node.replace('https', '') : node.includes('http') ? node.replace('http', '') : '';
      const websocketUrl = 'ws' + url + '/ws';
      this.repositoryFactory = new RepositoryFactoryHttp(node, {
        websocketInjected: WebSocket,
        websocketUrl,
      });
      this.listener = this.repositoryFactory.createListener();
    }catch (e) {
      console.log('SymbolListenerProvider setNetwork error', e);
    }
  }

  public listen = (rawAddress: string) => {
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
            this.isConfirm.next(true);
            this.toast.showMessageSuccess('New confirmed transaction!');
          });

        this.listener
          .unconfirmedAdded(address, undefined)
          .subscribe(() => {
            this.toast.showMessageWarning('New unconfirmed transaction!');
          });

        this.listener.status(address).subscribe(error => {
          this.toast.showMessageError(error.code);
        });

      });
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
